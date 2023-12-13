import { useState } from "react";
import { useAdminStore } from "src/hooks/useAdminStore";
import { useFormUpdate } from "src/hooks/useFormUpdate";
import { Button, CardBody, Form, FormGroup, Input } from "reactstrap";
import { CustomModal } from "src/components/CustomModal/CustomModal";
import { useSelector } from "react-redux";

const validationsForm = {
  nombre: [(value: string) => value.length >= 1, "El nombre es obligatorio"],
};

export const ChannelModal = ({
  isOpenModalAddChannel,
  closeModalAddChannel,
  handle_get_workspaces,
}: any) => {
  const { registerChannel } = useAdminStore();
  const [initialForm, setInitialForm] = useState({
    nombre: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    userData,
  } = useSelector((state: any) => {
    return {
      userData: state.userData,
    }
  });
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
    await registerChannel({
      workspaceId: userData.workspace.workspaceId,
      name: nombre,
    });
    closeModalAddChannel();
    handle_get_workspaces();
  };

  return (
    <CustomModal
      title="Crear Channel"
      isOpen={isOpenModalAddChannel}
      handleOpenModal={closeModalAddChannel}
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
