import { Work } from '@/types';
import { WorkCard } from './WorkCard';
import { useEffect, useRef, useState } from 'react';

interface MasonryGridProps {
  works: Work[];
  onLikeToggle?: (workId: string) => void;
}

export function MasonryGrid({ works, onLikeToggle }: MasonryGridProps) {
  const [columns, setColumns] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else if (width < 1280) setColumns(4);
      else setColumns(5);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute works into columns
  const columnWorks: Work[][] = Array.from({ length: columns }, () => []);
  works.forEach((work, index) => {
    columnWorks[index % columns].push(work);
  });

  return (
    <div ref={containerRef} className="flex gap-4">
      {columnWorks.map((column, columnIndex) => (
        <div key={columnIndex} className="flex-1 flex flex-col gap-4">
          {column.map((work, workIndex) => (
            <div
              key={work.id}
              className="animate-fade-in"
              style={{ animationDelay: `${(columnIndex * column.length + workIndex) * 50}ms` }}
            >
              <WorkCard work={work} onLikeToggle={onLikeToggle} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
