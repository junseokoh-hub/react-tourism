import React from "react";
import ReactDOM from "react-dom";

export type BackdropProps = {
  closeModal: () => void;
};

type ModalOverlayProps = {
  children: React.ReactNode;
};

type ModalProps = BackdropProps & ModalOverlayProps;

const Backdrop = ({ closeModal }: BackdropProps) => {
  return (
    <div
      className="w-full h-full fixed top-0 left-0 z-50 bg-black opacity-60"
      onClick={closeModal}
    />
  );
};

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return <div>{children}</div>;
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Modal = ({ children, closeModal }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
