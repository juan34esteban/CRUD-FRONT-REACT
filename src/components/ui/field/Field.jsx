import { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { InputGroup, Form } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

import "./Field.scss";

const Field = ({
  label,
  value = "",
  error,
  isInvalid,
  placeHolder = "",
  onChange,
  id,
  type = "text",
  index = 0,
  required = false,
  disabled = false,
  className = "",
  options = [],
  name,
  checked = false,
  inline,
  reverse,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const handleOnChange = useCallback((event) => {
    let file = null;

    if (type === "file") {
      file = event.target.files[0];
    } else if (type === "radio") {
      id = event.target.name;
    }

    onChange({ value: event.target.value, file, id, event });
  });

  const handleShow = useCallback(() => {
    setShow(!show);
  });

  const showButton = useMemo(() => {
    if (type !== "password") {
      return null;
    }

    return (
      <InputGroup.Text
        id={`input-area-${id}`}
        onClick={handleShow}
        disabled={disabled}
        className={
          disabled === false
            ? "mb-input-group-text"
            : "mb-input-group-text-disabled"
        }
      >
        {show ? (
          <EyeSlashFill disabled={disabled} />
        ) : (
          <EyeFill disabled={disabled} />
        )}
      </InputGroup.Text>
    );
  }, [show, type, setShow, id, disabled]);

  const showOptions = useMemo(() => {
    if (type !== "select") {
      return null;
    }

    return (
      <>
        <option key="-1" value="-1">
          Seleccione una opción
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </>
    );
  }, [type, options]);

  const classList = useMemo(() => {
    return type !== "radio" ? `mb-field ${className}` : className;
  }, [className]);

  return (
    <Form.Group as="div" className={classList} md="12">
      {type === "radio" && (
        <Form.Check
          inline={inline}
          reverse={reverse}
          label={label}
          name={name}
          type={type}
          id={id}
          value={value}
          onChange={handleOnChange}
          disabled={disabled}
          checked={checked}
        ></Form.Check>
      )}

      {type !== "radio" && (
        <>
          {label && (
            <Form.Label htmlFor={id}>
              {label}&nbsp;{required && <span className="text-danger">*</span>}
            </Form.Label>
          )}
          <InputGroup hasValidation>
            <Form.Control
              aria-describedby={`${type}-${id}`}
              as={type === "textarea" || type === "select" ? type : "input"}
              className={
                type === "password"
                  ? "mb-field-control mb-input-group"
                  : "mb-field-control"
              }
              disabled={disabled}
              id={id}
              isInvalid={isInvalid}
              onChange={handleOnChange}
              placeholder={placeHolder}
              required={required}
              type={show ? "text" : type}
              value={value ?? ""}
              {...rest}
            >
              {showOptions}
            </Form.Control>
            {showButton}
            <Form.Control.Feedback tabIndex={index} type="invalid">
              {error}
            </Form.Control.Feedback>
          </InputGroup>
        </>
      )}
    </Form.Group>
  );
};

Field.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "textarea",
    "number",
    "file",
    "password",
    "select",
    "radio",
  ]),
  index: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any,
    })
  ),
};

export default Field;