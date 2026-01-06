// 作品类型
export interface Work {
  id: string;
  title: string;
  images: string[];
  tool: ToolType;
  positivePrompt: string;
  negativePrompt?: string;
  tags: string[];
  author: User;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

// 用户类型
export interface User {
  id: string;
  name: string;
  avatar: string;
  department?: string;
}

// 工具类型
export type ToolType = 'midjourney' | 'stable-diffusion' | 'dall-e' | 'flux' | 'jimeng' | 'doubao' | 'other';

// 工具信息
export interface ToolInfo {
  id: ToolType;
  name: string;
  shortName: string;
  color: string;
  icon: string;
}

// 平台类型
export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  tags?: string[];
}

// 筛选参数
export interface FilterParams {
  tool?: ToolType | 'all';
  sort?: 'latest' | 'popular';
  search?: string;
}

// 分页参数
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 提示词片段
export interface PromptSegment {
  id: string;
  text: string;
  type: 'positive' | 'negative';
}
