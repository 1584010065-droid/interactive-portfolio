import { Work } from '@/types';
import { toolsConfig } from '@/data/mockData';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WorkCardProps {
  work: Work;
  onLikeToggle?: (workId: string) => void;
}

export function WorkCard({ work, onLikeToggle }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(work.isLiked);
  const [imageLoaded, setImageLoaded] = useState(false);
  const toolInfo = toolsConfig[work.tool];

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLikeToggle?.(work.id);
  };

  return (
    <Link to={`/work/${work.id}`} className="block">
      <div
        className={cn(
          'group relative rounded-xl overflow-hidden bg-card border border-border/50',
          'transition-all duration-300 ease-out',
          isHovered ? 'glow-card-hover scale-[1.02]' : 'glow-card'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-auto overflow-hidden">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse" />
          )}
          
          <img
            src={work.images[0]}
            alt={work.title}
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'w-full h-auto object-cover transition-transform duration-500',
              isHovered && 'scale-105',
              !imageLoaded && 'opacity-0'
            )}
          />

          {/* Hover Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            )}
          />

          {/* Like Button */}
          <button
            onClick={handleLikeClick}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full',
              'bg-background/80 backdrop-blur-sm border border-border/50',
              'opacity-0 group-hover:opacity-100 transition-all duration-200',
              'hover:scale-110 active:scale-95',
              isLiked && 'opacity-100'
            )}
          >
            <Heart
              className={cn(
                'h-5 w-5 transition-colors',
                isLiked ? 'fill-destructive text-destructive' : 'text-foreground'
              )}
            />
          </button>

          {/* Tool Badge */}
          <div
            className={cn(
              'absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium',
              'bg-background/80 backdrop-blur-sm border border-border/50',
              'flex items-center gap-1.5'
            )}
          >
            <span>{toolInfo.icon}</span>
            <span>{toolInfo.shortName}</span>
          </div>

          {/* Multiple Images Indicator */}
          {work.images.length > 1 && (
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-xs font-medium bg-background/80 backdrop-blur-sm">
              +{work.images.length - 1}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {work.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={work.author.avatar} alt={work.author.name} />
                <AvatarFallback className="text-xs">{work.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{work.author.name}</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className={cn('h-4 w-4', isLiked && 'fill-destructive text-destructive')} />
              <span className="text-sm">{work.likes + (isLiked && !work.isLiked ? 1 : 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
