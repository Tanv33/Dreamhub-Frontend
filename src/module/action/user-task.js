import axios from "axios";
import Web3 from "web3";
import {
  MP_ADDRESS,
  NEW_CONTRACT_ADDRESS,
  NFT_ADDRESS,
} from "../../assets/web3/addresses";
import NFT_ABI from "../../assets/web3/NFT_ABI.js";
import MP_ABI from "../../assets/web3/MP_ABI.js";
import NEW_MP_ABI from "../../assets/web3/NEW_MP_ABI.js";
import NEW_CONTRACT_ABI from "../../assets/web3/contract/NEW_CONTRACT_ABI.js";
import { BASE_URL, CHAIN_ID } from "../../constants";
import { getConnectWalletSuccess } from "./wallet";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { coinBaseEthereum } from "../../coinbase-config";
import { getCurrentProvider, web3WithProvider } from "./../../web3-provider";

const PINATA_API_KEY = process.env.React_App_PINATA_API_KEY;
const PINATA_API_SECRET = process.env.React_App_PINATA_API_SECRET;
const PINATA_JWT = process.env.React_App_PINATA_JWT;
const pinataUrl = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

// const web3 = new Web3(Web3.givenProvider);
// Get User
export const getUserProfile = (userId) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/profile/get/${userId}`,
      headers: {},
    };
    console.log("Get User api");
    axios(config)
      .then(function (response) {
        // console.log(response.data.user[0]);
        let userProfile = response.data.user[0];
        dispatch(setUserProfile(userProfile));
      })
      .catch(function (error) {
        console.log("get user error", error);
      });
  };
};

//Set User Profile
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: { userProfile },
});

// Get User NFTs",
export const getUserNFT = (userId) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/nft/user-collected-nfts/${userId}`,
      headers: {},
    };
    console.log("Get User NFT api");
    axios(config)
      .then(async function (response) {
        // console.log(response.data.collectedNfts);
        let userNFTS = response.data.collectedNfts;
        // console.log(userNFTS);
        // for (let i = 0; i < userNFTS?.length; i++) {
        //   userNFTS[i].actualPrice = await nftActualPrice(
        //     userNFTS[i]?.events?.Transfer?.returnValues?.tokenId ||
        //       userNFTS[i]?.events?.AskNew?.returnValues?.tokenId ||
        //       userNFTS[i]?.events?.Trade?.returnValues?.tokenId
        //   );
        // }
        dispatch(setUserNFT(userNFTS));
      })
      .catch(function (error) {
        console.log("get user error", error);
      });
  };
};

//Set User NFT's
export const SET_USER_NFT = "SET_USER_NFT";
export const setUserNFT = (userNFTS) => ({
  type: SET_USER_NFT,
  payload: { userNFTS },
});

// Get NFTs On Sell",
export const getNFTSOnSell = () => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/sell/get-all?nftType=${"sell"}`,
      headers: {},
    };
    console.log("Get NFTS On Sell");
    const web3 = new Web3(await web3WithProvider());

    const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
    axios(config)
      .then(async function (response) {
        // console.log(response.data.sells);
        let sellNFTS = response.data.sells;
        // for (let i = 0; i < sellNFTS?.length; i++) {
        //   sellNFTS[i].actualPrice = await nftActualPrice(
        //     sellNFTS[i]?.events?.AskNew?.returnValues?.tokenId ||
        //       sellNFTS[i]?.events?.Transfer?.returnValues?.tokenId ||
        //       sellNFTS[i]?.events?.Trade?.returnValues?.tokenId
        //   );
        // }
        dispatch(setNFTSOnSell(sellNFTS));
      })
      .catch(function (error) {
        console.log("get nfts on sell error", error);
      });
  };
};

// Get NFTs On Bid",
export const getNFTSOnBid = () => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/sell/get-all?nftType=${"bid"}`,
      headers: {},
    };
    console.log("Get NFTS On Bid");
    // const web3 = new Web3(await web3WithProvider());

    // const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
    axios(config)
      .then(async function (response) {
        // console.log(response.data.sells);
        let bidNFTS = response.data.sells;
        // for (let i = 0; i < bidNFTS?.length; i++) {
        //   bidNFTS[i].actualPrice = await nftActualPrice(
        //     bidNFTS[i]?.events?.AskNew?.returnValues?.tokenId ||
        //       bidNFTS[i]?.events?.Transfer?.returnValues?.tokenId ||
        //       bidNFTS[i]?.events?.Trade?.returnValues?.tokenId
        //   );
        // }
        dispatch(setNFTSOnBid(bidNFTS));
      })
      .catch(function (error) {
        console.log("get nfts on bid error", error);
      });
  };
};
// Get NFTs On Auction",
export const getNFTSOnAuction = () => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/sell/get-all?nftType=${"auction"}`,
      headers: {},
    };
    console.log("Get NFTS On Auction");
    // const web3 = new Web3(await web3WithProvider());

    // const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
    axios(config)
      .then(async function (response) {
        // console.log(response.data.sells);
        let bidNFTS = response.data.sells;
        // for (let i = 0; i < bidNFTS?.length; i++) {
        //   bidNFTS[i].actualPrice = await nftActualPrice(
        //     bidNFTS[i]?.events?.AskNew?.returnValues?.tokenId ||
        //       bidNFTS[i]?.events?.Transfer?.returnValues?.tokenId ||
        //       bidNFTS[i]?.events?.Trade?.returnValues?.tokenId
        //   );
        // }
        dispatch(setNFTSOnAuction(bidNFTS));
      })
      .catch(function (error) {
        console.log("get nfts on bid error", error);
      });
  };
};

//Set User NFT's On Sell
export const GET_NFTS_ON_SELL = "GET_NFTS_ON_SELL";
export const setNFTSOnSell = (sellNFTS) => ({
  type: GET_NFTS_ON_SELL,
  payload: { sellNFTS },
});
//Set User NFT's On Bid
export const GET_NFTS_ON_BID = "GET_NFTS_ON_BID";
export const setNFTSOnBid = (bidNFTS) => ({
  type: GET_NFTS_ON_BID,
  payload: { bidNFTS },
});
//Set User NFT's On Auction
export const GET_NFTS_ON_AUCTION = "GET_NFTS_ON_AUCTION";
export const setNFTSOnAuction = (auctionNFTS) => ({
  type: GET_NFTS_ON_AUCTION,
  payload: { auctionNFTS },
});

// Get User Created NFTs",
export const getUserCreatedNfts = (userId) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/nft/user-created-nfts/${userId}`,
      headers: {},
    };
    console.log("Get User created NFTS");
    axios(config)
      .then(async function (response) {
        // console.log(response.data.createdNfts);
        let userCreatedNfts = response.data.createdNfts;
        // console.log(userCreatedNfts);
        // for (let i = 0; i < userCreatedNfts?.length; i++) {
        //   userCreatedNfts[i].actualPrice = await nftActualPrice(
        //     userCreatedNfts[i]?.events?.AskNew?.returnValues?.tokenId ||
        //       userCreatedNfts[i]?.events?.Transfer?.returnValues?.tokenId ||
        //       userCreatedNfts[i]?.events?.Trade?.returnValues?.tokenId
        //   );
        // }
        dispatch(setCreatedNfts(userCreatedNfts));
      })
      .catch(function (error) {
        console.log("get user created nfts error", error);
      });
  };
};

