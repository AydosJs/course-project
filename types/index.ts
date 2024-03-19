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
  name: string;
  topic: string;
  description: string;
  ownerId: string;
  publishedAt?: Date;
  cover?: string;
  customFields: JSONValue;
};

type Item = {
  id?: string;
  name: string;
  description: string;
  cover: string;
  likeCount: number;
  publishedAt?: Date;
  customFields: JSONValue;
  Tags?: Tags[];

  tagsId: string[];
  collectionId: string;
  ownerId: string;
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
  itemCommentsId: string | null;
  collectionCommentId: string | null;
};

type Tags = {
  id: string;
  text: string;
  userId: string;
  itemId: string;
  createdAt: Date;
};
