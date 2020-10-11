import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonElement from "../../atoms/ButtonElement/ButtonElement";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  registerContainer: {
    margin: "auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

type LoginFormType = {
  children: React.ReactNode;
  title: string;
  linkUrl: string;
  linkText: string;
  onSubmit: (e: any) => void;
};

const FormContainer = ({
  children,
  title,
  linkUrl,
  linkText,
  onSubmit,
}: LoginFormType) => {
  const classes = useStyles();

  return (
    <Container
      className={classes.registerContainer}
      component="main"
      maxWidth="xs"
    >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="textPrimary" component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {children}
          </Grid>
          <ButtonElement>{title}</ButtonElement>
          <Grid container justify="flex-end">
            <Grid item>
              <Link color="textPrimary" className={classes.link} to={linkUrl}>
                {linkText}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default FormContainer;
