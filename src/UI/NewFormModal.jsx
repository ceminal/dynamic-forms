import ReactDom from "react-dom";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

const NewFormModal = (props) => {
  const inputLabelRef = useRef("");
  const inputPlaceholderRef = useRef("");
  const inputTypeRef = useRef("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddClick = (e) => {
    const label = inputLabelRef.current.value.trim();
    const placeholder = inputPlaceholderRef.current.value.trim();
    const type = inputTypeRef.current.value.trim();

    if (!label || !placeholder || !type) {
      setErrorMessage("All fields must be filled!");
      return;
    }

    const newField = {
      id: props.fields.length + 1,
      label,
      placeholder,
      type,
    };

    props.setFields((prevFields) => [...prevFields, newField]);
    props.toggleModal(e);
    setErrorMessage("");
  };

  const handleCloseModal = (e) => {
    props.toggleModal(e);
    setErrorMessage("");
  };

  if (!props.isModalOpen) return null;

  return ReactDom.createPortal(
    <div className="error-modal">
      <div className="flex justify-center items-center h-screen absolute">
        <div>
          <div className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={(e) => props.toggleModal(e)}
            ></div>
            {/* Modal Content Start*/}
            <div className="mb-5 bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
              <div className="bg-amber-500 text-white px-4 py-2 flex justify-between">
                <h2 className="text-lg font-semibold">Add New Form Field</h2>
              </div>
              <div className="p-4 text-black">
                <div className="mb-5">
                  <label
                    htmlFor="label"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Form Field Label
                  </label>
                  <input
                    type="text"
                    ref={inputLabelRef}
                    className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="placeholder"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Form Field Placeholder
                  </label>
                  <input
                    type="text"
                    ref={inputPlaceholderRef}
                    className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Form Field Type
                  </label>
                  <input
                    type="text"
                    ref={inputTypeRef}
                    className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                {errorMessage && (
                  <span className="text-rose-600">{errorMessage}</span>
                )}
                <div className="flex justify-end">
                  <button className="bg-lime-500 mx-2" onClick={handleAddClick}>
                    Add
                  </button>
                  <button
                    className="bg-red-500"
                    onClick={(e) => handleCloseModal(e)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            {/* Modal Content End */}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default NewFormModal;

NewFormModal.propTypes = {
  addFormField: PropTypes.func,
  toggleModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  setFields: PropTypes.func,
  fields: PropTypes.any,
};
