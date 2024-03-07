import * as Yup from "yup";

export const collectionValidationSchema = Yup.object<
  Pick<
    Collection,
    "cover" | "name" | "topic" | "description" | "ownerId" | "publishedAt"
  >
>().shape({
  cover: Yup.string(),
  name: Yup.string(),
  topic: Yup.string(),
  description: Yup.string(),
  ownerId: Yup.number(),
  publishedAt: Yup.date(),

  customFields: Yup.array().of(
    Yup.object<CollectionCustomField>().shape({
      label: Yup.string().required("Label is required"),
      value: Yup.string().required("Value is required"),
    }),
  ),
});
