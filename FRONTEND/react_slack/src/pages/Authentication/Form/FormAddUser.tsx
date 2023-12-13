import { FC, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useAuthStore } from "src/hooks/useAuthStore";
import { useFormUpdate } from "src/hooks/useFormUpdate";

const validationsForm = {
  nombre: [(value: string) => value.length >= 1, "El nombre es obligatorio"],
  apellido: [(value: string) => value.length >= 1, "El apellido es obligatorio"],
  correo: [(value: string) => value.length >= 1, "El correo es obligatorio"],
  password: [(value: string) => value.length >= 1, "El password es obligatorio"],
};

interface IFormAddEditPerfil {
  editable?: boolean;
  nextTab?: () => void;
  idPerfilSelect?: number;
  setAddPerfilForm?: any;
  handle_get_perfiles_usuario_submodulos?: any;
}

const FormAddUser: FC<IFormAddEditPerfil> = ({
  ...props
}: any) => {
  const { register } = useAuthStore();
  const [initialForm, setInitialForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    correo: "",
    password: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    nombre,
    apellido,
    username,
    correo,
    password,
    onInputChange,
    nombreValid,
    apellidoValid,
    correoValid,
    passwordValid,
    isFormValid,
    usernameValid,
  } = useFormUpdate(
    initialForm,
    validationsForm
  );

  const handle_submit = (values: any) => {
    values.preventDefault();
    register({
      name: nombre,
      lastname: apellido,
      email: correo,
      username,
      password,
    });
  };

  return (
    <>
      <Form className="tabs-form" onSubmit={handle_submit}>
        <FormGroup>
          <Input
            name="nombre"
            placeholder="Ingrese nombres"
            type="text"
            onChange={onInputChange}
            value={nombre}
          />
          <p className="text--danger">{nombreValid && formSubmitted}</p>
        </FormGroup>
        <FormGroup>
          <Input
            name="apellido"
            placeholder="Ingrese apellidos"
            type="text"
            onChange={onInputChange}
            value={apellido}
          />
          <p className="text--danger">{apellidoValid && formSubmitted}</p>
        </FormGroup>
        <FormGroup>
          <Input
            name="correo"
            placeholder="Ingrese correo"
            type="text"
            onChange={onInputChange}
            value={correo}
          />
          <p className="text--danger">{correoValid && formSubmitted}</p>
        </FormGroup>
        <FormGroup>
          <Input
            name="username"
            placeholder="Ingrese username"
            type="text"
            onChange={onInputChange}
            value={username}
          />
          <p className="text--danger">{usernameValid && formSubmitted}</p>
        </FormGroup>
        <FormGroup>
          <Input
            name="password"
            placeholder="Contraseña"
            type={"password"}
            onChange={onInputChange}
            value={password}
          />
          <p className="text--danger">{passwordValid && formSubmitted}</p>
        </FormGroup>
        <div className="tabs--button">
          <Button type="submit"
            className="button-primary">
            Registrar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default FormAddUser;
