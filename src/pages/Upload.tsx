import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toolsConfig } from '@/data/mockData';
import { ToolType } from '@/types';
import { Upload as UploadIcon, X, Image as ImageIcon, ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tool, setTool] = useState<ToolType | ''>('');
  const [positivePrompt, setPositivePrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 9) {
      toast({
        description: '最多只能上传9张图片',
        variant: 'destructive',
      });
      return;
    }

    // Simulate upload with preview URLs
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({ description: '请输入作品标题', variant: 'destructive' });
      return;
    }
    if (images.length === 0) {
      toast({ description: '请至少上传一张图片', variant: 'destructive' });
      return;
    }
    if (!tool) {
      toast({ description: '请选择生图工具', variant: 'destructive' });
      return;
    }
    if (!positivePrompt.trim()) {
      toast({ description: '请输入正向提示词', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      description: '作品发布成功！',
    });

    navigate('/');
  };

  const toolOptions = Object.values(toolsConfig);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Header />

      <main className="container py-8 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </button>

        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">分享你的AI创作</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">上传作品</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              作品标题 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="给你的作品起一个响亮的名字"
              className="bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-base">
              作品图片 <span className="text-destructive">*</span>
              <span className="text-sm text-muted-foreground ml-2">
                （最多9张）
              </span>
            </Label>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {/* Uploaded Images */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border border-border/50 group"
                >
                  <img
                    src={image}
                    alt={`上传图片 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Upload Button */}
              {images.length < 9 && (
                <label
                  className={cn(
                    'aspect-square rounded-lg border-2 border-dashed border-border/50',
                    'flex flex-col items-center justify-center cursor-pointer',
                    'hover:border-primary/50 hover:bg-secondary/30 transition-colors'
                  )}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <UploadIcon className="h-6 w-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">上传</span>
                </label>
              )}
            </div>
          </div>

          {/* Tool Select */}
          <div className="space-y-2">
            <Label htmlFor="tool" className="text-base">
              生图工具 <span className="text-destructive">*</span>
            </Label>
            <Select value={tool} onValueChange={(value) => setTool(value as ToolType)}>
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue placeholder="选择使用的AI工具" />
              </SelectTrigger>
              <SelectContent>
                {toolOptions.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    <span className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <span>{t.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Positive Prompt */}
          <div className="space-y-2">
            <Label htmlFor="positivePrompt" className="text-base">
              正向提示词 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="positivePrompt"
              value={positivePrompt}
              onChange={(e) => setPositivePrompt(e.target.value)}
              placeholder="输入用于生成图像的提示词，用逗号分隔不同的描述..."
              rows={5}
              className="bg-secondary/50 border-border/50 focus:border-primary/50 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              提示：用英文逗号分隔不同的提示词片段，以便其他用户单独复制
            </p>
          </div>

          {/* Negative Prompt */}
          <div className="space-y-2">
            <Label htmlFor="negativePrompt" className="text-base">
              负向提示词
              <span className="text-sm text-muted-foreground ml-2">（选填）</span>
            </Label>
            <Textarea
              id="negativePrompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="输入需要排除的内容，如低质量、模糊等..."
              rows={3}
              className="bg-secondary/50 border-border/50 focus:border-primary/50 resize-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-base">
              标签
              <span className="text-sm text-muted-foreground ml-2">（选填，用逗号分隔）</span>
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="例如：赛博朋克, 科幻, 城市"
              className="bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1 border-border/50"
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gradient-primary hover:opacity-90"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  发布中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UploadIcon className="h-4 w-4" />
                  发布作品
                </span>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
