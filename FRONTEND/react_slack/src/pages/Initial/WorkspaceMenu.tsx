import Icon from "@ailibs/feather-react-ts";
import { FC, useState } from "react";
import { CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { CustomModal } from "src/components/CustomModal/CustomModal";
import useModal from "src/hooks/useModal";
import FormAddWorkspaceUser from "./FormAddUser";

export const WorkspaceMenu: FC<any> = ({
    workspace,
}) => {
    const [menu, setMenu] = useState<boolean>(false);
    const [isOpenModalAddUser, openModalAddUser, closeModalAddUser]: any = useModal(false);
    return (
        <>
            <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-none d-lg-flex">
                <div className="header-item user text-start d-flex align-items-center">
                    <span className="me-3 d-none d-sm-block user-item-desc">
                        <h4 className="mb-0"># {workspace.name}</h4>
                    </span>
                </div>
                <DropdownToggle
                    className="btn header-item user text-start d-flex align-items-center"
                    id="page-header-user-dropdown"
                    tag="div"
                >
                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item noti-icon right-bar-toggle p-0">
                            <Icon name="chevron-down" className="icon-sm" />
                        </button>
                    </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu pt-0" dir="left">
                    <DropdownItem tag="a" className="d-flex align-items-center" onClick={openModalAddUser}>
                        <i className="mdi mdi-cog-outline text-muted font-size-16 align-middle me-1"></i>{" "}
                        <span className="align-middle">Agregar Usuario</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <CustomModal
                title="Agregar Usuario"
                isOpen={isOpenModalAddUser}
                handleOpenModal={closeModalAddUser}
            >
                <CardBody>
                    <FormAddWorkspaceUser workspace={workspace} closeModalAddUser={closeModalAddUser}/>
                </CardBody>
            </CustomModal>
        </>
    );
};
