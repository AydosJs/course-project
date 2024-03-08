import * as Yup from "yup";

export const collectionValidationSchema = Yup.object<Collection>().shape({
  cover: Yup.string(),
  name: Yup.string(),
  topic: Yup.string(),
  description: Yup.string(),
  ownerId: Yup.number(),

  customFields: Yup.array().of(
    Yup.object<CollectionCustomField>().shape({
      label: Yup.string().required("Label is required"),
      value: Yup.string().required("Value is required"),
    }),
  ),
});

export const registerValidationSchema = Yup.object<
  Pick<User, "name" | "email" | "password">
>().shape({
  name: Yup.string(),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required('"Email" is required'),
  password: Yup.string().required('"Password" is required'),
});
