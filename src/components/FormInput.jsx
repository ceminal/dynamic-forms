import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const FormInput = (props) => {
  const inputRef = useRef("");
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };
  const handleRemove = () => {
    props.onRemove && props.onRemove(props.id);
  };
  const deleteButton = props.id > 4 && (
    <button className="bg-red-500 text-white ms-4" onClick={handleRemove}>
      <TrashIcon className="h-5 w-5" />
    </button>
  );

  return (
    <div className="mb-5">
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-white"
      >
        {props.label}
      </label>
      <div className="flex">
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={props.placeholder}
          value={value}
          onChange={handleChange}
        />
        {deleteButton}
      </div>
    </div>
  );
};

export default FormInput;

FormInput.propTypes = {
  onRemove: PropTypes.any,
  onChange: PropTypes.func,
  formRefs: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};
