import { useMemo } from "react";
import PropTypes from "prop-types";
import { Button as BsButton } from "react-bootstrap";

import "./Button.scss";

const Button = ({
  onClick,
  variant = "primary",
  children,
  icon = null,
  hasMargin = false,
  type,
  className = "",
  disabled = false,
  form = "",
}) => {
  const classList = useMemo(() => {
    const classes = `mb-btn ${className} ${
      hasMargin ? "has-margin" : ""
    } mb-btn-${variant}`;
    return classes;
  }, [className, hasMargin, variant]);

  const text = useMemo(() => {
    return children ? (
      <span className={icon ? "mb-btn-text" : ""}>{children}</span>
    ) : null;
  });

  return (
    <BsButton
      className={classList}
      disabled={disabled}
      onClick={onClick}
      type={type}
      variant={variant}
      form={form}
    >
      {icon}
      {text}
    </BsButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
  children: PropTypes.any,
  icon: PropTypes.any,
  hasMargin: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  form: PropTypes.string,
};

export default Button;