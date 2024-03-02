type IUser = {
  name?: string;
  email: string;
  password: string;
};

type Theme = "light" | "dark" | "system";

interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

type CollectionType = {
  title: string;
  description?: string;
};
