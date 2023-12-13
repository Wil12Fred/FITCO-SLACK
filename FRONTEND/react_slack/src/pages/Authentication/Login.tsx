import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  Form,
  CardBody,
} from "reactstrap";
import { useAuthStore } from "src/hooks/useAuthStore";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Stack,
  Input,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Progress from "src/components/Progress/Progress";
import { Icon } from "@iconify/react";
import { CustomModal } from "src/components/CustomModal/CustomModal";
import useModal from "src/hooks/useModal";
import FormAddUser from "./Form/FormAddUser";

const initialForm = {
  username: "",
  password: "",
};

const login = () => {
  const { start_login } = useAuthStore();
  const [form, setForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isError } = useSelector((state: any) => ({
    isLoading: state.auth.loading,
    isError: state.auth.error,
  }));
  const [isOpenModalAddUser, openModalAddUser, closeModalAddUser]: any = useModal(false);

  useEffect(() => {
    if (isError == null) {
      setErrorForm(false);
    } else {
      setErrorForm(true);
    }
  }, [isError]);

  const handle_change = (data: any) => {
    setForm({ ...form, [data.target.name]: data.target.value });
  };

  const handle_click_show_password = () => {
    setShowPassword(!showPassword);
  };

  const handle_mouse_down_password = (event: any) => {
    event.preventDefault();
  };

  const handle_submit = (values: any) => {
    values.preventDefault();
    const data = {
      grant_type: "password",
      username: form.username,
      password: form.password,
    };
    start_login(data);
  };

  return (
    <>
      <Col lg={10} className="w-100 vh-100">
        <div className="p-2 bd-highlight ">
          <Button type="button" color="primary" onClick={openModalAddUser}>
            <Icon icon="ic:baseline-plus" height="24" hFlip={true} /> Registrar Usuario
          </Button>
        </div>
        <Row className="g-0 flex-lg-row-reverse">
          <div className="auth-container">
            <div className="auth-info-container">
              <div className="auth-title">
                <div>
                </div>
                <div>
                  <p>Ingresa a tu cuenta para continuar</p>
                </div>
              </div>
              <Form className="auth-form" onSubmit={handle_submit}>
                <Stack spacing={4}>
                  <TextField
                    label="Username"
                    variant="standard"
                    fullWidth
                    name="username"
                    onChange={handle_change}
                    value={form.username}
                    helperText={
                      errorForm &&
                      "El usuario ingresado es incorrecto"
                    }
                    error={errorForm}
                  />
                  <FormControl error={errorForm} variant="standard">
                    <InputLabel htmlFor="component-error">
                      Contraseña
                    </InputLabel>
                    <Input
                      id="component-error"
                      aria-describedby="component-error-text"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handle_change}
                      name="password"
                      error={errorForm}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handle_click_show_password}
                            style={{ backgroundColor: "transparent" }}
                            onMouseDown={handle_mouse_down_password}
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                    <FormHelperText id="component-error-text">
                      {errorForm && "La contraseña ingresada es incorrecta "}
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Stack mt={3} spacing={1} alignItems="center">
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ width: "200px", height: "30.5px" }}
                    disabled={form.password && form.username ? false : true}
                  >
                    {isLoading ? <Progress /> : "Iniciar Sesión"}
                  </Button>
                </Stack>
              </Form>
            </div>
          </div>
        </Row>
        <CustomModal
          title="Registrar Usuario"
          isOpen={isOpenModalAddUser}
          handleOpenModal={closeModalAddUser}
        >
          <CardBody>
            <FormAddUser />
          </CardBody>
        </CustomModal>
      </Col>
    </>
  );
};

export default login;
