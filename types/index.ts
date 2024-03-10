type Theme = "light" | "dark" | "system";

interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

type CollectionCustomField = {
  label: string;
  value: string;
};

type CollectionType = {
  id: string;
  name: string;
  topic: string;
  description: string;
  ownerId: string;
  publishedAt: Date;
  cover: string;
  customFields?: any;
};

type User = {
  id: string;
  name?: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
};

type Collection = {
  id: string;
  name: string;
  topic: string;
  description: string;
  ownerId: string;
  publishedAt?: Date;
  cover?: string;
  customFields?: any; // Use the specific type for custom fields
};

type CommentType = {
  id: string;
  userId: string;
  date: Date;
  text: string;
  likeCount: number;

  collectionId?: string | null;
  itemId?: string | null;
};

type ItemLike = {
  id: string;
  likedAt: Date;
  userId: string;
  itemId: string | null;
};

type CommentLike = {
  id: string;
  likedAt: Date;
  userId: string;
  commentId: string | null;
};

type Item = {
  id: string;
  name: string;
  description: string;
  publishedAt: Date;
  cover: string;
  likeCount: number;
  tags: string[];
  collectionId: string;
  ownerId: string;
};
