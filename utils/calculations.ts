import { Item } from "@/app/page";
import currency from "currency.js";

export const calculateSharedPrice = (
  unitPrice: number,
  quantity: number,
  totalPeopleShared: number
) => {
  if (totalPeopleShared === 0) {
    return 0;
  }
  return (unitPrice * quantity) / totalPeopleShared;
};

export const convertToCurrency = (num: string) => {
  const newNum = currency(num).toString();
  return newNum;
};
