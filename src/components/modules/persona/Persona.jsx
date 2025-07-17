import React, { useState, useCallback } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Label from "../../ui/label/Label";
import { PersonaList } from "./PersonaList";
import Button from "../../ui/button";
import { PersonaForm } from "./PersonaForm";
import { PlusCircle } from "react-bootstrap-icons";

const defaultFormValues = {
  idPersona: 0,
  noDocumento: "",
  nombres: "",
  apellidos: "",
};

export const Persona = () => {
  const [loading, setLoading] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [isNewModal, setIsNewModal] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState();
  const [allData, setAllData] = useState([]);

  const handleNew = useCallback(() => {
    setTitleModal("Agregar Registro");
    setIsNewModal(true);
    setShowModal(true);
    setActiveForm(defaultFormValues);
  });

  return (
    <>
      <Container className="p-0" fluid>
        <Row>
          <Col
            lg={{ span: 10, offset: 0 }}
            md={{ span: 9, offset: 0 }}
            sm={{ span: 9, offset: 0 }}
            xs={{ span: 5, offset: 0 }}
          >
            <Label
              align="left"
              hasMargin
              type={2}
              value="Persona"
              variant="title"
            />
          </Col>
          <Col
            lg={{ span: 2, offset: 0 }}
            md={{ span: 3, offset: 0 }}
            sm={{ span: 3, offset: 0 }}
            xs={{ span: 6, offset: 0 }}
          >
            <Button
              className="mb-2 float-end"
              variant="primary"
              disabled={loading}
              tabIndex={1}
              icon={<PlusCircle size={20} title="Añadir nuevo" />}
              type="submit"
              onClick={handleNew}
            >
              Nuevo
            </Button>
            {showModal && (
              <PersonaForm
                titleModal={titleModal}
                isNewModal={isNewModal}
                showModal={showModal}
                setShowModal={setShowModal}
                activeForm={activeForm}
                allData={allData}
                setAllData={setAllData}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <PersonaList
              loading={loading}
              setLoading={setLoading}
              setTitleModal={setTitleModal}
              setIsNewModal={setIsNewModal}
              setShowModal={setShowModal}
              setActiveForm={setActiveForm}
              allData={allData}
              setAllData={setAllData}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};