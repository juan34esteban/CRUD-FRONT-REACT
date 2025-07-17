import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../ui/button";
import Modal from "../../ui/modal";
import { useForm } from "../../../hooks/useForm";
import Field from "../../ui/field";
import { Container, Form, Col, Row } from "react-bootstrap";
import { BoxArrowLeft, Save2 } from "react-bootstrap-icons";
import { Loading } from "../../ui/loading";
import { createPersona, updatePersona } from "../../../api/persona";
import Swal from "sweetalert2";

const defaultValidationValues = {
  noDocumento: { invalid: false, message: "" },
  nombres: { invalid: false, message: "" },
  apellidos: { invalid: false, message: "" },
};

const validationMessages = {
  noDocumento: "El No Documento es requerido.",
  nombres: "Los Nombres son requeridos.",
  apellidos: "Los Apellidos son requeridos.",
};

export const PersonaForm = ({
  titleModal,
  isNewModal,
  showModal,
  setShowModal,
  activeForm,
  allData,
  setAllData,
}) => {
  const [loadingModal, setLoadingModal] = useState(false);

  const [
    formValues,
    validationValues,
    valid,
    handleInputChange,
    triggerValidation,
    reset,
  ] = useForm(activeForm, defaultValidationValues, validationMessages, true);

  //Guarda un valor mutable
  const activeId = useRef(activeForm.idPersona);

  //Mostrar los datos en pantalla cada que seleccionan una registro diferente a la inicial
  useEffect(() => {
    //Si id cambia, entonces se renderiza el compononte de y se hace esto para evitar ciclo infinito
    if (activeForm.idPersona !== activeId.current) {
      reset(activeForm);
      activeId.current = activeForm.idPersona;
    }
  }, [activeForm, reset]);

  const handleOnSaveModal = useCallback((e) => {
    e.preventDefault();

    triggerValidation();

    if (
      !valid ||
      formValues.noDocumento === "" ||
      formValues.nombres === "" ||
      formValues.apellidos === ""
    ) {
      return;
    }

    if (isNewModal) {
      handleCreatePersona();
    } else {
      handleUpdatePersona();
    }
  });

  const handleCreatePersona = useCallback(async () => {
    setLoadingModal(true);

    const response = await createPersona(formValues);

    if (response.apiError) {
      Swal.fire(
        "Error",
        response.apiMessage + " " + (response.apiErrors ?? ""),
        "error"
      );
    } else {
      Swal.fire("OK!", "El registro se ha creado exitosamente.", "success");

      const newData = { idPersona: response.apiData.idPersona, ...formValues };

      setAllData([newData, ...allData]);
    }

    setLoadingModal(false);
    setShowModal(false);
  });

  const handleUpdatePersona = useCallback(async () => {
    setLoadingModal(true);

    const response = await updatePersona(formValues);

    if (response.apiError) {
      Swal.fire(
        "Error",
        response.apiMessage + " " + (response.apiErrors ?? ""),
        "error"
      );
    } else {
      Swal.fire(
        "OK!",
        "El registro se ha actualizado exitosamente.",
        "success"
      );

      const newList = allData.map((item) =>
        item.idPersona === formValues.idPersona ? formValues : item
      );

      setAllData(newList);
    }

    setLoadingModal(false);
    setShowModal(false);
  });

  const handleOnCloseModal = useCallback(() => {
    setShowModal(false);
  });

  const getBodyModal = useMemo(() => {
    return (
      <Container className="p-0" fluid>
        <Form
          id="formPersona"
          onSubmit={handleOnSaveModal}
          className="animate__animated animate__fadeIn animate__faster"
          noValidate
        >
          <Row>
            <Col
              lg={{ span: 4, offset: 0 }}
              md={{ span: 4, offset: 0 }}
              sm={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 1 }}
            >
              <Field
                id="noDocumento"
                label="No Documento"
                placeholder="Ingrese No Documento"
                onChange={handleInputChange}
                value={formValues.noDocumento}
                autoFocus={true}
                autoComplete="off"
                type="text"
                disabled={loadingModal}
                required
                error={validationValues.noDocumento.message}
                isInvalid={validationValues.noDocumento.invalid}
                index={1}
              />
            </Col>
            <Col
              lg={{ span: 4, offset: 0 }}
              md={{ span: 4, offset: 0 }}
              sm={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 1 }}
            >
              <Field
                id="nombres"
                label="Nombres"
                placeholder="Ingrese Nombres"
                onChange={handleInputChange}
                value={formValues.nombres}
                autoFocus={true}
                autoComplete="off"
                type="text"
                disabled={loadingModal}
                required
                error={validationValues.nombres.message}
                isInvalid={validationValues.nombres.invalid}
                index={2}
              />
            </Col>
            <Col
              lg={{ span: 4, offset: 0 }}
              md={{ span: 4, offset: 0 }}
              sm={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 1 }}
            >
              <Field
                id="apellidos"
                label="Apellidos"
                placeholder="Ingrese Apellidos"
                onChange={handleInputChange}
                value={formValues.apellidos}
                autoFocus={true}
                autoComplete="off"
                type="text"
                disabled={loadingModal}
                required
                error={validationValues.apellidos.message}
                isInvalid={validationValues.apellidos.invalid}
                index={3}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    );
  });

  const getFooterModal = useMemo(() => {
    return (
      <>
        <Button
          className="mb-3"
          variant="secondary"
          disabled={loadingModal}
          tabIndex={4}
          onClick={handleOnCloseModal}
          icon={<BoxArrowLeft />}
        >
          Cerrar
        </Button>
        <Button
          className="mb-3"
          variant="primary"
          disabled={loadingModal}
          tabIndex={5}
          icon={<Save2 />}
          type="submit"
          form="formPersona"
        >
          Guardar
        </Button>
      </>
    );
  });

  return (
    <>
      <Modal
        body={getBodyModal}
        foot={getFooterModal}
        head={titleModal}
        onClose={handleOnCloseModal}
        show={showModal}
        size="lg"
      />
      <Loading show={loadingModal} />
    </>
  );
};

PersonaForm.propTypes = {
  titleModal: PropTypes.string,
  isNewModal: PropTypes.bool,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  activeForm: PropTypes.any,
  allData: PropTypes.array,
  setAllData: PropTypes.func,
};