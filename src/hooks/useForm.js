import { useEffect, useState } from "react";

export const useForm = (
  initialState = {},
  initialStateValidations = {},
  validationMessages = {},
  validate = false
) => {
  const [values, setValues] = useState(initialState);
  const [validations, setValidations] = useState(initialStateValidations);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (validate) {
      let isvalid = true;

      Object.keys(validations).forEach((key) => {
        if (validations[key].invalid) {
          isvalid = false;
        }
      });

      setValid(isvalid);
    } else {
      setValid(true);
    }
  }, [validations]);

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const triggerValidation = () => {
    if (validate) {
      const validationsList = [];
      for (const [id, value] of Object.entries(values)) {
        if (validations[id]) {
          validationsList.push(updateValidationMultiple(id, value));
        }
      }

      const obj = {};
      validationsList.forEach((element, index) => {
        obj[element.id] = element.value;
      });

      setValidations(obj);
    }
  };

  const updateValidation = (id, value) => {
    if (validate && validations[id]) {
      if (
        value === "" ||
        value === " " ||
        value === "-1" ||
        value === null ||
        value?.toString().trim() === ""
      ) {
        setValidations({
          ...validations,
          [id]: {
            invalid: true,
            message: validationMessages[id],
          },
        });
      } else {
        setValidations({
          ...validations,
          [id]: {
            invalid: false,
            message: "",
          },
        });
      }
    }
  };

  const updateValidationMultiple = (id, value) => {
    if (validate && validations[id]) {
      if (
        value === "" ||
        value === " " ||
        value === "-1" ||
        value === null ||
        value?.toString().trim() === ""
      ) {
        return {
          id: id.toString(),
          value: { invalid: true, message: validationMessages[id] },
        };
      } else {
        return { id: id.toString(), value: { invalid: false, message: "" } };
      }
    }
  };

  const handleInputChange = ({ id, value, file }) => {
    updateValidation(id, value);

    if (file) {
      setValues({
        ...values,
        [id]: value,
        [`${id}File`]: file,
      });
    } else {
      setValues({
        ...values,
        [id]: value,
      });
    }
  };

  return [
    values,
    validations,
    valid,
    handleInputChange,
    triggerValidation,
    reset,
  ];
};