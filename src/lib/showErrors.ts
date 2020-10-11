import { OperationResult } from "urql";

import { AddAlertType } from "../contexts/AlertContext";

const showErrors = (
  response: OperationResult<Object>,
  addAlert: AddAlertType,
  successMessage?: string
) => {
  const errors =
    (
      response?.error?.graphQLErrors.map(({ message }) => message) || [
        response?.error?.message,
      ]
    ).filter((error) => !!error) || [];

  errors.map((message) => message && addAlert({ message, serverity: "error" }));
  !errors.length &&
    successMessage &&
    addAlert({ serverity: "success", message: successMessage });
};

export default showErrors;
