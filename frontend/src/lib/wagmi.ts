import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, baseSepolia, arbitrumSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Nexus SDK with RainbowKit",
  projectId: "2ad719851491ae7b2099cb094df57894",
  chains: [sepolia, baseSepolia, arbitrumSepolia],
  ssr: false,
});
