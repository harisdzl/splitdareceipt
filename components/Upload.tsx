"use client";
import { imageToText, toBase64 } from "@/utils/image";
import React, { useState } from "react";
import Receipt from "./Receipt";
import { Item, Person } from "@/app/page";
interface UploadProps {
  people: string[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setPerson: React.Dispatch<React.SetStateAction<Person[]>>;
  tax: number;
  serviceCharge: number;
}

const tempItems = `{
  "items": [
    {
      "name": "Mango sticky rice and longan dressing coconut cream",
      "quantity": 1,
      "price": 4.75
    },
    {
      "name": "Salted caramel chocolate brownie",
      "quantity": 1,
      "price": 2.50
    },
    {
      "name": "Signature Eleven One Fried Rice seafood",
      "quantity": 2,
      "price": 6.25
    },
    {
      "name": "Crispy Shrimps in Taro Nest",
      "quantity": 1,
      "price": 5.75
    },
    {
      "name": "Sambal-Kerus pork mix with pineapple",
      "quantity": 1,
      "price": 6.50
    },
    {
      "name": "Fish amok burger",
      "quantity": 3,
      "price": 6.75
    },
    {
      "name": "Durian milk shake",
      "quantity": 1,
      "price": 3.75
    },
    {
      "name": "Passion Margarita (Happy Hour)",
      "quantity": 1,
      "price": 3.25
    },
    {
      "name": "Passionfruite Sangria (Happy Hour)",
      "quantity": 1,
      "price": 3.25
    },
    {
      "name": "Mango & passion shake",
      "quantity": 1,
      "price": 3.50
    },
    {
      "name": "Fresh Coconut",
      "quantity": 1,
      "price": 2.50
    },
    {
      "name": "Pomelo Ginger Fizz (Happy Hour)",
      "quantity": 1,
      "price": 3.25
    }
  ]
}`;

const Upload = ({
  people,
  setItems,
  setPerson,
  tax,
  serviceCharge,
}: UploadProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<string | null>("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setLoading(true);
    setUploaded(true);
    if (file) {
      const base64File = (await toBase64(file)) as string;
      setImage(base64File); // Save the base64 image string
      const text = await imageToText(base64File);
      // console.log("Extracted text:", text);
      setReceipt(text);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="">
        {!uploaded ? (
          <div>
            <label
              htmlFor="caption"
              className="block text-gray-700 font-bold mb-2"
            >
              Upload Receipt:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <div>
            {loading ? (
              <div role="status" className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div>
                {image && (
                  <div className="">
                    <p className="text-gray-700 font-bold mb-2">
                      Uploaded Image:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5">
                      <img
                        src={image}
                        alt="Uploaded receipt"
                        className="max-w-full h-auto sm:w-1/3 sm:h-auto rounded-lg"
                      />
                      {receipt && (
                        <Receipt
                          receiptText={receipt}
                          people={people}
                          setItems={setItems}
                          setPerson={setPerson}
                          tax={tax}
                          serviceCharge={serviceCharge}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
