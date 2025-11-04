"use client";

import TransferForm from "../components/TransferForm";
import ConnectWalletButton from "@/src/components/avail/connect-button";

export default function Page() {
  const btn =
    "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" +
    "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 border-b border-white/40 shadow-sm">
        <div className="relative mx-auto px-16 py-3 flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">XBridge</h1>

          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-4 text-gray-600">
            <a
              className="px-3 py-1 rounded hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              href="#"
            >
              Docs
            </a>
            <a
              className="px-3 py-1 rounded hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              href="#"
            >
              Features
            </a>
            <a
              className="px-3 py-1 rounded hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              href="#"
            >
              Contact
            </a>
          </nav>
          <div className="ml-auto">
            <ConnectWalletButton className={btn} />
          </div>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center w-full px-4">
        <TransferForm />
      </section>
    </main>
  );
}
