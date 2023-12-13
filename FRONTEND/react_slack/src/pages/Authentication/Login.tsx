import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  CardBody,
} from "reactstrap";
import { useAuthStore } from "src/hooks/useAuthStore";
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
      <div className="p-2 bd-highlight ">
        <Button type="button" color="primary" onClick={openModalAddUser}>
          Registrar Usuario
        </Button>
      </div>
      <Form className="auth-form" onSubmit={handle_submit}>
        <FormGroup>
          <Label htmlFor="component-error">
            Usuario
          </Label>
          <Input
            label="Username"
            variant="standard"
            name="username"
            value={form.username}
            onChange={handle_change}
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
            type="password"
            value={form.password}
            onChange={handle_change}
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
      <CustomModal
        title="Registrar Usuario"
        isOpen={isOpenModalAddUser}
        handleOpenModal={closeModalAddUser}
      >
        <CardBody>
          <FormAddUser />
        </CardBody>
      </CustomModal>
    </>
  );
};

export default login;
