import type { Event, Photo, UserProfile, TopSupporter } from "@/types";

// TODO: Replace with Supabase database queries
export const mockEvent: Event = {
  id: "event-1",
  title: "Lifewire Event — Give Care",
  date: "2026年7月18日 (星期六) | 上午10時至下午6時",
  description:
    "一場充滿愛與希望的慈善活動，凝聚社群力量，守護 rare disease 家庭。你嘅每一步，都係佢哋嘅希望。",
  heroImage:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
  stats: {
    photos: 1247,
    supports: 3821,
    demoRaised: 52800,
    familiesHelped: 156,
  },
};

export const mockPhotos: Photo[] = [
  {
    id: "photo-1",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    caption: "一班義工同 rare disease 家庭一齊享受快樂嘅午後時光 💚",
    uploader: { id: "u1", name: "陳小美", avatar: "https://i.pravatar.cc/150?u=u1" },
    likes: 142,
    createdAt: "2026-07-18T10:30:00Z",
  },
  {
    id: "photo-2",
    imageUrl:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    caption: "小朋友們一齊畫畫，每個笑容都係我哋嘅動力 🎨",
    uploader: { id: "u2", name: "張志強", avatar: "https://i.pravatar.cc/150?u=u2" },
    likes: 98,
    createdAt: "2026-07-18T11:15:00Z",
  },
  {
    id: "photo-3",
    imageUrl:
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&q=80",
    caption: "手牽手，一齊走。守護呢一刻 💕",
    uploader: { id: "u3", name: "李婉儀", avatar: "https://i.pravatar.cc/150?u=u3" },
    likes: 256,
    createdAt: "2026-07-18T12:00:00Z",
  },
  {
    id: "photo-4",
    imageUrl:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",
    caption: "義工團隊準備咗好多愛心禮物俾每個家庭 🎁",
    uploader: { id: "u4", name: "黃凱晴", avatar: "https://i.pravatar.cc/150?u=u4" },
    likes: 187,
    createdAt: "2026-07-18T13:20:00Z",
  },
  {
    id: "photo-5",
    imageUrl:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
    caption: "社區一齊分享故事，互相支持同鼓勵 🤗",
    uploader: { id: "u5", name: "林浩然", avatar: "https://i.pravatar.cc/150?u=u5" },
    likes: 73,
    createdAt: "2026-07-18T14:00:00Z",
  },
  {
    id: "photo-6",
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
    caption: "你嘅支持可以守護 rare disease 家庭 🌟",
    uploader: { id: "u6", name: "劉思敏", avatar: "https://i.pravatar.cc/150?u=u6" },
    likes: 312,
    createdAt: "2026-07-18T14:45:00Z",
  },
  {
    id: "photo-7",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
    caption: "活動現場充滿笑聲同溫暖，感謝每一位支持者 🙏",
    uploader: { id: "u7", name: "鄧子峰", avatar: "https://i.pravatar.cc/150?u=u7" },
    likes: 165,
    createdAt: "2026-07-18T15:30:00Z",
  },
  {
    id: "photo-8",
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    caption: "一齊做運動，為 rare disease 家庭打氣 💪",
    uploader: { id: "u8", name: "吳雅琳", avatar: "https://i.pravatar.cc/150?u=u8" },
    likes: 89,
    createdAt: "2026-07-18T16:10:00Z",
  },
  {
    id: "photo-9",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
    caption: "每個承諾，都係一份希望。分享呢一刻 ❤️",
    uploader: { id: "u9", name: "何俊傑", avatar: "https://i.pravatar.cc/150?u=u9" },
    likes: 201,
    createdAt: "2026-07-18T16:55:00Z",
  },
  {
    id: "photo-10",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    caption: "今次活動圓滿結束！多謝你哋每一位！我哋下年再見 🎉",
    uploader: { id: "u10", name: "Lifewire 團隊", avatar: "https://i.pravatar.cc/150?u=lifewire" },
    likes: 428,
    createdAt: "2026-07-18T18:00:00Z",
  },
];

// Mock user profile — in production, fetch from Supabase Auth + DB
export const mockUserProfile: UserProfile = {
  id: "u-profile",
  name: "陳小美",
  avatar: "https://i.pravatar.cc/150?u=u1",
  photosUploaded: 3,
  supportsReceived: 47,
  likesReceived: 185,
};

// Photos uploaded by the current mock user
export const getMyPhotos = (): Photo[] => {
  return mockPhotos.filter((p) => p.uploader.id === mockUserProfile.id);
};

// Top supporters (fake data for admin)
export const mockTopSupporters: TopSupporter[] = [
  { name: "陳大文", avatar: "https://i.pravatar.cc/150?u=s1", supports: 89 },
  { name: "王小敏", avatar: "https://i.pravatar.cc/150?u=s2", supports: 72 },
  { name: "李志強", avatar: "https://i.pravatar.cc/150?u=s3", supports: 65 },
  { name: "張美玲", avatar: "https://i.pravatar.cc/150?u=s4", supports: 54 },
  { name: "黃浩然", avatar: "https://i.pravatar.cc/150?u=s5", supports: 41 },
];

export const getPhotoById = (id: string): Photo | undefined => {
  return mockPhotos.find((photo) => photo.id === id);
};

export const getTopPhotos = (count: number = 6): Photo[] => {
  return [...mockPhotos].sort((a, b) => b.likes - a.likes).slice(0, count);
};

export const getMostLikedPhoto = (): Photo | undefined => {
  return [...mockPhotos].sort((a, b) => b.likes - a.likes)[0];
};