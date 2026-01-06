import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MasonryGrid } from '@/components/MasonryGrid';
import { mockWorks, currentUser, getUserFavorites, getUserUploads } from '@/data/mockData';
import { Work } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Upload, Heart, Trash2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function MySpace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'uploads';

  const [uploads, setUploads] = useState<Work[]>(getUserUploads());
  const [favorites, setFavorites] = useState<Work[]>(getUserFavorites());

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  const handleDeleteUpload = (workId: string) => {
    setUploads((prev) => prev.filter((w) => w.id !== workId));
    toast({ description: '作品已删除' });
  };

  const handleRemoveFavorite = (workId: string) => {
    setFavorites((prev) => prev.filter((w) => w.id !== workId));
    toast({ description: '已取消收藏' });
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Header />

      <main className="container py-8">
        {/* User Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 rounded-2xl bg-card border border-border/50 gradient-border">
          <Avatar className="h-24 w-24 ring-4 ring-primary/20">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold mb-1">{currentUser.name}</h1>
            <p className="text-muted-foreground mb-4">{currentUser.department}</p>

            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{uploads.length}</div>
                <div className="text-sm text-muted-foreground">上传作品</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{favorites.length}</div>
                <div className="text-sm text-muted-foreground">收藏作品</div>
              </div>
            </div>
          </div>

          <Button asChild className="gradient-primary hover:opacity-90">
            <Link to="/upload">
              <Upload className="h-4 w-4 mr-2" />
              上传作品
            </Link>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary/50">
            <TabsTrigger
              value="uploads"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Upload className="h-4 w-4 mr-2" />
              我的上传
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Heart className="h-4 w-4 mr-2" />
              我的收藏
            </TabsTrigger>
          </TabsList>

          {/* Uploads Tab */}
          <TabsContent value="uploads" className="mt-6">
            {uploads.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploads.map((work) => (
                  <div
                    key={work.id}
                    className="group relative rounded-xl overflow-hidden bg-card border border-border/50 glow-card hover:glow-card-hover transition-all"
                  >
                    <Link to={`/work/${work.id}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={work.images[0]}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium line-clamp-1">{work.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {work.likes} 收藏
                        </p>
                      </div>
                    </Link>

                    {/* Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className={cn(
                            'absolute top-2 right-2 p-2 rounded-lg',
                            'bg-destructive/80 text-destructive-foreground',
                            'opacity-0 group-hover:opacity-100 transition-opacity',
                            'hover:bg-destructive'
                          )}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            确定要删除作品 "{work.title}" 吗？此操作无法撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUpload(work.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Upload}
                title="暂无上传作品"
                description="开始分享你的AI创作吧"
                action={
                  <Button asChild className="gradient-primary">
                    <Link to="/upload">
                      <Upload className="h-4 w-4 mr-2" />
                      上传作品
                    </Link>
                  </Button>
                }
              />
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map((work) => (
                  <div
                    key={work.id}
                    className="group relative rounded-xl overflow-hidden bg-card border border-border/50 glow-card hover:glow-card-hover transition-all"
                  >
                    <Link to={`/work/${work.id}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={work.images[0]}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium line-clamp-1">{work.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          by {work.author.name}
                        </p>
                      </div>
                    </Link>

                    {/* Remove Favorite Button */}
                    <button
                      onClick={() => handleRemoveFavorite(work.id)}
                      className={cn(
                        'absolute top-2 right-2 p-2 rounded-lg',
                        'bg-background/80 backdrop-blur-sm border border-border/50',
                        'opacity-0 group-hover:opacity-100 transition-opacity',
                        'hover:border-destructive/50'
                      )}
                    >
                      <Heart className="h-4 w-4 fill-destructive text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Heart}
                title="暂无收藏作品"
                description="浏览作品并收藏你喜欢的创作"
                action={
                  <Button asChild variant="outline">
                    <Link to="/">探索作品</Link>
                  </Button>
                }
              />
            )}
          </TabsContent>
        </Tabs>
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

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      {action}
    </div>
  );
}
