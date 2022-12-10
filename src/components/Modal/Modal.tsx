import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { useMatch, useNavigate } from "react-router-dom";

export type BackdropProps = {
  closeModal: () => void;
};

type ModalOverlayProps = {
  children: React.ReactNode;
};

type ModalProps = BackdropProps & ModalOverlayProps;

const Backdrop = ({ closeModal }: BackdropProps) => {
  const navigate = useNavigate();
  const campingSearchMatch = useMatch("camping/*");

  const controlModalHandler = useCallback(() => {
    closeModal();
    if (campingSearchMatch) {
      navigate(-1);
    }
  }, []);
  return (
    <div
      className="w-full h-full fixed top-0 left-0 z-[100] bg-black opacity-10"
      onClick={controlModalHandler}
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
