type Theme = "light" | "dark" | "system";

interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

type CollectionCustomField = {
  label: string;
  value: string;
};

type User = {
  id: string;
  name: string | null;
  image: string | null;
  email: string;
  emailVerified: Date | null;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

type Collection = {
  id: string;
  publishedAt?: Date;
  ownerId: string;
  description: string;
  name: string;
  topic: string;
  cover?: string;
  customFields: JSONValue;
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
  id?: string;
  name: string;
  description: string;
  cover: string;
  likeCount: number;
  publishedAt?: Date;

  tagsId: string[];
  collectionId: string;
  ownerId: string;
};

type Tags = {
  id: string;
  text: string;
  userId: string;
  itemId: string;
  createdAt: Date;
};