//Set User Created NFT's
export const GET_USER_CREATED_NFTS = "GET_USER_CREATED_NFTS";
export const setCreatedNfts = (userCreatedNfts) => ({
  type: GET_USER_CREATED_NFTS,
  payload: { userCreatedNfts },
});

//MINT NFTs Loader
export const MINTING_LOADER = "MINTING_LOADER";
export const mintingLoader = (bool) => ({
  type: MINTING_LOADER,
  payload: bool,
});

// Mint NFTs",
export const mintNft = (dataObject, alert, alertText, clearState) => {
  return async (dispatch) => {
    // // let user = JSON.parse(localStorage.getItem("user"));
    // // // alert(JSON.stringify(dataObject, null, 2));
    // // const nft = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
    // var pinataImgUrl;
    // var pinataMetaDataUrl;
    try {
      // // initialize the form data
      // const pinataFormData = new FormData();

      // // append the file form data to
      // pinataFormData.append("file", dataObject.nftImg);
      // const pinataImgRes = await axios.post(pinataUrl, pinataFormData, {
      //   maxContentLength: "Infinity",
      //   headers: {
      //     "Content-Type": `multipart/form-data;boundary=${pinataFormData._boundary}`,
      //     pinata_api_key: PINATA_API_KEY,
      //     pinata_secret_api_key: PINATA_API_SECRET,
      //   },
      // });

      // // console.log(pinataImgRes);
      // if (!pinataImgRes.data.IpfsHash) {
      //   return console.log("error occured in pinataImgRes");
      // }
      // var data = JSON.stringify({
      //   pinataOptions: {
      //     cidVersion: 1,
      //   },
      //   pinataMetadata: {
      //     name: dataObject.title,
      //     keyvalues: {
      //       customKey: "customValue",
      //       customKey2: "customValue2",
      //     },
      //   },
      //   pinataContent: {
      //     // somekey: "somevalue",
      //     title: dataObject.title,
      //     description: dataObject.description,
      //     nftImg: pinataImgRes.data.IpfsHash,
      //   },
      // });
      // pinataImgUrl = pinataImgRes.data.IpfsHash;
      // // console.log(PINATA_JWT);
      // var config = {
      //   method: "post",
      //   url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${PINATA_JWT}`,
      //   },
      //   data: data,
      // };
      // // var data = JSON.stringify({
      // //   hashToPin: pinataImgRes.data.IpfsHash,
      // //   pinataMetadata: {
      // //     name: dataObject.title,
      // //     keyvalues: {
      // //       title: dataObject.title,
      // //       description: dataObject.description,
      // //       nftImg: pinataImgRes.data.IpfsHash,
      // //     },
      // //   },
      // // });

      // // var config = {
      // //   method: "post",
      // //   url: "https://api.pinata.cloud/pinning/pinByHash",
      // //   headers: {
      // //     Authorization: `Bearer ${PINATA_JWT}`,
      // //     "Content-Type": "application/json",
      // //   },
      // //   data: data,
      // // };

      // const pinataJsonRes = await axios(config);

      // console.log(pinataJsonRes.data);
      // if (!pinataJsonRes.data.IpfsHash) {
      //   return console.log("error occured in pinataJsonRes");
      // }
      // pinataMetaDataUrl = pinataJsonRes.data.IpfsHash;
      // const data = await nft.methods.addCollection().send({
      //   _collection: "address",
      //   _creator: user?.username,
      //   _whitelistChecker: "address",
      //   _tradingFee: "0",
      //   _creatorFee: "0",
      // });
      // alert(JSON.stringify(dataObject, null, 2));
      dispatch(mintingLoader(true));
      let formData = new FormData();
      console.log("mint function call");
      let token = localStorage.getItem("userToken");
      let user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      if (user) {
        const web3 = new Web3(await web3WithProvider());
        // const nft = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
        const nft = new web3.eth.Contract(
          NEW_CONTRACT_ABI,
          NEW_CONTRACT_ADDRESS
        );
        // const data = await nft.methods
        //   .safeMint(user?.username)
        //   .send({ from: user?.username });
        const data = await nft.methods
          .CreateItem(
            {
              name: dataObject.title,
              description: dataObject.description,
              image:
                "https://dgbijzg00pxv8.cloudfront.net/2be546c5-d992-44fb-b951-3a70da2e3d7c/000000-0000000002/12705615054912432668355376795478029735962588816287845209138419018508202631555/ITEM_PREVIEW1.gif",
              external_url: "https://dreamhubwebsite.web.app/",
              attributes: [],
            },
            Number(dataObject.royality) * 10
          )
          .send({ from: user?.username });
        console.log({ mintedNFTOBJ: data });
        formData.append("title", dataObject.title);
        formData.append("description", dataObject.description);
        formData.append("nftImg", dataObject.nftImg);
        formData.append("royality", dataObject.royality);
        formData.append("size", dataObject.size);
        formData.append("abstraction", dataObject.abstraction);
        // formData.append("pinataImgUrl", pinataImgUrl);
        // formData.append("pinataMetaDataUrl", pinataMetaDataUrl);
        // console.log(data);
        if (data) {
          var data2 = JSON.stringify(data);
          formData.append("body", data2);
          var config = {
            method: "post",
            url: ` ${BASE_URL}/api/v1/user/nft/create/${user?._id}`,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            data: formData,
          };
          axios(config)
            .then(function (response) {
              dispatch(mintingLoader(false));
              // getUserNFTS(user._id);
              alert.success(alertText);
              clearState();
              console.log(response);
              console.log("NFT Minted Successfully");
            })
            .catch(function (error) {
              alert.error("NFT Not minted, Please try again!");
              console.log(error);
            });
        } else {
          dispatch(mintingLoader(false));
          console.log("No user found in localStorage");
        }
      }
      // console.log(pinataImgUrl, pinataMetaDataUrl);
    } catch (error) {
      console.log("catch chala", error);
      // console.log(pinataImgUrl, pinataMetaDataUrl);
      // var config1 = {
      //   method: "delete",
      //   url: `https://api.pinata.cloud/pinning/unpin/${pinataImgUrl}`,
      //   headers: {
      //     Authorization: `Bearer ${PINATA_JWT}`,
      //   },
      // };
      // const pinataImgUrlDeleteRes = await axios(config1);
      // console.log(pinataImgUrlDeleteRes);
      // var config2 = {
      //   method: "delete",
      //   url: `https://api.pinata.cloud/pinning/unpin/${pinataMetaDataUrl}`,
      //   headers: {
      //     Authorization: `Bearer ${PINATA_JWT}`,
      //   },
      // };
      // const pinataMetaDataUrlDeleteRes = await axios(config2);
      // console.log(pinataMetaDataUrlDeleteRes);
      dispatch(mintingLoader(false));
    }
  };
};

