import * as Yup from "yup";

export const collectionValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
});
