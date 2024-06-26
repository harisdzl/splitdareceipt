"use client";
import React, { useState } from "react";
import AnimatedCheckmark from "./AnimatedCheckmark";

interface InformationProps {
  setPeople: React.Dispatch<React.SetStateAction<string[]>>;
  setTax: React.Dispatch<React.SetStateAction<number>>;
  setServiceCharge: React.Dispatch<React.SetStateAction<number>>;
  setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  confirmed: boolean;
}

const Information = ({
  setPeople,
  setTax,
  setServiceCharge,
  setConfirmed,
  confirmed,
}: InformationProps) => {
  const handleNames = (peopleStr: string) => {
    const peopleArr = peopleStr.split(",");
    const result = [];
    for (var person of peopleArr) {
      result.push(person.trim());
    }
    return result;
  };
  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handleStringToNumber = (str: string) => {
    return parseFloat(str);
  };
  return (
    <div className=" gap-y-4">
      <div>
        <label htmlFor="caption" className="block text-gray-700 font-bold mb-2">
          People involved:
        </label>
        <div className="flex">
          <input
            type="text"
            id="people"
            name="people"
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g Adam, Bob, Wei Jie"
            required
            onChange={(e) => setPeople(handleNames(e.target.value))}
            disabled={confirmed === true ? true : false}
          />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-start pt-4 gap-x-4">
        <div>
          <label
            htmlFor="caption"
            className="block text-gray-700 font-bold mb-2"
          >
            Tax:
          </label>
          <div>
            <input
              type="text"
              id="people"
              name="people"
              className="w-full shadow appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g if 5% ==> input 5"
              onChange={(e) => setTax(handleStringToNumber(e.target.value))}
              disabled={confirmed === true ? true : false}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="caption"
            className="block text-gray-700 font-bold mb-2"
          >
            Service Tax:
          </label>
          <div>
            <input
              type="text"
              id="people"
              name="people"
              className="w-full shadow appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g if 5% ==> input 5"
              onChange={(e) =>
                setServiceCharge(handleStringToNumber(e.target.value))
              }
              disabled={confirmed === true ? true : false}
            />
          </div>
        </div>
        <div className="pt-8">
          <div>
            {!confirmed ? (
              <button
                onClick={handleConfirm}
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md border-gray-400 hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              >
                Confirm
              </button>
            ) : (
              <div className="">
                <AnimatedCheckmark />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