//Set User Created NFT's
export const GET_SINGLE_NFT_LOADER = "GET_SINGLE_NFT_LOADER";
export const setSingleNftLoader = (payload) => ({
  type: GET_SINGLE_NFT_LOADER,
  payload: payload,
});

// Get Single NFT",
export const getSingleNft = (nftId) => {
  return async (dispatch) => {
    dispatch(setSingleNftLoader(true));
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/nft/get-single-nft/${nftId}`,
      headers: {},
    };
    console.log("Get Single Nft");
    axios(config)
      .then(async function (response) {
        dispatch(setSingleNftLoader(false));
        // console.log(response.data.singleNft);
        let singleNft = response.data.singleNft;
        // if (singleNft) {
        //   singleNft.actualPrice = await nftActualPrice(
        //     singleNft?.events?.AskNew?.returnValues?.tokenId ||
        //       singleNft?.events?.Transfer?.returnValues?.tokenId ||
        //       singleNft?.events?.Trade?.returnValues?.tokenId
        //   );
        // }
        dispatch(setSingleNft(singleNft));
      })
      .catch(function (error) {
        dispatch(setSingleNftLoader(false));
        console.log("get single nfts error", error);
      });
  };
};

//Set User Created NFT's
export const GET_SINGLE_NFT = "GET_SINGLE_NFT";
export const setSingleNft = (singleNft) => ({
  type: GET_SINGLE_NFT,
  payload: { singleNft },
});

//Sell Loader
export const SELL_NFT_LOADER = "SELL_NFT_LOADER";
export const sellNftLoader = (bool) => ({
  type: SELL_NFT_LOADER,
  payload: bool,
});

//Bid Loader
export const BID_NFT_LOADER = "BID_NFT_LOADER";
export const bidNftLoader = (bool) => ({
  type: BID_NFT_LOADER,
  payload: bool,
});

//Auction Loader
export const AUCITON_NFT_LOADER = "AUCITON_NFT_LOADER";
export const auctionNftLoader = (bool) => ({
  type: AUCITON_NFT_LOADER,
  payload: bool,
});

// Sell NFT",
export const sellNft = (
  user,
  singleNft,
  dataObject,
  sellPrice,
  navigate,
  alert,
  alertText,
  hide
) => {
  // singleNft.events.Transfer.returnValues.tokenId
  return async (dispatch) => {
    console.log("sell function call");
    console.log(singleNft);
    // console.log({
    //   user,
    //   singleNft,
    //   dataObject,
    //   sellPrice,
    //   navigate,
    //   alert,
    //   alertText,
    //   hide,
    // });
    dispatch(sellNftLoader(true));
    const web3 = new Web3(await web3WithProvider());
    // const nft = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
    var nft = new web3.eth.Contract(NEW_CONTRACT_ABI, NEW_CONTRACT_ADDRESS);
    try {
      let token = localStorage.getItem("userToken");
      const accounts = await web3.eth.requestAccounts();
      const tvl = await nft.methods
        .setApprovalForAll(
          NEW_CONTRACT_ADDRESS,
          // singleNft?.events?.AskNew?.returnValues?.tokenId ||
          //   singleNft?.events?.Transfer?.returnValues?.tokenId ||
          //   singleNft?.events?.Trade?.returnValues?.tokenId
          true
        )
        .send({ from: accounts[0] });
      console.log({ tvl });

      if (tvl) {
        // const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
        // const MP = new web3.eth.Contract(
        //   NEW_CONTRACT_ABI,
        //   NEW_CONTRACT_ADDRESS
        // );
        // console.log({ MP });
        // console.log(MP.methods);
        // console.log(await MP.methods.owner().call());
        // var newPrice = await web3.utils.toWei(String(sellPrice), "ether");
        // console.log({newPrice});
        // var market = await MP.methods
        //   .createAskOrder(
        //     NFT_ADDRESS,
        //     singleNft?.events?.AskNew?.returnValues?.tokenId ||
        //       singleNft?.events?.Transfer?.returnValues?.tokenId ||
        //       singleNft?.events?.Trade?.returnValues?.tokenId,
        //     // String(Math.round(sellPrice)) // "100"
        //     String(sellPrice) // "100"
        //   ) //(addressNfT, tokenID, price)
        console.log(singleNft);
        console.log(
          singleNft?.events?.AskNew?.returnValues?.tokenId ||
            singleNft?.events?.Transfer?.returnValues?.tokenId ||
            singleNft?.events?.Trade?.returnValues?.tokenId ||
            singleNft?.events?.Transfer[0]?.returnValues?.tokenId
        );
        var market = await nft.methods
          .ListOnSale(
            NEW_CONTRACT_ADDRESS,
            singleNft?.events?._listOnSale?.returnValues?.tokenId ||
              singleNft?.events?.Transfer?.returnValues?.tokenId ||
              singleNft?.events?.Trade?.returnValues?.tokenId ||
              singleNft?.events?.Transfer[0]?.returnValues?.tokenId, // String(Math.round(sellPrice)) // "100"
            Web3.utils.toWei(String(sellPrice), "ether")
            // "100"
          ) //(addressNfT, tokenID, price)
          .send({ from: accounts[0] });
        console.log({ market });
        market.actualPrice = sellPrice;
        market.nftType = dataObject.nftType;
        // market.actualPrice = await nftActualPrice(
        //   singleNft?.events?.AskNew?.returnValues?.tokenId ||
        //     singleNft?.events?.Transfer?.returnValues?.tokenId ||
        //     singleNft?.events?.Trade?.returnValues?.tokenId
        // );
        console.log({ newmarket: market });
        if (market) {
          console.log(market);
          var config = {
            method: "post",
            url: `${BASE_URL}/api/v1/user/sell/create?nftId=${singleNft._id}&id=${user._id}`,
            // url: `http://localhost:5001/api/v1/user/sell/create?nftId=${singleNft._id}&id=${user._id}`,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            data: market,
          };
          axios(config)
            .then(function (response) {
              dispatch(sellNftLoader(false));
              alert.success(alertText);
              console.log(JSON.stringify(response.data));
              dispatch(getSingleNft(singleNft._id));
              hide();
              if (navigate) {
                navigate(`/authors-02/auther?id=${user?._id}`);
              }
            })
            .catch(function (error) {
              dispatch(sellNftLoader(false));
              alert.error("Request fail, Please try again!");
              console.log(error);
            });
        }
      } else {
        dispatch(sellNftLoader(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(sellNftLoader(false));
      hide();
    }
  };
};

