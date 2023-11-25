// import Axios from "axios";
import {
  GET_CONNECTED_WALLET,
  SET_CONNECTOR,
  WALLET_BALANCE,
  WALLET_LOADER,
} from "../action/wallet";
import {
  SET_USER_NFT,
  SET_USER_PROFILE,
  GET_NFTS_ON_SELL,
  GET_USER_CREATED_NFTS,
  GET_SINGLE_NFT,
  GET_USER_NFTS_ON_SELL,
  MINTING_LOADER,
  SELL_NFT_LOADER,
  BUT_NFT_LOADER,
  SET_WALLET_TYPE,
  BID_NFT_LOADER,
  AUCITON_NFT_LOADER,
  GET_NFTS_ON_AUCTION,
  GET_SINGLE_NFT_LOADER,
  GET_NFTS_ON_BID,
  GET_BID_OFFERS,
  PLACE_BID_LOADER,
  GET_AUCTION_OFFERS_DATA,
} from "../action/user-task";

const initialState = {
  walletLoader: false,
  connectedWallet: false,
  token: false,
  user: false,
  userProfile: false,
  userNFTS: [],
  userCreatedNfts: [],
  singleNft: false,
  userNftsOnSell: [],
  mintingLoader: false,
  sellNftLoader: false,
  bidNftLoader: false,
  auctionNftLoader: false,
  connector: false,
  buyNftLoader: false,
  walletType: false,
  accountBalance: false,
  singleNftLoader: false,
  allBidOffers: false,
  placeBidLoader: false,
  allAuctionOffers: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_TYPE:
      return {
        ...state,
        walletType: action.payload,
      };
    case SET_CONNECTOR:
      return {
        ...state,
        connector: action.payload.connector,
      };
    case WALLET_LOADER:
      return {
        ...state,
        walletLoader: action.payload,
      };
    case GET_CONNECTED_WALLET:
      console.log(action, "userToken");
      return {
        ...state,
        connectedWallet: action.payload.account,
        token: action.payload.userToken,
        user: action.payload.user,
      };
    case SET_USER_PROFILE:
      // console.log(action.payload);
      return {
        ...state,
        userProfile: action.payload.userProfile,
      };
    case SET_USER_NFT:
      // console.log(action.payload);
      return {
        ...state,
        userNFTS: action.payload.userNFTS,
      };
    case GET_NFTS_ON_SELL:
      // console.log(action.payload);
      return {
        ...state,
        sellNFTS: action.payload.sellNFTS,
      };
    case GET_NFTS_ON_BID:
      // console.log(action.payload);
      return {
        ...state,
        bidNFTS: action.payload.bidNFTS,
      };
    case GET_NFTS_ON_AUCTION:
      // console.log(action.payload);
      return {
        ...state,
        auctionNFTS: action.payload.auctionNFTS,
      };
    case GET_USER_CREATED_NFTS:
      // console.log(action.payload);
      return {
        ...state,
        userCreatedNfts: action.payload.userCreatedNfts,
      };
    case GET_SINGLE_NFT:
      // console.log(action.payload);
      return {
        ...state,
        singleNft: action.payload.singleNft,
      };
    case GET_USER_NFTS_ON_SELL:
      // console.log(action.payload);
      return {
        ...state,
        userNftsOnSell: action.payload.userNftsOnSell,
      };
    case MINTING_LOADER:
      // console.log(action.payload);
      return {
        ...state,
        mintingLoader: action.payload,
      };
    case SELL_NFT_LOADER:
      // console.log(action.payload);
      return {
        ...state,
        sellNftLoader: action.payload,
      };
    case BID_NFT_LOADER:
      // console.log(action.payload);
      return {
        ...state,
        bidNftLoader: action.payload,
      };
    case AUCITON_NFT_LOADER:
      // console.log(action.payload);
      return {
        ...state,
        auctionNftLoader: action.payload,
      };
    case BUT_NFT_LOADER:
      return {
        ...state,
        buyNftLoader: action.payload,
      };
    case WALLET_BALANCE:
      console.log(action.payload);
      return {
        ...state,
        accountBalance: action.payload,
      };
    case GET_SINGLE_NFT_LOADER:
      return {
        ...state,
        singleNftLoader: action.payload,
      };
    case GET_BID_OFFERS:
      return {
        ...state,
        allBidOffers: action.payload,
      };
    case PLACE_BID_LOADER:
      return {
        ...state,
        placeBidLoader: action.payload,
      };
    case GET_AUCTION_OFFERS_DATA:
      return {
        ...state,
        allAuctionOffers: action.payload,
      };

    default:
      return state;
  }
};
