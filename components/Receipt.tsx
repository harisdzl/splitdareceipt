import React, { useState, useEffect } from "react";
import { Item, Person } from "@/app/page";
import Dropdown from "@/components/Dropdown";
import { calculateSharedPrice, convertToCurrency } from "@/utils/calculations";

interface ReceiptProps {
  receiptText: string | null;
  people: string[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setPerson: React.Dispatch<React.SetStateAction<Person[]>>;
  tax: number;
  serviceCharge: number;
}

const Receipt = ({
  receiptText,
  people,
  setItems,
  setPerson,
  tax,
  serviceCharge,
}: ReceiptProps) => {
  const [items, setLocalItems] = useState<Item[]>([]);
  const [localPeople, setLocalPeople] = useState<Person[]>([]);

  useEffect(() => {
    if (receiptText) {
      let receiptData;
      try {
        receiptData = JSON.parse(receiptText);
        const initialItems = receiptData.items.map(
          (item: { name: string; quantity: string; price: string }) => ({
            name: item.name,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            people: [],
            sharedPrice: 0,
          })
        );
        setLocalItems(initialItems);
        setItems(initialItems);

        // Initialize persons
        const initialPersons = people.map((person) => ({
          name: person,
          items: new Map<string, number>(),
          totalSpent: 0,
        }));
        setLocalPeople(initialPersons);
        console.log(initialPersons);
      } catch (error) {
        console.error("Failed to parse receipt text:", error);
      }
    }
  }, [receiptText, setItems]);

  const updateItemPeople = (index: number, newPeople: string[]) => {
    const updatedItems = [...items];
    const item = updatedItems[index];
    const oldPeople = item.people;

    // Update people and shared price for the item
    item.people = newPeople;
    item.sharedPrice = calculateSharedPrice(
      item.price,
      item.quantity,
      newPeople.length,
      tax,
      serviceCharge
    );

    // Reset all totals to recalculate them
    const updatedPeople = localPeople.map((person) => ({
      ...person,
      items: new Map<string, number>(),
      totalSpent: 0,
    }));

    // Recalculate totals
    updatedItems.forEach((item) => {
      item.people.forEach((personName) => {
        const person = updatedPeople.find((p) => p.name === personName);
        if (person) {
          person.items.set(item.name, item.sharedPrice);
        }
      });
    });

    updatedPeople.forEach((person) => {
      person.items.forEach((sharedPrice) => {
        person.totalSpent += sharedPrice;
      });
    });

    setLocalItems(updatedItems);
    setItems(updatedItems);
    setLocalPeople(updatedPeople);
    setPerson(updatedPeople);
  };

  if (!receiptText) {
    return null;
  }

  let receiptData;
  try {
    receiptData = JSON.parse(receiptText);
  } catch (error) {
    console.error("Failed to parse receipt text:", error);
    return <div>Error parsing receipt text</div>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalAfterTax = total * (1 + tax / 100);
  const totalAfterServiceCharge = totalAfterTax * (1 + serviceCharge / 100);

  return (
    <div className="border border-gray-500 rounded-lg w-full h-auto py-2 px-3">
      <table className="bg-white table-fixed content-center w-full text-center text-xs sm:text-base">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Item</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="px-4 border-b">People</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="text-left py-2 px-4 border-b sm:text-sm">
                {item.name}
              </td>
              <td className="py-2 px-4 border-b">
                ${convertToCurrency(item.price.toString())}
              </td>
              <td className="py-2 px-4 border-b">{item.quantity}</td>
              <td className="py-2 px-4 border-b">
                <Dropdown
                  people={people}
                  itemIndex={index}
                  selectedPeople={item.people}
                  updateItemPeople={updateItemPeople}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="py-2 px-4 border-b">-</td>
            <td className="text-left py-2 px-4 border-b">Total</td>
            <td className="py-2 px-4 border-b">
              ${convertToCurrency(total.toString())}
            </td>
            <td className="py-2 px-4 border-b">-</td>
            <td className="py-2 px-4 border-b">-</td>
          </tr>
          {tax > 0 && (
            <tr>
              <td className="py-2 px-4 border-b">-</td>
              <td className="text-left py-2 px-4 border-b">Total After Tax:</td>
              <td className="py-2 px-4 border-b">
                ${convertToCurrency(totalAfterTax.toString())}
              </td>
              <td className="py-2 px-4 border-b">-</td>
              <td className="py-2 px-4 border-b">-</td>
            </tr>
          )}
          {tax > 0 && serviceCharge > 0 && (
            <tr>
              <td className="py-2 px-4 border-b">-</td>
              <td className="text-left py-2 px-4 border-b">Total After Tax:</td>
              <td className="py-2 px-4 border-b">
                ${convertToCurrency(totalAfterServiceCharge.toString())}
              </td>
              <td className="py-2 px-4 border-b">-</td>
              <td className="py-2 px-4 border-b">-</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Receipt;
