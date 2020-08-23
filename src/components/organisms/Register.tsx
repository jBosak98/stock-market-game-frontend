import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import useAuth, { RegisterVariables } from "../hooks/useAuth";
import SimpleTextField from "./atoms/SimpleTextField/SimpleTextField";
import FormContainer from "../components/molecules/FormContainer/FormContainer";
import showErrors from "../lib/showErrors";
import { useAlertContext } from "../contexts/AlertContext";

type dataType = {
  email: string;
  password: string;
};
const Register = () => {
  const { addAlert } = useAlertContext();
  const { register } = useAuth();
  const [data, setData] = useState<dataType>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const registerInput: RegisterVariables = {
      user: data,
    };
    const response = await register(registerInput);
    showErrors(response, addAlert);
  };
  return (
    <FormContainer
      title="Sign up"
      linkUrl="/auth/login"
      linkText="Already have an account? Sign in"
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

export default Register;
