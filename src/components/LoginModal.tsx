import React, { useEffect, useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { LoginModalProps } from "../common/types";
import { checkLoginStatus } from "../common/functions";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const LoginModal = (loginModalProps: LoginModalProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useContext(AuthContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    loginModalProps.setOpenState(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [loginModalProps.open]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await checkLoginStatus(username, password);

      if (response) {
        // console.log("Login successful");
        login();
        enqueueSnackbar("Login successful", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      } else {
        //console.log("Login failed");
        enqueueSnackbar("Login failed", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Modal open={loginModalProps.open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Reserved Area</h2>
          {isLoading ? (
            <LinearProgress sx={{ marginBottom: 2, minWidth: 300 }} />
          ) : (
            <>
              <TextField
                label="Username"
                type="text"
                value={username}
                onChange={handleUserChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />

              <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={handleClose}
                  color="warning"
                  variant="outlined"
                  size="small"
                  sx={{ marginTop: 2, marginRight: 2 }}
                >
                  Close
                </Button>
                <Button
                  onClick={handleLogin}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ marginTop: 2 }}
                >
                  Login
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
