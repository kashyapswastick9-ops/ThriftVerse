// server/index.js — Express API server
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { query } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// ─── Products / Stock ─────────────────────────────────────────────────────────

/** GET /api/products
 * Query params: gender, category, sub, size, condition, rarity, brand, era,
 *               minPrice, maxPrice, q, curator, filter, oneofone, sort, page, pageSize
 */
app.get('/api/products', async (req, res) => {
  try {
    const {
      gender, category, sub, size, condition, rarity, brand, era,
      minPrice, maxPrice, q, curator, filter, oneofone,
      sort = 'newest', page = '1', pageSize = '24',
    } = req.query;

    const conditions = ['available = TRUE'];
    const params = [];
    let p = 1;

    if (gender)    { conditions.push(`gender = $${p++}`);   params.push(gender); }
    if (category)  { conditions.push(`category = $${p++}`); params.push(category); }
    if (sub)       { conditions.push(`sub = ANY($${p++})`); params.push(sub.split(',')); }
    if (condition) { conditions.push(`condition = ANY($${p++})`); params.push(condition.split(',')); }
    if (rarity)    { conditions.push(`rarity = ANY($${p++})`);    params.push(rarity.split(',')); }
    if (brand)     { conditions.push(`brand = ANY($${p++})`);     params.push(brand.split(',')); }
    if (era)       { conditions.push(`era = ANY($${p++})`);       params.push(era.split(',')); }
    if (size)      { conditions.push(`sizes && $${p++}::text[]`); params.push(size.split(',')); }
    if (minPrice)  { conditions.push(`price >= $${p++}`);  params.push(Number(minPrice)); }
    if (maxPrice)  { conditions.push(`price <= $${p++}`);  params.push(Number(maxPrice)); }
    if (curator)   { conditions.push(`curator_slug = $${p++}`); params.push(curator); }
    if (filter === 'drops') { conditions.push(`is_new_drop = TRUE`); }
    if (oneofone === 'true') { conditions.push(`is_one_of_one = TRUE`); }
    if (q) {
      conditions.push(`(title ILIKE $${p} OR brand ILIKE $${p})`);
      params.push(`%${q}%`);
      p++;
    }

    const ORDER_MAP = {
      newest:     'created_at DESC',
      'price-asc':  'price ASC',
      'price-desc': 'price DESC',
      rarity: `CASE rarity WHEN 'LEGENDARY' THEN 0 WHEN 'EPIC' THEN 1 WHEN 'RARE' THEN 2 WHEN 'UNCOMMON' THEN 3 ELSE 4 END`,
      discount: '(original_price - price) DESC',
    };
    const orderBy = ORDER_MAP[sort] || ORDER_MAP.newest;

    const where = `WHERE ${conditions.join(' AND ')}`;
    const countResult = await query(`SELECT COUNT(*) FROM products ${where}`, params);
    const total = parseInt(countResult.rows[0].count, 10);

    const offset = (Number(page) - 1) * Number(pageSize);
    const dataResult = await query(
      `SELECT * FROM products ${where} ORDER BY ${orderBy} LIMIT $${p} OFFSET $${p + 1}`,
      [...params, Number(pageSize), offset]
    );

    res.json({ items: dataResult.rows, total });
  } catch (err) {
    console.error('[GET /api/products]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/** GET /api/stock/:id — check if a single product is still available */
app.get('/api/stock/:id', async (req, res) => {
  try {
    const result = await query(
      'SELECT id, title, available FROM products WHERE id = $1',
      [req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Orders ───────────────────────────────────────────────────────────────────

/** POST /api/orders — create a new order after payment
 * Body: { customerName, customerEmail, customerPhone, items, subtotal, razorpayPaymentId? }
 */
app.post('/api/orders', async (req, res) => {
  const { customerName, customerEmail, customerPhone, items, subtotal, razorpayPaymentId } = req.body;

  if (!customerName || !items?.length || !subtotal) {
    return res.status(400).json({ error: 'Missing required fields: customerName, items, subtotal' });
  }

  const orderId = `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    // Mark products as sold (not available)
    const productIds = items.map((i) => i.productId);
    await query(
      `UPDATE products SET available = FALSE WHERE id = ANY($1::text[])`,
      [productIds]
    );

    // Insert order
    const result = await query(
      `INSERT INTO orders
        (id, customer_name, customer_email, customer_phone, items, subtotal,
         payment_method, razorpay_payment_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'razorpay', $7, 'paid')
       RETURNING *`,
      [orderId, customerName, customerEmail || null, customerPhone || null,
       JSON.stringify(items), subtotal, razorpayPaymentId || null]
    );

    res.status(201).json({ order: result.rows[0] });
  } catch (err) {
    console.error('[POST /api/orders]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/** GET /api/orders — list all orders (admin view) */
app.get('/api/orders', async (req, res) => {
  try {
    const { page = '1', pageSize = '20', status, email } = req.query;
    const conditions = [];
    const params = [];
    let p = 1;

    if (status) { conditions.push(`status = $${p++}`); params.push(status); }
    if (email)  { conditions.push(`customer_email ILIKE $${p++}`); params.push(`%${email}%`); }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const countResult = await query(`SELECT COUNT(*) FROM orders ${where}`, params);
    const total = parseInt(countResult.rows[0].count, 10);

    const offset = (Number(page) - 1) * Number(pageSize);
    const result = await query(
      `SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT $${p} OFFSET $${p + 1}`,
      [...params, Number(pageSize), offset]
    );

    res.json({ orders: result.rows, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** GET /api/orders/:id — single order */
app.get('/api/orders/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 THRIFTVERSE API ready at http://localhost:${PORT}\n`);
});
