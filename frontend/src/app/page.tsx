"use client";

import { RainbowProvider } from "../providers/RainbowProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <RainbowProvider>
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
              <ConnectButton />
            </div>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome to XBridge!
          </h2>
        </section>
      </main>
    </RainbowProvider>
  );
}
