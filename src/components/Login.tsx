import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useAuth from "../hooks/useAuth";
import { useAlertContext } from "../contexts/AlertContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  registerContainer: {
    margin: "auto",
  },
}));
type dataType = {
  email: string;
  password: string;
};
type LoginProps = {
  history: {
    push: (a: string) => any;
  };
};
const Login: React.FC<LoginProps> = ({ history }: LoginProps) => {
  const classes = useStyles();
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
    await login({
      user: {
        email: data.email,
        password: data.password,
      },
    });
    addAlert({ message: "aaaa", serverity: "success" });
  };

  return (
    <Container
      className={classes.registerContainer}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={(v) => setData({ ...data, email: v.target.value })}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                onChange={(v) => setData({ ...data, password: v.target.value })}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/auth/register" variant="body2">
                Do you want to create an account? Click here!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
