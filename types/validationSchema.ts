import * as Yup from "yup";

export const collectionValidationSchema = Yup.object<CollectionType>().shape({
  title: Yup.string().required("Title is required"),
  topic: Yup.string().required("Topic is required"),
  description: Yup.string(),
  customFields: Yup.array()
    .of(
      Yup.object<CollectionCustomField>().shape({
        label: Yup.string().required("Label is required"),
        value: Yup.string().required("Value is required"),
      })
    )
    .required(),
});