const getCurrentTime = () => {
  let date = new Date();
  let now = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(now);
  return now;
};
// Bid NFT",
export const bidNft = (
  user,
  singleNft,
  dataObject,
  sellPrice,
  navigate,
  alert,
  alertText,
  hide
) => {
  // singleNft.events.Transfer.returnValues.tokenId
  return async (dispatch) => {
    console.log("Bid function call");
    console.log(singleNft);
    // console.log({
    //   user,
    //   singleNft,
    //   dataObject,
    //   sellPrice,
    //   navigate,
    //   alert,
    //   alertText,
    //   hide,
    // });
    // console.log(getCurrentTime());
    // return;
    dispatch(bidNftLoader(true));
    const web3 = new Web3(await web3WithProvider());
    // const nft = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
    var nft = new web3.eth.Contract(NEW_CONTRACT_ABI, NEW_CONTRACT_ADDRESS);
    try {
      const accounts = await web3.eth.requestAccounts();
      const tvl = await nft.methods
        .setApprovalForAll(
          NEW_CONTRACT_ADDRESS,
          // singleNft?.events?.AskNew?.returnValues?.tokenId ||
          //   singleNft?.events?.Transfer?.returnValues?.tokenId ||
          //   singleNft?.events?.Trade?.returnValues?.tokenId
          true
        )
        .send({ from: accounts[0] });
      console.log({ tvl });

      if (tvl) {
        // const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
        // const MP = new web3.eth.Contract(
        //   NEW_CONTRACT_ABI,
        //   NEW_CONTRACT_ADDRESS
        // );
        // console.log({ MP });
        // console.log(MP.methods);
        // console.log(await MP.methods.owner().call());
        // var newPrice = await web3.utils.toWei(String(sellPrice), "ether");
        // console.log({newPrice});
        // var market = await MP.methods
        //   .createAskOrder(
        //     NFT_ADDRESS,
        //     singleNft?.events?.AskNew?.returnValues?.tokenId ||
        //       singleNft?.events?.Transfer?.returnValues?.tokenId ||
        //       singleNft?.events?.Trade?.returnValues?.tokenId,
        //     // String(Math.round(sellPrice)) // "100"
        //     String(sellPrice) // "100"
        //   ) //(addressNfT, tokenID, price)
        console.log(singleNft);
        console.log(
          singleNft?.events?.AskNew?.returnValues?.tokenId ||
            singleNft?.events?.Transfer?.returnValues?.tokenId ||
            singleNft?.events?.Trade?.returnValues?.tokenId ||
            singleNft?.events?.Transfer[0]?.returnValues?.tokenId
        );
        const date = (arg) => {
          const getdate = new Date(arg);
          return getdate.getTime();
        };
        var market = await nft.methods
          .ListInOpenForBids(
            NEW_CONTRACT_ADDRESS,
            singleNft?.events?._listOnSale?.returnValues?.tokenId ||
              singleNft?.events?.Transfer?.returnValues?.tokenId ||
              singleNft?.events?.Trade?.returnValues?.tokenId ||
              singleNft?.events?.Transfer[0]?.returnValues?.tokenId, // String(Math.round(sellPrice)) // "100"
            Web3.utils.toWei(String(dataObject.price), "ether"),
            Web3.utils.toWei(String(dataObject.minimumBid), "ether"),
            date(dataObject.startDate),
            date(dataObject.endDate),
            // Web3.utils.toWei(String(
            dataObject.bidGap
            // ), "ether")
            // "100"
          ) //(addressNfT, tokenID, price)
          .send({ from: accounts[0] });
        console.log({ market });
        // market.price = dataObject.price;
        market.actualPrice = dataObject.price;
        market.minimumBid = dataObject.minimumBid;
        market.startDate = dataObject.startDate;
        market.endDate = dataObject.endDate;
        market.bidGap = dataObject.bidGap;
        // market.actualPrice = await nftActualPrice(
        //   singleNft?.events?.AskNew?.returnValues?.tokenId ||
        //     singleNft?.events?.Transfer?.returnValues?.tokenId ||
        //     singleNft?.events?.Trade?.returnValues?.tokenId
        // );
        console.log({ newmarket: market });
        if (market) {
          console.log(market);
          var config = {
            method: "post",
            url: `${BASE_URL}/api/v1/user/sell/create?nftId=${singleNft._id}&id=${user._id}&nftType=${dataObject.nftType}`,
            // url: `http://localhost:5001/api/v1/user/sell/create?nftId=${singleNft._id}&id=${user._id}`,
            headers: {},
            data: market,
          };
          axios(config)
            .then(function (response) {
              dispatch(bidNftLoader(false));
              alert.success(alertText);
              console.log(JSON.stringify(response.data));
              dispatch(getSingleNft(singleNft._id));
              hide();
              if (navigate) {
                navigate(`/authors-02/auther?id=${user?._id}`);
              }
            })
            .catch(function (error) {
              dispatch(bidNftLoader(false));
              alert.error("Request fail, Please try again!");
              console.log(error);
            });
        }
      } else {
        dispatch(bidNftLoader(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(bidNftLoader(false));
      hide();
    }
  };
};
// Auciton NFT",
export const auctionNft = (
  user,
  singleNft,
  dataObject,
  sellPrice,
  navigate,
  alert,
  alertText,
  hide
) => {
  // singleNft.events.Transfer.returnValues.tokenId
  return async (dispatch) => {
    console.log("Auction function call");
    console.log(singleNft);
    // console.log({
    //   user,
    //   singleNft,
    //   dataObject,
    //   sellPrice,
    //   navigate,
    //   alert,
    //   alertText,
    //   hide,
    // });
    // console.log(getCurrentTime());
    // return;
    dispatch(auctionNftLoader(true));
    const web3 = new Web3(await web3WithProvider());
    // const nft = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
    var nft = new web3.eth.Contract(NEW_CONTRACT_ABI, NEW_CONTRACT_ADDRESS);
    try {
      const accounts = await web3.eth.requestAccounts();
      const tvl = await nft.methods
        .setApprovalForAll(
          NEW_CONTRACT_ADDRESS,
          // singleNft?.events?.AskNew?.returnValues?.tokenId ||
          //   singleNft?.events?.Transfer?.returnValues?.tokenId ||
          //   singleNft?.events?.Trade?.returnValues?.tokenId
          true
        )
        .send({ from: accounts[0] });
      console.log({ tvl });

      if (tvl) {
        // const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
        // const MP = new web3.eth.Contract(
        //   NEW_CONTRACT_ABI,
        //   NEW_CONTRACT_ADDRESS
        // );
        // console.log({ MP });
        // console.log(MP.methods);
        // console.log(await MP.methods.owner().call());
        // var newPrice = await web3.utils.toWei(String(sellPrice), "ether");
        // console.log({newPrice});
        // var market = await MP.methods
        //   .createAskOrder(
        //     NFT_ADDRESS,
        //     singleNft?.events?.AskNew?.returnValues?.tokenId ||
        //       singleNft?.events?.Transfer?.returnValues?.tokenId ||
        //       singleNft?.events?.Trade?.returnValues?.tokenId,
        //     // String(Math.round(sellPrice)) // "100"
        //     String(sellPrice) // "100"
        //   ) //(addressNfT, tokenID, price)
        console.log(singleNft);
        console.log(
          singleNft?.events?.AskNew?.returnValues?.tokenId ||
            singleNft?.events?.Transfer?.returnValues?.tokenId ||
            singleNft?.events?.Trade?.returnValues?.tokenId ||
            singleNft?.events?.Transfer[0]?.returnValues?.tokenId
        );
        const date = (arg) => {
          const getdate = new Date(arg);
          return getdate.getTime();
        };
        try {
          var market = await nft.methods
            .ListOnAuction(
              NEW_CONTRACT_ADDRESS,
              singleNft?.events?._listOnSale?.returnValues?.tokenId ||
                singleNft?.events?.Transfer?.returnValues?.tokenId ||
                singleNft?.events?.Trade?.returnValues?.tokenId ||
                singleNft?.events?.Transfer[0]?.returnValues?.tokenId, // String(Math.round(sellPrice)) // "100"
              // Web3.utils.toWei(String(dataObject.price), "ether"),
              Web3.utils.toWei(String(dataObject.minimumBid), "ether"),
              date(dataObject.startDate),
              date(dataObject.endDate),
              // Web3.utils.toWei(String(
              dataObject.bidGap
              // ), "ether")
              // "100"
            ) //(addressNfT, tokenID, price)
            .send({ from: accounts[0] });
          console.log({ market });
          // market.price = dataObject.price;
          // market.actualPrice = dataObject.price;
          market.minimumBid = dataObject.minimumBid;
          market.startDate = dataObject.startDate;
          market.endDate = dataObject.endDate;
          market.bidGap = dataObject.bidGap;
          // market.actualPrice = await nftActualPrice(
          //   singleNft?.events?.AskNew?.returnValues?.tokenId ||
          //     singleNft?.events?.Transfer?.returnValues?.tokenId ||
          //     singleNft?.events?.Trade?.returnValues?.tokenId
          // );
          console.log({ newmarket: market });
          if (market) {
            console.log(market);
            var config = {
              method: "post",
              url: `${BASE_URL}/api/v1/user/sell/create?nftId=${singleNft._id}&id=${user._id}&nftType=${dataObject.nftType}`,
              // url: `http://localhost:5001/api/v1/user/sell/create?nftId=${singleNft._id}&id=${user._id}`,
              headers: {},
              data: market,
            };
            axios(config)
              .then(function (response) {
                dispatch(auctionNftLoader(false));
                alert.success(alertText);
                console.log(JSON.stringify(response.data));
                dispatch(getSingleNft(singleNft._id));
                hide();
                if (navigate) {
                  navigate(`/authors-02/auther?id=${user?._id}`);
                }
              })
              .catch(function (error) {
                dispatch(auctionNftLoader(false));
                alert.error("Request fail, Please try again!");
                console.log(error);
              });
          }
        } catch (error) {
          alert.error(error.message);
          dispatch(auctionNftLoader(false));
        }
      } else {
        dispatch(auctionNftLoader(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(auctionNftLoader(false));
      hide();
    }
  };
};

// Get User NFTs on Sell",
export const getUserNftsOnSell = (nftId) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/sell/get-user-nfts-on-sell/${nftId}`,
      headers: {},
    };
    console.log("Get User Nfts On Sell");
    axios(config)
      .then(async function (response) {
        // console.log(response.data.sells);
        let userNftsOnSell = response.data.sells;
        // for (let i = 0; i < userNftsOnSell?.length; i++) {
        //   userNftsOnSell[i].actualPrice = await nftActualPrice(
        //     userNftsOnSell[i]?.events?.AskNew?.returnValues?.tokenId ||
        //       userNftsOnSell[i]?.events?.Transfer?.returnValues?.tokenId ||
        //       userNftsOnSell[i]?.events?.Trade?.returnValues?.tokenId
        //   );
        // }
        dispatch(setUserSellNfts(userNftsOnSell));
      })
      .catch(function (error) {
        alert.error("Request fail, Please try again!");

        // console.log("Get User Nfts On Sell error", error);
      });
  };
};

//Set User Created NFT's
export const GET_USER_NFTS_ON_SELL = "GET_USER_NFTS_ON_SELL";
export const setUserSellNfts = (userNftsOnSell) => ({
  type: GET_USER_NFTS_ON_SELL,
  payload: { userNftsOnSell },
});

//BuyNFT Loader
export const BUT_NFT_LOADER = "BUT_NFT_LOADER";
export const setBuyNftLoader = (payload) => ({
  type: BUT_NFT_LOADER,
  payload: payload,
});

// Buy NFT",
export const buyNFT = (nft, navigate, alert, alertText, onHide) => {
  return async (dispatch) => {
    dispatch(setBuyNftLoader(true));
    let token = localStorage.getItem("userToken");
    let price = nft?.events?.AskNew?.returnValues?.askPrice;
    // console.log(
    //   nft?.events?.AskNew?.returnValues?.askPrice
    // )

    console.log("Buy NFT function call");
    let user = JSON.parse(localStorage.getItem("user"));
    try {
      if (user) {
        // var web3 = false;
        // const waletType = localStorage.getItem("waletType");
        // if (waletType === "metaMask") {
        // }
        // if (waletType === "walletConnect") {
        //   //  Create WalletConnect Provider
        //   const provider = new WalletConnectProvider({
        //     rpc: {
        //       1: "https://rpc.testnet.fantom.network/",
        //       // 3: "https://cointool.app/rpcServer/ftm",
        //       // 3: "https://ropsten.mycustomnode.com",
        //       // 100: "https://dai.poa.network",
        //       // ...
        //     },
        //   });
        //   //  Enable session (triggers QR Code modal)
        //   await provider.enable();
        //   console.log({ provider: provider });
        //   web3 = new Web3(provider);
        // }
        // if (waletType === "coinBaseWallet") {
        const web3 = new Web3(await web3WithProvider());
        // var newPrice = await web3.utils.toWei(String(price), "ether");

        console.log(web3);
        // }
        // Instantiate smart contract using ABI and address.
        console.log("price", nft);
        // const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
        const MP = new web3.eth.Contract(
          NEW_CONTRACT_ABI,
          NEW_CONTRACT_ADDRESS
        );
        // console.log("MP", MP.methods);
        // console.log("nft", nft);
        // console.log(nft, navigate);
        // const market = await MP.methods
        //   .buyTokenUsingWFTM(
        //     NFT_ADDRESS,
        //     nft?.events?.AskNew?.returnValues?.tokenId ||
        //       nft?.events?.Transfer?.returnValues?.tokenId ||
        //       nft?.events?.Trade?.returnValues?.tokenId,
        //     "1"
        //   )
        //   .send({
        //     from: user?.username,
        //     value: String("1"),
        //     // String(Math.round(nftPrice)),
        //     // value: "153",
        //     //  String(
        //     //   Number(nft?.events?.AskNew?.returnValues?.askPrice) + Number(100)
        //     // ),
        //     // value:"200"
        //   });
        const tvl = await MP.methods
          .setApprovalForAll(
            NEW_CONTRACT_ADDRESS,
            // singleNft?.events?.AskNew?.returnValues?.tokenId ||
            //   singleNft?.events?.Transfer?.returnValues?.tokenId ||
            //   singleNft?.events?.Trade?.returnValues?.tokenId
            true
          )
          .send({ from: user?.username });
        console.log({ tvl });
        if (!tvl) return false;
        const market = await MP.methods
          .BuyMarketItem(
            NEW_CONTRACT_ADDRESS,
            nft?.events?._listOnSale?.returnValues?.tokenId ||
              nft?.events?.Transfer?.returnValues?.tokenId ||
              nft?.events?.Trade?.returnValues?.tokenId ||
              nft?.events?.Transfer[0]?.returnValues?.tokenId
            // nft?.creatorObject[0]?.username,
            // (Number(nft.royality) * 10).toString()
            // ,
            // Number(
            //   nft?.events?._listOnSale?.returnValues?.tokenId
            // ).toString() ||
            //   nft?.events?.Transfer?.returnValues?.tokenId ||
            //   nft?.events?.Trade?.returnValues?.tokenId
          )
          .send({
            from: user?.username,
            value: Web3.utils.toWei(String(nft.actualPrice), "ether"),
            // String(Math.round(nftPrice)),
            // value: "153",
            //  String(
            //   Number(nft?.events?.AskNew?.returnValues?.askPrice) + Number(100)
            // ),
            // value:"200"
          });
        console.log("market buy nft", market);
        if (market) {
          var config = {
            method: "put",
            url: ` ${BASE_URL}/api/v1/user/sell/buy-nft?sellId=${nft?._id}&id=${user?._id}`,
            // url: `http://localhost:5001/api/v1/user/sell/buy-nft?sellId=${nft?._id}&id=${user?._id}`,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            data: market,
          };
          axios(config)
            .then(function (response) {
              // getUserNFTS(user._id);
              alert.success(alertText);
              dispatch(setBuyNftLoader(false));
              console.log(response.data);
              console.log("NFT Buyed Successfully");
              onHide();
              dispatch(getNFTSOnSell());
              dispatch(getSingleNft(nft._id));
              // navigate(`/authors-02/auther?id=${user?._id}`);
            })
            .catch(function (error) {
              alert.error("Request fail, Please try again!");
              dispatch(setBuyNftLoader(false));
              console.log(error);
            });
        } else {
          dispatch(setBuyNftLoader(false));
          alert.error("Request fail, Please try again!");
        }
      } else {
        dispatch(setBuyNftLoader(false));
        console.log("No user found in localStorage");
      }
    } catch (err) {
      console.log(err);
      dispatch(setBuyNftLoader(false));
      onHide();
    }
  };
};

