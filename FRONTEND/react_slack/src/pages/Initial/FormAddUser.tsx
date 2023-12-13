import { FC, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useAdminStore } from "src/hooks/useAdminStore";
import { useFormUpdate } from "src/hooks/useFormUpdate";

const validationsForm = {
  username: [(value: string) => value.length >= 1, "El username es obligatorio"],
};

interface IFormAddEditPerfil {
  editable?: boolean;
  nextTab?: () => void;
  idPerfilSelect?: number;
  setAddPerfilForm?: any;
  handle_get_perfiles_usuario_submodulos?: any;
  workspace?: any;
}

const FormAddWorkspaceUser: FC<IFormAddEditPerfil> = ({
  workspace,
  ...props
}: any) => {
  const { registerUserToWorkspace } = useAdminStore();
  const [initialForm, setInitialForm] = useState({
    username: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    username,
    onInputChange,
    usernameValid,
  } = useFormUpdate(
    initialForm,
    validationsForm
  );

  const handle_submit = (values: any) => {
    values.preventDefault();
    registerUserToWorkspace({
      workspaceId: workspace.workspaceId,
      username,
    });
  };

  return (
    <>
      <Form className="tabs-form" onSubmit={handle_submit}>
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

export default FormAddWorkspaceUser;
