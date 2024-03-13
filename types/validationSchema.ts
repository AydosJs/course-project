import * as Yup from "yup";

export const collectionValidationSchema = Yup.object<Collection>().shape({
  cover: Yup.string(),
  name: Yup.string(),
  topic: Yup.string(),
  description: Yup.string(),
  ownerId: Yup.string(),

  customFields: Yup.array().of(
    Yup.object<CollectionCustomField>().shape({
      label: Yup.string().required("Label is required"),
      value: Yup.string().required("Value is required"),
    }),
  ),
});

export const registerValidationSchema = Yup.object<{
  name: string;
  email: string;
  password: string;
}>().shape({
  // Use plain object type
  name: Yup.string(),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required('"Email" is required'),
  password: Yup.string().required('"Password" is required'),
});

export const loginValidationSchema = Yup.object<
  Pick<User, "email" | "password">
>().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required('"Email" is required'),
  password: Yup.string().required('"Password" is required'),
});

export const userValidation = Yup.object<{
  name: string;
  email: string;
  image: string | null;
}>().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required('"Email" is required'),
  name: Yup.string().min(1),
  image: Yup.string().nullable(),
});
