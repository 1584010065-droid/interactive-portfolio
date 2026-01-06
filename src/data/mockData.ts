import { Work, User, Platform, ToolInfo, ToolType } from '@/types';

// 当前模拟登录用户
export const currentUser: User = {
  id: 'user-001',
  name: '李明',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  department: '设计部',
};

// 工具信息配置
export const toolsConfig: Record<ToolType, ToolInfo> = {
  'midjourney': {
    id: 'midjourney',
    name: 'Midjourney',
    shortName: 'MJ',
    color: 'hsl(265 89% 62%)',
    icon: '🎨',
  },
  'stable-diffusion': {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    shortName: 'SD',
    color: 'hsl(200 100% 60%)',
    icon: '🖼️',
  },
  'dall-e': {
    id: 'dall-e',
    name: 'DALL·E',
    shortName: 'DE',
    color: 'hsl(160 84% 50%)',
    icon: '🤖',
  },
  'flux': {
    id: 'flux',
    name: 'Flux',
    shortName: 'FX',
    color: 'hsl(330 90% 60%)',
    icon: '⚡',
  },
  'jimeng': {
    id: 'jimeng',
    name: '即梦',
    shortName: '即梦',
    color: 'hsl(45 100% 55%)',
    icon: '✨',
  },
  'doubao': {
    id: 'doubao',
    name: '豆包',
    shortName: '豆包',
    color: 'hsl(15 90% 55%)',
    icon: '🫘',
  },
  'other': {
    id: 'other',
    name: '其他',
    shortName: '其他',
    color: 'hsl(0 0% 60%)',
    icon: '🔧',
  },
};

// 模拟用户数据
const users: User[] = [
  currentUser,
  {
    id: 'user-002',
    name: '王芳',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    department: '产品部',
  },
  {
    id: 'user-003',
    name: '张伟',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    department: '技术部',
  },
  {
    id: 'user-004',
    name: '刘洋',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    department: '市场部',
  },
  {
    id: 'user-005',
    name: '陈静',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    department: '设计部',
  },
];

// 模拟作品数据
export const mockWorks: Work[] = [
  {
    id: 'work-001',
    title: '赛博朋克城市夜景',
    images: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    ],
    tool: 'midjourney',
    positivePrompt: 'cyberpunk city, neon lights, rain, reflections, futuristic buildings, flying cars, holographic advertisements, night scene, ultra detailed, cinematic lighting, 8k, masterpiece',
    negativePrompt: 'blurry, low quality, distorted, ugly, bad anatomy',
    tags: ['赛博朋克', '城市', '夜景', '科幻'],
    author: users[0],
    createdAt: '2024-01-15T10:30:00Z',
    likes: 128,
    isLiked: false,
  },
  {
    id: 'work-002',
    title: '二次元少女立绘',
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    ],
    tool: 'stable-diffusion',
    positivePrompt: 'anime girl, silver hair, blue eyes, school uniform, cherry blossoms, spring, soft lighting, beautiful detailed eyes, high quality, masterpiece, best quality',
    negativePrompt: 'bad hands, extra fingers, mutated hands, poorly drawn face, mutation, deformed',
    tags: ['二次元', '立绘', '少女', '春天'],
    author: users[1],
    createdAt: '2024-01-14T15:45:00Z',
    likes: 256,
    isLiked: true,
  },
  {
    id: 'work-003',
    title: '未来科技产品设计',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    ],
    tool: 'dall-e',
    positivePrompt: 'futuristic headphones, transparent materials, holographic display, minimalist design, floating elements, soft glow, product photography, studio lighting, 4k render',
    tags: ['产品设计', '科技', '未来感', '工业设计'],
    author: users[2],
    createdAt: '2024-01-13T09:20:00Z',
    likes: 89,
    isLiked: false,
  },
  {
    id: 'work-004',
    title: '梦幻森林精灵',
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
    ],
    tool: 'flux',
    positivePrompt: 'fantasy forest, magical fairy, glowing wings, bioluminescent plants, misty atmosphere, ethereal light, enchanted woodland, ultra realistic, ray tracing',
    negativePrompt: 'cartoon, anime, low resolution, text, watermark',
    tags: ['奇幻', '森林', '精灵', '魔法'],
    author: users[3],
    createdAt: '2024-01-12T18:00:00Z',
    likes: 312,
    isLiked: true,
  },
  {
    id: 'work-005',
    title: '中国风山水画',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    tool: 'jimeng',
    positivePrompt: '中国水墨画风格, 高山流水, 云雾缭绕, 松树, 古典建筑, 留白构图, 写意风格, 禅意, 高清细节',
    tags: ['中国风', '山水', '水墨', '传统艺术'],
    author: users[4],
    createdAt: '2024-01-11T14:30:00Z',
    likes: 198,
    isLiked: false,
  },
  {
    id: 'work-006',
    title: '机械战甲设计',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    ],
    tool: 'midjourney',
    positivePrompt: 'mecha armor, giant robot, detailed mechanical parts, battle stance, energy core, glowing eyes, metallic texture, sci-fi background, epic composition, dramatic lighting',
    negativePrompt: 'simple, flat, 2d, cartoon style',
    tags: ['机甲', '机器人', '科幻', '战斗'],
    author: users[0],
    createdAt: '2024-01-10T11:15:00Z',
    likes: 445,
    isLiked: false,
  },
  {
    id: 'work-007',
    title: '复古胶片人像',
    images: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    ],
    tool: 'stable-diffusion',
    positivePrompt: 'vintage film photography, portrait, woman, natural light, soft focus, film grain, warm tones, golden hour, kodak portra 400, nostalgic mood',
    negativePrompt: 'digital look, over-processed, HDR, oversaturated',
    tags: ['人像', '复古', '胶片', '摄影'],
    author: users[1],
    createdAt: '2024-01-09T16:45:00Z',
    likes: 167,
    isLiked: true,
  },
  {
    id: 'work-008',
    title: '抽象艺术创作',
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    ],
    tool: 'dall-e',
    positivePrompt: 'abstract art, fluid shapes, vibrant colors, organic forms, digital painting, modern art, color splash, dynamic composition, artistic expression',
    tags: ['抽象', '艺术', '色彩', '现代'],
    author: users[2],
    createdAt: '2024-01-08T08:30:00Z',
    likes: 78,
    isLiked: false,
  },
  {
    id: 'work-009',
    title: '太空探索概念图',
    images: [
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    ],
    tool: 'flux',
    positivePrompt: 'space exploration, astronaut, distant planet, starfield, nebula background, spacecraft, cosmic scale, photorealistic, NASA style, cinematic composition',
    negativePrompt: 'cartoon, unrealistic, low detail',
    tags: ['太空', '探索', '宇航员', '科幻'],
    author: users[3],
    createdAt: '2024-01-07T20:00:00Z',
    likes: 534,
    isLiked: false,
  },
  {
    id: 'work-010',
    title: '美食摄影风格',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    tool: 'doubao',
    positivePrompt: '精致美食摄影, 日式料理, 精美摆盘, 自然光线, 浅景深, 木质餐具, 简约背景, 高级餐厅风格, 4K高清',
    tags: ['美食', '摄影', '日式', '料理'],
    author: users[4],
    createdAt: '2024-01-06T12:00:00Z',
    likes: 223,
    isLiked: true,
  },
  {
    id: 'work-011',
    title: '建筑可视化渲染',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    ],
    tool: 'midjourney',
    positivePrompt: 'modern architecture, glass facade, contemporary building, urban landscape, sunset lighting, architectural visualization, photorealistic render, 8k quality',
    negativePrompt: 'old style, traditional, low poly',
    tags: ['建筑', '可视化', '现代', '设计'],
    author: users[0],
    createdAt: '2024-01-05T17:30:00Z',
    likes: 156,
    isLiked: false,
  },
  {
    id: 'work-012',
    title: '游戏角色概念设计',
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    ],
    tool: 'stable-diffusion',
    positivePrompt: 'game character design, fantasy warrior, detailed armor, magical weapon, dynamic pose, concept art, artstation style, high detail, professional illustration',
    negativePrompt: 'amateur, sketch, unfinished',
    tags: ['游戏', '角色', '概念', '战士'],
    author: users[1],
    createdAt: '2024-01-04T13:15:00Z',
    likes: 387,
    isLiked: false,
  },
];

