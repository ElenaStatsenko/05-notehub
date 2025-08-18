import css from "./NoteForm.module.css";
import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
  onCancel: () => void;
}
interface ValuesFormProps {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
const valuesForm: ValuesFormProps = {
  title: "",
  content: "",
  tag: "Todo",
};
const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Name must be at least 2 characters")
    .max(500, "Name is too long")
    .required("Name is required"),
  content: Yup.string().max(50, "Name is too long"),
  tag: Yup.mixed<ValuesFormProps["tag"]>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});
export default function NoteForm({ onCancel }: NoteFormProps) {
  const handleSubmit = (
    values: ValuesFormProps,
    actions: FormikHelpers<ValuesFormProps>
  ) => {
    console.log("Order data:", values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={valuesForm}
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <span name="title" className={css.error}></span>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <span name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <span name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onCancel} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
