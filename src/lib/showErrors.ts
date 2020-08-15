import { OperationResult } from "urql";

import { AddAlertType } from "../contexts/AlertContext";

const showErrors = (
  response: OperationResult<Object>,
  addAlert: AddAlertType
) => {
  const errors =
    response?.error?.graphQLErrors.map(({ message }) => message) || [
      response?.error?.message,
    ] ||
    [];

  errors.map((message) => message && addAlert({ message, serverity: "error" }));
};

export default showErrors;
