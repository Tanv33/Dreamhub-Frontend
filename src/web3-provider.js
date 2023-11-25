import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { coinBaseEthereum } from "./coinbase-config";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const web3WithProvider = async () => {
  const walletType = localStorage.getItem("walletType");
  if (walletType === "metaMask") {
    console.log("setting metaMask provider");
    let provider;
    // const metaMaskProvider = await detectEthereumProvider();
    if (window.ethereum.isMetaMask) {
      provider = window.ethereum;
    }
    window?.ethereum?.providers?.forEach(async (p) => {
      if (p.isMetaMask) {
        provider = p;
      }
    });
    return new Web3(provider);
  }
  if (walletType === "coinBaseWallet") {
    console.log("setting coinBaseWallet provider");
    return new Web3(coinBaseEthereum);
  }
  if (walletType === "walletConnect") {
    console.log("setting walletConnect provider");
    const provider = new WalletConnectProvider({
      rpc: {
        4002: "https://rpc.testnet.fantom.network/",
        // 1: "https://rpc.ftm.tools/",
        // 3: "https://cointool.app/rpcServer/ftm",
        // 3: "https://ropsten.mycustomnode.com",
        // 100: "https://dai.poa.network",
      },
    });
    await provider.enable();
    return new Web3(provider);
  }
};

export const metaMaskProvider = async () => {
  if (typeof window.ethereum !== "undefined") {
    let provider;
    if (window.ethereum.isMetaMask) {
      provider = window.ethereum;
    }
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach(async (p) => {
        if (p.isMetaMask) {
          provider = p;
        }
      });
    }
    return provider;
  }
};

export const getCurrentProvider = () => {
  const checkWalletType = localStorage.getItem("walletType");
  if (checkWalletType === "metaMask") {
    let provider;
    if (window.ethereum.isMetaMask) {
      provider = window.ethereum;
    }
    if (window.ethereum.providers) {
      window.ethereum.providers.forEach(async (p) => {
        if (p.isMetaMask) {
          provider = p;
        }
      });
    }
    console.log("metaProvider", provider);
    return provider;
  } else if (checkWalletType === "coinBaseWallet") {
    console.log("coinProvider", coinBaseEthereum);
    return coinBaseEthereum;
  } else {
    console.log("No coinProvider No metaProvider detected");
  }
};
