import React, { useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import {
  deletePersona,
  getAllPersonas,
  mapHeadPersona,
} from "../../../api/persona";
import Table from "../../ui/table";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { Loading } from "../../ui/loading";

export const PersonaList = ({
  loading,
  setLoading,
  setTitleModal,
  setIsNewModal,
  setShowModal,
  setActiveForm,
  allData,
  setAllData,
}) => {
  useEffect(() => {
    handleGetAllPersonas();
  }, []);

  const handleEdit = useCallback((item) => {
    setTitleModal("Editar Registro");
    setIsNewModal(false);
    setShowModal(true);
    setActiveForm(item);
  });

  const handleDelete = useCallback((id) => {
    Swal.fire({
      title: "Confirmación!",
      text: "Está seguro de querer eliminar el registro?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePersona(id);
      }
    });
  });

  const handleGetAllPersonas = useCallback(async () => {
    setLoading(true);

    const response = await getAllPersonas();

    if (response.apiError) {
      Swal.fire(
        "Error",
        response.apiMessage + " " + (response.apiErrors ?? ""),
        "error"
      );

      setAllData([]);
    } else {
      if (response.apiData != null && response.apiData.data.length > 0) {
        const list = [];
        response.apiData.data.forEach((item) => {
          list.push({
            idPersona: item.idPersona,
            noDocumento: item.noDocumento,
            nombres: item.nombres,
            apellidos: item.apellidos,
          });
        });

        setAllData(list);
      } else {
        Swal.fire(
          "Advertencia",
          "La consulta no retornó registros. ",
          "warning"
        );

        setAllData([]);
      }
    }

    setLoading(false);
  });

  const handleDeletePersona = useCallback(async (id) => {
    setLoading(true);

    const response = await deletePersona(id);

    if (response.apiError) {
      Swal.fire(
        "Error",
        response.apiMessage + " " + (response.apiErrors ?? ""),
        "error"
      );
    } else {
      Swal.fire("OK!", "El registro se ha eliminado exitosamente.", "success");

      const newList = allData.filter((item) => item.idPersona !== id);

      setAllData(newList);
    }

    setLoading(false);
  });

  const getColums = useMemo(() => {
    return mapHeadPersona.columns.map((column) => {
      return {
        key: column.name,
        header: column.label,
        render: (row, rowIndex) => {
          if (column.name === "acciones") {
            return (
              <Stack direction="horizontal" className="float-start">
                <PencilSquare
                  size={20}
                  onClick={() => handleEdit(row)}
                  title="Editar"
                  tabIndex={1}
                />
                <Trash
                  size={20}
                  onClick={() => handleDelete(row.idPersona)}
                  title="Eliminar"
                  tabIndex={2}
                />
              </Stack>
            );
          }

          if (!column.editable) {
            return row[column.name];
          }
        },
      };
    });
  });

  return (
    <>
      <Table
        count={allData.length}
        data={allData}
        columns={getColums}
        pagination={false}
      />
      <Loading show={loading} />
    </>
  );
};

PersonaList.propTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  setTitleModal: PropTypes.func,
  setIsNewModal: PropTypes.func,
  setShowModal: PropTypes.func,
  setActiveForm: PropTypes.func,
  allData: PropTypes.array,
  setAllData: PropTypes.func,
};