import React from "react";
import Form from "./Form";

interface ModalProps {
  closeModal: () => void;
  onFormSubmit: (data: { people: string[]; receipt: string | null }) => void;
}

const Modal = ({ closeModal, onFormSubmit }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-50">
        <h2 className="text-xl font-bold mb-4">Upload Receipt</h2>
        <Form closeModal={closeModal} onFormSubmit={onFormSubmit} />
      </div>
    </div>
  );
};

export default Modal;
