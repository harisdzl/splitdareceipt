"use client";
import { imageToText, toBase64 } from "@/utils/image";
import React, { useState } from "react";
// @ts-ignore
import { Checkmark } from "react-checkmark";

interface FormProps {
  closeModal: () => void;
  onFormSubmit: (data: { people: string[]; receipt: string | null }) => void;
}

const Form = ({ closeModal, onFormSubmit }: FormProps) => {
  const [people, setPeople] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<string | null>("");

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setLoading(true);
    setUploaded(true);
    if (file) {
      const base64File = (await toBase64(file)) as string;
      const text = await imageToText(base64File);
      console.log("Extracted text:", text);
      setReceipt(text);
    }
    setLoading(false);
  };

  const handleNames = (peopleStr: string) => {
    const peopleArr = peopleStr.split(",");
    const result = [];
    for (var person of peopleArr) {
      result.push(person.trim());
    }
    return result;
  };

  const handleSubmit = () => {
    onFormSubmit({ people, receipt });
    closeModal();
  };

  return (
    <form className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="caption" className="block text-gray-700 font-bold mb-2">
          People involved:
        </label>
        <input
          type="text"
          id="people"
          name="people"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g Adam, Bob, Wei Jie"
          required
          onChange={(e) => setPeople(handleNames(e.target.value))}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 md:mr-2 w-full md:w-auto focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto focus:outline-none focus:shadow-outline"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Form;
