"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import Upload from "@/components/Upload";
import People from "@/components/People";
import Information from "@/components/Information";

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
  const [tax, setTax] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [person, setPerson] = useState<Person[]>([]);
  const [infoConfirmed, setInfoConfirmed] = useState<boolean>(false);

  return (
    <div className="p-4">
      <Information
        setPeople={setPeople}
        setServiceCharge={setServiceCharge}
        setTax={setTax}
      />
      <div className="flex flex-col p-4 gap-y-4">
        {infoConfirmed && (
          <div>
            <Upload people={people} setItems={setItems} setPerson={setPerson} />
            <People people={person} />
          </div>
        )}
      </div>
    </div>
  );
}
