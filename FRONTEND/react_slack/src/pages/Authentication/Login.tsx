import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import { useAuthStore } from "src/hooks/useAuthStore";
import useModal from "src/hooks/useModal";

const initialForm = {
  username: "",
  password: "",
};

const login = () => {
  const { start_login } = useAuthStore();
  const [form, setForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(false);
  const { isLoading, isError } = useSelector((state: any) => ({
    isLoading: state.auth.loading,
    isError: state.auth.error,
  }));

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
      <Form className="auth-form">
        <FormGroup>
          <Label htmlFor="component-error">
            Usuario
          </Label>
          <Input
            label="Username"
            variant="standard"
            name="username"
          />
        </FormGroup>
        <FormGroup>

          <Label htmlFor="component-error">
            Contraseña
          </Label>
          <Input
            id="component-error"
            aria-describedby="component-error-text"
            name="password"
          />
        </FormGroup>
        <Button
          variant="contained"
          type="submit"
          style={{ width: "200px", height: "30.5px" }}
        >
          Iniciar Sesión
        </Button>
      </Form>
    </>
  );
};

export default login;
