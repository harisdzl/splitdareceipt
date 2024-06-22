import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface DropdownProps {
  people: string[];
  itemIndex: number;
  selectedPeople: string[];
  updateItemPeople: (index: number, people: string[]) => void;
}

export default function Dropdown({
  people,
  itemIndex,
  selectedPeople,
  updateItemPeople,
}: DropdownProps) {
  const [selectedNames, setSelectedNames] = useState<string[]>(selectedPeople);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSelection = (e: React.MouseEvent, name: string) => {
    e.preventDefault(); // Prevent the dropdown from closing
    setSelectedNames((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((n) => n !== name)
        : [...prevSelected, name]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    updateItemPeople(itemIndex, selectedNames);
  }, [selectedNames]);

  return (
    <Menu
      as="div"
      className="relative inline-block text-left w-12 justify-center mt-1 sm:w-20"
    >
      <div>
        <MenuButton className="inline-flex w-full justify-end items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedNames.length > 0 && selectedNames.length}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {people.map((name: string, index: number) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={(e) => handleSelection(e, name)}
                  >
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedNames.includes(name)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{name}</span>
                    </label>
                  </div>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
