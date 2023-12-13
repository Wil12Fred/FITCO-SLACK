import { useState } from "react";
import { useAdminStore } from "src/hooks/useAdminStore";
import { useFormUpdate } from "src/hooks/useFormUpdate";
import { CustomModal } from "../CustomModal/CustomModal";
import { Button, CardBody, Form, FormGroup, Input } from "reactstrap";

const validationsForm = {
  nombre: [(value: string) => value.length >= 1, "El nombre es obligatorio"],
};

export const WorkspaceModal = ({
  isOpenModalAddPerfil,
  closeModalAddPerfil,
  handle_get_workspaces,
  props
}: any) => {
  const { register } = useAdminStore();
  const [initialForm, setInitialForm] = useState({
    nombre: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    nombre,
    onInputChange,
    nombreValid,
    isFormValid,
  } = useFormUpdate(
    initialForm,
    validationsForm
  );

  const handle_submit = async (values: any) => {
    values.preventDefault();
    await register({
      name: nombre,
    });
    closeModalAddPerfil();
    handle_get_workspaces();
  };

  return (
    <CustomModal
      title="Crear Workspace"
      isOpen={isOpenModalAddPerfil}
      handleOpenModal={closeModalAddPerfil}
    >
      <CardBody>
        <Form className="tabs-form" onSubmit={handle_submit}>
          <FormGroup>
            <Input
              name="nombre"
              placeholder="Ingrese nombre"
              type="text"
              onChange={onInputChange}
              value={nombre}
            />
            <p className="text--danger">{nombreValid && formSubmitted}</p>
          </FormGroup>
          <div className="tabs--button">
            <Button type="submit"
              className="button-primary">
              Crear
            </Button>
          </div>
        </Form>
      </CardBody>
    </CustomModal>
  );
};
