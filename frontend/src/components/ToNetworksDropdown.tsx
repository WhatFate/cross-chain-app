import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const NETWORKS = [
  { id: 11155111, name: "Ethereum Sepolia" },
  { id: 84532, name: "Base Sepolia" },
  { id: 421614, name: "Arbitrum Sepolia" },
];

interface ToNetworkDropdownProps {
  selectedNetwork: number | null;
  onChange: (selected: number | null) => void;
}

export default function ToNetworksDropdown({
  selectedNetwork,
  onChange,
}: ToNetworkDropdownProps) {
  const toggleNetwork = (id: number) => {
    const updated = selectedNetwork === id ? null : id;
    onChange(updated);
  };

  return (
    <div className="w-full">
      <Listbox value={selectedNetwork} onChange={onChange}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/70 py-3 pl-4 pr-10 text-left border border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all shadow-sm hover:shadow-md">
              <span className="block truncate text-gray-700 font-medium">
                {selectedNetwork
                  ? NETWORKS.find((n) => n.id === selectedNetwork)?.name
                  : "Select a network"}
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
                {NETWORKS.map((network) => (
                  <Listbox.Option
                    key={network.id}
                    value={network.id}
                    as={Fragment}
                  >
                    {({ active }) => (
                      <div
                        onClick={() =>
                          onChange(
                            selectedNetwork === network.id ? null : network.id
                          )
                        }
                        className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`}
                      >
                        <span
                          className={`block truncate ${
                            selectedNetwork === network.id
                              ? "font-semibold"
                              : "font-normal"
                          }`}
                        >
                          {network.name}
                        </span>
                        {selectedNetwork === network.id && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
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
