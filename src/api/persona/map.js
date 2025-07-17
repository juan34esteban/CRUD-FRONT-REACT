import { mapper } from "../../helpers/helpers";

export const mapHeadPersona = {
  columns: [
    { label: "Acciones", name: "acciones", format: mapper, type: "text", editable: false  },
    { label: "NoDocumento", name: "noDocumento", format: mapper, type: "text", editable: false },
    { label: "Nombres", name: "nombres", format: mapper, type: "text", editable: false },
    { label: "Apellidos", name: "apellidos", format: mapper, type: "text", editable: false  },
  ],
};