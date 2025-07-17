import { useMemo } from "react";
import PropTypes from "prop-types";

import "./Label.scss";

const Label = ({
  align = "left",
  value,
  variant = "title",
  type = 1,
  icon = null,
  hasMargin = false,
}) => {
  const className = useMemo(() => {
    const defaultClass = "mb-label";
    return `${defaultClass} ${
      hasMargin ? "has-margin" : ""
    }   mb-label-${align}`;
  });

  const text = useMemo(() => {
    const classes = `mb-label-text ${variant}-${type}`;
    if (variant === "title") {
      if (type === 1) {
        return <h1 className={classes}>{value}</h1>;
      }

      if (type === 2) {
        return <h2 className={classes}>{value}</h2>;
      }

      return <h3 className={classes}>{value}</h3>;
    }

    return <span className={classes}>{value}</span>;
  });

  return (
    <span className={className}>
      {icon} {text}
    </span>
  );
};

Label.propTypes = {
  value: PropTypes.string,
  align: PropTypes.oneOf(["right", "left", "center"]),
  variant: PropTypes.oneOf(["title", "subtitle", "body"]),
  type: PropTypes.oneOf([1, 2, 3]),
  icon: PropTypes.node,
  hasMargin: PropTypes.bool,
};

export default Label;