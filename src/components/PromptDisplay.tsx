import { useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface PromptDisplayProps {
  prompt: string;
  type: 'positive' | 'negative';
  title: string;
}

export function PromptDisplay({ prompt, type, title }: PromptDisplayProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Parse prompt into segments
  const segments = useMemo(() => {
    // Split by comma and clean up
    return prompt
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((text, index) => ({
        id: `${type}-${index}`,
        text,
      }));
  }, [prompt, type]);

  const handleCopySegment = async (segment: { id: string; text: string }) => {
    try {
      await navigator.clipboard.writeText(segment.text);
      setCopiedId(segment.id);
      toast({
        description: `已复制：${segment.text}`,
        duration: 2000,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        description: '复制失败，请重试',
        variant: 'destructive',
      });
    }
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedAll(true);
      toast({
        description: `已复制全部${type === 'positive' ? '正向' : '负向'}提示词`,
        duration: 2000,
      });
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      toast({
        description: '复制失败，请重试',
        variant: 'destructive',
      });
    }
  };

  const isPositive = type === 'positive';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              isPositive ? 'bg-neon-purple' : 'bg-destructive'
            )}
          />
          {title}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyAll}
          className={cn(
            'border-border/50 hover:border-primary/50',
            copiedAll && 'border-primary text-primary'
          )}
        >
          {copiedAll ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              复制全部
            </>
          )}
        </Button>
      </div>

      {/* Segmented Pills */}
      <div className="flex flex-wrap gap-2">
        {segments.map((segment) => (
          <button
            key={segment.id}
            onClick={() => handleCopySegment(segment)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium',
              'border transition-all duration-200',
              'hover:scale-105 active:scale-95',
              copiedId === segment.id
                ? isPositive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-destructive text-destructive-foreground border-destructive'
                : isPositive
                ? 'bg-secondary/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-primary/10'
                : 'bg-destructive/10 text-foreground border-destructive/30 hover:border-destructive/50 hover:bg-destructive/20'
            )}
          >
            {copiedId === segment.id ? (
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3" />
                {segment.text}
              </span>
            ) : (
              segment.text
            )}
          </button>
        ))}
      </div>

      {/* Full Prompt Preview */}
      <div
        className={cn(
          'p-4 rounded-lg border text-sm text-muted-foreground',
          'bg-secondary/30 border-border/50'
        )}
      >
        <code className="break-all leading-relaxed">{prompt}</code>
      </div>
    </div>
  );
}
