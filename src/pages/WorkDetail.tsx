import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ImageGallery } from '@/components/ImageGallery';
import { PromptDisplay } from '@/components/PromptDisplay';
import { mockWorks, toolsConfig } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const work = mockWorks.find((w) => w.id === id);
  const [isLiked, setIsLiked] = useState(work?.isLiked ?? false);

  if (!work) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">作品不存在</h1>
          <p className="text-muted-foreground mb-8">该作品可能已被删除或链接错误</p>
          <Button asChild>
            <Link to="/">返回首页</Link>
          </Button>
        </div>
      </div>
    );
  }

  const toolInfo = toolsConfig[work.tool];

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Header />

      <main className="container py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          返回作品列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div>
            <ImageGallery images={work.images} title={work.title} />
          </div>

          {/* Right: Work Info & Prompts */}
          <div className="space-y-8">
            {/* Title & Meta */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{work.title}</h1>

              <div className="flex flex-wrap items-center gap-4">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={work.author.avatar} alt={work.author.name} />
                    <AvatarFallback>{work.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{work.author.name}</span>
                  {work.author.department && (
                    <span className="text-sm text-muted-foreground">· {work.author.department}</span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(work.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}
                </div>
              </div>

              {/* Tool & Tags */}
              <div className="flex flex-wrap gap-2">
                {/* Tool Badge */}
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-1.5"
                  style={{
                    borderColor: toolInfo.color,
                    backgroundColor: `${toolInfo.color}20`,
                  }}
                >
                  <span>{toolInfo.icon}</span>
                  <span>{toolInfo.name}</span>
                </span>

                {/* Tags */}
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-sm bg-secondary/50 border border-border/50 flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Like Button */}
              <Button
                variant={isLiked ? 'default' : 'outline'}
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  isLiked
                    ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                    : 'border-border/50 hover:border-destructive/50'
                )}
              >
                <Heart
                  className={cn('h-4 w-4 mr-2', isLiked && 'fill-current')}
                />
                {isLiked ? '已收藏' : '收藏'}
                <span className="ml-2 text-sm opacity-70">
                  {work.likes + (isLiked && !work.isLiked ? 1 : 0)}
                </span>
              </Button>
            </div>

            {/* Prompts Section */}
            <div className="space-y-8">
              {/* Positive Prompt */}
              <PromptDisplay
                prompt={work.positivePrompt}
                type="positive"
                title="正向提示词"
              />

              {/* Negative Prompt */}
              {work.negativePrompt && (
                <PromptDisplay
                  prompt={work.negativePrompt}
                  type="negative"
                  title="负向提示词"
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            PromptHub © 2024 · 内部AI创作共享平台
          </p>
        </div>
      </footer>
    </div>
  );
}
