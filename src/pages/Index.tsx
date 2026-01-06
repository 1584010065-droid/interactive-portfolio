import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ToolFilter } from '@/components/ToolFilter';
import { MasonryGrid } from '@/components/MasonryGrid';
import { mockWorks } from '@/data/mockData';
import { ToolType, Work } from '@/types';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<ToolType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [works, setWorks] = useState<Work[]>(mockWorks);

  // Filter and sort works
  const filteredWorks = useMemo(() => {
    let result = [...works];

    // Filter by tool
    if (selectedTool !== 'all') {
      result = result.filter((work) => work.tool === selectedTool);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (work) =>
          work.title.toLowerCase().includes(query) ||
          work.positivePrompt.toLowerCase().includes(query) ||
          work.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result.sort((a, b) => b.likes - a.likes);
    }

    return result;
  }, [works, selectedTool, sortBy, searchQuery]);

  const handleLikeToggle = (workId: string) => {
    setWorks((prev) =>
      prev.map((work) =>
        work.id === workId
          ? { ...work, isLiked: !work.isLiked, likes: work.isLiked ? work.likes - 1 : work.likes + 1 }
          : work
      )
    );
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Header onSearch={setSearchQuery} searchValue={searchQuery} />

      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">内部AI创作共享平台</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">发现与分享</span>
            <br />
            <span className="text-foreground">AI 创意灵感</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            探索团队成员的精彩AI作品，复制提示词快速复用，激发你的创作灵感
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <ToolFilter
            selectedTool={selectedTool}
            onToolChange={setSelectedTool}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            共 <span className="text-foreground font-medium">{filteredWorks.length}</span> 个作品
            {searchQuery && (
              <span>
                ，搜索 "<span className="text-primary">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Works Grid */}
        {filteredWorks.length > 0 ? (
          <MasonryGrid works={filteredWorks} onLikeToggle={handleLikeToggle} />
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">暂无匹配作品</h3>
            <p className="text-muted-foreground">尝试调整筛选条件或搜索关键词</p>
          </div>
        )}
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
};

export default Index;
