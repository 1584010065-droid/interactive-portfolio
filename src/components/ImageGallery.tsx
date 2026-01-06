import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group rounded-xl overflow-hidden bg-secondary/30 border border-border/50">
          <img
            src={images[currentIndex]}
            alt={`${title} - 图片 ${currentIndex + 1}`}
            className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-300"
            onClick={() => setIsZoomed(true)}
          />

          {/* Zoom Hint */}
          <button
            onClick={() => setIsZoomed(true)}
            className={cn(
              'absolute top-4 right-4 p-2 rounded-lg',
              'bg-background/80 backdrop-blur-sm border border-border/50',
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'hover:bg-background'
            )}
          >
            <ZoomIn className="h-5 w-5" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full',
                  'bg-background/80 backdrop-blur-sm border border-border/50',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  'hover:bg-background hover:scale-110'
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className={cn(
                  'absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full',
                  'bg-background/80 backdrop-blur-sm border border-border/50',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  'hover:bg-background hover:scale-110'
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                  currentIndex === index
                    ? 'border-primary glow-purple'
                    : 'border-border/50 hover:border-primary/50 opacity-60 hover:opacity-100'
                )}
              >
                <img
                  src={image}
                  alt={`缩略图 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoomed Modal */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-xl border-border/50">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={images[currentIndex]}
              alt={`${title} - 放大查看`}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Navigation in Modal */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