// 常用平台数据
export const platforms: Platform[] = [
  {
    id: 'doubao',
    name: '豆包',
    description: '字节跳动出品的AI对话助手，支持多模态交互',
    url: 'https://www.doubao.com',
    icon: '🫘',
    color: 'hsl(15 90% 55%)',
    tags: ['对话', '多模态', '字节'],
  },
  {
    id: 'jimeng',
    name: '即梦',
    description: '字节跳动AI绘画工具，擅长中国风与创意设计',
    url: 'https://jimeng.jianying.com',
    icon: '✨',
    color: 'hsl(45 100% 55%)',
    tags: ['绘画', '中国风', '创意'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google最新多模态AI模型，强大的理解与生成能力',
    url: 'https://gemini.google.com',
    icon: '💎',
    color: 'hsl(200 100% 60%)',
    tags: ['Google', '多模态', 'AI'],
  },
  {
    id: 'lovart',
    name: 'Lovart',
    description: '专注二次元与线稿创作的AI绘画平台',
    url: 'https://www.lovart.ai',
    icon: '💜',
    color: 'hsl(280 80% 60%)',
    tags: ['二次元', '线稿', '动漫'],
  },
  {
    id: 'qwen',
    name: '通义千问',
    description: '阿里云出品的大语言模型，支持多种创作任务',
    url: 'https://tongyi.aliyun.com',
    icon: '🌐',
    color: 'hsl(25 90% 55%)',
    tags: ['阿里', '语言模型', '创作'],
  },
  {
    id: 'liblib',
    name: 'LiblibAI',
    description: '国内领先的AI绘画社区，丰富的模型与资源',
    url: 'https://www.liblib.art',
    icon: '🎭',
    color: 'hsl(330 85% 55%)',
    tags: ['社区', '模型', 'SD'],
  },
];

// 获取用户收藏的作品
export const getUserFavorites = (): Work[] => {
  return mockWorks.filter(work => work.isLiked);
};

// 获取用户上传的作品
export const getUserUploads = (): Work[] => {
  return mockWorks.filter(work => work.author.id === currentUser.id);
};
