import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Grid, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import DefaultLayout from "../layouts/default";
import { GetStaticPropsContext } from "next";
import { useAsync } from "../utils/hooks/useAsync";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  code: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [loginError, setLoginError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: user, status: loginStatus, error, run } = useAsync();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (error) {
      setLoginError(error.message);
      setOpen(true);
    } else {
      if (user && loginStatus === "resolved") router.push("/");
    }
  }, [user, loginStatus, error]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { username, password } = data;
    try {
      run(Auth.signIn(username, password));
    } catch (fetchError) {
      setLoginError(fetchError.message);
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        style={{ marginTop: 32 }}
      >
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              id="username"
              label="Username"
              type="text"
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : null}
              {...register("username")}
            />
          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              id="password"
              label="Password"
              type="password"
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
              {...register("password")}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loginStatus === "pending" ? true : false}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {loginError}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function LoginWithLayout() {
  return (
    <DefaultLayout>
      <Login />
    </DefaultLayout>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...require(`../../messages/shared/navigation/${locale}.json`),
      },
    },
  };
}
