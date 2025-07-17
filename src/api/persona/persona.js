import { API } from "../../helpers/constants";
import { fetchSinToken } from "../../helpers/fetch";

export const getAllPersonas = async () => {
  try {
    const response = await fetchSinToken(API.PERSONA_GET_ALL, {}, "GET");
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const createPersona = async (item) => {
  try {
    const response = await fetchSinToken(
      API.PERSONA_CREATE,
      {
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      },
      "POST"
    );
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const updatePersona = async (item) => {
  try {
    const response = await fetchSinToken(
      API.PERSONA_UPDATE.replace("{id}", +item.idPersona),
      {
        idPersona: item.idPersona,
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      },
      "PUT"
    );
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const deletePersona = async (id) => {
  try {
    const response = await fetchSinToken(
      API.PERSONA_DELETE.replace("{id}", +id),
      {},
      "DELETE"
    );
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};