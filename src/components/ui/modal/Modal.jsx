import { useMemo } from "react";
import PropTypes from "prop-types";
import { Modal as BsModal } from "react-bootstrap";
import "./Modal.scss";

const Modal = ({
  show = false,
  head,
  body,
  foot,
  onClose,
  size = "md",
  className,
}) => {
  const showFooter = useMemo(() => {
    if (foot) {
      return <BsModal.Footer>{foot}</BsModal.Footer>;
    }

    return null;
  });

  const showBody = useMemo(() => {
    if (body) {
      return <BsModal.Body>{body}</BsModal.Body>;
    }
  });

  const showHead = useMemo(() => {
    if (head) {
      return (
        <BsModal.Header>
          <BsModal.Title>{head}</BsModal.Title>
        </BsModal.Header>
      );
    }
    return null;
  });

  const sizeClass = useMemo(() => {
    return `mb-modal ${size}`;
  });

  if (!show) {
    return null;
  }

  return (
    <BsModal
      className={`${className} ${sizeClass}`}
      onHide={onClose}
      show={show}
    >
      {showHead}

      {showBody}

      {showFooter}
    </BsModal>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  body: PropTypes.node,
  head: PropTypes.node,
  foot: PropTypes.node,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg", "xlg"]),
  className: PropTypes.string,
};

export default Modal;