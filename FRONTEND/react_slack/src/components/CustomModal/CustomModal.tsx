import { FC } from "react";
import { Modal } from "reactstrap";

interface ICustomModal {
  data?: any;
  children?: any;
  title: string;
  isOpen: boolean;
  handleOpenModal: () => void;
  prevTab?: () => void;
}

export const CustomModal: FC<ICustomModal> = ({
  children,
  title,
  isOpen,
  handleOpenModal,
  prevTab,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={handleOpenModal} backdrop="static" centered>
      <div className="modal-header modal--header">
        {prevTab && (
          <button type="button" onClick={prevTab} className="modal--return">
          </button>
        )}

        <button
          type="button"
          onClick={handleOpenModal}
          className="close modal--close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div>
        <h5 className="modal-title modal--title" id="myModalLabel">
          {title}
        </h5>
      </div>
      <div className="modal-body modal--body">{children}</div>
    </Modal>
  );
};
