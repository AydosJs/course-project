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
  id: number;
  name: string;
  topic: string;
  description: string;
  ownerId: number;
  publishedAt: Date;
  cover: string;
  customFields?: any;
};

type User = {
  id: number;
  name?: string;
  email: string;
  password: string;
  registeredAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
};

type Collection = {
  id: number;
  name: string;
  topic: string;
  description: string;
  ownerId: number;
  publishedAt?: Date;
  cover?: string;
  customFields?: any; // Use the specific type for custom fields
};

type CommentType = {
  id: number;
  userId: number;
  date: Date;
  text: string;
  likeCount: number;

  collectionId?: number | null;
  itemId?: number | null;
};

type Like = {
  id: number;
  likedAt: Date;
  userId: number;
  commentId: number;

  Comment: Comment;
  Item: Item;
  itemId: number;
};

type Item = {
  id: number;
  name: string;
  description: string;
  publishedAt: Date;
  cover: string;
  likeCount: number;
  tags: string[];
  collectionId: number;
};
