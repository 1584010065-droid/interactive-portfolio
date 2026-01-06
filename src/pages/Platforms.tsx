import { Header } from '@/components/Header';
import { platforms } from '@/data/mockData';
import { ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Platforms() {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Header />

      <main className="container py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">常用AI工具集合</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">常用平台</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            快速访问团队推荐的AI创作工具和平台
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group relative p-6 rounded-2xl',
                'bg-card border border-border/50',
                'transition-all duration-300 ease-out',
                'hover:scale-[1.02] hover:glow-card-hover',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${platform.color}20, transparent)`,
                }}
              />

              <div className="relative">
                {/* Icon & Name */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                      style={{
                        backgroundColor: `${platform.color}20`,
                      }}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {platform.name}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {platform.description}
                </p>

                {/* Tags */}
                {platform.tags && (
                  <div className="flex flex-wrap gap-2">
                    {platform.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: platform.color }}
                >
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-16 p-6 rounded-2xl bg-secondary/30 border border-border/50">
          <h2 className="text-lg font-semibold mb-4">💡 使用小贴士</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Lovart</strong> 特别适合二次元风格和线稿创作</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>即梦</strong> 对中国风和国潮元素支持较好</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>LiblibAI</strong> 社区模型丰富，适合探索各种风格</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>生成作品后别忘了回来分享你的提示词！</span>
            </li>
          </ul>
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
