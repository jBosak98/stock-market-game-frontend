import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import useAuth from "../hooks/useAuth";
import { useAlertContext } from "../contexts/AlertContext";
import SimpleTextField from "./atoms/SimpleTextField/SimpleTextField";
import FormContainer from "../components/molecules/FormContainer/FormContainer";
import showErrors from "../lib/showErrors";

type dataType = {
  email: string;
  password: string;
};

const Login = () => {
  const [data, setData] = useState<dataType>({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const { addAlert } = useAlertContext();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ): Promise<void> => {
    e?.preventDefault();
    const response = await login({
      user: {
        email: data.email,
        password: data.password,
      },
    });
    showErrors(response, addAlert);
  };

  return (
    <FormContainer
      title="Log in"
      linkUrl="/auth/register"
      linkText="Do you want to create an account? Click here!"
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <SimpleTextField
          name="email"
          labelName="Email Address"
          variantType="outlined"
          autoComplete="email"
          onChange={(value) => setData({ ...data, email: value })}
          value={data.email}
        />
      </Grid>
      <Grid item xs={12}>
        <SimpleTextField
          name="password"
          labelName="Password"
          variantType="outlined"
          autoComplete="current-password"
          onChange={(value) => setData({ ...data, password: value })}
          value={data.password}
        />
      </Grid>
    </FormContainer>
  );
};

export default Login;
