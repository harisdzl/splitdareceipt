"use client";
import React, { useState } from "react";
import Upload from "@/components/Upload";
import People from "@/components/People";
import AnimatedCheckmark from "@/components/AnimatedCheckmark";

export interface Item {
  name: string;
  price: number;
  quantity: number;
  sharedPrice: number;
  people: string[];
}

export interface Person {
  name: string;
  items: Map<string, number>;
  totalSpent: number;
}

export default function Home() {
  const [people, setPeople] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [person, setPerson] = useState<Person[]>([]);
  const [namesConfirmed, setNamesConfirmed] = useState(false);

  const handleNames = (peopleStr: string) => {
    const peopleArr = peopleStr.split(",");
    const result = [];
    for (var person of peopleArr) {
      result.push(person.trim());
    }
    return result;
  };

  const handleConfirm = () => {
    setNamesConfirmed(true);
  };

  return (
    <div className="">
      <div className="flex flex-col p-4 gap-y-4">
        <div className="">
          <label
            htmlFor="caption"
            className="block text-gray-700 font-bold mb-2"
          >
            People involved:
          </label>
          <div className="flex">
            <input
              type="text"
              id="people"
              name="people"
              className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g Adam, Bob, Wei Jie"
              required
              onChange={(e) => setPeople(handleNames(e.target.value))}
              disabled={namesConfirmed === true ? true : false}
            />
            {!namesConfirmed ? (
              <button
                onClick={handleConfirm}
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r border-gray-400 hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              >
                Confirm
              </button>
            ) : (
              <div className="ml-2">
                <AnimatedCheckmark />
              </div>
            )}
          </div>
        </div>
        {namesConfirmed && (
          <div>
            <Upload people={people} setItems={setItems} setPerson={setPerson} />
            <People people={person} />
          </div>
        )}
      </div>
    </div>
  );
}
