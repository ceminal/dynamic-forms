import Reactdom from "react-dom";
import PropTypes from "prop-types";

const CheckFormDataModal = (props) => {
  if (!props.checkDataModal) return null;
  console.log(props.formData);
  return Reactdom.createPortal(
    <div className="error-modal">
      <div className="flex justify-center items-center h-screen absolute">
        <div>
          <div className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={(e) => props.toggleCheckDataModal(e)}
            ></div>
            {/* Modal Content Start*/}
            <div className="mb-5 bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
              <div className="bg-sky-500 text-white px-4 py-2 flex justify-between">
                <h2 className="text-lg font-semibold">Check Form Data</h2>
              </div>
              <div className="p-4 text-black">
                <ul>
                  {props.formData.map((field, index) => (
                    <li key={index}>
                      <strong>{field.label}: </strong>
                      {field.value}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end">
                  <button onClick={props.handleConfirm} className="bg-lime-500 mx-2">Confirm</button>
                  <button
                    className="bg-red-500"
                    onClick={(e) => props.toggleCheckDataModal(e)}
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
    document.getElementById("modalCheck")
  );
};

export default CheckFormDataModal;

CheckFormDataModal.propTypes = {
  handleConfirm: PropTypes.func,
  value: PropTypes.string,
  formData: PropTypes.array,
  fields: PropTypes.array,
  toggleCheckDataModal: PropTypes.func,
  checkDataModal: PropTypes.bool,
  formRefs: PropTypes.array,
};
