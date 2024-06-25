import { Item } from "@/app/page";
import currency from "currency.js";

export const calculateSharedPrice = (
  unitPrice: number,
  quantity: number,
  totalPeopleShared: number,
  tax: number,
  serviceCharge: number
) => {
  if (totalPeopleShared === 0) {
    return 0;
  }
  const unitPriceAftTax = unitPrice * ((1 + tax) / 100);
  const unitPriceAftServiceCharge =
    unitPriceAftTax * ((1 + serviceCharge) / 100);
  return (unitPriceAftServiceCharge * quantity) / totalPeopleShared;
};

export const convertToCurrency = (num: string) => {
  const newNum = currency(num).toString();
  return newNum;
};
