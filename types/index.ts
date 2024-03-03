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

type CollectionCustomField = {
  label: string;
  value: string;
};

type CollectionType = {
  title: string;
  topic: string;
  description?: string;

  customFields: CollectionCustomField[];
};
