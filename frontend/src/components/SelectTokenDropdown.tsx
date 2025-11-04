"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const TOKENS = [
  {
    name: "ETH",
    icon: "/ethereum.png",
  },
  {
    name: "USDT",
    icon: "/tokens/USDT.png",
  },
  {
    name: "USDC",
    icon: "/tokens/USDC.png",
  },
];

interface TokenDropdownProps {
  selectedToken: string;
  onChange: (selected: string) => void;
}

export default function TokenDropdown({
  selectedToken,
  onChange,
}: TokenDropdownProps) {
  const selected = TOKENS.find((t) => t.name === selectedToken);

  return (
    <div className="w-full">
      <Listbox value={selectedToken} onChange={onChange}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/70 py-3 pl-4 pr-10 text-left border border-gray-300 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm hover:shadow-md">
              <span className="flex items-center gap-2 truncate text-gray-700 font-medium">
                {selected ? (
                  <>
                    <Image
                      src={selected.icon}
                      alt={selected.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    {selected.name}
                  </>
                ) : (
                  "Select token"
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-2 w-full rounded-2xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                {TOKENS.map((token) => (
                  <Listbox.Option
                    key={token.name}
                    value={token.name}
                    as={Fragment}
                  >
                    {({ active }) => (
                      <div
                        onClick={() =>
                          onChange(
                            selectedToken === token.name ? "" : token.name
                          )
                        }
                        className={`relative flex items-center gap-2 cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-indigo-100 text-indigo-900"
                            : "text-gray-900"
                        }`}
                      >
                        <Image
                          src={token.icon}
                          alt={token.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span
                          className={`block truncate ${
                            selectedToken === token.name
                              ? "font-semibold"
                              : "font-normal"
                          }`}
                        >
                          {token.name}
                        </span>
                        {selectedToken === token.name && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
