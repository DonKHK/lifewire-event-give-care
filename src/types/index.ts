// TODO: Supabase integration - replace these interfaces with Supabase types
export interface Uploader {
  id: string;
  name: string;
  avatar: string;
}

export interface Photo {
  id: string;
  imageUrl: string;
  caption: string;
  uploader: Uploader;
  likes: number;
  createdAt: string;
}

export interface EventStats {
  photos: number;
  supports: number;
  demoRaised: number;
  familiesHelped: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  heroImage: string;
  stats: EventStats;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  photosUploaded: number;
  supportsReceived: number;
  likesReceived: number;
}

export interface TopSupporter {
  name: string;
  avatar: string;
  supports: number;
}