import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) walk(dirPath, callback);
    else callback(dirPath);
  });
}

function replace(file, searchValue, replaceValue) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent;
  if (typeof searchValue === 'string') {
    newContent = content.split(searchValue).join(replaceValue);
  } else {
    newContent = content.replace(searchValue, replaceValue);
  }
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
}

// Global generic class replacements in src/ components and pages
walk('./src', file => {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;

  // font-display line height fix
  // Replace leading-none with leading-[1.05] or leading-none? Actually Anton looks better with leading-[1.05] or leading-none.
  // The spec says: set line-height on every leading-[.85] / leading-none display heading to at least 1 (check hero h1, section titles, card titles, dossier alias, price text).
  // Easiest is to replace leading-[.85] with leading-[1.05] or leading-none.
  replace(file, /leading-\[\.85\]/g, 'leading-none');

  // Reduce largest display sizes by roughly 10% where it overflows. 
  // e.g. text-[9rem] -> text-[8rem], text-8xl -> text-7xl
  replace(file, /text-\[9rem\]/g, 'text-[8rem]');
  replace(file, /text-8xl/g, 'text-7xl');

  // Add rounded-full to buttons and badges. 
  // btn-comic... wait, I added rounded-full to .btn-comic in index.css! So I don't need to add it to className="btn-comic".
  // Let's check Header.tsx: Mega menu panel square top, rounded-b-comic-xl on the bottom
  if (file.endsWith('Header.tsx')) {
    replace(file, "border-t-4',", "border-t-4 rounded-b-comic-xl',");
    // count pills rounded-full -> wait, MegaMenu doesn't have count pills, just text
    // budget chips rounded-full
    replace(file, "className=\"font-mono text-xs bg-ink-700 text-gold border-2 border-black px-3 py-2 hover:bg-gold hover:text-ink transition-colors\"", "className=\"font-mono text-xs bg-ink-700 text-gold border-2 border-black px-3 py-2 rounded-full hover:bg-gold hover:text-ink transition-colors\"");
    // "NEW SEASON" promo card rounded-comic-lg
    replace(file, "className=\"mt-auto bg-crimson border-[3px] border-black p-3 shadow-comic-sm\"", "className=\"mt-auto bg-crimson border-[3px] border-black p-3 shadow-comic-sm rounded-comic-lg\"");
    
    // Header icon buttons (search, cart, hamburger) -> rounded-full
    replace(file, "className=\"p-2 text-stark-dim hover:text-stark transition-colors\"", "className=\"p-2 text-stark-dim hover:text-stark transition-colors rounded-full\"");
    replace(file, "className=\"relative p-2 text-stark-dim hover:text-stark transition-colors\"", "className=\"relative p-2 text-stark-dim hover:text-stark transition-colors rounded-full\"");
    replace(file, "className=\"lg:hidden p-2 text-stark-dim hover:text-stark transition-colors\"", "className=\"lg:hidden p-2 text-stark-dim hover:text-stark transition-colors rounded-full\"");
    
    // DROPS pill -> rounded-full
    replace(file, "className=\"hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase bg-crimson text-stark border-[3px] border-black px-3 py-1.5 shadow-comic-sm hover:-translate-y-0.5 hover:shadow-comic transition-all\"", "className=\"hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase bg-crimson text-stark border-[3px] border-black px-3 py-1.5 rounded-full shadow-comic-sm hover:-translate-y-0.5 hover:shadow-comic transition-all\"");
    
    // Mobile drawer panel `rounded-r-comic-xl`
    replace(file, "className=\"w-[85%] max-w-sm bg-ink h-full border-r-[3px] border-black flex flex-col\"", "className=\"w-[85%] max-w-sm bg-ink h-full border-r-[3px] border-black flex flex-col rounded-r-comic-xl overflow-hidden\"");
  }

  if (file.endsWith('HeroBanner.tsx')) {
    // Hero image panel `rounded-comic-xl overflow-hidden`
    replace(file, "className=\"hidden lg:block lg:col-span-5 border-l-3 border-black bg-ink-700 relative\"", "className=\"hidden lg:block lg:col-span-5 border-l-3 border-black bg-ink-700 relative rounded-tl-comic-xl overflow-hidden\"");
    // wait, if it's the whole panel, maybe it's the right side. Let's look at it.
    // I'll handle HeroBanner separately if needed.
  }

  if (file.endsWith('CategorySection.tsx')) {
    // category section chapter panel -> no radius mentioned
  }

  if (file.endsWith('CategoryCard.tsx')) {
    // Category cards `rounded-comic-lg overflow-hidden` (done in index.css .comic-card)
    // arrow button `rounded-full`
    replace(file, "className=\"bg-gold text-ink p-2 border-2 border-black -rotate-12 shadow-comic-sm group-hover:rotate-0 transition-transform\"", "className=\"bg-gold text-ink p-2 border-2 border-black rounded-full -rotate-12 shadow-comic-sm group-hover:rotate-0 transition-transform\"");
  }

  if (file.endsWith('GenderTabs.tsx')) {
    // Gender tabs `rounded-full`
    replace(file, "className={clsx(\n              'px-6 py-3 font-cond font-bold uppercase text-lg border-2 transition-all',", "className={clsx(\n              'px-6 py-3 font-cond font-bold uppercase text-lg border-2 rounded-full transition-all',");
  }

  if (file.endsWith('CuratorDossier.tsx')) {
    // dossier wrapper `rounded-comic-xl`
    replace(file, "className=\"bg-ink border-b-3 border-black pb-8 lg:pb-12\"", "className=\"bg-ink border-b-3 border-black pb-8 lg:pb-12 rounded-b-comic-xl\"");
    // polaroid avatar frame `rounded-comic`
    replace(file, "className=\"w-32 h-32 md:w-48 md:h-48 border-4 border-black bg-stark p-2 shadow-comic -rotate-3 z-10 shrink-0\"", "className=\"w-32 h-32 md:w-48 md:h-48 border-4 border-black bg-stark p-2 shadow-comic -rotate-3 z-10 shrink-0 rounded-comic\"");
    // stat tiles `rounded-comic`
    replace(file, "className=\"bg-ink-800 border-2 border-black p-3 text-center\"", "className=\"bg-ink-800 border-2 border-black p-3 text-center rounded-comic\"");
  }

  if (file.endsWith('StatBars.tsx')) {
    // power-grid track and fill `rounded-full`
    replace(file, "className=\"flex-1 h-6 bg-ink-800 border-2 border-black relative overflow-hidden\"", "className=\"flex-1 h-6 bg-ink-800 border-2 border-black relative overflow-hidden rounded-full\"");
  }
  
  if (file.endsWith('VaultCollectionCard.tsx')) {
    // vault cards `rounded-comic-xl`
    replace(file, "className={clsx(\n        'bg-ink-800 comic-border shadow-comic overflow-hidden',", "className={clsx(\n        'bg-ink-800 comic-border rounded-comic-xl shadow-comic overflow-hidden',");
  }

  if (file.endsWith('ProductCard.tsx')) {
    // wishlist heart `rounded-full` -> it's already rounded-full in code.
    // size buttons `rounded-comic-sm` -> SizeSelector.tsx
  }

  if (file.endsWith('SizeSelector.tsx')) {
    // size buttons `rounded-comic-sm`
    replace(file, "className={clsx(\n            compact ? 'h-9 min-w-[2.25rem] px-1' : 'h-11 min-w-[2.75rem] px-2',", "className={clsx(\n            compact ? 'h-9 min-w-[2.25rem] px-1' : 'h-11 min-w-[2.75rem] px-2',\n            'rounded-comic-sm',");
  }

  if (file.endsWith('FilterSidebar.tsx')) {
    // sidebar `rounded-comic-xl`
    replace(file, "className={clsx(\"comic-border bg-ink-800 shadow-comic p-5 flex-col\", className)}", "className={clsx(\"comic-border bg-ink-800 shadow-comic rounded-comic-xl p-5 flex-col\", className)}");
    // sheet `rounded-t-comic-xl`
    replace(file, "className=\"relative bg-ink-800 border-t-[3px] border-black flex flex-col max-h-[90vh] w-full animate-slide-down shadow-[0_-8px_0_#000]\"", "className=\"relative bg-ink-800 border-t-[3px] border-black flex flex-col max-h-[90vh] w-full animate-slide-down shadow-[0_-8px_0_#000] rounded-t-comic-xl overflow-hidden\"");
    // Checkbox `rounded-comic-sm`
    replace(file, "className=\"relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black shrink-0 group-hover:border-stark transition-colors\"", "className=\"relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black rounded-comic-sm shrink-0 group-hover:border-stark transition-colors\"");
    replace(file, "className=\"relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black shrink-0 mt-0.5\"", "className=\"relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black rounded-comic-sm shrink-0 mt-0.5\"");
    replace(file, "className=\"relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black shrink-0\"", "className=\"relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black rounded-comic-sm shrink-0\"");
    // Radio/switch `rounded-full`
    replace(file, "className={clsx(\n                \"relative w-10 h-5 border-2 border-black transition-colors flex items-center\",\n                filters.filter === 'drops' ? \"bg-crimson\" : \"bg-ink-700\"\n              )}", "className={clsx(\n                \"relative w-10 h-5 border-2 border-black rounded-full transition-colors flex items-center\",\n                filters.filter === 'drops' ? \"bg-crimson\" : \"bg-ink-700\"\n              )}");
    replace(file, "className={clsx(\n                \"w-3 h-3 bg-stark border border-black absolute top-0.5 transition-transform\",", "className={clsx(\n                \"w-3 h-3 bg-stark border border-black rounded-full absolute top-0.5 transition-transform\",");
    
    replace(file, "className={clsx(\n                \"relative w-10 h-5 border-2 border-black transition-colors flex items-center\",\n                filters.oneofone ? \"bg-gold\" : \"bg-ink-700\"\n              )}", "className={clsx(\n                \"relative w-10 h-5 border-2 border-black rounded-full transition-colors flex items-center\",\n                filters.oneofone ? \"bg-gold\" : \"bg-ink-700\"\n              )}");
    replace(file, "className={clsx(\n                \"w-3 h-3 bg-stark border border-black absolute top-0.5 transition-transform\",", "className={clsx(\n                \"w-3 h-3 bg-stark border border-black rounded-full absolute top-0.5 transition-transform\",");

    // price slider thumbs handled in inline CSS -> [&::-webkit-slider-thumb]:rounded-full
    replace(file, "[&::-webkit-slider-thumb]:rounded-none", "[&::-webkit-slider-thumb]:rounded-full");
    
    // Inputs/price number boxes `rounded-comic`
    replace(file, "className=\"flex-1 bg-ink border-2 border-black px-2 py-1 font-mono text-sm text-stark flex items-center\"", "className=\"flex-1 bg-ink border-2 border-black rounded-comic px-2 py-1 font-mono text-sm text-stark flex items-center\"");
    replace(file, "className=\"w-full bg-ink border-2 border-black px-3 py-2 font-sans text-sm text-stark placeholder:text-stark-dim mb-3 outline-none focus-visible:ring-2 focus-visible:ring-vibranium\"", "className=\"w-full bg-ink border-2 border-black rounded-comic px-3 py-2 font-sans text-sm text-stark placeholder:text-stark-dim mb-3 outline-none focus-visible:ring-2 focus-visible:ring-vibranium\"");
  }

  if (file.endsWith('ShopToolbar.tsx')) {
    // selects `rounded-comic`
    replace(file, "className=\"bg-ink-700 border-[3px] border-black text-stark font-cond uppercase px-3 py-1.5 shadow-comic-sm outline-none focus-visible:ring-4 focus-visible:ring-vibranium\"", "className=\"bg-ink-700 border-[3px] border-black rounded-comic text-stark font-cond uppercase px-3 py-1.5 shadow-comic-sm outline-none focus-visible:ring-4 focus-visible:ring-vibranium\"");
    // Grid density toggle `rounded-comic`
    replace(file, "className=\"hidden lg:flex border-[3px] border-black bg-ink-700 shadow-comic-sm\"", "className=\"hidden lg:flex border-[3px] border-black rounded-comic bg-ink-700 shadow-comic-sm overflow-hidden\"");
  }

  if (file.endsWith('CartDrawer.tsx')) {
    // drawer `rounded-l-comic-xl`
    replace(file, "className=\"relative bg-ink-800 border-l-[3px] border-black flex flex-col h-full w-full shadow-comic-lg\"", "className=\"relative bg-ink-800 border-l-[3px] border-black flex flex-col h-full w-full shadow-comic-lg rounded-l-comic-xl overflow-hidden\"");
    // progress bar `rounded-full overflow-hidden`
    replace(file, "className=\"h-1.5 w-full bg-ink-700 border border-black overflow-hidden\"", "className=\"h-1.5 w-full bg-ink-700 border border-black overflow-hidden rounded-full\"");
  }

  if (file.endsWith('ToastContainer.tsx')) {
    // toast `rounded-comic-lg`
    replace(file, "className={clsx(\n            'pointer-events-auto flex w-full max-w-sm items-start gap-3 p-4 border-[3px] border-black shadow-comic transition-all duration-300',", "className={clsx(\n            'pointer-events-auto flex w-full max-w-sm items-start gap-3 p-4 border-[3px] border-black shadow-comic rounded-comic-lg transition-all duration-300',");
  }

  if (file.endsWith('ProductGrid.tsx')) {
    // Progress bar `rounded-full overflow-hidden`
    replace(file, "className=\"w-full max-w-xs h-3 border-[3px] border-black bg-ink-700 mb-6 overflow-hidden\"", "className=\"w-full max-w-xs h-3 border-[3px] border-black bg-ink-700 mb-6 overflow-hidden rounded-full\"");
  }
});

