import { useEffect, useRef } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Plan title is required'),
  courseDescription: Yup.string(),
  description: Yup.string(),
  topics: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required('Topic title is required'),
        description: Yup.string(),
        videoUrl: Yup.string()
          .url('Must be a valid URL')
          .nullable()
          .notRequired()
          .test('valid-url', 'Invalid URL', (val) => !val || isValidUrl(val)),
        completed: Yup.boolean(),
      })
    )
    .min(1, 'At least one topic is required'),
});

const LearningPlanForm = ({ formData, setFormData, isEditing, onSubmit, onCancel }) => {
  const convertToEmbedUrl = (url) =>
    url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url;

  const titleRef = useRef(null);

  useEffect(() => {
    setTimeout(() => titleRef.current?.focus(), 200);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto border">
        <button
          onClick={onCancel}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
          title="Close"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold mb-6">{isEditing ? 'Update Plan' : 'Create Plan'}</h3>

        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            try {
              const updated = {
                ...values,
                topics: values.topics.map((t) => ({
                  ...t,
                  videoUrl: convertToEmbedUrl(t.videoUrl),
                })),
              };
              onSubmit(updated);
              toast.success('Plan created successfully!');
            } catch (error) {
              toast.error('Something went wrong.');
              // Scroll to first error
              const errorEl = document.querySelector('.text-red-500');
              if (errorEl) {
                errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting, isValid }) => (
            <Form className="space-y-5">
              <Field
                name="title"
                innerRef={titleRef}
                placeholder="Plan Title"
                className="w-full border p-2 rounded-md"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

              <Field
                as="textarea"
                name="description"
                placeholder="Short Description"
                rows={2}
                className="w-full border p-2 rounded-md"
              />

              <Field
                as="textarea"
                name="courseDescription"
                placeholder="Course Description"
                rows={3}
                className="w-full border p-2 rounded-md"
              />

              <div>
                <h4 className="font-semibold mb-2">Topics</h4>

                <FieldArray name="topics">
                  {({ remove, push }) => (
                    <div>
                      {values.topics.map((topic, index) => (
                        <div key={index} className="border border-gray-300 rounded-md p-3 mb-4 space-y-2">
                          <Field
                            name={`topics[${index}].title`}
                            placeholder="Topic Title"
                            className="w-full border p-2 rounded-md"
                          />
                          <ErrorMessage name={`topics[${index}].title`} component="div" className="text-red-500 text-sm" />

                          <Field
                            as="textarea"
                            name={`topics[${index}].description`}
                            placeholder="Topic Description"
                            className="w-full border p-2 rounded-md"
                          />

                          <Field
                            name={`topics[${index}].videoUrl`}
                            placeholder="Video URL"
                            className="w-full border p-2 rounded-md"
                            onBlur={(e) =>
                              setFieldValue(`topics[${index}].videoUrl`, convertToEmbedUrl(e.target.value))
                            }
                          />
                          <ErrorMessage name={`topics[${index}].videoUrl`} component="div" className="text-red-500 text-sm" />

                          {/* Video Preview */}
                          {isValidUrl(topic.videoUrl) && (
                            <iframe
                              src={convertToEmbedUrl(topic.videoUrl)}
                              title={`Preview-${index}`}
                              className="w-full h-40 rounded-md mt-2"
                              allowFullScreen
                            />
                          )}

                          <div className="flex items-center gap-2">
                            <Field type="checkbox" name={`topics[${index}].completed`} />
                            <span className="text-sm">Completed</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove Topic
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          push({ title: '', description: '', completed: false, videoUrl: '' })
                        }
                        className="text-sm text-purple-600 hover:underline"
                      >
                        + Add Topic
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`bg-purple-600 text-white px-4 py-2 rounded-md ${isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                    }`}
                >
                  {isSubmitting ? 'Submitting...' : isEditing ? 'Update Plan' : 'Create Plan'}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LearningPlanForm;