// updateProfile Loader
export const UPDATE_PROFILE_LOADER = "UPDATE_PROFILE_LOADER";
export const updateProfileLoader = (payload) => ({
  type: UPDATE_PROFILE_LOADER,
  payload: payload,
});

// Update Profile",
export const updateProfile = (
  profileObject,
  profileImg,
  coverImg,
  alert,
  alertText,
  navigate
) => {
  return async (dispatch) => {
    dispatch(updateProfileLoader(true));
    // console.log(profileObject, profileImg, coverImg);
    let accountAddress = localStorage.getItem("accountAddress");
    let userToken = localStorage.getItem("userToken");
    const formData = new FormData();
    if (profileImg) {
      formData.append("profile_img", profileImg);
    }
    if (coverImg) {
      formData.append("cover_img", coverImg);
    }
    for (const key in profileObject) {
      formData.append(key, profileObject[key]);
    }
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      var config = {
        method: "put",
        url: ` ${BASE_URL}/api/v1/user/profile/update/${user?._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      };
      axios(config)
        .then(function (response) {
          // getUserNFTS(user._id);
          dispatch(updateProfileLoader(false));
          // console.log(response.data.user);
          localStorage.removeItem("user");
          alert.success(alertText);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch(
            getConnectWalletSuccess(
              accountAddress,
              userToken,
              response.data.user
            )
          );
          console.log(response.data.user);
          console.log("Profile udpated Successfully");
          navigate(`/authors-02/auther?id=${user?._id}`);
        })
        .catch(function (error) {
          dispatch(updateProfileLoader(false));
          alert.error("Request failed, Please try again!");
          console.log(error);
        });
    } else {
      alert.error("Request failed, Please try again!");
    }
  };
};

// GEt NFT Actual Price
export const nftActualPrice = async (tokenId) => {
  // const getCurrentProvider
  // getCurrentProvider
  if (getCurrentProvider()?.networkVersion === CHAIN_ID) {
    const web3 = new Web3(await web3WithProvider());

    const MP = new web3.eth.Contract(NEW_MP_ABI, MP_ADDRESS);
    const orders = await MP.methods
      .viewAsksByCollectionAndTokenIds(NFT_ADDRESS, [tokenId]) //(nft addre , count)
      .call();
    // console.log(orders);
    // console.log(orders.askInfo[0].price);
    return orders.askInfo[0].price;
  } else {
    return false;
  }
};

export const getSignedInUser = () => {
  return async (dispatch) => {
    console.log("userToken");
    let user = JSON.parse(localStorage.getItem("user"));
    let accountAddress = localStorage.getItem("accountAddress");
    let userToken = localStorage.getItem("userToken");
    let walletType = localStorage.getItem("walletType");
    if (user) {
      console.log(user, accountAddress, userToken, "userToken");
      dispatch(getConnectWalletSuccess(accountAddress, userToken, user));
      dispatch(getSignedInUserData(user));
      dispatch(setWalletType(walletType));
    }
  };
};

//Set User Created NFT's

export const GET_SIGNED_IN_USER = "GET_SIGNED_IN_USER";
export const getSignedInUserData = (payload) => ({
  type: GET_SIGNED_IN_USER,
  payload: payload,
});
// Set Wallet Type
export const SET_WALLET_TYPE = "SET_WALLET_TYPE";
export const setWalletType = (payload) => ({
  type: SET_WALLET_TYPE,
  payload: payload,
});

// signUp Loader
export const SIGN_UP_LOADER = "SIGN_UP_LOADER";
export const signUpLoader = (payload) => ({
  type: SIGN_UP_LOADER,
  payload: payload,
});

export const signUp = (object, navigate, alert) => {
  return async (dispatch) => {
    dispatch(signUpLoader(true));
    var data = JSON.stringify(object);

    var config = {
      method: "post",
      url: `${BASE_URL}/api/v1/auth/register/email`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // dispatch(signUpLoader(response.data.user))
        dispatch(signUpLoader(false));
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(
          getConnectWalletSuccess(
            false,
            response.data.token,
            response.data.user
          )
        );
        dispatch(getSignedInUserData(response.data.user));
        console.log(response.data);
        navigate("/edit-profile");
      })
      .catch(function (error) {
        dispatch(signUpLoader(false));
        alert.success(error.response.data.message);
        console.log(error.response);
      });
  };
};

// signUp Loader
export const SIGN_IN_LOADER = "SIGN_IN_LOADER";
export const signInLoader = (payload) => ({
  type: SIGN_IN_LOADER,
  payload: payload,
});

export const signIn = (object, navigate, alert) => {
  return async (dispatch) => {
    dispatch(signInLoader(true));
    var data = JSON.stringify(object);

    var config = {
      method: "post",
      url: `${BASE_URL}/api/v1/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(signInLoader(false));
        // dispatch(signInLoader(response.data.user))
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(
          getConnectWalletSuccess(
            false,
            response.data.token,
            response.data.user
          )
        );
        dispatch(getSignedInUserData(response.data.user));
        alert.success("Login Success");
        console.log(response.data);
        navigate(`/authors-02/auther?id=${response.data.user?._id}`);
      })
      .catch(function (error) {
        dispatch(signInLoader(false));
        alert.error(error.response.data.message);
        console.log(error.response);
      });
  };
};

