import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useFollowStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';

interface FollowButtonProps {
  slug: string;
  className?: string;
  onFollowChange?: (isFollowing: boolean) => void;
}

export default function FollowButton({ slug, className, onFollowChange }: FollowButtonProps) {
  const isFollowing = useFollowStore((s) => s.isFollowing(slug));
  const toggle = useFollowStore((s) => s.toggle);
  const [showPlusOne, setShowPlusOne] = useState(false);

  const handleClick = () => {
    if (!isFollowing) {
      setShowPlusOne(true);
    }
    toggle(slug);
  };

  useEffect(() => {
    if (showPlusOne) {
      const timer = setTimeout(() => setShowPlusOne(false), 800);
      return () => clearTimeout(timer);
    }
  }, [showPlusOne]);

  // Inform parent of optimistic follow (for stat counting)
  useEffect(() => {
    onFollowChange?.(isFollowing);
  }, [isFollowing, onFollowChange]);

  return (
    <div className={clsx('relative inline-flex', className)}>
      <Button
        variant={isFollowing ? 'ghost' : 'gold'}
        onClick={handleClick}
        className="w-full sm:w-auto"
      >
        {isFollowing ? 'FOLLOWING ✓' : 'FOLLOW'}
      </Button>

      {showPlusOne && (
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 burst bg-crimson text-stark w-10 h-10 flex items-center justify-center font-display text-lg animate-slide-up pointer-events-none z-50"
          aria-hidden="true"
        >
          +1
        </span>
      )}
    </div>
  );
}
