import { Item, Person } from "@/app/page";
import { convertToCurrency } from "@/utils/calculations";
import React from "react";
interface PeopleProps {
  people: Person[];
}

const People = ({ people }: PeopleProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-gray-700 font-bold mb-2">Splitting:</h2>
      <div className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
        <table className="min-w-full bg-white table-auto text-center text-xs sm:text-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{person.name}</td>
                <td className="py-2 px-4 border-b">
                  ${convertToCurrency(person.totalSpent.toString())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default People;