export const getConnectedAdress = (accountAddress, navigate) => {
  return async (dispatch) => {
    console.log("getConnectedAdress");
    let userToken = localStorage.getItem("userToken");
    let user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("accountAddress", accountAddress);
    if (navigate) {
      navigate(`/authors-02/auther?id=${user?._id}`);
    }
    dispatch(getConnectWalletSuccess(accountAddress, userToken, user));
  };
};

// signUp Loader
export const PLACE_BID_LOADER = "PLACE_BID_LOADER";
export const placeBidLoader = (payload) => ({
  type: PLACE_BID_LOADER,
  payload: payload,
});

export const placeBid = (object, alert, hide, clearState) => {
  return async (dispatch) => {
    dispatch(placeBidLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "post",
      url: `${BASE_URL}/api/v1/user/bid`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(placeBidLoader(false));
        dispatch(bidOffers(object.nft_id));
        hide();
        clearState();
      })
      .catch(function (error) {
        dispatch(placeBidLoader(false));
        alert.error(error.response.data.message);
      });
  };
};

export const updatePlaceBid = (object, alert, hide, clearState, id) => {
  return async (dispatch) => {
    dispatch(placeBidLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "put",
      url: `${BASE_URL}/api/v1/user/bid`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(placeBidLoader(false));
        dispatch(bidOffers(id));
        hide();
        clearState();
      })
      .catch(function (error) {
        dispatch(placeBidLoader(false));
        alert.error(error.response.data.message);
      });
  };
};

