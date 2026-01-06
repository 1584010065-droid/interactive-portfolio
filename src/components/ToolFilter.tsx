import { ToolType } from '@/types';
import { toolsConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ToolFilterProps {
  selectedTool: ToolType | 'all';
  onToolChange: (tool: ToolType | 'all') => void;
  sortBy: 'latest' | 'popular';
  onSortChange: (sort: 'latest' | 'popular') => void;
}

export function ToolFilter({ selectedTool, onToolChange, sortBy, onSortChange }: ToolFilterProps) {
  const tools: (ToolType | 'all')[] = ['all', 'midjourney', 'stable-diffusion', 'dall-e', 'flux', 'jimeng', 'doubao'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      {/* Tool Filters */}
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => {
          const isAll = tool === 'all';
          const toolInfo = isAll ? null : toolsConfig[tool];
          const isActive = selectedTool === tool;

          return (
            <button
              key={tool}
              onClick={() => onToolChange(tool)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                'border border-border/50 hover:border-primary/50',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary glow-purple'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {isAll ? (
                '全部'
              ) : (
                <span className="flex items-center gap-1.5">
                  <span>{toolInfo?.icon}</span>
                  <span>{toolInfo?.shortName}</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">排序：</span>
        <div className="flex rounded-lg border border-border/50 overflow-hidden">
          <button
            onClick={() => onSortChange('latest')}
            className={cn(
              'px-4 py-1.5 text-sm font-medium transition-colors',
              sortBy === 'latest'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
            )}
          >
            最新
          </button>
          <button
            onClick={() => onSortChange('popular')}
            className={cn(
              'px-4 py-1.5 text-sm font-medium transition-colors',
              sortBy === 'popular'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
            )}
          >
            最热
          </button>
        </div>
      </div>
    </div>
  );
}
