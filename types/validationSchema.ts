import { ItemCustomField } from "@/app/[locale]/collection/[collectionId]/create/item/ItemForm";
import * as Yup from "yup";

export const collectionValidationSchema = Yup.object<{
  ownerId: string;
  description: string;
  name: string;
  topic: string;
  cover: string;
  customFields: CollectionCustomField[];
}>().shape({
  name: Yup.string().required('"Name" is required'),
  ownerId: Yup.string(),
  description: Yup.string(),
  topic: Yup.string(),
  cover: Yup.string().nullable(),
  customFields: Yup.array().of(
    Yup.object<CollectionCustomField>().shape({
      label: Yup.string().required("Label is required"),
      type: Yup.string().required("Value is required"),
    }),
  ),
});

export const itemValidationSchema = Yup.object<{
  name: string;
  description: string;
  cover: string;
  customFields: ItemCustomField[];
}>().shape({
  name: Yup.string().required('"Name" is required'),
  description: Yup.string(),
  cover: Yup.string().nullable(),
  customFields: Yup.array().of(
    Yup.object<ItemCustomField>().shape({
      label: Yup.string().required("Label is required"),
      value: Yup.string().required("Required"),
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