// bidOffers Loader
export const GET_BID_OFFERS_LOADER = "GET_BID_OFFERS_LOADER";
export const bidOffersLoaders = (payload) => ({
  type: GET_BID_OFFERS_LOADER,
  payload: payload,
});

export const bidOffers = (id) => {
  return async (dispatch) => {
    dispatch(bidOffersLoaders(true));
    let token = localStorage.getItem("userToken");

    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/bid/${id}`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(bidOffersLoaders(false));
        console.log(response.data);
        dispatch(getBidOffers(response.data.bids));
      })
      .catch(function (error) {
        dispatch(bidOffersLoaders(false));
        alert.error(error.response.data.message);
      });
  };
};

export const GET_BID_OFFERS = "GET_BID_OFFERS";
export const getBidOffers = (payload) => ({
  type: GET_BID_OFFERS,
  payload: payload,
});

// bidOffers Loader
export const CANCEL_BID_OFFER_LOADER = "CANCEL_BID_OFFER_LOADER";
export const cancelBidOfferLoader = (payload) => ({
  type: CANCEL_BID_OFFER_LOADER,
  payload: payload,
});

export const cancelBidOffers = (object, alert, id, setLoaderCancel) => {
  return async (dispatch) => {
    dispatch(cancelBidOfferLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "delete",
      url: `${BASE_URL}/api/v1/user/bid`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(cancelBidOfferLoader(false));
        alert.success("Bid Cancelled Succesfully");
        dispatch(bidOffers(id));
        setLoaderCancel("");
      })
      .catch(function (error) {
        dispatch(cancelBidOfferLoader(false));
        alert.error("error");
        setLoaderCancel("");
      });
  };
};

// bidOffers Loader
export const ACCEPT_BID_LOADER = "ACCEPT_BID_LOADER";
export const acceptBidLoader = (payload) => ({
  type: ACCEPT_BID_LOADER,
  payload: payload,
});

export const acceptBidOffers = (object, alert, id) => {
  return async (dispatch) => {
    dispatch(acceptBidLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "post",
      url: `${BASE_URL}/api/v1/user/bid/accept`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(acceptBidLoader(false));
        alert.success("Bid Accepted Succesfully");
        dispatch(bidOffers(id));
      })
      .catch(function (error) {
        dispatch(acceptBidLoader(false));
        alert.error("error");
      });
  };
};

// signUp Loader
export const PLACE_AUCTION_LOADER = "PLACE_AUCTION_LOADER";
export const placeAuctionLoader = (payload) => ({
  type: PLACE_AUCTION_LOADER,
  payload: payload,
});

export const placeAuction = (object, alert, hide, clearState) => {
  return async (dispatch) => {
    dispatch(placeAuctionLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "post",
      url: `${BASE_URL}/api/v1/user/auction`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(placeAuctionLoader(false));
        dispatch(auctionOffers(object.nft_id));
        hide();
        clearState();
      })
      .catch(function (error) {
        dispatch(placeAuctionLoader(false));
        alert.error(error.response.data.message);
      });
  };
};

export const updatePlaceAuction = (object, alert, hide, clearState, id) => {
  return async (dispatch) => {
    dispatch(placeAuctionLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "put",
      url: `${BASE_URL}/api/v1/user/auction`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(placeAuctionLoader(false));
        dispatch(auctionOffers(id));
        hide();
        clearState();
      })
      .catch(function (error) {
        dispatch(placeAuctionLoader(false));
        alert.error(error.response.data.message);
      });
  };
};

// auctionOffers Loader
export const GET_AUCTION_OFFERS_LOADER = "GET_AUCTION_OFFERS_LOADER";
export const auctionOffersLoaders = (payload) => ({
  type: GET_AUCTION_OFFERS_LOADER,
  payload: payload,
});

export const auctionOffers = (id) => {
  return async (dispatch) => {
    dispatch(auctionOffersLoaders(true));
    let token = localStorage.getItem("userToken");

    var config = {
      method: "get",
      url: `${BASE_URL}/api/v1/user/auction/${id}`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(auctionOffersLoaders(false));
        console.log(response.data);
        dispatch(auctionOffersData(response.data.auctions));
      })
      .catch(function (error) {
        dispatch(auctionOffersLoaders(false));
        alert.error(error.response.data.message);
      });
  };
};

// auctionOffers Loader
export const GET_AUCTION_OFFERS_DATA = "GET_AUCTION_OFFERS_DATA";
export const auctionOffersData = (payload) => ({
  type: GET_AUCTION_OFFERS_DATA,
  payload: payload,
});

// bidOffers Loader
export const ACCEPT_AUCTION_LOADER = "ACCEPT_AUCTION_LOADER";
export const accepAuctionLoader = (payload) => ({
  type: ACCEPT_AUCTION_LOADER,
  payload: payload,
});

export const acceptAuctionOffers = (object, alert, id) => {
  return async (dispatch) => {
    dispatch(accepAuctionLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "post",
      url: `${BASE_URL}/api/v1/user/bid/accept`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(accepAuctionLoader(false));
        alert.success("Bid Accepted Succesfully");
        dispatch(bidOffers(id));
      })
      .catch(function (error) {
        dispatch(accepAuctionLoader(false));
        alert.error("error");
      });
  };
};

// bidOffers Loader
export const CANCEL_AUCTIONS_OFFER_LOADER = "CANCEL_AUCTIONS_OFFER_LOADER";
export const cancelAuctionsOfferLoader = (payload) => ({
  type: CANCEL_AUCTIONS_OFFER_LOADER,
  payload: payload,
});

export const cancelAuctionOffers = (object, alert, id, setLoaderCancel) => {
  return async (dispatch) => {
    dispatch(cancelAuctionsOfferLoader(true));
    var data = JSON.stringify(object);
    let token = localStorage.getItem("userToken");

    var config = {
      method: "delete",
      url: `${BASE_URL}/api/v1/user/auction`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(cancelAuctionsOfferLoader(false));
        alert.success("Bid Cancelled Succesfully");
        dispatch(bidOffers(id));
        setLoaderCancel("");
      })
      .catch(function (error) {
        dispatch(cancelAuctionsOfferLoader(false));
        alert.error("error");
        setLoaderCancel("");
      });
  };
};
