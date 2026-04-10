import React from 'react';
import { cn } from '../../utils/cn';

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'shimmer bg-surface',
        className
      )}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="border border-white/5 p-0">
      <Skeleton className="w-full h-48" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
