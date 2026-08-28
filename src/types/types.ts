interface Profile {
  id: number;
  user_id: number;
  profile_image: string | null;
  bio: string | null;
  career: string | null;
  location: string | null;
  website: string | null;
  birthday: string | null;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  username: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  profile: Profile | null;
  posts?: Post[];
}
interface LoginPayload {
  email: string;
  password: string;
}

interface Category {
  id: number;
  name: string;
}
interface Post {
  id: number;
  title: string;
  body: string;
  slug: string;
  image: string | null;
  author_id: number;
  category_id: number;
  author: User;
  category: Category;
  created_at: string;
  updated_at: string;
}
export type { Profile, User, LoginPayload, Category, Post };
