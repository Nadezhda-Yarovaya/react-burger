import { TForm } from "./types";

export const intitialValuesLogin : TForm  = {
    values: {
    email: "",
    password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    validities: {
      email: false,
      password: false,
    }
  };