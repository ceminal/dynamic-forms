import formFields from "../data/FormFieldData/FormFieldData.json";
import FormInput from "./FormInput";
import NewFormModal from "../UI/NewFormModal";
import { useState } from "react";
import CheckFormDataModal from "../UI/CheckFormDataModal";

const FormFields = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkDataModal, setCheckDataModal] = useState(false);
  const [fields, setFields] = useState(formFields.formFieldData);
  const [showAlert, setShowAlert] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setIsModalOpen((prevState) => !prevState);
  };

  const toggleCheckDataModal = (e) => {
    e.preventDefault();
    setCheckDataModal((prevState) => !prevState);
  };

  const addFormField = (formData) => {
    const newField = {
      id: fields.length + 1,
      ...formData,
    };
    setFields((prevFields) => [...prevFields, newField]);
  };

  const getFormData = () => {
    return fields.map((field) => ({
      label: field.label,
      value: field.value,
    }));
  };

  const updateFormField = (id, value) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value: value } : field
      )
    );
  };

  const handleConfirm = (e) => {
    toggleCheckDataModal(e);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleRemoveField = (id) => {
    setFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  return (
    <form className="w-full max-w-sm">
       {showAlert && (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-5"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Info</p>
              <p className="text-sm">Form Data Confirmed</p>
            </div>
          </div>
        </div>
      )}
      {fields.map((field) => (
        <FormInput
          key={field.id}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          id={field.id}
          value={field.value}
          onChange={(value) => updateFormField(field.id, value)}
          onRemove={handleRemoveField}
          {...field}
        />
      ))}
      <button className="bg-lime-500 mb-5 text-black" onClick={toggleModal}>
        Add New Form Field
      </button>
      <button
        className="bg-amber-500 text-black"
        onClick={toggleCheckDataModal}
      >
        Check & Confirm Your Form
      </button>
      <NewFormModal
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        addFormField={addFormField}
        fields={fields}
        setFields={setFields}
      />
      <CheckFormDataModal
        toggleCheckDataModal={toggleCheckDataModal}
        checkDataModal={checkDataModal}
        fields={fields}
        formData={getFormData()}
        handleConfirm={handleConfirm}
      />
    </form>
  );
};

export default FormFields;
