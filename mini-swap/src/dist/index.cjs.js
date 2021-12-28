import { __assign, __rest, __read, __spreadArray, __extends, __awaiter, __generator, __makeTemplateObject } from 'tslib';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useRef, useState, useEffect, useCallback, useMemo, isValidElement, cloneElement, Children, forwardRef, createContext, useContext, memo, Fragment as Fragment$1 } from 'react';
import { ETHEREUM_CHAIN, chainIdProxy, ChainId as ChainId$1, WETHER, MBT, USDT, USDC, WETH, WBTC, DSG, DAI, VAI, JSBI, Percent, getValueWithChainId, contractAddress, DSG_TOKENS_TOP100, Token as Token$1, BASE_BSC_SCAN_URLS, ETHER, currencyEquals, Pair, TokenAmount, Trade as Trade$1, CurrencyAmount, TradeType, SWAP_TOKEN, Router, Price as Price$1, POLY_BASE_URL, Rounding, setChainId } from 'dsgswap-sdk';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import sample from 'lodash/sample';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { createAction, nanoid, createAsyncThunk, createReducer, createSlice, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { getVersionUpgrade, VersionUpgrade } from '@uniswap/token-lists';
import { parseBytes32String } from '@ethersproject/strings';
import { arrayify, namehash } from 'ethers/lib/utils';
import { Contract } from '@ethersproject/contracts';
import { getAddress as getAddress$1 } from '@ethersproject/address';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { BigNumber } from '@ethersproject/bignumber';
import { Interface } from '@ethersproject/abi';
import Ajv from 'ajv';
import CID from 'cids';
import { getCodec, rmPrefix } from 'multicodec';
import { decode, toB58String } from 'multihashes';
import styled, { keyframes, css, ThemeProvider, useTheme as useTheme$1, createGlobalStyle, ThemeContext } from 'styled-components';
import { space, typography, layout, variant as variant$1, background, border, position, flexbox, grid, color } from 'styled-system';
import get from 'lodash/get';
import 'lodash/uniqueId';
import { kebabCase } from 'lodash';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import 'lodash/noop';
import 'lodash/debounce';
import { Link as Link$1 } from 'react-router-dom';
import 'react-transition-group';
import BigNumber$1 from 'bignumber.js';
import CountUp from 'react-countup';
import flatMap from 'lodash/flatMap';
import { FixedSizeList } from 'react-window';
import { parseUnits } from '@ethersproject/units';
import isEqual from 'lodash/isEqual';
import 'qs';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';
import merge from 'lodash/merge';
import { save, load } from 'redux-localstorage-simple';

var getNodeUrl = function () {
	// return process.env.REACT_APP_NODE_3
	return sample(ETHEREUM_CHAIN[chainIdProxy.chainId].rpcUrls);
	// return 'https://polygon-mumbai.infura.io/v3/330472ed44dd4692a16dfcb4cc41f122'
};

var RPC_URL = getNodeUrl();
var simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
var useActiveWeb3React = function () {
	var _a = useWeb3React(), library = _a.library, chainId = _a.chainId, web3React = __rest(_a, ["library", "chainId"]);
	var refEth = useRef(library);
	var _b = __read(useState(library || simpleRpcProvider), 2), provider = _b[0], setprovider = _b[1];
	useEffect(function () {
		if (library !== refEth.current) {
			setprovider(library || simpleRpcProvider);
			refEth.current = library;
		}
	}, [library]);
	return __assign({ library: provider, chainId: chainId !== null && chainId !== void 0 ? chainId : chainIdProxy.chainId }, web3React);
};

var _a$c, _b$4, _c, _d, _e, _f;
// used to construct intermediary pairs for trading
var BASES_TO_CHECK_TRADES_AGAINST = (_a$c = {},
	_a$c[ChainId$1.MATIC_TESTNET] = [
		WETHER[ChainId$1.MATIC_TESTNET],
		MBT[ChainId$1.MATIC_TESTNET],
		USDT[ChainId$1.MATIC_TESTNET],
		USDC[ChainId$1.MATIC_TESTNET],
		WETH[ChainId$1.MATIC_TESTNET],
		WBTC[ChainId$1.MATIC_TESTNET],
	],
	_a$c[ChainId$1.MATIC_MAINNET] = [
		WETHER[ChainId$1.MATIC_MAINNET],
		MBT[ChainId$1.MATIC_MAINNET],
		USDT[ChainId$1.MATIC_MAINNET],
		WETH[ChainId$1.MATIC_MAINNET],
		WBTC[ChainId$1.MATIC_MAINNET],
		// ETH,
		// USDC[ChainId.MATIC_MAINNET],
		// DAI,
	],
	_a$c[ChainId$1.MAINNET] = [
		WETHER[ChainId$1.MAINNET],
		MBT[ChainId$1.MAINNET],
		// BUSD[ChainId.MAINNET],
		USDT[ChainId$1.MAINNET],
		// BTCB,
		// UST,
		// ETH,
		USDC[ChainId$1.MAINNET],
	],
	_a$c);
/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
var ADDITIONAL_BASES = (_b$4 = {},
	_b$4[ChainId$1.MAINNET] = {},
	_b$4[ChainId$1.MATIC_MAINNET] = {},
	_b$4[ChainId$1.MATIC_TESTNET] = {},
	_b$4);
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETHER[ChainId.MAINNET]]
 */
var CUSTOM_BASES = (_c = {},
	_c[ChainId$1.MAINNET] = {},
	_c[ChainId$1.MATIC_MAINNET] = {},
	_c[ChainId$1.MATIC_TESTNET] = {},
	_c);
// used for display in the default list when adding liquidity
var SUGGESTED_BASES = (_d = {},
	_d[ChainId$1.MATIC_MAINNET] = [
		MBT[ChainId$1.MATIC_MAINNET], WETH[ChainId$1.MATIC_MAINNET], USDC[ChainId$1.MATIC_MAINNET], USDT[ChainId$1.MATIC_MAINNET],
		DSG[ChainId$1.MATIC_MAINNET], DAI[ChainId$1.MATIC_MAINNET], WBTC[ChainId$1.MATIC_MAINNET]
	],
	_d[ChainId$1.MATIC_TESTNET] = [
		MBT[ChainId$1.MATIC_TESTNET], WETH[ChainId$1.MATIC_TESTNET], USDC[ChainId$1.MATIC_TESTNET], USDT[ChainId$1.MATIC_TESTNET],
		DSG[ChainId$1.MATIC_TESTNET], DAI[ChainId$1.MATIC_TESTNET]
	],
	_d[ChainId$1.MAINNET] = [USDT[ChainId$1.MAINNET], VAI[ChainId$1.MAINNET]],
	_d);
// used to construct the list of all pairs we consider by default in the frontend
(_e = {},
	_e[ChainId$1.MATIC_MAINNET] = [
		WETHER[ChainId$1.MATIC_MAINNET], USDT[ChainId$1.MATIC_MAINNET]
	],
	_e[ChainId$1.MATIC_TESTNET] = [
		WETHER[ChainId$1.MATIC_TESTNET], USDT[ChainId$1.MATIC_TESTNET]
	],
	_e[ChainId$1.MAINNET] = [WETHER[ChainId$1.MAINNET], USDT[ChainId$1.MAINNET]],
	_e);
(_f = {},
	_f[ChainId$1.MAINNET] = [
		[MBT[ChainId$1.MAINNET], WETHER[ChainId$1.MAINNET]],
		[USDT[ChainId$1.MAINNET], USDT[ChainId$1.MAINNET]],
		[VAI[ChainId$1.MAINNET], USDT[ChainId$1.MAINNET]],
	],
	_f[ChainId$1.MATIC_TESTNET] = [
		[MBT[ChainId$1.MATIC_TESTNET], WETHER[ChainId$1.MATIC_TESTNET]],
		[MBT[ChainId$1.MATIC_TESTNET], USDC[ChainId$1.MATIC_TESTNET]],
		[WETHER[ChainId$1.MATIC_TESTNET], USDC[ChainId$1.MATIC_TESTNET]],
		[WETH[ChainId$1.MATIC_TESTNET], USDC[ChainId$1.MATIC_TESTNET]],
	],
	_f[ChainId$1.MATIC_MAINNET] = [
		[MBT[ChainId$1.MATIC_MAINNET], WETH[ChainId$1.MATIC_MAINNET]],
		[MBT[ChainId$1.MATIC_MAINNET], USDC[ChainId$1.MATIC_MAINNET]],
		[WETHER[ChainId$1.MATIC_MAINNET], USDC[ChainId$1.MATIC_MAINNET]],
		[WETH[ChainId$1.MATIC_MAINNET], USDC[ChainId$1.MATIC_MAINNET]],
	],
	_f);
// default allowed slippage, in bips
var INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
var DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
JSBI.BigInt(0);
// one basis point
var ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
var BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
var ALLOWED_PRICE_IMPACT_LOW = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
var ALLOWED_PRICE_IMPACT_MEDIUM = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
var ALLOWED_PRICE_IMPACT_HIGH = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
var PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
var BLOCKED_PRICE_IMPACT_NON_EXPERT = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%
// used to ensure the user doesn't send so much BNB so they end up with <.01
var MIN_BNB = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 BNB
var BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000));
var ZERO_PERCENT = new Percent('0');
var ONE_HUNDRED_PERCENT$1 = new Percent('1');
// SDN OFAC addresses(美国海外资产控制办公室地址)
var BLOCKED_ADDRESSES = [
	'0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
	'0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
	'0x901bb9583b24D97e995513C6778dc6888AB6870e',
	'0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
	'0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
];

// modified from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
	var _a = __read(useState(value), 2), debouncedValue = _a[0], setDebouncedValue = _a[1];
	useEffect(function () {
		// Update debounced value after delay
		var handler = setTimeout(function () {
			setDebouncedValue(value);
		}, delay);
		// Cancel the timeout if value changes (also on delay change or unmount)
		// This is how we prevent debounced value from updating if value is changed ...
		// .. within the delay period. Timeout gets cleared and restarted.
		return function () {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}

var VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document;
function isWindowVisible() {
	return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden';
}
/**
 * Returns whether the window is currently visible to the user.
 */
function useIsWindowVisible() {
	var _a = __read(useState(isWindowVisible()), 2), focused = _a[0], setFocused = _a[1];
	var listener = useCallback(function () {
		setFocused(isWindowVisible());
	}, [setFocused]);
	useEffect(function () {
		if (!VISIBILITY_STATE_SUPPORTED)
			return undefined;
		document.addEventListener('visibilitychange', listener);
		return function () {
			document.removeEventListener('visibilitychange', listener);
		};
	}, [listener]);
	return focused;
}

var updateBlockNumber = createAction('application/updateBlockNumber');

function Updater$3() {
	var _a = useActiveWeb3React(), library = _a.library, chainId = _a.chainId;
	var dispatch = useDispatch();
	var windowVisible = useIsWindowVisible();
	var _b = __read(useState({
		chainId: chainId,
		blockNumber: null,
	}), 2), state = _b[0], setState = _b[1];
	var blockNumberCallback = useCallback(function (blockNumber) {
		setState(function (prev) {
			if (chainId === prev.chainId) {
				if (typeof prev.blockNumber !== 'number')
					return { chainId: chainId, blockNumber: blockNumber };
				return { chainId: chainId, blockNumber: Math.max(blockNumber, prev.blockNumber) };
			}
			return prev;
		});
	}, [chainId, setState]);
	// attach/detach listeners
	useEffect(function () {
		if (!library || !chainId || !windowVisible)
			return undefined;
		setState({ chainId: chainId, blockNumber: null });
		library
			.getBlockNumber()
			.then(blockNumberCallback)
			.catch(function (error) { return console.error("Failed to get block number for chainId: " + chainId, error); });
		library.on('block', blockNumberCallback);
		return function () {
			library.removeListener('block', blockNumberCallback);
		};
	}, [dispatch, chainId, library, blockNumberCallback, windowVisible]);
	var debouncedState = useDebounce(state, 100);
	useEffect(function () {
		if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible)
			return;
		dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }));
	}, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);
	return null;
}

var getAddress = function (address) {
	return getValueWithChainId(address);
};
var getMulticallAddress = function () {
	return getAddress(contractAddress.multiCall);
};

var UNSUPPORTED_LIST_URLS = [];
// lower index == higher priority for token import
__spreadArray([
	// PANCAKE_TOP100,
	// PANCAKE_EXTENDED,
	getAddress(DSG_TOKENS_TOP100)
], __read(UNSUPPORTED_LIST_URLS));
var getTokenDefaultList = function () {
	return __spreadArray([
		// PANCAKE_TOP100,
		// PANCAKE_EXTENDED,
		getAddress(DSG_TOKENS_TOP100)
	], __read(UNSUPPORTED_LIST_URLS));
};
// default lists to be 'active' aka searched across
[getAddress(DSG_TOKENS_TOP100)];
var getTokenDefaultActiveList = function () { return [getAddress(DSG_TOKENS_TOP100)]; };

var name$1 = "Dsg Default List";
var timestamp$1 = "2021-11-12T06:00:00Z";
var version$1 = {
	major: 1,
	minor: 0,
	patch: 1
};
var tags$2 = {
};
var logoURI$1 = "/logo.png";
var keywords$1 = [
	"dinosaur eggs",
	"dsg",
	"default"
];
var tokens$1 = [
	{
		name: "DSG",
		symbol: "DSG",
		address: "0x9A78649501BbAAC285Ea4187299471B7ad4ABD35",
		chainId: 56,
		decimals: 18,
		logoURI: "https://dsgmetaverse.com/images/tokens/DSG.png"
	},
	{
		name: "Monery-hunry Dino Frament Token",
		symbol: "DSGMDF",
		address: "0xbc44f2408192c2F853d953b370D449B9fdb9b1F6",
		chainId: 56,
		decimals: 18,
		logoURI: "https://dsgmetaverse.com/images/tokens/DSGMDF.png"
	},
	{
		name: "Meat Frament Token",
		symbol: "DSGMF",
		address: "0x8ee0eebefddc5f672680e9d3d165bc1dc7591919",
		chainId: 56,
		decimals: 18,
		logoURI: "https://dsgmetaverse.com/images/tokens/DSGMF.png"
	},
	{
		name: "WBNB Token",
		symbol: "WBNB",
		address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
		chainId: 56,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png"
	},
	{
		name: "Binance Pegged BUSD",
		symbol: "BUSD",
		address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
		chainId: 56,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
	},
	{
		name: "Binance Pegged ETH",
		symbol: "ETH",
		address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
		chainId: 56,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0x2170Ed0880ac9A755fd29B2688956BD959F933F8.png"
	},
	{
		name: "Binance Pegged Bitcoin",
		symbol: "BTCB",
		address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
		chainId: 56,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c.png"
	},
	{
		name: "Binance Pegged USDT",
		symbol: "USDT",
		address: "0x55d398326f99059fF775485246999027B3197955",
		chainId: 56,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0x55d398326f99059fF775485246999027B3197955.png"
	},
	{
		name: "Venus Token",
		symbol: "XVS",
		address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
		chainId: 56,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63.png"
	},
	{
		name: "VAI Stablecoin",
		symbol: "VAI",
		address: "0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7",
		chainId: 56,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7.png"
	},
	{
		name: "Dai Stablecoin",
		address: "0xe9C570f7775E5e7232590cD17438D99ec02cDfeB",
		symbol: "DAI",
		decimals: 18,
		chainId: 80001,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
	},
	{
		name: "Dai Stablecoin",
		address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
		symbol: "DAI",
		decimals: 18,
		chainId: 137,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
	},
	{
		name: "Tether USD",
		address: "0x363B097cc4EbA999a6555427CB1b77d943FF43c1",
		symbol: "USDT",
		decimals: 6,
		chainId: 80001,
		logoURI: "/images/tokens/USDT.png"
	},
	{
		name: "Tether USD",
		address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
		symbol: "USDT",
		decimals: 6,
		chainId: 137,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
	},
	{
		name: "Wrapped Matic",
		address: "0x9eeD3ab1c437b63C0A96ED9A7854593addc66aC5",
		symbol: "WMATIC",
		decimals: 18,
		chainId: 80001,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png"
	},
	{
		name: "Wrapped Matic",
		address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
		symbol: "WMATIC",
		decimals: 18,
		chainId: 137,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png"
	},
	{
		name: "USDC",
		symbol: "USDC",
		address: "0xCE8dca0BF7c5625A056B804A5e94F419480ba5a5",
		chainId: 80001,
		decimals: 6,
		logoURI: "https://magicianmetaverse.com/images/tokens/USDC.png"
	},
	{
		name: "USDC",
		symbol: "USDC",
		address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
		chainId: 137,
		decimals: 6,
		logoURI: "https://magicianmetaverse.com/images/tokens/USDC.png"
	},
	{
		name: "WETH",
		symbol: "WETH",
		address: "0x09AB0a23e4e10aE30988cc11103aF1255142c2B1",
		chainId: 80001,
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
	},
	{
		name: "WETH",
		symbol: "WETH",
		address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		chainId: 137,
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
	},
	{
		name: "WBTC",
		symbol: "WBTC",
		address: "0x6696143F1814E5d2A3EAFad16E2C51a25c809430",
		chainId: 80001,
		decimals: 8,
		logoURI: "https://magicianmetaverse.com/images/tokens/WBTC.png"
	},
	{
		name: "WBTC",
		symbol: "WBTC",
		address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
		chainId: 137,
		decimals: 8,
		logoURI: "https://magicianmetaverse.com/images/tokens/WBTC.png"
	},
	{
		name: "MagicBallToken",
		symbol: "MBT",
		address: "0xCb071b023a2D434cEE80ae0Fb19a46C1b5Ec38b8",
		chainId: 80001,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/MBT.png"
	},
	{
		name: "MagicBallToken",
		symbol: "MBT",
		address: "0x9e5cc3aF2c87527Fdb48eb783E84E0fD9a59918a",
		chainId: 137,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/MBT.png"
	},
	{
		name: "DSG",
		symbol: "DSG",
		address: "0x683915d350824D6f046d67949359Fc8b9F8EeB28",
		chainId: 80001,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/DSG.png"
	},
	{
		name: "DSG",
		symbol: "DSG",
		address: "0xb65Ce345e1d6786C55c847076563b24B8B34bc2A",
		chainId: 137,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/DSG.png"
	},
	{
		name: "MBT Crystal Fragment",
		symbol: "MBTCF",
		address: "0xD6d8f98BDE2AC5DfC941269ea18803D72086427d",
		chainId: 80001,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/MBTCF.png"
	},
	{
		name: "MBT Crystal Fragment",
		symbol: "MBTCF",
		address: "0x4aB731C693D54188C3bC9762f61829D06f7afdC4",
		chainId: 137,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/MBTCF.png"
	},
	{
		name: "MBT Potion Fragment",
		symbol: "MBTPF",
		address: "0x2f94dC2009494680CeC2C23bc49198434B802b18",
		chainId: 80001,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/MBTPF.png"
	},
	{
		name: "MBT Potion Fragment",
		symbol: "MBTPF",
		address: "0x437c7C0460E8b795C67872E8D0fB441ef6cc1E68",
		chainId: 137,
		decimals: 18,
		logoURI: "https://magicianmetaverse.com/images/tokens/MBTPF.png"
	}
];
var DEFAULT_TOKEN_LIST = {
	name: name$1,
	timestamp: timestamp$1,
	version: version$1,
	tags: tags$2,
	logoURI: logoURI$1,
	keywords: keywords$1,
	tokens: tokens$1
};

var name = "Dsg Unsupported List";
var timestamp = "2021-01-05T20:47:02.923Z";
var version = {
	major: 1,
	minor: 0,
	patch: 0
};
var tags$1 = {
};
var logoURI = "";
var keywords = [
	"dinosaur eggs",
	"dsg",
	"unsupported"
];
var tokens = [
];
var UNSUPPORTED_TOKEN_LIST = {
	name: name,
	timestamp: timestamp,
	version: version,
	tags: tags$1,
	logoURI: logoURI,
	keywords: keywords,
	tokens: tokens
};

var _a$b;
var ChainId;
(function (ChainId) {
	ChainId[ChainId["MAINNET"] = 56] = "MAINNET";
	ChainId[ChainId["TESTNET"] = 222] = "TESTNET";
	ChainId[ChainId["OKT"] = 65] = "OKT";
	ChainId[ChainId["MATIC_MAINNET"] = 137] = "MATIC_MAINNET";
	ChainId[ChainId["MATIC_TESTNET"] = 80001] = "MATIC_TESTNET";
})(ChainId || (ChainId = {}));
// use ordering of default list of lists to assign priority
function sortByListPriority(urlA, urlB) {
	var first = getTokenDefaultList().includes(urlA) ? getTokenDefaultList().indexOf(urlA) : Number.MAX_SAFE_INTEGER;
	var second = getTokenDefaultList().includes(urlB) ? getTokenDefaultList().indexOf(urlB) : Number.MAX_SAFE_INTEGER;
	// need reverse order to make sure mapping includes top priority last
	if (first < second)
		return 1;
	if (first > second)
		return -1;
	return 0;
}
/**
 * Token instances created from token info.
 */
var WrappedTokenInfo = /** @class */ (function (_super) {
	__extends(WrappedTokenInfo, _super);
	function WrappedTokenInfo(tokenInfo, tags) {
		var _this = _super.call(this, tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name) || this;
		_this.tokenInfo = tokenInfo;
		_this.tags = tags;
		return _this;
	}
	Object.defineProperty(WrappedTokenInfo.prototype, "logoURI", {
		get: function () {
			return this.tokenInfo.logoURI;
		},
		enumerable: false,
		configurable: true
	});
	return WrappedTokenInfo;
}(Token$1));
/**
 * An empty result, useful as a default.
 */
var EMPTY_LIST = (_a$b = {},
	_a$b[ChainId.MAINNET] = {},
	_a$b[ChainId.TESTNET] = {},
	_a$b[ChainId.OKT] = {},
	_a$b[ChainId.MATIC_MAINNET] = {},
	_a$b[ChainId.MATIC_TESTNET] = {},
	_a$b);
var listCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
function listToTokenMap(list) {
	var result = listCache === null || listCache === void 0 ? void 0 : listCache.get(list);
	if (result)
		return result;
	// const renderList = list.tokens.filter(item => item.chainId === 65)
	var map = list.tokens.reduce(function (tokenMap, tokenInfo) {
		var _a, _b;
		var _c, _d, _e;
		var tags = (_e = (_d = (_c = tokenInfo.tags) === null || _c === void 0 ? void 0 : _c.map(function (tagId) {
			var _a;
			if (!((_a = list.tags) === null || _a === void 0 ? void 0 : _a[tagId]))
				return undefined;
			return __assign(__assign({}, list.tags[tagId]), { id: tagId });
		})) === null || _d === void 0 ? void 0 : _d.filter(function (x) { return Boolean(x); })) !== null && _e !== void 0 ? _e : [];
		var token = new WrappedTokenInfo(tokenInfo, tags);
		if (tokenMap[token.chainId][token.address] !== undefined) {
			console.debug(tokenMap[token.chainId][token.address]);
			throw Error('Duplicate tokens.');
		}
		return __assign(__assign({}, tokenMap), (_a = {}, _a[token.chainId] = __assign(__assign({}, tokenMap[token.chainId]), (_b = {}, _b[token.address] = {
			token: token,
			list: list,
		}, _b)), _a));
	}, __assign({}, EMPTY_LIST));
	listCache === null || listCache === void 0 ? void 0 : listCache.set(list, map);
	return map;
}
function useAllLists() {
	return useSelector(function (state) { return state.lists.byUrl; });
}
function combineMaps(map1, map2) {
	var _a;
	return _a = {},
		_a[ChainId.MAINNET] = __assign(__assign({}, map1[ChainId.MAINNET]), map2[ChainId.MAINNET]),
		_a[ChainId.TESTNET] = __assign(__assign({}, map1[ChainId.TESTNET]), map2[ChainId.TESTNET]),
		_a[ChainId.OKT] = __assign(__assign({}, map1[ChainId.OKT]), map2[ChainId.OKT]),
		_a[ChainId.MATIC_MAINNET] = __assign(__assign({}, map1[ChainId.MATIC_MAINNET]), map2[ChainId.MATIC_MAINNET]),
		_a[ChainId.MATIC_TESTNET] = __assign(__assign({}, map1[ChainId.MATIC_TESTNET]), map2[ChainId.MATIC_TESTNET]),
		_a;
}
// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls) {
	var lists = useAllLists();
	return useMemo(function () {
		if (!urls)
			return EMPTY_LIST;
		return (urls
			.slice()
			// sort by priority so top priority goes last
			.sort(sortByListPriority)
			.reduce(function (allTokens, currentUrl) {
				var _a;
				var current = (_a = lists[currentUrl]) === null || _a === void 0 ? void 0 : _a.current;
				if (!current)
					return allTokens;
				try {
					var newTokens = Object.assign(listToTokenMap(current));
					return combineMaps(allTokens, newTokens);
				}
				catch (error) {
					console.error('Could not show token list due to error', error);
					return allTokens;
				}
			}, EMPTY_LIST));
	}, [lists, urls]);
}
// filter out unsupported lists
function useActiveListUrls() {
	var _a;
	return (_a = useSelector(function (state) { return state.lists.activeListUrls; })) === null || _a === void 0 ? void 0 : _a.filter(function (url) { return !UNSUPPORTED_LIST_URLS.includes(url); });
}
function useInactiveListUrls() {
	var lists = useAllLists();
	var allActiveListUrls = useActiveListUrls();
	return Object.keys(lists).filter(function (url) { return !(allActiveListUrls === null || allActiveListUrls === void 0 ? void 0 : allActiveListUrls.includes(url)) && !UNSUPPORTED_LIST_URLS.includes(url); });
}
// get all the tokens from active lists, combine with local default tokens
function useCombinedActiveList() {
	var activeListUrls = useActiveListUrls();
	var activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
	var defaultTokenMap = listToTokenMap(DEFAULT_TOKEN_LIST);
	return combineMaps(activeTokens, defaultTokenMap);
}
// all tokens from inactive lists
function useCombinedInactiveList() {
	var allInactiveListUrls = useInactiveListUrls();
	return useCombinedTokenMapFromUrls(allInactiveListUrls);
}
// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
function useUnsupportedTokenList() {
	// get hard coded unsupported tokens
	var localUnsupportedListMap = listToTokenMap(UNSUPPORTED_TOKEN_LIST);
	// get any loaded unsupported tokens
	var loadedUnsupportedListMap = useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS);
	// format into one token address map
	return combineMaps(localUnsupportedListMap, loadedUnsupportedListMap);
}
function useIsListActive(url) {
	var activeListUrls = useActiveListUrls();
	return Boolean(activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(url));
}

function useBlockNumber() {
	var chainId = useActiveWeb3React().chainId;
	return useSelector(function (state) { return state.application.blockNumber[chainId !== null && chainId !== void 0 ? chainId : -1]; });
}

var ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
var LOWER_HEX_REGEX = /^0x[a-f0-9]*$/;
function toCallKey(call) {
	if (!ADDRESS_REGEX.test(call.address)) {
		throw new Error("Invalid address: " + call.address);
	}
	if (!LOWER_HEX_REGEX.test(call.callData)) {
		throw new Error("Invalid hex: " + call.callData);
	}
	return call.address + "-" + call.callData;
}
function parseCallKey(callKey) {
	var pcs = callKey.split('-');
	if (pcs.length !== 2) {
		throw new Error("Invalid call key: " + callKey);
	}
	return {
		address: pcs[0],
		callData: pcs[1],
	};
}
var addMulticallListeners = createAction('multicall/addMulticallListeners');
var removeMulticallListeners = createAction('multicall/removeMulticallListeners');
var fetchingMulticallResults = createAction('multicall/fetchingMulticallResults');
var errorFetchingMulticallResults = createAction('multicall/errorFetchingMulticallResults');
var updateMulticallResults = createAction('multicall/updateMulticallResults');

function isMethodArg(x) {
	return ['string', 'number'].indexOf(typeof x) !== -1;
}
function isValidMethodArgs(x) {
	return (x === undefined ||
		(Array.isArray(x) && x.every(function (xi) { return isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg)); })));
}
var INVALID_RESULT = { valid: false, blockNumber: undefined, data: undefined };
// use this options object
var NEVER_RELOAD = {
	blocksPerFetch: Infinity,
};
// the lowest level call for subscribing to contract data
function useCallsData(calls, options) {
	var chainId = useActiveWeb3React().chainId;
	var callResults = useSelector(function (state) { return state.multicall.callResults; });
	var dispatch = useDispatch();
	var serializedCallKeys = useMemo(function () {
		var _a, _b, _c;
		return JSON.stringify((_c = (_b = (_a = calls === null || calls === void 0 ? void 0 : calls.filter(function (c) { return Boolean(c); })) === null || _a === void 0 ? void 0 : _a.map(toCallKey)) === null || _b === void 0 ? void 0 : _b.sort()) !== null && _c !== void 0 ? _c : []);
	}, [calls]);
	// update listeners when there is an actual change that persists for at least 100ms
	useEffect(function () {
		var callKeys = JSON.parse(serializedCallKeys);
		if (!chainId || callKeys.length === 0)
			return undefined;
		// eslint-disable-next-line @typescript-eslint/no-shadow
		var calls = callKeys.map(function (key) { return parseCallKey(key); });
		dispatch(addMulticallListeners({
			chainId: chainId,
			calls: calls,
			options: options,
		}));
		return function () {
			dispatch(removeMulticallListeners({
				chainId: chainId,
				calls: calls,
				options: options,
			}));
		};
	}, [chainId, dispatch, options, serializedCallKeys]);
	return useMemo(function () {
		return calls.map(function (call) {
			var _a;
			if (!chainId || !call)
				return INVALID_RESULT;
			var result = (_a = callResults[chainId]) === null || _a === void 0 ? void 0 : _a[toCallKey(call)];
			var data;
			if ((result === null || result === void 0 ? void 0 : result.data) && (result === null || result === void 0 ? void 0 : result.data) !== '0x') {
				// eslint-disable-next-line prefer-destructuring
				data = result.data;
			}
			return { valid: true, data: data, blockNumber: result === null || result === void 0 ? void 0 : result.blockNumber };
		});
	}, [callResults, calls, chainId]);
}
var INVALID_CALL_STATE = { valid: false, result: undefined, loading: false, syncing: false, error: false };
var LOADING_CALL_STATE = { valid: true, result: undefined, loading: true, syncing: true, error: false };
function toCallState(callResult, contractInterface, fragment, latestBlockNumber) {
	if (!callResult)
		return INVALID_CALL_STATE;
	var valid = callResult.valid, data = callResult.data, blockNumber = callResult.blockNumber;
	if (!valid)
		return INVALID_CALL_STATE;
	if (valid && !blockNumber)
		return LOADING_CALL_STATE;
	if (!contractInterface || !fragment || !latestBlockNumber)
		return LOADING_CALL_STATE;
	var success = data && data.length > 2;
	var syncing = (blockNumber !== null && blockNumber !== void 0 ? blockNumber : 0) < latestBlockNumber;
	var result;
	if (success && data) {
		try {
			result = contractInterface.decodeFunctionResult(fragment, data);
		}
		catch (error) {
			console.debug('Result data parsing failed', fragment, data);
			return {
				valid: true,
				loading: false,
				error: true,
				syncing: syncing,
				result: result,
			};
		}
	}
	return {
		valid: true,
		loading: false,
		syncing: syncing,
		result: result,
		error: !success,
	};
}
function useSingleContractMultipleData(contract, methodName, callInputs, options) {
	var fragment = useMemo(function () { var _a; return (_a = contract === null || contract === void 0 ? void 0 : contract.interface) === null || _a === void 0 ? void 0 : _a.getFunction(methodName); }, [contract, methodName]);
	var calls = useMemo(function () {
		return contract && fragment && callInputs && callInputs.length > 0
			? callInputs.map(function (inputs) {
				return {
					address: contract.address,
					callData: contract.interface.encodeFunctionData(fragment, inputs),
				};
			})
			: [];
	}, [callInputs, contract, fragment]);
	var results = useCallsData(calls, options);
	var latestBlockNumber = useBlockNumber();
	return useMemo(function () {
		return results.map(function (result) { return toCallState(result, contract === null || contract === void 0 ? void 0 : contract.interface, fragment, latestBlockNumber); });
	}, [fragment, contract, results, latestBlockNumber]);
}
function useMultipleContractSingleData(addresses, contractInterface, methodName, callInputs, options) {
	var fragment = useMemo(function () { return contractInterface.getFunction(methodName); }, [contractInterface, methodName]);
	var callData = useMemo(function () {
		return fragment && isValidMethodArgs(callInputs)
			? contractInterface.encodeFunctionData(fragment, callInputs)
			: undefined;
	}, [callInputs, contractInterface, fragment]);
	var calls = useMemo(function () {
		return fragment && addresses && addresses.length > 0 && callData
			? addresses.map(function (address) {
				return address && callData
					? {
						address: address,
						callData: callData,
					}
					: undefined;
			})
			: [];
	}, [addresses, callData, fragment]);
	var results = useCallsData(calls, options);
	var latestBlockNumber = useBlockNumber();
	return useMemo(function () {
		return results.map(function (result) { return toCallState(result, contractInterface, fragment, latestBlockNumber); });
	}, [fragment, results, contractInterface, latestBlockNumber]);
}
function useSingleCallResult(contract, methodName, inputs, options) {
	var fragment = useMemo(function () { var _a; return (_a = contract === null || contract === void 0 ? void 0 : contract.interface) === null || _a === void 0 ? void 0 : _a.getFunction(methodName); }, [contract, methodName]);
	var calls = useMemo(function () {
		return contract && fragment && isValidMethodArgs(inputs)
			? [
				{
					address: contract.address,
					callData: contract.interface.encodeFunctionData(fragment, inputs),
				},
			]
			: [];
	}, [contract, fragment, inputs]);
	var result = useCallsData(calls, options)[0];
	var latestBlockNumber = useBlockNumber();
	return useMemo(function () {
		return toCallState(result, contract === null || contract === void 0 ? void 0 : contract.interface, fragment, latestBlockNumber);
	}, [result, contract, fragment, latestBlockNumber]);
}

function serializeToken(token) {
	return {
		chainId: token.chainId,
		address: token.address,
		decimals: token.decimals,
		symbol: token.symbol,
		name: token.name,
	};
}
function deserializeToken(serializedToken) {
	return new Token$1(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}

function useUserAddedTokens() {
	var chainId = useActiveWeb3React().chainId;
	var serializedTokensMap = useSelector(function (_a) {
		var tokens = _a.user.tokens;
		return tokens;
	});
	return useMemo(function () {
		var _a;
		if (!chainId)
			return [];
		return Object.values((_a = serializedTokensMap === null || serializedTokensMap === void 0 ? void 0 : serializedTokensMap[chainId]) !== null && _a !== void 0 ? _a : {}).map(deserializeToken);
	}, [serializedTokensMap, chainId]);
}

var _a$a;
var contracts = {
	SwapRouter: (_a$a = {},
		_a$a[ChainId$1.MAINNET] = '0xe9c7650b97712c0ec958ff270fbf4189fb99c071',
		_a$a[ChainId$1.MATIC_MAINNET] = '0xddb1a59ad3b87b914c4466dc6c39c2542ec565a1',
		_a$a[ChainId$1.MATIC_TESTNET] = '0xddb1a59ad3b87b914c4466dc6c39c2542ec565a1',
		_a$a)
};

var swapRouterAbi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WOKT",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "fromToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "toToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "fromAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "returnAmount",
				type: "uint256"
			}
		],
		name: "ExSwap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
		],
		name: "WOKT",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountADesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountTokenDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "contractAddr",
				type: "address"
			}
		],
		name: "addWhiteList",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "fromToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "toToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "approveTarget",
				type: "address"
			},
			{
				internalType: "address",
				name: "swapTarget",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "fromTokenAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "minReturnAmount",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "callDataConcat",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "deadLine",
				type: "uint256"
			}
		],
		name: "externalSwap",
		outputs: [
			{
				internalType: "uint256",
				name: "returnAmount",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountIn",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountOut",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsIn",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsOut",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "isWhiteListed",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "fromToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "toToken",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "fromTokenAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "minReturnAmount",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "mixAdapters",
				type: "address[]"
			},
			{
				internalType: "address[]",
				name: "mixPairs",
				type: "address[]"
			},
			{
				internalType: "address[]",
				name: "assetTo",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "directions",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadLine",
				type: "uint256"
			}
		],
		name: "mixSwap",
		outputs: [
			{
				internalType: "uint256",
				name: "returnAmount",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			}
		],
		name: "pairFor",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "fromToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "toToken",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "fromTokenAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "minReturnAmount",
				type: "uint256"
			},
			{
				internalType: "uint256[]",
				name: "weights",
				type: "uint256[]"
			},
			{
				internalType: "address[]",
				name: "adapters",
				type: "address[]"
			},
			{
				internalType: "address[]",
				name: "pools",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "directions",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadLine",
				type: "uint256"
			}
		],
		name: "polySwap",
		outputs: [
			{
				internalType: "uint256",
				name: "returnAmount",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		name: "quote",
		outputs: [
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETHSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "contractAddr",
				type: "address"
			}
		],
		name: "removeWhiteList",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_tradingPool",
				type: "address"
			}
		],
		name: "setTradingPool",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapETHForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "tradingPool",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];

// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value) {
	try {
		return getAddress$1(value);
	}
	catch (_a) {
		return false;
	}
}
function getBscScanLink(data, type, chainId) {
	if (chainId === void 0) { chainId = chainIdProxy.chainId; }
	switch (type) {
		case 'transaction': {
			return BASE_BSC_SCAN_URLS[chainId] + "/tx/" + data;
		}
		case 'token': {
			return BASE_BSC_SCAN_URLS[chainId] + "/token/" + data;
		}
		case 'block': {
			return BASE_BSC_SCAN_URLS[chainId] + "/block/" + data;
		}
		case 'countdown': {
			return BASE_BSC_SCAN_URLS[chainId] + "/block/countdown/" + data;
		}
		default: {
			return BASE_BSC_SCAN_URLS[chainId] + "/address/" + data;
		}
	}
}
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
function shortenAddress(address, chars) {
	if (chars === void 0) { chars = 4; }
	var parsed = isAddress(address);
	if (!parsed) {
		throw Error("Invalid 'address' parameter '" + address + "'.");
	}
	return parsed.substring(0, chars + 2) + "..." + parsed.substring(42 - chars);
}
// add 50%
function calculateGasMargin(value) {
	return value.mul(BigNumber.from(10000).add(BigNumber.from(5000))).div(BigNumber.from(10000));
}
// converts a basis points value to a sdk percent
function basisPointsToPercent(num) {
	return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}
// account is not optional
function getSigner(library, account) {
	return library.getSigner(account).connectUnchecked();
}
// account is optional
function getProviderOrSigner(library, account) {
	return account ? getSigner(library, account) : library;
}
// account is optional
function getContract$1(address, ABI, library, account) {
	if (!isAddress(address) || address === AddressZero) {
		throw Error("Invalid 'address' parameter '" + address + "'.");
	}
	return new Contract(address, ABI, getProviderOrSigner(library, account));
}
// account is optional
function getRouterContract(_, library, account) {
	return getContract$1(getValueWithChainId(contracts.SwapRouter), swapRouterAbi, library, account);
}
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function isTokenOnList(defaultTokens, currency) {
	var _a;
	if (currency === ETHER)
		return true;
	return Boolean(currency instanceof Token$1 && ((_a = defaultTokens[currency.chainId]) === null || _a === void 0 ? void 0 : _a[currency.address]));
}

var Erc20Abi = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_spender",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_from",
				type: "address"
			},
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			},
			{
				name: "_spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	}
];

var MULTICALL_ABI = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "aggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes[]",
				name: "returnData",
				type: "bytes[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "blockAndAggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			}
		],
		name: "getBlockHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockCoinbase",
		outputs: [
			{
				internalType: "address",
				name: "coinbase",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockDifficulty",
		outputs: [
			{
				internalType: "uint256",
				name: "difficulty",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockGasLimit",
		outputs: [
			{
				internalType: "uint256",
				name: "gaslimit",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockTimestamp",
		outputs: [
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "getEthBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getLastBlockHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "requireSuccess",
				type: "bool"
			},
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "tryAggregate",
		outputs: [
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "requireSuccess",
				type: "bool"
			},
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "tryBlockAndAggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var getContract = function (abi, address, signer) {
	var signerOrProvider = signer !== null && signer !== void 0 ? signer : simpleRpcProvider;
	return new ethers.Contract(address, abi, signerOrProvider);
};
var getMulticallContract = function (signer) {
	return getContract(MULTICALL_ABI, getMulticallAddress(), signer);
};

var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];

var ENS_PUBLIC_RESOLVER_ABI = [
	{
		inputs: [
			{
				internalType: "contract ENS",
				name: "_ens",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "contentType",
				type: "uint256"
			}
		],
		name: "ABIChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "a",
				type: "address"
			}
		],
		name: "AddrChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "coinType",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "newAddress",
				type: "bytes"
			}
		],
		name: "AddressChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "target",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isAuthorised",
				type: "bool"
			}
		],
		name: "AuthorisationChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "hash",
				type: "bytes"
			}
		],
		name: "ContenthashChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "name",
				type: "bytes"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "record",
				type: "bytes"
			}
		],
		name: "DNSRecordChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "name",
				type: "bytes"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			}
		],
		name: "DNSRecordDeleted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "DNSZoneCleared",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			},
			{
				indexed: false,
				internalType: "address",
				name: "implementer",
				type: "address"
			}
		],
		name: "InterfaceChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string"
			}
		],
		name: "NameChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		name: "PubkeyChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "string",
				name: "indexedKey",
				type: "string"
			},
			{
				indexed: false,
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "TextChanged",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "contentTypes",
				type: "uint256"
			}
		],
		name: "ABI",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "addr",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "authorisations",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "clearDNSZone",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "contenthash",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32"
			},
			{
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			}
		],
		name: "dnsRecord",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32"
			}
		],
		name: "hasDNSRecords",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			}
		],
		name: "interfaceImplementer",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "pubkey",
		outputs: [
			{
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "contentType",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "setABI",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "coinType",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "a",
				type: "bytes"
			}
		],
		name: "setAddr",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "a",
				type: "address"
			}
		],
		name: "setAddr",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "target",
				type: "address"
			},
			{
				internalType: "bool",
				name: "isAuthorised",
				type: "bool"
			}
		],
		name: "setAuthorisation",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "hash",
				type: "bytes"
			}
		],
		name: "setContenthash",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "setDNSRecords",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			},
			{
				internalType: "address",
				name: "implementer",
				type: "address"
			}
		],
		name: "setInterface",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "name",
				type: "string"
			}
		],
		name: "setName",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		name: "setPubkey",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "key",
				type: "string"
			},
			{
				internalType: "string",
				name: "value",
				type: "string"
			}
		],
		name: "setText",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "text",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ENS_ABI = [
	{
		inputs: [
			{
				internalType: "contract ENS",
				name: "_old",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "NewOwner",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "resolver",
				type: "address"
			}
		],
		name: "NewResolver",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "NewTTL",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "old",
		outputs: [
			{
				internalType: "contract ENS",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "recordExists",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "resolver",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "setOwner",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setRecord",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			}
		],
		name: "setResolver",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "setSubnodeOwner",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setSubnodeRecord",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setTTL",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "ttl",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ERC20_BYTES32_ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ERC20_INTERFACE = new Interface(Erc20Abi);
new Interface(ERC20_BYTES32_ABI);

var WETH_ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "guy",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "src",
				type: "address"
			},
			{
				name: "dst",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "withdraw",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "dst",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "deposit",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			},
			{
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: true,
				name: "guy",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: true,
				name: "dst",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "dst",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Deposit",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Withdrawal",
		type: "event"
	}
];

var MULTICALL_NETWORKS = __assign({}, contractAddress.multiCall);

// Code below migrated from Exchange useContract.ts
// returns null on errors
function useContract(address, ABI, withSignerIfPossible) {
	if (withSignerIfPossible === void 0) { withSignerIfPossible = true; }
	var _a = useActiveWeb3React(), library = _a.library, account = _a.account;
	return useMemo(function () {
		if (!address || !ABI || !library)
			return null;
		try {
			return getContract$1(address, ABI, library, withSignerIfPossible && account ? account : undefined);
		}
		catch (error) {
			console.error('Failed to get contract', error);
			return null;
		}
	}, [address, ABI, library, withSignerIfPossible, account]);
}
function useTokenContract(tokenAddress, withSignerIfPossible) {
	return useContract(tokenAddress, Erc20Abi, withSignerIfPossible);
}
function useWETHContract(withSignerIfPossible) {
	var chainId = useActiveWeb3React().chainId;
	return useContract(chainId && WETHER[chainId] ? WETHER[chainId].address : undefined, WETH_ABI, withSignerIfPossible);
}
function useENSRegistrarContract(withSignerIfPossible) {
	var chainId = useActiveWeb3React().chainId;
	var address;
	if (chainId) {
		// eslint-disable-next-line default-case
		switch (chainId) {
			case ChainId$1.MAINNET:
				address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
				break;
		}
	}
	return useContract(address, ENS_ABI, withSignerIfPossible);
}
function useENSResolverContract(address, withSignerIfPossible) {
	return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}
function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
	return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}
function useMulticallContract() {
	var chainId = useActiveWeb3React().chainId;
	return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false);
}

function filterTokens(tokens, search) {
	if (search.length === 0)
		return tokens;
	var searchingAddress = isAddress(search);
	if (searchingAddress) {
		return tokens.filter(function (token) { return token.address === searchingAddress; });
	}
	var lowerSearchParts = search
		.toLowerCase()
		.split(/\s+/)
		.filter(function (s) { return s.length > 0; });
	if (lowerSearchParts.length === 0) {
		return tokens;
	}
	var matchesSearch = function (s) {
		var sParts = s
			.toLowerCase()
			.split(/\s+/)
			.filter(function (s_) { return s_.length > 0; });
		return lowerSearchParts.every(function (p) { return p.length === 0 || sParts.some(function (sp) { return sp.startsWith(p) || sp.endsWith(p); }); });
	};
	return tokens.filter(function (token) {
		var symbol = token.symbol, name = token.name;
		return (symbol && matchesSearch(symbol)) || (name && matchesSearch(name));
	});
}
function useSortedTokensByQuery(tokens, searchQuery) {
	return useMemo(function () {
		if (!tokens) {
			return [];
		}
		var symbolMatch = searchQuery
			.toLowerCase()
			.split(/\s+/)
			.filter(function (s) { return s.length > 0; });
		if (symbolMatch.length > 1) {
			return tokens;
		}
		var exactMatches = [];
		var symbolSubtrings = [];
		var rest = [];
		// sort tokens by exact match -> subtring on symbol match -> rest
		tokens.map(function (token) {
			var _a, _b;
			if (((_a = token.symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === symbolMatch[0]) {
				return exactMatches.push(token);
			}
			if ((_b = token.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase().startsWith(searchQuery.toLowerCase().trim())) {
				return symbolSubtrings.push(token);
			}
			return rest.push(token);
		});
		return __spreadArray(__spreadArray(__spreadArray([], __read(exactMatches)), __read(symbolSubtrings)), __read(rest));
	}, [tokens, searchQuery]);
}

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap, includeUserAdded) {
	var chainId = useActiveWeb3React().chainId;
	var userAddedTokens = useUserAddedTokens();
	return useMemo(function () {
		if (!chainId)
			return {};
		if (!tokenMap[chainId])
			return {};
		// reduce to just tokens
		var mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce(function (newMap, address) {
			newMap[address] = tokenMap[chainId][address].token;
			return newMap;
		}, {});
		if (includeUserAdded) {
			return (userAddedTokens
				// reduce into all ALL_TOKENS filtered by the current chain
				.reduce(function (tokenMap_, token) {
					tokenMap_[token.address] = token;
					return tokenMap_;
				}, __assign({}, mapWithoutUrls)));
		}
		return mapWithoutUrls;
	}, [chainId, userAddedTokens, tokenMap, includeUserAdded]);
}
function useAllTokens() {
	var allTokens = useCombinedActiveList();
	return useTokensFromMap(allTokens, true);
}
function useAllInactiveTokens() {
	// get inactive tokens
	var inactiveTokensMap = useCombinedInactiveList();
	var inactiveTokens = useTokensFromMap(inactiveTokensMap, false);
	// filter out any token that are on active list
	var activeTokensAddresses = Object.keys(useAllTokens());
	var filteredInactive = activeTokensAddresses
		? Object.keys(inactiveTokens).reduce(function (newMap, address) {
			if (!activeTokensAddresses.includes(address)) {
				newMap[address] = inactiveTokens[address];
			}
			return newMap;
		}, {})
		: inactiveTokens;
	return filteredInactive;
}
function useUnsupportedTokens() {
	var unsupportedTokensMap = useUnsupportedTokenList();
	return useTokensFromMap(unsupportedTokensMap, false);
}
function useIsTokenActive(token) {
	var activeTokens = useAllTokens();
	if (!activeTokens || !token) {
		return false;
	}
	return !!activeTokens[token.address];
}
// used to detect extra search results
function useFoundOnInactiveList(searchQuery) {
	var chainId = useActiveWeb3React().chainId;
	var inactiveTokens = useAllInactiveTokens();
	return useMemo(function () {
		if (!chainId || searchQuery === '') {
			return undefined;
		}
		var tokens = filterTokens(Object.values(inactiveTokens), searchQuery);
		return tokens;
	}, [chainId, inactiveTokens, searchQuery]);
}
// Check if currency is included in custom list from user storage
function useIsUserAddedToken(currency) {
	var userAddedTokens = useUserAddedTokens();
	if (!currency) {
		return false;
	}
	return !!userAddedTokens.find(function (token) { return currencyEquals(currency, token); });
}
// parse a name or symbol from a token response
var BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;
function parseStringOrBytes32(str, bytes32, defaultValue) {
	return str && str.length > 0
		? str
		: // need to check for proper bytes string and valid terminator
		bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
			? parseBytes32String(bytes32)
			: defaultValue;
}
// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
function useToken(tokenAddress) {
	var chainId = useActiveWeb3React().chainId;
	var tokens = useAllTokens();
	var address = isAddress(tokenAddress);
	var tokenContract = useTokenContract(address || undefined, false);
	var tokenContractBytes32 = useBytes32TokenContract(address || undefined, false);
	var token = address ? tokens[address] : undefined;
	var tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD);
	var tokenNameBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'name', undefined, NEVER_RELOAD);
	var symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD);
	var symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD);
	var decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD);
	return useMemo(function () {
		var _a, _b, _c, _d;
		if (token)
			return token;
		if (!chainId || !address)
			return undefined;
		if (decimals.loading || symbol.loading || tokenName.loading)
			return null;
		if (decimals.result) {
			return new Token$1(chainId, address, decimals.result[0], parseStringOrBytes32((_a = symbol.result) === null || _a === void 0 ? void 0 : _a[0], (_b = symbolBytes32.result) === null || _b === void 0 ? void 0 : _b[0], 'UNKNOWN'), parseStringOrBytes32((_c = tokenName.result) === null || _c === void 0 ? void 0 : _c[0], (_d = tokenNameBytes32.result) === null || _d === void 0 ? void 0 : _d[0], 'Unknown Token'));
		}
		return undefined;
	}, [
		address,
		chainId,
		decimals.loading,
		decimals.result,
		symbol.loading,
		symbol.result,
		symbolBytes32.result,
		token,
		tokenName.loading,
		tokenName.result,
		tokenNameBytes32.result,
	]);
}
function useCurrency(currencyId) {
	var _a;
	var isBNB = (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase()) === ((_a = ETHER.symbol) === null || _a === void 0 ? void 0 : _a.toUpperCase());
	var token = useToken(isBNB ? undefined : currencyId);
	return isBNB ? ETHER : token;
}

var fetchTokenList = {
	pending: createAction('lists/fetchTokenList/pending'),
	fulfilled: createAction('lists/fetchTokenList/fulfilled'),
	rejected: createAction('lists/fetchTokenList/rejected'),
};
// add and remove from list options
var addList = createAction('lists/addList');
var removeList = createAction('lists/removeList');
// select which lists to search across from loaded lists
var enableList = createAction('lists/enableList');
var disableList = createAction('lists/disableList');
// versioning
var acceptListUpdate = createAction('lists/acceptListUpdate');
createAction('lists/rejectVersionUpdate');
// chainId
var acceptListUpdateOfChainId = createAction('lists/acceptListUpdateOfChainId');

var $schema = "http://json-schema.org/draft-07/schema#";
var $id = "https://uniswap.org/tokenlist.schema.json";
var title = "Uniswap Token List";
var description = "Schema for lists of tokens compatible with the Uniswap Interface";
var definitions = {
	Version: {
		type: "object",
		description: "The version of the list, used in change detection",
		examples: [
			{
				major: 1,
				minor: 0,
				patch: 0
			}
		],
		additionalProperties: false,
		properties: {
			major: {
				type: "integer",
				description: "The major version of the list. Must be incremented when tokens are removed from the list or token addresses are changed.",
				minimum: 0,
				examples: [
					1,
					2
				]
			},
			minor: {
				type: "integer",
				description: "The minor version of the list. Must be incremented when tokens are added to the list.",
				minimum: 0,
				examples: [
					0,
					1
				]
			},
			patch: {
				type: "integer",
				description: "The patch version of the list. Must be incremented for any changes to the list.",
				minimum: 0,
				examples: [
					0,
					1
				]
			}
		},
		required: [
			"major",
			"minor",
			"patch"
		]
	},
	TagIdentifier: {
		type: "string",
		description: "The unique identifier of a tag",
		minLength: 1,
		maxLength: 10,
		pattern: "^[\\w]+$",
		examples: [
			"compound",
			"stablecoin"
		]
	},
	ExtensionIdentifier: {
		type: "string",
		description: "The name of a token extension property",
		minLength: 1,
		maxLength: 30,
		pattern: "^[\\w]+$",
		examples: [
			"color",
			"is_fee_on_transfer",
			"aliases"
		]
	},
	ExtensionValue: {
		anyOf: [
			{
				type: "string",
				minLength: 1,
				maxLength: 42,
				examples: [
					"#00000"
				]
			},
			{
				type: "boolean",
				examples: [
					true
				]
			},
			{
				type: "number",
				examples: [
					15
				]
			},
			{
				type: "null"
			}
		]
	},
	TagDefinition: {
		type: "object",
		description: "Definition of a tag that can be associated with a token via its identifier",
		additionalProperties: false,
		properties: {
			name: {
				type: "string",
				description: "The name of the tag",
				pattern: "^[ \\w]+$",
				minLength: 1,
				maxLength: 20
			},
			description: {
				type: "string",
				description: "A user-friendly description of the tag",
				pattern: "^[ \\w\\.,]+$",
				minLength: 1,
				maxLength: 200
			}
		},
		required: [
			"name",
			"description"
		],
		examples: [
			{
				name: "Stablecoin",
				description: "A token with value pegged to another asset"
			}
		]
	},
	TokenInfo: {
		type: "object",
		description: "Metadata for a single token in a token list",
		additionalProperties: false,
		properties: {
			chainId: {
				type: "integer",
				description: "The chain ID of the Ethereum network where this token is deployed",
				minimum: 1,
				examples: [
					1,
					42
				]
			},
			address: {
				type: "string",
				description: "The checksummed address of the token on the specified chain ID",
				pattern: "^0x[a-fA-F0-9]{40}$",
				examples: [
					"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
				]
			},
			decimals: {
				type: "integer",
				description: "The number of decimals for the token balance",
				minimum: 0,
				maximum: 255,
				examples: [
					18
				]
			},
			name: {
				type: "string",
				description: "The name of the token",
				minLength: 1,
				maxLength: 40,
				pattern: "^[ \\w.'+\\-%/À-ÖØ-öø-ÿ\\:]+$",
				examples: [
					"USD Coin"
				]
			},
			symbol: {
				type: "string",
				description: "The symbol for the token; must be alphanumeric",
				pattern: "^[a-zA-Z0-9+\\-%/\\$]+$",
				minLength: 1,
				maxLength: 20,
				examples: [
					"USDC"
				]
			},
			logoURI: {
				type: "string",
				description: "A URI to the token logo asset; if not set, interface will attempt to find a logo based on the token address; suggest SVG or PNG of size 64x64",
				format: "uri",
				examples: [
					"ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"
				]
			},
			tags: {
				type: "array",
				description: "An array of tag identifiers associated with the token; tags are defined at the list level",
				items: {
					$ref: "#/definitions/TagIdentifier"
				},
				maxLength: 10,
				examples: [
					"stablecoin",
					"compound"
				]
			},
			extensions: {
				type: "object",
				description: "An object containing any arbitrary or vendor-specific token metadata",
				propertyNames: {
					$ref: "#/definitions/ExtensionIdentifier"
				},
				additionalProperties: {
					$ref: "#/definitions/ExtensionValue"
				},
				maxProperties: 10,
				examples: [
					{
						color: "#000000",
						is_verified_by_me: true
					}
				]
			}
		},
		required: [
			"chainId",
			"address",
			"decimals",
			"name",
			"symbol"
		]
	}
};
var type = "object";
var additionalProperties = false;
var properties = {
	name: {
		type: "string",
		description: "The name of the token list",
		minLength: 1,
		maxLength: 20,
		pattern: "^[\\w ]+$",
		examples: [
			"My Token List"
		]
	},
	timestamp: {
		type: "string",
		format: "date-time",
		description: "The timestamp of this list version; i.e. when this immutable version of the list was created"
	},
	version: {
		$ref: "#/definitions/Version"
	},
	tokens: {
		type: "array",
		description: "The list of tokens included in the list",
		items: {
			$ref: "#/definitions/TokenInfo"
		},
		minItems: 1,
		maxItems: 10000
	},
	keywords: {
		type: "array",
		description: "Keywords associated with the contents of the list; may be used in list discoverability",
		items: {
			type: "string",
			description: "A keyword to describe the contents of the list",
			minLength: 1,
			maxLength: 20,
			pattern: "^[\\w ]+$",
			examples: [
				"compound",
				"lending",
				"personal tokens"
			]
		},
		maxItems: 20,
		uniqueItems: true
	},
	tags: {
		type: "object",
		description: "A mapping of tag identifiers to their name and description",
		propertyNames: {
			$ref: "#/definitions/TagIdentifier"
		},
		additionalProperties: {
			$ref: "#/definitions/TagDefinition"
		},
		maxProperties: 20,
		examples: [
			{
				stablecoin: {
					name: "Stablecoin",
					description: "A token with value pegged to another asset"
				}
			}
		]
	},
	logoURI: {
		type: "string",
		description: "A URI for the logo of the token list; prefer SVG or PNG of size 256x256",
		format: "uri",
		examples: [
			"ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"
		]
	}
};
var required = [
	"name",
	"timestamp",
	"version",
	"tokens"
];
var schema = {
	$schema: $schema,
	$id: $id,
	title: title,
	description: description,
	definitions: definitions,
	type: type,
	additionalProperties: additionalProperties,
	properties: properties,
	required: required
};

function hexToUint8Array(hex) {
	// eslint-disable-next-line no-param-reassign
	hex = hex.startsWith('0x') ? hex.substr(2) : hex;
	if (hex.length % 2 !== 0)
		throw new Error('hex must have length that is multiple of 2');
	var arr = new Uint8Array(hex.length / 2);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = parseInt(hex.substr(i * 2, 2), 16);
	}
	return arr;
}
var UTF_8_DECODER = new TextDecoder();
/**
 * Returns the URI representation of the content hash for supported codecs
 * @param contenthash to decode
 */
function contenthashToUri(contenthash) {
	var buff = hexToUint8Array(contenthash);
	var codec = getCodec(buff); // the typing is wrong for @types/multicodec
	switch (codec) {
		case 'ipfs-ns': {
			var data = rmPrefix(buff);
			var cid = new CID(data);
			return "ipfs://" + toB58String(cid.multihash);
		}
		case 'ipns-ns': {
			var data = rmPrefix(buff);
			var cid = new CID(data);
			var multihash = decode(cid.multihash);
			if (multihash.name === 'identity') {
				return "ipns://" + UTF_8_DECODER.decode(multihash.digest).trim();
			}
			return "ipns://" + toB58String(cid.multihash);
		}
		default:
			throw new Error("Unrecognized codec: " + codec);
	}
}

var ENS_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)eth(\/.*)?$/;
function parseENSAddress(ensAddress) {
	var match = ensAddress.match(ENS_NAME_REGEX);
	if (!match)
		return undefined;
	return { ensName: match[1].toLowerCase() + "eth", ensPath: match[4] };
}

/* eslint-disable no-case-declarations */
/**
 * Given a URI that may be ipfs, ipns, http, or https protocol, return the fetch-able http(s) URLs for the same content
 * @param uri to convert to fetch-able http url
 */
function uriToHttp(uri) {
	var _a, _b;
	var protocol = uri.split(':')[0].toLowerCase();
	switch (protocol) {
		case 'https':
			return [uri];
		case 'http':
			return ["https" + uri.substr(4), uri];
		case 'ipfs':
			var hash = (_a = uri.match(/^ipfs:(\/\/)?(.*)$/i)) === null || _a === void 0 ? void 0 : _a[2];
			return ["https://cloudflare-ipfs.com/ipfs/" + hash + "/", "https://ipfs.io/ipfs/" + hash + "/"];
		case 'ipns':
			var name_1 = (_b = uri.match(/^ipns:(\/\/)?(.*)$/i)) === null || _b === void 0 ? void 0 : _b[2];
			return ["https://cloudflare-ipfs.com/ipns/" + name_1 + "/", "https://ipfs.io/ipns/" + name_1 + "/"];
		default:
			return [];
	}
}

var tokenListValidator = new Ajv({ allErrors: true }).compile(schema);
/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */
function getTokenList(listUrl, resolveENSContentHash) {
	var _a, _b, _c;
	return __awaiter(this, void 0, void 0, function () {
		var parsedENS, urls, contentHashUri, error_1, translatedUri, i, url, isLast, response, error_2, json, validationErrors;
		return __generator(this, function (_d) {
			switch (_d.label) {
				case 0:
					parsedENS = parseENSAddress(listUrl);
					if (!parsedENS) return [3 /*break*/, 5];
					contentHashUri = void 0;
					_d.label = 1;
				case 1:
					_d.trys.push([1, 3, , 4]);
					return [4 /*yield*/, resolveENSContentHash(parsedENS.ensName)];
				case 2:
					contentHashUri = _d.sent();
					return [3 /*break*/, 4];
				case 3:
					error_1 = _d.sent();
					console.error("Failed to resolve ENS name: " + parsedENS.ensName, error_1);
					throw new Error("Failed to resolve ENS name: " + parsedENS.ensName);
				case 4:
					translatedUri = void 0;
					try {
						translatedUri = contenthashToUri(contentHashUri);
					}
					catch (error) {
						console.error('Failed to translate contenthash to URI', contentHashUri);
						throw new Error("Failed to translate contenthash to URI: " + contentHashUri);
					}
					urls = uriToHttp("" + translatedUri + ((_a = parsedENS.ensPath) !== null && _a !== void 0 ? _a : ''));
					return [3 /*break*/, 6];
				case 5:
					urls = uriToHttp(listUrl);
					_d.label = 6;
				case 6:
					i = 0;
					_d.label = 7;
				case 7:
					if (!(i < urls.length)) return [3 /*break*/, 14];
					url = urls[i];
					isLast = i === urls.length - 1;
					response = void 0;
					_d.label = 8;
				case 8:
					_d.trys.push([8, 10, , 11]);
					return [4 /*yield*/, fetch(url + "?t=" + new Date().getTime())];
				case 9:
					response = _d.sent();
					return [3 /*break*/, 11];
				case 10:
					error_2 = _d.sent();
					console.error('Failed to fetch list', listUrl, error_2);
					if (isLast)
						throw new Error("Failed to download list " + listUrl);
					return [3 /*break*/, 13];
				case 11:
					if (!response.ok) {
						if (isLast)
							throw new Error("Failed to download list " + listUrl);
						return [3 /*break*/, 13];
					}
					return [4 /*yield*/, response.json()];
				case 12:
					json = _d.sent();
					if (!tokenListValidator(json)) {
						validationErrors = (_c = (_b = tokenListValidator.errors) === null || _b === void 0 ? void 0 : _b.reduce(function (memo, error) {
							var _a;
							var add = error.dataPath + " " + ((_a = error.message) !== null && _a !== void 0 ? _a : '');
							return memo.length > 0 ? memo + "; " + add : "" + add;
						}, '')) !== null && _c !== void 0 ? _c : 'unknown error';
						throw new Error("Token list failed validation: " + validationErrors);
					}
					return [2 /*return*/, json];
				case 13:
					i++;
					return [3 /*break*/, 7];
				case 14: throw new Error('Unrecognized list URL protocol.');
			}
		});
	});
}

var REGISTRAR_ABI = [
	{
		constant: true,
		inputs: [
			{
				name: 'node',
				type: 'bytes32',
			},
		],
		name: 'resolver',
		outputs: [
			{
				name: 'resolverAddress',
				type: 'address',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
];
var REGISTRAR_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
var RESOLVER_ABI = [
	{
		constant: true,
		inputs: [
			{
				internalType: 'bytes32',
				name: 'node',
				type: 'bytes32',
			},
		],
		name: 'contenthash',
		outputs: [
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
];
// cache the resolver contracts since most of them are the public resolver
function resolverContract(resolverAddress, provider) {
	return new Contract(resolverAddress, RESOLVER_ABI, provider);
}
/**
 * Fetches and decodes the result of an ENS contenthash lookup on mainnet to a URI
 * @param ensName to resolve
 * @param provider provider to use to fetch the data
 */
function resolveENSContentHash(ensName, provider) {
	return __awaiter(this, void 0, void 0, function () {
		var ensRegistrarContract, hash, resolverAddress;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					ensRegistrarContract = new Contract(REGISTRAR_ADDRESS, REGISTRAR_ABI, provider);
					hash = namehash(ensName);
					return [4 /*yield*/, ensRegistrarContract.resolver(hash)];
				case 1:
					resolverAddress = _a.sent();
					return [2 /*return*/, resolverContract(resolverAddress, provider).contenthash(hash)];
			}
		});
	});
}

function useFetchListCallback() {
	var _this = this;
	var library = useActiveWeb3React().library;
	var chainId = useActiveWeb3React().chainId;
	var dispatch = useDispatch();
	var ensResolver = useCallback(function (ensName) {
		if (chainId !== ChainId$1.MAINNET) {
			throw new Error('Could not construct mainnet ENS resolver');
		}
		return resolveENSContentHash(ensName, library);
	}, [chainId, library]);
	// note: prevent dispatch if using for list search or unsupported list
	return useCallback(function (listUrl, sendDispatch) {
		if (sendDispatch === void 0) { sendDispatch = true; }
		return __awaiter(_this, void 0, void 0, function () {
			var requestId;
			return __generator(this, function (_a) {
				requestId = nanoid();
				if (sendDispatch) {
					dispatch(fetchTokenList.pending({ requestId: requestId, url: listUrl, chainId: chainId }));
				}
				return [2 /*return*/, getTokenList(listUrl, ensResolver)
					.then(function (tokenList) {
						if (sendDispatch) {
							dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList: tokenList, requestId: requestId, chainId: chainId }));
						}
						return tokenList;
					})
					.catch(function (error) {
						console.error("Failed to get list at url " + listUrl, error);
						if (sendDispatch) {
							dispatch(fetchTokenList.rejected({ url: listUrl, requestId: requestId, errorMessage: error.message, chainId: chainId }));
						}
						throw error;
					})];
			});
		});
	}, [dispatch, ensResolver, chainId]);
}

function useInterval(callback, delay, leading) {
	if (leading === void 0) { leading = true; }
	var savedCallback = useRef();
	// Remember the latest callback.
	useEffect(function () {
		savedCallback.current = callback;
	}, [callback]);
	// Set up the interval.
	useEffect(function () {
		function tick() {
			var current = savedCallback.current;
			if (current) {
				current();
			}
		}
		if (delay !== null) {
			if (leading)
				tick();
			var id_1 = setInterval(tick, delay);
			return function () { return clearInterval(id_1); };
		}
		return undefined;
	}, [delay, leading]);
}

function Updater$2() {
	var _a = useActiveWeb3React(), library = _a.library; _a.chainId;
	var dispatch = useDispatch();
	var isWindowVisible = useIsWindowVisible();
	// get all loaded lists, and the active urls
	var lists = useAllLists();
	var activeListUrls = useActiveListUrls();
	// initiate loading
	useAllInactiveTokens();
	var fetchList = useFetchListCallback();
	var fetchAllListsCallback = useCallback(function () {
		if (!isWindowVisible)
			return;
		Object.keys(lists).forEach(function (url) {
			return fetchList(url).catch(function (error) { return console.debug('interval list fetching error', error); });
		});
	}, [fetchList, isWindowVisible, lists]);
	// fetch all lists every 10 minutes, but only after we initialize library
	useInterval(fetchAllListsCallback, library ? 1000 * 60 * 10 : null);
	// whenever a list is not loaded and not loading, try again to load it
	useEffect(function () {
		Object.keys(lists).forEach(function (listUrl) {
			var list = lists[listUrl];
			if (!list.current && !list.loadingRequestId && !list.error) {
				fetchList(listUrl).catch(function (error) { return console.debug('list added fetching error', error); });
			}
		});
	}, [dispatch, fetchList, library, lists]);
	// if any lists from unsupported lists are loaded, check them too (in case new updates since last visit)
	useEffect(function () {
		Object.keys(UNSUPPORTED_LIST_URLS).forEach(function (listUrl) {
			var list = lists[listUrl];
			if (!list || (!list.current && !list.loadingRequestId && !list.error)) {
				fetchList(listUrl).catch(function (error) { return console.debug('list added fetching error', error); });
			}
		});
	}, [dispatch, fetchList, library, lists]);
	// automatically update lists if versions are minor/patch
	useEffect(function () {
		Object.keys(lists).forEach(function (listUrl) {
			var list = lists[listUrl];
			if (list.current && list.pendingUpdate) {
				var bump = getVersionUpgrade(list.current.version, list.pendingUpdate.version);
				// eslint-disable-next-line default-case
				switch (bump) {
					case VersionUpgrade.NONE:
						throw new Error('unexpected no version bump');
					// update any active or inactive lists
					case VersionUpgrade.PATCH:
					case VersionUpgrade.MINOR:
					case VersionUpgrade.MAJOR:
						dispatch(acceptListUpdate(listUrl));
				}
			}
		});
	}, [dispatch, lists, activeListUrls]);
	var handleUpdateOfChainId = useCallback(function (newChainId) {
		dispatch(acceptListUpdateOfChainId(newChainId));
	}, [dispatch]);
	useEffect(function () {
		chainIdProxy.onChange(function (newChainId) { return handleUpdateOfChainId(newChainId); });
		return chainIdProxy.removeChange(function (newChainId) { return handleUpdateOfChainId(newChainId); });
	}, [handleUpdateOfChainId]);
	return null;
}

/* eslint-disable */
function wait(ms) {
	return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function waitRandom(min, max) {
	return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}
/**
 * This error is thrown if the function is cancelled before completing
 */
var CancelledError = /** @class */ (function (_super) {
	__extends(CancelledError, _super);
	function CancelledError() {
		return _super.call(this, 'Cancelled') || this;
	}
	return CancelledError;
}(Error));
/**
 * Throw this error if the function should retry
 */
var RetryableError = /** @class */ (function (_super) {
	__extends(RetryableError, _super);
	function RetryableError() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return RetryableError;
}(Error));
/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
function retry(fn, _a) {
	var _this = this;
	var n = _a.n, minWait = _a.minWait, maxWait = _a.maxWait;
	var completed = false;
	var rejectCancelled;
	var promise = new Promise(function (resolve, reject) {
		return __awaiter(_this, void 0, void 0, function () {
			var result, error_1;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						rejectCancelled = reject;
						_a.label = 1;
					case 1:
						result = void 0;
						_a.label = 2;
					case 2:
						_a.trys.push([2, 4, , 5]);
						return [4 /*yield*/, fn()];
					case 3:
						result = _a.sent();
						if (!completed) {
							resolve(result);
							completed = true;
						}
						return [3 /*break*/, 7];
					case 4:
						error_1 = _a.sent();
						if (completed) {
							return [3 /*break*/, 7];
						}
						if (n <= 0 || !(error_1 instanceof RetryableError)) {
							reject(error_1);
							completed = true;
							return [3 /*break*/, 7];
						}
						n--;
						return [3 /*break*/, 5];
					case 5: return [4 /*yield*/, waitRandom(minWait, maxWait)];
					case 6:
						_a.sent();
						return [3 /*break*/, 1];
					case 7: return [2 /*return*/];
				}
			});
		});
	});
	return {
		promise: promise,
		cancel: function () {
			if (completed)
				return;
			completed = true;
			rejectCancelled(new CancelledError());
		},
	};
}
/* eslint-enable */

// chunks array into chunks of maximum size
// evenly distributes items among the chunks
function chunkArray(items, maxChunkSize) {
	if (maxChunkSize < 1)
		throw new Error('maxChunkSize must be gte 1');
	if (items.length <= maxChunkSize)
		return [items];
	var numChunks = Math.ceil(items.length / maxChunkSize);
	var chunkSize = Math.ceil(items.length / numChunks);
	return __spreadArray([], __read(Array(numChunks).keys())).map(function (ix) { return items.slice(ix * chunkSize, ix * chunkSize + chunkSize); });
}

// chunk calls so we do not exceed the gas limit
var CALL_CHUNK_SIZE = 500;
/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicallContract multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param minBlockNumber minimum block number of the result set
 */
function fetchChunk(multicallContract, chunk, minBlockNumber) {
	return __awaiter(this, void 0, void 0, function () {
		var resultsBlockNumber, returnData, error_1;
		var _a;
		return __generator(this, function (_b) {
			switch (_b.label) {
				case 0:
					console.debug('Fetching chunk', multicallContract, chunk, minBlockNumber);
					_b.label = 1;
				case 1:
					_b.trys.push([1, 3, , 4]);
					return [4 /*yield*/, multicallContract.aggregate(chunk.map(function (obj) { return [obj.address, obj.callData]; }))];
				case 2:
					// prettier-ignore
					_a = __read.apply(void 0, [_b.sent(), 2]), resultsBlockNumber = _a[0], returnData = _a[1];
					return [3 /*break*/, 4];
				case 3:
					error_1 = _b.sent();
					console.debug('Failed to fetch chunk inside retry', error_1);
					throw error_1;
				case 4:
					if (resultsBlockNumber.toNumber() < minBlockNumber) {
						console.debug("Fetched results for old block number: " + resultsBlockNumber.toString() + " vs. " + minBlockNumber);
						throw new RetryableError('Fetched for old block number');
					}
					return [2 /*return*/, { results: returnData, blockNumber: resultsBlockNumber.toNumber() }];
			}
		});
	});
}
/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
function activeListeningKeys(allListeners, chainId) {
	if (!allListeners || !chainId)
		return {};
	var listeners = allListeners[chainId];
	if (!listeners)
		return {};
	return Object.keys(listeners).reduce(function (memo, callKey) {
		var keyListeners = listeners[callKey];
		memo[callKey] = Object.keys(keyListeners)
			.filter(function (key) {
				var blocksPerFetch = parseInt(key);
				if (blocksPerFetch <= 0)
					return false;
				return keyListeners[blocksPerFetch] > 0;
			})
			.reduce(function (previousMin, current) {
				return Math.min(previousMin, parseInt(current));
			}, Infinity);
		return memo;
	}, {});
}
/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param latestBlockNumber the latest block number
 */
function outdatedListeningKeys(callResults, listeningKeys, chainId, latestBlockNumber) {
	if (!chainId || !latestBlockNumber)
		return [];
	var results = callResults[chainId];
	// no results at all, load everything
	if (!results)
		return Object.keys(listeningKeys);
	return Object.keys(listeningKeys).filter(function (callKey) {
		var blocksPerFetch = listeningKeys[callKey];
		var data = callResults[chainId][callKey];
		// no data, must fetch
		if (!data)
			return true;
		var minDataBlockNumber = latestBlockNumber - (blocksPerFetch - 1);
		// already fetching it for a recent enough block, don't refetch it
		if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber)
			return false;
		// if data is older than minDataBlockNumber, fetch it
		return !data.blockNumber || data.blockNumber < minDataBlockNumber;
	});
}
function Updater$1() {
	var dispatch = useDispatch();
	var state = useSelector(function (s) { return s.multicall; });
	// wait for listeners to settle before triggering updates
	var debouncedListeners = useDebounce(state.callListeners, 100);
	var latestBlockNumber = useBlockNumber();
	var chainId = useActiveWeb3React().chainId;
	var multicallContract = useMulticallContract();
	var cancellations = useRef();
	var listeningKeys = useMemo(function () {
		return activeListeningKeys(debouncedListeners, chainId);
	}, [debouncedListeners, chainId]);
	var unserializedOutdatedCallKeys = useMemo(function () {
		return outdatedListeningKeys(state.callResults, listeningKeys, chainId, latestBlockNumber);
	}, [chainId, state.callResults, listeningKeys, latestBlockNumber]);
	var serializedOutdatedCallKeys = useMemo(function () { return JSON.stringify(unserializedOutdatedCallKeys.sort()); }, [unserializedOutdatedCallKeys]);
	useEffect(function () {
		var _a, _b, _c;
		if (!latestBlockNumber || !chainId || !multicallContract)
			return;
		var outdatedCallKeys = JSON.parse(serializedOutdatedCallKeys);
		if (outdatedCallKeys.length === 0)
			return;
		var calls = outdatedCallKeys.map(function (key) { return parseCallKey(key); });
		var chunkedCalls = chunkArray(calls, CALL_CHUNK_SIZE);
		if (((_a = cancellations.current) === null || _a === void 0 ? void 0 : _a.blockNumber) !== latestBlockNumber) {
			(_c = (_b = cancellations.current) === null || _b === void 0 ? void 0 : _b.cancellations) === null || _c === void 0 ? void 0 : _c.forEach(function (c) { return c(); });
		}
		dispatch(fetchingMulticallResults({
			calls: calls,
			chainId: chainId,
			fetchingBlockNumber: latestBlockNumber,
		}));
		cancellations.current = {
			blockNumber: latestBlockNumber,
			cancellations: chunkedCalls.map(function (chunk, index) {
				var _a = retry(function () { return fetchChunk(multicallContract, chunk, latestBlockNumber); }, {
					n: Infinity,
					minWait: 2500,
					maxWait: 3500,
				}), cancel = _a.cancel, promise = _a.promise;
				promise
					.then(function (_a) {
						var returnData = _a.results, fetchBlockNumber = _a.blockNumber;
						cancellations.current = { cancellations: [], blockNumber: latestBlockNumber };
						// accumulates the length of all previous indices
						var firstCallKeyIndex = chunkedCalls.slice(0, index).reduce(function (memo, curr) { return memo + curr.length; }, 0);
						var lastCallKeyIndex = firstCallKeyIndex + returnData.length;
						dispatch(updateMulticallResults({
							chainId: chainId,
							results: outdatedCallKeys
								.slice(firstCallKeyIndex, lastCallKeyIndex)
								.reduce(function (memo, callKey, i) {
									var _a;
									memo[callKey] = (_a = returnData[i]) !== null && _a !== void 0 ? _a : null;
									return memo;
								}, {}),
							blockNumber: fetchBlockNumber,
						}));
					})
					.catch(function (error) {
						if (error instanceof CancelledError) {
							console.debug('Cancelled fetch for blockNumber', latestBlockNumber);
							return;
						}
						console.error('Failed to fetch multicall chunk', chunk, chainId, error);
						dispatch(errorFetchingMulticallResults({
							calls: chunk,
							chainId: chainId,
							fetchingBlockNumber: latestBlockNumber,
						}));
					});
				return cancel;
			}),
		};
	}, [chainId, multicallContract, dispatch, serializedOutdatedCallKeys, latestBlockNumber]);
	return null;
}

var getThemeValue = function (path, fallback) {
	return function (theme) {
		return get(theme, path, fallback);
	};
};

var rotate$2 = keyframes(templateObject_1$1C || (templateObject_1$1C = __makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var spinStyle = css(templateObject_2$M || (templateObject_2$M = __makeTemplateObject(["\n  animation: ", " 2s linear infinite;\n"], ["\n  animation: ", " 2s linear infinite;\n"])), rotate$2);
var Svg = styled.svg(templateObject_3$t || (templateObject_3$t = __makeTemplateObject(["\n  align-self: center; // Safari fix\n  fill: ", ";\n  flex-shrink: 0;\n  ", "\n  ", "\n"], ["\n  align-self: center; // Safari fix\n  fill: ", ";\n  flex-shrink: 0;\n  ", "\n  ", "\n"])), function (_a) {
	var theme = _a.theme, color = _a.color;
	return getThemeValue("colors." + color, color)(theme);
}, function (_a) {
	var spin = _a.spin;
	return spin && spinStyle;
}, space);
Svg.defaultProps = {
	color: "text",
	width: "20px",
	xmlns: "http://www.w3.org/2000/svg",
	spin: false,
};
var templateObject_1$1C, templateObject_2$M, templateObject_3$t;

var Icon$Q = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" }, void 0) }), void 0));
};

var Icon$P = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 17H11V15H13V17Z" }, void 0) }), void 0));
};

var getColor = function (_a) {
	var color = _a.color, theme = _a.theme;
	return getThemeValue("colors." + color, color)(theme);
};
var getFontSize = function (_a) {
	var fontSize = _a.fontSize, small = _a.small;
	return small ? "14px" : fontSize || "16px";
};
var Text = styled.div(templateObject_1$1B || (templateObject_1$1B = __makeTemplateObject(["\n  color: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  font-family: ", ";\n  line-height: 1.5;\n  ", "\n  ", "\n\n  ", "\n  ", "\n  ", "\n"], ["\n  color: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  font-family: ", ";\n  line-height: 1.5;\n  ", "\n  ", "\n\n  ", "\n  ", "\n  ", "\n"])), getColor, getFontSize, function (_a) {
	var bold = _a.bold;
	return (bold ? 600 : 400);
}, function (_a) {
	var bold = _a.bold;
	return (bold ? 'SourceHanSansCN-Bold' : 'SourceHanSansCN');
}, function (_a) {
	var textTransform = _a.textTransform;
	return textTransform && "text-transform: " + textTransform + ";";
}, function (_a) {
	var ellipsis = _a.ellipsis, maxLine = _a.maxLine;
	return (ellipsis || maxLine) && (maxLine
		?
		"\n      overflow: hidden;\n      display:-webkit-box;\n      text-overflow: ellipsis;\n      -webkit-box-orient:vertical;\n      -webkit-line-clamp:" + maxLine + ";\n      "
		:
		"white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;");
}, space, typography, layout);
Text.defaultProps = {
	color: "text",
	small: false,
	ellipsis: false,
};
var templateObject_1$1B;

styled(Text)(templateObject_1$1A || (templateObject_1$1A = __makeTemplateObject(["\n  text-decoration: ", ";\n  text-underline-offset: 0.1em;\n"], ["\n  text-decoration: ", ";\n  text-underline-offset: 0.1em;\n"])), function (_a) {
	var theme = _a.theme;
	return "underline dotted " + theme.colors.textSubtle;
});
var templateObject_1$1A;

var getExternalLinkProps = function () {
	return ({
		target: "_blank",
		rel: "noreferrer noopener",
	});
};

var scales$a = {
	LD: "ld",
	MD: "md",
	SM: "sm",
	XS: "xs",
};
var variants$5 = {
	PRIMARY: "primary",
	SECONDARY: "secondary",
	TERTIARY: "tertiary",
	TEXT: "text",
	TEXTLINE: "textline",
	DANGER: "danger",
	SUBTLE: "subtle",
	SUCCESS: "success",
	CIRCULAR: "circular",
	ORANGE: "orange",
	LEFT: "left",
	RIGHT: "right",
};

var _a$9, _b$3;
var scaleVariants$2 = (_a$9 = {},
	_a$9[scales$a.LD] = {
		height: "36px",
		minWidth: "108px",
		padding: "0 24px",
	},
	_a$9[scales$a.MD] = {
		height: "36px",
		padding: "0 24px",
	},
	_a$9[scales$a.SM] = {
		height: "32px",
		padding: "0 16px",
	},
	_a$9[scales$a.XS] = {
		height: "20px",
		fontSize: "12px",
		padding: "0 8px",
	},
	_a$9);
var styleVariants$2 = (_b$3 = {},
	_b$3[variants$5.PRIMARY] = {
		backgroundColor: "primary",
		color: "white",
		boxShadow: "0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), 1px 0px 0px 0px rgba(14, 14, 44, 0.4)",
	},
	_b$3[variants$5.SECONDARY] = {
		backgroundColor: "transparent",
		border: "2px solid",
		borderColor: "primary",
		boxShadow: "none",
		color: "primary",
		":disabled": {
			backgroundColor: "transparent",
			color: "primary",
		},
	},
	_b$3[variants$5.TERTIARY] = {
		backgroundColor: "tertiary",
		boxShadow: "none",
		color: "primary",
	},
	_b$3[variants$5.SUBTLE] = {
		backgroundColor: "textSubtle",
		color: "backgroundAlt",
	},
	_b$3[variants$5.DANGER] = {
		backgroundColor: "failure",
		color: "white",
	},
	_b$3[variants$5.LEFT] = {
		color: "white",
		backgroundColor: "primary",
		// backgroundRepeat: "no-repeat",
		// backgroundImage: `url(${btnLeft})`,
		// backgroundPosition: "0",
		// backgroundSize: "57px 60px",
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		boxShadow: "0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), 1px 0px 0px 0px rgba(14, 14, 44, 0.4)",
	},
	_b$3[variants$5.RIGHT] = {
		color: "white",
		backgroundColor: "primary",
		// backgroundRepeat: "no-repeat",
		// backgroundImage: `url(${btnRight})`,
		// backgroundPosition: "right",
		// backgroundSize: "57px 60px",
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		boxShadow: "0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), -1px 0px 0px 0px rgba(14, 14, 44, 0.4)",
	},
	_b$3[variants$5.SUCCESS] = {
		backgroundColor: "success",
		color: "white",
	},
	_b$3[variants$5.ORANGE] = {
		backgroundColor: "orange",
		color: "white",
		boxShadow: "none",
	},
	_b$3[variants$5.TEXT] = {
		backgroundColor: "transparent",
		color: "primary",
		boxShadow: "none",
	},
	_b$3[variants$5.TEXTLINE] = {
		backgroundColor: "transparent",
		color: "primary",
		boxShadow: "none",
		padding: 0,
		margin: 0,
	},
	_b$3[variants$5.CIRCULAR] = {
		backgroundColor: "primary",
		color: "white",
		width: "36px",
		height: "36px",
		padding: "0",
	},
	_b$3);

var getDisabledStyles = function (_a) {
	var $isLoading = _a.$isLoading, theme = _a.theme;
	if ($isLoading === true) {
		return "\n      &:disabled,\n      &.pancake-button--disabled {\n        cursor: progress;\n      }\n    ";
	}
	return "\n    &:disabled,\n    &.pancake-button--disabled {\n      background-color: " + theme.colors.backgroundDisabled + ";\n      border-color: " + theme.colors.backgroundDisabled + ";\n      box-shadow: none;\n      color: white;\n      // color: " + theme.colors.textDisabled + ";\n      cursor: not-allowed;\n    }\n  ";
};
/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */
var getOpacity = function (_a) {
	var _b = _a.$isLoading, $isLoading = _b === void 0 ? false : _b;
	return $isLoading ? ".8" : "1";
};
var StyledButton = styled.button(templateObject_1$1z || (templateObject_1$1z = __makeTemplateObject(["\n  align-items: center;\n  border: 0;\n  border-radius: 16px;\n  /* box-shadow: 0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,; */\n  box-shadow: 0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), 1px 0px 0px 0px rgba(14, 14, 44, 0.4);\n  cursor: pointer;\n  display: inline-flex;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  justify-content: center;\n  letter-spacing: 0.03em;\n  line-height: 1;\n  opacity: ", ";\n  outline: 0;\n  transition: background-color 0.2s, opacity 0.2s;\n\n  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {\n    opacity: 0.8;\n  }\n\n  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n  background-size: 100% 100%;\n  ", "\n  ", "\n  ", "\n"], ["\n  align-items: center;\n  border: 0;\n  border-radius: 16px;\n  /* box-shadow: 0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,; */\n  box-shadow: 0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), 1px 0px 0px 0px rgba(14, 14, 44, 0.4);\n  cursor: pointer;\n  display: inline-flex;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  justify-content: center;\n  letter-spacing: 0.03em;\n  line-height: 1;\n  opacity: ", ";\n  outline: 0;\n  transition: background-color 0.2s, opacity 0.2s;\n\n  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {\n    opacity: 0.8;\n  }\n\n  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n  background-size: 100% 100%;\n  ", "\n  ", "\n  ", "\n"])), getOpacity, getDisabledStyles, variant$1({
	prop: "scale",
	variants: scaleVariants$2,
}), variant$1({
	variants: styleVariants$2,
}), layout, space);
var templateObject_1$1z;

var Button = function (props) {
	var startIcon = props.startIcon, endIcon = props.endIcon, external = props.external, className = props.className, isLoading = props.isLoading, disabled = props.disabled, children = props.children, rest = __rest(props, ["startIcon", "endIcon", "external", "className", "isLoading", "disabled", "children"]);
	var internalProps = external ? getExternalLinkProps() : {};
	var isDisabled = isLoading || disabled;
	var classNames = className ? [className] : [];
	if (isLoading) {
		classNames.push("pancake-button--loading");
	}
	if (isDisabled && !isLoading) {
		classNames.push("pancake-button--disabled");
	}
	return (jsx(StyledButton, __assign({ "$isLoading": isLoading, className: classNames.join(" "), disabled: isDisabled }, internalProps, rest, {
		children: jsxs(Fragment, {
			children: [isValidElement(startIcon) &&
				cloneElement(startIcon, {
					mr: "0.5rem",
				}), children, isValidElement(endIcon) &&
			cloneElement(endIcon, {
				ml: "0.5rem",
			})]
		}, void 0)
	}), void 0));
};
Button.defaultProps = {
	isLoading: false,
	external: false,
	variant: variants$5.PRIMARY,
	scale: scales$a.MD,
	disabled: false,
};

var IconButton = styled(Button)(templateObject_1$1y || (templateObject_1$1y = __makeTemplateObject(["\n  padding: 0;\n  width: ", ";\n"], ["\n  padding: 0;\n  width: ", ";\n"])), function (_a) {
	var scale = _a.scale;
	return (scale === "sm" ? "32px" : "48px");
});
var templateObject_1$1y;

styled(Button)(templateObject_1$1x || (templateObject_1$1x = __makeTemplateObject(["\n  padding: 0;\n  width: ", ";\n  height: ", ";\n  background: none;\n"], ["\n  padding: 0;\n  width: ", ";\n  height: ", ";\n  background: none;\n"])), function (_a) {
	var width = _a.width;
	return width ? width : 'auto';
}, function (_a) {
	var height = _a.height;
	return height ? height : 'auto';
});
var templateObject_1$1x;

var Icon$O = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: jsx("path", { d: "M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m58.272-487.296a16 16 0 0 1 0 22.624l-129.12 129.12 129.12 129.12a16 16 0 0 1 0 22.64l-11.312 11.312a16 16 0 0 1-22.624 0l-151.76-151.76a16 16 0 0 1 0-22.624l151.76-151.744a16 16 0 0 1 22.624 0l11.312 11.312z", "p-id": "2877" }, void 0) }), void 0));
};

var Icon$N = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z" }, void 0) }), void 0));
};

var Icon$M = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M13 19V7.83001L17.88 12.71C18.27 13.1 18.91 13.1 19.3 12.71C19.69 12.32 19.69 11.69 19.3 11.3L12.71 4.71001C12.32 4.32001 11.69 4.32001 11.3 4.71001L4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7C5.08997 13.09 5.71997 13.09 6.10997 12.7L11 7.83001V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19Z" }, void 0) }), void 0));
};

var Icon$L = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z" }, void 0) }), void 0));
};

var Icon$K = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: jsx("path", { d: "M14.2487 9.59637L10.7888 7.58546L20.1999 2.08337L29.6387 7.58546L26.1787 9.59637L20.1999 6.13313L14.2487 9.59637ZM32.1022 13.0596V17.1094L35.5622 15.0985V11.0487L32.1022 9.00986L28.6422 11.0208L32.1022 13.0596ZM16.7399 11.0487L20.1999 13.0596L23.6599 11.0487L20.1999 9.00986L16.7399 11.0487ZM29.6387 14.5119L26.1787 12.501L20.1999 15.9643L14.2487 12.501L10.7888 14.5119V18.5617L16.7399 22.0249V28.9514L20.1999 30.9623L23.6599 28.9514V22.0249L29.6387 18.5617V14.5119ZM32.1022 26.9405L26.1511 30.4038V34.4535L35.5899 28.9514V17.9752L32.1022 20.014V26.9405ZM26.1511 27.527L29.611 25.5161V21.4384L26.1511 23.4493V27.527ZM16.7399 31.8561V35.9058L20.1999 37.9168L23.6599 35.9058V31.8561L20.1999 33.867L16.7399 31.8561ZM4.80992 15.0985L8.2699 17.1094V13.0596L11.7299 11.0487L8.29758 9.00986L4.8376 11.0208V15.0985H4.80992ZM8.29758 20.014L4.8376 18.0031V28.9794L14.2764 34.4814V30.4317L8.29758 26.9405V20.014ZM14.2487 23.4773L10.7888 21.4664V25.5161L14.2487 27.527V23.4773Z", fill: "#F1BA0D" }, void 0) }), void 0));
};

var Icon$J = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M9.00012 16.2L5.50012 12.7C5.11012 12.31 4.49012 12.31 4.10012 12.7C3.71012 13.09 3.71012 13.71 4.10012 14.1L8.29012 18.29C8.68012 18.68 9.31012 18.68 9.70012 18.29L20.3001 7.70001C20.6901 7.31001 20.6901 6.69001 20.3001 6.30001C19.9101 5.91001 19.2901 5.91001 18.9001 6.30001L9.00012 16.2Z" }, void 0) }), void 0));
};

var Icon$I = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" }, void 0) }), void 0));
};

var Icon$H = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M9.29006 15.88L13.1701 12L9.29006 8.12001C8.90006 7.73001 8.90006 7.10001 9.29006 6.71001C9.68006 6.32001 10.3101 6.32001 10.7001 6.71001L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" }, void 0) }), void 0));
};

var Icon$G = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M751.616 1014.784H271.36c-140.8 0-256-115.2-256-256v-419.84c0-140.8 115.2-256 256-256h480.256c140.8 0 256 115.2 256 256v419.84c0 140.8-115.2 256-256 256z", "p-id": "3789", "data-spm-anchor-id": "a313x.7781069.0.i2" }, void 0), jsx("path", { d: "M751.616 941.056H271.36c-140.8 0-256-115.2-256-256v-419.84c0-140.8 115.2-256 256-256h480.256c140.8 0 256 115.2 256 256v419.84c0 140.8-115.2 256-256 256z", fill: "#B7DDA5", "p-id": "3790", "data-spm-anchor-id": "a313x.7781069.0.i3" }, void 0), jsx("path", { d: "M751.616 941.056H271.36c-140.8 0-256-115.2-256-256V323.584c0-140.8 115.2-256 256-256h480.256c140.8 0 256 115.2 256 256v361.984c0 140.288-115.2 255.488-256 255.488z", "p-id": "3791", "data-spm-anchor-id": "a313x.7781069.0.i0" }, void 0), jsx("path", { d: "M286.72 722.944l-1.536-1.536c-16.896-16.896-16.896-44.032 0-60.416l405.504-405.504c16.896-16.896 44.032-16.896 60.416 0l1.536 1.536c16.896 16.896 16.896 44.032 0 60.416l-405.504 405.504c-16.896 16.384-44.032 16.384-60.416 0z", fill: "#FFFFFF", "p-id": "3792" }, void 0), jsx("path", { d: "M751.104 722.432l-1.536 1.536c-16.896 16.896-44.032 16.896-60.416 0L283.136 318.976c-16.896-16.896-16.896-44.032 0-60.416l1.536-1.536c16.896-16.896 44.032-16.896 60.416 0l405.504 405.504c17.408 15.872 17.408 43.52 0.512 59.904z", fill: "#FFFFFF", "p-id": "3793", "data-spm-anchor-id": "a313x.7781069.0.i5" }, void 0)] }), void 0));
};

var Icon$F = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M999.80733706 414.70094965c-5.9202079-31.29128338-25.11399958-51.52580009-49.6952182-51.52580008l-4.26225148 0c-66.42380891 0-120.45082563-54.02577396-120.45082564-120.46821209 0-20.98960065 10.07192807-44.92253957 10.46064758-45.87384559 12.25521501-27.57671626 2.85143617-61.3704578-21.94090788-78.71503838l-124.64104577-69.39943701-1.83182465-0.89666233c-24.93516398-10.8133514-59.0642217-3.89216119-77.6569281 15.47798299-13.45490367 13.87715455-59.84041916 53.44579979-95.23498917 53.44579979-35.85531965 0-82.34391355-40.36222794-95.86712273-54.50266973-18.56041537-19.51172259-52.33677046-26.83653567-77.55384847-16.04181228l-129.07840702 70.72083332-1.93738736 1.23322125c-24.79482713 17.27503353-34.23337889 51.06753354-22.0464706 78.53868707 0.42100933 1.00470935 10.53019462 24.74266655 10.53019461 46.01418244 0 66.44243812-54.02701673 120.46821209-120.44958287 120.46821209l-5.03596465 0c-23.80874699 0-43.00378143 20.23327517-48.92026227 51.52580009-0.4408801 2.20191493-10.42587466 55.15467525-10.42587466 97.61201387 0 42.40269494 9.98499457 95.33682605 10.42587466 97.52135331 5.91648207 31.31115414 25.11151529 51.5630573 49.69397544 51.56305731l4.26225148 0c66.42256737 0 120.44958288 54.02701673 120.44958287 120.44958287 0 21.13117904-10.10794374 44.97470017-10.49542169 45.88999051-12.22044089 27.63011838-2.85143617 61.3704578 21.87135961 78.62810487l122.28140753 68.60833739 1.86659757 0.84574451c25.28786781 11.13003956 59.48523103 3.87353198 77.97609934-16.34111397 17.080053-18.45609419 63.36000577-56.77661479 97.345002-56.7766148 36.8389167 0 84.28130092 42.8982187 97.94733003 57.97133729 12.60667609 13.80636596 31.97806182 22.12098503 51.80647258 22.12098504 9.26220046 0 18.03136022-1.83430773 26.06158097-5.28434731l126.79080011-69.87384847 1.86659757-1.20093142c24.79234404-17.32595257 34.23213735-51.066292 22.01293801-78.55483199-0.42349242-1.02209582-10.53143738-24.76129575-10.53143738-46.0315689 0-66.42256737 54.02701673-120.44958288 120.45082563-120.44958287l4.96765915 0c23.84103682 0 43.06960262-20.25190317 48.98856778-51.5630573 0.42225087-2.18452848 10.42339036-55.11865958 10.42339035-97.52135331C1010.23072741 469.8556237 1000.22958794 416.90286338 999.80733706 414.70094965M937.96246779 512.31296231c0 27.43513786-5.45945706 62.69061378-7.96067371 77.41227008-99.63633474 8.17055638-176.8722523 91.42976148-176.8722523 192.12172342 0 28.42246076 9.01754243 55.64647318 13.80760751 68.16869884l-108.15959495 59.7311306c-5.31912021-5.56377824-21.02685787-21.41433583-42.40393648-37.33444047-37.54432436-27.82261582-73.53998085-42.03508773-106.928858-42.03508775-33.10572035 0-68.81697853 13.8597681-106.18495038 41.33092163-21.27275744 15.49661221-36.7681269 30.92243463-42.19281104 36.62779127l-104.03768032-58.25076823c5.07198032-13.15560319 13.84238163-40.02815332 13.84238165-68.23824589 0-100.69196193-77.23591877-183.95116703-176.83623785-192.12172342-2.53598956-14.72165751-7.99544661-49.97589068-7.99544661-77.41227008 0-27.48978275 5.45945706-62.76140237 7.99544661-77.48305988 99.60031907-8.15316992 176.83623785-91.42976148 176.83623785-192.12172341 0-28.26349469-9.01630089-55.57568338-13.80636598-68.07928104l110.83592136-60.91219126c4.8248392 4.82608075 20.63813837 20.30406375 42.26235809 35.69511326 36.84015824 26.29133441 71.92052319 39.60466091 104.39162569 39.60466091 32.15441435 0 66.98639664-13.06618539 103.57941377-38.84709267 21.80057103-15.3202597 37.57909728-30.58711726 42.15679537-34.90152933l106.67923259 59.25547759c-4.8248392 12.43280786-13.84238163 39.65682149-13.84238163 68.18484375 0 100.69196193 77.23591877 183.96855349 176.8722523 192.12172342C932.50301072 449.58509132 937.96246779 484.99953209 937.96246779 512.31296231", "p-id": "2036" }, void 0), jsx("path", { d: "M509.83472211 334.36521206c-97.7337215 0-177.25848871 79.52600876-177.25848871 177.25973027 0 97.74986642 79.52600876 177.2423438 177.25848871 177.2423438 97.7337215 0 177.25973026-79.49247739 177.25973026-177.2423438C687.09445237 413.89122082 607.5684424 334.36521206 509.83472211 334.36521206M614.82494998 511.62494233c0 57.88191949-47.08843884 104.96911679-104.99022907 104.96911678-57.9005487 0-104.95421341-47.0871973-104.95421342-104.96911678 0-57.84838812 47.05366471-104.95421341 104.95421342-104.95421342C567.73651236 406.67197045 614.82494998 453.77655421 614.82494998 511.62494233", "p-id": "2037" }, void 0)] }), void 0));
};

var Icon$E = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.13298 26.6579C3.13253 26.6921 3.1323 26.7263 3.1323 26.7606C3.1323 30.9564 6.53367 34.3577 10.7295 34.3577C14.9253 34.3577 18.3266 30.9564 18.3266 26.7606C18.3266 26.7263 18.3264 26.6921 18.326 26.6579H14.732C14.7329 26.692 14.7333 26.7262 14.7333 26.7606C14.7333 28.9719 12.9407 30.7645 10.7294 30.7645C8.51812 30.7645 6.7255 28.9719 6.7255 26.7606C6.7255 26.7262 6.72593 26.692 6.72679 26.6579H3.13298ZM10.7295 5.71436C15.6624 5.71436 19.6613 9.71326 19.6613 14.6462C19.6613 19.5791 15.6624 23.578 10.7295 23.578C5.79663 23.578 1.79773 19.5791 1.79773 14.6462C1.79773 9.71326 5.79663 5.71436 10.7295 5.71436ZM10.7295 9.3076C13.6779 9.3076 16.0681 11.6977 16.0681 14.6461C16.0681 17.5945 13.6779 19.9847 10.7295 19.9847C7.78111 19.9847 5.39096 17.5945 5.39096 14.6461C5.39096 11.6977 7.78111 9.3076 10.7295 9.3076ZM11.3454 12.9033C12.0632 13.157 12.5775 13.8415 12.5775 14.6462C12.5775 15.6668 11.7501 16.4941 10.7295 16.4941C9.70893 16.4941 8.88157 15.6668 8.88157 14.6462C8.88157 13.8416 9.39577 13.1571 10.1135 12.9034V11.6689H11.3454V12.9033ZM22.7464 16.9552C22.154 15.8735 21.8172 14.6318 21.8172 13.3115C21.8172 9.11573 25.2186 5.71436 29.4144 5.71436C33.6102 5.71436 37.0115 9.11573 37.0115 13.3115C37.0115 14.6319 36.6747 15.8735 36.0823 16.9553C35.1444 16.216 34.0807 15.6291 32.9286 15.232C33.2408 14.6618 33.4183 14.0074 33.4183 13.3115C33.4183 11.1002 31.6257 9.30761 29.4144 9.30761C27.2031 9.30761 25.4105 11.1002 25.4105 13.3115C25.4105 14.0074 25.588 14.6618 25.9002 15.2319C24.7481 15.629 23.6844 16.2159 22.7464 16.9552ZM29.4144 34.3577C34.3473 34.3577 38.3462 30.3588 38.3462 25.4259C38.3462 20.493 34.3473 16.4941 29.4144 16.4941C24.4815 16.4941 20.4826 20.493 20.4826 25.4259C20.4826 30.3588 24.4815 34.3577 29.4144 34.3577ZM29.4144 30.7645C32.3628 30.7645 34.7529 28.3743 34.7529 25.4259C34.7529 22.4775 32.3628 20.0874 29.4144 20.0874C26.466 20.0874 24.0758 22.4775 24.0758 25.4259C24.0758 28.3743 26.466 30.7645 29.4144 30.7645ZM30.0303 27.1688C30.7481 26.9151 31.2624 26.2306 31.2624 25.4259C31.2624 24.4053 30.435 23.578 29.4144 23.578C28.3938 23.578 27.5665 24.4053 27.5665 25.4259C27.5665 26.2305 28.0807 26.915 28.7984 27.1687V28.4032H30.0303V27.1688Z", fill: "#DEAE30" }, void 0) }), void 0));
};

var Icon$D = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: jsx("path", { d: "M512 1024c-284.444444 0-512-227.555556-512-512s227.555556-512 512-512 512 227.555556 512 512-227.555556 512-512 512z m0-68.266667c244.622222 0 443.733333-199.111111 443.733333-443.733333S756.622222 68.266667 512 68.266667 68.266667 267.377778 68.266667 512s199.111111 443.733333 443.733333 443.733333z m11.377778-694.044444c45.511111 0 85.333333 11.377778 113.777778 39.822222 28.444444 22.755556 45.511111 62.577778 45.511111 102.4 0 34.133333-11.377778 68.266667-28.444445 91.022222-5.688889 5.688889-28.444444 28.444444-62.577778 56.888889-11.377778 11.377778-22.755556 22.755556-28.444444 39.822222-5.688889 17.066667-11.377778 34.133333-11.377778 45.511112v11.377777H472.177778v-11.377777c0-28.444444 5.688889-51.2 17.066666-68.266667 11.377778-22.755556 39.822222-51.2 79.644445-91.022222l11.377778-11.377778c11.377778-17.066667 22.755556-34.133333 22.755555-51.2 0-22.755556-5.688889-45.511111-22.755555-56.888889-17.066667-17.066667-34.133333-22.755556-62.577778-22.755556-34.133333 0-56.888889 11.377778-73.955556 28.444445-11.377778 17.066667-17.066667 39.822222-17.066666 73.955555H352.711111c0-51.2 17.066667-96.711111 45.511111-125.155555 28.444444-34.133333 73.955556-51.2 125.155556-51.2zM512 688.355556c17.066667 0 28.444444 5.688889 39.822222 17.066666 11.377778 11.377778 17.066667 22.755556 17.066667 39.822222 0 17.066667-5.688889 28.444444-17.066667 39.822223-11.377778 11.377778-22.755556 17.066667-39.822222 17.066666-28.444444 0-51.2-22.755556-51.2-51.2 0-17.066667 5.688889-28.444444 17.066667-39.822222 5.688889-17.066667 22.755556-22.755556 34.133333-22.755555z", "p-id": "1908" }, void 0) }), void 0));
};

var Icon$C = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: jsx("path", { d: "M839.104 192.96A460.48 460.48 0 0 0 511.488 57.216a460.352 460.352 0 0 0-327.68 135.744 460.352 460.352 0 0 0-135.744 327.68c0 90.176 25.92 177.6 74.944 252.8a32.192 32.192 0 1 0 53.952-35.2 397.824 397.824 0 0 1-64.512-217.6A399.36 399.36 0 0 1 511.36 121.792c219.968 0 398.848 178.944 398.848 398.848s-178.944 398.848-398.848 398.848a398.08 398.08 0 0 1-206.08-57.28 32.256 32.256 0 0 0-33.408 55.168 462.208 462.208 0 0 0 239.424 66.56 460.288 460.288 0 0 0 327.616-135.68c87.488-87.552 135.744-203.968 135.744-327.68s-48-240.064-135.552-327.616z m-345.472 10.496a40.768 40.768 0 0 0-40.768 40.832v293.504c0 1.408 0.384 2.816 0.512 4.16a40.32 40.32 0 0 0 40.768 35.84l0.128-0.896h231.488a40.832 40.832 0 1 0 0-81.6H534.464V244.288a40.832 40.832 0 0 0-40.832-40.832z m0 0", "p-id": "2168" }, void 0) }), void 0));
};

var img$v = "data:image/png;base64,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";

var img$u = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAACYCAYAAAASlxsfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQTU4M0NENDMyMkQxMUVDQTJFOUIzN0IwODY1RUVFRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQTU4M0NENTMyMkQxMUVDQTJFOUIzN0IwODY1RUVFRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBBNTgzQ0QyMzIyRDExRUNBMkU5QjM3QjA4NjVFRUVGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBBNTgzQ0QzMzIyRDExRUNBMkU5QjM3QjA4NjVFRUVGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3LC9MgAAmn1JREFUeNrsfQd8HNW1/jczO9uLtOqSJcuy3A3YphM6obcACYQQQt5LeUkgeaQnL/+Xl+S9FJKQXkmBVJKQXmhJqKGDsY1tXHBR79L2Nu1/zuzIGGNpd8eS63z+Xe9qd/rO3O985557jmAYBhw4cODAgQMHhzZE5xI4cODAgQMHDqE7cODAgQMHDhxCd+DAgQMHDhzMBFx2VnrLdwadK+fAgQMHBymC9Y1Ye9enseY3n6L3TYf1uQpKBrovivjZt5iv/PfMbRzQdUDLKyEo6jHQjVaIQgs1P31r0Jdxeu2GJHZDdq12yS5TJc9WZFrh9ktnntAdOHDgwIGDw9dKIBI3iK9TBTdyhevgcZ8fjgROa6kJ1jVVBWXZLRO3A6l0Dv0TycxQPN2TS+ceVDO5P8PnucdF3wuHikJ34MCBAwcODk8yF6Ckci3IK+9tba25+uRFLfOWt9Zgbl0E0bAPQS8pcCJzVSNCLwDjCcM/FEst2jkSW/Ri3/C7nt8x8HQ6lvwx/L7vu90u7M+ZZA6hO3DgwIEDh8eZyDUNxkjyvbVN1Z9++xXHV5+8pBXNNSLoYxLqRRLP53WoJM8L9F7RBHjdIlrrQmhvDOHUZa3oH8ue8PiL20/4y9Mb313IZj/gioQeENgJvx943SF0Bw4cOHBw6MLQYUhuGO4gvddsk3khV5CRyf/4/NcsfPPbzjsaHU1exFKswDVIIszmshq7291M8qoBQ9BoNSCZJYLXBVQFfbjqtGVY1tZ4zK8fXfvPHb0DHxbDoS+7RHHW1boT5e7AgQMHDg5dSB5I6WHIw+thyAEbLEhkns37kck99Z5Lj3/zp68/AXURL0ZjKtyihpAX8LsBj0wk7io2fs+NPzcbLeOjJssGMiTdhyZ0zGuuwQeuOBvHL17wJT2R/JZKMp8NB0ehO3DgwIEDB3sT6C4PXBN9kIfWINdxLpAdr1CZKwJU9a83X3Xqyte/pg2JNBD162itFiFbDMnu9nTBgKIWx89ZZ/N3EjWRmiCRaid5rAms0lnBGxiJq/DQAteceQJ9J9343OYt41ow+MnZVNEOoTtw4MCBg0OY0dnlTi/eKhSpllt5SljlOWnx1G/ffPHJZ11xShtSWQML6gw0E5m7ZWsZ2l48S69xAxqTteXVl6Qikcu0K4l26VcF9I0byClE6gq7vwWkcyqRu4QLjz0W4+nMf+/o6ekRw+EfYJZc747L3YEDBw4cHPrQCtYYenlkbtByejx9+YmrFl55zamdGEsaaIoYmBMV4ZWL5MjN5HVibCZv9pib5gK9uuhvL7vZw0BdDRAM0He0grCbTSFKPM6uEMnruGDl8aiqqv62ksvWzJbj3SF0Bw4cOHBwSEP3hOHueQSuWDcM2VdyeSZUNZd3h6oCP377ucehoMIcL68NCSZR7448NYVZWiyqctF6dROZS0Tm/hDg8wkYs8LYOSKe30keWoa+89I2s2oOAY8Xpy07SqYFfqY6Ct2BAwcOHDjYO0MLmmJGu5fjztaZ0TO5j55zzMJoQ0RCPKNDJNnN09LYrT65hYShI01/eVwCvEEibiJoP5F4sLrYPG4DUV4OOgqcOI4MA53JnNS6t9oAjwL4wkz+AibSGXQ0NqOlselCPZM5ZTYyzziE7sCBAwcODm2Iboi5GFwTL1mR7tOTuppXXP5o+L2nL+1ALMNT0orzyocTBjWdyFdHUtWRMcndQJAUeo3HQCORcwsx+JyQgXpJQ4tFojmicX7lwDg3Eb2/vkjmstcwebuYiEY3g/BOXLgAgiS9T9NmXqU7hO7AgQMHDg5pcKS7lJqAe+BZ6J5Q6RUy+XNOXtxe11TjRjKrF0meXibSBvongIEYMJQA8qoBFyt0+p64HBEi7ipqbDL4iD758xBU1BBtm+71eToi1II1ROy+YmBcPmtAKRjmuHsqm0VHUz2aG+vO0wv5wExfB4fQHThw4MDBIc7oOjR/GDIRujy2hVS6f2p1bmaFkc5f3Fxvjp3zFDMmcx77LiicztXAOLUxahlh96lgk9HzPMju2tXc9HcNfTffCyytFlAfIbKvNoq53skwyKeLBV4EntZGb3xeFzoaotVQ1FMdQnfgwIEDBw725HR3AO7hzXD3PQUtUG+S/F6XI+b2h/wr6sJBpHJFd7hmpnGlRu/zxNk5mVqQiN5tQN615iSR70mbLlLsLswl5d5MLchqnuR4I61YS+tzdjhDMHaZBHxYc+rZH+9apekz63Z3CN2BAwcOHBwGEGBIIuSRdRDUfDHjy14luipXBwIdQZ/fVOQ8lM0Knclc5WlpHMnO7nIidBHcNIuKp6ZLrq3G/5jM59JyDfyeFLvgpm0Sg7NC502w210ncvfxJHdRXDLTqWAdQnfgwIEDB4eDRidlXgvPjgfg6X1yapWuG9GIV464ZcEkc7Oh2JjQzWlqkg522vPYuGwqc6mkMcHj5QX6v5+OYwtZCOuHDfSOGWaSGV2fdNgLcNF+lZzKO54305HuDqE7cODAgYPDA6JsTl/zbfkjipld9qLSDcMnu1xeUSiOn+u7ETongokGgE6fhEYicSbIQlll0gwkoaKLtrK9YCDWJSA3ICATJwOB/tbZaqB9SZIIF1kK+ZzCRxee8dN37gAHDhw4cHB4iHTdVObu7kenU+m6rhu6Od/cyss+qdJ9blLQRLXDKWCToWELdIyYM8v1kruOEZ2OcLpXIvJELxAfN5BJ62aEuxkUJ7jgDfsw/MBvMLp1I+RASHUI3YEDBw4cHDkczSqaGFHTNLPpumb+bQab7U09S5Mq/Q9FhS7Je7CekMgUlIxi0qlgkq1qBsVJ6EuIWNMnYl2Pgf5eASMpEVtpmZESx8jGQIQUvZeWVWWDtsc53Q3kVd0MuOPDlDw+CIUUBn75DmQGNsHwR4dmOreMU5zFgQMHDhwchBCQz+deQ8R9mcfjOUmW5TqTPDU9TaQ+pGlql6IoOwVBfJ6+/8eu0qSTKr3nMXi3/x35uadDTA9jV453lxSPZ/PDqWyh1udxE+dLCNCWDY5sT9BrOglR9kNJkdoeAhJ1IvRmAyfIHMH+ag3MRsU4VCj0fj6ReqFJx9q8BmEjGSAZ3QyE4z17qoDChifgG0xAWDRAy7tfkmaY0R1Cd+DAgQMHBw+NEwOyEs9lsz+vra2/bm77PPh9AUicQJ0D3zSdFLAKVVGQzWYxMjKEkdHh1ZJLepdbdj9jRo6bqlxA8NlvQalbamaPE5SMpeAlYyKZfHE4kVu67Gg3knFg+9//SGT7IAaf+R3arv0yWi94I9LDGkRapZATIEgGgnNUHGUmkxF2BbjpFpkP0/txFJPQLGTX+jwDDxsashsMZCZgWgveEDC++W9ooUPbOboWmCNt0Dw10PSZ87w7hO7AgQMHhxspkpBUsnHTFUwKFoahHzLHrhOZk/L+5bx5869tn9sJn9+3y80+CSZ3iYuRE5HOmdOGgYHeVZu3vvg0KfqLPR7v3Xy+uq8aUqwH3pfuRXLVu4DUYJGKRTIK8voT2xT/VdJ998D9+OcwP/U0nnqgAOG45ag96WLkJoqR6SytVZLehYyAFIoBcqzFOdGrmeqVFuij1k/v87pgpn6N0fftpNTP7JDxNP29cwNnrfGiMJyDtv73qJsLVKc2FTwT6x4W3F5IWs4hdAcODlLUU/shtZ9Q+90Rdu7HUPsctU9QW+PcCgcOak5BdN4J8Acj0NQ8xD3HkQ9WQ4SDyrKZz7fNnXft0qXHEFk3YWxslAh7CB6Px1xGFEVkMhnT1e3z+kw139LSSt97se6F5/9IxkCLy+UaMcfHPQF4t98Lbd5ZRZWu5mCIEjS35+cbvvfm/zvX/XvvO89px4Mv+nHfPBmv+dTD8EZCiPVpYHvBHKE356dz+lfRJPUhenVRyxOdR8xAOAM9AwbYq88Z4oJNBlKyilYi9aPbZeh5w8wJv/4rtyDa3wP30X5UdQ/rJz97U8Ity6bOLx9vcgjdgYP9iO9Tu5Tas0cgof+U2tHUvuUQ+oGFksmhYem5CNY2IznWBbcvckjQeTafXVpVVf2xeXMXYN68VnR2tuOhh4ZeUUCNXfJM5kPDA2hpbIXslpFMJhGJVGPu3Hny1q2b7iBCv5iZWHFH4C1M4LSn/wOyywXOzGaQQTAWy3ZeNCclffDNp+GRdT345QMx1F71UXQsjWJkh0EGEAezkXkhWrlfZa6qViTvnXScSoaUuiQg6jYQTxsY7wJGekmv0981oyAVLiAT0eBVRTQucmP9/d0w/vlFzGkToWhuBNyqNxCbWOFzmeLeUegOHByEOJPa66z3I0fYuf+bReaMlHMrHFiIJC/TE33IJUfM94cCDJ0HCPCdJYuXI+D3IR6P46mnnsPw8Ch8Ps8uUmdFHgqEEPfE0N27E53zF5nu90wmhZqaOgwPDV6UTCXOcLs9D5vZ40QZvswQvKKV2lUBWl343LuvOFPeuDOGfzy3Da5qAdWLzwEyQJXfMKPeY0TailasltYgAVki800FHfE+usFHirXOJ4IGsnEDsTGdjArNdM+n4gLiIyJqm1yoXSRjbGcOvZ+9FMeEMpACAXP4wCtLUN3Swrwk3D2TcXHOtDUHDmbuWfrebn9rR9C5c8bLW4/Qcz8owW52f1UtovOOh5rLH/zanFR3Jpt5U3Njyxl1tQ0oKAVs374TXV09RObeV5U4Z4UeCUcQi4+jt6/LVNJmlDstWFtXz+9v4qUkQUdak9GHMAw3EbrsQkxH9YKOhhUa7ePJF7uLY+H+KHKuGjIK6EH2AJEQKXK6qz0uInUiYK1gYNuojt5tOvq3aBjq1zDcr2OkS8covU/GNXN6Gh+HlmOS90KRZGx6YBtWX/8aHJdeh0hrAJlC0Y3vEs1UsdWY4QqqjkJ34GBm8BFqi45QUmMyr97tb925HQ4s1EIGkZZmNC47D93P3gNv+OA9VibifCEf9np9t3XOX0iqWDHnmE+Ome+Z75z/lmXZVOUykebQ8CBEUUI4FDa/CwaCCASCr8tk0g2ySx5SOSM7bcIl7KqS7pcEuEcnEkjlVTOAkIPodgxlMDeroa1RMqeahcgYkHIAcTX6RlQowwZS4wISMc78Bsj0nUDKnewCs0kuGb6Qh4gbyKWA1d+9BYF/fA6vb0tAn1OHtT1pUuav0NAz/pw4Ct2Bg31HM7XP7NmnHiHnfhy1dx6h534Qk6QIng3Fke7CQX6s7EJXFeX2JYuXB0LhMPK53LTkz0Fxo6MjmJgYQ5BJXNeRSiXos2HalgoXEb3fH3DRx1eZaph4M6W7kNeLkel+jzDSNZIYGpxIw02K3UUtkJvAeN9ObJ6QkDIUKMT+GtkTko8aXcB0HBgbBBJxg47VgKYaJomrBVrfH0B0QRD1izwoqEPY/qcfIvPNs7HsgY/hmuUKqtvbsXkob6pyk3Q5X7zGKWeNnXDmoTtwcNCBg8DkI5TUvru3Ptq5JRyUA1bU6XTqWws6F13ZOqfNjF7flSBmCrAyHx0bxtDQIFpb283lFWJXnpPO89NrorUIBUNE+OM30/a/I5PSHlM8yOgSfKIOjywVusezf9kylLqpJezBUMKNuoAK71O3YEv7KWhq68C8elLjY3mIfgEuN+BO0quV7N1f7YE7wpnfmNCJ5AcH0XPfvVBeuA8dmfU4Q96GuqAAz6mtKGgSNvQmkC0o8MnSriQzsaz5iPzTyRTnwMHBhfOoXbGXz48EQv8PS6E7hO7ABpkDmWz6E21t7TcuWrSU3e7mXPPpCH3S/d7Q0ITxiXHE4zH4fH7kSNWzG75A2xghpe71eOH1+hak0+mzJJfwYJ7IfFTxosObhGK42PX9xYe3xd990ZJqKeihv2sDOGrHeqy98w14Qvgxat93DKrCXiSJ1HliWU29Fw1VpKyTwOBLYxhY8xTyLz0L79BaNMQ24ejsdrRHg2hfHoYizMW2gQQKOQOJfA4jqRw8LtF09/tJ+Q+lNIyktbvcktA709fUIXQHDuyDe57vTfHd4U7o1L3hS1N854yhOyipzFOp5BeJzD+8csVxnEjGbKXUubU2DN1ATU0tEkToqqoSoefNMXePx2e638lQMMfFJUl4swg8KAoGevIBzPGk4RZ5epnUM5ZSrrp308Qfj232wiNJmNcZRKBvNZ78+mtwX+9ncd1t/4n2oMd8kEcSOp79we0Yf/qfqOp/DksxiI6AgiXt9WheUoOMcTR6R2LY0BcnVZ5CdcCLnKph+3DK7CREOq+ALCBdMLBhuJCkU7hZenlM3yF0Bw4OAnyS2rwpvlMO83P/CrXQFN85Cv1gIU5dm3HSmAkyz+Yy/8NkvmzpCiQSSXPsezIIrhw7mpW87CoGxo2NjX1LkqTVpNbfQrx5ptvtMd3vvB9RlF5Hr+9yC7qS1lzYnKnCEn/MzBgX9kp/GkurVz/enbljYa3bXx9woW1uFUKBGFb/+mb8re9+vOZDN6N/LImub38G8wZfwHnzwzj2+Ca0tx9vTofbMTCBp3cMYySWhCSKcLtlVPsk5BUNmwYTyKo6/LIIL5F5nBT7+sF8StGMs70uoX82fheH0B04sIcWi9CnQvwwPvcTUJx3fiSe+6EFQTjoguLS6fQtra1tHzlq+UqTmOvqoqbCTiZTcLlKUxKfj04KnZW5x+vlNLB/J2X/Z1L4tyeTyeFIpKpONKexmeZDlHj9XHp/t0fU8FIuhKCkYIEviTgRfNAj3pVXjXVrB/JfqvWrlzaHXWiuCuO1p6ro2XY3fnXx3TiqTcInzmnDkqvPhmqIUHQBm/onsGFbLxLpLHxuN/xej+ldYNd6IlvAVlLmiqab5M5H3DOhYPOY8gKp8ut9srC2WE7VIfTpwBMzFlDroNaGYgrOiKUi0tQ4RX43tY3U1uPIS/zhYObA7ubbMf0skebD9NybrHOfUoBZz16/c5scWBRSWbSsugI7Hr0DhWwMLk/gQFsXpJzT1zY1NX9k8aLl8HrcWLJ0IaLRatPd/uyzazA4OAyvt7RS57Fyjna3yqgGmcDZGKDtfD6Xy32Fc70ryi6b5j30YiZw8YsqthGpV7vyiLgUM1DOIwmbiV8vG8mol41mtBt64uqFDUHJ565y45iAiE9fczzCQT96J7KQabtdg6PY2T+C5tpqzKmPondo3LzpmczHUnlsG0nScgICbgkjKQ29CVUZTmnfliV8KOAWtawyez6TQ53QV1E7g9qp1FZiavfnnhik9gC1H1B7aIaOpZPaCnBCofKGRswZFNSeobbD6X4OehxF7SQUs8GdRq21xPK3UXs9dyTWvXao/sZ8nx5L7WTrWTudWm0JAXUPtb9Yrw9TG3dun/0PLnLiDTcQkXuRTx/YURBWr9lcblkwGPrlimOONSum5QsFJBIJTEzE4OEypkTQoijsdV3+bnL+OSl8c4zcTco4lUxyf3sPT9Oz8NVUKnma3++/guem88iXYegX0/fMDTvcgo4kKfOXcmGsCoyBl7BqsMDvEv9M7/8cy2lz4zntkv5x7aNvO6u9tSYSQM9oBj6PjE07+7FpRx9aGmpw4lGd6B0eM8k9KLsxksyhZyxtTk8bSesYSBb0eE7/AdkcX/PKwiYzgc0sj38cioTeTu0aapdYRG4HjShmuU/OEKHLVqfdamPdMx1CPyjRQO011u9zskVqlTjJOHvalVbjuo3/oHavRXI7D/Jzb7OMltOtcz/KxvP1DqsNULuf2t+sV8cdvx9JVCtkTWKfFf9uBeC55jD0ny1etIxI2U3qmUg5o2DNmvW7yJpVNY+j755IZrKUqqoqpMCJzFMpjI6PmOvEYhNIJhPvJmU+sfvypNqvzGQyXyHCf7+Z9522Ry/MGV/gLQclFf15P6Kk0hf5kogRwQuWCjPrlktCF718O+DBv3rGUmtyBQ0Br4ztfcMmeVeFAigoKp54YQuS6Ry8sgvpvIbBWAapgo7uuBYno+B7qmb80OsSX2K7wgD2SyzDoUTop1C7kdrl1GbKd/SXGdrOZ2ySObv+H3G6noMCPDxztEViZ1velugMbZs9MZdZjYd/HqP2J4vktxwE595sebhOsVQ4X4fQDG2bXfQ3WG3QMqD/YN33g85td2Qgl8u+qaNjwcqmphaObjc/k1wuuAS1SHaCG8XMra+kPVbZ7F7fsfMlInyZSF0yiZ1JfnR05IdE7D95lUupaCB8QFGUF4nQb+NN0t/X0vsvTC7D4+k7TNd7wXS/p3XXq6z1mqC49smto08/tW3shDOWNeCh58Yhm/uXzP33DU+YLng/kX1/nAyNtIpNo+oLIY90acQjdSXJEBAE7NegxEOB0Fkp3ETt6hneLic4fnoGtsNj9h+yue6fgIMuCPVIBBtkPM5Wsx/2xcboeVZjfNfa94EyYrjU60WW0THbYOX+RqsxOLDuDuf2O7yhaark8/n+a05Lm5kAxtLSENUM8oFWes3CpcQ58/qr1uUxci6L6vMFkEjEzaj2QEDiBDSaqqpfYrf7VN4Jwg+IyDP0/ueGoR8tCK5l1N1u4C/Y9Z7VJTyTqsWJoRGEJMX8e3dSlyQRLkn/j1v/tmF10CcLC5oi2Nw3bgbk8fa9btmcjlZQNBSI4AfTGrKK/umoX+rKHaA5Lgdz6tcl1O60LPmrZ2H7MxUYd9s+GEZ/dh73gwIn7icy3xOj1DYcwPNmEj9rP5H5ntiOg3/o4YjCpHt6ppEv5F9XV9ewjHOt5/OThWIMk9DT0ZXIRRbAVYhhbyNaPJecU7lGozXmuplMepLqFTrcsTJ2/wtS7B8zq64Z+tt3bZeaj1R6TpOwNRs2P5BetW+gOuBaE0vnz/7Er1dPPNObQ23Ig7BX3LWNSeOk6AUwz0CdyGjIazokYW/xAEceofuosWtk3W6W/FRgQuaa03bKNT43A8f6Pmrn2Fx32wx5CBzsO86ndgy1j6LoDp+tCKJhFMfRqYMxA+x4rPrbB/C8eXyb3e3sZuckMatnmcB/jWJ2uaXU5mPmAlIdHKQw54IL0pu4rKmxOwUaGgzRTQp9DnKBdhjCZHjaq8HT08KhCFpa5iAcDpnBcKIoeckAWbA7rU5jjNwiisIf6fVmat7dSZ2nsPF4+s58EFUus4zLK1ymxMuoDcoPqYpy/B3/2v6HX64eRfdEAVU+lxn8pptj/wLcpOajXjOo70Zef6rgN3WWUy4dbC73c/niozieNx02seVF7at4eWyyUjy7j8fKiu4z+7C+o84PLqyz2hepLbPuqdeiOKZu9zlRLMPxKWoPUnuS2tBBdt7sA30EL8dycCrXS61zP2UfthuzzvtJ69z5eUs7t9mRBSJjfyRSdX60ugaFQuFlQlezUEJtyElVgOxCxNsAr5qAKr56yppG5C/qItrbOjAw1G9mgmM3vCS5LiY+fXJy7L0Y/DaVBBaupq9Y+L0Xe2Q45PH07nwAnPO9yZ01Va5ivDx/X+MKbj7XNk03rtw8lL50y3Dm62d2RuadMT+CVF4zlbiPzqExJCFRwLk9ceVDIbf45b1xuqIaxXzus6TUDxZCd1vkXGoscYe13Pfwciaub+DVhTHKwZp9PGYuGRnZh/X/4jzuBy02WO3zFrmfa5EcR72XmiS70SLHZywy23iInfuzVvsfFCP7z7OMm+OBvQxyvhLPW+fOXo7HqfU5t9KRDUUpnFBVVR3gfOsvu8vpRjIKGPEtRFV1NbSCGwmxBl6FbF2PF3uGFU1Sa0FRzDF1nvLG0fBer/ffaZv/53LJeQ5SK5E2lvniCute5p3sKunG4+kFMhieS9Wg05fEUf4JuHia3W5j6iz+ebw86nf9JacYj96/KfZLEugXvqY9jLSioyrgxlgmj46ogGRB/1Iqr3f5XMJde5L6keByX2I9/NOROTsqPoXi9Jlv7kbm7JqvtbHPXuzb2CV3bjfsw/rdVqfn4NAg96+hOLTy1RLL/i+Krvt3U/vxIUjme+I5y6jhqWt3lliWXemcF4Ldmnc5ZO6gSGDCqoA/8AqyFXQFqlyFCbkZy9vCaGlqxKgRRUEtQBKnK8yimylii/PSJS7K0qzrxknskmeiLwOcE4IrI74iZsQssSoYZmDczlwQq4nYs5rLHGPfk5DZle6RhVjEJ178zy2xbVtHc/C7Ra7ghmjAa5ZaPbqBjA2X8AtFN1r29/U+0IR+MbVHLSUwnZI+k9qn8UqX3Vxq/2lzv2tRnBts6x6l9p19PG++sQrO437IYaQE8XMq2MO1KMt0AUicg+E25/Zw8AryI5J1yfJCr89njoNPdp+SmkbSMwfe2nmY3xSCx2VAC7chQQpX1LLTGQdmnXce5eZt+8lQkCTpHaqqnGsYxsWk0i+g/ZxOfy/UdW0qbxIHQ49P1bFzJrnevB9PJOsQU92men+1YWFmhTNUHV/dNpo11byq6agNus259CTWMbdalun7/T575UC63N9YhtXPAW9XY+/REp/EbgEOFWJf3O3XY+8lIyvBfc7jfkhiurnZ/3mYn3twmu9udG4NB68mPoPTsbZ6PT4zuQ0HwolE5pKWwYhnPo7ubEV1yAuvOIFg/XyMdi+AL9WNUCAIXVVgkArXJBLTgmSNj4uQ3W4YKSb04hzvcDhyXSAQuo7/5saGg6IU8oSeQqHwAq33V1EUf02t7PgNTjwT19wYKPhR45+AYoh7JX86pG51MvrNykrDn+dVA1GfyCr9tcTzn5D2o2w+UIT++jLInBMGvHWK73ju93X7sP91NtdzW56CfQFnNXLc7YcmprL6/2m1I/HcWZlvcm4NB3uhdFKs7jqZCE0sTBDZeVAItKJbakchsgDHzA0gTaqcxC5a6kLoXvFWjKT7kTNicOdH4FIzcGUGSbVnrCh4Ax63x0wcM6mUeV56KBQ03xfd7qZ69yiK0pnNZjtzudwV+Xz2v+lv5ptfkoJeX/qo2QWvm0Fyxl49BUBOIWNFxIfm1/rApC7THyPJPNJ51XTBK5rB5J7c35VxDgShM5nfVWKZUsk2eOzcY3P/7Oq2G+HOXoH2fTx/dk86hWEOTYhTPP/vPELPnY3Tjzi3hYOpFLoMJWx4QhhrPB0p3xyooh9zWluwal4EdWEPtvbGzMQs85qjaG9pQCy9AFsHUxg1/PD3P4TGVBcXSzWTznBwHNdBn5yeVoxs182sbZzspVioRSvOB+f64wE/j7Nz2th2IvaPp9PJjxKxP0jL/UEUhV+JojRW6TkxP8dz6hxVxY8vXh49fUmDHwUi74Kqoy+WMRfgIi2jGQU51fi7W9q/jL6/Cf2iMsj8RyXInFNyvmEfjoHnf3fZWI+9Ah+fgWvwN+dRP2Sxt+fl/1CcY30keifeDyc3u4MpCR2SIIpekUhWUFPQDRGqHERDtQ9+j4yNXROIp0ihS6JJwJl8AeNZAep4Fzw7/oHazHq4vD5oorsox1mNFXJWnXPRrNDG6/G4ta4rVupYswSKuQwTPBM9F3zh8Xafzyvm8/lz8vncOYVC4b+J6J+hZf4qCOJDtL3NezNIjN1UeUE15HRB+2hzxP2B18yLVK9sCSJV0BDLFNA9nkGW3oe8EhTaZ29czdE6PxUOY4XO039+XWIZzm399hLL3LqPx8GRu3YSh3wD+x5EqDiEflip1J3UPneEnPuehM7T8n7i3BIOpnteDMkjiHoB0b57ERYeRCa8EE+OHYdHfS04Zn4UTXXVJikPjsaxbms/9J0PwdvzdzSFRfiqWorj16TCraIr5lz2Yq1zwcwcx4VeZNljEnfR3V5U7bysqhY/42luuq6a67ndHnMOu6apDaqqXqKohUuymVxeUQr30iY/T6r9qUklzg58TZ90setR2vS9Fy2NHn/i3AhEwUAXkfhIioyQdB4cnF/tdyFL+3xhII+JrH6t1yUMHAyKYzbAwWuct3y6wBouUnFpie1ciGLhjH0l9EpxsdX2FTzOOuw854cNqXGSitwR6p14p3M7OJgOzMGGztQqQfXWQi9kERh/Hgvi69Fbcx66w2egoYYD5wSM5VzQt9+PwMYfoaFjpVn2VVHy2D0eWiOiVjkYzhpDZ5JOE5kOD0+qcd1yw8Mss8rudtOqEEWrapu6yzXPf3PGOZ7P7vMGPNls5vJMJnM5qfavyS7p/clcHgubalCDPF4YzyPilm4/c2Hg+MX1EjYMjhGJK8grBrySiKBbQl4z0BNX0B1TdyZy2gd9svjHg+EhnS3cgWKqx+nwpjI6xy/MwLFUOn7OnfjXZ+g6OMlkDh9C56mHfz1CvRM8l3eNczs42EW2mraLOHejdI3IM8eKmVW2IbqI2Ovgyo2hNrkWfamVSGaiiIT8SCViEMc2oKqxE/6qJlLf2T2MAyJka765YOVOZ6hqDqmUhskw86KS15BMsiJ3obmpGaFwxFxXpWM0dM3Ku14MeOMxecENIn+faQDE47Gbk5nMMr8kXHjenDrtjPpm/NdTa8R0On3ZnIKGsW7djMJy5/PI0Ta6IBijWSObzGMolsXXa3zi7QG3lNCNA1Nza38QOgfBXVNime+VoZzfimJZx30Bj/etrXCdT5RhjJQDdrff6zz6h7bosF55Uu1NR9i5TxI6e5j+27kVHJSh0JmAk5OK2AQHsclhuFUi8FQvUkoHpLyO5NAOeOkzX02dpczxKkJnojasBDLFzRUJ3Ov1vGI5Lm/KSnx8fByxWAy1tM08V3czy6q6rLFx4+UC6Bb5siueVXuir+/cKgmfOtGv/3cU0tk3Llpw7phLMk698GIhVBWFmk4jOTqE4e6deOzp59TufOqWpo76z3QnJrCZ9jmUUUwX/IGoQD/bhM7zdkslYUlZpFmqM5mJsUqerpasYHkuXPH/Zuha8NjMducxP6RRb71yINyOI+zcJ7NecSBczLkVHJRj/2qaOs5zw73el1OG8PxyqRBDKNeNkQRP9dKgjG1FjZSH2xeEoqp72ZJgKmw2DiY9AR6Pm5R4nD5L7zIY2FPA4NKnnE0uFhvHlpc2m+ub09qEIpFPhrsZVmJZVuxM5vV19fBH69Aw0f9hX+ucC8XO9mPbX9iIM9/1XmDFCiCbNI8mrOlomYhh5UCfPHDXXe/JdHU94+7suOeFkRH8q78PKg80iPs/b9tsEzqTYV2JZZjwx0ssw1WwmmbgeJ6pcHl2LcozdC3+6Dzghzw4ZfC/qH32CDz3l1CcbvlL5zZwUJ5CN0l0lGugc1KY3aFLfkRSmzA42oNUoBH+whB8bhlTJXAVSPJyVLvOxEsM7NIz8LsM+Lw++IMRU/mbmelcLlRXR3flf+dAuF1Z6ugYTOVsHothqXk3T2szx9dHx0bRMzCAcCiKj526yNN54zuPLWx8EbkYO3ZzSPzkNuQFogPahzcaRWj+fGDJEtS+5S0NG7/ylZ/pExNtS6LRzLKaGhgH6JrPJqGzmimVQYrHzL9RYhmuajZTc10rCYjjalNXzNB++fd13O2HPv4LL9cRONJwwxF87g5KdXCvmBtebKo5bq1u4ch0nlr2SkL3Qc70w5fagXFPA6rUCXj9YTOj3KvJXDRd6Eo2Bj+yyCte9GlNSElhhD0bUVvlh2pIUGg/tbX1qCGFTfvFK4q8WO51VveqqpkKfmJi3Gx1dQ1oa5uHteueQ/f2HTi/WsG5Jx8H+AJQd25HbPNm5EaGIbfOg6dlDuRAAAJnrKPzE/r6ILe0oGbVqpq+e+45OeH1HtAEU7NJ6G+jFiixDJcQLVXEgZO5VM0QqVYyfv7NGbwWHIi3wXnsD3kozrk7cFAkbp42Ri1I79tYwJE6rnW73bVerycqSS6fLLvy8UTijGwusyu72yuZWoI/+RLiocXwiwoRt/dVNc3NOeQuHePjgxhPZBGT5yEdWQo90gFP3QLoL3wfmfGniWkaEIlUIRQKIZNN77U2Omt2hYg+k04jl8siEAiiqqraVPVr1z6L7p6diNY3o0bK0naIukYHEevpgWfViWg+7zx42ufyAQG0PpJJIJMpjr9z9TdS7KIgdNDf/4QgHLDfZTYJvZzUrKWSzHAw2kwluN+K4tS4csAu/sUzeC3unqVrzNMAq1GMVeAnhvMVc/auQ22Mk4c1oiiWo50sbZhAsXb4THqvhBne3u5gCaLN8nVqpcadJ8d21OHlqHvD+t17qL1gvT/cwJFP7K0Lo5iCmYsrsS90prMuzuY9UslzzSJGt57lzIG++Ky2c7kcv55A5Hyc1+s9oaamZnE9ydvaurrmqkiVO0DKlaO7c1lzOchuL9avfwHpVJx+sDxyggHNeJnsNDkEd3IHqmJr4ZHpJ9VykEXdrHzGvwIHwGWzBTw/mERv1g80XACpbhEidc3wBKqhZGLIpoZJsauIeL2IVkfNOefGFBHmbFRkkhnO9Y7GxhZzXD+VSuLFTetpPxnMbW1H3HBhVM0jMzaC8OaNKBgi5na2IvP0Y0g+9iiEcBU8tTUINDVBIEMA7FHgDDqk2GkHoelrsh+6hL7MatOBO+z7Syzz+Rk8xjVlqowGzHwU759maDscR8A1uU9EsUJdo0WEk4SesTpzzoZ3D4olPBPWuitRLOupAdDL3B9P5OSa3t+fhfvuJBTLcp6CYuW8WovQuePOW8c9SO1hFMdtV+9hcC1E+XPAXdY2P1mGsfNlastRDNYs1xjh++rts2RI8fW5gNoZ1jNVU2J5Huf/DbUfoLIc65ejOESWrIDQ2Jj8ObXbZ+G8Q9b9cZLVmne7R/iaZy1CH7LukZ/s5gXzoVhuucb63csBGwmTEfzlnP9KS2yoZT5PgnVcnDzrF3t8x0bamdROo7bUIvNqa7sTltHyhNVfPrw/iIFJices0+l0O70/LRgMntzR0XFyS8ucFXUcOOYPgAm8OlINVVMwOjpKojVJ60koFDgBjGpemkjQj5FEDpuGdfjVJMIhD5G36+UroufgHn+MiF5DJqcinVeQKtCDbbihuEIwvLUQl3Ti+M7lGEgLyNKTpif6Ed90N/Rt95LlQ9tsXUBkXrtbPve9kbnEld/Q2NBkkvjo6Aji8QmMjY+agrq1da6ZpMafL2CrEMQDz2/D6+jYCqkUev/1BMT6BghsdOSHoaRTkMNheGpqiplndOpSx0f4omkHUp3PJqGfVsYyj+xGNnvDCdi3FK97otz555yJLjCD++Wa2M/v4za4Q/s3aldi+vrvXovg2bNxHorDHhdanTzHIbzR5vHPFBos4uMKekeXUGOsxOagWNnugyiOX3/eInI7+QjW45Xld/eGFda+KsVazGwKVLf1e99gkVol4Gv2ARSn1XHim3LLmnLRoWNsHOtXZrjvmIdi0hq+RzpK3CNVljHIfQVH378FxaJPZ8Ne3M1fKjB2/5/1PFaKP+/2nr2AXD/+Gkw9rDg5u+As6xn4q2VI9MwGiXOUeCqVYqX5ZiLxy1esWHHy8mXLwnPmzEEoVIVUOkPcNcREj4lsFk8++TSeWL2TuDmNkCf3fDBY7V25YuUSj8dPpJ4ngtHgjdSi4cJPoH/NQ9iy+VlIepbUh2qaTTrd6opegCEHIQZa4I82IlTbgrrqOkQbWtDcvgAd7W5s2BTHmjvvgNb1IKSRtdQ5xFHfOAc1TUvhIaXNNKrtNv7OY/acXAYoTnfL0rEODfWbY+bZXHGOu+SSzAA6nn/ukuhIyRjw0mcqbewL3RpW96zHW09bgpZ3vhuuOup2CwrnniVrI/dyc9NtmElCGxqA4XLFBRyehL6kjGWeKPH9F2f4mFaXsczp2LcqblN1EnZxstUxvc7m+qw0v2QR+2ttrM+zD74zA9eg1lLV11ukbgc8bZFTB59jc/3PluGhebPNbf/fDLpp2YvyPuz7kI/b8qzwb/jbEsuusknm/EzNVCrjdmofQzHBVMhmX/ZTSwGfuw/3SDlotrwmdgy/P1ier89bxq2/wm1cYnnnmOA3zySZFwqFdlK4H16+bPnFCxYsmEtAe/tcMyr8pe092LLlOeRiXZCNMQT8HmzensDzm7qNN59b9f3RcfnWh59XXhodHbwpkUx+sykQNgndG6yC2vMilKE1uPpdN0FXiSg39CEk5yEYKpGuCx4i1ImcC7IvhOoqP0jU03LABBHw4KaH8OJfV2Pr6gfgHtmEWq+O6vY5qKo7ziylahoFXJpVEq2pcZMEnkMsNmGq8SQ1drNzNLvk4upsYXOKmlXe1SR0wVrPoOsQEQ1sybjQpQvoWEbaKBtH5r5nSGJUwxWNQvb7d2WrMwm9ZwuU8TFAdPUdYD6fNUKPlLHMdJmmLrJcjDMFdoWWKpnKP8U3Z+Fa2Bk/Z9LjQjAzUWP7REtN1NpY91dlqNpS+HdL/c2ZgXNh42aRjfWGrY60FAHaIfQ+zEyMxPFWJ3/ODN9/bJD9vYQH4d9sbnsmXO0cB/Ah636P7OO2XNYzc55ND95TZS77RhtEPGkwsNj5uWVE2QUPvf0MxeEYdWqSFs264mou9TIBTYFcLif5/f4Hb7jhhva5bXNNtcsJWvr7B7F6zQbkMikE5TQavb2odfdDIWL+7bqC8cbzfB/77Mfxxa9+IxO993Hj40cfvewmTuTCZM7ub9kbwKLOTmz7/afQ96/b0bnyFHgajkHr4oWIVIdNIs3lSPUPDGJkcx+2j/YiPrgDmbFeaKkRItMReAQDnTVRVK1aBU+wupggxkr1yoF5qXTaTCDD3gMOptfUvDkmrig55ElV19c1oYqUuOySzfMyiZ0W9BORs5udlTkbBSIXLjeKAX8BEved0Roknn0aExs2Q4jWQaqphdjfj+olS+Ctry8qdjIU0NeNvKIVyCjaiAOM2SJ0qcT3XMJ0235U5xwoVCp4hl2UR8/wfneW4YnYE+ejOP7ZOkPHwOOI/2Fz3Tv2cb+cAfD1M3g9r7ap3ngMvtRY6mU2vQfs4t3XoKWPWmReiX0/Su0+FAOoLp9muTrLOP7zFN97bXqlctj3OemLLC/CTBnvuuWNarSxbiWFZt5iY/tdVv/C4+czkduCDcBLpzNUda0AL6lKX3ULRnasg786ZCZQ2RsMiMjmCiPxWLKdY9bdbhnDI2N4fg1xVGECc8IpSMYE/EI/2pGFj5jj+lPpJtD0K67/T+WakWzTirPO7hBriXhVIjkmTlb9qqIgVFWDlceegoGebVh/98+IaH+Ep71BuNw+847XNcPM8+4WyYggshbJkIh4/ahpbCAlvhgu2WOO5yezWfTSMcUSaRicTS6f4kB5REJBtLbUwi14sWb9JowlFAR8HjODnM8XRI1lYBSLucgIhyLw0HeTyWrE4ny24nUg40EgQueyp9lcGoVwK+ouuwr+lpbieDltBzyvPUu3f6SK1DnR2Ogwsoq+ngyCPhxgzBahlwoo4hPvneI7fiCnC6hjxVjpGHepMew6y206XUdhJ+3P31DZdJ9PlDiO6cCW+g7rWHdXsWGb23sGlSfimcQZljHQbnN9vj8mLKNmd9VWbXN75XTW/25z2z/fh+ckZB1bpfkObrG8SZMdCI+VT5fPYcE0311p87oykYzvw7lfY5G5XVXeZfUzbbsZeYJNMudYnl+XuSx7vOwMT9Ri5rJO7v7bTUnoaj6DUH0TFp7/QXR96+0oJAqkQl1TqHm3RqR3/nd/8NPPzJm76N3zO5dIigaMDU2gvTpGG9uKWs8EOMvqXDewkri4nQT2c7n8SXKwEc1SB3JC1IyE5/rlk5HepiufiJRVb23TXDS1LTCVtZLPEukrZrAak6yXCHxoZAQjyTQp93oidgE9ExPYNLQJ2RSXXlXN0qQNZEy8tjkC1SNB6FiJ41cdh+b6OjQT4frcGr7+lS/iF398HLIngmQiiSgZMYJQLLfK09o4EY3IhgYXauEyrJxkRmISF3aVS9WY0AUNR3sV1F5+MZlhZIcND8PMSuP3F8mfFyRljp2baD8ZpGPJe2WPjAON2SL0B6i9a5rvY1O4ciXLPTsVnrbWrdSlVorQvzAN8XVZ+7TzEJc7fi5YqvxtNjs2jmb/026Eztb7V20e876q82stkqr07jasfXLHutrqrFkx34x9G3p4FKULiXTadNNy1ri1No+LjZXfWb9VueBoHg6U23O65w8sd+5U3gv/LBgy+1I69Wbr/rRDvOzm55iAjZaXgAmcAxnfA/vps/+I8qe/2b1eMxloO4npPYpEXGPDKTQfdSEe/FYn3FoXdME75eKiGJjQZe29a9dtvO2h9RtWBQORlZ4F2rxEPFefzqWrh9JStZaH/4lRzfe5cyB56Yl96ini+tphiHVx+iBKxOzj0inW1LHJfOlCMfjbnLKtm6o4w2PkaR7rTkNTC2aU+/YX1+G09ghafGn0jSVxdNiNxkYZnQsXYE51LbRnH8fKc85G60Xn4dl1WxBYcSG8tOGhgV7EEwkIAa9R3bYMo9JWYaJ/kFR4EPWRGqiFAnz+ICLhiOlun8wtLxYLqBcPkQnd7IWM4k0kSejVyHJ5fjUZHgKkgSGo8QRH0sEVJftXoBOI0y2TLxCvD9FG9DuEAxzhPpuEzlYjz/leOMX3U83XZTJvmWa7TFx2xjmnU5onlHhImWAutLHPfotMyu1QLrOxD+7IP4JXT5d6EMWgnU02FVAKpQOp9oYbbBoCPCTCQx6P7PH5TqvzZ2J/o8178WdlGiGSjW3bNXo4epuDt+ZV6IHh2JKHpjAI09MQ+lQeM34+7ZQj5jSwf7d57p+i9j82RQLfIy/u8TnXR7jR8gZdZPOYflrmcmz0X4WDBxHLc6jvXSUYGCkE8Yaqn+LMo+gn06OcSL3EJqXqU4+Pdt+ooZvY7+cQxFpkA8uTalVzbqxwXmrDxJmb5tT9qCYzcXamK9sRWRF8amIkX/3cs8/PHS6MRNvb6hDguuBZDUohVyxpGqpGIZdBLhaDTuQtagVUB2S0htxoqa9Cc1BGSziEeZdegVOPWw5vYxNSwyMIzqHHvoNu0S0xpH/3NbhvOA/yuW+BkRjHiwkVlzbPhywa6O3tofNSaR8x7EyHcHb9XFwZimNxbRR3kmHwqBpEbT5vkrlgGheiqdqNIpMXlblQTPPO/4l03Wo8Iu4RGtH1q2fxxrsfxXB2HDE1BZnTxYp+LJ47H00tDUiMJwbS47F/c/u8Ww+GG2K2CF21bnyeCz1nCmt1zxuR3eyfKNExc+rWSqOuu/bSCeyO6bZ3t2UMfNjGNeBUr+WMrfLY5qU2tv8Oaj+c5vtBq/O/3KZiqbRu+9tKHM9U+JV1LtMN03zFJqGXE+HN9+H1NrbNQWa/sUnmD1qu4kpw8RRkPunOjU6z7s4pPr/epqr9Ccqf3rU7/hf23M5fQ3FaWinDzQ6hc0dcbrpOnkZbg33HBF5OQ815JXyz0Qln9QAaPYO4KvpNYIxTscqlfrbaopFnNHG5cCL3OHGbJLmEzlBICod6kqvqatXQvPOC23Hv6IXokHLf/s/6P6Ff2fr8lnjuzvv65S/dNVAHyWhetbjh9KWLl17CBKg+9BjmLp+PuRcchyqlgIaqINrnNKKjuQ5IjBEbkJ3UPq9oU1fVA7k8gkuOplcP+v/8DMbXfh6N8zcicBrprnjBJGM5l8QzTz2Cc8+9BO0di0glb8ezO7uElb3348dXNUA4lmy/1ASMn9+LJwbcyImy6WJ3iRKtr7/K9CkWbzPM7oAD5nz0fv14Bj5Fg29eNf65eTuCQhwel4Sto2OQoy1qeOfAV+L5/JfdXs+IYRzoXESzS+gMnvd7iqW6eYxw93mWSyx30e6u0FtKbI+ntJyEysey10xzFzORHDvNuhx5+282O71yamX/ygaZ87lcZ61bCnY7ikqjl6/cBzK/tozlmm2ex+9QOmsaT+dbYGPb7PZOVrhO1DLgKiVzVqDTJWHi+fPuKb5TsPchB9mmt4u39wsb633AJpl/DqWrMU6KhNny4EziLdg3sCftq5ZB1GV9xkMuv4e9WSDTJgHSqHuvlZKodg1RrxEoReYuyxPGz9oCQyIZqupjEIW84nN7pY0jl4trk0v1+b6dxtOj50k7MguMGk9C21Zoc4lGfOXKyJqVp4lrj03FseN5DfrrTx+54roPXOJzCYj+9UpkHhhG3dzrIL3hXDKJosj98jbkvFGMvrgNUoh2ntkBPZlAww03kPGRRuzBHei9+3YE5v8Bi4ib5TF6dIaoOwuQRnKLeO2pJ+P239+FXCaBSy9/E/qHBjDwwrO48bXHQVhA9EIKH4EootVheLuzEAL+XVHu3Ji0J0uw8hS2ySIu/F02k8ZgPAEtmcQt581Hw7I2aGufQDDkgZeWVUipFxLJ97U1t3/Xm3GZMwjGsgVz7F08TKetTYKTH/y7ZZmzJbrUumGq8cox1lMtBTJd58kubDtu6WemcVdNF03PQUY81e2tNtVbKZckB79dY2Pb15dJ5h023albLfdmuVhpEacdL8C1ZS77AZv334/KWObtNrdtZwz5ryidQXFv7uBSXqnp5kTzVKy9lXrlYaR2G+dwHyovHcsG/a029nVrmWQOm14W9iSWG9TI8Sin70NfyFnseJbGxr30Txz/8F0b2+ydjtBFIvCs7kNWCyMklrQ9eXCdhxR42KYRifx8+OV17KMmMr9A7I0dY3T4t4nxXCt6su1m9EJO99BOZNWA4Err+dQzqYWvleu+ppzorrrn0YfDxjs/j9TWbkQjmxH8kIFNd30M0hfvNhPIIBPD/FNOg7x5I9zVVdDzOYyteQ5iYyfi656Bnvgtmi7uRw37XHhQpZ8em0VNZKUQUWcU1NbV4x3Xvh6/uOu3eK6pFeMTE1jR2Yzq446FumkzXAE6nZEebByIYUKqxjy/f5cab2pqNBPj5POKeflisTEkyZjIF4oTYfKFAraPJXBzjYplb7oZa4eSiI9k0RTymoTtdbnwnU19zz40msLxdRFUeWSsiIbgkcgo0A+sUnftp/3sKNEJfGma74zdOvSTbex7qoQyX8DU2Zk4+OiDlhFSZbPTm86F/MYKOqrdwWkpy50q9Fabv28lRFUDe2Vhn6vAmFlusyNdi9Lziutgb7iDDb1/VbjO92zcv9yVvasMZTrduO5UxsAN+8mQWQ5709vY+PlQmcuyUDjD5nNarnGyLwmnOEaE8wtMFXhnd/7ytAWf4pofF0d/goD3JWhKqSrWZuBkEC7RQ2Q+R9o+caK2qukZYSK7ROyOrTCi3i4UyDKQBdWo88Q5nZq+sOpx4kce2lM1VYf4t5HPVZ10yoXSBZfist/9Az1f+xhc3nYI3jYEz+nCslvTSD14DzKP1iB69V2Q/AE0nHqqGYimKwpyYwpSf/8eogseQ/Rd1hF1WVeviW5XUStOGeMo80QCVdE6XHfhBfjevb9B0/xOnBMOofvXv0Nk+RJEmpqgPHAP7unPwddUiwgROhN1S0sz/H6vOW99dHTITDyjG8XxdM4Dn89lMaFoZOnm8a6LqPs/5Wz0/fjX4Bw2y1vCGEkWIBkiNsZV/9r4GP6wcxxuYvnjiNg9rPJn2fVeSjntL0Iv5a49aZrvb7Ms0Q5Mnwpyb0hN4W5cUaKj/C/Lerc7f3s6d3tnmcpxT9yL8qe02XWnFirsfO9A5e7jnKXMC2UuP5tJT661lMlsumlhEa6de+ltlnE5Hd6EqefPcx7+O/fyeWMJj9hU4LzplWQ+dFn3U6XXuKtCArUbef7jWX6eGAnr958uit5tc9vTprP2iQVszR6NApG5R8hDM6YdgdPMPo8nqkti2oj6txuSCCGr1EISVKGgRTCuVBk17jFtVfMvYegew+faKWRVN30/XxeEgl8gA7lNhZLbiqqjVqGwfSsmtj2H0Hs/T73w+4HaIQTdLgSvIS0TaMTYPb9BcE6LmRNdpN22XPRaOoJjSY1/kUz+h4uEPl5PsuG9ZHqvIuk8iF250pnU43FUNTajtbEKtd0vQtzyAsKnn4HwmWQ7PXIvfvToZqwOz8fCqqCZKS4YDBKZ+9DT04dcNm9OWQsEw2ZimxRXT+NZaYEgtg/G8I7WMDpfx+4BHyaGhhDxAC1VAYylFGRUA37ZHefEOxIM09X+0EAcLM6Fw9zlXg6mGzvnoLJPWu9PsnG8PI4/sJfPv11CFX3NeojtdHocbXzPNN/fhcqzTA1X2MHxFKx5No79/goUC6unS2zsgw2pciNC/RZhVQq+b8oJWLMzJlppQpVm2MuoxjMYHirDQ/L1ae7jq6ZRmx4bx8Rj5/kKludhq6Ns7Oc6TF/n4RW8ZfMeYZFQbtpa7geabPZvbyvjfreTRIoNvcem+pLngmd0L0JSDJKUIP4tGWKgm00zJHilmLYw+g9xKHWU9NLE6UTyLuSUKvYFCblCtbR24PVchkzvrH6cTAA3skpIP6lmAivc27Bzxyni1Ze7hh95HLlNO9G0chkw5zg62luBsXVAlPSMsRibb/2IWcglxCVJM2lO7wYkXyTTJkJP/Ufo17+QGpFszXIgQjou32+xJWeioUP1+cw54SM9PUSyGbRs34LmY2hfV9OtsOYx/P2Hd+JbmXo0zmsk0jCgCMUx8oGBIU5xS0QeQF7JY/uWjWaUe3tbO9rnzsfTW3fgOE8/3n0xGQXzF5PsiCOfTYBrzWQLmrmsZnDAoeQStSKhmzehfDBQqb1kKTOJmyzFOhW+gJejre2kStybOn8risF6U+HG3UgxamOfHME8OsV3/2t5ByoF5/euJImHXVV7RwVuVDvZ/P5Uocv2EthLFPKXKQy53TFZsc7OtvsrJOZKs9tx8NTHyliOe7i/7+HtmPSynDbNcV5v8/74aQXLXmrdt5XiS9MR1RT3iB2y/XUFxsnbbF4vjnUpZ/qnnXwRfI2mLNCiGjJkUuVnRX4PmQhdN8qy3wRzkLigVQsj6QVCplBHzCWbMkrfxRiiEM+1CKl8k7R68Cohlms2WkIvSN3ZYw3VNRd/2aRLCQUNN12PbV1deHr1WozvWAtUk83SfDEM/3xs/Oqn6MrnsPCaN8BtKMDEGJBKFOuLJ4dIEpES9y+h3vdMklVhYs/eXWVKwZnuPB509/ZhdHgIOwYHkTOq8GLLQmQX0zprHsX9n7oVn+jyINQ2H7VyMRvc5HS1rq6d5kMTS8SwceM6SKKEaHUNamvr0TUSQ0QZwS9fdxRaV1I37fYCikp2RRJBunzV4QAKigZFp20K0mUGGSSGuH/bwazQOQDjU9N8P4hXjq0fZ2MfewbEBTF9pS4mnHut91fYPK8/TvPQ2onyZQL5fQXLc7Ssnek7rFjKzUn+I1Qe+c+ei/dWuI5dw6QcV6pdN20lwyVvsvlbfLpMA44Nx8stY/c4y23KMSPTJVI6zSaBcE6FcpPo8HP2PRv76LbxjNj9Hcv1mnDlQjuFWFIoPwbAzvj/tCWZC4YfTfIwVgT+RexejRIR7qLl6SiYyl8Q8uJodoneXvWEOJReiol8rRF2ZYW86jPvMBb7zC0FMQ+1UE2tTvrX2FlrH8k3PEZbeM9n74D4vo8ideW12DYUM56+8/fCjRedjei8edhx2/ch6RoWvfUGYIhs7my2mIHNnDEmmgld4OJKZukioXLxE26TIdRMaqSut/T24+6f/Qwrjj4W5595OdZt34Dn/na7sfVFL97Tt0robBjDIjfxsVWBzU3bGBkZQiabNsuobl63Gh3zFmB+53yMj4+ZCnzr9s248/L5WFAXQaqpDUE+Np8X8WQeQTqUqhCpelUzD1UShAvJuPjkzNVkmhkcSEL/MKaf0/kpvFzvOmBT2e7ZsX0GU483csjjZEYyL+xlDstj6uj222xsT7dBgtfC3nS1X6P0eC2DM3KdYGP7/4fKSj4utPkbsHvzH2UYk3ZK8/Lx31fmsiyJ7GRD4xoHX69wndUor5rgvhhJlcQN8FQzO1MNP4jyYysmjXw7ZMv1FTaUuewbbfaT38LLqXmnQ6eNvo2v0Z+nWyChefHaqvuJvPpJ3JbM7DtZcrmJyJwnbLuFdL5FSBdq1MV1dwtZJWgE3APIKjWCavjEWOwkIZNvMJrkCUExXK7n+t/IPVVfE0ehutD8r2dwwcD7oV3wDrTPO1PIEGE+snkHLhgfQWrrFiy/li7pYD+ZPFbkvWENPrtcxTMzSV0uBsCpVuZsIlYzlzrrCFL3boOMghVnIJVNQleymOM38E9xOb4grjRyoQ1CizRoVk4z9Mk0tAaGyICYO7cdO3a+RDZBCEcddTTZEDrtogpb+0bwmiYfzl7YisG8jMY5zUVjg/afzeYRpmMq0PGoWnF7LlFoV1QtRKI/iYMIB8rl3orp606/aLkqJ8FToyrNeMaBNZt2+5unC91cgnAm54aeCnvjWo9aKmNvLjs7JHjrbsdULt46i6qWQ2U/a2PbXZh+JsPecJ3N+7OcpCc8tlxtc9vlgnOt19vYxycwe2Z/rU3PE3sLyp2auMyGEcrgLIGVZid8t83r8IMyl2Mdamd4IlHB/W4n89z9U/QzJjhDXFaX0ODuJW7MED+XzMJcZd0bnbTyAqGghoV4tlF6tv9acSB+rN4UesTwu19AyDtEZqpO8krjNQQp3yiI2TYztydJswLxZr2i4e6oGz8c6sG8Oi+Wdy7E6edegX5vLR6+7TY0t7dBDPigT0wU3eik1nn83CCyHN++E2o6XaxglssAmZT5Pj8yjNjza2Amkg+F6LMcYl3bcfal12HFsadgeKgP7kIGY20nCHJNnehTEjBc3l0uRBcZB6NjIwgGQ2bu+GQyhcVLlpLYNzA8PIp0OosROp5T2umkWttI8jUXjQs+vlwOei5Nu5bJvtChmNPSBK5EV0vMPr/oyt9/7WAl9P8poSI/vkenfLyNfazbQ3F+A1O7ibssVTGJS22e195c1j7YK7jCCVG+UOE6bIgstbEvHo/bWObvVmXz99YqNDTtGCZ6mUrS7rZ/XsHv8A4b+9iI8ouE2MEVNn+/Sgqx3Grz2P6rwuWrbRon/FyVO9WS8zjYKdf7mwqulx1P0bSGZc7wo80ziBUBspHUoBkgVwKy6YVwiS4k8kdBEAUj7B4yH8R4plMoIEBKvEXq6rteGhy6QnDlm82rHy4SuSrxlPTi8PYyzcBRrgJSJIcWHrUUixYdg9hIPzqeegiBVArhjnl0ZcaRIgLVCgWo+YKpyAVS0r6gv5iYRaXPFFLm+Tz14GlIZACMrn4OQ3f8AInhfjxz390YGhtFkMh9/uJjzPrmsXQGHkOEz1DAY9tc53zSLpYk0YxiD4cjpLZJzTe30johZDJpbNv+EtLZDFx6Ae119Gg0tMDDBdnZoOBAvUwWWj4Fr48I3SzZakDnPPDF6mwLcZDhQLjcl2H6IBOe3/unvbjWKsXqPdxm0yVZYVf77nWFL7F5bntzg/EcejuBXV9D5dWs7AbvlKPOOWr+Rhvb3oTK5y5z0pM2G/u6dzrlYoGzFNqZ187JdjaXueznbP4On53lZ2+2gyX5GTvf5u/2WIXrXG3Ty/JblM4eOIkbZvl6sVCpNDBzBCXc7arhRq1rCK3uLWSGlhUMx0OFBWh6DkH3i8gU2o2ovwuSqAp6oVrsH76GXusFWYmiVuL5cEXmYPJ1F8uNbn5cQz3x4Nlk/tzPA50RIFBdHFHVfvVtHJ0dQGbJElL1khmlHm6qh5HNkQjPIDk6juq5LUTo9UAyXXStC0bRFZ814PL50H7Bedj25Vvwj/4xDJ9+CZafeQKifh/yZgG0IHaQyq5tbIPL6IdLEuB2iSb5MvFyBThFVczCMVzZjfPLBwMBjI2PchQgJLcH7nwaC+eTFdLYgiqdTm6ELjNtg93++WyKjs2FglIkdFUXzPMg42MRDjIcCIX+5RLff2gvRsdKG/uZzJXsLaEa7t7DgODpcR029sdJTLbtRUW838a2xi2XbSXgcbDX2dhXDNOUYNwNn7T5e3/exjqzGbD2VpvbLnfO8lkoBp5Vip0oLwOgXfD0MTuJmTag/CQ6n7Z5bHbWm+3EOOyCvtLG9p+vwDh5u83jnzbOgBW5YriQ1YP0h15uHzBGgrYLgvCSIbuGBSPfJLhzzUbUnRf17FLBpTWiNkSqnGR5kNmaWhW3Kjx5r45H6IyPOYH2XCNiE5lLSV2C4Ysi29+D6vFuNJx1FjLxJNkIItRkAmMv7TDTrLJbO0jknujpx8RL2wGPNSXfsAidl5kYh4tUc8sll8A3OoYrL38Lzr30zVDy1iQFXUFeFTGS92EsPoEqrwQPqXL2jjOhc/IYnnPuI8NgMuc6v05MxFBb1wAPEb2SSUHmdLH5DF0ynkIXB7hsayKBQkGBW5aQV7jkKs/sE3m8gau1LTpYcrgfKEJnV+QFJVxVe2b3YnLtrHA/fMM/ab3n7GrN07hR90wrepnNc9tb1OmNsFfM4UcVqIhJXGnTnVqOYuHrb2fOdrcNkpoDe9Xt+lA6Sp+NOztzlitJqPJxm/fPN2Cv4Em5sGvIlBsN/lrr+a4Uj+32rJaLFTaNk7UVkC3fJ3aCS8sNHmQDvFJ3uw57SalKgZ9/DibdQfJzHB55q95Q/ZhRExhCyF1ANCSijuybCLVQIxE6daehFqChDQOPGIjvMHD8+X4El4WQ02UUiIMHYzoJfRWF7p2QXQakunoo2Syy8TgMyQWNlC+LcE7OInu90OlvYzJtqjHZ9OIYuxkcp8JLpB71e5Elsi2Q4uYcOJxH3dDyyBsevLBtAnnafsgDMhyKZVF5/DyVTpq52yWrFjy747u6uzE2Ogof7VsiAh8RZXzxroeAv/3VrI/ORgIdMNTYGNLxGKl7NxRNN6fAK1yajfYrisIJOMiwv13ut5a4qd4zxcNbaW3tLZZrit22043N8Rj1nm7Ui22e257JZDgy/302tsNjzV+3sd5sTvF6v03j75uoLGp5XzpSTnqSK7HMhbBXBIONklQZy7H79FybXpI7ZvG54wQ9dlKXcgzKnWUu+zGbx/YlG+vsj7S1dgzYTAUG7BtQ+ZABz7DYVGohLgDqEogAxXS5j61hGa0ukvcBIs+IIcob1HDNFlFyHSUFq66Ai6ePUZcmc2PGFEyXu9ziwxkfzpFgp1MPqxgf2gkXPb0jMQMvrX3GWNpxMXp6+4U52RSq21oxsHkrOi+7CPUc4FYoQPKEzAQyVW0txaNgxgwFrDrqKE5Tk2Vo2zbhxV/9CvnTX4+qpjlQ88VHnePERCJtmUh4YnTAHHv3iwUzgGxSO2dzWQR8QTPinRU7ewb6+3qRzWcRZ0VfFUVIFvGzMQ2BO/6OW2IJBI5aTL9OFRJrnkeKlLwkR5Ajpc7bVNisksx66h2aAa5MN4CDBPuT0DmaczqL5n9Nt8+rYcfd/tBuhDIVevbi6uP5uUfb2B8H4O2ZxIZzldfZ2NafUN50lz2P+xQb++JjfqLEMnwOdtJe5mCvgIndilazFQzHKDehyk02t3+XDY9MJeCYkAabRmo5SXQ4LuYcG9vnrIR/q3Ad9slea2NfBZRfJe4E2Es6xCmfy+3c7QRNfruchSQoSGghxNR61Ho3EEmGynX+DFrGn0zyNyboOoe8dRj+loQQ6ghDIF3lIrKVPLu0R+0lpLfG+pDasgO+3nFs2bgVuTDdzEoz7v/dbxXpP47T0idc7NvxizsRbmrCpqceR9OShQjM7wBIIZvBb6KVAS7gQ37bNoxv3YpCPm+OV7MK50C2hO5C9sJ/x8K33IQIfVYo5E3S5gpq4eoGyGoM47R/uKNwGxkz4Z1oZYfTFBWeKo/pLmcXOZM6B8gZCQMSrZ/N5kilK2gO+fCDgTzW/+RRvO2obfj/7H0HfGN3le6n3iXLcrdnPL2XNGZSSCcJKSwlCWQpIfQlQGDZt4S3lC2U99iFXWAfsLSQXUh2KYEHaaS3SZlkkum92ONeJFm9S/ed879/2R7HRbqWk3nsPb/c2GNd3aar+53vlO8sDdThzl1dyNktMBbySBRUzXcWlmFZXGLo5G0oy+nY/9sBOu9ntlzqSRlynM60VLj/TgLzbOHz/zENe9RaDDeddrtWHXgtY0i1svNKgIodE6/Gz2C0yvdciuqnkbGxOt++OdZZAm09yyxOVEmPdxO0tSCx/WyBv38LGb1h++g8nLBCle95m0bnhB3lkQrXvWWBr9c5GhyGg5U6Pw5i5gO5Vvwm9Al8pP1WgkpmlqZK3lqUz+Ic4X+n0WpyKc7is4X4S0fM/o0fN7jOaEWRmLjdxXrvhlIiYYj88WXUX3wm3Oe/EeE7voNwjACvwYpcsRWPvzhqsfi+b3rTOz+B/cSoowdewNrr3oejDzyClg0r0HImXQaWYONU+cggBh5/Bd2xAhKL18K6uAFGIVxngKOhGfUXXInmTWfDlk4izxXo3JzHQ1WIdTe0LkF7gw9+K3E0cytchoxQyoMg/GpzDRfDifUFoJvgdLqEBGxzUwsGBvqQJcfCZXagw2XFzlwJt27vh7FEf6eDe0ezGXZyArJKXsi+5jmHDqVc6b4Yp5G9VoDO4DbbzOkvYvq2pjoNjJl7QHl86Y/nAIBfzcBktNjUL9oZ0NZ3zl+mR6p8jw3aB7HctYAPNy0zsxd6EIt1gbbNdgOql3gtR3eeX8DvHtc/aBHoYfb8xwrWc2pkzGxaWvS0dnLcWeF6rHL3Tg3b70blokNanP2Kx6sqBHY+UxLb41fiA9ZlsLkH6OlagU/OfDNNWJxCr9FhMOYYL+8Zu94eSnpK739hm+mid74dxYI59fL9I7A57Y4Nb6yr29oIpecEQi/8ETsf3okxHxFuix+xcB5dwybDvX/caxru/xusO/8ynHvr7Vja1I7RJ+7HwM++haGf/1y0qnEPesRoR3TdBfB/9N3oWHcGbCYzjMSCWdXNa7FioOcYRg+8guWrNyOTSor55eIhRkzd7fFh5eZLcMlLd+D4SLfovmPgNUjQZxPgq2CcoTPQM8Nn6ddMJo0SF98J/RkDGq30utWGHP3uzWfoWCD2p1a4K+TrqPs2qn3hHTiN7LUAdP6C/O0sr3NV6Ez9vawZXm3Y+iXpxW+Z8X6fPjS6WiMIcw7+xSl/e7fGa/U7jYxFS+HdvRUwls0aQ4+cMni8yvfwOWipKg6jsip9LXlXdg4rFTt5l8bP/J4F/v4x2Gqpf7gblWkHXANtqaXnUP3YUCYFWkL7J6pwlG/Q+H2qpnr+Bg33YVUT/oxGAh4CxfBxM3zMKitQai5mAVe7AlsHSoU4ulI/Hr7Z4178aeNyE5R/evx4KfuLHuMVX2hzbLis3mCwGGFqQXT7fXj2e9/EUCyLSD19GW0WJJVWDAaThP0WjIbG0NpxFt5x3bvh9jUgGgnBf+m1cG+5CJFtjyIXHBbxg8CazVi8/iy4lRJstIiRpgS6pUyeGHkGPqcbz730FBwuN5qaFyGVSowLrfC0tLYVZ+PcDQ9j995niEE3EMspjrNoDrVz6J0vARfGMYCPjYWExns8EROvCZgWm1OdAPYXyKUgpl8SgM6tcFyzVxSLQYTeub+d1v9vB+ifn+ML/7lZXtMykKV9Di/+2zM8SK7R+OB7aAoI8zWttQ786xVOfafGbXPEIl3le1grwKVhXxxpmatg7WJoEwipNG3QCW297UD16minU9QDGsBpPvf6e1QeqSlalK9wXS0tk4UqAJfJRLXdKLztSMVgTkAYbXBj9cFHEH7gGHrsAZSMcz/aChnA7lew+C1A84UlRI/lXJa3roDlc2+AYc8Ly/H334ngN4+HIldd3T5G2489/Bsc2PYyjhJlizex8IobOSKsQzEvRmJJuO0pfOzmq/DJ279F4KkgHBoRAJujnwabHQ1XvV0lxQyLXAyXiiNP4Joel2uVDIzQ0+sLYAWB/v7dL6D1mqViO2X2nc/l4HB6sPWSd+DFl3Zh5/EMiiUrgbIiqty5wj0rcu5G8VHxptlhYGBPJhMosoCMKDEw0mvlajxB1kXlvc0kpF6FsEyBC+85dc7OAo+XNaBVOQ3Gpr5WgM5TkGaTeGWveTbdbS358zWzvMaM9AszvKZVHW5q6P4cVN9mx8bh9mrbd3g/WqqquyoMD16l8Zo8qOE9WieAVQI8H9a47TsrXO+tGre/TwNLrca0jtHl7+TxCtbzaGTMbA9Uub4R2ir1FVSu8MdOnxYNgccrvF6c2L1Vw/YrHnTDIi8JRz1aQt24csffw2AlNmm3innjcxlhLHJRIw7/hGAvYUD9Rxu/Hvntjus8B89ai00XwvBuWx0e3l+n/MvXQJiMF5rpodVGzDXnQ7SwCDmDn0CuAYPEwqOxGN56+Tm4+cOfIaw0EjMfFuFt8YGwc5HPIT8WHAdsBl7uB8/l46+SOOV/J+IRrF5/Dnq6jmDvzuew8czzEY9FRD6cW9+S9HrHso3YdOY52HXkMQLpRhjNCrHvPDraF4ttMBPnULvN5hAT1jivHgg0YmCwj8BbUYG+NLmvnGVnSgLQ+f3sczBDL0HNoRtUxbhWFqqpflbVwthC96Gz8pV9ltc/O8f7z67x8Xx2BubYppFhcXh/al/rmzUe21OobtZ0GQS1fIbs8c8VTl2rMULCTGJble/hVMdWjdf/xTnWqdcIuAy0T1YBnK+V41ONLXS+mSMfDRq2z22l+6t8z5UaHeVH5P5e72gXG6eUqk1PPIq5Cz7HLWd2wlpI4H2P3oy20G7EPG3EVLlfG7MvJjHxzFUyxG5SjLHVJ34DxIY8kZw/e3n3l38VzP0V8Zbf0dftix9E/X2/wRv+5TO4gYXUwl70W89CxrwScaUNwbgRA8MhtNaV8MEPfwzeQCci4SC4IFyZ4mWV/62GwVM4fng3gewMynYMyOQELOpcgX07n0c2mxEOQCadFMBusqjlMRs2nwWXrUCMvCD2wGDL0rA28lZEgZxhAnt5AhuDcj5fEMIzKoOfdIyKqotvN6tTZZnVs4gdD31hx0nqq7edNmi+wIC+fo4vyF1z3KhcPVhLrdxtmLlQ6xqNobzpcrdaQ6/PaYiuaGG1mQof2BdpvFF3YOZ58DPZQkpsvhfaitXurnA9dhjO03j8zy7g94/Dulo0FTjFUKmIzsUaj+0pDe/Rqh54RxXfJy3Ffdy/fd8COgw/rmblkpGYbj4Lb7KPmHoDjMX8hOraLEspn2eRlh+tuOKK/2w7a90LCmJf7b23gP6D5sHwcCpjeMv7kPXVI3PfIcC3HMo1f47WW96Ps7vieKJbwZ7jgxgdHUWSc9tKDpddvBUbzroIqXRWFOlZrA4BN6Upymr8L4+3DidPHMSdP/gKYtEQHE73tOeWTiWxdOUGYt957H7paQHonFPfu+tZjA73i211LFmNjjY/SoUUsWeLCLWz9CuH6MtFcNlMGrF4VDD2fF4VqGGmzwxdDeOrj71SmaHLODYXxOUUo+jzL3e503u4u8WL08QWEtD/eQ5QmWsYwxaNIDuT3boAIdOpDIs/3DM1buvlKtdnkRQt4VQWCumqYL3zNZ7HzirXZ7DVUlDGhUK/nmMdLm76koZtl6pgqVslqFdrrPrxygJ+/7j9UUtNwn/Ja1uJnfca3est0FYwyY5lpbn666GtBek/5Wc5l3E4v9r0GBeX/qEqb91qxfKBx+FKB5E32dXkbgULQ1gukVjRsHYNVt52W93y667+QjY6/FWLzfbL9d//QYdl02U4eHAM+58+hOAPfobej/0VkmsuwxU3vB2XHduB7kwRx7qP4vixowh4jbj6mjfDYvchneH541aMDPUil2VgNas+xDjxVkF+sPcEjMTU976yDVbb9EFdBnKb3YnO5Wtx4uh+pJIJcgb85AC4MNh3QrgHnroWrFixlNh8XOwrHouhp7dbRAFkiJzYfVbIwXJhXCg0KqMEpglWPonGcOCCQ+4M8gWp484hjYlVDPwda/1TB/Stc4Qh+WEz1xCNM2p4POyl752FYWnJm3FIdqqYzDpok1/lMPXRKt+jVcSk0uKdDRq3f7DK9W+EtqriBzB3wRor9WkJCT+CysV9Nmu8Tsdo6Vug79/voL0nvtLIhBPaNAPYjlS5/sc0OvdccFhpGuuvNZ5Lpfn5d2l43v4ec6sfTgF0MzqHX0BDLI68uXJ/zmCx8OjSb/W+RL6W1Y72t70DniWdX1j6rj9/p629A0e/9hW4L30zVt/+ZVi4xeyV3eh//Dm0fP5L+ME1K/Gl5jxaOlcgmszAZSti2crVolLQZLYiNDKAA3ueo806BFoyY4cEdSMBaSIRJXAN4uwtb8JAfzdikZDIqb/qGOm97BQsXrJKACyDNW/DX98iiteKxZKIBDQ2tSKTiiJD63K4PZVOYWioXxTPcY6c/1bvb0Cdzw+X2yNYOlesl4vshMocV9nTPkzk21tNBiliVxKevjJeyoeyE9CM08QWCtC/MstrrArwvxbwQTnV+Av9hVlevwTVz1pnm66YT2uKgFXrolWsfx605W33Vxju9Gtk/2zdVa7/uQUCHq2DcdiqEXrZpHEfXaj93HOmNhwuf5vG9zNzrrQwc7FG5zVbpSPD+/iUxvOp1HnlrhQt9Tp7q4g2aHGw/lDtG7ypFF5c8350t6yEJz0ExVDhI55QyeLx/Cq0/8BBJRzhhDHq1qxDy5VXofufvwmLP4AVX/oKEjtfRqh/CO1/+1UYD72CkSeehP/LX8FHm1PYiCQCS1djcQdPTgsI2HN73Di87yXBfD11fnUgSxkU5fCUTCpBQJ1G66JlyNLx93Qdht3hnM7tIPDNwUNAzIw6Eh4V4XKrzYZiIY9SUa2O57nnSjEnFOBcLhexbIMofEvRtvl9gqkTgPOUNrvNLqrcjTN0AZgMigB0jiKUZIaiNOmaSjb/Jw3oV84RWuJpa3PJSTprCOjcAz80y+taxWR+V0NArwbMLag8LzjVuIagEg3I9dA2mpItVsW6t0NbOxk7QHOpZn0D2nLnQVRegX3GPO6f/hp/77hHe9s8joftt1Ws+yWN++AWw2QV6/9AYwSH0xmV1KVwhvRfFtjxe4MGx4/vwyerPSBXOoLjbVtx92U/h7WQgi0fF0VclZjZbkeqv/en4RMn6JvjE8CXHh5FPpPFkr/4Cwx879uI7t+LpZ/7POpXrEAxHMbYyzvI5WpE3blb4C0mxSAUv98Ht68Z+/e8TP9OIpsjplwXQKFQOqUYToA6gWOOXmf2ayV2za8NDXQLSVYBUEYTJk804/XsDrcIy4eDwwTkatV6kf7OTFuAMIG2xWIihp5V29bMZiQJzLkfnZk4OxUcdldE0VxRis0YoFar45Qqe4tRES1rXAynTlpTj9sgRWrkugGcJrYQgP6NOW7Sf6xgGwyMi2pwLIfn2B9XamhpzWIHYbqCpmUaj7MaMRkuklmjcT9PV7je1+dxzSvt9+Wiu/89D+Y1m2PC9Rcf0bhtrpyPV7BevQRAj8b99NbwO3epBPP5dIXwU/OJKqIqWsWT+HMrVrgup5Vu0rifSsGQnw+dGrbPofBfVbiuls6X7ai+60X0mwdiozhBoP7k5r+GKxMWFdkVGReNOZ139Pz+dwUQuNua25EeGEDDRRezsgoiB4+g8fw3wkAMuO/ff4ZU0YAlH/wII7B4LwOq2+lA+6JFsLi8OLBrG73UL/Leja2dojitnD8vje/SiHxOLdzjFrMlK9ZjeKiX/pYVwCwmqk0CWNF2Ruzd7nQiHg2jQOzaStvn97LjwNtmHXiL2Sr+zetzNXuBwZ62Y2axnbGQGMoSDgdpCYm/iVx+SRnPn6vHSWDOA2gEoJfUaa4CyA1qZ8D4YSltf6qA/j7Mnvv+coXeea3a1W6dI6zJoKLlw/jDDMClldVWGrrkyVRaK8LZmaokd8kRlAvncc2dFTKWP2rcPj8LZlPl4lzrf8zj+Ctpp+K8/GPQnpZgs9boHud0EvdBN81zO1zTsreC9f5yDqd9ThJZ4blziPpf57GfSgoO3wXtaZn7q4iyXKph+we1nrixlIc9m8ZD53wZI3VrUR/vJqCvQHKEEMvmrx+LHzzwt8e+9x0ECMjrt26F/4orCdXsaLnkIhi49YuA0HPGWcqqj31csS1eDKTjiO8/jKGRMJw2E1raFqFosIgit0IhKx7AvvpW5IkZKxIsy19kLlzjFjRWbWPgXrf5XETHgiKcHo2EcWT/y3Dz/HUo8r0EsiYLMXCreB/nza02tX2NW9/YU0wmk4JFM+PmvLmVp7VxqJ/+zcDsdnnUVjbRtqYW5alOg1rhPp5L56iFEKcxoKBASr9OOCOT/KROnCZmrvG2vjbL61z09aMKt3VODY7nd5hbflSrmMxMIVmbxu1xMR3nYYZn8p3lw+0T87geXLswVzj8rzC7EFAlxs7AbHlYZlw/hLYRqZBAOptjwumI1fM4/rmKkC6AOpN69Tyv09p5vv88GeGY2ib5vNx2tfltfk7NpbjH+7t9nsftlA77bBEKLmb8zjz3M1ca64p5On6Vpr0YjbToOTRoPTDOmztzEcQdAdx1+Z340INvgz9+EmOeTgL72YOBPOzE3tL69aFHHw7Geno+17J61fKmeh/MHR2ov4i+2g4v3SVJ+K661gBi6ujvQd/PfobkWAIFAnJjNo76phaR64Zs7uLqdJcvgGwqDlWsRUVDfpXFXbgIjovdXB4fmls7RGsZt6HZnS5i0KMw0TqTpVs4hcCAXizGRDEch+dZ0z2XzdGSRyIeE0yaGX4ilVQjDyzTalBD9g6HAzabDXa7C3YCdT4+5gEM2GazcTxawWYxqCH3knQGCqJtrYzmhnL04LQZ0FJLQOfCldnC5P+zilDbWfM8Fr6bPlNBdEILoI+gep3yStgas55bZnjwcJHh1nnuo02C0J4ZHIavYu5WwkrDpHdPw16WSTD46Dy3P1ve8tPQPn51spPH8sChaa7fRyQjttTgOl0qwS1V5fuWSsduuhn1fA9xZfc2DcezhJaP49VDQPjeuE7eG+fW6H7/n9IpnjrtcL2M4r2zBvvgY52pP/xm6ZRpff6xKtzDFa67EtqKbq+TQNEzg1M0633DcOlNhXCy+Sz89Orf472PvheuzCiyFvecOy6SQ+BrCPzIP9h1d9/BvVv/bSB7Scpb/8U/O/cBnH3GGriWrUDYYEV8YADJ3a/AkUpgydVXovTT52DOp+FvbMFYaFRUsPtbltBPAlwC+CLnqqFKqsqDBONsODQsesLd3joRHncQgx4aPImVa84Yl2k1lOVYOTRK4F3f1I5MviBAltfhkDqDbjIRFfrssHBhnAXJXBEmu1u0tqnCMcp4eJ1BviRC+gomKb9N5NL5+AwlmMV6kIVxskr/VDtt2tZqBeh8w842gIUZW6VDKFjsfuM8j+ermLst7jyNnhW3NM2UY83P45jfL28MftBxWiIgv9RvrOFnze2C3AJU7hXnb/dV8gFbqzTHYvl5czRmUD58OKf9jnmw8snO1O9neO0jEojna5vl9eH86KgEbwaaqzU+mGeyFskQb8Tc1e4c+blcrssRjukadTmC83n5eWqJFPFT6vtQ870vynuZVc3ehNq2kELeD1yrwD3cnAriMDyL1LwVtUsDssPDwlW/lY6DWX7n+e9vn+e2uVWtUMXzTIs1yGjLD+R9b5TbWi+d4jkdwRIBVGN0EPsWnYl9Gz6MW7Z/FoOuuUs+nCagK63gYN6Z+OeQ6bHtOdMWd86DX963D4vvfxlvqaMv25alsHcshs/nQN2F59AVziAXi8Md8BLYtiE0OgCL3UnM3EOA3olsOiUqyxUZOhfs1qiGsoMjfXA6vSxsI15pbl2MRCwiWLIA1ykScwzebm89PPG4yrqVogips9Z6KhXHSDCK3Gg3TNk0Mqz5bnYJsOZCOibWo8FhJJIJtXjObBUqdmr+3CDFZdTj4/y9hQezyElrRQ65i49hIjwv1eg6aVudiqKc/FMB9C/P8bCrpsdz0zwf/F2orNhKq5jMbKpQ3dCuFMd2JeZuRxuU7FdLWuIN8mHNudKYBN/p8sC7JLNwaTwPfvD8wwLcr/85w4Psk3h1vnUM2msaONJUSerhTnm/ao0oXS+dB3Z2X8ZEX71JOndL5PaZbc5WCPl5TOS1183zGv+ZXGYzVvHg9scPzGM/mzB35TcXhb0iz79a1UKnvF8OQU1lNUB73/xUqyZU3zLPqNrUFuBK9BdOAXX+gj8xmsTDB+giBnJzvsdNqLA3UcIrMQLTQs61orX5dqvFjAi82F404fl4DrYTMfzlu+hjWUHca4T8jVIeiuVxeBxWMVWt+/gx2Jw+5Gh3WanUVlLUCvKSnGZmJDDlPDnny9sWr5UV7UD74uU4vO9lwcQZMIucJjBM5La5Io1BXa1gtyCTkhXrrGNPgB7u70a6txfNRInq7SbEkiPImenrZHGIbXBxHufWE+QQOBxO4UiUx6oKn0GZAGvOoYtBMBy5kICuSMeC1zOJfH7JViwWrqb1/g2vs9UC0BfJUOdsAFhNCHC+TPFTFTLlazRsm/Nysw2T2VmDkG8ljshl0F5nwJ/5bGp2P5Fh5b3zAPSFsp9M+TcDH9dtTM3rflSyylsX8FgelID2Q8wvRbQZ2ls0o/JcJ1dbh1+Dz+FG6Th/YIH38x4ZrZqP5v0aaO8Kmc4ekw5NpWat8TWpKi3GLDNgI+8r78BOTiIVKggsEFhZ6SkR4NiU2XId8VYfV47bzUYspb9HLTbcfiiCxd/9Oa7/0XeAC+hxNDwIxeGA02qCiZgwF6kFmhcjL1rVJBgLNg0B5vxvDoMf3PkKgXMB7Z2rRPU6h+YbmhZhT/ZZsQ0GWwZfIfZSUsbD3VxEx+uzAly+kIeBC/BKBvT3dCFP7NxNxx4tWXF2kxuhWBLBjEMKxpTQ1touWJHP5xd0PEfOgcNkFa1rigRqlaqXRNuaiY6hIIVrSkpZDL4k1rPbbORYWBEMjrzFZrO97oBei/DWNzC7itP/qHJ78wF0dh7ur2C9szR6609gdp3ypxb487pehirrFmj7/OD8iAzxdeH0sh04Vfv/chltuH2aaNCP8er8bC2NCy7L9RevvE7X42npmE1tnepZwH0yGlwnzzlWDVPUYH8nIxeG0+w+rFYDYqSG+2ap493VvMFkdiAeTSN95DF47VY02QxzL3YD6sxq7NnhcL1F9KNnkiKPzYDqM5TgCNTjr5/txuF/+S59QsTOuVI9S8DocopceSGfhtvfAAM5AaLlC4ZJkq/qbHEb7aP76F4Cdh989Q2w2e1IEmuuq28UnzoXy1ktdmL4KZlDl7cCHQ8LyVgsdpWtM6DTzzQx76HeE4iNjMLuYtBXdd3YEUmVLLQ/kwBlZtzlwjjBzif1n49XuBvV3y1GzvOrx1sYZ+jq0ZSJvM9bx+H7C2n9utf75pwvoDMLmm2gAbOXw1WyR63Mkz+V26oIK2qxuZSbmKE/twCfE+fsOYf72wV8aN+FU9MQdyzQPZfU8B5lEnBfIkOpj07DjDlS9E35+54FOn56gol6gHKBJx9L6DX8zvJ9zqIul87gdHHoPrEA++X84IWTHGY+/39foHPkz/Hv5e/BBdj+To3OCIfuq53jvr9Gx8yRl89U9aUhhukM+NH38r3o2fEgbJ7q8KZYLDpsVtt1zFwtFrMMS6s3YKu5hC5/B/7h18RxnnwIpcZmJDNZOOxOIRRjJMabJoY9eOIAbMTES1KQRfSgs6Pg8qCvrwf9J4+hc+VmeDw+5LNpkU+3cw88bScWDQvRGM6nc4FdOZXOU9d8/oBYeH56uX2N3YahE4eQTeVgtqrB50y+iGyRAJhYNBfB8bmk02kkU0n6mRJT1jjUf2q4XS2cY8S2GlXRGXZS8kVi6Ypxsl8h9ms2mxnQPfTeN/3/DujfmuW11KQvZaXGVdjt84gUVMoqtUyhKlTI/v+uxp8Ra35ziH1y3/bDNd4HS/HyVLLJqYo7F8Bx+EaV4UpMeqhvkMyYoyQ3TfOgfasE28ksOl3DY+d2tk/i1eklZqqfeo2+r/dJJ/qrmFlYJ4bpVQznY5y35WE9U9sRv13jSAhv631TPsfdNY4WsSoch6211On8F6rvSthfo+PnotmBSlcW7NLmFjO8jz72HQI0g5g+VpXnWCq91Wwx+yAU1iaGl5QZdrvLhAcLHrz0o19AOX4QRZdXAEqBGLXN4UWw7ziGew7DYreNK8SpveTEkJ1WPPvIr+gmNmHRinUCnJPJOFJJtd64ua1T9KPn81kC3gQx5onssKiI99XD7nTDSGAaCY2KGeW5XAo9B3eCU+48I10oGGULBOrErMnBMEvZ11B4FJFoBMMjg0ilErBarOPMfDx/LkLuRVEUZ5R5f2boZcdkwukpwEkOi5ccEnrvO/A623wA/UoJNDMZKzANVrlNrdObelG5FOU6jVGAxyoMn3EV/Hdq9Pkwa+ZCth1T/n68Rg9t7ue+CtPn5XLQNk5yOhuS58EV6lr6r/3ymk6nUX6PZOpToycRDQ7lTMb66FzA9b0ZXv9PaJcPrcTYieFQN4f5KxF/+UqN9huVzsq1M4AJF2fWKo++TTorv5jmPvxuDbbPzt2HafmsjLC4NWxDS0SihPkJ8bC9B5WPaJXs0UiM3ItDD34XI4eeg9PfKBh7NQ4BMeWrOSSdy2eh9lxPqKkJlm1QkCFg/aeXurDjW98i3Od1iTETAFtsViQjowTmHrCmSxnMxXCU+joc2b8LvSeOYP0b3oT6+gYCbGLgQpI1hQIx4VVrz0I0EkRfzzEB4Myiy6E6EXIvcstaEWZCXFUq1orh3sMYpm2y78Gs2kQrDxAKH05y+5lZTE5jvfeGQBPqfHVwu71wMxCrzst4yH1cmY7+ZjNOFPLxcRUnQSafS4mOua7Oj4bGRl7vRtpOA15H0wrofMazjUdl4NMi63mlxuO5DZX3uC9UuH2ycWjsx/P4XLjK/J2SNUdmWOdWGQbVGr5jlrdlDrbP6YPr58nCuBXqbOmUcOW7lkLM6d6zQzL1G2ZhLuW+bK32pHz48z0z1zQ8BorP1/C7WZLHfq10nO+v4r1H5b2j1Thk/08SYP/PHOvePc8IBT8rWEqW29ZmUkdjQH9U4/b5ef1DeS7ce85FvFpkgVmKdafGY/ihRgd8UN57d1d1wgzGnnpE+g9jz6//Bma7QwM7L3IF+FkWYrr5fFY6CerlVIFP/UOLsYgXLPX40hOHYEwkEYvGEI+OweXzIzk2KHrQy7lzXkzElPmXl5++F4G2FVi8fA2cbo/Ig3PJG4fTuUitqbkNLrcPRw/sFJXsVqv1FE133gY7AflcCeHgEDkODvTuexHpYBR2m0GdA58roLDIi2SdE+aSCnVFcV4OURDn8/qIWXtEyDwnCu/UCIRR5sw5MmEzlYv4VNnXosifG8ZJvDotLi604e0Oh5kA/Vq8jqYV0LmlZ7aisr9D9TrEddA2WIIBqdK8lnkejKLaMDdXH3+iStDlkOZfSKCda9Y3s95LUd0Ah3IR2WYZ0ahkKAzn7c+t8vzZCfm5fIh+QgIuVxrPN8dUkhEQDsuy0M4vK3jPjdK5rDSvzLnVX8l78dIqH8TsQJwpj2tMw/llJXB8VX5GfOwPaLxWd0ln4ECF6+ekk8QtqBslyHZX+F4G/TfLY6/UjsvzPEM6D6U5PvdrUfmo0nL04AfyOv4FJtQFtSoh3jnPe/cGCeyVCKtz3PknMqp1b/Vsywirx4ITT/0ImWQSVre/KnbOVigW21wu1yqVrRrGQ+0qsBvGgZ1LxLhw7IWSh/bpRSgYx1Bvt9BX57Ywln+d7GjUNbix7YFfYKC3C2dddB2x5Uakk3GkUwkRASiKASsKYXEBW+n1WDSI7qP7RGHaZA+Nz4ZFaEIj/eRwFOC0G7HjmW3ojlswVHAhVLAjb7SikM4brEaDAF4oE4Vv3PYWi8fE4BYPMXUG9PInY5R953xuNpGqMIiWNXVRwdworwnrwLNmPIO6hxwTo9H4FryOprVtjRnAx/FqgRVu0Uih8qEFU+1j8pgqYYTsjNgxs9DIdGaSDxFLFQ4H74NztMc0stM7J7EsDjc3yePgO5TznT3S83+4ygciW5cEnTKL5HRCWQ+AIxZB6VBwmJZTBi9r/Fz4+K6SjsZ1ErSY6ZTzkIVJ1+hZySYnFzMtkQ9tLZaS4ViOFnB4fZ+GbbBwDreUvF2ewyJMqL2lpHN0VALas5hf69cuGTlokayT98fDhrin2IUJRQr+fELSgTgmP6PtFUQCqrEH5H3F9QWXy+PwyGMoyn0zaO+R5314Hvt6SC58n18tnYJ2+UwwyJA3g+x+eS/yUo0QUzm/zt+pd0ugbpoCgn3yHJ6Rjm5yBsf8ECobwFN+RiqoXBhrNqeEHQtO27xLOqRtk+7DiLwPnpPPNE3Dexi4PU1t6Nr2exx88P/AFQicIjpexYbW2u0OKxecqfnzU9VdypvkH1wQ77OY4PG4kEoq2P3CM8SwWwQ7F8Vscl0udBsdHMLhXc9h3dar0dq2WLDvsVAUJWLmnPcucBidQDIei2LZirVYf8b5eObRe3DepW+FxWYXEq/lenezxYbB3uNwuNzE0sM4GHbAsPhMpMjDMJntsIbp0WcOIUl3nseuOiF8LnEC8mBoVB3sQk5BY2MzRkYGCJhzUlzGCLXLThWWYfDmSv2i+IvUrBPh+6I4+baWDgL0hIgyOJ3ONyWTCafJZE7hdTCtgP77BTiWMqtbSMu+BvuYDpB+PYlx26UzwvdFBpWnCuZi0b+V23RMcmTTNT6XF+UC+SCyTHpYTdVAZ0DjtAH3+78R2nra+Z44H/MYVDHJ2LH59ilEpvbzyKdGUH45KYrAT0XblAd85jW4/woSjO55jc77cUxII9smOa951KaA7nm5QN7rZeqWQWWjgR/A62t7MVEHYcdEy2+qFp8LA1khl8fhh76JYiEHk8U+3pZVOZYLjfW1TOqz2bRgqGXlNHHjlk6NBxQKRRD4M8IhFElg545duODCc4UyG+u3E66LY3B5bdjxyAMw2b3YcM4lUMP5OTrOAq0XEwVu3I7GwK7Qtjgff/m178GuF5/AiSN7sOGsC0RFOxelsaPAIfCBvm54bEU88tIgBrMBbGouwOyoQzRdgD99CJvoZ2+kiHybYVychnXgWVAmlUoK5l9fHxCz0ZN0DF6vV3wMDNxm+r9VTlUT7FyRoXgZpeDpck6nBW63Gw5uuUsV4HJ5fNFo5GIC9AdrcbOodQtFpMeGUEmQxQzdXmtbyIe4guqrcLVafgaGxQDO4jpcD+Gf5z5+VSMwn+lavZZWfA0/m9PlvLMLvP20/iw4lZ07A/XoevYeDO7bBldjU9VgXgZ0Yq6dBXIIxBhTs0kKrkDqoU8KkxIgJlMZBAJ+Yuge2IJBHOtPYd+eA2hq8CIWHgKPNjdbHPR7DAMnj2L5xvNht1lFYZvZaCI/II9CPotcMk7rWVXxGdpuIh5F59JV2HT2RdhNoH7G2ReM5+8tVjuG+k8imYjBUBrBtmME9EYbnDYFjrp6RCPH0WyKYctiD/aF09idUR9VLBHL/eetLW0YGh7gPnvxb399AyLRsGht4xB+STEJlTjLpKI4MRMdquCMCLHxIBubAwTgCEfGBNt3uVxcwMcRuvkBukzoJ0L9dEwGnP3eb8Pmqq8obK2bbrWwW6CGm++XIUV/Dbb5c/2y6qZbRSgs2tQY7I4++m0YRKW3ReOmBItdzD3eHJYWWXnjRGCnPKO83OLFAOh1e+GvC6DO60EBDjz++IuwEBDxwJVMsghXnQOHdjxGAJzAyo1bRa8557FZwKXEFevEzOORILx1DUIZrjzGNJPN4dobPorhgW50dR2F0+UWBXK5XB6H9rwIe34IO45Glb2jftTZsiLgkc4VYIj1oMFewii5fE4zcfqSHA7D+vF0XhbyMuw2Oyu8IZlMYFFHp+h5j8fj42Ess1GdtKZGJRTxfhayMYiUA3s4Rvj89RgY7EMsmRbX3kbbtFgsN5VKJe3PP3Yg6HpkYsMILD0Tb3j/j7D2mk9j5WXv0wFdtwU3bqnh3DNPQdtcw+1y//E2/fLqplslICDb1P74PQwf3AZnfVPVhXCnMm9j0+T3l5mxYZKoilCQSyfhdnnR1tqBMWKpmSyxdb8bA6ECtm/fg8HD2xAPjxCoAoNdh+D0BgSTFduWyWhuGeP+844la9DctgS5bHp8n8lkDK3ti+m1VXj+yXuJgdvEewaInYf7D+YTYyPJp4KrUEyT02DOi7x6nJwGXzGMeo8dsWwJDU4jLKUMAbk6hJW3y44K58zHYmPo6j4u5F3XrN6ARCItQulWm5XAUc2hC2YvQ+48mtYolPMy8Hjq0NrcCq/XJyrl+X1+Ani/P2Cl66CpY0uE2As5JEOjCCzbiks++xDWvPnDSNG/o4NzyxDogK6bVuMBLJwf5srjmeR6uZhun8bt/7t+iXXTrTJ2bvf4ERk4it2/+jxMGtrUpjB0Is7Gpgkgn5ylMUwGfQL0DNrbOpHJZdB98rgAJB7kYrJY8ezuEex49hkc3f47WbihwMP98Mz6ue9bFqmxtCtXma9afybcBJJcXDa+N4W7z0o4Y8tl6D62DwNDgxgbG8PA8T0YOvgETnivtcYc6wzIB8GjzM0OD5LhAdQhCqfDIULgDS4TTIUUktkcylX7HO4XBXCSVfPv7W0dWLd2E8JjEaRSaZhEyN0gAhP5kppXL7FSHP3GUYnly1cR0zcjk0kT8JvF391ON9ra2rnV7R1KtcWInJfPJZFPjmHL+78jwJxrIGKDQ6KmYGq6Qwd03Wplb5ZgPdPcau4Z5pYrFnzRIt2ZR3UtSrrp9t+anVtcVrVNjdipTUOb2hRIDxAiBcoiKwbDKZgzzp65QM1F7Ly1tU0Ut/E+uYiOq9Q9ThsxYAUHB+x49sFf44XH/gBfoEmAktEgtdY4F26xIJWISqaOcaCdvMNMKomOzpVwOJ3Y/dLTSETDOLn/KeSWXm9p3vJ2izUbFIPVGdBL3PoWHYTPUhRA7XLa4bMZ4VLiGIunyNmwiONkoRrOo3cuXibqDCKxiJij3tGxCGvXbEIsGkchnRTOSUmMSFVb1or0O1e0t5ETw7n0I8cOsWcDBzN6via5LPy+eng9dZcXCgV7NWDOtQQpciaWX/JRbLr+NqGOl89Up+KsA7pu1RoL2nDBx3SKSFzExm10V0AVReE+2ks07IN1BUb1S62bbpWx83D3EXQ/+wvYvR5tbWqnbrKRYNwves2Np/aeT7ZYLE4A2CkqvJ12B+x2JwL1DQgEGkVY3WEzYCSUhMm7DAOHX8TOp/6AbCohDo8L7di4Iy4Zj6iV7a86btWh4Cpvu9OD1ralGB3swbMP3IGQdys6rr4NrlwK8WQUVqdLsOlsOgNrPoJ6j0MtcCsqsNLPNlsGwXBQjFzl/Yhe9EJBFPJxmDxMrx07fhiDQ4NYtXItzt1yPuroNY4mcJEeu0fcUpfO5AjMlxDor0c0GqX1B0RbG+f1OWLB2+T6ANpmgJycy6u46sjGg2heuQWbb/hHpMNZ5FJjpzo3OqDrVmNj7YHp5E+5t5h77bkY7slJf/+kxv38h36pddOtCnb+9I8RZ8U0h6cWXkI9gZMVZVW0U8BeEew2FouhoaEF7W2LEIvHER4Lizx0gFg4F56ZiQmLfu5iTgw0ueitH8Lm869GY2sHomOjQuaVAZcDCYlYmADbpYaVy6dVVkyXY1d5Xa40P3FoB/IE4uaG9WANmoGBIcRSxMat6vjTdCYNtzEr5rKLYTCcny8oWNdoQTrUi2A0IdYtG4f6udK9RAfCw1q4OI+FYhqbWuD1+UQrnpi0VigK3fmGxna0EbPnwj1+j7+uXmyDawk4IsDHKP7uD3A64b1zht3VYgQEhwfRtuEqXPX3z4jrkE2EKwqx64Cum1bjMPv3p/n7nVBz6FP7e7nK8yYN+zmB+bZ86KbbfxN2zuH1cPdRYud31YSdS2swEWgbUO6eUsZhVhSUFXLgMvo1q9eLNrCe3i6MBkdEbzcb/03lnIroFy9kY7C76vCWd38cWy68RuSmufCNC8m47SxLIBxoahdh+zKYq+zdhFQyhkwqLgA0m0li3VlvxKq1Z6Lr2GHsoyfF7qMDIhTOhF/tDc/BaSoJ56Is45oi4O+sM2O5LYrdx7pZovWUk+Wcfb2/ASuWrxYsu6+/F329J5GKjdE5WVVRGXY2TDbRWx8Oj+IknTOz8tWr1omf7AxwLz5fM5aB9QmteM9NxNg7Zv8MS8hEglj1hutxzvv/lc7BjCI5LDBomxqsA7pulRgXyEwns8p6/iylO12/MU8ls2rYFzsNRf2S66bb3Ozc6i6z88EasXPhE3iMJqPUK58AFnUGeAnJVFrknnlUqqIIzXcC8TwSyYScTW4QKmqis6uQwrIVKwhE3cTiEwJoW4nVc76ZmX54pI8A0S7C6YXcJN0h3jcBfprAPEIAykD95rd/EGefdxVGhvrEOFSfC6JPPssDY+QjozxkhQ87mc4ikcoJ9yCZN+Atq2wwRrpwuHcEbpdTnEu5TkDoutPCzJqPKxgaFtu0ysgALzmFHIYiV+QnRMtbY0OTcADYmeFtcT/7RNjdIUCdjvuGmcm5EZlYCM66ZrzxtrvhbVmBxMiAZjDXAV23Su1rtHin/O0pzKyL7cWrx4xWYiyF+xP9cuum21ygWyJGHkCk7yS6nv05/e6uFTtnMPWW54NLgBdAabFaEIlE0RBowZLOZUKGtazVzgy3ualFAKRaQFZEOluAl8jw+s1nEABaUMxnhQPAG2TIYmYbJHD21tXD43arBXFlz4EZOgErh7KZpXOPeJ2/GUlizbEE9423Y8taoNltQCZbkPJ1imD9qbwChUAxlsogHFPV4FK0Sp3DhBuX57Fr9w70h+IE6m5xXnzM3HLGc9JNdD5Njc30mgs8gd3EbWQ8lIVAOm9ywmixixy51+sX6YhEPEbXJEz/rhNgboCa8+dzaW5u46K/m0vTiPswmOczcVryOOeWH9J+LQTmg0Itbz6mA7pucxnrcd8yzd//cpb3fB3qsJ1qjYebRPVLrptus5vJZBc9XTvv/hTS0WFi597aEX/AL/TbFcM4ujKo89Q1i8WGZUuWixB4eCyE4aFBAewBYqs8V1yNlqsFZ1liyKtWLsLKdWcjlSa2y4w7HkYiFhSheJvVjOjYCDzeesF8JzwIdYdcWJcgAGe2z0V0PE41EuwHkW4UHW2IkfsfT2bH8/wKbcNBzDhasCCezgt2bZRFffyDRWbWNtnxziUJ7Ny5A0PhBDwE3OUiOTWdkBc96jxi1Wm3kTOgOigF0YduFA6My+lUx7PS+QyPDAlw9hC75/ezIyMEcTIZMaK1vr7hTGLpq6de42IhLdbf+oF/ReuGNyMTDc+LmeuArlulxgNNprqNXAQ30yhJHkjyCQ374eEu/6xfbt10m5udOxvq0b/zAXRvvxd2X6Bmgr4S2ALceqZIRTSuQGfWGY0miJmvEDnoXD6HeCJOgDYIp8Ml+rH5b4xJHB5Ppgj8DSlccOF5aGgjNp9OCFnXOAFXNDQsBrVk0hmkUzE0tXYiSwAoet7LLgU5EzweNU7sl2edMyDz9LbY4CFELYvRk2vF/mMJDEUy5GSogusMxA6nGymzH8PhGFw20/joVrPJIFTfQmkFb1ruwk1LInjhxWdwsGcIXrdbVtOXxiMMRtGDzsIyRqEQp/obiihYE6/TsWUyKQwPD8JXp7J1vmbMzHk7fL3YuGiO/v2Fqew8m4jB7mnCqis/iVI+Q++rjUqyDui6zWWXTPO3mWa0L0Plo2ynGrfDZfTLrZtuc7PzYr4oJF45Mm4y2VBjiX43T0ETjJPYscViFkIrDQ2taGlpEQVg/Br3dDOLZlbKjLzc5sa92PFEGotbHThry7kC5LnHmnPMyVhE5MpZy324v0uAY+uiZeMz18sEnfvZ0qmkEJ1paGoTkqzJeBQxWgr1G8fz+eVJ6zzslCVkuare3boSRyOsEZ+D1WwU647G88jkicFbTeiKFNHhNuIdi2LoO/ISth88Lga2sBysCI9zCD6Xh1mhc+chMMzQCdFLBpOonOd1uOr+8JGDdL5GcmicojZADHEpqgydK925+t3pYq14+/vo7+3j7JwA3Gx1YtON32CqTs5OVFNFuw7oummxpdP8javaN075G4vI8AhOLaH2/4I6LU433XSrgJ33vXw/+nc/CWegaZ4iMtOYweiz223EUo0ClHgqGYfaly5ZKvLMDMLct82FYosXdYo54Kz7XpLslvXXDUoWa1Z1Ku1LNyqZVF4UwTGTjkeDIk/NU8yOH9opgNTtdI5XxpeN2XxodABpBvTWRYIJD3ftwkjaCmfn+UA6pLbHmdRqfB7pxmF7jgQEGlsQdK3GM4eC8FgVuAjEzQTAx0NZPNcdx4GhFAYTJSwP2PDeFTmYh17B0zt2IVMoiZ56RUraGtkhsBCgFznkDhFyZ0eG8/THjh1GKknH1qBefxtdr0JeZed8LsViSUQqbOTwuOn6kMMzHrXkKnZX4yI0LDtXTMarpTOmT1vTbTZj/cjpBGRYAemPtPxvqG1m50EtkLNr2AfPgP6Qfql1062CB7bFiRwB7L7/+0Uxi9aWjmsCdO7PNttcMNtdp0xkY0CyWa31nEPnsaI8gSyfV0RVO4eUWZyFpU6Zofp89aIQTGW1DMgmAWbZbB4WYwGr1qyHr75VKKtxgVsmlRItaD7WmWfWPNyLzuUbkGW0HA+3q2a1OzDQd0IAYyqZRmh4AN2HtyPVdj3sLg8d86jaE8/97kYep2oT2ymWCCCzSbQsXY8D+6LI7+7DWcvqEHBaEU4AfWM5tHktsJNHEU4T2FvMuGFVEU/3dmH3zgSWr1wjhswkEjFi91BD7rRNIQNvsgpnZGDgpHByWlrbBBN32T0CkzlKoRiUcXxWZKEeV88nEvGP0HX6Il0vvlh0vFbkswlYnD4AhtrdH/pXRLdZTAgkzfBaGy3fnef2uQDuKpweY0V10+20N6vLhZ4d9yIdCaKVwNBgMGnajomYY3zoOCJD/XC4bLTd+nE1OALfQDweg9fjw/LlqwVIc2U3h9LZOHfsIlBldszV4QzG/E6jUVHlX4nVW00lLF2+ysAhb6Wozksf6DlMLJYAddFycgzCgs23d64SBWSKcipPZYdhqL9b7DNE6/bsfxInjevQseEaRIJRWcBWgMVqJbZPzoDZgWyeAD3PFe850fLWseF8nDi+F0N7D2JTmxkNPg9stB4H6AtFRYTIE3T4LqsFly0qYezoMPYcKKExEICDmLnTZhIV8lwQBynr2td/klhLDs3NrapKn80mQD4nW+6USf9X0wJqNb/b7W6IRCI/od8/KDrtS8XadSXogK5bhcZu90moufFaG7eoXSwZvm666VaBZeJjqGtfhyu+9ALMVrvmcLvF4US4exeGDzyN/l33YPjYLhBZha2uyagYDHVc4MZ95ZwfZqGUSGRMyKZyFTi3aDGIMZiL9jZDWVGuJI6nkC+KgjSP1zOe67Y77ThxeJd4H+exe0YH4XT7UNfQinwhJ1rDylXeHJ7P5RWkiCU7PQ0YOv4SjgyMwXjmbTDyE0lR5VhT6SzqPF4xszwLG/KKSeSnma0XyEkwmYtoW7ERw3Y3Xhzej9XpMSxpYkfEgjSBP6cIHPRms6GAF3vTMNavxhK7Dyd7++A25eFaog6gKYrBLHTt00lyIPxo9PtRLBSFyAzXBfDxMziPw7P8XRXmMYroBIfdyXH5AC0Fuh5fNhhNQ0aTBTWufdABXbc57T6o+uy1tCFaroE6IlU33XSrNGRGbNfmaYRRapJr9tRzBTSuuggdZ16EZRffgtFDj6Bv5wM48txvzObGJofFbBVV42ORsMQoUfNOjNQhQEwcCwuzcMU3M06jCuoif1xSZV25NU0Am9EkQuesw75647ki5JdOx+Eglm+yOBCNDok551wZruK6CalMSjBwLw9k2fEUiqs+AKevHqWMqgXPVe/tASdWBBZh2/PbEctYkTNwHjtNjk5JsP9SLgPks2hqW4ykL4D9fYfRc/wkFnlKaPbaybEwI5ZI4+BoDoOWJbA5ArAoeSxa1IlksAcWxMW58XlmycGwugPwO/3IZuJwOt2CnTMzF/BdjjCMfyYTAM8iPW46V86nj0XGPjI6GL8pm07eYba577E4XC/kkpE8XyMd0HV7LeyntHDbRX2Ntvcc1Bnq3fql1U236swgp3LxMm+2Hx1EJsL5ai9WX/kBdJ57C7xtX80deeSbQygVWljjPG9U+7IZ0JmtM3sulMPsvBhlr3rJIHq2GYQ5p84/WcWNX+V+7fDosJhV3r5sHbFjtXiOhWqikVHE4xG4Cazz2QzK3LZEDoCZAHDoxC7E685B3cpzEB8OAQTE+UIJAfrZQYCeL9rgIpadieRQNLvo2MZgkK1jZVAtxsdE8V3Tsk2IBJtwgM67JxyHWckhmnciZV0CT10DTORqcBTCaicWX2gkp2RM9PqXGTqH3hnAvXaHOPYJMFfK7fcTUC7/oEiqbhADXGxobm5h0RrP6FDvp1+861OfPveWHx1z1rfvTI0NbCc2z8/GHVCnTeqArtuCGOe5eRTqY/PcDgfL/kEuuumm2+vvHoj/CrkUxnrisLoChi03f+nPhw491hTs3YFlGy8S4MQFcoroxS6hqJQj4wZVtEUh8BXgbhRFYKJgTrSulTAyOCCA0EKsvvvIHri8fvgaWpFMJOhnOwKtneg6uhcWuxuKyYKCkoE6q7wEp8crtt91dB8ar/0YHIRUOWLE3ANvz5LjQJhnJlD1+CxoamnGgZOHUbA1IpvuhqFQGBeLKUcxCtk0YXOaHIc6KHX1ou89kedcvxkurpRXCnTcVjU3zxeF2+xMati8KEVlOO/O1fKcE+fUg1JSTuXipwD7q38vy+Iyu+/oXIHunb/EY6GeFRd/6rcrfG1tN6bCCTrOxHFa/0na8x/oLX+o9hPV29Z0q8Qeh5rv3qPRIfghLWfoYK6bbqeleQxG02dyqbE92STuWnf1X7fx7PCeQ9uRjgWR50r6Ul6AGfekqz3TJSmgouaiGXyTqSTSYuiKkeDWisMH9iAei8BGyBgMDsFELNlIr3F+3u72o6G1DaHgCJLJJBSjWTgLBUUtQisS8DUu2Yxcgl4PHqftpJCJh5GKjCA9NoruE13Yt3cvdj63l14bg8PrRs61CMmcQeTRhfxssai2kZXKP0vIZZLifExKEU5yCBi0jYraQ8+RCK4LEGBdzMJiUh2XogBq/qk6QOKci2q9QDntoF4LRTg1/LeJazPpp6K2tPFEOHYSlqw9F4WhXXj8ny7HwUfvovcW4G5sWW51+j9EG/89HdMzqLIDSGfoulVqT9NyDi3vp+V6Ws7F9D3nXOzWJcGfPE08TEuffvl00+20tD+n5Vu0tDJ7TIWH0bH5Wlxw2/04+uj3MJYcRDETRyFDX+FCSuSB6wItxKD9MJlt4yw/lU4jlUoQsJthJtCPRNLY8czDGHr3Hqwjpp9KxGGh94p+biHOwsNO1AMIEqinc3kCcbOq1gZWhUujde152Hrth/D04z/FvfcdFWptdhMBNUxiJCpH1QtFA0zEeL1NDQj2phFXHHCTV2Kyq+p2avV8OcetjDeICU15TKitTq5GKNAeGOStJrXNR52HbhA/jUpJyruWxnPmU3/KEXWy7mDSa5go5c9zWoKcoNblmxEd7sbeX3wYRx9eg5Z1V2Ll5Z+AO7CYnJeBN9Jn8kaoczG4LfgRHdB1q6VxbucncuHxqEtoCcjX+N7nCpp+Wkb1S6Wbbqe9sTrj9075C88FjzKoX42WNZcgGe5FLhVFOjKAyOBhRPv2IDy4F6PBIyIHzVKrBrNNsGqWQwWxzEgihHBCQX/7Jdi3awdWE6DzLPESgWiRo9n0e44cAMRtsDqcGO7tQzSRFqNK8xkOuxtpMwXhLLSccR02DpzAfU8EMWjeDCfSovLcZCWQLBATL0ZhCB6GEulCU3YQDmOOtm9hyTYRup8M5pPK0DExEHayqc4Jl+ZZ6FjNRqjFdUU11SD6CYQ8rFGw7ck5c0WZAOxy54HRYFLV4zgFMDksLyv6WXuexXB8TZ1w+poQGu7CsYf+EQM778HGG76B9s3X0bWP8Hs2SmL0JsyR+tQBXTetNiYX3XTT7f8/W/QqMB+nrAoB+BCMZiuc/na4GzphWvYGLDFzvr2IxGgXQid3I9K3C4mhw0iGulDMxcQcc4uzEd61F2LVputQv+lGPLn3a2h88A64G1di+MQO5BinzQ7EQ8NIpOIwuwNIJ/YhODaGRlOA9mlDjovuCPkNJlpsHjgCbXAc+yFsmWdhc9DR5dNQcgmYigm4iGO4bUY47DahJ8+FcbQRtThPDnmZyGcrp/SJT4b08SlvCofWi7ASKFuIQTM0c8idUwGKvDZlvXcDMGW7kEWDBWSyaToGls21wE1OD7sWYqTs+H6Uca38dCqFXDZJ5+YW1fv9vcfRsO8hLNl6PfJpw+RuBs6pu3RA10033XTTbbLN2SdV4v7wQu5UvCewdNS1YmnLChjOu14w6nRkEJmYOhPc4WshB2ApmKyn0nmEmm/CQ3/8W1x0hRGJRBJH9ryIledsgSMTQM+B5wnQW5AnFsotbZy/bmlrFyNKMwSKhpIByegIRsJpNC49B0r/SViNJRjddpgs7QKrM4kQkpFhZFKj8PrqYLd61EI/RQ2rK2VGLFixMjnqLfvEISr1DVIch50SFsgxEwTzMBd+r6hyJ1aulC+ZHP/KbzaK9ykivF8q5Ilx54V4Dg9f4b71bDaDMDF9btFzehtEmoLXZe36fDqBbDoqztvqahDtiI6Oddh60blYesHNyMRjp6j4QVXuhA7ouummm266TbZuqHnZb1XzJi7cKoicelwFNAJ4OwGR098m4JAdgGxiVCqhlWDydeJkx99g+/afot0Tw56n74GrfQ2a2oiNH+H56iF4W5Yj3LUL9sAidJ04ioZmYuQev8iZp+NBRIb70XbNd9Fqr4cpMyxGmHL0AEYrsgUjUsN7ET36GIYPPo7gyZfUVIDLB4vdSSzfKvraRT2bIjm1ok5NKxIAFwsZ5IlNM6gqMqyeKRmx3JmGzepS9el5dCyx60wiSJCep32bhE57oZAVrXaiiM5gpn3Z6ZAcMDv9sDV1wG13w2SlxVGHYjaB0LFnkE8OqdfNbIczsBRtm86At2093M2r4G1eKRwim8dN1zAhHB12oCbZ23VA10033XTTbTrjccUJqDMZ/FW/m8Gu3BM/3fRPgxGW3Ajy/jU4YroVqcQf4Ao+ge2/+BusvuQ9BGQrMPLSw6hrWYTRYy+hlBkj9t2EkUgCrpzaImb0tKF92TKEj/0bwsT2S25i5iZiuSYDTMUsGjMvwOfpQfyaTyF00Scxsu8BjHVtRzp4FJlIHwrJCJRCSkxiE2AueuctAlDNdgL9wDJi9m2wepphdTfAYHUiBxs8+/8NSmYvgblTAD8sLjhazwSX5HGW3uh1wG6vg4fA2uptgd3XSmDcSs5NADZ3gJwJlxDNMdJiJWAvEiMPdb+MZOikOAY77cvdtBzuhiV0HAaQb8Ata4LlJ0PDwhmaBOaHaLmdlvvn+kgMWtSGbv7+kP5V0E033XT707BWWj5AywdpWV7rjRu4MtzsRUGxwJk8AHv4aTgNUfj8XiA5DIvVhFIuAYuhCH9bJ8xmA8wMkI2rYPN3CKYdP74NAz0DGMvVIZMpQokcgy19HEWLH0H/nyHh2ihy6FaXV4TRM4kYUiycEx1Cjpg1TzhjVs4gaSLQZu16u7dJhLmtTp9oqRPhd8LQkg0I//S9uDp2FzqXLsb2Az3YZdwA83ueEO15Cm2LZXd5BKqJfprMasM6ByU4QqEIIZ6iCJerP4ui1c9s94j9sHE+vZhLE9Cn1WjG9MYiM3fQ8mPImRr/cWuLztB100033XSb0QZp+Tot36blJlqugyr3XFeLjSsEZsZiHFaYkPWsQdqzEeFcFH3pICzuAgzFNExOIpa5CIzdQ7AWx+A2dcHv6YLHY4XdSezYF0BDnQHOoVcQI6COZi2IeS9AqP465M31sBRCggWnIykBngaTBZ76Dvialonfx8eNqxF3At28YMM8M72QiaGQKqnFZyYrOR9OKNkxeFxAOk+MnMsIvATexLRtBN6KxaL2oBezKCbTagvcHMRYMPtkuJLLxWz5AahV7b+s9lrrgK6bbrrpphtbSjJCXog+CzGps2m5iJYL54cX6vAWUyEKnmCusPqcp0kUmrHSXBFGAfyKwYokvR7Jx9GXGoRptE8AvMlABNXgQdF0IQqedhRblhLwumEuRAjMuUvWiHLFuugRL2QJsLOajpND7LZiko4R6CcHwUy7NvOYWNoHjzyFpu3OaJzyeJSWl2h5Hqo0tuYd6ICum2666abbVGOBqHvlwraSls20rKeF+6JX09JJi0cDZxdSqwalMAurJ8B3NxPoL0Ka4+BSpY0byYxKHsZSFqZcUq5dO8FTrlg3ma3IFYp45TABpHsMYWLopRVvg43D5bnIfDbPFJ1Ftw7ScgCq+BYPqKqZ8JYO6Lrppptuus1lR+Xym0l/44TuElpWyJ+LaemQQM+/uzUDq1IUC5NV02t4kkLy1WJD8eK/wxHP3TBbiZkvvxrOVdfAkApKhTnDbJtgxO+Vy0m5MIgfh9pZEFrI49cBXTfddNNNNy02JJcXpnltGS1LJehzTxtX0XPxHStLNkKd3si/22lx4DSaK1JKj8HWeSGsKy9XR7WyrkwymFG4ss5gZJYdlAvH+ocl8x6AWovQJcH8dTEd0HXTTTfddKu1nZDLbGaXLJ7B3isXj/ybSy5OWmwS9O3yd6vELv5pkr8bJy1yaKmY8FiSC//OMf68XLjULQM1X52a9DMJgymppMMJZE1xg4I4sXJm3WME5uX1TlvT1Lamm2666aabbrqdXqaPT9VNN9100003HdB100033XTTTTcd0HXTTTfddNNNNx3QddNNN9100003HdB100033XTT7U/G/p8AAwAgftFlGP52kgAAAABJRU5ErkJggg==";

var img$t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAACYCAYAAAASlxsfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowQTU4M0NENTMyMkQxMUVDQTJFOUIzN0IwODY1RUVFRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENUVDRDEwNTM1NjAxMUVDODBEMzhGNDdGMUFBRTEyOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENUVDRDEwNDM1NjAxMUVDODBEMzhGNDdGMUFBRTEyOSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODVmNjNlZTAtNmFiNC1jODRmLTljMTAtODQ1Nzc5MWRjMTA3IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NDIzYzJiZGMtYTRlNS1kYzRhLWIzZDUtZTQzYjQ3OTkx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";

// const ImageStyled = styled(Image)`
//   min-width: ${({ width }) => width}px;
//   min-height: ${({ height }) => height}px;
// `
// const ImageStyled = styled(Image)`
//   min-width: ${({ width }) => width}px;
//   min-height: ${({ height }) => height}px;
// `
var Icon$B = function (_a) {
	var width = _a.width, height = _a.height, props = __rest(_a, ["width", "height"]);
	return jsx(Image, __assign({ wrapperProps: { width: width, height: height }, width: width, height: height, src: img$v }, props), void 0);
};
var LogoWithText = function (_a) {
	var width = _a.width, height = _a.height, props = __rest(_a, ["width", "height"]);
	return jsx(Image, __assign({ wrapperProps: { width: width, height: height }, width: width, height: height, src: img$u }, props), void 0);
};
var LogoDarkText = function (_a) {
	var width = _a.width, height = _a.height, props = __rest(_a, ["width", "height"]);
	return jsx(Image, __assign({ wrapperProps: { width: width, height: height }, width: width, height: height, src: img$t }, props), void 0);
};

var img$s = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRjc0NDMyQjMyMkMxMUVDQkQwMDk2NUE5NjgxMzBFRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRjc0NDMyQzMyMkMxMUVDQkQwMDk2NUE5NjgxMzBFRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZGNzQ0MzI5MzIyQzExRUNCRDAwOTY1QTk2ODEzMEVEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZGNzQ0MzJBMzIyQzExRUNCRDAwOTY1QTk2ODEzMEVEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XksnSAAAZxxJREFUeNrsfQe4XFd5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";

var Icon$A = function (_a) {
	var width = _a.width, height = _a.height, props = __rest(_a, ["width", "height"]);
	return jsx(Image, __assign({ wrapperProps: { width: width, height: height }, width: width, height: height, src: img$s }, props), void 0);
};

var Icon$z = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: [jsx("path", { d: "M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z", fill: "white" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M30 0.416667H10C4.70727 0.416667 0.416667 4.70727 0.416667 10V30C0.416667 35.2927 4.70727 39.5833 10 39.5833H30C35.2927 39.5833 39.5833 35.2927 39.5833 30V10C39.5833 4.70727 35.2927 0.416667 30 0.416667ZM10 0C4.47715 0 0 4.47715 0 10V30C0 35.5228 4.47715 40 10 40H30C35.5228 40 40 35.5228 40 30V10C40 4.47715 35.5228 0 30 0H10Z", fill: "#E7E3EB" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M27.6906 18.2129C27.0383 17.5606 27.0383 16.503 27.6906 15.8508C28.3429 15.1985 29.4004 15.1985 30.0527 15.8508C30.705 16.503 30.705 17.5606 30.0527 18.2129C29.4004 18.8651 28.3429 18.8651 27.6906 18.2129ZM22.0806 23.8229C21.5914 23.3337 21.5914 22.5405 22.0806 22.0513C22.5698 21.5621 23.363 21.5621 23.8522 22.0513C24.3414 22.5405 24.3414 23.3337 23.8522 23.8229C23.363 24.3121 22.5698 24.3121 22.0806 23.8229ZM30.9385 20.8702C30.4493 20.381 30.4493 19.5879 30.9385 19.0987C31.4277 18.6094 32.2208 18.6094 32.7101 19.0987C33.1993 19.5879 33.1993 20.381 32.7101 20.8702C32.2208 21.3594 31.4277 21.3594 30.9385 20.8702ZM27.9859 23.8229C27.4966 23.3337 27.4966 22.5405 27.9859 22.0513C28.4751 21.5621 29.2682 21.5621 29.7574 22.0513C30.2466 22.5405 30.2466 23.3337 29.7574 23.8229C29.2682 24.3121 28.4751 24.3121 27.9859 23.8229ZM34.1864 23.5276C33.8602 23.2015 33.8602 22.6727 34.1864 22.3465C34.5125 22.0204 35.0413 22.0204 35.3674 22.3465C35.6936 22.6727 35.6936 23.2015 35.3674 23.5276C35.0413 23.8537 34.5125 23.8537 34.1864 23.5276ZM31.2337 26.4802C30.9076 26.1541 30.9076 25.6253 31.2337 25.2992C31.5599 24.973 32.0887 24.973 32.4148 25.2992C32.7409 25.6253 32.7409 26.1541 32.4148 26.4802C32.0887 26.8064 31.5599 26.8064 31.2337 26.4802ZM24.738 21.1655C24.0857 20.5132 24.0857 19.4557 24.738 18.8034C25.3902 18.1511 26.4478 18.1511 27.1001 18.8034C27.7523 19.4557 27.7523 20.5132 27.1001 21.1655C26.4478 21.8178 25.3902 21.8178 24.738 21.1655ZM24.738 15.2602C24.0857 14.608 24.0857 13.5504 24.738 12.8981C25.3902 12.2459 26.4478 12.2459 27.1001 12.8981C27.7523 13.5504 27.7523 14.608 27.1001 15.2602C26.4478 15.9125 25.3902 15.9125 24.738 15.2602ZM21.7853 18.2129C21.1331 17.5606 21.1331 16.503 21.7853 15.8508C22.4376 15.1985 23.4952 15.1985 24.1474 15.8508C24.7997 16.503 24.7997 17.5606 24.1474 18.2129C23.4952 18.8651 22.4376 18.8651 21.7853 18.2129ZM15.8526 18.2129C15.2004 17.5606 15.2004 16.503 15.8526 15.8508C16.5049 15.1985 17.5625 15.1985 18.2147 15.8508C18.867 16.503 18.867 17.5606 18.2147 18.2129C17.5625 18.8651 16.5049 18.8651 15.8526 18.2129ZM10.2427 23.8229C9.75345 23.3337 9.75345 22.5405 10.2427 22.0513C10.7319 21.5621 11.525 21.5621 12.0142 22.0513C12.5034 22.5405 12.5034 23.3337 12.0142 23.8229C11.525 24.3121 10.7319 24.3121 10.2427 23.8229ZM19.1005 20.8702C18.6113 20.381 18.6113 19.5879 19.1005 19.0987C19.5897 18.6094 20.3829 18.6094 20.8721 19.0987C21.3613 19.5879 21.3613 20.381 20.8721 20.8702C20.3829 21.3594 19.5897 21.3594 19.1005 20.8702ZM16.1479 23.8229C15.6587 23.3337 15.6587 22.5405 16.1479 22.0513C16.6371 21.5621 17.4303 21.5621 17.9195 22.0513C18.4087 22.5405 18.4087 23.3337 17.9195 23.8229C17.4303 24.3121 16.6371 24.3121 16.1479 23.8229ZM4.63267 23.5276C4.30653 23.2015 4.30653 22.6727 4.63267 22.3465C4.9588 22.0204 5.48758 22.0204 5.81372 22.3465C6.13985 22.6727 6.13985 23.2015 5.81372 23.5276C5.48758 23.8537 4.9588 23.8537 4.63267 23.5276ZM7.58529 26.4802C7.25915 26.1541 7.25915 25.6253 7.58529 25.2992C7.91143 24.973 8.4402 24.973 8.76634 25.2992C9.09248 25.6253 9.09248 26.1541 8.76634 26.4802C8.4402 26.8064 7.91143 26.8064 7.58529 26.4802ZM19.3958 26.4802C19.0697 26.1541 19.0697 25.6253 19.3958 25.2992C19.7219 24.973 20.2507 24.973 20.5768 25.2992C20.903 25.6253 20.903 26.1541 20.5768 26.4802C20.2507 26.8064 19.7219 26.8064 19.3958 26.4802ZM7.29003 20.8702C6.80082 20.381 6.80082 19.5879 7.29003 19.0987C7.77924 18.6094 8.5724 18.6094 9.0616 19.0987C9.55081 19.5879 9.55081 20.381 9.0616 20.8702C8.5724 21.3594 7.77924 21.3594 7.29003 20.8702ZM12.9 21.1655C12.2477 20.5132 12.2477 19.4557 12.9 18.8034C13.5523 18.1511 14.6098 18.1511 15.2621 18.8034C15.9144 19.4557 15.9144 20.5132 15.2621 21.1655C14.6098 21.8178 13.5523 21.8178 12.9 21.1655ZM12.9 15.2602C12.2477 14.608 12.2477 13.5504 12.9 12.8981C13.5523 12.2459 14.6098 12.2459 15.2621 12.8981C15.9144 13.5504 15.9144 14.608 15.2621 15.2602C14.6098 15.9125 13.5523 15.9125 12.9 15.2602ZM9.94739 18.2129C9.29512 17.5606 9.29512 16.503 9.94739 15.8508C10.5997 15.1985 11.6572 15.1985 12.3095 15.8508C12.9618 16.503 12.9618 17.5606 12.3095 18.2129C11.6572 18.8651 10.5997 18.8651 9.94739 18.2129Z", fill: "#1D222A" }, void 0)] }), void 0));
};

var Icon$y = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: [jsx("path", { d: "M36.0112 3.33337L22.1207 13.6277L24.7012 7.56091L36.0112 3.33337Z", fill: "#E17726" }, void 0), jsx("path", { d: "M4.00261 3.33337L17.7558 13.7238L15.2989 7.56091L4.00261 3.33337Z", fill: "#E27625" }, void 0), jsx("path", { d: "M31.0149 27.2023L27.3227 32.8573L35.2287 35.0397L37.4797 27.3258L31.0149 27.2023Z", fill: "#E27625" }, void 0), jsx("path", { d: "M2.53386 27.3258L4.77116 35.0397L12.6772 32.8573L8.9987 27.2023L2.53386 27.3258Z", fill: "#E27625" }, void 0), jsx("path", { d: "M12.2518 17.6496L10.0419 20.9712L17.8793 21.3281L17.6048 12.8867L12.2518 17.6496Z", fill: "#E27625" }, void 0), jsx("path", { d: "M27.762 17.6494L22.3129 12.7905L22.1207 21.3279L29.9581 20.9711L27.762 17.6494Z", fill: "#E27625" }, void 0), jsx("path", { d: "M12.6772 32.8574L17.3989 30.5652L13.336 27.3809L12.6772 32.8574Z", fill: "#E27625" }, void 0), jsx("path", { d: "M22.6009 30.5652L27.3226 32.8574L26.6637 27.3809L22.6009 30.5652Z", fill: "#E27625" }, void 0), jsx("path", { d: "M27.3226 32.8575L22.6009 30.5653L22.9715 33.6399L22.9303 34.9301L27.3226 32.8575Z", fill: "#D5BFB2" }, void 0), jsx("path", { d: "M12.6772 32.8575L17.0694 34.9301L17.042 33.6399L17.3989 30.5653L12.6772 32.8575Z", fill: "#D5BFB2" }, void 0), jsx("path", { d: "M17.1518 25.3495L13.2262 24.1965L15.9988 22.92L17.1518 25.3495Z", fill: "#233447" }, void 0), jsx("path", { d: "M22.848 25.3495L24.001 22.92L26.801 24.1965L22.848 25.3495Z", fill: "#233447" }, void 0), jsx("path", { d: "M12.6773 32.8573L13.3635 27.2023L8.99876 27.3258L12.6773 32.8573Z", fill: "#CC6228" }, void 0), jsx("path", { d: "M26.6364 27.2023L27.3227 32.8573L31.0149 27.3258L26.6364 27.2023Z", fill: "#CC6228" }, void 0), jsx("path", { d: "M29.9581 20.9709L22.1207 21.3278L22.8482 25.3495L24.0011 22.92L26.8012 24.1965L29.9581 20.9709Z", fill: "#CC6228" }, void 0), jsx("path", { d: "M13.2263 24.1965L15.9989 22.92L17.1519 25.3495L17.8793 21.3278L10.0419 20.9709L13.2263 24.1965Z", fill: "#CC6228" }, void 0), jsx("path", { d: "M10.0419 20.9709L13.3361 27.3809L13.2263 24.1965L10.0419 20.9709Z", fill: "#E27525" }, void 0), jsx("path", { d: "M26.8011 24.1965L26.6638 27.3809L29.958 20.9709L26.8011 24.1965Z", fill: "#E27525" }, void 0), jsx("path", { d: "M17.8793 21.3278L17.1519 25.3494L18.0715 30.0985L18.2637 23.8396L17.8793 21.3278Z", fill: "#E27525" }, void 0), jsx("path", { d: "M22.1205 21.3278L21.7499 23.8258L21.9283 30.0985L22.848 25.3494L22.1205 21.3278Z", fill: "#E27525" }, void 0), jsx("path", { d: "M22.848 25.3496L21.9284 30.0987L22.601 30.5654L26.6638 27.381L26.8011 24.1967L22.848 25.3496Z", fill: "#F5841F" }, void 0), jsx("path", { d: "M13.2262 24.1967L13.336 27.381L17.3989 30.5654L18.0714 30.0987L17.1518 25.3496L13.2262 24.1967Z", fill: "#F5841F" }, void 0), jsx("path", { d: "M22.9303 34.93L22.9715 33.6398L22.6284 33.3378H17.3714L17.042 33.6398L17.0694 34.93L12.6772 32.8574L14.2145 34.1202L17.3302 36.2751H22.6696L25.7853 34.1202L27.3226 32.8574L22.9303 34.93Z", fill: "#C0AC9D" }, void 0), jsx("path", { d: "M22.601 30.5653L21.9284 30.0986H18.0715L17.3989 30.5653L17.0421 33.6399L17.3715 33.3379H22.6285L22.9716 33.6399L22.601 30.5653Z", fill: "#161616" }, void 0), jsx("path", { d: "M36.5875 14.3003L37.7542 8.61779L36.011 3.33337L22.6009 13.2846L27.7618 17.6493L35.0365 19.7768L36.6424 17.8964L35.9424 17.3886L37.0679 16.3728L36.2169 15.7003L37.3287 14.863L36.5875 14.3003Z", fill: "#763E1A" }, void 0), jsx("path", { d: "M2.24573 8.61779L3.42615 14.3003L2.67123 14.863L3.78302 15.7003L2.93202 16.3728L4.05753 17.3886L3.35752 17.8964L4.96343 19.7768L12.2518 17.6493L17.399 13.2846L4.00263 3.33337L2.24573 8.61779Z", fill: "#763E1A" }, void 0), jsx("path", { d: "M35.0365 19.777L27.7619 17.6495L29.958 20.9712L26.6638 27.3811L31.0149 27.3262H37.4797L35.0365 19.777Z", fill: "#F5841F" }, void 0), jsx("path", { d: "M12.2517 17.6495L4.96332 19.777L2.53386 27.3262H8.99869L13.336 27.3811L10.0419 20.9712L12.2517 17.6495Z", fill: "#F5841F" }, void 0), jsx("path", { d: "M22.1205 21.3276L22.6009 13.2843L24.701 7.56067H15.2988L17.3988 13.2843L17.8792 21.3276L18.0577 23.8531L18.0714 30.0984H21.9283L21.9421 23.8531L22.1205 21.3276Z", fill: "#F5841F" }, void 0)] }), void 0));
};

var Icon$x = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M797.47878827 983.66060587h-570.95757654A186.4300608 186.4300608 0 0 1 40.33939413 797.47878827v-570.95757654A186.4300608 186.4300608 0 0 1 226.52121173 40.33939413H512a37.23636373 37.23636373 0 0 1 0 74.47272747H226.52121173A111.95733333 111.95733333 0 0 0 114.8121216 226.52121173v570.95757654a111.95733333 111.95733333 0 0 0 111.70909013 111.70909013h570.95757654a111.95733333 111.95733333 0 0 0 111.70909013-111.70909013V512a37.23636373 37.23636373 0 0 1 74.47272747 0v285.47878827a186.4300608 186.4300608 0 0 1-186.1818176 186.1818176z", "p-id": "2692" }, void 0), jsx("path", { d: "M499.5878784 561.64848533a37.48460587 37.48460587 0 0 1-26.31369707-10.92266666 36.9881216 36.9881216 0 0 1 0-52.62739414l446.83636374-446.83636373a37.23636373 37.23636373 0 0 1 52.62739413 52.62739413l-446.83636373 446.83636374a37.48460587 37.48460587 0 0 1-26.31369707 10.92266666z", "p-id": "2693" }, void 0), jsx("path", { d: "M946.42424213 114.8121216h-198.5939392a37.23636373 37.23636373 0 0 1 0-74.47272747h198.5939392a37.23636373 37.23636373 0 0 1 0 74.47272747z", "p-id": "2694" }, void 0), jsx("path", { d: "M946.42424213 313.4060608a37.23636373 37.23636373 0 0 1-37.23636373-37.23636373v-198.5939392a37.23636373 37.23636373 0 0 1 74.47272747 0v198.5939392a37.23636373 37.23636373 0 0 1-37.23636374 37.23636373z", "p-id": "2695" }, void 0)] }), void 0));
};

var Icon$w = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: [jsx("path", { d: "M3.18731 5.68438C2.44993 5.52604 2.44993 4.47393 3.18731 4.31559L5.3203 3.85755C5.58957 3.79973 5.79991 3.58939 5.85774 3.32012L6.31577 1.18713C6.47411 0.449748 7.52622 0.449751 7.68457 1.18713L8.1426 3.32012C8.20042 3.58939 8.41076 3.79973 8.68003 3.85755L10.813 4.31559C11.5504 4.47393 11.5504 5.52604 10.813 5.68438L8.68003 6.14241C8.41076 6.20024 8.20042 6.41058 8.1426 6.67985L7.68457 8.81284C7.52622 9.55022 6.47411 9.55022 6.31577 8.81284L5.85774 6.67985C5.79991 6.41058 5.58957 6.20024 5.3203 6.14241L3.18731 5.68438Z" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 2.99998C15.866 2.99998 19 6.13399 19 9.99998C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 9.99998C5 9.4477 4.55228 8.99998 4 8.99998C3.44772 8.99998 3 9.4477 3 9.99998C3 12.8894 4.36163 15.4608 6.47822 17.1075L5.58579 18C5.21071 18.3751 5 18.8838 5 19.4142V21.5C5 22.3284 5.67157 23 6.5 23H17.5C18.3284 23 19 22.3284 19 21.5V19.4142C19 18.8838 18.7893 18.3751 18.4142 18L17.5218 17.1075C19.6384 15.4608 21 12.8894 21 9.99998C21 5.02942 16.9706 0.999985 12 0.999985C11.4477 0.999985 11 1.4477 11 1.99998C11 2.55227 11.4477 2.99998 12 2.99998ZM12 19C10.6564 19 9.38156 18.7056 8.23649 18.1777L7 19.4142L7 21H17V19.4142L15.7635 18.1777C14.6184 18.7056 13.3436 19 12 19Z" }, void 0)] }), void 0));
};

var Icon$v = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: [jsx("path", { d: "M0 10C0 4.47715 4.47715 0 10 0L30 0C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30L0 10Z", fill: "white" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M30 0.416667L10 0.416667C4.70727 0.416667 0.416667 4.70727 0.416667 10L0.416667 30C0.416667 35.2927 4.70727 39.5833 10 39.5833H30C35.2927 39.5833 39.5833 35.2927 39.5833 30V10C39.5833 4.70727 35.2927 0.416667 30 0.416667ZM10 0C4.47715 0 0 4.47715 0 10L0 30C0 35.5228 4.47715 40 10 40H30C35.5228 40 40 35.5228 40 30V10C40 4.47715 35.5228 0 30 0L10 0Z", fill: "#E7E3EB" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M20.011 17.9331H23.3104V21.0158H20.011V33.6838L19.1439 33.3587C18.7466 33.2142 18.0963 32.9613 17.3015 32.6L16.9283 32.4314V8.09489L20.2157 7.08337L23.3225 8.03468V11.3703L20.2157 10.4069L20.011 10.4671V17.9331ZM12.8823 21.016H8.67969V10.6601L15.965 8.40824V11.7197L11.7624 13.0203V17.9333H15.953V32.1788L15.0257 31.6972C12.1357 30.204 8.67969 27.6872 8.67969 24.1831V22.5333H11.7624V24.1831C11.7624 24.9056 12.1357 25.6762 12.8823 26.459V21.016ZM24.2498 8.33581V27.8677C26.3451 26.796 27.3325 25.5075 27.3325 25.5075V21.0159H31.7157V10.6358L24.2498 8.33581ZM28.633 17.9332H27.3325V12.5986L28.633 12.996V17.9332ZM21.3597 30.3243C24.9843 28.9636 28.633 26.6034 28.633 24.3997V22.5212H31.7157V24.3997C31.7157 29.6379 24.1173 32.6484 21.7932 33.4432L20.9503 33.7322V30.4809L21.3597 30.3243Z", fill: "black" }, void 0)] }), void 0));
};

var Icon$u = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M514.42725925 1014.56402963c-277.07164445 0-502.44266667-225.37102222-502.44266666-502.44266666s225.37102222-502.44266667 502.44266666-502.44266667 502.44266667 225.37102222 502.44266667 502.44266667-225.37102222 502.44266667-502.44266667 502.44266666z m0-936.07253333c-239.08503703 0-433.62986667 194.54482963-433.62986666 433.62986667S275.34222222 945.75122963 514.42725925 945.75122963s433.62986667-194.54482963 433.62986667-433.62986666S753.5122963 78.4914963 514.42725925 78.4914963z", "p-id": "2429" }, void 0), jsx("path", { d: "M784.45985185 470.3725037h-540.06518518V401.5597037h435.69303703l-36.16616295-26.82121481 40.8993185-55.34151111 120.02797038 88.83768889c11.89357037 8.8594963 16.86945185 24.27259259 12.25765926 38.47205925-4.61179259 14.19946667-17.84035555 23.66577778-32.64663704 23.66577778zM344.03365925 704.84574815l-120.02797036-88.8376889c-11.89357037-8.8594963-16.86945185-24.27259259-12.25765926-38.47205925 4.61179259-14.0781037 17.84035555-23.66577778 32.64663704-23.66577778h540.06518518v68.8128h-435.69303703l36.16616296 26.82121481-40.89931853 55.34151112z", "p-id": "2430" }, void 0)] }), void 0));
};

var Icon$t = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: [jsx("path", { d: "M17.6755 13.1415V5.73914H3.98114C3.70355 5.73914 3.51849 5.92419 3.51849 6.20178V16.6576C3.51849 16.9352 3.70355 17.1203 3.98114 17.1203H9.25532V36.1814C9.25532 36.4589 9.44038 36.644 9.71797 36.644H18.3232C18.6008 36.644 18.7859 36.4589 18.7859 36.1814V13.1415H17.6755Z", fill: "#29AEFF" }, void 0), jsx("path", { d: "M27.2061 3.33337H23.875H14.8997C14.6221 3.33337 14.437 3.51843 14.437 3.79602V33.7756C14.437 34.0532 14.6221 34.2382 14.8997 34.2382H23.5049C23.7825 34.2382 23.9676 34.0532 23.9676 33.7756V26.1882H27.2986C33.5906 26.1882 38.6797 21.099 38.6797 14.807C38.6797 8.4225 33.4981 3.33337 27.2061 3.33337Z", fill: "#2761E7" }, void 0)] }), void 0));
};

var Icon$s = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: jsx("path", { opacity: "0.9", d: "M19.9959 4.8377L20.7771 3.82105C20.5523 3.64825 20.2766 3.55457 19.9931 3.55457C19.7095 3.55457 19.4339 3.64825 19.209 3.82105L19.9959 4.8377ZM33.425 8.7837H34.7059C34.7081 8.61378 34.6767 8.44509 34.6134 8.28737C34.5502 8.12965 34.4563 7.98603 34.3372 7.8648C34.2181 7.74358 34.0762 7.64714 33.9196 7.58107C33.763 7.515 33.5949 7.4806 33.425 7.47985V8.7837ZM19.9959 36.2161L19.2837 37.2845C19.4936 37.425 19.7405 37.5 19.9931 37.5C20.2457 37.5 20.4925 37.425 20.7024 37.2845L19.9959 36.2161ZM6.57841 8.7837V7.49709C6.40847 7.49783 6.24036 7.53223 6.0838 7.5983C5.92723 7.66437 5.7853 7.76081 5.66621 7.88204C5.54712 8.00326 5.45322 8.14688 5.38995 8.3046C5.32667 8.46232 5.29526 8.63101 5.29754 8.80093L6.57841 8.7837ZM19.2148 5.84861C25.0275 10.3518 31.6846 10.0646 33.4307 10.0646V7.49709C31.6214 7.49709 25.8259 7.72684 20.7943 3.82105L19.2148 5.84861ZM32.1499 8.76073C32.0522 14.7113 31.7995 18.91 31.317 22.0174C30.8345 25.1248 30.1682 26.9399 29.2894 28.238C28.4106 29.5361 27.2848 30.3804 25.6364 31.3626C23.9879 32.3448 21.8799 33.4361 19.2837 35.1535L20.7312 37.2845C23.1895 35.6475 25.2343 34.6021 26.9747 33.5625C28.7284 32.6075 30.2502 31.2779 31.4319 29.6682C32.5806 27.9451 33.3675 25.6475 33.873 22.408C34.3785 19.1685 34.6369 14.809 34.7346 8.80093L32.1499 8.76073ZM20.7312 35.1535C18.1522 33.4304 16.05 32.362 14.413 31.3684C12.776 30.3747 11.6502 29.582 10.7656 28.238C9.8811 26.8939 9.16312 25.1076 8.66915 22.0174C8.17519 18.9273 7.95692 14.7113 7.85928 8.76073L5.29754 8.80093C5.39518 14.809 5.6594 19.18 6.15911 22.408C6.65882 25.636 7.42275 27.9336 8.59448 29.6682C9.77051 31.2788 11.2888 32.6088 13.0402 33.5625C14.7633 34.6021 16.8254 35.6475 19.2837 37.2845L20.7312 35.1535ZM6.57841 10.0646C8.30155 10.0646 14.9644 10.3518 20.7771 5.84861L19.209 3.82105C14.166 7.72684 8.37048 7.49709 6.57266 7.49709L6.57841 10.0646Z", fill: "#3688EB" }, void 0) }), void 0));
};

var Icon$r = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M4.47 20.9999H19.53C21.07 20.9999 22.03 19.3299 21.26 17.9999L13.73 4.98993C12.96 3.65993 11.04 3.65993 10.27 4.98993L2.74 17.9999C1.97 19.3299 2.93 20.9999 4.47 20.9999ZM12 13.9999C11.45 13.9999 11 13.5499 11 12.9999V10.9999C11 10.4499 11.45 9.99993 12 9.99993C12.55 9.99993 13 10.4499 13 10.9999V12.9999C13 13.5499 12.55 13.9999 12 13.9999ZM13 17.9999H11V15.9999H13V17.9999Z" }, void 0) }), void 0));
};

var Icon$q = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 40 40" }, props, { children: jsx("path", { d: "M8.68096 12.4756C14.9323 6.39698 25.0677 6.39698 31.3191 12.4756L32.0714 13.2071C32.384 13.511 32.384 14.0038 32.0714 14.3077L29.4978 16.8103C29.3415 16.9622 29.0881 16.9622 28.9318 16.8103L27.8965 15.8036C23.5354 11.563 16.4647 11.563 12.1036 15.8036L10.9948 16.8817C10.8385 17.0336 10.5851 17.0336 10.4288 16.8817L7.85517 14.3791C7.54261 14.0752 7.54261 13.5824 7.85517 13.2785L8.68096 12.4756ZM36.6417 17.6511L38.9322 19.8783C39.2448 20.1823 39.2448 20.675 38.9322 20.979L28.6039 31.022C28.2913 31.3259 27.7846 31.3259 27.472 31.022C27.472 31.022 27.472 31.022 27.472 31.022L20.1416 23.8942C20.0634 23.8182 19.9367 23.8182 19.8586 23.8942C19.8586 23.8942 19.8586 23.8942 19.8586 23.8942L12.5283 31.022C12.2157 31.3259 11.709 31.3259 11.3964 31.022C11.3964 31.022 11.3964 31.022 11.3964 31.022L1.06775 20.9788C0.755186 20.6749 0.755186 20.1821 1.06775 19.8782L3.35833 17.6509C3.6709 17.347 4.17767 17.347 4.49024 17.6509L11.8208 24.7789C11.8989 24.8549 12.0256 24.8549 12.1038 24.7789C12.1038 24.7789 12.1038 24.7789 12.1038 24.7789L19.4339 17.6509C19.7465 17.347 20.2533 17.347 20.5658 17.6509C20.5658 17.6509 20.5658 17.6509 20.5658 17.6509L27.8964 24.7789C27.9745 24.8549 28.1012 24.8549 28.1794 24.7789L35.5098 17.6511C35.8223 17.3471 36.3291 17.3471 36.6417 17.6511Z", fill: "#3389FB" }, void 0) }), void 0));
};

var Icon$p = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M992.65370839 424.54584926c0.037583-32.9606144-13.07901247-64.56822861-36.38070173-87.86991786a122.35641669 122.35641669 0 0 0-87.60683355-35.7793671h-114.51652514c2.10466904-13.64276301 3.19458601-27.43585913 3.26975311-41.22895635 0-136.54038021-109.89377184-247.29856881-245.41940108-247.29856881-135.56321225 0-245.45698408 110.72060559-245.45698408 247.29856881 0.037583 13.79309612 1.16508408 27.58619334 3.30733611 41.22895635H155.25865979a102.52743074 102.52743074 0 0 0-15.93534817 0 120.13523957 120.13523957 0 0 0-81.81899506 47.39262816 124.40095161 124.40095161 0 0 0-23.71510559 92.71817249l60.13339032 453.33059827c8.23075785 61.78705892 60.84747507 107.71393569 122.7472841 107.15018625h593.14073159c61.86222603 0.56375053 114.47894214-45.40071033 122.7472841-107.15018625l60.13339031-453.33059827c0.33825032-5.48717226 0.33825032-10.97434343-0.037583-16.46151569zM512 94.82695075c90.35041913 0 163.60040602 73.81373742 163.60040602 164.8406572 0.11275011 13.90584622-1.69125161 27.77410945-5.33683805 41.22895635h-316.60230194c-3.64558645-13.4548458-5.41200516-27.28552602-5.33683916-41.22895635 0.037583-91.02691977 73.28756989-164.84065721 163.67557313-164.8406572z m397.21862882 335.05573657l-60.13339032 453.33059936c-2.63083548 20.59568668-20.21985225 36.0048673-40.96587313 35.85453419H215.4296342c-20.74601979 0.11275011-38.29745355-15.29643162-40.92828903-35.85453419l-60.13339142-453.33059936c-1.39058429-10.86159332 1.5409185-21.79835375 8.19317485-30.48011204a40.85312193 40.85312193 0 0 1 27.39827613-16.08568238h718.74435248c10.82401032 0 21.23460322 4.32208709 28.90161053 12.10184451 7.70459032 7.70459032 11.9890944 18.19035032 11.9890944 29.12711185 0.037583 0-0.37583332 3.68317055-0.37583332 5.33683806z", fill: "#067d73", "p-id": "2072" }, void 0), jsx("path", { d: "M290.67153892 531.28261698c0 34.16328258 27.47344323 61.82464193 61.3360585 61.82464304 34.01294947-0.15033311 61.48639161-27.81169355 61.3736415-61.82464304 0-34.16328258-27.47344323-61.82464193-61.3736415-61.82464192-33.97536537 0.15033311-61.4488086 27.81169355-61.3360585 61.82464192zM631.43994687 531.28261698c0 34.16328258 27.47344323 61.82464193 61.3360585 61.82464304 16.34876559-0.0751671 31.98344754-6.61467334 43.4839585-18.19035143a61.71189182 61.71189182 0 0 0 17.8896841-43.63429161c0-34.16328258-27.47344323-61.82464193-61.3736426-61.82464192-34.01294947 0.15033311-61.48639161 27.81169355-61.3360585 61.82464192z", fill: "#4dcdb3", "p-id": "2073" }, void 0)] }), void 0));
};

var Icon$o = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M736.62464 389.12l-222.33088 235.9296-223.69621333-220.85632z", fill: "#4dcdb3", "p-id": "2209" }, void 0), jsx("path", { d: "M521.28426667 948.14208c-39.64928 0-77.76938667-16.60245333-104.80298667-45.60213333l-363.06944-389.82997334c-48.93354667-52.53802667-51.22730667-133.80266667-5.35210667-189.07136l182.29930667-219.5456c27.30666667-32.87722667 67.44746667-51.71882667 110.15509333-51.71882666h354.33130667c43.30837333 0 83.83146667 19.27850667 111.13813333 52.92032L983.31306667 323.584c44.67370667 54.99562667 42.76224 133.14730667-4.53290667 185.90378667l-350.94528 391.14069333a143.45284267 143.45284267 0 0 1-105.23989333 47.56821333c-0.43690667-0.05461333-0.87381333-0.05461333-1.31072-0.05461333zM340.51413333 117.9648c-23.15605333 0-44.94677333 10.21269333-59.74698666 28.01664l-182.29930667 219.5456c-24.90368 29.98272-23.64757333 74.00106667 2.89450667 102.50922667l363.06944 389.82997333c14.85482667 15.94709333 35.00714667 24.73984 56.79786666 24.73984h0.76458667c22.06378667-0.21845333 42.32533333-9.33888 57.07093333-25.77749333l350.94528-391.14069334c25.66826667-28.61738667 26.70592-70.99733333 2.4576-100.81621333L755.13856 146.6368a77.22325333 77.22325333 0 0 0-60.23850667-28.672H340.51413333z", fill: "#067d73", "p-id": "2210" }, void 0), jsx("path", { d: "M514.29376 657.8176c-8.62890667 0-16.87552-3.38602667-23.04682667-9.44810667L267.55072 427.51317333a32.77892267 32.77892267 0 0 1-0.27306667-46.36672 32.77892267 32.77892267 0 0 1 46.36672-0.27306666l199.83018667 197.31797333 199.33866667-211.57205333a32.72977067 32.72977067 0 0 1 46.31210666-1.36533334 32.72977067 32.72977067 0 0 1 1.36533334 46.31210667l-222.33088 235.98421333a32.44578133 32.44578133 0 0 1-23.26528 10.26730667h-0.60074667z", fill: "#067d73", "p-id": "2211" }, void 0)] }), void 0));
};

var Icon$n = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M652.72492001 419.4776736v-6.9881128c6.98811278-6.98811278 13.97622557-27.95245115 6.98811278-41.92867669-6.98811278-20.96433834-27.95245115-27.95245115-48.91678949-20.96433837-6.98811278 0-13.97622557 6.98811278-13.97622555 6.98811279-55.90490228-41.9286767-118.79791734-69.88112784-188.67904519-76.86924061h-20.96433835c-6.98811278 0-13.97622557 6.98811278-13.97622558 13.97622555l-6.98811278 48.91678949c0 6.98811278 6.98811278 13.97622557 6.98811278 13.97622557 48.9167895 13.97622557 97.83357897 41.9286767 139.76225569 76.86924064l-181.6909324 181.69093239c-13.97622557 13.97622557-13.97622557 27.95245115-6.98811276 48.91678949 6.98811278 20.96433834 34.94056392 27.95245115 48.91678947 13.97622557l6.98811277-6.98811279 181.69093241-181.69093239c34.94056392 41.9286767 62.89301505 90.84546618 76.86924062 139.76225571 0 6.98811278 6.98811278 13.97622557 13.97622558 6.98811276l48.91678949-6.98811276c6.98811278 0 13.97622557-6.98811278 13.97622556-13.97622559 6.98811278-83.85735343-13.97622557-132.7741429-62.89301505-195.66715796z", fill: "#4dcdb3", "p-id": "2347" }, void 0), jsx("path", { d: "M695.8415759 924.92787129c6.98811278 20.96433834 0 48.9167895-20.96433835 62.89301507h-6.98811279c-48.9167895 13.97622557-104.82169175 27.95245115-153.73848126 27.95245111-279.52451138 0-503.14412047-223.61960909-503.14412048-503.14412046s223.61960909-503.14412047 503.14412048-503.14412048 503.14412047 223.61960909 503.14412049 503.14412048c0 41.9286767-6.98811278 83.85735343-13.97622559 125.78603015-6.98811278 20.96433834-27.95245115 41.9286767-55.90490227 34.9405639s-41.9286767-27.95245115-34.94056392-55.90490227c6.98811278-34.94056392 13.97622557-69.88112784 13.97622556-104.82169178 0-223.61960909-181.69093241-412.29865428-412.29865427-412.29865427-223.61960909 0-412.29865428 181.69093241-412.29865428 412.29865427 0 223.61960909 181.69093241 412.29865428 412.29865428 412.29865428 41.9286767 0 83.85735343-6.98811278 125.78603011-20.96433836 20.96433834-6.98811278 41.9286767 0 55.90490229 20.96433836z", fill: "#067d73", "p-id": "2348" }, void 0), jsx("path", { d: "M765.72270374 841.07051788c34.94056392-27.95245115 69.88112784-55.90490228 97.83357896-97.83357897 13.97622557-20.96433834 41.9286767-27.95245115 62.89301507-13.97622558s27.95245115 41.9286767 13.97622557 62.89301505c-34.94056392 48.9167895-69.88112784 83.85735343-118.79791733 118.79791734-20.96433834 13.97622557-48.9167895 13.97622557-62.89301507-6.98811279-20.96433834-13.97622557-13.97622557-41.9286767 6.9881128-62.89301505z", fill: "#067d73", "p-id": "2349" }, void 0)] }), void 0));
};

var Icon$m = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 100 100" }, props, { children: [jsx("path", { d: "M62.2857 87.9644L25.4728 66.7006C24.1796 65.953 23.3839 64.5736 23.3839 63.0797V20.5003C23.3839 19.8561 22.6869 19.4534 22.1289 19.7761L14.5964 24.1311C11.7514 25.7765 10 28.8124 10 32.0972V67.9051C10 71.1911 11.7514 74.227 14.5964 75.8712L45.5468 93.7641C48.3956 95.412 51.9081 95.412 54.7581 93.7641L62.2857 89.4116C62.8436 89.0914 62.8436 88.2871 62.2857 87.9644Z", fill: "#495BFF" }, void 0), jsx("path", { d: "M32.1596 62.8185L48.0511 72.0064C49.3468 72.7552 50.943 72.7552 52.2374 72.0064L68.1326 62.8185C69.4258 62.0709 70.2214 60.6915 70.2214 59.1976V40.8108C70.2214 39.3169 69.4246 37.9375 68.1326 37.1899L52.2386 28.0008C50.943 27.252 49.3468 27.252 48.0524 28.0008L44.1087 30.2805C43.8292 30.4419 43.4806 30.2399 43.4806 29.9184L43.5065 8.90093C43.5077 8.25679 42.8094 7.85282 42.2515 8.17551L32.1879 13.9937C30.896 14.74 30.1004 16.1194 30.0991 17.6121L30.072 59.1951C30.0696 60.6891 30.8664 62.0709 32.1596 62.8185ZM41.3622 46.6314C41.3622 45.5759 41.9251 44.6005 42.8389 44.0721L48.6669 40.7037C49.582 40.1741 50.7102 40.1741 51.6253 40.7037L57.4533 44.0721C58.3671 44.6005 58.93 45.5759 58.93 46.6314V53.3757C58.93 54.4312 58.3671 55.4067 57.4533 55.935L51.6253 59.3035C50.7102 59.8331 49.582 59.8331 48.6669 59.3035L42.8389 55.935C41.9251 55.4067 41.3622 54.4312 41.3622 53.3757V46.6314Z", fill: "#495BFF" }, void 0), jsx("path", { d: "M85.7047 24.12L54.7542 6.22591C53.4574 5.47586 52.0238 5.0682 50.5778 5.00046C50.3401 4.98937 50.1418 5.1815 50.1418 5.41921V18.5433C50.1418 18.8426 50.3007 19.1184 50.5594 19.2675L74.8283 33.2906C76.1215 34.0382 76.9171 35.4176 76.9171 36.9116V63.0674C76.9171 64.5613 76.1203 65.9407 74.8283 66.6883L58.0968 76.3614C57.5401 76.6841 57.5401 77.4883 58.0968 77.8098L69.3858 84.3275C69.9043 84.6268 70.5423 84.6268 71.0596 84.3275L85.7047 75.8614C88.5485 74.2172 90.3011 71.1812 90.3011 67.8953V32.0861C90.3011 28.8002 88.5497 25.7642 85.7047 24.12Z", fill: "#495BFF" }, void 0)] }), void 0));
};

var Box = styled.div(templateObject_1$1w || (templateObject_1$1w = __makeTemplateObject(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), background, border, layout, position, space);
var templateObject_1$1w;

var Flex = styled(Box)(templateObject_1$1v || (templateObject_1$1v = __makeTemplateObject(["\n  display: flex;\n  ", "\n"], ["\n  display: flex;\n  ", "\n"])), flexbox);
var templateObject_1$1v;

var variants$4 = {
	INFO: "info",
	DANGER: "danger",
	SUCCESS: "success",
	WARNING: "warning",
	CUSTOM: "custom",
};

var getThemeColor = function (_a) {
	var theme = _a.theme, _b = _a.variant, variant = _b === void 0 ? variants$4.INFO : _b;
	switch (variant) {
		case variants$4.DANGER:
			return theme.colors.failure;
		case variants$4.WARNING:
			return theme.colors.warning;
		case variants$4.SUCCESS:
			return theme.colors.success;
		case variants$4.INFO:
		default:
			return theme.colors.secondary;
	}
};
styled.div(templateObject_1$1u || (templateObject_1$1u = __makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 16px 0 0 16px;\n  color: ", ";\n  padding: 12px;\n"], ["\n  background-color: ", ";\n  border-radius: 16px 0 0 16px;\n  color: ", ";\n  padding: 12px;\n"])), getThemeColor, function (_a) {
	var theme = _a.theme;
	return theme.alert.background;
});
var withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
styled.div(templateObject_2$L || (templateObject_2$L = __makeTemplateObject(["\n  flex: 1;\n  padding-bottom: 12px;\n  padding-left: 12px;\n  padding-right: ", ";\n  padding-top: 12px;\n"], ["\n  flex: 1;\n  padding-bottom: 12px;\n  padding-left: 12px;\n  padding-right: ", ";\n  padding-top: 12px;\n"])), function (_a) {
	var hasHandler = _a.hasHandler;
	return (hasHandler ? withHandlerSpacing + "px" : "12px");
});
styled.div(templateObject_3$s || (templateObject_3$s = __makeTemplateObject(["\n  border-radius: 0 16px 16px 0;\n  right: 8px;\n  position: absolute;\n  top: 8px;\n"], ["\n  border-radius: 0 16px 16px 0;\n  right: 8px;\n  position: absolute;\n  top: 8px;\n"])));
styled(Flex)(templateObject_4$f || (templateObject_4$f = __makeTemplateObject(["\n  position: relative;\n  background-color: ", ";\n  border-radius: 16px;\n  /* box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05); */\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.05);\n"], ["\n  position: relative;\n  background-color: ", ";\n  border-radius: 16px;\n  /* box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05); */\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.05);\n"])), function (_a) {
	var theme = _a.theme;
	return theme.alert.background;
});
var templateObject_1$1u, templateObject_2$L, templateObject_3$s, templateObject_4$f;

var Grid = styled(Box)(templateObject_1$1t || (templateObject_1$1t = __makeTemplateObject(["\n  display: grid;\n  ", "\n  ", "\n"], ["\n  display: grid;\n  ", "\n  ", "\n"])), flexbox, grid);
var templateObject_1$1t;

var scales$9 = {
	SM: "sm",
	MD: "md",
	LG: "lg",
};

/**
 * Priority: Warning --> Success
 */
var getBoxShadow$2 = function (_a) {
	var _b = _a.isSuccess, isSuccess = _b === void 0 ? false : _b, _c = _a.isWarning, isWarning = _c === void 0 ? false : _c, _d = _a.noShadow, noShadow = _d === void 0 ? false : _d, theme = _a.theme;
	if (isWarning) {
		return theme.shadows.warning;
	}
	if (noShadow) {
		return 'none';
	}
	if (isSuccess) {
		return theme.shadows.success;
	}
	return theme.shadows.inset;
};
var getHeight = function (_a) {
	var _b = _a.scale, scale = _b === void 0 ? scales$9.MD : _b;
	switch (scale) {
		case scales$9.SM:
			return "32px";
		case scales$9.LG:
			return "48px";
		case scales$9.MD:
		default:
			return "40px";
	}
};
var Input$4 = styled.input(templateObject_1$1s || (templateObject_1$1s = __makeTemplateObject(["\n  background-color: ", ";\n  border: 0;\n  border-radius: 16px;\n  box-shadow: ", ";\n  color: ", ";\n  display: block;\n  font-size: 16px;\n  height: ", ";\n  outline: 0;\n  padding: 0 16px;\n  width: 100%;\n  border: none;\n  padding-left: ", ";;\n\n  &::placeholder {\n    color: ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n    box-shadow: none;\n    color: ", ";\n    cursor: not-allowed;\n  }\n  &:read-only {\n    box-shadow: none;\n  }\n\n  &:focus:not(:disabled):not(:readonly) {\n    box-shadow: ", ";\n  }\n"], ["\n  background-color: ", ";\n  border: 0;\n  border-radius: 16px;\n  box-shadow: ", ";\n  color: ", ";\n  display: block;\n  font-size: 16px;\n  height: ", ";\n  outline: 0;\n  padding: 0 16px;\n  width: 100%;\n  border: none;\n  padding-left: ", ";;\n\n  &::placeholder {\n    color: ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n    box-shadow: none;\n    color: ", ";\n    cursor: not-allowed;\n  }\n  &:read-only {\n    box-shadow: none;\n  }\n\n  &:focus:not(:disabled):not(:readonly) {\n    box-shadow: ", ";\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, getBoxShadow$2, function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
}, getHeight, function (_a) {
	var noShadow = _a.noShadow;
	return noShadow ? '0' : '16px';
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundDisabled;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.textDisabled;
}, function (_a) {
	var theme = _a.theme, noShadow = _a.noShadow;
	return noShadow ? 'none' : theme.shadows.focus;
});
Input$4.defaultProps = {
	scale: scales$9.MD,
	isSuccess: false,
	isWarning: false,
};
var templateObject_1$1s;

styled(IconButton)(templateObject_1$1r || (templateObject_1$1r = __makeTemplateObject(["\n  width: 16px;\n"], ["\n  width: 16px;\n"])));
styled(Text)(templateObject_2$K || (templateObject_2$K = __makeTemplateObject(["\n  margin-left: 4px;\n  text-align: right;\n  color: ", ";\n  white-space: nowrap;\n"], ["\n  margin-left: 4px;\n  text-align: right;\n  color: ", ";\n  white-space: nowrap;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.textSubtle;
});
styled(Box)(templateObject_3$r || (templateObject_3$r = __makeTemplateObject(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 16px;\n  box-shadow: ", ";\n  padding: 8px 16px;\n"], ["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 16px;\n  box-shadow: ", ";\n  padding: 8px 16px;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.inputSecondary;
}, function (_a) {
	var theme = _a.theme, isWarning = _a.isWarning;
	return theme.shadows[isWarning ? "warning" : "inset"];
});
styled(Input$4)(templateObject_4$e || (templateObject_4$e = __makeTemplateObject(["\n  background: transparent;\n  border-radius: 0;\n  box-shadow: none;\n  padding-left: 0;\n  padding-right: 0;\n  text-align: ", ";\n  border: none;\n\n  ::placeholder {\n    color: ", ";\n  }\n\n  &:focus:not(:disabled) {\n    box-shadow: none;\n  }\n"], ["\n  background: transparent;\n  border-radius: 0;\n  box-shadow: none;\n  padding-left: 0;\n  padding-right: 0;\n  text-align: ", ";\n  border: none;\n\n  ::placeholder {\n    color: ", ";\n  }\n\n  &:focus:not(:disabled) {\n    box-shadow: none;\n  }\n"])), function (_a) {
	var _b = _a.textAlign, textAlign = _b === void 0 ? "right" : _b;
	return textAlign;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.textSubtle;
});
var templateObject_1$1r, templateObject_2$K, templateObject_3$r, templateObject_4$e;

styled.div(templateObject_1$1q || (templateObject_1$1q = __makeTemplateObject(["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  padding-left: 4px;\n  padding-right: 4px;\n\n  ", " {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n\n  ", " {\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n"], ["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  padding-left: 4px;\n  padding-right: 4px;\n\n  ", " {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n\n  ", " {\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.textDisabled;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.sm;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
});
styled.ul(templateObject_2$J || (templateObject_2$J = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  list-style-type: none;\n\n  ", "\n"], ["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  list-style-type: none;\n\n  ", "\n"])), space);
jsx(Icon$H, { color: "currentColor", width: "24px" }, void 0);
var templateObject_1$1q, templateObject_2$J;

var getBackgroundColor = function (_a) {
	var theme = _a.theme, variant = _a.variant;
	return theme.colors[variant === variants$5.SUBTLE ? "inputSelect" : "tertiary"];
};
var getBorderColor = function (_a) {
	var theme = _a.theme, variant = _a.variant;
	return theme.colors[variant === variants$5.SUBTLE ? "inputSecondary" : "disabled"];
};
var StyledButtonMenu$1 = styled.div(templateObject_1$1p || (templateObject_1$1p = __makeTemplateObject(["\n  background-color: ", "; \n  \n  /* background: #DBDBDB; */\n  border-radius: 16px;\n  display: ", ";\n  /* border: 1px solid ", "; */\n  box-shadow: 0px 4px 0px 0px #7E7E7E;;\n  width: ", ";\n\n  & > button,\n  & > a {\n    margin-left: ", "; // To avoid focus shadow overlap\n    flex: ", ";\n  }\n\n  & > button + button,\n  & > a + a {\n    margin-left: 2px; // To avoid focus shadow overlap\n  }\n\n  & > button,\n  & a {\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n"], ["\n  background-color: ", "; \n  \n  /* background: #DBDBDB; */\n  border-radius: 16px;\n  display: ", ";\n  /* border: 1px solid ", "; */\n  box-shadow: 0px 4px 0px 0px #7E7E7E;;\n  width: ", ";\n\n  & > button,\n  & > a {\n    margin-left: ", "; // To avoid focus shadow overlap\n    flex: ", ";\n  }\n\n  & > button + button,\n  & > a + a {\n    margin-left: 2px; // To avoid focus shadow overlap\n  }\n\n  & > button,\n  & a {\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n"])), getBackgroundColor, function (_a) {
	var fullWidth = _a.fullWidth;
	return (fullWidth ? "flex" : "inline-flex");
}, getBorderColor, function (_a) {
	var fullWidth = _a.fullWidth;
	return (fullWidth ? "100%" : "auto");
}, function (_a) {
	var fullWidth = _a.fullWidth;
	return (fullWidth ? "0px" : "2px");
}, function (_a) {
	var fullWidth = _a.fullWidth;
	return (fullWidth ? 1 : "auto");
}, function (_a) {
	var disabled = _a.disabled, theme = _a.theme, variant = _a.variant;
	if (disabled) {
		return "\n        opacity: 0.5;\n\n        & > button:disabled {\n          background: transparent;\n          color: " + (variant === variants$5.PRIMARY ? theme.colors.primary : theme.colors.textSubtle) + ";\n        }\n    ";
	}
	return "";
}, space);
var ButtonMenu = function (_a) {
	var _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, _c = _a.scale, scale = _c === void 0 ? scales$a.MD : _c, _d = _a.variant, variant = _d === void 0 ? variants$5.PRIMARY : _d, onItemClick = _a.onItemClick, disabled = _a.disabled, children = _a.children, _e = _a.fullWidth, fullWidth = _e === void 0 ? false : _e, props = __rest(_a, ["activeIndex", "scale", "variant", "onItemClick", "disabled", "children", "fullWidth"]);
	return (jsx(StyledButtonMenu$1, __assign({ disabled: disabled, variant: variant, fullWidth: fullWidth }, props, {
		children: Children.map(children, function (child, index) {
			return cloneElement(child, {
				isActive: activeIndex === index,
				onClick: onItemClick ? function () { return onItemClick(index); } : undefined,
				scale: scale,
				variant: variant,
				disabled: disabled,
			});
		})
	}), void 0));
};
var templateObject_1$1p;

var InactiveButton = styled(Button)(templateObject_1$1o || (templateObject_1$1o = __makeTemplateObject(["\n  background: transparent;\n  color: ", ";\n  &:hover:not(:disabled):not(:active) {\n    background: transparent;\n    background-image: none;\n  }\n"], ["\n  background: transparent;\n  color: ", ";\n  &:hover:not(:disabled):not(:active) {\n    background: transparent;\n    background-image: none;\n  }\n"])), function (_a) {
	var theme = _a.theme, variant = _a.variant;
	return (variant === variants$5.PRIMARY ? theme.colors.primary : theme.colors.primary);
});
var ButtonMenuItem = function (_a) {
	var _b = _a.isActive, isActive = _b === void 0 ? false : _b, _c = _a.variant, variant = _c === void 0 ? variants$5.PRIMARY : _c, as = _a.as, props = __rest(_a, ["isActive", "variant", "as"]);
	if (!isActive) {
		return jsx(InactiveButton, __assign({ forwardedAs: as, variant: variant }, props), void 0);
	}
	return jsx(Button, __assign({ as: as, variant: variant }, props), void 0);
};
var templateObject_1$1o;

/**
 * Priority: Warning --> Success --> Active
 */
var getBoxShadow$1 = function (_a) {
	var isActive = _a.isActive, isSuccess = _a.isSuccess, isWarning = _a.isWarning, theme = _a.theme;
	if (isWarning) {
		return theme.card.boxShadowWarning;
	}
	if (isSuccess) {
		return theme.card.boxShadowSuccess;
	}
	if (isActive) {
		return theme.card.boxShadowActive;
	}
	return theme.card.boxShadow;
};
var StyledCard = styled.div(templateObject_1$1n || (templateObject_1$1n = __makeTemplateObject(["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  color: ", ";\n  overflow: hidden;\n  position: relative;\n\n  ", "\n"], ["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  color: ", ";\n  overflow: hidden;\n  position: relative;\n\n  ", "\n"])), function (_a) {
	var theme = _a.theme;
	return theme.card.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.card.boxShadow;
}, function (_a) {
	var theme = _a.theme;
	return theme.radii.card;
}, getBoxShadow$1, function (_a) {
	var theme = _a.theme, isDisabled = _a.isDisabled;
	return theme.colors[isDisabled ? "textDisabled" : "text"];
}, space);
StyledCard.defaultProps = {
	isActive: false,
	isSuccess: false,
	isWarning: false,
	isDisabled: false,
};
var templateObject_1$1n;

var Card$1 = function (_a) {
	var ribbon = _a.ribbon, children = _a.children, props = __rest(_a, ["ribbon", "children"]);
	return (jsxs(StyledCard, __assign({}, props, { children: [ribbon, children] }), void 0));
};

var CardBody = styled.div(templateObject_1$1m || (templateObject_1$1m = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), space);
CardBody.defaultProps = {
	p: "24px",
};
var templateObject_1$1m;

var CardHeader = styled.div(templateObject_1$1l || (templateObject_1$1l = __makeTemplateObject(["\n  background: ", ";\n  ", "\n"], ["\n  background: ", ";\n  ", "\n"])), function (_a) {
	var theme = _a.theme, _b = _a.variant, variant = _b === void 0 ? "default" : _b;
	return theme.card.cardHeaderBackground[variant];
}, space);
CardHeader.defaultProps = {
	p: "24px",
};
var templateObject_1$1l;

var CardFooter = styled.div(templateObject_1$1k || (templateObject_1$1k = __makeTemplateObject(["\n  border-top: 1px solid ", ";\n  ", "\n"], ["\n  border-top: 1px solid ", ";\n  ", "\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
}, space);
CardFooter.defaultProps = {
	p: "24px",
};
var templateObject_1$1k;

styled.div(templateObject_1$1j || (templateObject_1$1j = __makeTemplateObject(["\n  z-index: 1;\n  background-color: ", ";\n  color: white;\n  margin: 0;\n  padding: 0;\n  padding: 8px 0;\n  position: absolute;\n  right: ", ";\n  top: 0;\n  text-align: center;\n  transform: translateX(30%) translateY(0%) rotate(45deg);\n  transform: ", ";\n  transform-origin: top left;\n  width: 96px;\n\n  &:before,\n  &:after {\n    background-color: ", ";\n    content: \"\";\n    height: 100%;\n    margin: 0 -1px; /* Removes tiny gap */\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  &:before {\n    right: 100%;\n  }\n\n  &:after {\n    left: 100%;\n  }\n\n  & > div {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    width: 96px;\n  }\n"], ["\n  z-index: 1;\n  background-color: ", ";\n  color: white;\n  margin: 0;\n  padding: 0;\n  padding: 8px 0;\n  position: absolute;\n  right: ", ";\n  top: 0;\n  text-align: center;\n  transform: translateX(30%) translateY(0%) rotate(45deg);\n  transform: ", ";\n  transform-origin: top left;\n  width: 96px;\n\n  &:before,\n  &:after {\n    background-color: ", ";\n    content: \"\";\n    height: 100%;\n    margin: 0 -1px; /* Removes tiny gap */\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  &:before {\n    right: 100%;\n  }\n\n  &:after {\n    left: 100%;\n  }\n\n  & > div {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    width: 96px;\n  }\n"])), function (_a) {
	var _b = _a.variantColor, variantColor = _b === void 0 ? "secondary" : _b, theme = _a.theme;
	return theme.colors[variantColor];
}, function (_a) {
	var ribbonPosition = _a.ribbonPosition;
	return (ribbonPosition === "right" ? 0 : "auto");
}, function (_a) {
	var ribbonPosition = _a.ribbonPosition;
	return ribbonPosition === "right"
		? "translateX(30%) translateY(0%) rotate(45deg)"
		: "translateX(0%) translateY(200%) rotate(-45deg)";
}, function (_a) {
	var _b = _a.variantColor, variantColor = _b === void 0 ? "secondary" : _b, theme = _a.theme;
	return theme.colors[variantColor];
});
var templateObject_1$1j;

var scales$8 = {
	XS: "xs",
	SM: "sm",
	MD: "md",
};

var getScale$3 = function (_a) {
	var scale = _a.scale;
	switch (scale) {
		case scales$8.XS:
			return "16px";
		case scales$8.SM:
			return "24px";
		case scales$8.MD:
		default:
			return "32px";
	}
};
var Checkbox = styled.input.attrs({ type: "checkbox" })(templateObject_1$1i || (templateObject_1$1i = __makeTemplateObject(["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 8px;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    content: \"\";\n    position: absolute;\n    border-bottom: 2px solid;\n    border-left: 2px solid;\n    border-color: transparent;\n    top: 30%;\n    left: 0;\n    right: 0;\n    width: 50%;\n    height: 25%;\n    margin: auto;\n    transform: rotate(-50deg);\n    transition: border-color 0.2s ease-in-out;\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      border-color: white;\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n"], ["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 8px;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    content: \"\";\n    position: absolute;\n    border-bottom: 2px solid;\n    border-left: 2px solid;\n    border-color: transparent;\n    top: 30%;\n    left: 0;\n    right: 0;\n    width: 50%;\n    height: 25%;\n    margin: auto;\n    transform: rotate(-50deg);\n    transition: border-color 0.2s ease-in-out;\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      border-color: white;\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n"])), getScale$3, getScale$3, function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.inset;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.focus;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.focus;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.primary;
});
Checkbox.defaultProps = {
	scale: scales$8.MD,
};
var templateObject_1$1i;

var getLeft = function (_a) {
	var position = _a.position;
	if (position === "top-right") {
		return "100%";
	}
	if (position === "bottom-right") {
		return "-50%";
	}
	return "50%";
};
var getBottom = function (_a) {
	var position = _a.position;
	if (position === "top" || position === "top-right") {
		return "100%";
	}
	return "auto";
};
var DropdownContent = styled.div(templateObject_1$1h || (templateObject_1$1h = __makeTemplateObject(["\n  width: max-content;\n  display: none;\n  flex-direction: column;\n  position: absolute;\n  transform: translate(-50%, 0);\n  left: ", ";\n  bottom: ", ";\n  background-color: ", ";\n  /* box-shadow: ", "; */\n  padding: 16px;\n  max-height: 400px;\n  overflow-y: auto;\n  z-index: ", ";\n  border-radius: ", ";\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);\n"], ["\n  width: max-content;\n  display: none;\n  flex-direction: column;\n  position: absolute;\n  transform: translate(-50%, 0);\n  left: ", ";\n  bottom: ", ";\n  background-color: ", ";\n  /* box-shadow: ", "; */\n  padding: 16px;\n  max-height: 400px;\n  overflow-y: auto;\n  z-index: ", ";\n  border-radius: ", ";\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);\n"])), getLeft, getBottom, function (_a) {
	var theme = _a.theme;
	return theme.nav.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.level1;
}, function (_a) {
	var theme = _a.theme;
	return theme.zIndices.dropdown;
}, function (_a) {
	var theme = _a.theme;
	return theme.radii.default;
});
var Container$2 = styled.div(templateObject_2$I || (templateObject_2$I = __makeTemplateObject(["\n  position: relative;\n  &:hover ", ", &:focus-within ", " {\n    display: flex;\n  }\n"], ["\n  position: relative;\n  &:hover ", ", &:focus-within ", " {\n    display: flex;\n  }\n"])), DropdownContent, DropdownContent);
var Dropdown = function (_a) {
	var target = _a.target, _b = _a.position, position = _b === void 0 ? "bottom" : _b, children = _a.children;
	return (jsxs(Container$2, { children: [target, jsx(DropdownContent, __assign({ position: position }, { children: children }), void 0)] }, void 0));
};
Dropdown.defaultProps = {
	position: "bottom",
};
var templateObject_1$1h, templateObject_2$I;

var bunnyFall = keyframes(templateObject_1$1g || (templateObject_1$1g = __makeTemplateObject(["\n  0% {\n    opacity: 1;\n    transform: translate(0, -100%) rotateZ(0deg);\n  }\n\n  75% {\n    opacity: 1;\n    transform: translate(100px, 75vh) rotateZ(270deg);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translate(150px, 100vh) rotateZ(360deg);\n  }\n"], ["\n  0% {\n    opacity: 1;\n    transform: translate(0, -100%) rotateZ(0deg);\n  }\n\n  75% {\n    opacity: 1;\n    transform: translate(100px, 75vh) rotateZ(270deg);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translate(150px, 100vh) rotateZ(360deg);\n  }\n"])));
styled.div(templateObject_2$H || (templateObject_2$H = __makeTemplateObject(["\n  display: inline-flex;\n  position: fixed;\n  top: 0;\n  left: ", ";\n  transform: translate3d(0, -100%, 0);\n  user-select: none;\n  pointer-events: none;\n  z-index: 99999;\n\n  animation-name: ", ";\n  animation-duration: ", ";\n  animation-timing-function: linear;\n  animation-iteration-count: ", ";\n  animation-play-state: running;\n\n  &:nth-child(5n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(2n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 10) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(7n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(4n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 7) {\n    animation-delay: ", ";\n  }\n"], ["\n  display: inline-flex;\n  position: fixed;\n  top: 0;\n  left: ", ";\n  transform: translate3d(0, -100%, 0);\n  user-select: none;\n  pointer-events: none;\n  z-index: 99999;\n\n  animation-name: ", ";\n  animation-duration: ", ";\n  animation-timing-function: linear;\n  animation-iteration-count: ", ";\n  animation-play-state: running;\n\n  &:nth-child(5n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(2n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 10) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(7n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(4n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 7) {\n    animation-delay: ", ";\n  }\n"])), function (_a) {
	var position = _a.position;
	return position + "vw";
}, bunnyFall, function (_a) {
	var duration = _a.duration;
	return duration + "s";
}, function (_a) {
	var iterations = _a.iterations;
	return (Number.isFinite(iterations) ? String(iterations) : "infinite");
}, function (_a) {
	var duration = _a.duration;
	return (duration / 10) * 1.3 + "s";
}, function (_a) {
	var duration = _a.duration;
	return (duration / 10) * 1.5 + "s";
}, function (_a) {
	var duration = _a.duration;
	return (duration / 10) * 1.7 + "s";
}, function (_a) {
	var duration = _a.duration;
	return (duration / 10) * 2.7 + "s";
}, function (_a) {
	var duration = _a.duration;
	return (duration / 10) * 3.5 + "s";
}, function (_a) {
	var duration = _a.duration;
	return (duration / 10) * 5.5 + "s";
}, function (_a) {
	var duration = _a.duration;
	return (duration / 10) * 8 + "s";
});
var templateObject_1$1g, templateObject_2$H;

var tags = {
	H1: "h1",
	H2: "h2",
	H3: "h3",
	H4: "h4",
	H5: "h5",
	H6: "h6",
};
var scales$7 = {
	SM: "sm",
	LD: "ld",
	MD: "md",
	LG: "lg",
	LGG: "lgg",
	LX: "lx",
	XL: "xl",
	XLD: "xld",
	XXL: "xxl",
	XXXL: 'xxxl',
	XXLD: 'xxld'
};

var _a$8;
var style = (_a$8 = {},
	_a$8[scales$7.SM] = {
		fontSize: "12px",
		fontSizeLg: "12px",
	},
	_a$8[scales$7.LD] = {
		fontSize: "14px",
		fontSizeLg: "16px",
	},
	_a$8[scales$7.MD] = {
		fontSize: "16px",
		fontSizeLg: "20px",
	},
	_a$8[scales$7.LG] = {
		fontSize: "24px",
		fontSizeLg: "24px",
	},
	_a$8[scales$7.LGG] = {
		fontSize: "18px",
		fontSizeLg: "34px",
	},
	_a$8[scales$7.LX] = {
		fontSize: "24px",
		fontSizeLg: "32px",
	},
	_a$8[scales$7.XL] = {
		fontSize: "32px",
		fontSizeLg: "40px",
	},
	_a$8[scales$7.XLD] = {
		fontSize: "32px",
		fontSizeLg: "48px",
	},
	_a$8[scales$7.XXL] = {
		fontSize: "48px",
		fontSizeLg: "64px",
	},
	_a$8[scales$7.XXLD] = {
		fontSize: "54px",
		fontSizeLg: "80px",
	},
	_a$8[scales$7.XXXL] = {
		fontSize: "44px",
		fontSizeLg: "90px",
	},
	_a$8);
var Heading = styled(Text).attrs({ bold: true })(templateObject_1$1f || (templateObject_1$1f = __makeTemplateObject(["\n  font-size: ", ";\n  font-weight: 600;\n  line-height: 1.1;\n\n  ", " {\n    font-size: ", ";\n  }\n"], ["\n  font-size: ", ";\n  font-weight: 600;\n  line-height: 1.1;\n\n  ", " {\n    font-size: ", ";\n  }\n"])), function (_a) {
	var scale = _a.scale;
	return style[scale || scales$7.MD].fontSize;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.lg;
}, function (_a) {
	var scale = _a.scale;
	return style[scale || scales$7.MD].fontSizeLg;
});
Heading.defaultProps = {
	as: tags.H2,
};
var templateObject_1$1f;

var observerOptions = {
	root: null,
	rootMargin: "200px",
	threshold: 0,
};

var StyledWrapper = styled.div(templateObject_1$1e || (templateObject_1$1e = __makeTemplateObject(["\n  max-height: ", "px;\n  max-width: ", "px;\n  position: relative;\n  width: 100%;\n\n  &:after {\n    content: \"\";\n    display: block;\n    padding-top: ", "%;\n  }\n\n  ", "\n"], ["\n  max-height: ", "px;\n  max-width: ", "px;\n  position: relative;\n  width: 100%;\n\n  &:after {\n    content: \"\";\n    display: block;\n    padding-top: ", "%;\n  }\n\n  ", "\n"])), function (_a) {
	var $height = _a.$height;
	return $height;
}, function (_a) {
	var $width = _a.$width;
	return $width;
}, function (_a) {
	var $width = _a.$width, $height = _a.$height;
	return ($height / $width) * 100;
}, space);
var Wrapper$6 = forwardRef(function (_a, ref) {
	var width = _a.width, height = _a.height, props = __rest(_a, ["width", "height"]);
	return jsx(StyledWrapper, __assign({ ref: ref, "$width": width, "$height": height }, props), void 0);
});
var templateObject_1$1e;

styled(Wrapper$6)(templateObject_1$1d || (templateObject_1$1d = __makeTemplateObject(["\n  background-repeat: no-repeat;\n  background-size: contain;\n"], ["\n  background-repeat: no-repeat;\n  background-size: contain;\n"])));
var templateObject_1$1d;

var StyledImage = styled.img(templateObject_1$1c || (templateObject_1$1c = __makeTemplateObject(["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  -webkit-user-drag: ", ";\n"], ["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  -webkit-user-drag: ", ";\n"])), function (_a) {
	var userDrag = _a.userDrag;
	return userDrag || '';
});
var Placeholder = styled.div(templateObject_2$G || (templateObject_2$G = __makeTemplateObject(["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n"], ["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n"])));
var Image = function (_a) {
	var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, props = __rest(_a, ["src", "alt", "width", "height"]);
	var imgRef = useRef(null);
	var _b = __read(useState(false), 2), isLoaded = _b[0], setIsLoaded = _b[1];
	useEffect(function () {
		var observer;
		if (imgRef.current) {
			observer = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					var isIntersecting = entry.isIntersecting;
					if (isIntersecting) {
						setIsLoaded(true);
						observer.disconnect();
					}
				});
			}, observerOptions);
			observer.observe(imgRef.current);
		}
		return function () {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [src]);
	return (jsx(Wrapper$6, __assign({ ref: imgRef, height: height, width: width }, props, { children: isLoaded ? jsx(StyledImage, { src: src, alt: alt }, void 0) : jsx(Placeholder, {}, void 0) }), void 0));
};
var templateObject_1$1c, templateObject_2$G;

var BAD_SRCS$1 = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
var Logo$4 = function (_a) {
	var srcs = _a.srcs, alt = _a.alt, rest = __rest(_a, ["srcs", "alt"]);
	var _b = __read(useState(0), 2), refresh = _b[1];
	var src = srcs.find(function (s) { return !BAD_SRCS$1[s]; });
	if (src) {
		return (jsx(Image, __assign({}, rest, {
			alt: alt, src: src, onError: function () {
				console.debug("" + src);
				if (src)
					BAD_SRCS$1[src] = true;
				refresh(function (i) { return i + 1; });
			}
		}), void 0));
	}
	return jsx(Icon$D, __assign({}, rest), void 0);
};

var TokenImage = styled(Logo$4)(templateObject_1$1b || (templateObject_1$1b = __makeTemplateObject(["\n  &:before {\n    border-radius: 50%;\n    /* border: 1px solid rgba(0, 0, 0, 0.25); */\n    box-shadow: ", ";\n    transform: scale(0.92);\n    content: \"\";\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 7;\n  }\n"], ["\n  &:before {\n    border-radius: 50%;\n    /* border: 1px solid rgba(0, 0, 0, 0.25); */\n    box-shadow: ", ";\n    transform: scale(0.92);\n    content: \"\";\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 7;\n  }\n"])), function (_a) {
	var shadow = _a.shadow;
	return shadow ? '0px 0px 5px 0px rgba(25, 95, 81, 0.5)' : 'none';
});
var templateObject_1$1b;

var variants$3 = {
	DEFAULT: "default",
	INVERTED: "inverted",
	BINARY: "binary",
};

var _a$7, _b$2;
styled(TokenImage)(templateObject_1$1a || (templateObject_1$1a = __makeTemplateObject(["\n  position: absolute;\n  border-radius: 50%;\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"], ["\n  position: absolute;\n  border-radius: 50%;\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"])), function (_a) {
	var variant = _a.variant;
	return variant === variants$3.DEFAULT ? "82%" : "70%";
}, variant$1({
	variants: (_a$7 = {},
		_a$7[variants$3.DEFAULT] = {
			width: '82%',
			bottom: "auto",
			left: 0,
			right: "auto",
			top: 0,
			zIndex: 5,
		},
		_a$7[variants$3.INVERTED] = {
			width: '70%',
			bottom: 0,
			left: "auto",
			right: 0,
			top: "auto",
			zIndex: 6,
		},
		_a$7[variants$3.BINARY] = {
			width: '100%',
			height: '100%',
			bottom: 0,
			left: "auto",
			// margin: "auto",
			right: 0,
			top: "auto",
			zIndex: 5,
		},
		_a$7),
}));
styled(TokenImage)(templateObject_2$F || (templateObject_2$F = __makeTemplateObject(["\n  position: absolute;\n  transform: scale(0.95);\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"], ["\n  position: absolute;\n  transform: scale(0.95);\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"])), function (_a) {
	var variant = _a.variant;
	return variant === variants$3.DEFAULT ? "82%" : "70%";
}, variant$1({
	variants: (_b$2 = {},
		_b$2[variants$3.DEFAULT] = {
			bottom: 0,
			width: '82%',
			left: "auto",
			right: "5px",
			top: "auto",
			zIndex: 6,
		},
		_b$2[variants$3.INVERTED] = {
			width: '70%',
			bottom: "auto",
			left: 0,
			right: "auto",
			top: 0,
			zIndex: 5,
		},
		_b$2[variants$3.BINARY] = {
			width: '50%',
			height: '50%',
			bottom: 0,
			// margin: "auto",
			left: "auto",
			right: "-5px",
			top: "auto",
			zIndex: 6,
		},
		_b$2),
}));
var templateObject_1$1a, templateObject_2$F;

var img$r = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAABNCAYAAACYAek5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkRBNTcyODE2QzAxMUVDQTQ0REJGMEY4MEZBRDUyQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkRBNTcyOTE2QzAxMUVDQTQ0REJGMEY4MEZBRDUyQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyREE1NzI2MTZDMDExRUNBNDREQkYwRjgwRkFENTJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYyREE1NzI3MTZDMDExRUNBNDREQkYwRjgwRkFENTJBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PCYB/wAACXxJREFUeNrsnWmME+cZ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";

styled(Flex)(templateObject_1$19 || (templateObject_1$19 = __makeTemplateObject(["\n  /* background: url(", ") no-repeat; */\n  background: ", ";\n  border-radius: 24px;\n  background-size: 100%;\n  width: 140px;\n  height: 48px;\n  padding: 0 5px;\n"], ["\n  /* background: url(", ") no-repeat; */\n  background: ", ";\n  border-radius: 24px;\n  background-size: 100%;\n  width: 140px;\n  height: 48px;\n  padding: 0 5px;\n"])), img$r, function (_a) {
	var theme = _a.theme;
	return theme.colors.primary;
});
styled(Input$4)(templateObject_2$E || (templateObject_2$E = __makeTemplateObject(["\n  width: 50px;\n  padding: 5px;\n  min-width: 50px;\n  box-shadow: none;\n  text-align: center;\n  font-weight: bold;\n  font-size: 20px;\n  color: ", ";\n  background: transparent;\n"], ["\n  width: 50px;\n  padding: 5px;\n  min-width: 50px;\n  box-shadow: none;\n  text-align: center;\n  font-weight: bold;\n  font-size: 20px;\n  color: ", ";\n  background: transparent;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.white;
});
var templateObject_1$19, templateObject_2$E;

var GridLayout = styled(Grid)(templateObject_1$18 || (templateObject_1$18 = __makeTemplateObject(["\n  grid-template-columns: repeat(6, 1fr);\n  grid-gap: 16px;\n  ", " {\n    grid-template-columns: repeat(8, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 32px;\n  }\n"], ["\n  grid-template-columns: repeat(6, 1fr);\n  grid-gap: 16px;\n  ", " {\n    grid-template-columns: repeat(8, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 32px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.sm;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.lg;
});
var templateObject_1$18;

styled(GridLayout)(templateObject_1$17 || (templateObject_1$17 = __makeTemplateObject(["\n  & > div {\n    grid-column: span 6;\n    ", " {\n      grid-column: span 4;\n    }\n  }\n"], ["\n  & > div {\n    grid-column: span 6;\n    ", " {\n      grid-column: span 4;\n    }\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.sm;
});
var templateObject_1$17;

var StyledLink$1 = styled(Text)(templateObject_1$16 || (templateObject_1$16 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  &:hover {\n    text-decoration: underline;\n  }\n"])));
var Link = function (_a) {
	var external = _a.external, props = __rest(_a, ["external"]);
	var internalProps = external ? getExternalLinkProps() : {};
	return jsx(StyledLink$1, __assign({ as: "a" }, internalProps, props), void 0);
};
Link.defaultProps = {
	color: "primary",
};
var templateObject_1$16;

var LinkExternal = function (_a) {
	var children = _a.children, props = __rest(_a, ["children"]);
	return (jsxs(Link, __assign({ external: true }, props, { children: [children, jsx(Icon$x, { color: props.color ? props.color : "primary", ml: "4px" }, void 0)] }), void 0));
};

var variants$2 = {
	warning: {
		background: "#FFB23719",
		borderColor: "warning",
	},
	danger: {
		background: "#ED4B9E19",
		borderColor: "failure",
	},
};

var Icons$1 = {
	warning: Icon$r,
	danger: Icon$P,
};
var MessageContainer$1 = styled.div(templateObject_1$15 || (templateObject_1$15 = __makeTemplateObject(["\n  display: flex;\n  background-color: gray;\n  padding: 16px;\n  border-radius: 16px;\n  border: solid 1px;\n\n  ", "\n  ", "\n"], ["\n  display: flex;\n  background-color: gray;\n  padding: 16px;\n  border-radius: 16px;\n  border: solid 1px;\n\n  ", "\n  ", "\n"])), space, variant$1({
	variants: variants$2,
}));
var Message = function (_a) {
	var children = _a.children, variant = _a.variant, icon = _a.icon, props = __rest(_a, ["children", "variant", "icon"]);
	var Icon = Icons$1[variant];
	return (jsxs(MessageContainer$1, __assign({ variant: variant }, props, { children: [jsx(Box, __assign({ mr: "12px" }, { children: icon !== null && icon !== void 0 ? icon : jsx(Icon, { color: variants$2[variant].borderColor, width: "24px" }, void 0) }), void 0), children] }), void 0));
};
var templateObject_1$15;

var NotificationDotRoot = styled.span(templateObject_1$14 || (templateObject_1$14 = __makeTemplateObject(["\n  display: inline-flex;\n  position: relative;\n"], ["\n  display: inline-flex;\n  position: relative;\n"])));
var Dot = styled.span(templateObject_2$D || (templateObject_2$D = __makeTemplateObject(["\n  display: ", ";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  pointer-events: none;\n  border: 2px solid ", ";\n  border-radius: 50%;\n  background-color: ", ";\n"], ["\n  display: ", ";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  pointer-events: none;\n  border: 2px solid ", ";\n  border-radius: 50%;\n  background-color: ", ";\n"])), function (_a) {
	var show = _a.show;
	return (show ? "inline-flex" : "none");
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.invertedContrast;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.failure;
});
var NotificationDot = function (_a) {
	var _b = _a.show, show = _b === void 0 ? false : _b, children = _a.children, props = __rest(_a, ["show", "children"]);
	return (jsxs(NotificationDotRoot, { children: [Children.map(children, function (child) { return cloneElement(child, props); }), jsx(Dot, { show: show }, void 0)] }, void 0));
};
var templateObject_1$14, templateObject_2$D;

var Overlay = styled.div.attrs({ role: "presentation" })(templateObject_1$13 || (templateObject_1$13 = __makeTemplateObject(["\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background-color: ", ";\n  transition: opacity 0.4s;\n  opacity: ", ";\n  z-index: ", ";\n  pointer-events: ", ";\n"], ["\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background-color: ", ";\n  transition: opacity 0.4s;\n  opacity: ", ";\n  z-index: ", ";\n  pointer-events: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.overlay;
}, function (_a) {
	var show = _a.show;
	return (show ? 0.3 : 0);
}, function (_a) {
	var zIndex = _a.zIndex;
	return zIndex;
}, function (_a) {
	var show = _a.show;
	return (show ? "initial" : "none");
});
Overlay.defaultProps = {
	show: false,
	zIndex: 10,
};
var templateObject_1$13;

var scales$6 = {
	SM: "sm",
	MD: "md",
};

var scaleKeyValues$1 = {
	sm: {
		pancakeSize: "16px",
		travelDistance: "16px",
		toggleHeight: "20px",
		toggleWidth: "36px",
		pancakeThickness: "1px",
		pancakeTwoOffset: "0px",
		pancakeThreeOffset: "-3px",
		butterTop: "3px",
		butterLeft: "10px",
		butterWidth: "6px",
		butterHeight: "5px",
		butterThickness: "0.5px",
		butterRadius: "2px",
		butterSmearOneTop: "10px",
		butterSmearOneLeft: "2.5px",
		butterSmearTwoTop: "11px",
		butterSmearTwoRight: "2.5px", // these values adjust the position of it
	},
	md: {
		pancakeSize: "32px",
		travelDistance: "34px",
		toggleHeight: "40px",
		toggleWidth: "72px",
		pancakeThickness: "2px",
		pancakeTwoOffset: "-3px",
		pancakeThreeOffset: "-8px",
		butterTop: "3px",
		butterLeft: "16px",
		butterWidth: "12px",
		butterHeight: "11px",
		butterThickness: "1px",
		butterRadius: "4px",
		butterSmearOneTop: "20px",
		butterSmearOneLeft: "5px",
		butterSmearTwoTop: "22px",
		butterSmearTwoRight: "5px",
	},
};
var getScale$2 = function (property) {
	return function (_a) {
		var _b = _a.scale, scale = _b === void 0 ? scales$6.MD : _b;
		return scaleKeyValues$1[scale][property];
	};
};
styled.div(templateObject_1$12 || (templateObject_1$12 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n\n  &:label:before {\n    content: none;\n  }\n\n  .pancakes {\n    transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  }\n\n  .pancake {\n    background: #e27c31;\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    position: absolute;\n    transition: 0.4s ease;\n    top: 2px;\n    left: 4px;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n  }\n\n  .pancake:nth-child(1) {\n    background: ", ";\n    box-shadow: 0 ", " 0 ", "\n      ", ";\n  }\n\n  .pancake:nth-child(2) {\n    left: 0;\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3) {\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3):before,\n  .pancake:nth-child(3):after {\n    content: \"\";\n    position: absolute;\n    background: #ef8927;\n    border-radius: 20px;\n    width: 50%;\n    height: 20%;\n  }\n\n  .pancake:nth-child(3):before {\n    top: ", ";\n    left: ", ";\n  }\n\n  .pancake:nth-child(3):after {\n    top: ", ";\n    right: ", ";\n  }\n\n  .butter {\n    width: ", ";\n    height: ", ";\n    background: #fbdb60;\n    top: ", ";\n    left: ", ";\n    position: absolute;\n    border-radius: ", ";\n    box-shadow: 0 ", " 0 ", " #d67823;\n    transform: scale(0);\n    transition: 0.2s ease;\n  }\n"], ["\n  position: relative;\n  display: inline-block;\n\n  &:label:before {\n    content: none;\n  }\n\n  .pancakes {\n    transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  }\n\n  .pancake {\n    background: #e27c31;\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    position: absolute;\n    transition: 0.4s ease;\n    top: 2px;\n    left: 4px;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n  }\n\n  .pancake:nth-child(1) {\n    background: ", ";\n    box-shadow: 0 ", " 0 ", "\n      ", ";\n  }\n\n  .pancake:nth-child(2) {\n    left: 0;\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3) {\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3):before,\n  .pancake:nth-child(3):after {\n    content: \"\";\n    position: absolute;\n    background: #ef8927;\n    border-radius: 20px;\n    width: 50%;\n    height: 20%;\n  }\n\n  .pancake:nth-child(3):before {\n    top: ", ";\n    left: ", ";\n  }\n\n  .pancake:nth-child(3):after {\n    top: ", ";\n    right: ", ";\n  }\n\n  .butter {\n    width: ", ";\n    height: ", ";\n    background: #fbdb60;\n    top: ", ";\n    left: ", ";\n    position: absolute;\n    border-radius: ", ";\n    box-shadow: 0 ", " 0 ", " #d67823;\n    transform: scale(0);\n    transition: 0.2s ease;\n  }\n"])), getScale$2("pancakeSize"), getScale$2("pancakeSize"), getScale$2("pancakeThickness"), getScale$2("pancakeThickness"), function (_a) {
	var theme = _a.theme;
	return theme.pancakeToggle.handleBackground;
}, getScale$2("pancakeThickness"), getScale$2("pancakeThickness"), function (_a) {
	var theme = _a.theme;
	return theme.pancakeToggle.handleShadow;
}, getScale$2("pancakeTwoOffset"), getScale$2("pancakeThreeOffset"), getScale$2("butterSmearOneTop"), getScale$2("butterSmearOneLeft"), getScale$2("butterSmearTwoTop"), getScale$2("butterSmearTwoRight"), getScale$2("butterWidth"), getScale$2("butterHeight"), getScale$2("butterTop"), getScale$2("butterLeft"), getScale$2("butterRadius"), getScale$2("butterThickness"), getScale$2("butterThickness"));
styled.input(templateObject_2$C || (templateObject_2$C = __makeTemplateObject(["\n  height: 40px;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  width: 40px;\n\n  &:focus + label {\n    box-shadow: ", ";\n  }\n\n  &:checked + label .pancakes {\n    transform: translateX(", ");\n  }\n\n  &:checked + label .pancake:nth-child(1) {\n    background: #e27c31;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(2) {\n    transform: scale(1);\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(3) {\n    transform: scale(1);\n    transition-delay: 0.4s;\n  }\n\n  &:checked + label .butter {\n    transform: scale(1);\n    transition-delay: 0.6s;\n  }\n"], ["\n  height: 40px;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  width: 40px;\n\n  &:focus + label {\n    box-shadow: ", ";\n  }\n\n  &:checked + label .pancakes {\n    transform: translateX(", ");\n  }\n\n  &:checked + label .pancake:nth-child(1) {\n    background: #e27c31;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(2) {\n    transform: scale(1);\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(3) {\n    transform: scale(1);\n    transition-delay: 0.4s;\n  }\n\n  &:checked + label .butter {\n    transform: scale(1);\n    transition-delay: 0.6s;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.shadows.focus;
}, getScale$2("travelDistance"), getScale$2("pancakeThickness"), getScale$2("pancakeThickness"));
styled.label(templateObject_3$q || (templateObject_3$q = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background: ", ";\n  box-shadow: ", ";\n  display: inline-block;\n  border-radius: 50px;\n  position: relative;\n  transition: all 0.3s ease;\n  transform-origin: 20% center;\n  cursor: pointer;\n"], ["\n  width: ", ";\n  height: ", ";\n  background: ", ";\n  box-shadow: ", ";\n  display: inline-block;\n  border-radius: 50px;\n  position: relative;\n  transition: all 0.3s ease;\n  transform-origin: 20% center;\n  cursor: pointer;\n"])), getScale$2("toggleWidth"), getScale$2("toggleHeight"), function (_a) {
	var theme = _a.theme, checked = _a.checked;
	return theme.colors[checked ? "success" : "input"];
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.inset;
});
var templateObject_1$12, templateObject_2$C, templateObject_3$q;

var variants$1 = {
	ROUND: "round",
	FLAT: "flat",
};
var scales$5 = {
	MD: "md",
	SM: "sm",
};

var _a$6, _b$1;
var styleVariants$1 = (_a$6 = {},
	_a$6[variants$1.ROUND] = {
		borderRadius: "32px",
	},
	_a$6[variants$1.FLAT] = {
		borderRadius: 0,
	},
	_a$6);
var styleScales = (_b$1 = {},
	_b$1[scales$5.MD] = {
		height: "16px",
	},
	_b$1[scales$5.SM] = {
		height: "8px",
	},
	_b$1);

var Bar = styled.div(templateObject_1$11 || (templateObject_1$11 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: ", ";\n  height: 100%;\n  transition: width 200ms ease;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: ", ";\n  height: 100%;\n  transition: width 200ms ease;\n"])), function (props) { return (props.primary ? props.theme.colors.secondary : props.theme.colors.secondary + "80"); });
Bar.defaultProps = {
	primary: false,
};
styled.div(templateObject_2$B || (templateObject_2$B = __makeTemplateObject(["\n  position: relative;\n  background-color: ", ";\n  box-shadow: ", ";\n  overflow: hidden;\n\n  ", " {\n    border-top-left-radius: ", ";\n    border-bottom-left-radius: ", ";\n  }\n\n  ", "\n  ", "\n  ", "\n"], ["\n  position: relative;\n  background-color: ", ";\n  box-shadow: ", ";\n  overflow: hidden;\n\n  ", " {\n    border-top-left-radius: ", ";\n    border-bottom-left-radius: ", ";\n  }\n\n  ", "\n  ", "\n  ", "\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.inset;
}, Bar, function (_a) {
	var variant = _a.variant;
	return (variant === variants$1.FLAT ? "0" : "32px");
}, function (_a) {
	var variant = _a.variant;
	return (variant === variants$1.FLAT ? "0" : "32px");
}, variant$1({
	variants: styleVariants$1,
}), variant$1({
	prop: "scale",
	variants: styleScales,
}), space);
var templateObject_1$11, templateObject_2$B;

styled.div(templateObject_1$10 || (templateObject_1$10 = __makeTemplateObject(["\n  display: flex;\n  z-index: 2;\n  top: -65%;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  transition: left 200ms ease-out;\n"], ["\n  display: flex;\n  z-index: 2;\n  top: -65%;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  transition: left 200ms ease-out;\n"])));
var templateObject_1$10;

var scales$4 = {
	SM: "sm",
	MD: "md",
};

var getScale$1 = function (_a) {
	var scale = _a.scale;
	switch (scale) {
		case scales$4.SM:
			return "24px";
		case scales$4.MD:
		default:
			return "32px";
	}
};
var getCheckedScale = function (_a) {
	var scale = _a.scale;
	switch (scale) {
		case scales$4.SM:
			return "12px";
		case scales$4.MD:
		default:
			return "20px";
	}
};
var Radio = styled.input.attrs({ type: "radio" })(templateObject_1$$ || (templateObject_1$$ = __makeTemplateObject(["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 50%;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    border-radius: 50%;\n    content: \"\";\n    height: ", ";\n    left: 6px;\n    position: absolute;\n    top: 6px;\n    width: ", ";\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      background-color: ", ";\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n  ", "\n"], ["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 50%;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    border-radius: 50%;\n    content: \"\";\n    height: ", ";\n    left: 6px;\n    position: absolute;\n    top: 6px;\n    width: ", ";\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      background-color: ", ";\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n  ", "\n"])), getScale$1, getScale$1, function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.inset;
}, getCheckedScale, getCheckedScale, function (_a) {
	var theme = _a.theme;
	return theme.shadows.focus;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.focus;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.success;
}, function (_a) {
	var theme = _a.theme;
	return theme.radio.handleBackground;
}, space);
Radio.defaultProps = {
	scale: scales$4.MD,
	m: 0,
};
var templateObject_1$$;

var img$q = "data:image/svg+xml,%3csvg width='24' height='32' viewBox='0 0 28 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='1' y='19' width='17' height='11' fill='%231FC7D4'/%3e%3cpath d='M9.507 24.706C8.14635 26.0666 9.73795 28.2313 11.7555 30.2489C13.7731 32.2665 15.9378 33.8581 17.2984 32.4974C18.6591 31.1368 17.9685 28.0711 15.9509 26.0535C13.9333 24.0359 10.8676 23.3453 9.507 24.706Z' fill='%231FC7D4'/%3e%3cpath d='M15.507 22.706C14.1463 24.0666 15.7379 26.2313 17.7555 28.2489C19.7731 30.2665 21.9378 31.8581 23.2984 30.4974C24.6591 29.1368 23.9685 26.0711 21.9509 24.0535C19.9333 22.0359 16.8676 21.3453 15.507 22.706Z' fill='%231FC7D4'/%3e%3cg filter='url(%23filter0_d)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.146 6.75159C14.2105 7.10896 14.2703 7.48131 14.3281 7.86164C14.2189 7.85865 14.1095 7.85714 14 7.85714C13.3803 7.85714 12.7648 7.90539 12.159 7.99779C11.879 7.41458 11.5547 6.82246 11.1872 6.23145C8.69897 2.22947 6.53826 1.98679 4.67882 2.98366C2.81938 3.98052 2.85628 6.67644 5.26696 9.40538C5.58076 9.76061 5.90097 10.1398 6.2247 10.5286C3.69013 12.4659 2 15.2644 2 18.2695C2 23.8292 7.78518 25 14 25C20.2148 25 26 23.8292 26 18.2695C26 14.8658 23.8318 11.7272 20.7243 9.80476C20.9022 8.86044 21 7.83019 21 6.75159C21 2.19612 19.2549 1 17.1022 1C14.9495 1 13.5261 3.31847 14.146 6.75159Z' fill='url(%23paint0_linear_bunnyhead_main)'/%3e%3c/g%3e%3cg transform='translate(2)'%3e%3cpath d='M12.7284 16.4446C12.796 17.3149 12.4446 19.0556 10.498 19.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M12.7457 16.4446C12.6781 17.3149 13.0296 19.0556 14.9761 19.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M9 14.5C9 15.6046 8.55228 16 8 16C7.44772 16 7 15.6046 7 14.5C7 13.3954 7.44772 13 8 13C8.55228 13 9 13.3954 9 14.5Z' fill='%23452A7A'/%3e%3cpath d='M18 14.5C18 15.6046 17.5523 16 17 16C16.4477 16 16 15.6046 16 14.5C16 13.3954 16.4477 13 17 13C17.5523 13 18 13.3954 18 14.5Z' fill='%23452A7A'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3e%3cfeOffset dy='1'/%3e%3cfeGaussianBlur stdDeviation='1'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_bunnyhead_main' x1='14' y1='1' x2='14' y2='25' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2353DEE9'/%3e%3cstop offset='1' stop-color='%231FC7D4'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

var img$p = "data:image/svg+xml,%3csvg width='24' height='32' viewBox='0 0 28 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='1' y='19' width='17' height='11' fill='%231FC7D4'/%3e%3cpath d='M9.507 24.706C8.14635 26.0666 9.73795 28.2313 11.7555 30.2489C13.7731 32.2665 15.9378 33.8581 17.2984 32.4974C18.6591 31.1368 17.9685 28.0711 15.9509 26.0535C13.9333 24.0359 10.8676 23.3453 9.507 24.706Z' fill='%231FC7D4'/%3e%3cpath d='M15.507 22.706C14.1463 24.0666 15.7379 26.2313 17.7555 28.2489C19.7731 30.2665 21.9378 31.8581 23.2984 30.4974C24.6591 29.1368 23.9685 26.0711 21.9509 24.0535C19.9333 22.0359 16.8676 21.3453 15.507 22.706Z' fill='%231FC7D4'/%3e%3cg filter='url(%23filter0_d)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.146 6.75159C14.2105 7.10896 14.2703 7.48131 14.3281 7.86164C14.2189 7.85865 14.1095 7.85714 14 7.85714C13.3803 7.85714 12.7648 7.90539 12.159 7.99779C11.879 7.41458 11.5547 6.82246 11.1872 6.23145C8.69897 2.22947 6.53826 1.98679 4.67882 2.98366C2.81938 3.98052 2.85628 6.67644 5.26696 9.40538C5.58076 9.76061 5.90097 10.1398 6.2247 10.5286C3.69013 12.4659 2 15.2644 2 18.2695C2 23.8292 7.78518 25 14 25C20.2148 25 26 23.8292 26 18.2695C26 14.8658 23.8318 11.7272 20.7243 9.80476C20.9022 8.86044 21 7.83019 21 6.75159C21 2.19612 19.2549 1 17.1022 1C14.9495 1 13.5261 3.31847 14.146 6.75159Z' fill='url(%23paint0_linear_bunnyhead_max)'/%3e%3c/g%3e%3cpath d='M11.5047 16.0634C10.9435 14.4456 8.79685 14.4456 8.08131 16.0635' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M20.8894 16.0634C20.3283 14.4456 18.1816 14.4456 17.4661 16.0635' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M14.7284 17.4446C14.796 18.3149 14.4446 20.0556 12.498 20.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M14.7457 17.4446C14.6781 18.3149 15.0296 20.0556 16.9761 20.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M13.4505 20.0787C13.4505 21.5097 15.955 21.5097 15.955 20.0787' stroke='%23452A7A' stroke-linecap='round'/%3e%3cdefs%3e%3cfilter id='filter0_d' x='0' y='0' width='28' height='28' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3e%3cfeOffset dy='1'/%3e%3cfeGaussianBlur stdDeviation='1'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_bunnyhead_max' x1='14' y1='1' x2='14' y2='25' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2353DEE9'/%3e%3cstop offset='1' stop-color='%231FC7D4'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

var img$o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAhCAYAAACr8emlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQjNGQjBGMjMyMUQxMUVDQTQyQUNEREI5RkU3RTMxMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQjNGQjBGMzMyMUQxMUVDQTQyQUNEREI5RkU3RTMxMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNCM0ZCMEYwMzIxRDExRUNBNDJBQ0REQjlGRTdFMzEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNCM0ZCMEYxMzIxRDExRUNBNDJBQ0REQjlGRTdFMzEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ANTkKgAADXxJREFUeNqsWHlsHOd9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";

var getCursorStyle = function (_a) {
	var _b = _a.disabled, disabled = _b === void 0 ? false : _b;
	return disabled ? "not-allowed" : "cursor";
};
var getBaseThumbStyles = function (_a) {
	var isMax = _a.isMax, disabled = _a.disabled;
	return "\n  -webkit-appearance: none;\n  background: no-repeat;\n  background-image: url(" + img$o + ");\n  background-size: 32px;\n  // background-image: url(" + (isMax ? img$p : img$q) + ");\n  background-color: transparent;\n  border: 0;\n  cursor: " + getCursorStyle + ";\n  width: 32px;\n  height: 32px;\n  filter: " + (disabled ? "grayscale(100%)" : "none") + ";\n  transform: scale(1.25) translate(-6px, 6px);\n  transition: 200ms transform;\n  z-index: 10;\n\n  &:hover {\n    transform: " + (disabled ? "scale(1.25) translate(-6px, 6px)" : "scale(1.35) translate(-4px, 4px)") + ";\n  }\n";
};
styled.div(templateObject_1$_ || (templateObject_1$_ = __makeTemplateObject(["\n  bottom: 0;\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 30px);\n"], ["\n  bottom: 0;\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 30px);\n"])));
styled(Text)(templateObject_2$A || (templateObject_2$A = __makeTemplateObject(["\n  bottom: 0;\n  font-size: 12px;\n  left: ", ";\n  position: absolute;\n  text-align: center;\n  min-width: 24px; // Slider thumb size\n"], ["\n  bottom: 0;\n  font-size: 12px;\n  left: ", ";\n  position: absolute;\n  text-align: center;\n  min-width: 24px; // Slider thumb size\n"])), function (_a) {
	var progress = _a.progress;
	return progress;
});
styled.div(templateObject_3$p || (templateObject_3$p = __makeTemplateObject(["\n  background: url(", ") no-repeat;\n  background-size: 32px;\n  height: 32px;\n  filter: ", ";\n  position: absolute;\n  width: 32px;\n  left: 8px;\n  top: 8px;\n  z-index: 1;\n  pointer-events: none;\n"], ["\n  background: url(", ") no-repeat;\n  background-size: 32px;\n  height: 32px;\n  filter: ", ";\n  position: absolute;\n  width: 32px;\n  left: 8px;\n  top: 8px;\n  z-index: 1;\n  pointer-events: none;\n"])), img$o, function (_a) {
	var disabled = _a.disabled;
	return (disabled ? "grayscale(100%)" : "none");
});
styled.div(templateObject_4$d || (templateObject_4$d = __makeTemplateObject(["\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 14px);\n"], ["\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 14px);\n"])));
styled.input(templateObject_5$8 || (templateObject_5$8 = __makeTemplateObject(["\n  cursor: ", ";\n  height: 32px;\n  position: relative;\n\n  ::-webkit-slider-thumb {\n    ", "\n  }\n\n  ::-moz-range-thumb {\n    ", "\n  }\n\n  ::-ms-thumb {\n    ", "\n  }\n"], ["\n  cursor: ", ";\n  height: 32px;\n  position: relative;\n\n  ::-webkit-slider-thumb {\n    ", "\n  }\n\n  ::-moz-range-thumb {\n    ", "\n  }\n\n  ::-ms-thumb {\n    ", "\n  }\n"])), getCursorStyle, getBaseThumbStyles, getBaseThumbStyles, getBaseThumbStyles);
styled.div(templateObject_6$3 || (templateObject_6$3 = __makeTemplateObject(["\n  background-color: ", ";\n  height: 2px;\n  position: absolute;\n  top: 18px;\n  width: 100%;\n"], ["\n  background-color: ", ";\n  height: 2px;\n  position: absolute;\n  top: 18px;\n  width: 100%;\n"])), function (_a) {
	var theme = _a.theme, disabled = _a.disabled;
	return theme.colors[disabled ? "textDisabled" : '#adcae3'];
});
styled.div(templateObject_7$3 || (templateObject_7$3 = __makeTemplateObject(["\n  background-color: ", ";\n  filter: ", ";\n  height: 10px;\n  position: absolute;\n  top: 18px;\n"], ["\n  background-color: ", ";\n  filter: ", ";\n  height: 10px;\n  position: absolute;\n  top: 18px;\n"])), function (_a) {
	_a.theme;
	return '#adcae3';
}, function (_a) {
	var disabled = _a.disabled;
	return (disabled ? "grayscale(100%)" : "none");
});
var templateObject_1$_, templateObject_2$A, templateObject_3$p, templateObject_4$d, templateObject_5$8, templateObject_6$3, templateObject_7$3;

var animation = {
	WAVES: "waves",
	PULSE: "pulse",
};
var variant = {
	RECT: "rect",
	CIRCLE: "circle",
};

var waves = keyframes(templateObject_1$Z || (templateObject_1$Z = __makeTemplateObject(["\n   from {\n        left: -150px;\n    }\n    to   {\n        left: 100%;\n    }\n"], ["\n   from {\n        left: -150px;\n    }\n    to   {\n        left: 100%;\n    }\n"])));
var pulse = keyframes(templateObject_2$z || (templateObject_2$z = __makeTemplateObject(["\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n"], ["\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n"])));
var Root = styled.div(templateObject_3$o || (templateObject_3$o = __makeTemplateObject(["\n  min-height: 20px;\n  display: block;\n  background-color: ", ";\n  border-radius: ", ";\n\n  ", "\n  ", "\n"], ["\n  min-height: 20px;\n  display: block;\n  background-color: ", ";\n  border-radius: ", ";\n\n  ", "\n  ", "\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundDisabled;
}, function (_a) {
	var variant$1 = _a.variant, theme = _a.theme;
	return (variant$1 === variant.CIRCLE ? theme.radii.circle : theme.radii.small);
}, layout, space);
var Pulse = styled(Root)(templateObject_4$c || (templateObject_4$c = __makeTemplateObject(["\n  animation: ", " 2s infinite ease-out;\n  transform: translate3d(0, 0, 0);\n"], ["\n  animation: ", " 2s infinite ease-out;\n  transform: translate3d(0, 0, 0);\n"])), pulse);
var Waves = styled(Root)(templateObject_5$7 || (templateObject_5$7 = __makeTemplateObject(["\n  position: relative;\n  overflow: hidden;\n  transform: translate3d(0, 0, 0);\n  &:before {\n    content: \"\";\n    position: absolute;\n    background-image: linear-gradient(90deg, transparent, rgba(243, 243, 243, 0.5), transparent);\n    top: 0;\n    left: -150px;\n    height: 100%;\n    width: 150px;\n    animation: ", " 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n  }\n"], ["\n  position: relative;\n  overflow: hidden;\n  transform: translate3d(0, 0, 0);\n  &:before {\n    content: \"\";\n    position: absolute;\n    background-image: linear-gradient(90deg, transparent, rgba(243, 243, 243, 0.5), transparent);\n    top: 0;\n    left: -150px;\n    height: 100%;\n    width: 150px;\n    animation: ", " 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n  }\n"])), waves);
var Skeleton = function (_a) {
	var _b = _a.variant, variant$1 = _b === void 0 ? variant.RECT : _b, _c = _a.animation, animation$1 = _c === void 0 ? animation.PULSE : _c, props = __rest(_a, ["variant", "animation"]);
	if (animation$1 === animation.WAVES) {
		return jsx(Waves, __assign({ variant: variant$1 }, props), void 0);
	}
	return jsx(Pulse, __assign({ variant: variant$1 }, props), void 0);
};
var templateObject_1$Z, templateObject_2$z, templateObject_3$o, templateObject_4$c, templateObject_5$7;

var rotate$1 = keyframes(templateObject_1$Y || (templateObject_1$Y = __makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var float = keyframes(templateObject_2$y || (templateObject_2$y = __makeTemplateObject(["\n\t0% {\n\t\ttransform: translatey(0px);\n\t}\n\t50% {\n\t\ttransform: translatey(20px);\n\t}\n\t100% {\n\t\ttransform: translatey(0px);\n\t}\n"], ["\n\t0% {\n\t\ttransform: translatey(0px);\n\t}\n\t50% {\n\t\ttransform: translatey(20px);\n\t}\n\t100% {\n\t\ttransform: translatey(0px);\n\t}\n"])));
var Container$1 = styled(Box)(templateObject_3$n || (templateObject_3$n = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
styled(Image)(templateObject_4$b || (templateObject_4$b = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  animation: ", " 2s linear infinite;\n  transform: translate3d(0, 0, 0);\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  animation: ", " 2s linear infinite;\n  transform: translate3d(0, 0, 0);\n"])), rotate$1);
var FloatingPanIcon = styled(Image)(templateObject_5$6 || (templateObject_5$6 = __makeTemplateObject(["\n  animation: ", " 2s ease-in-out infinite;\n  transform: translate3d(0, 0, 0);\n"], ["\n  animation: ", " 2s ease-in-out infinite;\n  transform: translate3d(0, 0, 0);\n"])), float);
var Spinner = function (_a) {
	var _b = _a.size, size = _b === void 0 ? 128 : _b;
	return (jsx(Container$1, __assign({ width: size, height: size }, { children: jsx(FloatingPanIcon, { width: size, height: size, src: "/images/loding.PNG" }, void 0) }), void 0));
};
var templateObject_1$Y, templateObject_2$y, templateObject_3$n, templateObject_4$b, templateObject_5$6;

styled.div(templateObject_1$X || (templateObject_1$X = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: fit-content;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: fit-content;\n"])));
var templateObject_1$X;

var getStepNumberFontColor = function (_a) {
	var theme = _a.theme, status = _a.status;
	if (status === "past") {
		return theme.colors.success;
	}
	if (status === "current") {
		return theme.colors.invertedContrast;
	}
	return theme.colors.textDisabled;
};
styled(Flex)(templateObject_1$W || (templateObject_1$W = __makeTemplateObject(["\n  ", " {\n    justify-content: center;\n  }\n"], ["\n  ", " {\n    justify-content: center;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
});
styled.div(templateObject_2$x || (templateObject_2$x = __makeTemplateObject(["\n  position: absolute;\n  width: 4px;\n  height: 110%;\n  top: 50%;\n  left: calc(50% - 2px);\n  background-color: ", ";\n"], ["\n  position: absolute;\n  width: 4px;\n  height: 110%;\n  top: 50%;\n  left: calc(50% - 2px);\n  background-color: ", ";\n"])), function (_a) {
	var theme = _a.theme, status = _a.status;
	return theme.colors[status === "past" ? "success" : "textDisabled"];
});
var ChildrenWrapper$1 = styled(Box)(templateObject_3$m || (templateObject_3$m = __makeTemplateObject(["\n  ", " {\n    visibility: ", ";\n  }\n"], ["\n  ", " {\n    visibility: ", ";\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
}, function (_a) {
	var isVisible = _a.isVisible;
	return (isVisible ? "visible" : "hidden");
});
styled(ChildrenWrapper$1)(templateObject_4$a || (templateObject_4$a = __makeTemplateObject(["\n  display: none;\n  ", " {\n    display: block;\n    margin-right: 16px;\n  }\n"], ["\n  display: none;\n  ", " {\n    display: block;\n    margin-right: 16px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
});
styled(ChildrenWrapper$1)(templateObject_5$5 || (templateObject_5$5 = __makeTemplateObject(["\n  margin-left: 8px;\n  ", " {\n    margin-left: 16px;\n  }\n"], ["\n  margin-left: 8px;\n  ", " {\n    margin-left: 16px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
});
styled.div(templateObject_6$2 || (templateObject_6$2 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  align-items: center;\n"], ["\n  position: relative;\n  display: flex;\n  align-items: center;\n"])));
styled.div(templateObject_7$2 || (templateObject_7$2 = __makeTemplateObject(["\n  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);\n  background-color: ", ";\n  border: 2px solid ", ";\n  border-radius: ", ";\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  font-size: 32px;\n  width: 48px;\n  height: 48px;\n  z-index: 1;\n  ", " {\n    font-size: 40px;\n    width: 80px;\n    height: 80px;\n  }\n"], ["\n  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);\n  background-color: ", ";\n  border: 2px solid ", ";\n  border-radius: ", ";\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  font-size: 32px;\n  width: 48px;\n  height: 48px;\n  z-index: 1;\n  ", " {\n    font-size: 40px;\n    width: 80px;\n    height: 80px;\n  }\n"])), function (_a) {
	var theme = _a.theme, status = _a.status;
	return theme.colors[status === "current" ? "secondary" : "invertedContrast"];
}, function (_a) {
	var theme = _a.theme, status = _a.status;
	return (status === "past" ? theme.colors.success : "transparent");
}, function (_a) {
	var theme = _a.theme;
	return theme.radii.circle;
}, getStepNumberFontColor, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
});
var templateObject_1$W, templateObject_2$x, templateObject_3$m, templateObject_4$a, templateObject_5$5, templateObject_6$2, templateObject_7$2;

styled.div(templateObject_1$V || (templateObject_1$V = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-width: 136px;\n  background: ", ";\n  border-radius: ", ";\n  border: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-width: 136px;\n  background: ", ";\n  border-radius: ", ";\n  border: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, function (_a) {
	var theme = _a.theme;
	return theme.radii.default;
}, function (_a) {
	var theme = _a.theme;
	return "1px solid " + theme.colors.inputSecondary;
});
styled.div(templateObject_2$w || (templateObject_2$w = __makeTemplateObject(["\n  cursor: pointer;\n"], ["\n  cursor: pointer;\n"])));
styled.button(templateObject_3$l || (templateObject_3$l = __makeTemplateObject(["\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n  background: transparent;\n  padding: 8px 16px;\n  color: ", ";\n  width: 100%;\n  font-size: 16px;\n  text-align: left;\n\n  &:hover {\n    background-color: ", ";\n    text-decoration: none;\n  }\n"], ["\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n  background: transparent;\n  padding: 8px 16px;\n  color: ", ";\n  width: 100%;\n  font-size: 16px;\n  text-align: left;\n\n  &:hover {\n    background-color: ", ";\n    text-decoration: none;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.inputSecondary;
});
var templateObject_1$V, templateObject_2$w, templateObject_3$l;

document.getElementById("portal-root");

styled(Flex)(templateObject_1$U || (templateObject_1$U = __makeTemplateObject(["\n  border-bottom: 2px solid ", ";\n  overflow-x: scroll;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n"], ["\n  border-bottom: 2px solid ", ";\n  overflow-x: scroll;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.textSubtle;
});
styled(Flex)(templateObject_2$v || (templateObject_2$v = __makeTemplateObject(["\n  justify-content: space-between;\n  flex-grow: 1;\n\n  & > button + button {\n    margin-left: 4px;\n  }\n\n  ", " {\n    flex-grow: 0;\n  }\n"], ["\n  justify-content: space-between;\n  flex-grow: 1;\n\n  & > button + button {\n    margin-left: 4px;\n  }\n\n  ", " {\n    flex-grow: 0;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
});
var templateObject_1$U, templateObject_2$v;

var getBorderRadius = function (_a) {
	var scale = _a.scale;
	return (scale === "md" ? "16px 16px 0 0" : "24px 24px 0 0");
};
var getPadding = function (_a) {
	var scale = _a.scale;
	return (scale === "md" ? "8px" : "16px");
};
var Tab = styled.button(templateObject_1$T || (templateObject_1$T = __makeTemplateObject(["\n  display: inline-flex;\n  justify-content: center;\n  cursor: pointer;\n  border: 0;\n  outline: 0;\n  flex-grow: 1;\n  padding: ", ";\n  border-radius: ", ";\n  font-size: 16px;\n  font-weight: 600;\n\n  ", " {\n    flex-grow: 0;\n  }\n\n  ", "\n"], ["\n  display: inline-flex;\n  justify-content: center;\n  cursor: pointer;\n  border: 0;\n  outline: 0;\n  flex-grow: 1;\n  padding: ", ";\n  border-radius: ", ";\n  font-size: 16px;\n  font-weight: 600;\n\n  ", " {\n    flex-grow: 0;\n  }\n\n  ", "\n"])), getPadding, getBorderRadius, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.md;
}, color);
Tab.defaultProps = {
	scale: "md",
};
var templateObject_1$T;

var variants = {
	PRIMARY: "primary",
	SECONDARY: "secondary",
	SUCCESS: "success",
	TEXTDISABLED: "textDisabled",
	TEXTSUBTLE: "textSubtle",
	BINANCE: "binance",
	FAILURE: "failure",
	WARNING: "warning",
	WHITE: "white",
};
var scales$3 = {
	MD: "md",
	SM: "sm",
};

var _a$5, _b;
var scaleVariants$1 = (_a$5 = {},
	_a$5[scales$3.MD] = {
		height: "28px",
		padding: "0 8px",
		fontSize: "14px",
	},
	_a$5[scales$3.SM] = {
		height: "24px",
		padding: "0 4px",
		fontSize: "12px",
	},
	_a$5);
var styleVariants = (_b = {},
	_b[variants.PRIMARY] = {
		backgroundColor: "primary",
	},
	_b[variants.WHITE] = {
		backgroundColor: "white",
	},
	_b[variants.SECONDARY] = {
		backgroundColor: "secondary",
	},
	_b[variants.SUCCESS] = {
		backgroundColor: "success",
	},
	_b[variants.TEXTDISABLED] = {
		backgroundColor: "textDisabled",
	},
	_b[variants.TEXTSUBTLE] = {
		backgroundColor: "textSubtle",
	},
	_b[variants.BINANCE] = {
		backgroundColor: "binance",
	},
	_b[variants.FAILURE] = {
		backgroundColor: "failure",
	},
	_b[variants.WARNING] = {
		backgroundColor: "warning",
	},
	_b);

var getOutlineStyles = function (_a) {
	var outline = _a.outline, theme = _a.theme, _b = _a.variant, variantKey = _b === void 0 ? variants.PRIMARY : _b;
	if (outline) {
		var themeColorKey = styleVariants[variantKey].backgroundColor;
		var color = theme.colors[themeColorKey];
		return "\n      color: " + color + ";\n      background: transparent;\n      border: 2px solid " + color + ";\n    ";
	}
	return "";
};
var StyledTag = styled.div(templateObject_1$S || (templateObject_1$S = __makeTemplateObject(["\n  align-items: center;\n  border-radius: 16px;\n  color: #ffffff;\n  display: inline-flex;\n  font-weight: 400;\n  white-space: nowrap;\n\n  & > svg {\n    fill: currentColor;\n  }\n\n  ", "\n  ", "\n  ", "\n\n  ", "\n"], ["\n  align-items: center;\n  border-radius: 16px;\n  color: #ffffff;\n  display: inline-flex;\n  font-weight: 400;\n  white-space: nowrap;\n\n  & > svg {\n    fill: currentColor;\n  }\n\n  ", "\n  ", "\n  ", "\n\n  ", "\n"])), variant$1({
	prop: "scale",
	variants: scaleVariants$1,
}), variant$1({
	variants: styleVariants,
}), space, getOutlineStyles);
var templateObject_1$S;

var Tag = function (_a) {
	var startIcon = _a.startIcon, endIcon = _a.endIcon, children = _a.children, props = __rest(_a, ["startIcon", "endIcon", "children"]);
	return (jsxs(StyledTag, __assign({}, props, {
		children: [React.isValidElement(startIcon) &&
			React.cloneElement(startIcon, {
				mr: "0.5em",
			}), children, React.isValidElement(endIcon) &&
		React.cloneElement(endIcon, {
			ml: "0.5em",
		})]
	}), void 0));
};
Tag.defaultProps = {
	variant: "primary",
	scale: scales$3.MD,
	outline: false,
};

var scaleKeyValues = {
	sm: {
		handleHeight: "16px",
		handleWidth: "16px",
		handleLeft: "2px",
		handleTop: "2px",
		checkedLeft: "calc(100% - 18px)",
		toggleHeight: "20px",
		toggleWidth: "36px",
	},
	md: {
		handleHeight: "32px",
		handleWidth: "32px",
		handleLeft: "4px",
		handleTop: "4px",
		checkedLeft: "calc(100% - 36px)",
		toggleHeight: "40px",
		toggleWidth: "72px",
	},
};
var getScale = function (property) {
	return function (_a) {
		var _b = _a.scale, scale = _b === void 0 ? scales$8.MD : _b;
		return scaleKeyValues[scale][property];
	};
};
var Handle = styled.div(templateObject_1$R || (templateObject_1$R = __makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 50%;\n  cursor: pointer;\n  height: ", ";\n  left: ", ";\n  position: absolute;\n  top: ", ";\n  transition: left 200ms ease-in;\n  width: ", ";\n  z-index: 1;\n  box-shadow: 0px 0px 3px 0px rgba(150, 150, 150, 0.9);\n"], ["\n  background-color: ", ";\n  border-radius: 50%;\n  cursor: pointer;\n  height: ", ";\n  left: ", ";\n  position: absolute;\n  top: ", ";\n  transition: left 200ms ease-in;\n  width: ", ";\n  z-index: 1;\n  box-shadow: 0px 0px 3px 0px rgba(150, 150, 150, 0.9);\n"])), function (_a) {
	var theme = _a.theme;
	return theme.toggle.handleBackground;
}, getScale("handleHeight"), getScale("handleLeft"), getScale("handleTop"), getScale("handleWidth"));
var Input$3 = styled.input(templateObject_2$u || (templateObject_2$u = __makeTemplateObject(["\n  cursor: pointer;\n  opacity: 0;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n  z-index: 3;\n\n  &:checked + ", " {\n    left: ", ";\n  }\n\n  &:focus + ", " {\n    box-shadow: ", ";\n  }\n\n  &:hover + ", ":not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n"], ["\n  cursor: pointer;\n  opacity: 0;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n  z-index: 3;\n\n  &:checked + ", " {\n    left: ", ";\n  }\n\n  &:focus + ", " {\n    box-shadow: ", ";\n  }\n\n  &:hover + ", ":not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n"])), Handle, getScale("checkedLeft"), Handle, function (_a) {
	var theme = _a.theme;
	return theme.shadows.focus;
}, Handle, function (_a) {
	var theme = _a.theme;
	return theme.shadows.focus;
});
var StyledToggle = styled.div(templateObject_3$k || (templateObject_3$k = __makeTemplateObject(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 24px;\n  box-shadow: ", ";\n  cursor: pointer;\n  display: inline-flex;\n  height: ", ";\n  position: relative;\n  transition: background-color 200ms;\n  width: ", ";\n"], ["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 24px;\n  box-shadow: ", ";\n  cursor: pointer;\n  display: inline-flex;\n  height: ", ";\n  position: relative;\n  transition: background-color 200ms;\n  width: ", ";\n"])), function (_a) {
	var theme = _a.theme, checked = _a.checked;
	return theme.colors[checked ? "success" : "backgroundSelect"];
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.inset;
}, getScale("toggleHeight"), getScale("toggleWidth"));
var templateObject_1$R, templateObject_2$u, templateObject_3$k;

var scales$2 = {
	SM: "sm",
	MD: "md",
};

var Toggle = function (_a) {
	var checked = _a.checked, _b = _a.scale, scale = _b === void 0 ? scales$2.MD : _b, props = __rest(_a, ["checked", "scale"]);
	var isChecked = !!checked;
	return (jsxs(StyledToggle, __assign({ checked: isChecked, scale: scale }, { children: [jsx(Input$3, __assign({ checked: checked, scale: scale }, props, { type: "checkbox" }), void 0), jsx(Handle, { scale: scale }, void 0)] }), void 0));
};
Toggle.defaultProps = {
	scale: scales$2.MD,
};

var getBoxShadow = function (_a) {
	var _b = _a.isWarning, isWarning = _b === void 0 ? false : _b, theme = _a.theme;
	if (isWarning) {
		return theme.shadows.warning;
	}
	return theme.colors.inpuShadows;
};
styled(Text)(templateObject_1$Q || (templateObject_1$Q = __makeTemplateObject(["\n  position: absolute;\n  bottom: -22px;\n  a {\n    display: inline;\n  }\n"], ["\n  position: absolute;\n  bottom: -22px;\n  a {\n    display: inline;\n  }\n"])));
styled(Box)(templateObject_2$t || (templateObject_2$t = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
styled(Box)(templateObject_3$j || (templateObject_3$j = __makeTemplateObject(["\n  border-radius: 16px;\n  background-color: ", ";\n  box-shadow: ", ";\n  position: relative;\n  padding: 8px 20px;\n"], ["\n  border-radius: 16px;\n  background-color: ", ";\n  box-shadow: ", ";\n  position: relative;\n  padding: 8px 20px;\n"])), function (_a) {
	var theme = _a.theme, background = _a.background;
	return theme.colors[background] || theme.colors.inputPanel;
}, getBoxShadow);
var templateObject_1$Q, templateObject_2$t, templateObject_3$j;

var scales$1 = {
	SM: "sm",
	MD: "md",
	LG: "lg",
};

var EN = { locale: 'en-US', language: 'English', code: 'en' };
var ZHCN = { locale: 'zh-CN', language: '简体中文', code: 'CN' };
var languages = {
	// 'ar-SA': AR,
	// 'bn-BD': BN,
	'en-US': EN,
	// 'de-DE': DE,
	// 'el-GR': EL,
	// 'es-ES': ESES,
	// 'fi-FI': FI,
	// 'fil-PH': FIL,
	// 'fr-FR': FR,
	// 'hi-IN': HI,
	// 'hu-HU': HU,
	// 'id-ID': ID,
	// 'it-IT': IT,
	// 'ja-JP': JA,
	// 'ko-KR': KO,
	// 'nl-NL': NL,
	// 'pl-PL': PL,
	// 'pt-BR': PTBR,
	// 'pt-PT': PTPT,
	// 'ro-RO': RO,
	// 'ru-RU': RU,
	// 'sv-SE': SVSE,
	// 'ta-IN': TA,
	// 'tr-TR': TR,
	// 'uk-UA': UK,
	// 'vi-VN': VI,
	'zh-CN': ZHCN,
	// 'zh-TW': ZHTW,
};
Object.values(languages);

var dataFormat = "YYYY-MM-DD";
var airTime = "HHA, MMM-DD";
var Exchange = "Exchange";
var Locked = "Locked";
var Finished = "Finished";
var Total = "Total";
var End = "End";
var Close = "Close";
var Max = "Max";
var Cancel = "Cancel";
var Confirm = "Confirm";
var Warning = "Warning";
var Core = "Core";
var Available = "Available";
var Select = "Select";
var Connect = "Connect";
var Details = "Details";
var Trade = "Trade";
var More = "More";
var Liquidity = "Liquidity";
var Token = "Token";
var Pairs = "Pairs";
var Accounts = "Accounts";
var Active = "Active";
var Inactive = "Inactive";
var Dual = "Dual";
var Compound = "Compound";
var Search = "Search";
var History = "History";
var Burned = "Burned";
var Logout = "Logout";
var Confirmed = "Confirmed";
var Show = "Show";
var Hide = "Hide";
var Stake = "Stake";
var Balance$2 = "Balance";
var Live = "Live";
var Start = "Start";
var Finish = "Finish";
var Enable = "Enable";
var Enabling = "Enabling";
var Expired = "Expired";
var Calculating = "Calculating";
var All = "All";
var d = "d";
var h = "h";
var m = "m";
var Blocks = "Blocks";
var Buy = "Buy";
var Filter = "Filter";
var Volume = "Volume";
var Tokens = "Tokens";
var Contact = "Contact";
var Merch = "Merch";
var New = "New";
var Rates = "Rates";
var Price = "Price";
var Prices = "Prices";
var Amount = "Amount";
var Simple = "Simple";
var Detailed = "Detailed";
var Remove = "Remove";
var Input$2 = "Input";
var Output = "Output";
var From = "From";
var To = "To";
var Swap$1 = "Swap";
var Audio$1 = "Audio";
var minutes = "minutes";
var Manage$1 = "Manage";
var Import = "Import";
var via = "via";
var Lists = "Lists";
var See = "See";
var Loaded = "Loaded";
var Loading$1 = "Loading";
var Recipient = "Recipient";
var Dismiss = "Dismiss";
var Latest = "Latest";
var Claimed = "Claimed";
var Settings = "Settings";
var Supply = "Supply";
var Learn = "Learn";
var translationLast = "translationLast";
var translationEnd = "translationEnd";
var translations = {
	dataFormat: dataFormat,
	airTime: airTime,
	Exchange: Exchange,
	"Connect Wallet": "Connect Wallet",
	"Your %asset% Balance": "Your %asset% Balance",
	"My %asset%": "My %asset%",
	"Total %asset% Supply": "Total %asset% Supply",
	Locked: Locked,
	"Total Liquidity": "Total Liquidity",
	"View on BscScan": "View on BscScan",
	Finished: Finished,
	"Project site": "Project site",
	"Project Site": "Project Site",
	"See Token Info": "See Token Info",
	Total: Total,
	End: End,
	"View Project Site": "View Project Site",
	"Create a pool for your token": "Create a pool for your token",
	Close: Close,
	Max: Max,
	"%num% %symbol% Available": "%num% %symbol% Available",
	Cancel: Cancel,
	Confirm: Confirm,
	Warning: Warning,
	"I understand": "I understand",
	"Pending Confirmation": "Pending Confirmation",
	"Buy new tokens with a brand new token sale model.": "Buy new tokens with a brand new token sale model.",
	"You get the tokens.": "You get the tokens.",
	"Want to launch your own IFO?": "Want to launch your own IFO?",
	"Apply to launch": "Apply to launch",
	Core: Core,
	Available: Available,
	"Sign out": "Sign out",
	Select: Select,
	"Launch Time": "Launch Time",
	"For Sale": "For Sale",
	"Done!": "Done!",
	"Read more": "Read more",
	Connect: Connect,
	"Loading…": "Loading…",
	Details: Details,
	"Wallet Disconnected": "Wallet Disconnected",
	Trade: Trade,
	More: More,
	Liquidity: Liquidity,
	Token: Token,
	Pairs: Pairs,
	Accounts: Accounts,
	Active: Active,
	Inactive: Inactive,
	Dual: Dual,
	Compound: Compound,
	"In Wallet": "In Wallet",
	"Loading...": "Loading...",
	Search: Search,
	History: History,
	Burned: Burned,
	"To burn": "To burn",
	"Total Value Locked": "Total Value Locked",
	"Your wallet": "Your wallet",
	Logout: Logout,
	Confirmed: Confirmed,
	Show: Show,
	Hide: Hide,
	"Stake LP tokens": "Stake LP tokens",
	Stake: Stake,
	"I understand that people can view my wallet if they know my username": "I understand that people can view my wallet if they know my username",
	"Please connect your wallet to continue": "Please connect your wallet to continue",
	"Get %symbol%": "Get %symbol%",
	Balance: Balance$2,
	"Oops, page not found.": "Oops, page not found.",
	"Back Home": "Back Home",
	Live: Live,
	Start: Start,
	Finish: Finish,
	"Connect wallet to view": "Connect wallet to view",
	"Your volume": "Your volume",
	"Since start": "Since start",
	Enable: Enable,
	Enabling: Enabling,
	Expired: Expired,
	Calculating: Calculating,
	"Your history": "Your history",
	All: All,
	"%num%d": "%num%d",
	d: d,
	h: h,
	m: m,
	"Success!": "Success!",
	Blocks: Blocks,
	"Add to Metamask": "Add to Metamask",
	"Insufficient %symbol% balance": "Insufficient %symbol% balance",
	Buy: Buy,
	"Locate Assets": "Locate Assets",
	"%symbol% required": "%symbol% required",
	"Your History": "Your History",
	Filter: Filter,
	Volume: Volume,
	Tokens: Tokens,
	Contact: Contact,
	Merch: Merch,
	New: New,
	"Output is estimated. If the price changes by more than %slippage%% your transaction will revert.": "Output is estimated. If the price changes by more than %slippage%% your transaction will revert.",
	"Supplying %amountA% %symbolA% and %amountB% %symbolB%": "Supplying %amountA% %symbolA% and %amountB% %symbolB%",
	"Removing %amountA% %symbolA% and %amountB% %symbolB%": "Removing %amountA% %symbolA% and %amountB% %symbolB%",
	"Swapping %amountA% %symbolA% for %amountB% %symbolB%": "Swapping %amountA% %symbolA% for %amountB% %symbolB%",
	"Add Liquidity": "Add Liquidity",
	"Add liquidity to receive LP tokens": "Add liquidity to receive LP tokens",
	"Liquidity providers earn a 0.1% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.": "Liquidity providers earn a 0.1% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.",
	"You are creating a pool": "You are creating a pool",
	"You are the first liquidity provider.": "You are the first liquidity provider.",
	"The ratio of tokens you add will set the price of this pool.": "The ratio of tokens you add will set the price of this pool.",
	"Once you are happy with the rate click supply to review.": "Once you are happy with the rate click supply to review.",
	"Initial prices and pool share": "Initial prices and pool share",
	"Prices and pool share": "Prices and pool share",
	"Unsupported Asset": "Unsupported Asset",
	"Enabling %asset%": "Enabling %asset%",
	"Enable %asset%": "Enable %asset%",
	"Share of Pool": "Share of Pool",
	"%assetA% per %assetB%": "%assetA% per %assetB%",
	"%asset% Deposited": "%asset% Deposited",
	Rates: Rates,
	"Create Pool & Supply": "Create Pool & Supply",
	"Confirm Supply": "Confirm Supply",
	"Confirm Swap": "Confirm Swap",
	"Connect to a wallet to view your liquidity.": "Connect to a wallet to view your liquidity.",
	"Connect to a wallet to find pools": "Connect to a wallet to find pools",
	"Select a token to find your liquidity.": "Select a token to find your liquidity.",
	"No liquidity found.": "No liquidity found.",
	"Don't see a pool you joined?": "Don't see a pool you joined?",
	"Find other LP tokens": "Find other LP tokens",
	"Import Pool": "Import Pool",
	"Import an existing pool": "Import an existing pool",
	"Select a Token": "Select a Token",
	"Pool Found!": "Pool Found!",
	"No pool found.": "No pool found.",
	"Create pool.": "Create pool.",
	"Manage this pool.": "Manage this pool.",
	"Invalid pair.": "Invalid pair.",
	"You don’t have liquidity in this pool yet.": "You don’t have liquidity in this pool yet.",
	"%assetA%/%assetB% Burned": "%assetA%/%assetB% Burned",
	Price: Price,
	Prices: Prices,
	"Remove %assetA%-%assetB% liquidity": "Remove %assetA%-%assetB% liquidity",
	Amount: Amount,
	Simple: Simple,
	Detailed: Detailed,
	"Receive WBNB": "Receive WBNB",
	"Receive BNB": "Receive BNB",
	Remove: Remove,
	Input: Input$2,
	Output: Output,
	"Trade tokens in an instant": "Trade tokens in an instant",
	"From (estimated)": "From (estimated)",
	From: From,
	"To (estimated)": "To (estimated)",
	To: To,
	"+ Add a send (optional)": "+ Add a send (optional)",
	"- Remove send": "- Remove send",
	"Slippage Tolerance": "Slippage Tolerance",
	"Insufficient liquidity for this trade.": "Insufficient liquidity for this trade.",
	"Try enabling multi-hop trades.": "Try enabling multi-hop trades.",
	"Price Impact High": "Price Impact High",
	Swap: Swap$1,
	"Swap Anyway": "Swap Anyway",
	"Recent Transactions": "Recent Transactions",
	"clear all": "clear all",
	"Clear all": "Clear all",
	"No recent transactions": "No recent transactions",
	"Are you sure?": "Are you sure?",
	"Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.": "Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.",
	"Only use this mode if you know what you’re doing.": "Only use this mode if you know what you’re doing.",
	"Turn On Expert Mode": "Turn On Expert Mode",
	"Transaction Settings": "Transaction Settings",
	"Interface Settings": "Interface Settings",
	"Toggle Expert Mode": "Toggle Expert Mode",
	"Bypasses confirmation modals and allows high slippage trades. Use at your own risk.": "Bypasses confirmation modals and allows high slippage trades. Use at your own risk.",
	"Disable Multihops": "Disable Multihops",
	"Restricts swaps to direct pairs only.": "Restricts swaps to direct pairs only.",
	Audio: Audio$1,
	"🐰 Turn down your volume a bit before you swap": "🐰 Turn down your volume a bit before you swap",
	"Your transaction will revert if the price changes unfavorably by more than this percentage.": "Your transaction will revert if the price changes unfavorably by more than this percentage.",
	"Enter a valid slippage percentage": "Enter a valid slippage percentage",
	"Your transaction may fail": "Your transaction may fail",
	"Your transaction may be frontrun": "Your transaction may be frontrun",
	"Your transaction will revert if it is pending for more than this long.": "Your transaction will revert if it is pending for more than this long.",
	minutes: minutes,
	"Token Amount": "Token Amount",
	"Balance: %amount%": "Balance: %amount%",
	"LP tokens in your wallet": "LP tokens in your wallet",
	"Pooled %asset%": "Pooled %asset%",
	"By adding liquidity, you will earn 0.1% of all transactions for the pair, proportional to your share in the pool. The fees accrued each day will be added to the pool the following day, and you can receive your earnings by removing your liquidity.": "By adding liquidity, you will earn 0.1% of all transactions for the pair, proportional to your share in the pool. The fees accrued each day will be added to the pool the following day, and you can receive your earnings by removing your liquidity.",
	"Common bases": "Common bases",
	"These tokens are commonly paired with other tokens.": "These tokens are commonly paired with other tokens.",
	"Expanded results from inactive Token Lists": "Expanded results from inactive Token Lists",
	"Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists.": "Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists.",
	"No results found.": "No results found.",
	Manage: Manage$1,
	"Manage Tokens": "Manage your token list",
	"Import Tokens": "Import Tokens",
	"Import List": "Import List",
	"Import at your own risk": "Import at your own risk",
	"By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.": "By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.",
	"If you purchase a token from this list, you may not be able to sell it back.": "If you purchase a token from this list, you may not be able to sell it back.",
	Import: Import,
	via: via,
	"Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.": "Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.",
	"If you purchase an arbitrary token, you may be unable to sell it back.": "If you purchase an arbitrary token, you may be unable to sell it back.",
	"Unknown Source": "Unknown Source",
	Lists: Lists,
	See: See,
	"Update list": "Update list",
	"https:// or ipfs:// or ENS name": "https:// or ipfs:// or ENS name",
	Loaded: Loaded,
	Loading: Loading$1,
	"Enter valid token address": "Enter valid token address",
	"Custom Token": "Custom Token",
	"Custom Tokens": "Custom Tokens",
	"Unknown Error": "Unknown Error",
	"Select": "Select",
	"Search name or paste address": "Search name or paste address",
	"Add %asset% to Metamask": "Add %asset% to Metamask",
	"Added %asset%": "Added %asset%",
	"Transaction Submitted": "Transaction Submitted",
	"Wallet Address or ENS name": "Wallet Address or ENS name",
	Recipient: Recipient,
	"Waiting For Confirmation": "Waiting For Confirmation",
	"Confirm this transaction in your wallet": "Confirm this transaction in your wallet",
	Dismiss: Dismiss,
	Latest: Latest,
	"Notice for trading %symbol%": "Notice for trading %symbol%",
	"To trade SAFEMOON, you must:": "To trade SAFEMOON, you must:",
	"Click on the settings icon": "Click on the settings icon",
	"Set your slippage tolerance to 12%+": "Set your slippage tolerance to 12%+",
	"This is because SafeMoon taxes a 10% fee on each transaction:": "This is because SafeMoon taxes a 10% fee on each transaction:",
	"5% fee = redistributed to all existing holders": "5% fee = redistributed to all existing holders",
	"5% fee = used to add liquidity": "5% fee = used to add liquidity",
	"Warning: BONDLY has been compromised. Please remove liqudity until further notice.": "Warning: BONDLY has been compromised. Please remove liqudity until further notice.",
	Claimed: Claimed,
	Settings: Settings,
	"Transaction deadline": "Transaction deadline",
	"Convert ERC-20 to BEP-20": "Convert ERC-20 to BEP-20",
	"Need help ?": "Need help ?",
	"Select a token": "Select a token",
	"Enter a recipient": "Enter a recipient",
	"Invalid recipient": "Invalid recipient",
	Supply: Supply,
	"Your Liquidity": "Your Liquidity",
	"Remove liquidity to receive tokens back": "Remove liquidity to receive tokens back",
	"Trade anything. No registration, no hassle.": "Trade anything. No registration, no hassle.",
	"Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.": "Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.",
	Learn: Learn,
	"BNB token": "BNB token",
	"BTC token": "BTC token",
	"Earn passive income with crypto.": "Earn passive income with crypto.",
	translationLast: translationLast,
	translationEnd: translationEnd
};

var publicUrl = process.env.PUBLIC_URL;
var LS_KEY = 'storage_language';
var fetchLocale = function (locale) {
	return __awaiter(void 0, void 0, void 0, function () {
		var response, data;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0: return [4 /*yield*/, fetch(publicUrl + "/locales/" + locale + ".json")];
				case 1:
					response = _a.sent();
					return [4 /*yield*/, response.json()];
				case 2:
					data = _a.sent();
					return [2 /*return*/, data];
			}
		});
	});
};
var getLanguageCodeFromLS = function () {
	try {
		var codeFromStorage = localStorage.getItem(LS_KEY);
		return codeFromStorage || EN.locale;
	}
	catch (_a) {
		return EN.locale;
	}
};

var initialState$9 = {
	isFetching: true,
	currentLanguage: EN,
};
var saveLang = {};
// Export the translations directly
var languageMap = new Map();
languageMap.set(EN.locale, translations);
var LanguageContext = createContext(undefined);
var LanguageProvider = function (_a) {
	var lang = _a.lang, children = _a.children;
	var _b = __read(useState(function () {
		var codeFromStorage = getLanguageCodeFromLS();
		return __assign(__assign({}, initialState$9), { currentLanguage: languages[codeFromStorage] });
	}), 2), state = _b[0], setState = _b[1];
	var currentLanguage = state.currentLanguage;
	useEffect(function () {
		var fetchInitialLocales = function () {
			return __awaiter(void 0, void 0, void 0, function () {
				var codeFromStorage, enLocale, currentLocale;
				return __generator(this, function (_a) {
					switch (_a.label) {
						case 0:
							codeFromStorage = getLanguageCodeFromLS();
							if (!(codeFromStorage !== EN.locale)) return [3 /*break*/, 2];
							enLocale = languageMap.get(EN.locale);
							return [4 /*yield*/, fetchLocale(codeFromStorage)];
						case 1:
							currentLocale = _a.sent();
							languageMap.set(codeFromStorage, __assign(__assign({}, enLocale), currentLocale));
							_a.label = 2;
						case 2:
							setState(function (prevState) { return (__assign(__assign({}, prevState), { isFetching: false })); });
							return [2 /*return*/];
					}
				});
			});
		};
		fetchInitialLocales();
	}, [setState]);
	var setLanguage = function (language) {
		return __awaiter(void 0, void 0, void 0, function () {
			var locale, enLocale;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						if (!!languageMap.has(language.locale)) return [3 /*break*/, 2];
						setState(function (prevState) { return (__assign(__assign({}, prevState), { isFetching: true })); });
						return [4 /*yield*/, fetchLocale(language.locale)];
					case 1:
						locale = _a.sent();
						enLocale = languageMap.get(EN.locale);
						// Merge the EN locale to ensure that any locale fetched has all the keys
						languageMap.set(language.locale, __assign(__assign({}, enLocale), locale));
						localStorage.setItem(LS_KEY, language.locale);
						setState(function (prevState) { return (__assign(__assign({}, prevState), { isFetching: false, currentLanguage: language })); });
						return [3 /*break*/, 3];
					case 2:
						localStorage.setItem(LS_KEY, language.locale);
						setState(function (prevState) { return (__assign(__assign({}, prevState), { isFetching: false, currentLanguage: language })); });
						_a.label = 3;
					case 3: return [2 /*return*/];
				}
			});
		});
	};
	var setLanguageOfLocale = function (localeKeys) {
		return __awaiter(void 0, void 0, void 0, function () {
			var locale, enLocale;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						if (!languages[localeKeys])
							return [2 /*return*/];
						if (!!languageMap.has(localeKeys)) return [3 /*break*/, 2];
						setState(function (prevState) { return (__assign(__assign({}, prevState), { isFetching: true })); });
						return [4 /*yield*/, fetchLocale(localeKeys)];
					case 1:
						locale = _a.sent();
						enLocale = languageMap.get(EN.locale);
						// Merge the EN locale to ensure that any locale fetched has all the keys
						languageMap.set(localeKeys, __assign(__assign({}, enLocale), locale));
						localStorage.setItem(LS_KEY, localeKeys);
						setState(function (prevState) { return (__assign(__assign({}, prevState), { isFetching: false, currentLanguage: languages[localeKeys] })); });
						return [3 /*break*/, 3];
					case 2:
						localStorage.setItem(LS_KEY, localeKeys);
						setState(function (prevState) { return (__assign(__assign({}, prevState), { isFetching: false, currentLanguage: languages[localeKeys] })); });
						_a.label = 3;
					case 3: return [2 /*return*/];
				}
			});
		});
	};
	var translate = useCallback(function (key, data) {
		saveLang[key] = key;
		var translationSet = languageMap.has(currentLanguage.locale)
			? languageMap.get(currentLanguage.locale)
			: languageMap.get(EN.locale);
		var translatedText = translationSet[key] || key || '';
		// Check the existence of at least one combination of %%, separated by 1 or more non space characters
		var includesVariable = translatedText.match(/%\S+?%/gm);
		if (includesVariable && data) {
			var interpolatedText_1 = translatedText;
			Object.keys(data).forEach(function (dataKey) {
				var templateKey = new RegExp("%" + dataKey + "%", 'g');
				interpolatedText_1 = interpolatedText_1.replace(templateKey, data[dataKey].toString());
			});
			return interpolatedText_1;
		}
		return translatedText;
	}, [currentLanguage]);
	var getHTML = useCallback(function (key, data) {
		var translationSet = languageMap.has(currentLanguage.locale)
			? languageMap.get(currentLanguage.locale)
			: languageMap.get(EN.locale);
		var translatedText = translationSet[key] || key;
		// Check the existence of at least one combination of %%, separated by 1 or more non space characters
		var includesVariable = translatedText.match(/%\S+?%/gm);
		if (includesVariable && data) {
			var interpolatedText_2 = translatedText;
			Object.keys(data).forEach(function (dataKey) {
				var templateKey = new RegExp("%" + dataKey + "%", 'g');
				interpolatedText_2 = interpolatedText_2.replace(templateKey, data[dataKey].toString());
			});
			var el = React.createElement('span', {
				dangerouslySetInnerHTML: {
					__html: interpolatedText_2,
				},
			});
			// when key exists, it should still return element if there's defaultMessage() after getHTML()
			return el;
		}
		return translatedText;
	}, [currentLanguage]);
	useEffect(function () {
		if (lang) {
			setLanguageOfLocale(lang);
		}
	}, [lang]);
	return (jsx(LanguageContext.Provider, __assign({ value: __assign(__assign({}, state), { setLanguage: setLanguage, getHTML: getHTML, t: translate }) }, { children: children }), void 0));
};

var useTranslation = function () {
	var languageContext = useContext(LanguageContext);
	if (languageContext === undefined) {
		throw new Error('Language context is undefined');
	}
	return languageContext;
};

var _a$4;
(_a$4 = {},
	_a$4[scales$1.LG] = {
		width: 496,
		height: 700
	},
	_a$4[scales$1.MD] = {
		width: 248,
		height: 350.8
	},
	_a$4[scales$1.SM] = {
		width: 146,
		height: 177
	},
	_a$4);

var breakpointMap = {
	xxs: 369,
	xs: 370,
	sm: 576,
	md: 852,
	lg: 968,
	xl: 1080,
	xxl: 1280,
};
var breakpoints = Object.values(breakpointMap).map(function (breakpoint) { return breakpoint + "px"; });
var mediaQueries = {
	xxs: "@media screen and (max-width: " + breakpointMap.xs + "px)",
	xs: "@media screen and (min-width: " + breakpointMap.xs + "px)",
	sm: "@media screen and (min-width: " + breakpointMap.sm + "px)",
	md: "@media screen and (min-width: " + breakpointMap.md + "px)",
	lg: "@media screen and (min-width: " + breakpointMap.lg + "px)",
	xl: "@media screen and (min-width: " + breakpointMap.xl + "px)",
	xxl: "@media screen and (min-width: " + breakpointMap.xxl + "px)",
	nav: "@media screen and (min-width: " + breakpointMap.lg + "px)",
};
var mediaQueriesMargin = "\n  " + mediaQueries.xxs + " {\n    margin: 8px 4px;\n  }\n  " + mediaQueries.xs + " {\n    margin: 16px 8px;\n  }\n\n  " + mediaQueries.sm + " {\n    margin: 16px 16px;\n  }\n\n  " + mediaQueries.lg + " {\n    margin: 16px 24px;\n  }\n  " + mediaQueries.xl + " {\n    margin: 24px 32px;\n  }\n\n";
var mediaQueriesMarginRight = "\n  " + mediaQueries.xxs + " {\n    margin-right: 4px;\n  }\n  " + mediaQueries.xs + " {\n    margin-right: 8px;\n  }\n\n  " + mediaQueries.sm + " {\n    margin-right: 16px;\n  }\n\n  " + mediaQueries.lg + " {\n    margin-right: 24px;\n  }\n  " + mediaQueries.xl + " {\n    margin-right: 32px;\n  }\n\n";
var mediaQueriesPadding = "\n  " + mediaQueries.xxs + " {\n    padding: 8px 4px;\n  }\n  " + mediaQueries.xl + " {\n    padding: 16px 8px;\n  }\n\n  " + mediaQueries.xs + " {\n    padding: 16px 8px;\n  }\n\n  " + mediaQueries.sm + " {\n    padding: 16px 16px;\n  }\n\n  " + mediaQueries.lg + " {\n    padding: 16px 24px;\n  }\n";
var mediaQueriesSize = {
	margin: mediaQueriesMargin,
	marginr: mediaQueriesMarginRight,
	padding: mediaQueriesPadding,
};
var shadows = {
	level1: "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
	active: "0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(93, 149, 231, 0.6)",
	success: "0px 0px 0px 1px #5D95E7, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
	warning: "0px 0px 0px 1px #ec4f2b, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
	focus: "0px 0px 0px 1px #fbf2e9, 0px 0px 0px 4px rgba(93, 149, 231, 0.6)",
	input: "inset 0px 1px 3px 0px rgba(180, 200, 169,0.3)",
	inset: "inset 0px 1px 3px 0px rgba(180, 200, 169,0.3)",
	box: '0px 0px 50px 0px rgba(180, 200, 169, 0.2);',
	nav: '0px 0px 10px 0px rgba(51, 51, 51, 0.4)'
};
var spacing = [0, 4, 8, 16, 24, 32, 48, 64];
var radii = {
	small: "4px",
	default: "16px",
	nftImage: "10px",
	card: "20px",
	circle: "50%",
};
var zIndices = {
	dropdown: 10,
	modal: 100,
};
var base = {
	siteWidth: 1200,
	breakpoints: breakpoints,
	mediaQueries: mediaQueries,
	spacing: spacing,
	shadows: shadows,
	radii: radii,
	zIndices: zIndices,
	mediaQueriesSize: mediaQueriesSize,
	// breakpointMap,
};

/**
 * Can't use the media queries from "base.mediaQueries" because of how matchMedia works
 * In order for the listener to trigger we need have have the media query with a range, e.g.
 * (min-width: 370px) and (max-width: 576px)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
 */
((function () {
	var prevMinWidth = 0;
	return Object.keys(breakpointMap).reduce(function (accum, size, index) {
		var _a, _b;
		// Largest size is just a min-width of second highest max-width
		if (index === Object.keys(breakpointMap).length - 1) {
			return __assign(__assign({}, accum), (_a = {}, _a[size] = "(min-width: " + prevMinWidth + "px)", _a));
		}
		var minWidth = prevMinWidth;
		var breakpoint = breakpointMap[size];
		// Min width for next iteration
		prevMinWidth = breakpoint + 1;
		return __assign(__assign({}, accum), (_b = {}, _b[size] = "(min-width: " + minWidth + "px) and (max-width: " + breakpoint + "px)", _b));
	}, {});
}))();

var baseColors = {
	failure: "#ec4f2b",
	primary: "#5D95E7",
	primaryBright: "#53DEE9",
	primaryDark: "#0098A1",
	secondary: "#7645D9",
	success: "#5D95E7",
	warning: "#FFB237",
	transparent: "transparent",
};
var additionalColors = {
	binance: "#F0B90B",
	overlay: "#626262",
	gold: "#FFC700",
	silver: "#B2B2B2",
	bronze: "#E7974D",
	orange: "#FF780B",
};
var nftTokenColors = {
	triangleDinosaur: "#F3A5C4",
	meat: "#8A260E",
};
var lightColors = __assign(__assign(__assign(__assign({}, baseColors), additionalColors), nftTokenColors), {
	smHeadText: '#56604E', smTitletext: '#759290', white_blue: '#010101', white: "white", background: "#FAF9FA", backgroundPage: "#f5fdfc", backgroundLight: "#E7EFF9", backgroundSelect: "#F5F5F5", backgroundDisabled: "#969696", backgroundPrimary: "#8EB5EF", backgroundMember: "#5D95E7", backgroundCard: "#FFFFFF", backgroundAlt: "#FFFFFF", cardBorder: "#E7E3EB", contrast: "#191326", dropdown: "#F6F6F6", dropdownDeep: "#EEEEEE", invertedContrast: "#FFFFFF", input: "#F5F5F5", inputPanel: "#E7EFF9", inpuShadows: "inset 0px 1px 3px 0px rgba(16, 64, 54, 0.21)", inputSecondary: "#d7caec", inputSelect: "#DBDBDB", tertiary: "#EFF4F5", text: "#283433", white_black: '#000', member_num: '#305C9C', textValue: "#7E7E7E", textPrimary: "#5D95E7", textSubtle: "#5D95E7", textDisabled: "#BDC2C4", disabled: "#E9EAEB", gradients: {
		bubblegum: "linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)",
		inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
		cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
		blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
		violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
		violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
		gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
	}
});
var darkColors = __assign(__assign(__assign(__assign({}, baseColors), additionalColors), nftTokenColors), {
	smHeadText: '#B3C7E3', smTitletext: '#759290', white_blue: '#5D95E7', white: "white", secondary: "#9A6AFF", background: "#08060B", backgroundPage: "#0B1513", backgroundLight: "#334542", backgroundSelect: "#2f3836", backgroundDisabled: "#3c3742", backgroundPrimary: "#8EB5EF", backgroundMember: 'rgba(93, 149, 231, 0.498)', backgroundCard: "#191F2D", backgroundAlt: "#212827", cardBorder: "#383241", contrast: "#FFFFFF", dropdown: "#1E1D20", dropdownDeep: "#212827", invertedContrast: "#191326", input: "#292D34", inputPanel: "#21262A", inpuShadows: "inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35)", inputSelect: "#292D34", inputSecondary: "#262130", primaryDark: "#0098A1", tertiary: "#353547", text: "#bad1bd", white_black: '#FFFFFF', member_num: '#FFFFFF', textValue: "#7E7E7E", textPrimary: "#5D95E7", textSubtle: "#5D95E7", textDisabled: "#666171", disabled: "#524B63", gradients: {
		bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
		inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
		cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
		blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
		violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
		violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
		gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
	}
});

var light$7 = {
	background: lightColors.backgroundAlt,
};
var dark$7 = {
	background: darkColors.backgroundAlt,
};

var light$6 = {
	background: lightColors.backgroundCard,
	boxShadow: shadows.box,
	boxShadowActive: shadows.active,
	boxShadowSuccess: shadows.success,
	boxShadowWarning: shadows.warning,
	cardHeaderBackground: {
		default: lightColors.gradients.cardHeader,
		blue: lightColors.gradients.blue,
		bubblegum: lightColors.gradients.bubblegum,
		violet: lightColors.gradients.violet,
	},
	dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
var dark$6 = {
	background: darkColors.backgroundCard,
	boxShadow: shadows.box,
	boxShadowActive: shadows.active,
	boxShadowSuccess: shadows.success,
	boxShadowWarning: shadows.warning,
	cardHeaderBackground: {
		default: darkColors.gradients.cardHeader,
		blue: darkColors.gradients.blue,
		bubblegum: lightColors.gradients.bubblegum,
		violet: darkColors.gradients.violet,
	},
	dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};

var light$5 = {
	handleBackground: lightColors.backgroundAlt,
	handleShadow: lightColors.textDisabled,
};
var dark$5 = {
	handleBackground: darkColors.backgroundAlt,
	handleShadow: darkColors.textDisabled,
};

var light$4 = {
	handleBackground: lightColors.backgroundAlt,
};
var dark$4 = {
	handleBackground: darkColors.backgroundAlt,
};

var light$3 = {
	handleBackground: lightColors.backgroundAlt,
};
var dark$3 = {
	handleBackground: darkColors.backgroundAlt,
};

var light$2 = {
	background: lightColors.backgroundAlt,
};
var dark$2 = {
	background: darkColors.backgroundAlt,
};

var light$1 = {
	background: lightColors.backgroundAlt,
};
var dark$1 = {
	background: darkColors.backgroundAlt,
};

var light = {
	background: darkColors.backgroundAlt,
	text: darkColors.text,
	boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
};
var dark = {
	background: lightColors.backgroundAlt,
	text: lightColors.text,
	boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
};

var darkFilter = {
	brightness: 'brightness(0.8)',
	grayscale: 'grayscale(95%)',
	blur: 'blur(32px)',
};
var lightFilter = {
	brightness: 'brightness(1)',
	grayscale: 'grayscale(95%)',
	blur: 'blur(32px)',
};

var darkTheme = __assign(__assign({}, base), { isDark: true, filter: darkFilter, alert: dark$7, colors: darkColors, card: dark$6, toggle: dark$3, nav: dark$2, modal: dark$1, pancakeToggle: dark$5, radio: dark$4, tooltip: dark });

var lightTheme = __assign(__assign({}, base), { isDark: false, filter: lightFilter, alert: light$7, colors: lightColors, card: light$6, toggle: light$3, nav: light$2, modal: light$1, pancakeToggle: light$5, radio: light$4, tooltip: light });

var isTouchDevice = function () {
	return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

var Arrow = styled.div(templateObject_1$P || (templateObject_1$P = __makeTemplateObject(["\n  &,\n  &::before {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: 2px;\n    z-index: -1;\n  }\n\n  &::before {\n    content: \"\";\n    transform: rotate(45deg);\n    background: ", ";\n  }\n"], ["\n  &,\n  &::before {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: 2px;\n    z-index: -1;\n  }\n\n  &::before {\n    content: \"\";\n    transform: rotate(45deg);\n    background: ", ";\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.tooltip.background;
});
var StyledTooltip = styled.div(templateObject_2$s || (templateObject_2$s = __makeTemplateObject(["\n  padding: 16px;\n  font-size: 16px;\n  line-height: 130%;\n  border-radius: 16px;\n  max-width: 320px;\n  z-index: 101;\n  background: ", ";\n  color: ", ";\n  box-shadow: ", ";\n\n  &[data-popper-placement^=\"top\"] > ", " {\n    bottom: -4px;\n  }\n\n  &[data-popper-placement^=\"bottom\"] > ", " {\n    top: -4px;\n  }\n\n  &[data-popper-placement^=\"left\"] > ", " {\n    right: -4px;\n  }\n\n  &[data-popper-placement^=\"right\"] > ", " {\n    left: -4px;\n  }\n"], ["\n  padding: 16px;\n  font-size: 16px;\n  line-height: 130%;\n  border-radius: 16px;\n  max-width: 320px;\n  z-index: 101;\n  background: ", ";\n  color: ", ";\n  box-shadow: ", ";\n\n  &[data-popper-placement^=\"top\"] > ", " {\n    bottom: -4px;\n  }\n\n  &[data-popper-placement^=\"bottom\"] > ", " {\n    top: -4px;\n  }\n\n  &[data-popper-placement^=\"left\"] > ", " {\n    right: -4px;\n  }\n\n  &[data-popper-placement^=\"right\"] > ", " {\n    left: -4px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.tooltip.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.tooltip.text;
}, function (_a) {
	var theme = _a.theme;
	return theme.tooltip.boxShadow;
}, Arrow, Arrow, Arrow, Arrow);
var templateObject_1$P, templateObject_2$s;

var invertTheme = function (currentTheme) {
	if (currentTheme.isDark) {
		return lightTheme;
	}
	return darkTheme;
};
var portalRoot = document.getElementById("portal-root");
var useTooltip = function (content, options) {
	var _a = options.placement, placement = _a === void 0 ? "auto" : _a, _b = options.trigger, trigger = _b === void 0 ? "hover" : _b, _c = options.arrowPadding, arrowPadding = _c === void 0 ? 16 : _c, _d = options.tooltipPadding, tooltipPadding = _d === void 0 ? { left: 16, right: 16 } : _d, _e = options.tooltipOffset, tooltipOffset = _e === void 0 ? [0, 10] : _e;
	var _f = __read(useState(null), 2), targetElement = _f[0], setTargetElement = _f[1];
	var _g = __read(useState(null), 2), tooltipElement = _g[0], setTooltipElement = _g[1];
	var _h = __read(useState(null), 2), arrowElement = _h[0], setArrowElement = _h[1];
	var _j = __read(useState(false), 2), visible = _j[0], setVisible = _j[1];
	var isHoveringOverTooltip = useRef(false);
	var hideTimeout = useRef();
	var hideTooltip = useCallback(function (e) {
		var hide = function () {
			e.stopPropagation();
			e.preventDefault();
			setVisible(false);
		};
		if (trigger === "hover") {
			if (hideTimeout.current) {
				window.clearTimeout(hideTimeout.current);
			}
			if (e.target === tooltipElement) {
				isHoveringOverTooltip.current = false;
			}
			if (!isHoveringOverTooltip.current) {
				hideTimeout.current = window.setTimeout(function () {
					if (!isHoveringOverTooltip.current) {
						hide();
					}
				}, 100);
			}
		}
		else {
			hide();
		}
	}, [tooltipElement, trigger]);
	var showTooltip = useCallback(function (e) {
		e.stopPropagation();
		e.preventDefault();
		setVisible(true);
		if (trigger === "hover") {
			if (e.target === targetElement) {
				// If we were about to close the tooltip and got back to it
				// then prevent closing it.
				clearTimeout(hideTimeout.current);
			}
			if (e.target === tooltipElement) {
				isHoveringOverTooltip.current = true;
			}
		}
	}, [tooltipElement, targetElement, trigger]);
	var toggleTooltip = useCallback(function (e) {
		e.stopPropagation();
		setVisible(!visible);
	}, [visible]);
	// Trigger = hover
	useEffect(function () {
		if (targetElement === null || trigger !== "hover")
			return undefined;
		if (isTouchDevice()) {
			targetElement.addEventListener("touchstart", showTooltip);
			targetElement.addEventListener("touchend", hideTooltip);
		}
		else {
			targetElement.addEventListener("mouseenter", showTooltip);
			targetElement.addEventListener("mouseleave", hideTooltip);
		}
		return function () {
			targetElement.removeEventListener("touchstart", showTooltip);
			targetElement.removeEventListener("touchend", hideTooltip);
			targetElement.removeEventListener("mouseenter", showTooltip);
			targetElement.removeEventListener("mouseleave", showTooltip);
		};
	}, [trigger, targetElement, hideTooltip, showTooltip]);
	// Keep tooltip open when cursor moves from the targetElement to the tooltip
	useEffect(function () {
		if (tooltipElement === null || trigger !== "hover")
			return undefined;
		tooltipElement.addEventListener("mouseenter", showTooltip);
		tooltipElement.addEventListener("mouseleave", hideTooltip);
		return function () {
			tooltipElement.removeEventListener("mouseenter", showTooltip);
			tooltipElement.removeEventListener("mouseleave", hideTooltip);
		};
	}, [trigger, tooltipElement, hideTooltip, showTooltip]);
	// Trigger = click
	useEffect(function () {
		if (targetElement === null || trigger !== "click")
			return undefined;
		targetElement.addEventListener("click", toggleTooltip);
		return function () { return targetElement.removeEventListener("click", toggleTooltip); };
	}, [trigger, targetElement, visible, toggleTooltip]);
	// Handle click outside
	useEffect(function () {
		if (trigger !== "click")
			return undefined;
		var handleClickOutside = function (_a) {
			var target = _a.target;
			if (target instanceof Node) {
				if (tooltipElement != null &&
					targetElement != null &&
					!tooltipElement.contains(target) &&
					!targetElement.contains(target)) {
					setVisible(false);
				}
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return function () { return document.removeEventListener("mousedown", handleClickOutside); };
	}, [trigger, targetElement, tooltipElement]);
	// Trigger = focus
	useEffect(function () {
		if (targetElement === null || trigger !== "focus")
			return undefined;
		targetElement.addEventListener("focus", showTooltip);
		targetElement.addEventListener("blur", hideTooltip);
		return function () {
			targetElement.removeEventListener("focus", showTooltip);
			targetElement.removeEventListener("blur", hideTooltip);
		};
	}, [trigger, targetElement, showTooltip, hideTooltip]);
	// On small screens Popper.js tries to squeeze the tooltip to available space without overflowing beyound the edge
	// of the screen. While it works fine when the element is in the middle of the screen it does not handle well the
	// cases when the target element is very close to the edge of the screen - no margin is applied between the tooltip
	// and the screen edge.
	// preventOverflow mitigates this behaviour, default 16px paddings on left and right solve the problem for all screen sizes
	// that we support.
	// Note that in the farm page where there are tooltips very close to the edge of the screen this padding works perfectly
	// even on the iPhone 5 screen (320px wide), BUT in the storybook with the contrived example ScreenEdges example
	// iPhone 5 behaves differently overflowing beyound the edge. All paddings are identical so I have no idea why it is,
	// and fixing that seems like a very bad use of time.
	var _k = usePopper(targetElement, tooltipElement, {
		placement: placement,
		modifiers: [
			{
				name: "arrow",
				options: { element: arrowElement, padding: arrowPadding },
			},
			{ name: "offset", options: { offset: tooltipOffset } },
			{ name: "preventOverflow", options: { padding: tooltipPadding } },
		],
	}), styles = _k.styles, attributes = _k.attributes;
	var tooltip = (jsxs(StyledTooltip, __assign({ ref: setTooltipElement, style: styles.popper }, attributes.popper, { children: [jsx(ThemeProvider, __assign({ theme: invertTheme }, { children: content }), void 0), jsx(Arrow, { ref: setArrowElement, style: styles.arrow }, void 0)] }), void 0));
	var tooltipInPortal = portalRoot ? createPortal(tooltip, portalRoot) : null;
	return {
		targetRef: setTargetElement,
		tooltip: tooltipInPortal !== null && tooltipInPortal !== void 0 ? tooltipInPortal : tooltip,
		tooltipVisible: visible,
	};
};

var ModalHeader = styled.div(templateObject_1$O || (templateObject_1$O = __makeTemplateObject(["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"], ["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"])), function (_a) {
	var background = _a.background;
	return background || "transparent";
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
});
var ModalTitle = styled(Flex)(templateObject_2$r || (templateObject_2$r = __makeTemplateObject(["\n  align-items: center;\n  flex: 1;\n"], ["\n  align-items: center;\n  flex: 1;\n"])));
var ModalBody = styled(Flex)(templateObject_3$i || (templateObject_3$i = __makeTemplateObject(["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"], ["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"])));
var ModalCloseButton = function (_a) {
	var onDismiss = _a.onDismiss;
	return (jsx(IconButton, __assign({ variant: "text", onClick: onDismiss, "aria-label": "Close the dialog" }, { children: jsx(Icon$G, { color: "primary" }, void 0) }), void 0));
};
var ModalBackButton = function (_a) {
	var onBack = _a.onBack;
	return (jsx(IconButton, __assign({ variant: "text", onClick: onBack, "area-label": "go back", mr: "8px" }, { children: jsx(Icon$O, { width: 32, color: "primary" }, void 0) }), void 0));
};
var ModalContainer = styled(Box)(templateObject_4$9 || (templateObject_4$9 = __makeTemplateObject(["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"], ["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.modal.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.box;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
}, function (_a) {
	var theme = _a.theme;
	return theme.radii.card;
}, function (_a) {
	var theme = _a.theme;
	return theme.zIndices.modal;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.xs;
}, function (_a) {
	var minWidth = _a.minWidth;
	return minWidth;
});
var templateObject_1$O, templateObject_2$r, templateObject_3$i, templateObject_4$9;

var Modal = function (_a) {
	var title = _a.title, onDismiss = _a.onDismiss, onBack = _a.onBack, children = _a.children, _b = _a.hideCloseButton, hideCloseButton = _b === void 0 ? false : _b, _c = _a.bodyPadding, bodyPadding = _c === void 0 ? "24px" : _c, _d = _a.headerBackground, headerBackground = _d === void 0 ? "transparent" : _d, _e = _a.minWidth, minWidth = _e === void 0 ? "320px" : _e, props = __rest(_a, ["title", "onDismiss", "onBack", "children", "hideCloseButton", "bodyPadding", "headerBackground", "minWidth"]);
	var theme = useTheme$1();
	return (jsxs(ModalContainer, __assign({ minWidth: minWidth }, props, { children: [jsxs(ModalHeader, __assign({ background: getThemeValue("colors." + headerBackground, headerBackground)(theme) }, { children: [jsxs(ModalTitle, { children: [onBack && jsx(ModalBackButton, { onBack: onBack }, void 0), jsx(Heading, { children: title }, void 0)] }, void 0), !hideCloseButton && jsx(ModalCloseButton, { onDismiss: onDismiss }, void 0)] }), void 0), jsx(ModalBody, __assign({ p: bodyPadding }, { children: children }), void 0)] }), void 0));
};

var ModalWrapper$1 = styled.div(templateObject_1$N || (templateObject_1$N = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.zIndices.modal - 1;
});
var Context$1 = createContext({
	isOpen: false,
	nodeId: "",
	modalNode: null,
	setModalNode: function () { return null; },
	onPresent: function () { return null; },
	onDismiss: function () { return null; },
	setCloseOnOverlayClick: function () { return true; },
});
var ModalProvider$1 = function (_a) {
	var children = _a.children;
	var _b = __read(useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
	var _c = __read(useState(), 2), modalNode = _c[0], setModalNode = _c[1];
	var _d = __read(useState(""), 2), nodeId = _d[0], setNodeId = _d[1];
	var _e = __read(useState(true), 2), closeOnOverlayClick = _e[0], setCloseOnOverlayClick = _e[1];
	var handlePresent = function (node, newNodeId) {
		setModalNode(node);
		setIsOpen(true);
		setNodeId(newNodeId);
	};
	var handleDismiss = function () {
		setModalNode(undefined);
		setIsOpen(false);
		setNodeId("");
	};
	var handleOverlayDismiss = function () {
		if (closeOnOverlayClick) {
			handleDismiss();
		}
	};
	return (jsxs(Context$1.Provider, __assign({
		value: {
			isOpen: isOpen,
			nodeId: nodeId,
			modalNode: modalNode,
			setModalNode: setModalNode,
			onPresent: handlePresent,
			onDismiss: handleDismiss,
			setCloseOnOverlayClick: setCloseOnOverlayClick,
		}
	}, {
		children: [isOpen && (jsxs(ModalWrapper$1, {
			children: [jsx(Overlay, { show: true, onClick: handleOverlayDismiss }, void 0), React.isValidElement(modalNode) &&
				React.cloneElement(modalNode, {
					onDismiss: handleDismiss,
				})]
		}, void 0)), children]
	}), void 0));
};
var templateObject_1$N;

var useModal = function (modal, closeOnOverlayClick, updateOnPropsChange, modalId) {
	if (closeOnOverlayClick === void 0) { closeOnOverlayClick = true; }
	if (updateOnPropsChange === void 0) { updateOnPropsChange = false; }
	if (modalId === void 0) { modalId = "defaultNodeId"; }
	var _a = useContext(Context$1), isOpen = _a.isOpen, nodeId = _a.nodeId, modalNode = _a.modalNode, setModalNode = _a.setModalNode, onPresent = _a.onPresent, onDismiss = _a.onDismiss, setCloseOnOverlayClick = _a.setCloseOnOverlayClick;
	var onPresentCallback = useCallback(function () {
		onPresent(modal, modalId);
	}, [modal, modalId, onPresent]);
	// Updates the "modal" component if props are changed
	// Use carefully since it might result in unnecessary rerenders
	// Typically if modal is staic there is no need for updates, use when you expect props to change
	useEffect(function () {
		// NodeId is needed in case there are 2 useModal hooks on the same page and one has updateOnPropsChange
		if (updateOnPropsChange && isOpen && nodeId === modalId) {
			var modalProps = get(modal, "props");
			var oldModalProps = get(modalNode, "props");
			// Note: I tried to use lodash isEqual to compare props but it is giving false-negatives too easily
			// For example ConfirmSwapModal in exchange has ~500 lines prop object that stringifies to same string
			// and online diff checker says both objects are identical but lodash isEqual thinks they are different
			// Do not try to replace JSON.stringify with isEqual, high risk of infinite rerenders
			// TODO: Find a good way to handle modal updates, this whole flow is just backwards-compatible workaround,
			// would be great to simplify the logic here
			if (modalProps && oldModalProps && JSON.stringify(modalProps) !== JSON.stringify(oldModalProps)) {
				setModalNode(modal);
			}
		}
	}, [updateOnPropsChange, nodeId, modalId, isOpen, modal, modalNode, setModalNode]);
	useEffect(function () {
		setCloseOnOverlayClick(closeOnOverlayClick);
	}, [closeOnOverlayClick, setCloseOnOverlayClick]);
	return [onPresentCallback, onDismiss];
};

var Icon$l = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1212 1024" }, props, { children: [jsx("path", { d: "M1211.337271 436.491268c-6.284381-38.844763-124.366996-77.006441-257.932869-107.972957v17.168201c-0.409851-2.049255-0.728624-4.09851-1.138475-6.147764-0.592007-2.868957-1.138475-7.195161-1.912637-11.703522q-14.344783-3.324347-28.917262-6.512076c1.138475 4.5539 2.459106 8.561331 3.324346 12.386606 0.500929 2.231411 0.91078 4.5539 1.411709 6.648694a47.315016 47.315016 0 0 0-11.657983 3.369885c1.684943-7.650551 3.278808-15.301102 4.5539-22.769497-23.862433-5.236984-47.952562-10.246274-71.769456-14.936791a38.389373 38.389373 0 0 1 4.553899 25.183065q-6.420998-13.206309-13.661698-26.048306v-0.910779q-17.21374-3.369886-34.108708-6.557616l1.36617 2.27695q-7.878246 25.000908-16.211882 49.819661-3.18773-12.659841-6.648693-25.274143c1.320631-2.823418 2.595723-5.692374 4.007431-8.561331 3.278808-6.603154 6.648693-13.16077 10.064118-19.672846-53.963709-10.064118-104.284299-18.534371-144.221998-24.90983 3.688659-0.592007 7.286239-1.36617 10.792742-2.231411l0.45539-1.36617q1.548326 0.273234 3.096652 0.45539c58.01668-15.938648 88.300112-65.25738 88.300111-65.25738C638.638868 171.682012 578.345238 246.411503 569.237439 258.615953l-5.191445-0.728624-5.191446 1.730482a160.798192 160.798192 0 0 0-66.532472-51.413525c-10.155196 5.601296-20.037158 11.293671-29.828041 16.986045a38.207217 38.207217 0 0 0-6.238843-10.382891c-0.364312-2.185872-0.774163-4.5539-1.138475-6.512076 11.840139-0.546468 23.725816-0.774163 35.565956-0.728624a174.824202 174.824202 0 0 0-94.402337-9.790884l-2.459106 5.87453c0.45539-1.912638 0.865241-3.825276 1.275092-5.737913a230.791627 230.791627 0 0 0-22.769498 4.872672s43.94513 71.5873 127.509187 70.038975c-1.229553-4.5539-2.550184-9.381033-4.007432-14.07155a13.024153 13.024153 0 0 0-0.683085-1.366169 37.433054 37.433054 0 0 1 30.647744 11.29367 12.477685 12.477685 0 0 0-6.648693 2.641262c4.09851-0.592007 8.242558-1.320631 12.477684-2.27695l-15.118946 5.328063a13.115231 13.115231 0 0 0-1.730482 6.648693q-0.273234\r\n      31.057595-0.500929 62.115189c14.435861-9.745345 23.224888-14.4814 23.224888-14.4814s18.215598 2.641262 44.036208 6.648693c-1.184014-4.5539-2.322489-9.107799-3.552042-13.661698l8.288097 7.650551c0 2.185872 0 4.5539 0.273234 6.603154 61.477643 9.51765 160.616036 25.683993 174.550969 33.289006 20.492548 11.111515-77.416292 112.754552-107.153256 116.488749-16.075265 2.003716-96.451592-4.189588-157.473845-19.171917-0.273234 7.559473-0.546468 15.118946-0.774163 22.769498l-5.464679-24.226746C442.183643 452.475456 408.666942 434.214319 433.258 409.850956a578.345238 578.345238 0 0 1 77.780604-64.710912q-1.229553-7.195161-2.504645-14.344783h1.047397a42.487882 42.487882 0 0 0 2.914495 12.477684 575.658438 575.658438 0 0 0-10.883819-63.754593C391.179968 319.774824 304.018332 361.351926 235.573222 403.111185q4.96375 9.381033 10.42843 18.534371l-3.825276 8.789026c-5.510218-4.872672-11.065976-9.608728-16.75835-13.661698 0-2.504645 0-4.918211 0.273234-7.331779q-18.670988 11.703522-35.474877 23.407044 1.36617 6.967466 2.504644 13.980471-2.73234-5.965608-5.41914-11.931216-13.661699 9.699806-26.321539 19.399612a491.821148 491.821148 0 0 1 1.36617 58.927459c-3.18773-6.557615-6.375459-13.115231-9.699806-19.581768-0.774163-10.246274-1.684943-20.492548-2.641262-30.693282C38.298295 552.752323 3.779737 640.597045 0.318773 713.231742c0.683085 3.506503 1.411709 7.013005 2.094794 10.519508H9.107799c-1.867099 1.958177-3.64312 4.052971-5.464679 6.147764 0 0.819702 0.318773 1.639404 0.45539 2.459106-0.683085 3.005574-1.275092 6.056686-1.912638 9.107799 5.737913 13.661699 23.862433 29.554808 51.231369 46.67747 1.320631-5.009289 2.686801-10.018579 3.961893-15.027868a43.307584 43.307584 0 0 1 1.229553 18.215598c49.500888 30.101276 126.188556 63.754593 213.532348 96.087279q1.138475-24.181206 2.459106-48.316873h9.107799c1.457248 17.578052 3.142191 35.156104 4.553899 52.688617l-1.001858 1.36617c33.562239 12.158912 68.308493 24.044589 103.874448 35.383799L382.527559\r\n      880.359854c4.827133 7.286239 9.927501 14.390322 14.891252 21.585484 0.45539 7.149622 1.001858 14.299244 1.457247 21.448867L392.864911 928.995501c46.768548 14.982329 94.402337 29.00834 140.761034 41.440486a139.941332 139.941332 0 0 1-0.409851-23.361505c2.686801 6.375459 5.373601 12.70538 8.197019 18.989761 0 2.094794-0.364312 4.189588-0.546468 6.32992 24.090128 6.375459 47.861484 12.341068 70.904216 17.760208h43.353123a63.754593 63.754593 0 0 1 45.129144 18.716527c78.099377 14.435861 141.39858 19.627307 174.277735 10.792742a110.204368 110.204368 0 0 0 22.769497-9.107799c-1.184014-11.111515-2.231411-22.268569-3.460963-33.380083a34.473019 34.473019 0 0 0 2.550183 4.280665 80.012014 80.012014 0 0 1 3.597581 15.210025 26.913546 26.913546 0 0 0 3.870815 10.246274c26.321539-15.665414 54.009248-42.305726 81.514801-75.913505-0.774163-2.641262-1.502787-5.328062-2.27695-7.969324l2.049255 1.275091a11.475827 11.475827 0 0 0 4.553899 1.457248q6.921927-8.652409 13.661699-17.851286a127.509186 127.509186 0 0 0-3.961893-16.394038l10.792742 3.825276c0 0.956319 0 1.912638 0.318773 2.868956 110.705297-152.100244 211.027703-397.282194 200.826969-461.719872zM567.279263 294.728377a40.302011 40.302011 0 0 0-36.704431-1.593865c-0.91078-2.003716-1.730482-3.916354-2.732339-5.828992 13.297387-5.737913 26.549234-11.157054 39.801081-16.029726a149.959911 149.959911 0 0 1-0.364311 23.452583z m30.693282-24.727675h-26.913546q8.470253-3.051113 16.894967-5.828991a89.620742 89.620742 0 0 1 12.386607-6.284382zM34.199785 683.585856c0.91078 5.783452 1.730482 11.612444 2.550184 17.395896l-3.779737 2.550184c0.409851-6.78531 0.865241-13.297387 1.229553-19.94608z m0 74.911647q-2.003716-12.614302-4.189587-25.228603c7.377317-33.243466 15.574336-66.304777 24.181206-99.229471a836.642419 836.642419 0 0 1-19.763924 124.458074z m963.605138-413.812849q2.368028 6.238842 4.553899 12.477685c-2.231411-0.318773-4.5539-0.500929-6.648693-0.865241 1.138475-3.916354 1.593865-7.787168\r\n      2.322489-11.657983z m-165.944099 5.145907c1.776021 3.825276 3.506503 7.605012 5.236985 11.475826l-7.69609 13.206309c0.956319-8.242558 1.82156-16.485116 2.732339-24.682135zM772.386897 387.081459l1.684942 7.286239c-1.730482 4.96375-3.506503 9.881962-5.236984 14.845712 1.184014-7.468395 2.368028-14.845712 3.552042-22.131951z m-25.775072 126.643945q-6.648693 12.796458-12.750918 25.866149c0-1.36617 0.409851-2.686801 0.45539-4.144048V488.633418q-0.409851-32.287148-1.502787-64.528756 6.78531 44.946988 13.752776 89.529664z m-29.964658-17.350357c1.867099 8.652409 3.870815 17.304818 5.87453 25.957227l-2.595723 13.661699a39.391231 39.391231 0 0 1-10.656125 0.592007q3.870815-20.037158 7.377318-40.210933z m-25.137526-9.107799c-2.641262 13.024153-5.282523 26.048305-7.878246 39.117997a46.950704 46.950704 0 0 1-10.610586-11.657983 216.401305 216.401305 0 0 0 18.443293-27.460014z m-50.092894 17.21374q3.415425 15.255563 6.876388 30.511127-4.5539 12.796458-8.789026 25.592915 1.184014-27.778787 2.094794-56.058503z m-159.705256-194.542587c2.641262 14.709095 4.5539 29.554808 6.512076 44.40052-5.282523-5.373601-10.382891-10.929359-15.346641-16.621733z m-54.373561 4.96375q4.5539 24.818752 9.107799 49.728583a44.218364 44.218364 0 0 0-14.253705-2.459106c0-8.424714-0.409851-16.849428-1.138475-25.274142s-1.36617-16.257421-1.912638-24.181206a33.197927 33.197927 0 0 0 8.197019 2.185871zM330.567566 423.922506c0.273234 9.107799 0.227695 17.942364 0 26.959085-0.637546 0.728624-1.229553 1.457248-1.912638 2.140333s-0.728624 0.546468-1.092936 0.91078l-5.646835-9.51765c2.823418-6.830849 5.965608-13.61616 8.652409-20.492548z m-12.158912-39.89216c-1.457248 4.052971-3.051113 8.105941-4.553899 12.113373v-16.075266z m-131.42554 73.909789c3.415425 3.142191 6.967466 6.193303 10.473969 9.107799a181.245201 181.245201 0 0 0 2.003716 40.34755c-0.546468 6.375459-1.138475 12.70538-1.639404 19.080839-0.865241 0-1.82156 0-2.686801 0.409851a33.015771 33.015771 0 0 0-8.424714\r\n      3.734197 527.751415 527.751415 0 0 0 0.273234-72.680236z m-2.777879 29.327113a464.49775 464.49775 0 0 0-0.45539 55.921886 40.985096 40.985096 0 0 0-8.014863 3.005574c0.273234-21.949796 0.318773-42.442343-0.728624-60.430247l-1.092936-18.989761a409.304488 409.304488 0 0 0 10.291813 20.492548z m-55.694191 236.484002c-0.819702-3.916354-1.82156-7.787168-2.595722-11.703522l-0.500929-2.777879a14.208166 14.208166 0 0 0 0.318773-2.550183c0.227695-7.013005 0.364312-13.980472 0.546468-20.947938 1.82156 4.189588 3.597581 8.424714 5.464679 12.614302-1.092936 8.424714-2.322489 16.894967-3.233269 25.36522z m111.980389 0H241.356674z m30.966517 61.705338c0.409851-7.69609 0.774163-15.665414 1.047397-23.99905l2.504645-0.592007 1.502787 8.197019c-1.593865 5.601296-3.278808 11.020437-5.054829 16.530655z m99.821477-8.105941q-5.100367-26.822468-9.699806-53.736014h22.405186c1.229553 18.853144 1.82156 37.706288 2.185872 56.559432a38.708146 38.708146 0 0 0-14.891252-2.686801z m-36.431196-45.857768a346.779448 346.779448 0 0 1-50.092894-2.27695c1.867099 11.020437 3.688659 22.040874 5.692374 33.015772-3.324347 0-6.648693-0.409851-9.97304-0.500929 0-15.710953-8.333636-31.330829-24.955369-36.431196-82.197886-13.661699-177.602081-50.092895-90.713679-126.871641 121.406961-107.244334 169.450601-123.547294 169.450601-123.547294s25.228603 5.373601 57.880063 13.661699l-1.320631-8.515792q6.648693-12.796458 12.750919-25.866149c0 1.36617-0.409851 2.686801-0.45539 4.144048v33.061311l17.259279 4.553899c-1.776021-8.242558-3.688659-16.439577-5.601296-24.682135l2.595722-13.661699a39.391231 39.391231 0 0 1 10.656125-0.592007q-3.734198 19.536229-7.149622 39.072458c8.470253 2.322489 17.031584 4.5539 25.547376 7.286239 2.413567-12.022295 4.872672-24.090128 7.240701-36.112423a46.950704 46.950704 0 0 1 10.610585 11.657983 210.253541 210.253541 0 0 0-16.849428 24.773213c49.500888 14.754634 95.63189 32.560382 90.121672 46.631931a106.196937 106.196937 0 0 1-15.073408\r\n      22.769498v7.787168c-0.683085-1.730482-1.411709-3.460964-2.140332-5.236984-42.16911 52.369844-148.274968 154.058421-185.525867 156.016597z \r\n      m138.620702-5.464679a38.480451 38.480451 0 0 0-12.341068-0.227695v-2.140333h13.206308c-0.409851 0.91078-0.728624 1.684943-0.728624 2.504645z m38.708145 177.237769q-2.641262-5.828991-5.145906-11.749061a42.123571 42.123571 0 0 1 5.373601-7.149622q-0.409851 9.563189-0.318773 19.0353z m30.146815 30.010197a93.081706 93.081706 0 0 1 10.747203 23.771356 65.803848 65.803848 0 0 1-9.563189 0.45539l-2.641262-3.552042a440.589778 440.589778 0 0 1-2.6868-75.959044l10.83828 24.636597h0.318773v0.592007l5.00929 11.384748c-9.335494-0.273234-18.443293 8.743487-12.113373 18.944222z m14.299245-73.86425c0-6.056686 0-12.113373-0.318773-18.215598l2.960034 3.779737c-1.047397 4.918211-1.867099 9.745345-2.732339 14.572478z m36.066884 77.416292H592.006937l-17.077123-38.935841a69.173734 69.173734 0 0 0 17.851286 11.020437q-0.774163 14.253705-0.182156 28.09756z m83.928368 24.45444l-4.5539-16.986045 5.328063 7.468396c-0.409851 3.369886-0.683085 6.557615-0.91078 9.745344z m23.99905 33.197928q0.318773-11.111515 0.956319-22.22303c1.138475 7.149622 2.185872 14.299244 3.278808 21.448867a36.157962 36.157962 0 0 1-4.326205 1.001858z m22.769498-40.620784c0 3.870815 0.728624 7.969324 1.275092 12.113373-5.692374-14.026011-10.88382-28.416333-15.619876-43.353123a39.710004 39.710004 0 0 0-8.197019-14.709096q4.96375-15.210024 9.927501-30.8299c1.867099-5.87453 3.825276-11.703522 5.828992-17.486974q5.236984 10.88382 10.473968 21.722101a411.581438 411.581438 0 0 0-3.916353 72.771314z m176.463606-173.913422a13.251848 13.251848 0 0 0 3.506503 2.413567v8.789026c-3.096652 1.593865-6.238842 3.096652-9.107799 4.827133a250.464473 250.464473 0 0 0-14.162628-23.862433l2.322489-12.568763a148.548202 148.548202 0 0 0 17.168201 20.629165z m-7.878246-53.91817a42.761116 42.761116 0 0 0 6.102225-2.914496c0 4.5539-0.318773 8.743487-0.45539 13.11523q-3.369886-4.781594-5.920069-9.973039z m36.70443 187.757277a36.886586 36.886586 0 0 0-23.862433 4.553899 38.890302 38.890302 0 0\r\n      0-15.210025 17.077123c-0.273234-2.231411-0.45539-4.5539-0.728624-6.694232a114.257339 114.257339 0 0 0 19.855002-39.846621c6.420998-4.5539 13.206309-8.014863 19.900541-11.885678z m-93.81033-146.453409a124.458074 124.458074 0 0 1-16.257421 69.446968c-2.914496 4.5539-5.282523 9.107799-7.741629 14.02601a42.533421 42.533421 0 0 1 28.370794-3.460963l4.05297 0.865241 12.022295 24.955369a14.344783 14.344783 0 0 0-1.001858 3.779736l-1.639404 17.304819h-2.459106l-7.104083-19.900541a12.978614 12.978614 0 0 0-24.773213 0c-1.047397 3.142191-1.958177 6.284381-2.914496 9.426572l-3.597581-20.765782a10.610586 10.610586 0 0 0-7.331778-8.242558 42.442343 42.442343 0 0 1 5.100368-3.233269c0.728624-6.102225 1.548326-12.24999 2.732339-18.670988 3.415425-18.488832 7.69609-36.841047 12.386607-55.147723-32.970232 33.425622-60.475786 58.563148-60.475785 58.563148s-11.521366-1.229553-29.91912-3.552042c0 0.45539 0 0.91078-0.273234 1.36617l-0.409851 2.413567-1.958177-4.144049c-39.618926-5.054828-108.109574-14.982329-163.667149-28.917262l-2.049254 9.107799c-2.868957-3.506503-5.692374-7.013005-8.652409-10.42843l0.364312-1.548325c-37.660749-10.109657-67.670947-22.131952-75.68581-35.83919 8.743487-26.276 30.055737-65.986004 68.308492-112.117006l-0.683085-18.215598c1.138475 4.918211 2.322489 9.836423 3.552042 14.709096 10.473969-12.432146 22.22303-25.274142 35.247182-38.480451-4.280666-13.661699-8.470253-27.050163-12.477684-40.666323q10.610586 10.656125 21.631022 20.85686v10.792742c17.21374-16.803889 36.431196-34.017629 58.153297-51.459065 0 0 243.997936 30.875439 277.332481 91.077991-11.521366 32.059453-57.242517 83.882829-98.182074 126.097477z m-28.052021-224.416168c0.637546-0.728624 1.229553-1.457248 1.912638-2.140333s0.728624-0.546468 1.092936-0.91078l5.646835 9.51765c-2.960035 6.830849-6.011147 13.661699-8.789026 20.447009-0.273234-8.971182-0.273234-17.942364 0.136617-26.913546z m84.429297 29.190496l3.825276-8.789026c5.510218 4.872672 11.065976\r\n      9.608728 16.75835 13.661698 0 3.142191-0.273234 6.238842-0.364312 9.1078v0.364311l-2.231411 1.502787c-2.231411 1.411709-4.5539 2.641262-6.739771 3.961893-3.552042-6.512076-7.331778-13.16077-11.248132-19.809463z m34.746253 37.387515c0-7.2407 0.500929-14.435861 0.728624-21.676562q1.912638 7.422856 4.235127 14.663557z m9.563189 65.393997l1.229553-67.170018c4.5539 3.734198 7.741629 22.22303 9.836423 28.006482l9.563189 26.458156a37.250898 37.250898 0 0 1-20.629165 12.70538z m23.634739 62.843813l0.683085-13.661698h18.807605c-0.45539-9.107799-1.184014-18.57991-1.229553-27.915404 2.459106 0.592007 4.872672 1.275092 7.2407 2.003716q15.39218 10.246274 30.465588 20.856859-27.733248 9.836423-55.967425 18.716527zM1056.504687 678.531028l-0.227695-4.189588 13.889394-8.105941 1.047397 12.341068z m4.052971-157.701541c-14.344783 11.976756-45.538995 40.985096-69.81128 47.58825l1.320631 13.206309c-3.142191-4.007432-6.420998-7.923785-9.745345-11.840139a21.448867 21.448867 0 0 1-7.058544-0.865241c-3.64312-1.138475-12.158912-3.096652-23.725816-5.783452 0.91078 2.049255 1.82156 4.052971 2.6868 6.102225l-4.280665 6.102226c-1.047397-4.5539-1.958177-8.834565-2.868957-13.251848-66.16816-15.483258-215.581603-52.051071-182.930143-99.047314 39.43677-56.832666 80.148631-82.698815 80.148631-82.698816s210.75447 61.887494 225.509104 82.698816 8.743487 43.03435-9.107799 57.834523z m93.172784-77.826142l10.565047 49.728582c-9.107799-9.563189-17.851286-19.308534-26.048305-29.327112 5.373601-6.739771 10.337352-13.661699 15.619875-20.40147z m-10.064118 211.801866c-0.227695-3.096652-0.45539-6.147764-0.728624-9.107799 1.320631-1.548326 2.777879-3.005574 4.09851-4.553899-1.001858 4.508361-2.140333 9.107799-3.278808 13.707237z m18.989761-82.380042a11.657983 11.657983 0 0 0-2.322489 2.960035q-3.64312 7.513934-8.197019 14.208166c7.969324-27.323397 16.348499-54.646794 24.408902-81.970191q-6.739771 32.514843-13.798316 64.847529z", fill: "#067d73", "p-id": "2570" }, void 0), jsx("path", { d: "M566.5051 138.848396a70.767598 70.767598 0 0 0 12.113372-13.934932q0.227695-29.418191 0.500929-58.836382a302.196772 302.196772 0 0 0-16.394038-26.412617l14.93679 0.592007c2.231411 14.071549 4.5539 28.09756 7.149623 42.12357h-1.047397a42.442343 42.442343 0 0 0-2.914496-12.477684c1.639404 13.024153 3.460964 26.002766 5.737913 38.890301C602.936296 60.29363 567.598035 0 567.598035 0a269.454234 269.454234 0 0 0-13.889393 35.565955v21.995335c-1.047397-3.233269-2.094794-6.512076-3.142191-9.745345-8.789026 36.886586-2.823418 60.931176 4.280666 74.957186a36.795508 36.795508 0 0 0 8.060402-2.73234c0.91078 2.003716 1.730482 3.916354 2.73234 5.828992l-7.28624 3.051112a43.170967 43.170967 0 0 0 8.151481 9.927501zM559.401016 193.085339s-13.661699-74.592874-104.329838-86.205317c0 0 12.386607 85.248999 104.329838 86.205317z", fill: "#067d73", "p-id": "2571" }, void 0), jsx("path", { d: "M650.387929 159.97849l-1.593865-2.641262q7.69609-24.317823 15.756492-48.49903a124.002684 124.002684 0 0 0-57.1059 26.731391c2.868957 5.601296 5.737913 11.111515 8.789026 16.621733-0.500929 3.051113-0.956319 6.102225-1.457248 9.107799a41.986954 41.986954 0 0 1-11.840138-21.676562 111.889311 111.889311 0 0 0-29.46373 47.497172h27.323397l0.409851 2.322489a95.222039 95.222039 0 0 0 49.182115-29.46373zM571.878701 193.085339c3.142191 0 6.147764 0 9.107799-0.409851a33.97209 33.97209 0 0 0-8.060402-3.779736c-0.774163 2.641262-1.047397 4.189588-1.047397 4.189587zM676.208539 106.880022c-3.779737 0.500929-7.377317 1.138475-10.929359 1.821559 1.593865 6.238842 3.233269 12.477685 4.918212 18.716527a102.098427 102.098427 0 0 0 6.011147-20.538086z", fill: "#067d73", "p-id": "2572" }, void 0)] }), void 0));
};

var Icon$k = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M12 12.75C13.63 12.75 15.07 13.14 16.24 13.65C17.32 14.13 18 15.21 18 16.38V17C18 17.55 17.55 18 17 18H7C6.45 18 6 17.55 6 17V16.39C6 15.21 6.68 14.13 7.76 13.66C8.93 13.14 10.37 12.75 12 12.75ZM4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V17C0 17.55 0.45 18 1 18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H23C23.55 18 24 17.55 24 17V16.43ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6Z" }, void 0) }), void 0));
};

var Icon$j = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z" }, void 0) }), void 0));
};

var Icon$i = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M4 18H15C15.55 18 16 17.55 16 17C16 16.45 15.55 16 15 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H12C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H15C15.55 8 16 7.55 16 7C16 6.45 15.55 6 15 6H4C3.45 6 3 6.45 3 7ZM20.3 14.88L17.42 12L20.3 9.12C20.69 8.73 20.69 8.1 20.3 7.71C19.91 7.32 19.28 7.32 18.89 7.71L15.3 11.3C14.91 11.69 14.91 12.32 15.3 12.71L18.89 16.3C19.28 16.69 19.91 16.69 20.3 16.3C20.68 15.91 20.69 15.27 20.3 14.88Z" }, void 0) }), void 0));
};

var Icon$h = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1041 1024" }, props, { children: [jsx("path", { d: "M182.94953068 518.61826527a445.81726031 342.27306625 90 1 0 684.54613253 0 445.81726031 342.27306625 90 1 0-684.54613253 0Z", fill: "#ffe87f", "p-id": "2983" }, void 0), jsx("path", { d: "M521.40716422 27.48835774c-223.28818457 0-380.02268896 371.13326901-380.02268726 572.08093913C141.38447696 805.54650625 315.42995485 979.59198584 521.40716422 979.59198584s380.02268896-174.04547958 380.02268897-380.02268897c0-200.94767014-156.73450441-572.08093916-380.02268897-572.08093913z m0 896.54475418c-175.91693518 0-324.46381675-148.54687987-324.46381506-324.46381505 0-172.2909885 140.24229084-516.52206694 324.46381506-516.52206692s324.46381675 344.23107842 324.46381675 516.52206692c0 175.91693518-148.66384608 324.46381675-324.46381675 324.46381505z", fill: "#f1d2b1", "p-id": "2984" }, void 0), jsx("path", { d: "M356.48503699 304.5809251a50.06146827 50.06146827 0 1 0 100.12293817 0 50.06146827 50.06146827 0 1 0-100.12293817 0z", fill: "#ffb80c", "p-id": "2985" }, void 0), jsx("path", { d: "M274.02397418 586.00123458a82.46106281 82.46106281 0 1 0 164.92212727 0 82.46106281 82.46106281 0 1 0-164.92212727 0z", fill: "#ffb80c", "p-id": "2986" }, void 0), jsx("path", { d: "M529.47782258 698.52257325a123.28221421 123.28221421 0 1 0 246.56442842 0 123.28221421 123.28221421 0 1 0-246.56442842 0z", fill: "#ffb80c", "p-id": "2987" }, void 0)] }), void 0));
};

var Icon$g = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M521.472 206.933333C351.303111 206.933333 213.333333 344.888889 213.333333 515.086222c0 170.183111 137.969778 308.138667 308.138667 308.138667 170.197333 0 308.152889-137.955556 308.152889-308.138667 0-170.197333-137.955556-308.152889-308.152889-308.152889z m164.252444 276.238223l-75.164444 72.931555 16.967111 100.48c0.611556 1.578667 0.938667 6.684444 0.938667 8.490667 0 7.864889-6.357333 17.592889-14.222222 17.592889h-0.284445c-2.275556 0-4.551111-3.911111-6.656-5.034667l-92.515555-50.673778-92.814223 47.630222c-4.792889 2.503111-10.609778 1.607111-14.976-1.550222a14.606222 14.606222 0 0 1-5.632-14.136889l17.962667-103.210666-74.766222-73.329778a14.264889 14.264889 0 0 1 7.950222-24.277333l103.608889-14.776889 46.563555-93.923556c2.417778-4.835556 7.338667-8.035556 12.743112-8.035555h0.028444c5.418667 0 10.368 3.256889 12.743111 8.106666l46.051556 94.08 103.594666 15.331556a14.250667 14.250667 0 0 1 7.879111 24.305778z", fill: "#4eceb4", "p-id": "2708" }, void 0), jsx("path", { d: "M864.469333 910.606222c-35.768889-6.869333-71.68-12.245333-107.377777-16.455111 124.928-80.796444 202.666667-220.16 202.666666-372.110222 0-244.337778-198.798222-443.121778-443.136-443.121778S73.486222 277.703111 73.486222 522.040889c0 151.765333 78.748444 292.579556 204.572445 373.304889-68.124444 7.395556-110.094222 15.018667-111.288889 15.232a21.319111 21.319111 0 1 0 7.793778 41.941333c2.872889-0.540444 240.625778-43.662222 510.037333-22.656 0.312889 0.014222 0.625778 0.142222 0.938667 0.142222l0.341333-0.042666c56.092444 4.437333 113.536 11.562667 170.524444 22.528a21.333333 21.333333 0 0 0 8.064-41.884445z m-512-22.101333a20.622222 20.622222 0 0 0-4.906666-3.299556C206.990222 819.626667 116.152889 677.063111 116.152889 522.040889c0-220.814222 179.655111-400.455111 400.469333-400.455111S917.091556 301.226667 917.091556 522.040889a400.568889 400.568889 0 0 1-235.477334 364.842667c-122.695111-9.102222-238.492444-5.361778-329.144889 1.621333z", fill: "#067d73", "p-id": "2709" }, void 0)] }), void 0));
};

var Icon$f = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M521.472 206.933333C351.303111 206.933333 213.333333 344.888889 213.333333 515.086222c0 170.183111 137.969778 308.138667 308.138667 308.138667 170.197333 0 308.152889-137.955556 308.152889-308.138667 0-170.197333-137.955556-308.152889-308.152889-308.152889z m164.252444 276.238223l-75.164444 72.931555 16.967111 100.48c0.611556 1.578667 0.938667 6.684444 0.938667 8.490667 0 7.864889-6.357333 17.592889-14.222222 17.592889h-0.284445c-2.275556 0-4.551111-3.911111-6.656-5.034667l-92.515555-50.673778-92.814223 47.630222c-4.792889 2.503111-10.609778 1.607111-14.976-1.550222a14.606222 14.606222 0 0 1-5.632-14.136889l17.962667-103.210666-74.766222-73.329778a14.264889 14.264889 0 0 1 7.950222-24.277333l103.608889-14.776889 46.563555-93.923556c2.417778-4.835556 7.338667-8.035556 12.743112-8.035555h0.028444c5.418667 0 10.368 3.256889 12.743111 8.106666l46.051556 94.08 103.594666 15.331556a14.250667 14.250667 0 0 1 7.879111 24.305778z", fill: "#4eceb4", "p-id": "2708" }, void 0), jsx("path", { d: "M864.469333 910.606222c-35.768889-6.869333-71.68-12.245333-107.377777-16.455111 124.928-80.796444 202.666667-220.16 202.666666-372.110222 0-244.337778-198.798222-443.121778-443.136-443.121778S73.486222 277.703111 73.486222 522.040889c0 151.765333 78.748444 292.579556 204.572445 373.304889-68.124444 7.395556-110.094222 15.018667-111.288889 15.232a21.319111 21.319111 0 1 0 7.793778 41.941333c2.872889-0.540444 240.625778-43.662222 510.037333-22.656 0.312889 0.014222 0.625778 0.142222 0.938667 0.142222l0.341333-0.042666c56.092444 4.437333 113.536 11.562667 170.524444 22.528a21.333333 21.333333 0 0 0 8.064-41.884445z m-512-22.101333a20.622222 20.622222 0 0 0-4.906666-3.299556C206.990222 819.626667 116.152889 677.063111 116.152889 522.040889c0-220.814222 179.655111-400.455111 400.469333-400.455111S917.091556 301.226667 917.091556 522.040889a400.568889 400.568889 0 0 1-235.477334 364.842667c-122.695111-9.102222-238.492444-5.361778-329.144889 1.621333z", fill: "#067d73", "p-id": "2709" }, void 0)] }), void 0));
};

var Logo$2 = function (_a) {
	var isDark = _a.isDark, props = __rest(_a, ["isDark"]);
	var textColor = isDark ? "#FFFFFF" : "#000000";
	return (jsxs(Svg, __assign({ viewBox: "0 0 160 26" }, props, { children: [jsx("path", { d: "M30.8524 19.7569C30.4803 19.7569 30.2173 19.6799 30.0633 19.5259C29.9221 19.372 29.8516 19.1282 29.8516 18.7946V7.65066C29.8516 7.31705 29.9285 7.07326 30.0825 6.91928C30.2365 6.75248 30.4931 6.66907 30.8524 6.66907H35.5679C37.3642 6.66907 38.6858 7.04759 39.5327 7.80463C40.3796 8.56167 40.803 9.69082 40.803 11.1921C40.803 12.6805 40.3796 13.8032 39.5327 14.5603C38.6987 15.3045 37.3771 15.6766 35.5679 15.6766H33.7394V18.7946C33.7394 19.1282 33.6624 19.372 33.5085 19.5259C33.3545 19.6799 33.0914 19.7569 32.7193 19.7569H30.8524ZM35.2599 12.8858C35.786 12.8858 36.1902 12.7446 36.4725 12.4624C36.7676 12.1801 36.9151 11.7566 36.9151 11.1921C36.9151 10.6147 36.7676 10.1848 36.4725 9.90253C36.1902 9.62025 35.786 9.47911 35.2599 9.47911H33.7394V12.8858H35.2599Z", fill: textColor }, void 0), jsx("path", { d: "M45.3484 20.0456C44.1423 20.0456 43.1735 19.6607 42.4421 18.8908C41.7236 18.1081 41.3643 17.011 41.3643 15.5996C41.3643 14.5218 41.6081 13.5787 42.0957 12.7703C42.5961 11.9619 43.2954 11.3396 44.1936 10.9034C45.1046 10.4543 46.1503 10.2297 47.3308 10.2297C48.306 10.2297 49.1657 10.3388 49.9099 10.5569C50.6669 10.7622 51.3598 11.0638 51.9885 11.4615V19.1602C51.9885 19.404 51.9436 19.5644 51.8538 19.6414C51.764 19.7184 51.5844 19.7569 51.3149 19.7569H49.3517C49.2106 19.7569 49.1015 19.7376 49.0245 19.6992C48.9475 19.6478 48.8834 19.5708 48.8321 19.4682L48.5819 18.8908C48.2097 19.2886 47.7607 19.5773 47.2346 19.7569C46.7213 19.9494 46.0926 20.0456 45.3484 20.0456ZM46.7919 17.428C47.2923 17.428 47.6837 17.3061 47.966 17.0623C48.2482 16.8186 48.3894 16.4721 48.3894 16.023V13.0205C48.1456 12.905 47.8376 12.8473 47.4655 12.8473C46.7855 12.8473 46.2402 13.0847 45.8296 13.5594C45.4318 14.0342 45.2329 14.7014 45.2329 15.5611C45.2329 16.8057 45.7526 17.428 46.7919 17.428Z", fill: textColor }, void 0), jsx("path", { d: "M54.667 19.7569C54.2949 19.7569 54.0319 19.6799 53.8779 19.5259C53.7239 19.372 53.6469 19.1282 53.6469 18.7946V11.1151C53.6469 10.8841 53.6854 10.7301 53.7624 10.6532C53.8522 10.5633 54.0318 10.5184 54.3013 10.5184H56.2837C56.4377 10.5184 56.5532 10.5441 56.6302 10.5954C56.72 10.6339 56.7713 10.7109 56.7841 10.8264L56.8804 11.4038C57.2397 11.0445 57.708 10.7622 58.2854 10.5569C58.8756 10.3388 59.53 10.2297 60.2486 10.2297C61.2879 10.2297 62.1283 10.5248 62.7699 11.1151C63.4115 11.6925 63.7322 12.5522 63.7322 13.6942V18.7946C63.7322 19.1282 63.6552 19.372 63.5013 19.5259C63.3601 19.6799 63.1035 19.7569 62.7314 19.7569H60.8645C60.4924 19.7569 60.2229 19.6799 60.0561 19.5259C59.9021 19.372 59.8251 19.1282 59.8251 18.7946V13.9444C59.8251 13.5594 59.7417 13.2836 59.5749 13.1167C59.4081 12.9499 59.1451 12.8665 58.7858 12.8665C58.4009 12.8665 58.0929 12.9692 57.862 13.1745C57.6438 13.3798 57.5348 13.6621 57.5348 14.0213V18.7946C57.5348 19.1282 57.4578 19.372 57.3038 19.5259C57.1627 19.6799 56.906 19.7569 56.5339 19.7569H54.667Z", fill: textColor }, void 0), jsx("path", { d: "M70.5354 20.0456C68.739 20.0456 67.3532 19.6286 66.3781 18.7946C65.4029 17.9605 64.9153 16.748 64.9153 15.1569C64.9153 14.1817 65.1399 13.322 65.5889 12.5778C66.038 11.8336 66.686 11.2562 67.5329 10.8456C68.3926 10.435 69.4062 10.2297 70.5739 10.2297C71.4592 10.2297 72.2034 10.3131 72.8065 10.4799C73.4224 10.6467 73.9677 10.9034 74.4425 11.2498C74.5836 11.3396 74.6542 11.4551 74.6542 11.5963C74.6542 11.6989 74.6029 11.8336 74.5002 12.0004L73.7111 13.367C73.6213 13.5466 73.5122 13.6364 73.3839 13.6364C73.3069 13.6364 73.185 13.5851 73.0182 13.4824C72.6718 13.2643 72.3446 13.1039 72.0366 13.0013C71.7415 12.8986 71.3694 12.8473 70.9203 12.8473C70.2787 12.8473 69.7591 13.0526 69.3613 13.4632C68.9764 13.8738 68.7839 14.4384 68.7839 15.1569C68.7839 15.8883 68.9828 16.4529 69.3806 16.8506C69.7783 17.2356 70.3237 17.428 71.0165 17.428C71.4271 17.428 71.7992 17.3703 72.1329 17.2548C72.4665 17.1393 72.8065 16.9789 73.1529 16.7736C73.3326 16.671 73.4609 16.6197 73.5379 16.6197C73.6534 16.6197 73.756 16.7095 73.8458 16.8891L74.7119 18.3711C74.7761 18.4994 74.8082 18.6021 74.8082 18.6791C74.8082 18.7946 74.7312 18.9036 74.5772 19.0063C74.0383 19.3527 73.4481 19.6093 72.8065 19.7761C72.1778 19.9558 71.4207 20.0456 70.5354 20.0456Z", fill: textColor }, void 0), jsx("path", { d: "M79.6881 20.0456C78.482 20.0456 77.5132 19.6607 76.7819 18.8908C76.0633 18.1081 75.704 17.011 75.704 15.5996C75.704 14.5218 75.9478 13.5787 76.4354 12.7703C76.9358 11.9619 77.6351 11.3396 78.5333 10.9034C79.4443 10.4543 80.4901 10.2297 81.6705 10.2297C82.6457 10.2297 83.5054 10.3388 84.2496 10.5569C85.0067 10.7622 85.6995 11.0638 86.3283 11.4615V19.1602C86.3283 19.404 86.2834 19.5644 86.1935 19.6414C86.1037 19.7184 85.9241 19.7569 85.6546 19.7569H83.6915C83.5503 19.7569 83.4412 19.7376 83.3643 19.6992C83.2873 19.6478 83.2231 19.5708 83.1718 19.4682L82.9216 18.8908C82.5495 19.2886 82.1004 19.5773 81.5743 19.7569C81.0611 19.9494 80.4323 20.0456 79.6881 20.0456ZM81.1316 17.428C81.632 17.428 82.0234 17.3061 82.3057 17.0623C82.588 16.8186 82.7291 16.4721 82.7291 16.023V13.0205C82.4853 12.905 82.1774 12.8473 81.8053 12.8473C81.1252 12.8473 80.5799 13.0847 80.1693 13.5594C79.7715 14.0342 79.5726 14.7014 79.5726 15.5611C79.5726 16.8057 80.0923 17.428 81.1316 17.428Z", fill: textColor }, void 0), jsx("path", { d: "M98.4184 19.0255C98.5082 19.1282 98.5531 19.2436 98.5531 19.372C98.5531 19.4874 98.5146 19.5837 98.4377 19.6607C98.3607 19.7248 98.258 19.7569 98.1297 19.7569H95.1465C94.9668 19.7569 94.8321 19.7441 94.7423 19.7184C94.6653 19.6799 94.5819 19.6093 94.4921 19.5067L91.8745 15.946V18.7946C91.8745 19.1282 91.7975 19.372 91.6435 19.5259C91.4896 19.6799 91.2265 19.7569 90.8544 19.7569H88.9875C88.6154 19.7569 88.3523 19.6799 88.1984 19.5259C88.0572 19.372 87.9866 19.1282 87.9866 18.7946V7.65066C87.9866 7.31705 88.0636 7.07326 88.2176 6.91928C88.3716 6.75248 88.6282 6.66907 88.9875 6.66907H90.8544C91.2265 6.66907 91.4896 6.75248 91.6435 6.91928C91.7975 7.07326 91.8745 7.31705 91.8745 7.65066V14.0983L94.4151 10.7879C94.4921 10.6852 94.5755 10.6147 94.6653 10.5762C94.7551 10.5377 94.8898 10.5184 95.0695 10.5184H98.0527C98.181 10.5184 98.2773 10.5569 98.3414 10.6339C98.4184 10.6981 98.4569 10.7879 98.4569 10.9034C98.4569 11.0317 98.412 11.1472 98.3222 11.2498L95.031 15.0222L98.4184 19.0255Z", fill: textColor }, void 0), jsx("path", { d: "M104.668 20.0456C103.59 20.0456 102.628 19.866 101.781 19.5067C100.947 19.1474 100.286 18.6085 99.7985 17.89C99.3109 17.1714 99.0671 16.2925 99.0671 15.2531C99.0671 13.6236 99.529 12.379 100.453 11.5193C101.377 10.6596 102.705 10.2297 104.437 10.2297C106.131 10.2297 107.414 10.6532 108.286 11.5C109.172 12.334 109.614 13.4953 109.614 14.9837C109.614 15.6252 109.332 15.946 108.767 15.946H102.724C102.724 16.4978 102.929 16.9212 103.34 17.2163C103.763 17.5114 104.398 17.659 105.245 17.659C105.771 17.659 106.208 17.6141 106.554 17.5243C106.913 17.4216 107.273 17.2741 107.632 17.0816C107.786 17.0174 107.889 16.9854 107.94 16.9854C108.055 16.9854 108.152 17.0623 108.229 17.2163L108.883 18.4481C108.947 18.5764 108.979 18.6727 108.979 18.7368C108.979 18.8523 108.902 18.9614 108.748 19.064C108.222 19.4105 107.626 19.6607 106.958 19.8146C106.291 19.9686 105.528 20.0456 104.668 20.0456ZM106.15 14.0406C106.15 13.553 106.009 13.1745 105.726 12.905C105.444 12.6356 105.021 12.5009 104.456 12.5009C103.892 12.5009 103.462 12.642 103.167 12.9243C102.872 13.1937 102.724 13.5658 102.724 14.0406H106.15Z", fill: textColor }, void 0), jsx("path", { d: "M116.211 20.0456C115.133 20.0456 114.113 19.9365 113.151 19.7184C112.189 19.4874 111.412 19.1667 110.822 18.7561C110.604 18.6149 110.495 18.4674 110.495 18.3134C110.495 18.2107 110.533 18.1017 110.61 17.9862L111.553 16.4849C111.656 16.331 111.759 16.254 111.861 16.254C111.926 16.254 112.035 16.2989 112.189 16.3887C112.663 16.6582 113.202 16.8763 113.805 17.0431C114.408 17.2099 115.005 17.2933 115.595 17.2933C116.198 17.2933 116.641 17.2035 116.923 17.0238C117.218 16.8442 117.366 16.5555 117.366 16.1577C117.366 15.7728 117.206 15.4713 116.885 15.2531C116.577 15.035 115.993 14.7591 115.133 14.4255C113.837 13.9379 112.824 13.3926 112.092 12.7896C111.374 12.1737 111.015 11.3396 111.015 10.2875C111.015 9.01718 111.47 8.04843 112.381 7.38121C113.292 6.71398 114.505 6.38037 116.019 6.38037C117.071 6.38037 117.969 6.47661 118.713 6.66907C119.47 6.84871 120.112 7.131 120.638 7.51593C120.856 7.68274 120.965 7.83671 120.965 7.97786C120.965 8.06767 120.927 8.17032 120.85 8.2858L119.907 9.78705C119.791 9.94103 119.688 10.018 119.599 10.018C119.534 10.018 119.425 9.97311 119.271 9.88329C118.527 9.3957 117.642 9.15191 116.615 9.15191C116.064 9.15191 115.64 9.24173 115.345 9.42137C115.05 9.601 114.902 9.89612 114.902 10.3067C114.902 10.589 114.979 10.82 115.133 10.9996C115.287 11.1792 115.493 11.3396 115.749 11.4808C116.019 11.6091 116.429 11.7759 116.981 11.9812L117.347 12.1159C118.296 12.488 119.04 12.8473 119.579 13.1937C120.131 13.5273 120.548 13.9444 120.83 14.4448C121.113 14.9324 121.254 15.5483 121.254 16.2925C121.254 17.4344 120.824 18.3455 119.964 19.0255C119.117 19.7056 117.866 20.0456 116.211 20.0456Z", fill: textColor }, void 0), jsx("path", { d: "M125.343 19.7569C125.151 19.7569 125.003 19.7248 124.9 19.6607C124.798 19.5965 124.721 19.4682 124.67 19.2757L122.187 10.9611C122.161 10.8841 122.148 10.8264 122.148 10.7879C122.148 10.6083 122.277 10.5184 122.533 10.5184H125.074C125.241 10.5184 125.362 10.5505 125.439 10.6147C125.516 10.666 125.568 10.7558 125.593 10.8841L126.633 15.2531L127.941 11.731C128.006 11.577 128.07 11.4744 128.134 11.423C128.211 11.3589 128.339 11.3268 128.519 11.3268H129.731C129.911 11.3268 130.033 11.3589 130.097 11.423C130.174 11.4744 130.245 11.577 130.309 11.731L131.598 15.2531L132.657 10.8841C132.695 10.7558 132.747 10.666 132.811 10.6147C132.875 10.5505 132.991 10.5184 133.157 10.5184H135.717C135.974 10.5184 136.102 10.6083 136.102 10.7879C136.102 10.8264 136.089 10.8841 136.064 10.9611L133.562 19.2757C133.51 19.4682 133.433 19.5965 133.331 19.6607C133.241 19.7248 133.1 19.7569 132.907 19.7569H131.021C130.841 19.7569 130.707 19.7248 130.617 19.6607C130.527 19.5837 130.45 19.4554 130.386 19.2757L129.116 15.7921L127.845 19.2757C127.794 19.4554 127.717 19.5837 127.614 19.6607C127.524 19.7248 127.39 19.7569 127.21 19.7569H125.343Z", fill: textColor }, void 0), jsx("path", { d: "M140.981 20.0456C139.775 20.0456 138.806 19.6607 138.075 18.8908C137.356 18.1081 136.997 17.011 136.997 15.5996C136.997 14.5218 137.241 13.5787 137.728 12.7703C138.229 11.9619 138.928 11.3396 139.826 10.9034C140.737 10.4543 141.783 10.2297 142.963 10.2297C143.938 10.2297 144.798 10.3388 145.542 10.5569C146.299 10.7622 146.992 11.0638 147.621 11.4615V19.1602C147.621 19.404 147.576 19.5644 147.486 19.6414C147.396 19.7184 147.217 19.7569 146.947 19.7569H144.984C144.843 19.7569 144.734 19.7376 144.657 19.6992C144.58 19.6478 144.516 19.5708 144.465 19.4682L144.214 18.8908C143.842 19.2886 143.393 19.5773 142.867 19.7569C142.354 19.9494 141.725 20.0456 140.981 20.0456ZM142.424 17.428C142.925 17.428 143.316 17.3061 143.598 17.0623C143.881 16.8186 144.022 16.4721 144.022 16.023V13.0205C143.778 12.905 143.47 12.8473 143.098 12.8473C142.418 12.8473 141.873 13.0847 141.462 13.5594C141.064 14.0342 140.865 14.7014 140.865 15.5611C140.865 16.8057 141.385 17.428 142.424 17.428Z", fill: textColor }, void 0), jsx("path", { d: "M150.28 23.6447C149.908 23.6447 149.645 23.5678 149.491 23.4138C149.35 23.2598 149.279 23.016 149.279 22.6824V11.654C149.857 11.2434 150.582 10.9034 151.454 10.6339C152.327 10.3645 153.238 10.2297 154.187 10.2297C158.062 10.2297 160 11.8721 160 15.1569C160 16.6453 159.589 17.8322 158.768 18.7176C157.947 19.6029 156.786 20.0456 155.284 20.0456C154.861 20.0456 154.45 19.9943 154.053 19.8916C153.668 19.789 153.347 19.6478 153.09 19.4682V22.6824C153.09 23.016 153.013 23.2598 152.859 23.4138C152.705 23.5678 152.442 23.6447 152.07 23.6447H150.28ZM154.457 17.4473C155.009 17.4473 155.419 17.242 155.689 16.8314C155.971 16.408 156.112 15.8434 156.112 15.1377C156.112 14.3036 155.945 13.7198 155.612 13.3862C155.291 13.0398 154.79 12.8665 154.11 12.8665C153.674 12.8665 153.328 12.9243 153.071 13.0398V16.1C153.071 16.5363 153.193 16.8699 153.437 17.1008C153.681 17.3318 154.021 17.4473 154.457 17.4473Z", fill: textColor }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.38998 4.50033C4.01476 2.49106 5.55649 0.634766 7.60049 0.634766C9.40427 0.634766 10.8665 2.09701 10.8665 3.90078V7.92728C11.3177 7.89544 11.7761 7.87911 12.2404 7.87911C12.6865 7.87911 13.1272 7.89418 13.5612 7.9236V3.90078C13.5612 2.09701 15.0234 0.634766 16.8272 0.634766C18.8712 0.634766 20.4129 2.49106 20.0377 4.50033L19.1539 9.23326C22.1872 10.5576 24.4809 12.8577 24.4809 15.748V17.4966C24.4809 19.8734 22.9085 21.8634 20.7102 23.2068C18.4948 24.5606 15.4978 25.3654 12.2404 25.3654C8.98304 25.3654 5.98604 24.5606 3.77065 23.2068C1.57242 21.8634 0 19.8734 0 17.4966V15.748C0 12.873 2.2701 10.5817 5.27785 9.25477L4.38998 4.50033ZM18.0212 9.85508L19.0555 4.3169C19.3159 2.92236 18.2459 1.63399 16.8272 1.63399C15.5753 1.63399 14.5604 2.64886 14.5604 3.90078V9.02479C14.2324 8.98273 13.8991 8.9494 13.5612 8.92524C13.128 8.89426 12.6873 8.87833 12.2404 8.87833C11.7753 8.87833 11.3168 8.89559 10.8665 8.92912C10.5286 8.95429 10.1953 8.98862 9.86729 9.03169V3.90078C9.86729 2.64886 8.85241 1.63399 7.60049 1.63399C6.18184 1.63399 5.11179 2.92235 5.37222 4.3169L6.40988 9.87345C3.16599 11.0784 0.999219 13.2586 0.999219 15.748V17.4966C0.999219 21.2906 6.03208 24.3662 12.2404 24.3662C18.4488 24.3662 23.4817 21.2906 23.4817 17.4966V15.748C23.4817 13.2458 21.2927 11.0562 18.0212 9.85508Z", fill: "#633001" }, void 0), jsx("path", { d: "M23.4815 17.4967C23.4815 21.2907 18.4486 24.3663 12.2402 24.3663C6.03189 24.3663 0.999023 21.2907 0.999023 17.4967V15.748H23.4815V17.4967Z", fill: "#FEDC90" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.37202 4.31671C5.1116 2.92216 6.18164 1.63379 7.6003 1.63379C8.85222 1.63379 9.8671 2.64867 9.8671 3.90059V9.0315C10.6321 8.93102 11.4261 8.87813 12.2402 8.87813C13.0356 8.87813 13.8116 8.9286 14.5602 9.02459V3.90059C14.5602 2.64867 15.5751 1.63379 16.827 1.63379C18.2457 1.63379 19.3157 2.92216 19.0553 4.31671L18.021 9.85488C21.2925 11.056 23.4815 13.2457 23.4815 15.7478C23.4815 19.5418 18.4486 22.6174 12.2402 22.6174C6.03189 22.6174 0.999023 19.5418 0.999023 15.7478C0.999023 13.2584 3.16579 11.0782 6.40968 9.87326L5.37202 4.31671Z", fill: "#D1884F" }, void 0), jsx("path", { className: "left-eye", d: "M9.11817 15.2485C9.11817 16.2833 8.55896 17.1221 7.86914 17.1221C7.17932 17.1221 6.62012 16.2833 6.62012 15.2485C6.62012 14.2138 7.17932 13.375 7.86914 13.375C8.55896 13.375 9.11817 14.2138 9.11817 15.2485Z", fill: "#633001" }, void 0), jsx("path", { className: "right-eye", d: "M17.7363 15.2485C17.7363 16.2833 17.1771 17.1221 16.4873 17.1221C15.7975 17.1221 15.2383 16.2833 15.2383 15.2485C15.2383 14.2138 15.7975 13.375 16.4873 13.375C17.1771 13.375 17.7363 14.2138 17.7363 15.2485Z", fill: "#633001" }, void 0)] }), void 0));
};
var Logo$3 = React.memo(Logo$2, function (prev, next) { return prev.isDark === next.isDark; });

var Icon$e = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.1534 13.6089L4.15362 13.61C4.77322 16.8113 7.42207 19.3677 10.647 19.8853L10.6502 19.8858C13.0412 20.2736 15.2625 19.6103 16.9422 18.2833C11.3549 16.2878 7.9748 10.3524 9.26266 4.48816C5.69846 5.77194 3.35817 9.51245 4.1534 13.6089ZM10.0083 2.21054C4.76622 3.2533 1.09895 8.36947 2.19006 13.9901C2.97006 18.0201 6.28006 21.2101 10.3301 21.8601C13.8512 22.4311 17.0955 21.1608 19.2662 18.8587C19.2765 18.8478 19.2866 18.837 19.2968 18.8261C19.4385 18.6745 19.5757 18.5184 19.7079 18.3581C19.7105 18.355 19.713 18.3519 19.7156 18.3487C19.8853 18.1426 20.0469 17.9295 20.2001 17.7101C20.4101 17.4001 20.2401 16.9601 19.8701 16.9201C19.5114 16.8796 19.1602 16.8209 18.817 16.7452C18.7964 16.7406 18.7758 16.736 18.7552 16.7313C18.6676 16.7114 18.5804 16.6903 18.4938 16.6681C18.4919 16.6676 18.4901 16.6672 18.4882 16.6667C13.0234 15.2647 9.72516 9.48006 11.4542 4.03417C11.4549 4.03214 11.4555 4.03012 11.4562 4.0281C11.4875 3.92954 11.5205 3.83109 11.5552 3.73278C11.5565 3.72911 11.5578 3.72543 11.5591 3.72175C11.6768 3.38921 11.8136 3.05829 11.9701 2.73005C12.1301 2.39005 11.8501 2.01005 11.4701 2.03005C11.1954 2.04379 10.924 2.06848 10.6561 2.10368C10.6517 2.10427 10.6472 2.10486 10.6428 2.10545C10.4413 2.13221 10.2418 2.16492 10.0446 2.2034C10.0325 2.20576 10.0204 2.20814 10.0083 2.21054Z" }, void 0) }), void 0));
};

var Icon$d = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" }, void 0) }), void 0));
};

var Icon$c = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M12.8533 3.39627C12.4634 2.75821 11.5366 2.75821 11.1467 3.39627L7.42977 9.47855C7.02256 10.1449 7.50213 11 8.28306 11H15.7169C16.4979 11 16.9774 10.1449 16.5702 9.47855L12.8533 3.39627ZM12 5.84L13.93 9H10.06L12 5.84ZM17.5 13C15.01 13 13 15.01 13 17.5C13 19.99 15.01 22 17.5 22C19.99 22 22 19.99 22 17.5C22 15.01 19.99 13 17.5 13ZM17.5 20C16.12 20 15 18.88 15 17.5C15 16.12 16.12 15 17.5 15C18.88 15 20 16.12 20 17.5C20 18.88 18.88 20 17.5 20ZM3 19.5C3 20.6046 3.89543 21.5 5 21.5H9C10.1046 21.5 11 20.6046 11 19.5V15.5C11 14.3954 10.1046 13.5 9 13.5H5C3.89543 13.5 3 14.3954 3 15.5V19.5ZM5 15.5H9V19.5H5V15.5Z" }, void 0) }), void 0));
};

var Icon$b = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: [jsx("path", { d: "M7.5 13C7.5 11.8954 8.39543 11 9.5 11H12.5C13.6046 11 14.5 11.8954 14.5 13V15C14.5 16.1046 13.6046 17 12.5 17H9.5C8.39543 17 7.5 16.1046 7.5 15V13Z" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.5 2C8.39543 2 7.5 2.89543 7.5 4V6.49482C7.5 6.93167 7.2113 7.30895 6.81834 7.49981C5.15004 8.31009 4 10.0207 4 12V17C4 19.2091 5.79086 21 8 21H14C16.2091 21 18 19.2091 18 17V12C18 11.4175 17.9004 10.8583 17.7173 10.3385L17.7892 10.297C19.4786 9.32167 20.0574 7.16153 19.082 5.47221C18.1552 3.86682 16.1534 3.25957 14.5 4.05146V4C14.5 2.89543 13.6046 2 12.5 2H9.5ZM9.5 6.25V4H12.5V6.25H9.5ZM9.22663 7.75C8.89473 8.46917 8.30318 9.00205 7.69211 9.29884C6.68638 9.78731 6 10.8154 6 12V17C6 18.1046 6.89543 19 8 19H14C15.1046 19 16 18.1046 16 17V12C16 10.8154 15.3136 9.78731 14.3079 9.29884C13.6968 9.00205 13.1053 8.46917 12.7734 7.75H9.22663ZM14.5 6.3226V6.49482C14.5 6.93167 14.7887 7.30895 15.1817 7.49981C15.7529 7.77726 16.2634 8.16029 16.6878 8.62352L16.7892 8.56495C17.522 8.1419 17.773 7.20495 17.35 6.47221C16.9346 5.75269 16.0213 5.49542 15.2914 5.89229L14.5 6.3226Z" }, void 0)] }), void 0));
};

var Icon$a = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: [jsx("path", { d: "M5.66 4.2L6.05 4.59C6.44 4.97 6.44 5.61 6.05 5.99L6.04 6C5.65 6.39 5.03 6.39 4.64 6L4.25 5.61C3.86 5.23 3.86 4.6 4.25 4.21L4.26 4.2C4.64 3.82 5.27 3.81 5.66 4.2Z" }, void 0), jsx("path", { d: "M1.99 10.95H3.01C3.56 10.95 4 11.39 4 11.95V11.96C4 12.51 3.56 12.95 3 12.94H1.99C1.44 12.94 1 12.5 1 11.95V11.94C1 11.39 1.44 10.95 1.99 10.95Z" }, void 0), jsx("path", { d: "M12 1H12.01C12.56 1 13 1.44 13 1.99V2.96C13 3.51 12.56 3.95 12 3.94H11.99C11.44 3.94 11 3.5 11 2.95V1.99C11 1.44 11.44 1 12 1Z" }, void 0), jsx("path", { d: "M18.34 4.2C18.73 3.82 19.36 3.82 19.75 4.21C20.14 4.6 20.14 5.22 19.75 5.61L19.36 6C18.98 6.39 18.35 6.39 17.96 6L17.95 5.99C17.56 5.61 17.56 4.98 17.95 4.59L18.34 4.2Z" }, void 0), jsx("path", { d: "M18.33 19.7L17.94 19.31C17.55 18.92 17.55 18.3 17.95 17.9C18.33 17.52 18.96 17.51 19.35 17.9L19.74 18.29C20.13 18.68 20.13 19.31 19.74 19.7C19.35 20.09 18.72 20.09 18.33 19.7Z" }, void 0), jsx("path", { d: "M20 11.95V11.94C20 11.39 20.44 10.95 20.99 10.95H22C22.55 10.95 22.99 11.39 22.99 11.94V11.95C22.99 12.5 22.55 12.94 22 12.94H20.99C20.44 12.94 20 12.5 20 11.95Z" }, void 0), jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 11.95C6 8.64 8.69 5.95 12 5.95C15.31 5.95 18 8.64 18 11.95C18 15.26 15.31 17.95 12 17.95C8.69 17.95 6 15.26 6 11.95ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" }, void 0), jsx("path", { d: "M12 22.9H11.99C11.44 22.9 11 22.46 11 21.91V20.95C11 20.4 11.44 19.96 11.99 19.96H12C12.55 19.96 12.99 20.4 12.99 20.95V21.91C12.99 22.46 12.55 22.9 12 22.9Z" }, void 0), jsx("path", { d: "M5.66 19.69C5.27 20.08 4.64 20.08 4.25 19.69C3.86 19.3 3.86 18.68 4.24 18.28L4.63 17.89C5.02 17.5 5.65 17.5 6.04 17.89L6.05 17.9C6.43 18.28 6.44 18.91 6.05 19.3L5.66 19.69Z" }, void 0)] }), void 0));
};

var Icon$9 = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { d: "M19 5H17C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5H5C3.9 5 3 5.9 3 7V8C3 10.55 4.92 12.63 7.39 12.94C8.02 14.44 9.37 15.57 11 15.9V19H8C7.44772 19 7 19.4477 7 20C7 20.5523 7.44772 21 8 21H16C16.5523 21 17 20.5523 17 20C17 19.4477 16.5523 19 16 19H13V15.9C14.63 15.57 15.98 14.44 16.61 12.94C19.08 12.63 21 10.55 21 8V7C21 5.9 20.1 5 19 5ZM5 8V7H7V10.82C5.84 10.4 5 9.3 5 8ZM12 14C10.35 14 9 12.65 9 11V5H15V11C15 12.65 13.65 14 12 14ZM19 8C19 9.3 18.16 10.4 17 10.82V7H19V8Z" }, void 0) }), void 0));
};

var Icon$8 = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M512 1024A512 512 0 1 0 0 512 512 512 0 0 0 512 1024", fill: "#4eceb4", "p-id": "3119" }, void 0), jsx("path", { d: "M725.4016 245.76L163.84 450.56a11.8784 11.8784 0 0 0 0 21.7088L295.7312 532.48l63.488 178.176a9.4208 9.4208 0 0 0 9.0112 6.144H368.64a8.6016 8.6016 0 0 0 5.3248-2.048l100.7616-81.92-65.1264-49.152L619.7248 737.28a11.8784 11.8784 0 0 0 18.432-6.9632l102.8096-471.8592a11.8784 11.8784 0 0 0-15.5648-12.6976zM368.64 672.9728l-54.8864-147.8656 311.7056-190.8736L393.216 573.44a13.5168 13.5168 0 0 0-2.4576 4.096z", fill: "#067d73", "p-id": "3120" }, void 0)] }), void 0));
};

var Icon$7 = function (props) {
	return (jsx(Svg, __assign({ viewBox: "0 0 24 24" }, props, { children: jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M14.3137 3L15.2631 3.94934C14.5597 5.19866 14.7398 6.81097 15.8032 7.87441C16.8667 8.93786 18.479 9.11792 19.7283 8.4146L20.6777 9.36396L17.6569 12.3848L17.1287 11.8566C16.7382 11.4661 16.105 11.4661 15.7145 11.8566C15.3239 12.2471 15.3239 12.8803 15.7145 13.2708L16.2426 13.799L9.36396 20.6777L8.49923 19.8129C9.71921 18.5286 9.69924 16.4983 8.43932 15.2384C7.1794 13.9784 5.14908 13.9585 3.86473 15.1784L3 14.3137L9.87868 7.43503L10.2145 7.77081C10.605 8.16134 11.2382 8.16134 11.6287 7.77081C12.0192 7.38029 12.0192 6.74713 11.6287 6.3566L11.2929 6.02081L14.3137 3ZM12.8995 1.58579C13.6805 0.804738 14.9469 0.804738 15.7279 1.58579L17.299 3.15684C17.6895 3.54736 17.6895 4.18053 17.299 4.57105L17.2175 4.65257C16.7183 5.15173 16.7183 5.96103 17.2175 6.4602C17.7166 6.95936 18.5259 6.95936 19.0251 6.4602L19.1066 6.37868C19.4971 5.98816 20.1303 5.98816 20.5208 6.37868L22.0919 7.94975C22.8729 8.7308 22.8729 9.99713 22.0919 10.7782L10.7782 22.0919C9.99713 22.8729 8.7308 22.8729 7.94975 22.0919L6.37869 20.5208C5.98817 20.1303 5.98817 19.4971 6.37869 19.1066L7.02511 18.4602C7.52427 17.961 7.52427 17.1517 7.02511 16.6526C6.52594 16.1534 5.71664 16.1534 5.21748 16.6526L4.57106 17.299C4.18054 17.6895 3.54737 17.6895 3.15685 17.299L1.58579 15.7279C0.804738 14.9469 0.804738 13.6805 1.58579 12.8995L12.8995 1.58579ZM13.8787 8.6066C13.4882 8.21608 12.855 8.21608 12.4645 8.6066C12.0739 8.99712 12.0739 9.63029 12.4645 10.0208L13.4645 11.0208C13.855 11.4113 14.4882 11.4113 14.8787 11.0208C15.2692 10.6303 15.2692 9.99713 14.8787 9.6066L13.8787 8.6066Z" }, void 0) }), void 0));
};

var Icon$6 = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M778.0352 204.8a406.20032 406.20032 0 0 1 43.0592 182.4256c0 225.2288-182.5792 407.8592-407.8592 407.8592-100.1472 0-191.8464-36.1472-262.8096-96.0512 66.9696 133.632 205.1072 225.4336 364.8 225.4336 225.2288 0 407.8592-182.5792 407.8592-407.8592-0.0512-125.0816-56.4224-236.9536-145.0496-311.808z", fill: "#4eceb4", "p-id": "2845" }, void 0), jsx("path", { d: "M733.2352 376.3712H363.7248l56.0128-68.4544c10.752-13.1584 8.8064-32.512-4.3008-43.2128-13.1584-10.752-32.512-8.8064-43.2128 4.3008L275.1488 387.6352a30.72 30.72 0 1 0 23.7568 50.176h434.3296c16.9472 0 30.72-13.7728 30.72-30.72s-13.7728-30.72-30.72-30.72zM733.2352 565.6064H298.9056c-16.9472 0-30.72 13.7728-30.72 30.72s13.7728 30.72 30.72 30.72h370.176l-56.832 70.6048a30.74048 30.74048 0 0 0 23.9104 50.0224c8.96 0 17.8688-3.9424 23.9616-11.4688l97.0752-120.576c7.424-9.216 8.9088-21.8624 3.7888-32.512a30.75584 30.75584 0 0 0-27.7504-17.5104z", fill: "#067d73", "p-id": "2846" }, void 0), jsx("path", { d: "M515.1744 78.0288c-241.8176 0-438.5792 196.7616-438.5792 438.5792s196.7616 438.5792 438.5792 438.5792 438.5792-196.7616 438.5792-438.5792-196.7104-438.5792-438.5792-438.5792z m0 815.7184c-207.9744 0-377.1392-169.1648-377.1392-377.1392S307.2 139.4688 515.1744 139.4688s377.1392 169.1648 377.1392 377.1392-169.1648 377.1392-377.1392 377.1392z", fill: "#067d73", "p-id": "2847" }, void 0)] }), void 0));
};

var Icon$5 = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M170.666382 213.332978h682.665529v639.998933H170.666382z", fill: "#067d73", "p-id": "3252" }, void 0), jsx("path", { d: "M512.895145 1023.998293c-207.402321 0.511999-394.367343-124.415793-473.72721-315.903473S3.285328 296.404839 149.75975 149.973083 516.948472-40.490599 708.009487 39.381268A512.21248 512.21248 0 0 1 1023.998293 512.980478C1023.998293 795.134675 795.604007 1023.486294 512.895145 1023.998293z m112.639812-738.857435l-15.871973 2.047997c-9.727984 2.047997-19.455968 5.119991-28.671952 8.703985a127.317121 127.317121 0 0 0-72.703879 86.527856c-5.119991 19.967967-5.119991 40.959932 0 60.415899-19.455968 0-38.911935-2.559996-57.343905-7.679987a376.746039 376.746039 0 0 1-156.714405-76.287873 236.159606 236.159606 0 0 1-37.930603-37.375937 104.490493 104.490493 0 0 1-11.775981-13.823977 143.231761 143.231761 0 0 0-13.823977 33.279944 133.375778 133.375778 0 0 0 28.671952 117.247805c6.655989 8.191986 16.895972 13.311978 23.551961 20.479966a33.83461 33.83461 0 0 1-17.407971-1.535998 126.037123 126.037123 0 0 1-27.135955-7.679987l-13.823977-5.119992a123.562461 123.562461 0 0 0 60.4159 110.591816c12.28798 9.215985 26.623956 14.847975 41.98393 16.895972-8.191986 7.167988-44.543926 4.095993-57.343905 2.559996 12.799979 38.911935 43.007928 69.119885 81.450531 82.431862 12.28798 4.607992 25.087958 6.655989 37.887937 6.655989a168.533052 168.533052 0 0 1-34.815942 22.527963 277.162205 277.162205 0 0 1-76.799872 28.159953c-11.77598 2.559996-24.06396 2.047997-37.375938 4.095993a183.039695 183.039695 0 0 1-40.959931-1.535998l11.263981 6.655989c11.77598 7.167988 23.551961 13.311978 36.351939 18.43197 24.575959 10.239983 49.663917 18.431969 75.263875 24.575959 60.415899 12.799979 123.434461 10.751982 182.826362-6.14399 134.186443-41.98393 219.178301-140.287766 251.476914-285.183525 5.119991-27.135955 7.167988-55.295908 6.14399-82.943862l20.479966-16.895971a214.826309 214.826309 0 0 0 43.519927-50.175917 255.572907 255.572907 0 0 1-72.703879 19.967967c5.119991-2.559996 9.727984-6.14399 14.335976-10.239983 19.455968-15.871974 33.791944-36.863939 41.471931-60.415899l-15.871973 8.703985a207.956987 207.956987 0 0 1-66.559889 22.015964 129.279785 129.279785 0 0 0-100.906499-40.447933v0.511999h-0.554666z", fill: "#4eceb4", "p-id": "3253" }, void 0)] }), void 0));
};

var Icon$4 = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M844.288 586.752c-99.328 0-179.712 80.384-179.712 179.712 0 97.792 77.824 177.664 175.616 179.712h4.096c99.328 0 179.712-80.896 179.712-179.712s-80.896-179.712-179.712-179.712z m0 294.912c-63.488 0-114.688-51.712-114.688-114.688s51.712-114.688 114.688-114.688c63.488 0 114.688 51.712 114.688 114.688s-51.712 114.688-114.688 114.688z", fill: "#067d73", "p-id": "2299" }, void 0), jsx("path", { d: "M833.536 867.84c-57.344 0-103.936-46.592-103.936-103.936 0-57.344 46.592-103.936 103.936-103.936 57.344 0 103.936 46.592 103.936 103.936 0 57.344-46.592 103.936-103.936 103.936z", fill: "#4dcdb3", "p-id": "2300" }, void 0), jsx("path", { d: "M179.712 586.752c-99.328 0-179.712 80.384-179.712 179.712 0 97.792 77.824 177.664 175.616 179.712h4.096c99.328 0 179.712-80.896 179.712-179.712s-80.384-179.712-179.712-179.712z m0 294.912c-63.488 0-114.688-51.712-114.688-114.688s51.712-114.688 114.688-114.688c63.488 0 114.688 51.712 114.688 114.688s-51.2 114.688-114.688 114.688z", fill: "#067d73", "p-id": "2301" }, void 0), jsx("path", { d: "M169.984 874.496c-57.856 0-104.96-47.104-104.96-104.96s47.104-104.96 104.96-104.96 104.96 47.104 104.96 104.96-47.104 104.96-104.96 104.96z", fill: "#4dcdb3", "p-id": "2302" }, void 0), jsx("path", { d: "M527.872 31.744c-99.328 0-179.712 80.384-179.712 179.712 0 97.792 77.824 177.664 175.616 179.712h4.096c99.328 0 179.712-80.384 179.712-179.712 0-99.328-80.384-179.712-179.712-179.712z m0 294.4c-63.488 0-114.688-51.2-114.688-114.688 0-63.488 51.2-114.688 114.688-114.688 63.488 0 114.688 51.2 114.688 114.688 0 63.488-51.2 114.688-114.688 114.688z", fill: "#067d73", "p-id": "2303" }, void 0), jsx("path", { d: "M519.68 104.448c58.88 0 106.496 47.616 106.496 106.496S578.56 317.44 519.68 317.44s-106.496-47.616-106.496-106.496 47.616-106.496 106.496-106.496z", fill: "#4dcdb3", "p-id": "2304" }, void 0), jsx("path", { d: "M186.88 543.744C201.728 453.632 252.928 373.76 328.192 322.048c-8.704-16.384-15.36-34.304-19.968-52.736-97.792 62.464-163.328 165.376-177.664 280.576 16.896-4.096 34.304-6.144 51.712-6.144h4.608zM849.92 543.744c19.456 0.512 38.4 3.584 56.832 8.704-13.312-111.616-74.24-211.968-166.912-275.968-5.12 17.92-12.288 35.328-22.016 51.712 70.144 52.224 117.76 129.536 132.096 215.552zM666.112 901.12c-46.08 22.528-96.768 34.304-147.968 34.304-56.32 0-109.056-13.824-155.136-38.4-11.264 15.36-24.064 29.184-38.912 41.472 58.88 33.792 125.952 51.712 194.048 51.712 68.096 0 132.096-17.408 187.904-48.128-14.848-11.776-28.672-25.6-39.936-40.96z", fill: "#067d73", "p-id": "2305" }, void 0)] }), void 0));
};

var Icon$3 = function (props) {
	return (jsxs(Svg, __assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsx("path", { d: "M512 511.488m-509.44 0a509.44 509.44 0 1 0 1018.88 0 509.44 509.44 0 1 0-1018.88 0Z", fill: "#4eceb4", "p-id": "2044" }, void 0), jsx("path", { d: "M807.936 357.888l-179.712 293.376-129.024-209.408 101.888-166.4c5.12-7.68 14.848-11.264 23.04-8.704l183.808 91.136m2.048 392.192c0 16.896-14.848 23.552-33.28 14.336l-140.288-70.144 173.568-283.136v338.944m-387.072 4.608c0 16.896-12.8 24.576-27.648 16.896l-164.864-81.92c-8.704-4.608-16.384-16.896-16.384-26.624v-378.88c0-13.312 9.728-18.944 22.016-13.824l177.664 88.576 8.704 13.824v381.952m187.392-73.728l-157.696-78.848V423.424l157.696 257.536z", fill: "#067d73", "p-id": "2045" }, void 0)] }), void 0));
};

var Icon$2 = function (props) {
	return (jsx(Icon$p, __assign({}, props), void 0));
};

var Icon$1 = function (props) {
	return (jsx(Icon$n, __assign({}, props), void 0));
};

var Icon = function (props) {
	return (jsx(Icon$o, __assign({}, props), void 0));
};

var IconModule = /*#__PURE__*/Object.freeze({
	__proto__: null,
	FarmIcon: Icon$l,
	GroupsIcon: Icon$k,
	HamburgerIcon: Icon$j,
	HamburgerCloseIcon: Icon$i,
	HomeIcon: Icon$h,
	IfoIcon: Icon$g,
	InfoIcon: Icon$f,
	LogoIcon: Logo$3,
	MoonIcon: Icon$e,
	MoreIcon: Icon$d,
	NftIcon: Icon$c,
	PoolIcon: Icon$b,
	PredictionsIcon: Icon$w,
	SunIcon: Icon$a,
	TeamBattleIcon: Icon$9,
	TelegramIcon: Icon$8,
	TicketIcon: Icon$7,
	TradeIcon: Icon$6,
	TwitterIcon: Icon$5,
	LiquidityIcon: Icon$4,
	MediumIcon: Icon$3,
	MarketIcon: Icon$2,
	MiningIcon: Icon$1,
	MemberIcon: Icon
});

var MenuButton = styled(Button)(templateObject_1$M || (templateObject_1$M = __makeTemplateObject(["\n  color: ", ";\n  padding: 0 8px;\n  border-radius: 8px;\n  height: 64px;\n  margin-right: 0;\n"], ["\n  color: ", ";\n  padding: 0 8px;\n  border-radius: 8px;\n  height: 64px;\n  margin-right: 0;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
});
MenuButton.defaultProps = {
	variant: "text",
	size: "sm",
};
var templateObject_1$M;

var blink = keyframes(templateObject_1$L || (templateObject_1$L = __makeTemplateObject(["\n  0%,  100% { transform: scaleY(1); } \n  50% { transform:  scaleY(0.1); } \n"], ["\n  0%,  100% { transform: scaleY(1); } \n  50% { transform:  scaleY(0.1); } \n"])));
var StyledLink = styled(Link$1)(templateObject_2$q || (templateObject_2$q = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  .mobile-icon {\n    width: 50px;\n    ", " {\n      display: none;\n    }\n  }\n  .desktop-icon {\n    width: 276px;\n    margin-left: 8px;\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .right-eye {\n    animation-delay: 20ms;\n  }\n  &:hover {\n    .left-eye,\n    .right-eye {\n      transform-origin: center 60%;\n      animation-name: ", ";\n      animation-duration: 350ms;\n      animation-iteration-count: 1;\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  .mobile-icon {\n    width: 50px;\n    ", " {\n      display: none;\n    }\n  }\n  .desktop-icon {\n    width: 276px;\n    margin-left: 8px;\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .right-eye {\n    animation-delay: 20ms;\n  }\n  &:hover {\n    .left-eye,\n    .right-eye {\n      transform-origin: center 60%;\n      animation-name: ", ";\n      animation-duration: 350ms;\n      animation-iteration-count: 1;\n    }\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.nav;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.nav;
}, blink);
var Logo$1 = function (_a) {
	var isPushed = _a.isPushed, togglePush = _a.togglePush, isDark = _a.isDark, _b = _a.href, href = _b === void 0 ? '/' : _b;
	var isAbsoluteUrl = href.startsWith("http");
	var innerLogo = (jsxs(Fragment, {
		children: [jsx(Icon$B, { className: "mobile-icon", width: 50, height: 50 }, void 0), isDark ?
			jsx(LogoDarkText, { className: "desktop-icon", width: 200, height: 52.2 }, void 0) :
			jsx(LogoWithText, { className: "desktop-icon", width: 200, height: 52.2 }, void 0)]
	}, void 0));
	return (jsxs(Flex, { children: [jsx(MenuButton, __assign({ "aria-label": "Toggle menu", onClick: togglePush, mr: "24px" }, { children: isPushed ? (jsx(Icon$i, { width: "24px", color: "primary" }, void 0)) : (jsx(Icon$j, { width: "24px", color: "primary" }, void 0)) }), void 0), isAbsoluteUrl ? (jsx(StyledLink, __assign({ as: "a", href: href, "aria-label": "Pancake home page" }, { children: innerLogo }), void 0)) : (jsx(StyledLink, __assign({ to: href, "aria-label": "Pancake home page" }, { children: innerLogo }), void 0))] }, void 0));
};
React.memo(Logo$1, function (prev, next) { return prev.isPushed === next.isPushed && prev.isDark === next.isDark; });
var templateObject_1$L, templateObject_2$q;

var img$n = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAhCAYAAACr8emlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQjNGQjBGMjMyMUQxMUVDQTQyQUNEREI5RkU3RTMxMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQjNGQjBGMzMyMUQxMUVDQTQyQUNEREI5RkU3RTMxMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNCM0ZCMEYwMzIxRDExRUNBNDJBQ0REQjlGRTdFMzEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNCM0ZCMEYxMzIxRDExRUNBNDJBQ0REQjlGRTdFMzEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ANTkKgAADXxJREFUeNqsWHlsHOd9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";

var img$m = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACQRJREFUeF7tW39wFHcV/7y9lFCVsXQKub00OCioLVXryDhjGSxaoT8wdOiMDpDbI/THlGQvoSi0SmdqHeiodaQkub1E+mPg9gI6nbGKrUnRwrQoM6VaO7XqOLQiAW4vSWmr1hGS7Pc5e7kke3d7d7vHXRIG979k3/e9z/vs98e7996XMMnPuuh7s6WR9+dJUlWd8FEdCf4wAydZmH1gPtndevXpyYRElTS2od2YYxIvFxKtJsK1YMwD8KHCNskEuA+EkxD0jK9K6tmzce7xSuEsOwGh9jOfFRJ9iQjLAbqlLMAZv2dCjwQcjqny4bLoTCspGwHBDmMZSWgBcEc5ATroepnBHXE10F0OOxdMQCh66tNC+FqI6O5yAHKrg4EeidARa5Z73I5xkiuZgFDn27UshluB1Fe/vAiIvwL8a7D0FhH6heB+krjfpA8khwfO/GemPNuPYVMmSH4Q+QXIT+AVAN1Q3DnuBpsderju5eKyuRIlERDqTH6VBR4DeEEeo++CcYh9eAEsDsWba/9WCjilMzmXhXmTRL4vM/NNAObn1UO0WW/27/JqxzMBoYixlQmPOhoiDDGjnU2zrRLHWVBLbCLQprxEMO3Ww/57vZDgiYBQ1IgyoymPgRizaIuHa1/1AsCrbGpWsNhEnCLig7nj+YiuBr7oVq9rAkKa8SwDKx0Uv8rgB+NqoNet0XLIKZ3J60hgG4PXOpDwtq4G5rix44oARUvsBugeB4W9M6pHGp68u+4dN8YqIRPSkrsYbM2GzIfRp4fljxSzWZSAUNRYz4w9DopiuiqvL2ZgMt6HoskWZm7PJYH36eFAQyEMBQkY3e35l7nkcrBcgUi5CApqAwsIZm7IzLxNDwe+l89OXgKC2pkbCNLvcgYSvq43y0+XC3g59ax9vL+makgkcz4Y8b3x5sBuJ1uOBNzZMRgYloYPAfQJ+yBmfCseln9QTtDl1tWgJVZIoOdz9dIqXfXnzGZHAhQtuQPgBzOUEHS9WQ6VG3Al9AU1YwsBP8zS3aur8q3Z9nIISK+lYwBm24RfH5khrdh/T01/JQBXQqcSNWJgKHbdBLEmptb+NPN/WdYVLbkT4M0ZQkx3xcL+pyoBtFI612mnr/fBZ33Iy2w2XtRVeVleAqxfdszWIKq2CR3RVdl1ZFUph0rRq0STj4H5vqyxG3RVHj/WM5ZAUEt0ESgzlmaxVg/X/qQUAFM9prFrYKFpimMAX2HD8oquyp8f+3ucgMaHT8w058w8CWCuTdhx45gKx6xolEGn4qq83Yv9YDTxCDFty1zSZn0sfPWz1v/GCQhFkrcz8c8zlTsfHV4AlENW6UyugeD9KcBEB2hk6Bt7W+e95UZ3qPNULZu+10F0pU2+S1fl1I+6cQKCmtFBQNgm9KauygvdGKmkzNpd/TVVM0QfGDNsdgxm8VA8XPuEG9uKlogDNBESM5/Ww4G6DAIUzfgLgGvGFTI69LBsZXym9FG0xBMA3eUIgovH+ta4oJZoIFA8Q4ck3aI31TyfmgGhyODHmUaysja+pbo697dT6n3auBJNbISgLSB8LBsPER0fHPn3p3paF54vhFWJJM5mLIN08iRFgBJJtIKozev0V6LGYTAyztWpIkz4sKh7o2zNYscnGDGeIsKGiZecyhmMzoCsTA8DD8dV+bvFnJlOBAD4s67K1+UlYDRtn1FTuLyq+orRGaAZzwG4bXwwcZPeHOi6yAiArsp5f90qWuIagDJmCGNk4RgBbwBYNOYwMd8RCweeuagIKLJpWzVJH/83I3MliL4wSkDU+BcYs8YcZoglcbX2aDECgprxnWIyk/FeIhxzUyBRosZ5+3FKEtXT13aeunJmddVZO1DJHF7gNtCYDAfLZUPRjD4AqfPfephwJzVqA9ebMP9oN3IO78x6Wl30frkMTxc9SsR4BYTFE0sd9/+fgEt+CZS6CVrlcEi4cTpMbzcxS9rP3E0wHQd4OgaDmhEmoGM6OG9hKHT+j2EsfAx6DISmWQToioCCgZDXUFjRkgcArr+YZkC6g8U5FHaY0gXjasvxYMRIEqFmOpDgZgkENUMjoNmGd0BX5ZrRSPDx5HwM8d8zgiHixXubA38o5GAwajxKjK0OMufBvEMPB3ZMB4LS+9wAgPGKMYHaYqr/vvEfD0ok8RqIPjMeJADbY6r8UDEHgp3GMhL0G4B92bJWH0/V0Ll1ezbPf6+Ynkq+d6pxmsw37gsHXpogILcaVHQZjIFe0zEYuEwaeQRAo90RFuL2eEvtgUo650a3Q1bphK7KH7XGTuQEI/3LicTBTIXekqLBqPEAMb6f1vEjXZW3uAFYSZlUUlRUvQbgqjE7zLwzHg58M4OAW9uPV19VNesEmGUbIM9p8YZIYrVEtL1QcqKSDmfrdkqLS5Bu3qvWpD52RQojDV3GtYXSU5NFgKfCiAXqki+NjR4Xl3BxNBXgjLaaZJfH34CgVXqL/8RkTd8LtRPSkvuyO8hclcfTsyCnQYJAL8RU/1cuFNhkjM/TOeauQcICONoiM/IigIxWWALtj6n+dZPhRKk28naMwUOLTGopRI2VxEhVUO0PEbXGmv3T5qewHVveTjHQt3XVPxafZPpTiGlFS2wGaGcOCRLVx5r8OeSU+tXKMS5fhxiAPboq2ypCWR+0mHFFS7QBlFsklWiT3uTPbU4sprAC7wt0hh3VVf+SQiaLdoqmlkMk8TMiWp2riLvO4d2tU5lBztMRZkE9q6vyePibjwRXBKROhmhyP5jXOJBwlIHtU9EsDeb7szvB0vj+oaty/rsFNidcEzBKQmIjmDrzsDlN2uULr/mc/czrklwfTa4SzL9wHDfVFyaAB3RVdr7MkcdRTzNgTEdDx5klkkRPZrfSjr1n4J8EeomYj5g80tvdUvcnr0Sn9p4fD8owh+sllpYyeCmAvO3vVGIvY0kEWOC8XZqiNxncS0zH3V6aAlBPwOeKEzcFl6bsoC7Za3PZX+aSvTiZTYTSNbiYhLmC2br3V7bSmbWHHJTAB/eqgay0XfFFcsGBUKkmGrUBv2BxG5NYCaJPer08TQK/MqvwXCWzSyVvgqWSMt2uz/8Pqxo06YdXjUAAAAAASUVORK5CYII=";

var img$l = "data:image/png;base64,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";

var img$k = "data:image/png;base64,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";

var img$j = "data:image/png;base64,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";

var img$i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABEhJREFUeF7tm12I1FYUx/8ns61ofWgps0zGbnFBS7VCLT6I0Ad9axH0pWspzkwtBaGTVaFQBKF1fVLwA3GbQdpS182stBWK/QCfir4ItdJaWheqiBWlm8GPp/Wh6k6OJMzNZtLEmdlN7CR752mSk9zc/y/nnNx7ckOY4z+a4/ohAUgPaBAY0McXzsNznxGRmh4o/LVRzh99nB43BIq6yekRPq2EiLaPlnPDYdocAAXd3E3AUBoB2JoMTQ3NdRKA9ICQEGBgqKqpe5IWFkG5bEYhIAGEeIBImGGAirq5BcCxFvbdzPj2rnVv1+ntS+9H6WWxekBRN78C8LbnIfODoeU2iO2Sbg4zMBhqr0x8yEwHw+xRgIgNQPHzWj8e8DV/JzMWLxvZlv/rPf1u3xQe3Aiz2/uLuvk3gMXeY8T5UYhvXOM/45lIckCQQAJNjGq5RaLzgQIV9I98oF63jynptYsMXtkEwGOPAkJsHhD4uCRsMsrqSRdAxRwA4xux7c8DxRb2rgfguNinN1cz9bwBZMaqWu9Vf6c3HzWXUx0DFurfndBe+N1vL+i3lihkvcnWw1+Mwb7zUYj2thGrB0Td2TjaixRAHB2Mu82gOc2MkmDcHX2S7UsAcjYop8Od1wPkZEhOh2U9QBZEZEVIlsRkTVAWRZ/kmD2Ka0U6G5RJMJlJ8BKAV1xvIpw1yuq6MO8KfTXWTUPhhluPg3CbgQsEXMjU+U+7GDvbsEkSgCCttwH8SsAlYowcH1THOwWSdABevZMMPlzV8p90AiFNAITuyyB8LKrVBd0sAegPS+gJATBxjoEsQckC/Gw7d5iB0wDOixphWE5LBICmsvf+2jPWAl6u2JmeaQ2It7YDxD4mCELiAPjFvluZWGVZytZ2QfgLpIkHIIAU9No7RLwPjBdDPYJ4l1HO7/XaUwPAeWvle/XmAzFuaOoKP5zUAGgh3tFNwIFRTf0odR7QjnghWiHaeLyc+15sJ94DWoi/AuClpjtOdG60nHs9FQAeJ95+5CGjnKK69ROA570QGFyoavmxRlgEL5TspslQUFZvJV6M/AoVcz0xfmxug8cMLV9ILIB2xQvRJb12mME7mr0gs9Re35C4HNCpeOfxOFzrh8I/A+h1Y7+xhjhRAGYi3vWCirmPGTs9AJxkmBgAsxFvi96i31pZR/2iGwaEO0ZZzSYCwGzFT+cC8yQDb4ntf+9PLeh6AFGJd3KBXnsf4C+mw2Dq1a4GEKV4W3TpyD+vcUb5zQ0Dxvqu+V6ALayrblPPis5FLd5ud+3QmZ6+7Mt/AFjWGANoXQkgDvECbGHYXNvWZCho9BXnPq8HFCvmGTCaOmpfO47Radd8NOUFYK82VerOklv3BUcc4t2hsP1n4NDN+fOezhwhhZbEeafD2n5qsmfDlzuzk8LuhRCX+CYA/4foVtd01h0/RK83ObY6p1O7/HS2U2JpO37Oe8AjixMfvm5EQ2QAAAAASUVORK5CYII=";

var img$h = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMEY1RUY0NDBBRDMxMUVDODFGQ0VFRTZGNTE5RUU3MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMEY1RUY0NTBBRDMxMUVDODFGQ0VFRTZGNTE5RUU3MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEwRjVFRjQyMEFEMzExRUM4MUZDRUVFNkY1MTlFRTcyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEwRjVFRjQzMEFEMzExRUM4MUZDRUVFNkY1MTlFRTcyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+IsnxeQAABg1JREFUeNrsW31oVmUU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";

var img$g = "data:image/png;base64,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";

var img$f = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1REEwQTRERDEwNEUxMUVDOEMwOUEwQkQyMTM1OTdBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1REEwQTRERTEwNEUxMUVDOEMwOUEwQkQyMTM1OTdBMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVEQTBBNERCMTA0RTExRUM4QzA5QTBCRDIxMzU5N0EwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVEQTBBNERDMTA0RTExRUM4QzA5QTBCRDIxMzU5N0EwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/gp8eAAACtpJREFUeNrsW2+sXEUV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";

var img$e = "data:image/png;base64,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";

var img$d = "data:image/png;base64,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";

var img$c = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABMBJREFUeF7tW11oHFUU/s5sSLB90UaazBZEEPTBB0WhVAKtRcEH9SGogbY7m8QHbXbSSlGw/kBaFKUqKmRnoy+6ZqaCRKXYFx9EUxCtD4pghT5Zo3ZmilhQBCM0c2S63XTnZnZnNszOTtabt8y995zvfvecc+895y7hf/5H65m/ZjgTIIyvZ2wnxzBjsc/jD6oH8mfj6mmbgGLZeYcJk3EVdKMfQxmx9KGv4uhuiwCt4j4D5pfiCO5yn7N9K9j57kH19ygcsQkoGs7DDCxECcxOO58w9fxoFJ5YBOw1frs9h9xnAAYbBTJwJEpBWu3EeBSEGwL6iF42S8PPtsIQSYD2qrsZm/lzMLYLgqqmrmYmFoyX3Xs8Yn+RAn8eY+L4tPpeMxIiCSga7vsM3hNkFotmSd2d1urG1VMoO1NEqAj9L4Fwr1lST4XJaUmAZtgvAvScMPDXnIKd1Sn157jA0uynGe7rAB8SdJ5B38D95uNbfhGxNCWgWHHGmVEVB7CH3dYBdTHNSbWrS6s4J8F4QIhXH1q6+kgsAvbNnh9RlNxHAA8JAyZNXV1DSrsAO91/4o1z1670D3wD0M2NuohwbL6kHg58E8Foc+5WeHwCwF1ixLd09WinwSclvzjnbGcPpwEErZx4yizl36rrWeMCBcM1CVwIskTWvD6sJQUuLTnFyoUCs2cK+pYZPGrp+U/97wECioZzhIEZwUROz+tqwBrSmkASerSy/QKInhdk/ZDzeMy/M6wSELbyAP0Jxn5mdpMA0y0ZRJgB4W7Bqm1l0z83rRKgGc45ADd2C2Sn9foT5VUl/n8eQDTWSMCV9vqnq907DS4N+UECahr9o3wIAfXQ0FsEhJHcgoA01qT7OiIJyNJtLwm6SLi9RhJg6mrkZSkJYGnIKBjOjCRAWkAwgSNdoPk2WPNKGQNkEJS7gNwG09ij09AhzwHyINSBk2Bh1n5IySl3eMy3AVgi8PfM/K01ve27uGatzdr3sUI7CHQn2DsDximPB74+fnDwr7qMwqwTSGbEkS1mrhN3Ac2w5wDaHwLmXwaesnS1HAU0DFRtDP3ERE9apSE/OQufAFLwRZS8xnbxDJMoAVrZ/gNEW1oBYngjlr6taYlaM5wLALZGTOppU1dfyRQBmmFbAO2LsRo/LuPijgX91r/FvkXDfZPBT7SWQSdzm4bGqpO0nBkC9laWrstx/8UYk6+lnEgZrZtxfcye1+zr+66htXV7wiL4cuJyhYiOzZeGV0tymSGgUDl/C7ESfH5CWOQVHIWCXeJ9G0IRwiehVnVSvhRIXDB1dUwz3EOAt2Tq+Y8b2y8HQQW7Gr+F3e0b28UiTiIxIHQlqFYpDmvzr5trgFTsx4jp7UawYf1aWVnoZCJqltkhoMmBpJ2yW08S4K94XBJ6joC6ucfNP0gCwtxoI8cAaQH+GcBPwcV8d9RzLiC3wZDzgjwHtGBAukC3doG4l6As9kvkKJzFicXFJAmQSdEOJEXjml8W+kkXkC4gXUA+kWn7jZD/24AsBLBEMIQkbSOfyCSiOMNCJAFRb4QyvHiJQBMswP0E4AcTkbxBhPQPXBq8+nsBvwKbw8yV8tQGmcL6YBLIZvYOm9N5s2feAK2PCuA/AuSkwqHsqUwAAAAASUVORK5CYII=";

var img$b = "data:image/png;base64,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";

var img$a = "data:image/png;base64,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";

var img$9 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNjI0MzNENzMyRjQxMUVDODkzMURFQTkyRDJGMTU3RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNjI0MzNEODMyRjQxMUVDODkzMURFQTkyRDJGMTU3RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2MjQzM0Q1MzJGNDExRUM4OTMxREVBOTJEMkYxNTdFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA2MjQzM0Q2MzJGNDExRUM4OTMxREVBOTJEMkYxNTdFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+oTAaowAAC6FJREFUeNrsnQ2wVVUV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";

var img$8 = "data:image/png;base64,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";

var img$7 = "data:image/png;base64,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";

var img$6 = "data:image/png;base64,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";

var img$5 = "data:image/png;base64,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";

var img$4 = "data:image/png;base64,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";

var img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QjNCNUQ0NzI1REYxMUVDQTY5MTlBMTBBM0UyMDkwMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QjNCNUQ0ODI1REYxMUVDQTY5MTlBMTBBM0UyMDkwMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhCM0I1RDQ1MjVERjExRUNBNjkxOUExMEEzRTIwOTAxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhCM0I1RDQ2MjVERjExRUNBNjkxOUExMEEzRTIwOTAxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+vi+2JgAABFlJREFUeNrsWktIVFEYvufOjGZSEbkoqIwWZpQtkjCqTWXQwo3QKpNqUxYGLdwURFEQ2CawNy1q0VYIRCjIHosCi7AItSKICiLIKOxlzsw9ff+95zrHcWbu3LmPGfUc+Oece97f+R/nPz/DOOfabEq6NsuSAqwAK8AKsAKsACvACrACrAD7lKJOHc4+afmBbIH4TNIYzplmGLqm60YbY/yK3Rd1c5H9pTLqX4HWUhn9u0G7RLcajHsjjdmB7B760hiqugHaVxAazj4c33xrhVcOv5fK7yZK1ub+SG2jAMUEWMq+SG3f6ZBsjJP2yJkhtZnzFMw+xqv9EGmeqcwNPX18JThnCK5RViG1RdCWETDq42Yb45nWC1+kpxwiNmaKdDJCnz3RWLxRszj0ExsfSySiWiIe02Jl4wfwvYT6YowpGVSP9EkvG99KhyDme5a2xDma18WWToG2BAaYABBHiMDlb6jqy9J1SFB6ioMe5ljis6B8U6sbwAVb6Ugkaelq8QMm8wIVaZvLjLhsCfnMupZyioduuL02ii4QvjsexP20aya1WDSBQ0pO6Z+pXJIczsZ1lrpiNGGlzduGwHKdadJdLYEk669PaitNwKbhIq5a+hw1uWhMcFp4ZCCOMrN03gkQs25j+wosKZEmB4Q4Y2/MvrbMzfqwQdvl9Au4Z8CGCVjLqpd+JeG9hS7S46VwtcgHCu6PBgl4Gegg6ClooIC9VoK2g9aAFgu/mbyqQeF9/XYJvQE/dUECXgi6Ksr3QWcc3EQ7zQedgOHCs49XyVxKWWQ2ojN+E1+d+BhxmK+WMeM8xuwMU4e3gR7AQHUhn5PD6OwGvQXADnxW5ZivCta7w3xocO1QjvlaQIOFgPXlWsLiR0DNAHSBDoDevuJpWAce7ocL2uhySgo2XAbtxZzXxGvqH/Lloq41TKM1DIIoaW2g9VL9UmyoMx8LjX6X0KcHVvejcFSq8d2E+sNpjjnpZ4M9XyY3Fm0UVRlDcUNQIk1W+jr0rB7LnXY59i7GkLFqt8rm4Q1jw3ew8XZQDUS6O09jRT99+F2HcY+C1OFyyxEiZ0A7icWIy7cdxrwwuL4HfUnnhnJIAHRXp7hXE+hxjvm+QjqOIW/ULadkVQg6TG6jecoD4EozXMtaIYKr5Yc8N1g/+va7fEH2YuZeAKnHvBvFVWhKFw7rJcCSdPyy4okTAYUwjNYkFK8F+ZmeC/LVg5uWcWkvrym9WAt74ZzrwEOQ7+GMYMTBWFFrPmXTqTe0M/CIB7D+AM7FHWY9+jNJglxHAUGLy1y6dbJIlEepigapUyZHRYDAjUgzJgUX0tbxarg867CjHvv8NvZqN/RiLTxdrHTJ/E9RAm0ECdjIS4zDBZ0I0mitJD83jPhxnoCNNHfWF8DlUrkCYDeVilgXcvD5iHRMm0HJkcN4nRyFY9CF01zkVl9CxkEBwIuOaqD+IK4AK8AKsAKsACvACrACrAD7k/4LMACzbqsRVxTovgAAAABJRU5ErkJggg==";

var img$2 = "data:image/png;base64,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";

var img$1 = "data:image/png;base64,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";

var img = "data:image/png;base64,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";

var ImageStyled$1 = styled(Image)(templateObject_1$K || (templateObject_1$K = __makeTemplateObject(["\n  min-width: 28px;\n  min-height: 28px;\n  display: inline-block;\n  margin-right: 12px;\n"], ["\n  min-width: 28px;\n  min-height: 28px;\n  display: inline-block;\n  margin-right: 12px;\n"])));
var IogoStyled = styled(Image)(templateObject_2$p || (templateObject_2$p = __makeTemplateObject(["\n  min-width: 32px;\n  min-height: 26px;\n"], ["\n  min-width: 32px;\n  min-height: 26px;\n"])));
var ImageStyled2 = styled(Image)(templateObject_3$h || (templateObject_3$h = __makeTemplateObject(["\n  min-width: 28px;\n  min-height: 28px;\n  display: inline-block;\n"], ["\n  min-width: 28px;\n  min-height: 28px;\n  display: inline-block;\n"])));
var HomeIcon = function (props) { return jsx(IogoStyled, __assign({ src: img$n }, props), void 0); };
var TradeIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$m }, props), void 0); };
var LiquidityIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$l }, props), void 0); };
var FarmIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$k }, props), void 0); };
var MarketIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$j }, props), void 0); };
var MiningIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$i }, props), void 0); };
var IfoIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$h }, props), void 0); };
var MemberIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$g }, props), void 0); };
var AssetsIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$f }, props), void 0); };
var MallIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$e }, props), void 0); };
var CoinIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$d }, props), void 0); };
var CardIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$c }, props), void 0); };
var NestIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$b }, props), void 0); };
var AirIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$a }, props), void 0); };
var BuyBountyIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$9 }, props), void 0); };
var DocsIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$8 }, props), void 0); };
var GithubIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$7 }, props), void 0); };
var InfoIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$6 }, props), void 0); };
var MoreIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$5 }, props), void 0); };
var ReportIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$4 }, props), void 0); };
var PoolsIcon = function (props) { return jsx(ImageStyled$1, __assign({ src: img$3 }, props), void 0); };
var MediumIcon = function (props) { return jsx(ImageStyled2, __assign({ src: img$2 }, props), void 0); };
var TwitterIcon = function (props) { return jsx(ImageStyled2, __assign({ src: img$1 }, props), void 0); };
var TelegramIcon = function (props) { return jsx(ImageStyled2, __assign({ src: img }, props), void 0); };
var templateObject_1$K, templateObject_2$p, templateObject_3$h;

var ImageIcon = /*#__PURE__*/Object.freeze({
	__proto__: null,
	HomeIcon: HomeIcon,
	TradeIcon: TradeIcon,
	LiquidityIcon: LiquidityIcon,
	FarmIcon: FarmIcon,
	MarketIcon: MarketIcon,
	MiningIcon: MiningIcon,
	IfoIcon: IfoIcon,
	MemberIcon: MemberIcon,
	AssetsIcon: AssetsIcon,
	MallIcon: MallIcon,
	CoinIcon: CoinIcon,
	CardIcon: CardIcon,
	NestIcon: NestIcon,
	AirIcon: AirIcon,
	BuyBountyIcon: BuyBountyIcon,
	DocsIcon: DocsIcon,
	GithubIcon: GithubIcon,
	InfoIcon: InfoIcon,
	MoreIcon: MoreIcon,
	ReportIcon: ReportIcon,
	PoolsIcon: PoolsIcon,
	MediumIcon: MediumIcon,
	TwitterIcon: TwitterIcon,
	TelegramIcon: TelegramIcon
});

var socials = [
	{
		label: "Telegram",
		icon: "TelegramIcon",
		href: "https://t.me/Magician_Global",
		// items: [
		//   {
		//     label: "English",
		//     href: "https://t.me/pancakeswap",
		//   },
		//   {
		//     label: "Bahasa Indonesia",
		//     href: "https://t.me/PancakeSwapIndonesia",
		//   },
		//   {
		//     label: "中文",
		//     href: "https://t.me/PancakeSwap_CN",
		//   },
		//   {
		//     label: "Tiếng Việt",
		//     href: "https://t.me/PancakeSwapVN",
		//   },
		//   {
		//     label: "Italiano",
		//     href: "https://t.me/pancakeswap_ita",
		//   },
		//   {
		//     label: "русский",
		//     href: "https://t.me/pancakeswap_ru",
		//   },
		//   {
		//     label: "Türkiye",
		//     href: "https://t.me/pancakeswapturkiye",
		//   },
		//   {
		//     label: "Português",
		//     href: "https://t.me/PancakeSwapPortuguese",
		//   },
		//   {
		//     label: "Español",
		//     href: "https://t.me/PancakeswapEs",
		//   },
		//   {
		//     label: "日本語",
		//     href: "https://t.me/pancakeswapjp",
		//   },
		//   {
		//     label: "Français",
		//     href: "https://t.me/pancakeswapfr",
		//   },
		//   {
		//     label: "Announcements",
		//     href: "https://t.me/PancakeSwapAnn",
		//   },
		//   {
		//     label: "Whale Alert",
		//     href: "https://t.me/PancakeSwapWhales",
		//   },
		// ],
	},
	{
		label: "Twitter",
		icon: "TwitterIcon",
		href: "https://twitter.com/MBTMetaverse",
	},
	{
		label: "Medium",
		icon: "MediumIcon",
		href: "https://medium.com/@MBTMetaverse",
	},
];
var MENU_HEIGHT = 64;
var MENU_ENTRY_HEIGHT = 48;
var SIDEBAR_WIDTH_FULL = 240;
var SIDEBAR_WIDTH_REDUCED = 56;

var rainbowAnimation = keyframes(templateObject_1$J || (templateObject_1$J = __makeTemplateObject(["\n  0%,\n  100% {\n    background-position: 0 0;\n  }\n  50% {\n    background-position: 100% 0;\n  }\n"], ["\n  0%,\n  100% {\n    background-position: 0 0;\n  }\n  50% {\n    background-position: 100% 0;\n  }\n"])));
var LinkLabel = styled.div(templateObject_2$o || (templateObject_2$o = __makeTemplateObject(["\n  color: ", ";\n  transition: color 0.4s;\n  flex-grow: 1;\n"], ["\n  color: ", ";\n  transition: color 0.4s;\n  flex-grow: 1;\n"])), function (_a) {
	var isPushed = _a.isPushed, theme = _a.theme;
	return (isPushed ? theme.colors.white_black : "transparent");
});
var MenuEntry = styled.div(templateObject_3$g || (templateObject_3$g = __makeTemplateObject(["\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  height: ", "px;\n  padding: ", ";\n  font-size: ", ";\n  background-color: ", ";\n  color: ", ";\n  /* box-shadow: ", "; */\n  a {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n  }\n\n  svg {\n    fill: ", ";\n  }\n\n  &:hover {\n    background-color: ", ";\n    transition: 0.3s;\n  }\n\n  // Safari fix\n  flex-shrink: 0;\n\n  &.rainbow {\n    background-clip: text;\n    animation: ", " 3s ease-in-out infinite;\n    background: ", ";\n    background-size: 400% 100%;\n  }\n"], ["\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  height: ", "px;\n  padding: ", ";\n  font-size: ", ";\n  background-color: ", ";\n  color: ", ";\n  /* box-shadow: ", "; */\n  a {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n  }\n\n  svg {\n    fill: ", ";\n  }\n\n  &:hover {\n    background-color: ", ";\n    transition: 0.3s;\n  }\n\n  // Safari fix\n  flex-shrink: 0;\n\n  &.rainbow {\n    background-clip: text;\n    animation: ", " 3s ease-in-out infinite;\n    background: ", ";\n    background-size: 400% 100%;\n  }\n"])), MENU_ENTRY_HEIGHT, function (_a) {
	var secondary = _a.secondary;
	return (secondary ? "0 32px" : "0 12px");
}, function (_a) {
	var secondary = _a.secondary;
	return (secondary ? "14px" : "16px");
}, function (_a) {
	_a.secondary; var theme = _a.theme, isActive = _a.isActive;
	return (isActive ? theme.colors.backgroundSelect : 'transparent');
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.white_black;
}, function (_a) {
	var isActive = _a.isActive, theme = _a.theme;
	return (isActive ? "inset 4px 0px 0px " + theme.colors.primary : "none");
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.primary;
}, function (_a) {
	var theme = _a.theme, isActive = _a.isActive;
	return isActive ? '' : theme.colors.tertiary;
}, rainbowAnimation, function (_a) {
	var theme = _a.theme;
	return theme.colors.gradients.bubblegum;
});
MenuEntry.defaultProps = {
	secondary: false,
	isActive: false,
};
styled(Text)(templateObject_4$8 || (templateObject_4$8 = __makeTemplateObject(["\n  border-radius: ", ";\n  padding: 0 8px;\n  border: 2px solid;\n  border-color: ", ";\n  box-shadow: none;\n  color: ", ";\n  margin-left: 8px;\n"], ["\n  border-radius: ", ";\n  padding: 0 8px;\n  border: 2px solid;\n  border-color: ", ";\n  box-shadow: none;\n  color: ", ";\n  margin-left: 8px;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.radii.default;
}, function (_a) {
	var theme = _a.theme, color = _a.color;
	return theme.colors[color];
}, function (_a) {
	var theme = _a.theme, color = _a.color;
	return theme.colors[color];
});
React.memo(LinkLabel, function (prev, next) { return prev.isPushed === next.isPushed; });
var templateObject_1$J, templateObject_2$o, templateObject_3$g, templateObject_4$8;

styled.div(templateObject_1$I || (templateObject_1$I = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  // Safari fix\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  flex-direction: column;\n  // Safari fix\n  flex-shrink: 0;\n"])));
styled.div(templateObject_2$n || (templateObject_2$n = __makeTemplateObject(["\n  max-height: ", ";\n  transition: max-height 0.3s ease-out;\n  overflow: hidden;\n  border-color: ", ";\n  /* border-style: solid;\n  border-width: 1px 0; */\n"], ["\n  max-height: ", ";\n  transition: max-height 0.3s ease-out;\n  overflow: hidden;\n  border-color: ", ";\n  /* border-style: solid;\n  border-width: 1px 0; */\n"])), function (_a) {
	var isOpen = _a.isOpen, maxHeight = _a.maxHeight;
	return (isOpen ? maxHeight + "px" : 0);
}, function (_a) {
	var isOpen = _a.isOpen, isPushed = _a.isPushed;
	return (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "transparent");
});
var templateObject_1$I, templateObject_2$n;

var _a$3;
var DropdownMenuItemType;
(function (DropdownMenuItemType) {
	DropdownMenuItemType[DropdownMenuItemType["INTERNAL_LINK"] = 0] = "INTERNAL_LINK";
	DropdownMenuItemType[DropdownMenuItemType["EXTERNAL_LINK"] = 1] = "EXTERNAL_LINK";
	DropdownMenuItemType[DropdownMenuItemType["BUTTON"] = 2] = "BUTTON";
	DropdownMenuItemType[DropdownMenuItemType["DIVIDER"] = 3] = "DIVIDER";
})(DropdownMenuItemType || (DropdownMenuItemType = {}));
var scales = {
	LD: "ld",
	MD: "md",
	SM: "sm",
	XS: "xs",
};
var scaleVariants = (_a$3 = {},
	_a$3[scales.LD] = {
		boxWidth: "32px",
		iconWidth: 32,
		marginL: '-7px',
		subMarginL: null,
		fontSize: null,
		subFontSize: '14px',
		skeletonW: 80,
		skeletonH: 24,
	},
	_a$3[scales.MD] = {
		boxWidth: "48px",
		iconWidth: 48,
		subMarginL: null,
		marginL: '-7px',
		fontSize: null,
		subFontSize: '14px',
		skeletonW: 80,
		skeletonH: 24,
	},
	_a$3[scales.SM] = {
		boxWidth: "60px",
		iconWidth: 60,
		marginL: '-7px',
		subMarginL: null,
		subFontSize: '16px',
		fontSize: '25px',
		skeletonW: 120,
		skeletonH: 48,
	},
	_a$3[scales.XS] = {
		boxWidth: "130px",
		iconWidth: 130,
		marginL: '-30px',
		subMarginL: '-16px',
		fontSize: '50px',
		subFontSize: '26px',
		skeletonW: 120,
		skeletonH: 48,
	},
	_a$3);

styled.div(templateObject_1$H || (templateObject_1$H = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n"])));
var templateObject_1$H;

new BigNumber$1(0);
new BigNumber$1(1);
new BigNumber$1(9);
var BIG_TEN = new BigNumber$1(10);
new BigNumber$1(1000000000);

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
var getDecimalAmount = function (amount, decimals) {
	if (decimals === void 0) { decimals = 18; }
	return new BigNumber$1(amount).times(BIG_TEN.pow(decimals));
};
var formatLocalisedCompactNumber = function (number, maximumSignificantDigits) {
	if (maximumSignificantDigits === void 0) { maximumSignificantDigits = 2; }
	var codeFromStorage = getLanguageCodeFromLS();
	return new Intl.NumberFormat(codeFromStorage, {
		notation: 'compact',
		// compactDisplay: 'long',
		maximumSignificantDigits: maximumSignificantDigits,
	}).format(number);
};

var Balance$1 = function (_a) {
	var value = _a.value, _b = _a.color, color = _b === void 0 ? 'text' : _b, _c = _a.decimals, decimals = _c === void 0 ? 3 : _c, _d = _a.isDisabled, isDisabled = _d === void 0 ? false : _d, unit = _a.unit, prefix = _a.prefix, onClick = _a.onClick, props = __rest(_a, ["value", "color", "decimals", "isDisabled", "unit", "prefix", "onClick"]);
	var previousValue = useRef(0);
	useEffect(function () {
		previousValue.current = value;
	}, [value]);
	return (jsx(Text, __assign({ color: isDisabled ? 'textDisabled' : color, onClick: onClick }, props, { children: jsx(CountUp, { start: previousValue.current, end: value, prefix: prefix, suffix: unit, decimals: decimals, duration: 1, separator: "," }, void 0) }), void 0));
};

var PriceLink = styled.div(templateObject_1$G || (templateObject_1$G = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  /* cursor: pointer; */\n  svg {\n    transition: transform 0.3s;\n  }\n  :hover {\n    svg {\n      transform: scale(1.2);\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  /* cursor: pointer; */\n  svg {\n    transition: transform 0.3s;\n  }\n  :hover {\n    svg {\n      transform: scale(1.2);\n    }\n  }\n"])));
var CakePrice = function (_a) {
	var cakePriceUsd = _a.cakePriceUsd, isLoading = _a.isLoading, cakeToken = _a.cakeToken, tokenLable = _a.tokenLable, fontColor = _a.fontColor, suffix = _a.suffix, formatLocal = _a.formatLocal, _b = _a.logo, logo = _b === void 0 ? 'MBT' : _b, _c = _a.dollar, dollar = _c === void 0 ? true : _c, _d = _a.scale, scale = _d === void 0 ? 'md' : _d, isBalance = _a.isBalance;
	var t = useTranslation().t;
	var dispalyPrice = useMemo(function () {
		if (formatLocal)
			return formatLocalisedCompactNumber(Number(cakePriceUsd === null || cakePriceUsd === void 0 ? void 0 : cakePriceUsd.toFixed(formatLocal)), formatLocal);
		return cakePriceUsd.toFixed(3);
	}, [formatLocal, cakePriceUsd]);
	var show = typeof isLoading === 'boolean' ? !isLoading : cakePriceUsd;
	var IconElement = logo === 'MBT' ? Icon$B : Icon$A;
	return show ? (jsxs(PriceLink, {
		children: [jsx(Box, __assign({ width: scaleVariants[scale].boxWidth }, { children: jsx(IconElement, { width: scaleVariants[scale].iconWidth, height: scaleVariants[scale].iconWidth, ml: scaleVariants[scale].marginL, mr: "8px" }, void 0) }), void 0), jsxs(Box, __assign({ ml: scaleVariants[scale].subMarginL }, {
			children: [jsxs(Text, __assign({ fontSize: scaleVariants[scale].subFontSize, color: fontColor || 'white_black' }, { children: [cakeToken, " ", tokenLable ? tokenLable : t('Price')] }), void 0), jsxs(Flex, {
				children: [jsx(Text, __assign({ fontSize: scaleVariants[scale].fontSize, color: fontColor || 'textPrimary', bold: true }, { children: dollar ? '$' : '' }), void 0), jsx(Text, __assign({ fontSize: scaleVariants[scale].fontSize, color: fontColor || 'textPrimary', bold: true }, {
					children: isBalance
						?
						(jsx(Balance$1, { fontSize: scaleVariants[scale].fontSize, color: fontColor || 'textPrimary', bold: true, value: Number(dispalyPrice) }, void 0))
						:
						"" + dispalyPrice
				}), void 0), jsx(Text, __assign({ ml: "8px", fontSize: scaleVariants[scale].fontSize, color: fontColor || 'textPrimary', bold: true }, { children: suffix && " " + suffix }), void 0)]
			}, void 0)]
		}), void 0)]
	}, void 0)) : (jsx(Skeleton, { width: scaleVariants[scale].skeletonW, height: scaleVariants[scale].skeletonH }, void 0));
};
React.memo(CakePrice);
var templateObject_1$G;

var Icons = IconModule;
var MoonIcon = Icons.MoonIcon, SunIcon = Icons.SunIcon;
var ThemeSwitcher = function (_a) {
	var isDark = _a.isDark, toggleTheme = _a.toggleTheme;
	return (jsx(Button, __assign({ variant: "text", onClick: function () { return toggleTheme(!isDark); } }, { children: jsxs(Flex, __assign({ alignItems: "center" }, { children: [jsx(SunIcon, { color: isDark ? "textDisabled" : "text", width: "24px" }, void 0), jsx(Text, __assign({ color: "textDisabled", mx: "4px" }, { children: "/" }), void 0), jsx(MoonIcon, { color: isDark ? "white" : "textDisabled", width: "24px" }, void 0)] }), void 0) }), void 0));
};
React.memo(ThemeSwitcher, function (prev, next) { return prev.isDark === next.isDark; });

var SocialLinks = function () {
	return (jsx(Flex, {
		children: socials.map(function (social, index) {
			// const Icon = Icons[social.icon];
			var Icon = ImageIcon[social.icon];
			var iconProps = { width: "24px", color: "textSubtle", style: { cursor: "pointer" } };
			var mr = index < socials.length - 1 ? "12px" : 0;
			// if (social.items) {
			//   return (
			//     <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
			//       {social.items.map((item) => (
			//         <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
			//           {item.label}
			//         </Link>
			//       ))}
			//     </Dropdown>
			//   );
			// }
			return (jsx(Link, __assign({ external: true, href: social.href, "aria-label": social.label, mr: mr }, { children: jsx(Icon, __assign({}, iconProps), void 0) }), social.label));
		})
	}, void 0));
};
React.memo(SocialLinks, function () { return true; });

styled.div(templateObject_1$F || (templateObject_1$F = __makeTemplateObject(["\n  flex: none;\n  padding: 8px 4px;\n  background-color: ", ";\n  /* border-top: solid 2px rgba(133, 133, 133, 0.1); */\n  box-shadow: ", ";\n  background: ", ";\n  filter: ", ";\n"], ["\n  flex: none;\n  padding: 8px 4px;\n  background-color: ", ";\n  /* border-top: solid 2px rgba(133, 133, 133, 0.1); */\n  box-shadow: ", ";\n  background: ", ";\n  filter: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.nav.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.nav;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundPrimary;
}, function (_a) {
	var theme = _a.theme;
	return theme.filter.brightness;
});
styled.div(templateObject_2$m || (templateObject_2$m = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 16px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 16px;\n"])), MENU_ENTRY_HEIGHT);
styled.div(templateObject_3$f || (templateObject_3$f = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 16px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: ", "px;\n  padding: 0 16px;\n"])), MENU_ENTRY_HEIGHT);
var templateObject_1$F, templateObject_2$m, templateObject_3$f;

styled.div(templateObject_1$E || (templateObject_1$E = __makeTemplateObject(["\n  position: fixed;\n  padding-top: ", ";\n  top: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-shrink: 0;\n  background-color: ", ";\n  width: ", ";\n  height: 100%;\n  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  /* border-right: ", "; */\n  box-shadow: ", ";\n  z-index: 11;\n  overflow: ", ";\n  transform: translate3d(0, 0, 0);\n  ", ";\n\n  ", " {\n    border-right: 2px solid rgba(133, 133, 133, 0.1);\n    width: ", ";\n  }\n"], ["\n  position: fixed;\n  padding-top: ", ";\n  top: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-shrink: 0;\n  background-color: ", ";\n  width: ", ";\n  height: 100%;\n  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  /* border-right: ", "; */\n  box-shadow: ", ";\n  z-index: 11;\n  overflow: ", ";\n  transform: translate3d(0, 0, 0);\n  ", ";\n\n  ", " {\n    border-right: 2px solid rgba(133, 133, 133, 0.1);\n    width: ", ";\n  }\n"])), function (_a) {
	var showMenu = _a.showMenu;
	return (showMenu ? "80px" : 0);
}, function (_a) {
	var theme = _a.theme;
	return theme.nav.background;
}, function (_a) {
	var isPushed = _a.isPushed;
	return (isPushed ? SIDEBAR_WIDTH_FULL + "px" : 0);
}, function (_a) {
	var isPushed = _a.isPushed;
	return (isPushed ? "2px solid rgba(133, 133, 133, 0.1)" : 0);
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.nav;
}, function (_a) {
	var isPushed = _a.isPushed;
	return (isPushed ? "initial" : "hidden");
}, function (_a) {
	var isPushed = _a.isPushed;
	return !isPushed && "white-space: nowrap;";
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.nav;
}, function (_a) {
	var isPushed = _a.isPushed;
	return (isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED) + "px";
});
var templateObject_1$E;

styled.div(templateObject_1$D || (templateObject_1$D = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n"], ["\n  position: relative;\n  width: 100%;\n"])));
styled.nav(templateObject_2$l || (templateObject_2$l = __makeTemplateObject(["\n  position: fixed;\n  top: ", ";\n  left: 0;\n  transition: top 0.2s;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-left: 8px;\n  padding-right: 16px;\n  width: 100%;\n  height: ", "px;\n  background-color: ", ";\n  /* border-bottom: solid 2px rgba(133, 133, 133, 0.1); */\n  box-shadow: ", ";\n  z-index: 20;\n  transform: translate3d(0, 0, 0);\n"], ["\n  position: fixed;\n  top: ", ";\n  left: 0;\n  transition: top 0.2s;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-left: 8px;\n  padding-right: 16px;\n  width: 100%;\n  height: ", "px;\n  background-color: ", ";\n  /* border-bottom: solid 2px rgba(133, 133, 133, 0.1); */\n  box-shadow: ", ";\n  z-index: 20;\n  transform: translate3d(0, 0, 0);\n"])), function (_a) {
	var showMenu = _a.showMenu;
	return (showMenu ? 0 : "-" + MENU_HEIGHT + "px");
}, MENU_HEIGHT, function (_a) {
	var theme = _a.theme;
	return theme.nav.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.nav;
});
styled.div(templateObject_3$e || (templateObject_3$e = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n"], ["\n  position: relative;\n  display: flex;\n"])));
styled.div(templateObject_4$7 || (templateObject_4$7 = __makeTemplateObject(["\n  flex-grow: 1;\n  margin-top: ", ";\n  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate3d(0, 0, 0);\n  max-width: 100%;\n  height: calc(100vh - 64px);\n  /* overflow: scroll; */\n\n  ", " {\n    margin-left: ", ";\n    max-width: ", ";\n  }\n"], ["\n  flex-grow: 1;\n  margin-top: ", ";\n  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate3d(0, 0, 0);\n  max-width: 100%;\n  height: calc(100vh - 64px);\n  /* overflow: scroll; */\n\n  ", " {\n    margin-left: ", ";\n    max-width: ", ";\n  }\n"])), function (_a) {
	var showMenu = _a.showMenu;
	return (showMenu ? MENU_HEIGHT + "px" : 0);
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.nav;
}, function (_a) {
	var isPushed = _a.isPushed;
	return (isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED) + "px";
}, function (_a) {
	var isPushed = _a.isPushed;
	return "calc(100% - " + (isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED) + "px)";
});
styled(Overlay)(templateObject_5$4 || (templateObject_5$4 = __makeTemplateObject(["\n  position: fixed;\n  height: 100%;\n\n  ", " {\n    display: none;\n  }\n"], ["\n  position: fixed;\n  height: 100%;\n\n  ", " {\n    display: none;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.nav;
});
var templateObject_1$D, templateObject_2$l, templateObject_3$e, templateObject_4$7, templateObject_5$4;

styled.hr(templateObject_1$C || (templateObject_1$C = __makeTemplateObject(["\n  border-color: ", ";\n  border-style: solid;\n  border-width: 1px 0 0;\n  margin: 4px 0;\n"], ["\n  border-color: ", ";\n  border-style: solid;\n  border-width: 1px 0 0;\n  margin: 4px 0;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
});
var UserMenuItem = styled.div(templateObject_2$k || (templateObject_2$k = __makeTemplateObject(["\n  align-items: center;\n  border: 0;\n  background: transparent;\n  color: ", ";\n  cursor: ", ";\n  display: flex;\n  font-size: 16px;\n  height: 48px;\n  justify-content: space-between;\n  outline: 0;\n  padding-left: 16px;\n  padding-right: 16px;\n  width: 100%;\n\n  /* &:hover:not(:disabled) {\n    background-color: ", ";\n  }\n\n  &:active:not(:disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n  } */\n"], ["\n  align-items: center;\n  border: 0;\n  background: transparent;\n  color: ", ";\n  cursor: ", ";\n  display: flex;\n  font-size: 16px;\n  height: 48px;\n  justify-content: space-between;\n  outline: 0;\n  padding-left: 16px;\n  padding-right: 16px;\n  width: 100%;\n\n  /* &:hover:not(:disabled) {\n    background-color: ", ";\n  }\n\n  &:active:not(:disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n  } */\n"])), function (_a) {
	var theme = _a.theme, disabled = _a.disabled;
	return theme.colors[disabled ? "textDisabled" : "textSubtle"];
}, function (_a) {
	var disabled = _a.disabled;
	return (disabled ? "not-allowed" : "default");
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.tertiary;
});
var templateObject_1$C, templateObject_2$k;

styled(Flex)(templateObject_1$B || (templateObject_1$B = __makeTemplateObject(["\n  align-items: center;\n  cursor: pointer;\n  display: inline-flex;\n  position: relative;\n\n  &:hover {\n    opacity: 0.65;\n  }\n"], ["\n  align-items: center;\n  cursor: pointer;\n  display: inline-flex;\n  position: relative;\n\n  &:hover {\n    opacity: 0.65;\n  }\n"])));
styled.div(templateObject_2$j || (templateObject_2$j = __makeTemplateObject(["\n  color: ", ";\n  display: none;\n  font-weight: 600;\n\n  ", " {\n    display: block;\n    margin-left: 8px;\n    margin-right: 4px;\n  }\n"], ["\n  color: ", ";\n  display: none;\n  font-weight: 600;\n\n  ", " {\n    display: block;\n    margin-left: 8px;\n    margin-right: 4px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.sm;
});
styled.div(templateObject_3$d || (templateObject_3$d = __makeTemplateObject(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 20px;\n  padding-bottom: 4px;\n  padding-top: 4px;\n  pointer-events: auto;\n  min-width: 224px;\n  visibility: visible;\n  z-index: 1001;\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);\n\n  ", "\n\n  ", ":first-child {\n    border-radius: 8px 8px 0 0;\n  }\n\n  ", ":last-child {\n    border-radius: 0 0 8px 8px;\n  }\n"], ["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 20px;\n  padding-bottom: 4px;\n  padding-top: 4px;\n  pointer-events: auto;\n  min-width: 224px;\n  visibility: visible;\n  z-index: 1001;\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);\n\n  ", "\n\n  ", ":first-child {\n    border-radius: 8px 8px 0 0;\n  }\n\n  ", ":last-child {\n    border-radius: 0 0 8px 8px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.card.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
}, function (_a) {
	var isOpen = _a.isOpen;
	return !isOpen &&
		"\n    pointer-events: none;\n    visibility: hidden;\n  ";
}, UserMenuItem, UserMenuItem);
var templateObject_1$B, templateObject_2$j, templateObject_3$d;

var LangSelector = function (_a) {
	var currentLang = _a.currentLang, langs = _a.langs, _b = _a.position, position = _b === void 0 ? 'bottom-right' : _b, setLang = _a.setLang;
	return (jsx(Dropdown, __assign({ position: position, target: jsx(Button, __assign({ variant: "circular" }, { children: currentLang === null || currentLang === void 0 ? void 0 : currentLang.toUpperCase() }), void 0) }, {
		children: langs.map(function (lang) {
			return (jsx(MenuButton, __assign({
				fullWidth: true, onClick: function () { return setLang(lang); },
				// Safari fix
				style: { minHeight: "32px", height: "auto" }
			}, { children: lang.language }), lang.locale));
		})
	}), void 0));
};
React.memo(LangSelector, function (prev, next) { return prev.currentLang === next.currentLang; });

var types = {
	SUCCESS: "success",
	DANGER: "danger",
	WARNING: "warning",
	INFO: "info",
	CUSTOM: "custom",
};

var _a$2;
(_a$2 = {},
	_a$2[types.INFO] = variants$4.INFO,
	_a$2[types.SUCCESS] = variants$4.SUCCESS,
	_a$2[types.DANGER] = variants$4.DANGER,
	_a$2[types.WARNING] = variants$4.WARNING,
	_a$2[types.CUSTOM] = variants$4.CUSTOM,
	_a$2);
styled.div(templateObject_1$A || (templateObject_1$A = __makeTemplateObject(["\n  right: 16px;\n  position: fixed;\n  max-width: calc(100% - 32px);\n  transition: all 250ms ease-in;\n  width: 100%;\n\n  ", " {\n    max-width: 400px;\n  }\n"], ["\n  right: 16px;\n  position: fixed;\n  max-width: calc(100% - 32px);\n  transition: all 250ms ease-in;\n  width: 100%;\n\n  ", " {\n    max-width: 400px;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.sm;
});
var templateObject_1$A;

styled.div(templateObject_1$z || (templateObject_1$z = __makeTemplateObject(["\n  .enter,\n  .appear {\n    opacity: 0.01;\n    transform: translateX(100%);\n  }\n\n  .enter.enter-active,\n  .appear.appear-active {\n    opacity: 1;\n    transition: opacity 250ms ease-in;\n  }\n\n  .exit {\n    opacity: 1;\n  }\n\n  .exit.exit-active {\n    opacity: 0.01;\n    transition: opacity 250ms ease-out;\n  }\n"], ["\n  .enter,\n  .appear {\n    opacity: 0.01;\n    transform: translateX(100%);\n  }\n\n  .enter.enter-active,\n  .appear.appear-active {\n    opacity: 1;\n    transition: opacity 250ms ease-in;\n  }\n\n  .exit {\n    opacity: 1;\n  }\n\n  .exit.exit-active {\n    opacity: 0.01;\n    transition: opacity 250ms ease-out;\n  }\n"])));
var templateObject_1$z;

styled(Text).attrs({ role: "button" })(templateObject_1$y || (templateObject_1$y = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"], ["\n  position: relative;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.primary;
});
styled.div(templateObject_2$i || (templateObject_2$i = __makeTemplateObject(["\n  display: ", ";\n  position: absolute;\n  bottom: -22px;\n  right: 0;\n  left: 0;\n  text-align: center;\n  background-color: ", ";\n  color: ", ";\n  border-radius: 16px;\n  opacity: 0.7;\n"], ["\n  display: ", ";\n  position: absolute;\n  bottom: -22px;\n  right: 0;\n  left: 0;\n  text-align: center;\n  background-color: ", ";\n  color: ", ";\n  border-radius: 16px;\n  opacity: 0.7;\n"])), function (_a) {
	var isTooltipDisplayed = _a.isTooltipDisplayed;
	return (isTooltipDisplayed ? "block" : "none");
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.contrast;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.invertedContrast;
});
var templateObject_1$y, templateObject_2$i;

var ConnectorNames;
(function (ConnectorNames) {
	ConnectorNames["Injected"] = "injected";
	ConnectorNames["WalletConnect"] = "walletconnect";
	ConnectorNames["BSC"] = "bsc";
})(ConnectorNames || (ConnectorNames = {}));

[
	{
		title: "Metamask",
		icon: Icon$y,
		connectorId: ConnectorNames.Injected,
		priority: 1,
	},
	{
		title: "WalletConnect",
		icon: Icon$q,
		connectorId: ConnectorNames.WalletConnect,
		priority: 2,
	},
	{
		title: "Trust Wallet",
		icon: Icon$s,
		connectorId: ConnectorNames.Injected,
		priority: 3,
	},
	{
		title: "MathWallet",
		icon: Icon$z,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
	{
		title: "TokenPocket",
		icon: Icon$t,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
	{
		title: "BitKeep",
		icon: Icon$m,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
	{
		title: "Binance Chain",
		icon: Icon$K,
		connectorId: ConnectorNames.BSC,
		priority: 999,
	},
	{
		title: "SafePal",
		icon: Icon$v,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
	{
		title: "Coin98",
		icon: Icon$E,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
];

styled(Button).attrs({ width: "100%", variant: "text" })(templateObject_1$x || (templateObject_1$x = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  /* flex-direction: column; */\n  height: auto;\n  justify-content: flex-start;\n  margin-left: auto;\n  margin-right: auto;\n  width: 200px;\n"], ["\n  align-items: center;\n  display: flex;\n  /* flex-direction: column; */\n  height: auto;\n  justify-content: flex-start;\n  margin-left: auto;\n  margin-right: auto;\n  width: 200px;\n"])));
var templateObject_1$x;

styled.div(templateObject_1$w || (templateObject_1$w = __makeTemplateObject(["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"], ["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"])), function (_a) {
	var background = _a.background;
	return background || "transparent";
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
});
styled(Flex)(templateObject_2$h || (templateObject_2$h = __makeTemplateObject(["\n  align-items: center;\n  flex: 1;\n"], ["\n  align-items: center;\n  flex: 1;\n"])));
styled(Flex)(templateObject_3$c || (templateObject_3$c = __makeTemplateObject(["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"], ["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"])));
styled(Box)(templateObject_4$6 || (templateObject_4$6 = __makeTemplateObject(["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"], ["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.modal.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.box;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
}, function (_a) {
	var theme = _a.theme;
	return theme.radii.card;
}, function (_a) {
	var theme = _a.theme;
	return theme.zIndices.modal;
}, function (_a) {
	var theme = _a.theme;
	return theme.mediaQueries.xs;
}, function (_a) {
	var minWidth = _a.minWidth;
	return minWidth;
});
var LoadingContainer = styled(Box)(templateObject_5$3 || (templateObject_5$3 = __makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: ", ";\n  width: 650px;\n  /* height: 200px; */\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: ", ";\n  width: 650px;\n  /* height: 200px; */\n"])), function (_a) {
	var theme = _a.theme;
	return theme.zIndices.modal;
});
var VideoStyled = styled.video(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n  width: 500px;\n  height: 500px;\n  mix-blend-mode: screen;\n  object-fit: fill;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: 2;\n"], ["\n  width: 500px;\n  height: 500px;\n  mix-blend-mode: screen;\n  object-fit: fill;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: 2;\n"])));
var ImageStyled = styled.img(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n  /* width: 500px;\n  height: 500px; */\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: ", ";\n"], ["\n  /* width: 500px;\n  height: 500px; */\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: ", ";\n"])), function (_a) {
	var zIndex = _a.zIndex;
	return zIndex || 2;
});
var ChildrenWrapper = styled(Box)(templateObject_8$1 || (templateObject_8$1 = __makeTemplateObject(["\n  width: auto;\n  height: auto;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n"], ["\n  width: auto;\n  height: auto;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n"])));
styled(Box)(templateObject_9$1 || (templateObject_9$1 = __makeTemplateObject(["\n  background: pink;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: 100vw;\n  height: 100vh;\n"], ["\n  background: pink;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: 100vw;\n  height: 100vh;\n"])));
var scaleFrame = keyframes(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  90% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n"], ["\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  90% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n"])));
var opacityFrame = keyframes(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  0% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 0.8;\n  }\n  100% {\n    opacity: 0;\n  }\n"], ["\n  0% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 0.8;\n  }\n  100% {\n    opacity: 0;\n  }\n"])));
var BoxAnimationStyled = styled(Box)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 3.2s;\n  /* animation-delay: 0s; */\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n"], ["\n  animation-name: ", ";\n  animation-duration: 3.2s;\n  /* animation-delay: 0s; */\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n"])), scaleFrame);
styled(Box)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 0.5s;\n  animation-delay: 30ms;\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n  opacity: 0;\n"], ["\n  animation-name: ", ";\n  animation-duration: 0.5s;\n  animation-delay: 30ms;\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n  opacity: 0;\n"])), opacityFrame);
var templateObject_1$w, templateObject_2$h, templateObject_3$c, templateObject_4$6, templateObject_5$3, templateObject_6$1, templateObject_7$1, templateObject_8$1, templateObject_9$1, templateObject_10, templateObject_11, templateObject_12, templateObject_13;

var LoadingType;
(function (LoadingType) {
	LoadingType[LoadingType["HARVEST"] = 0] = "HARVEST";
	LoadingType[LoadingType["MEAT_MYSTERY"] = 1] = "MEAT_MYSTERY";
	LoadingType[LoadingType["EGG_MYSTERY"] = 2] = "EGG_MYSTERY";
})(LoadingType || (LoadingType = {}));

(jsx(VideoStyled, { loop: true, muted: true, autoPlay: true, src: "/images/loading/harvest.mp4" }, void 0));
(jsx(ImageStyled, { src: "/images/loading/harvest-loop.png" }, void 0));
var Loading = function (_a) {
	var children = _a.children, loadingType = _a.loadingType, loaded = _a.loaded, props = __rest(_a, ["children", "loadingType", "loaded"]);
	useTheme$1();
	var renderLoadingType = function () {
		if (loaded)
			return null;
		var time = new Date().getTime();
		switch (loadingType) {
			case LoadingType.HARVEST:
				return (jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
			case LoadingType.MEAT_MYSTERY:
				return (jsx(ImageStyled, { src: "/images/loading/card_ending.png?" + time }, void 0));
			case LoadingType.EGG_MYSTERY:
				return (jsx(ImageStyled, { src: "/images/loading/card_ending.png?" + time }, void 0));
			default:
				return (jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
		}
	};
	var renderLoadedType = useMemo(function () {
		if (!loaded)
			return null;
		var time = new Date().getTime();
		switch (loadingType) {
			case LoadingType.HARVEST:
				return (jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
			case LoadingType.MEAT_MYSTERY:
				return (jsx(ImageStyled, { zIndex: 4, src: "/images/loading/card_loadng.png?" + time }, void 0));
			case LoadingType.EGG_MYSTERY:
				return (jsx(ImageStyled, { zIndex: 4, src: "/images/loading/card_loadng.png?" + time }, void 0));
			default:
				return (jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
		}
	}, [loaded, loadingType]);
	return (jsxs(LoadingContainer, __assign({}, props, { children: [renderLoadingType(), renderLoadedType, jsx(ChildrenWrapper, { children: children && (jsx(BoxAnimationStyled, { children: children }, void 0)) }, void 0)] }), void 0));
};

var ModalWrapper = styled.div(templateObject_1$v || (templateObject_1$v = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.zIndices.modal - 1;
});
var Context = createContext({
	isOpen: false,
	nodeId: "",
	loadingType: LoadingType.HARVEST,
	modalNode: null,
	setModalNode: function () { return null; },
	setLoadingType: function () { return null; },
	setLoaded: function () { return null; },
	onPresent: function () { return null; },
	onDismiss: function () { return null; },
	onTypePresent: function () { return null; },
	setCloseOnOverlayClick: function () { return true; },
});
var ModalProvider = function (_a) {
	var children = _a.children;
	var _b = __read(useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
	var _c = __read(useState(), 2), modalNode = _c[0], setModalNode = _c[1];
	var _d = __read(useState(""), 2), nodeId = _d[0], setNodeId = _d[1];
	var _e = __read(useState(LoadingType.HARVEST), 2), loadingType = _e[0], setLoadingType = _e[1];
	var _f = __read(useState(false), 2), loaded = _f[0], setLoaded = _f[1];
	var _g = __read(useState(true), 2), closeOnOverlayClick = _g[0], setCloseOnOverlayClick = _g[1];
	var handlePresent = function (node, newNodeId) {
		setModalNode(node);
		setIsOpen(true);
		setNodeId(newNodeId);
	};
	var handleTypePresent = function (type, newNodeId) {
		setLoadingType(type);
		setIsOpen(true);
		setNodeId(newNodeId);
	};
	var handleDismiss = function () {
		setModalNode(undefined);
		setIsOpen(false);
		setNodeId("");
	};
	var handleOverlayDismiss = function () {
		if (closeOnOverlayClick) {
			handleDismiss();
		}
	};
	return (jsxs(Context.Provider, __assign({
		value: {
			isOpen: isOpen,
			nodeId: nodeId,
			loadingType: loadingType,
			modalNode: modalNode,
			setLoaded: setLoaded,
			setLoadingType: setLoadingType,
			setModalNode: setModalNode,
			onTypePresent: handleTypePresent,
			onPresent: handlePresent,
			onDismiss: handleDismiss,
			setCloseOnOverlayClick: setCloseOnOverlayClick,
		}
	}, {
		children: [isOpen && (jsxs(ModalWrapper, {
			children: [jsx(Overlay, { show: true, onClick: handleOverlayDismiss }, void 0), jsx(Loading, __assign({ loaded: loaded, loadingType: loadingType }, {
				children: React.isValidElement(modalNode) &&
					React.cloneElement(modalNode, {
						onDismiss: handleDismiss,
					})
			}), void 0)]
		}, void 0)), children]
	}), void 0));
};
var templateObject_1$v;

createGlobalStyle(templateObject_1$u || (templateObject_1$u = __makeTemplateObject(["\n  /* prettier-ignore */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed, \n  figure, figcaption, footer, header, hgroup, \n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    vertical-align: baseline;\n  }\n  /* HTML5 display-role reset for older browsers */\n  /* prettier-ignore */\n  article, aside, details, figcaption, figure, \n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n    font-size: 16px;\n    /* background-color: ", "; */\n  }\n  body{\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    -webkit-tap-highlight-color: transparent;\n  }\n  ol,\n  ul {\n    list-style: disc;\n    list-style-position: inside;\n  }\n  blockquote,\n  q {\n    quotes: none;\n  }\n  blockquote:before,\n  blockquote:after,\n  q:before,\n  q:after {\n    content: \"\";\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n  a {\n    color: inherit;\n    text-decoration: none;\n  }\n  [role=\"button\"] {\n    cursor: pointer;\n  }\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n  * {\n    font-family: 'SourceHanSansCN', sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  /* Number */\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  input[type=number] {\n    -moz-appearance: textfield;\n  }\n\n  /* Scrollbar */\n  ::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ", "; \n    border-radius: 8px;\n  }\n  ::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 5px ", "; \n    border-radius: 10px;\n  }\n\n  /* Slider */ \n  input[type=range] {\n    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */\n    width: 100%; /* Specific width is required for Firefox. */\n    background: transparent; /* Otherwise white in Chrome */\n  }\n  input[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n  }\n  input[type=range]:focus {\n    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */\n  }\n  input[type=range]::-ms-track {\n    width: 100%;\n    cursor: pointer;\n    /* Hides the slider so custom styles can be added */\n    background: transparent; \n    border-color: transparent;\n    color: transparent;\n  }\n  .show-media-lg {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-md {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-nav {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-sm {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xl {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xs {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .hide-media-lg {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-md {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-nav {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-sm {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xl {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xs {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n"], ["\n  /* prettier-ignore */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed, \n  figure, figcaption, footer, header, hgroup, \n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    vertical-align: baseline;\n  }\n  /* HTML5 display-role reset for older browsers */\n  /* prettier-ignore */\n  article, aside, details, figcaption, figure, \n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n    font-size: 16px;\n    /* background-color: ", "; */\n  }\n  body{\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    -webkit-tap-highlight-color: transparent;\n  }\n  ol,\n  ul {\n    list-style: disc;\n    list-style-position: inside;\n  }\n  blockquote,\n  q {\n    quotes: none;\n  }\n  blockquote:before,\n  blockquote:after,\n  q:before,\n  q:after {\n    content: \"\";\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n  a {\n    color: inherit;\n    text-decoration: none;\n  }\n  [role=\"button\"] {\n    cursor: pointer;\n  }\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n  * {\n    font-family: 'SourceHanSansCN', sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  /* Number */\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  input[type=number] {\n    -moz-appearance: textfield;\n  }\n\n  /* Scrollbar */\n  ::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ", "; \n    border-radius: 8px;\n  }\n  ::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 5px ", "; \n    border-radius: 10px;\n  }\n\n  /* Slider */ \n  input[type=range] {\n    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */\n    width: 100%; /* Specific width is required for Firefox. */\n    background: transparent; /* Otherwise white in Chrome */\n  }\n  input[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n  }\n  input[type=range]:focus {\n    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */\n  }\n  input[type=range]::-ms-track {\n    width: 100%;\n    cursor: pointer;\n    /* Hides the slider so custom styles can be added */\n    background: transparent; \n    border-color: transparent;\n    color: transparent;\n  }\n  .show-media-lg {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-md {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-nav {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-sm {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xl {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xs {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .hide-media-lg {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-md {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-nav {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-sm {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xl {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xs {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundPage;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.textSubtle;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, mediaQueries.lg, mediaQueries.md, mediaQueries.nav, mediaQueries.sm, mediaQueries.xl, mediaQueries.xs, mediaQueries.lg, mediaQueries.md, mediaQueries.nav, mediaQueries.sm, mediaQueries.xl, mediaQueries.xs);
var templateObject_1$u;

var ToastsContext = createContext(undefined);
var ToastsProvider = function (_a) {
	var children = _a.children;
	var _b = __read(useState([]), 2), toasts = _b[0], setToasts = _b[1];
	var toast = useCallback(function (_a) {
		var title = _a.title, description = _a.description, type = _a.type, custom = _a.custom, ttl = _a.ttl, hideRemove = _a.hideRemove, width = _a.width, stackSpacing = _a.stackSpacing;
		var id = title ? kebabCase(title) : kebabCase("" + +new Date());
		setToasts(function (prevToasts) {
			// Remove any existing toasts with the same id
			var currentToasts = prevToasts.filter(function (prevToast) { return prevToast.id !== id; });
			return __spreadArray([
				{
					id: id,
					title: title,
					description: description,
					type: type,
					custom: custom,
					ttl: ttl,
					width: width,
					stackSpacing: stackSpacing,
					hideRemove: hideRemove,
				}
			], __read(currentToasts));
		});
		return id;
	}, [setToasts]);
	var toastError = function (title, description) {
		return toast({ title: title, description: description, type: types.DANGER });
	};
	var toastInfo = function (title, description) {
		return toast({ title: title, description: description, type: types.INFO });
	};
	var toastSuccess = function (title, description) {
		return toast({ title: title, description: description, type: types.SUCCESS });
	};
	var toastWarning = function (title, description) {
		return toast({ title: title, description: description, type: types.WARNING });
	};
	var toastCustom = function (_a) {
		var title = _a.title, description = _a.description, customIcon = _a.customIcon, ttl = _a.ttl, width = _a.width, stackSpacing = _a.stackSpacing, hideRemove = _a.hideRemove;
		return toast({ title: title, description: description, hideRemove: hideRemove, customIcon: customIcon, ttl: ttl, width: width, stackSpacing: stackSpacing, type: types.CUSTOM });
	};
	var clear = function () { return setToasts([]); };
	var remove = function (id) {
		setToasts(function (prevToasts) { return prevToasts.filter(function (prevToast) { return prevToast.id !== id; }); });
	};
	return (jsx(ToastsContext.Provider, __assign({ value: { toasts: toasts, clear: clear, remove: remove, toastError: toastError, toastInfo: toastInfo, toastSuccess: toastSuccess, toastWarning: toastWarning, toastCustom: toastCustom } }, { children: children }), void 0));
};

var useToast = function () {
	var toastContext = useContext(ToastsContext);
	if (toastContext === undefined) {
		throw new Error('Toasts context undefined');
	}
	return toastContext;
};

var addTransaction = createAction('transactions/addTransaction');
var clearAllTransactions = createAction('transactions/clearAllTransactions');
var finalizeTransaction = createAction('transactions/finalizeTransaction');
var checkedTransaction = createAction('transactions/checkedTransaction');

function shouldCheck(lastBlockNumber, tx) {
	if (tx.receipt)
		return false;
	if (!tx.lastCheckedBlockNumber)
		return true;
	var blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
	if (blocksSinceCheck < 1)
		return false;
	var minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
	if (minutesPending > 60) {
		// every 10 blocks if pending for longer than an hour
		return blocksSinceCheck > 9;
	}
	if (minutesPending > 5) {
		// every 3 blocks if pending more than 5 minutes
		return blocksSinceCheck > 2;
	}
	// otherwise every block
	return true;
}
function Updater() {
	var t = useTranslation().t;
	var _a = useActiveWeb3React(), library = _a.library, chainId = _a.chainId;
	var lastBlockNumber = useBlockNumber();
	var dispatch = useDispatch();
	var state = useSelector(function (s) { return s.transactions; });
	var transactions = useMemo(function () { var _a; return (chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {}); }, [chainId, state]);
	var _b = useToast(), toastError = _b.toastError, toastSuccess = _b.toastSuccess;
	useEffect(function () {
		if (!chainId || !library || !lastBlockNumber)
			return;
		Object.keys(transactions)
			.filter(function (hash) { return shouldCheck(lastBlockNumber, transactions[hash]); })
			.forEach(function (hash) {
				library
					.getTransactionReceipt(hash)
					.then(function (receipt) {
						var _a, _b;
						if (receipt) {
							dispatch(finalizeTransaction({
								chainId: chainId,
								hash: hash,
								receipt: {
									blockHash: receipt.blockHash,
									blockNumber: receipt.blockNumber,
									contractAddress: receipt.contractAddress,
									from: receipt.from,
									status: receipt.status,
									to: receipt.to,
									transactionHash: receipt.transactionHash,
									transactionIndex: receipt.transactionIndex,
								},
							}));
							var toast = receipt.status === 1 ? toastSuccess : toastError;
							toast(t("Transaction receipt"), jsxs(Flex, __assign({ flexDirection: "column" }, { children: [jsx(Text, { children: (_b = (_a = transactions[hash]) === null || _a === void 0 ? void 0 : _a.summary) !== null && _b !== void 0 ? _b : "Hash: " + hash.slice(0, 8) + "..." + hash.slice(58, 65) }, void 0), chainId && (jsx(Link, __assign({ external: true, href: getBscScanLink(hash, 'transaction', chainId) }, { children: t("View on BscScan") }), void 0))] }), void 0));
						}
						else {
							dispatch(checkedTransaction({ chainId: chainId, hash: hash, blockNumber: lastBlockNumber }));
						}
					})
					.catch(function (error) {
						console.error("failed to check transaction hash: " + hash, error);
					});
			});
	}, [chainId, library, transactions, lastBlockNumber, dispatch, toastSuccess, toastError, t]);
	return null;
}

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
function isTradeBetter(tradeA, tradeB, minimumDelta) {
	if (minimumDelta === void 0) { minimumDelta = ZERO_PERCENT; }
	if (tradeA && !tradeB)
		return false;
	if (tradeB && !tradeA)
		return true;
	if (!tradeA || !tradeB)
		return undefined;
	if (tradeA.tradeType !== tradeB.tradeType ||
		!currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
		!currencyEquals(tradeB.outputAmount.currency, tradeB.outputAmount.currency)) {
		throw new Error('Trades are not comparable');
	}
	if (minimumDelta.equalTo(ZERO_PERCENT)) {
		return tradeA.executionPrice.lessThan(tradeB.executionPrice);
	}
	return tradeA.executionPrice.raw.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT$1)).lessThan(tradeB.executionPrice);
}

var updateUserExpertMode = createAction('user/updateUserExpertMode');
var updateUserUsePloy = createAction('user/updateUserUsePloy');
var updateSystemUsePloy = createAction('user/updateSystemUsePloy');
var updateUserSingleHopOnly = createAction('user/updateUserSingleHopOnly');
var updateUserSlippageTolerance = createAction('user/updateUserSlippageTolerance');
var updateUserDeadline = createAction('user/updateUserDeadline');
var addSerializedToken = createAction('user/addSerializedToken');
var removeSerializedToken = createAction('user/removeSerializedToken');
var addSerializedPair = createAction('user/addSerializedPair');
var removeSerializedPair = createAction('user/removeSerializedPair');
var muteAudio = createAction('user/muteAudio');
var unmuteAudio = createAction('user/unmuteAudio');
var toggleTheme = createAction('user/toggleTheme');
var setVDsgInviteAddress = createAction('user/setVDsgInviteAddress');
var updateUseFarmGet = createAction('user/updateUseFarmGet');
var updateUseFarmPledge = createAction('user/updateUseFarmPledge');
var updateUseNestGet = createAction('user/updateUseNestGet');
var updateUseNestPledge = createAction('user/updateUseNestPledge');

function useAudioModeManager() {
	var dispatch = useDispatch();
	var audioPlay = useSelector(function (state) { return state.user.audioPlay; });
	var toggleSetAudioMode = useCallback(function () {
		if (audioPlay) {
			dispatch(muteAudio());
		}
		else {
			dispatch(unmuteAudio());
		}
	}, [audioPlay, dispatch]);
	return [audioPlay, toggleSetAudioMode];
}
function useIsExpertMode() {
	return useSelector(function (state) { return state.user.userExpertMode; });
}
function useExpertModeManager() {
	var dispatch = useDispatch();
	var expertMode = useIsExpertMode();
	var toggleSetExpertMode = useCallback(function () {
		dispatch(updateUserExpertMode({ userExpertMode: !expertMode }));
	}, [expertMode, dispatch]);
	return [expertMode, toggleSetExpertMode];
}
function useThemeManager() {
	var dispatch = useDispatch();
	var isDark = useSelector(function (state) { return state.user.isDark; });
	var toggleTheme$1 = useCallback(function () {
		dispatch(toggleTheme());
	}, [dispatch]);
	return [isDark, toggleTheme$1];
}
function useUserSingleHopOnly() {
	var dispatch = useDispatch();
	var singleHopOnly = useSelector(function (state) { return state.user.userSingleHopOnly; });
	var setSingleHopOnly = useCallback(function (newSingleHopOnly) {
		dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }));
	}, [dispatch]);
	return [singleHopOnly, setSingleHopOnly];
}
function useUserSlippageTolerance() {
	var dispatch = useDispatch();
	var userSlippageTolerance = useSelector(function (state) {
		return state.user.userSlippageTolerance;
	});
	var setUserSlippageTolerance = useCallback(function (slippage) {
		dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }));
	}, [dispatch]);
	return [userSlippageTolerance, setUserSlippageTolerance];
}
function useUserUsePoly() {
	var dispatch = useDispatch();
	var userUsePoly = useSelector(function (state) {
		return state.user.userUsePoly;
	});
	var setUserUsePoly = useCallback(function (usePoly) {
		dispatch(updateUserUsePloy({ userUsePoly: usePoly }));
	}, [dispatch]);
	return [userUsePoly, setUserUsePoly];
}
function useSystemUsePoly() {
	var dispatch = useDispatch();
	var userUsePoly = useSelector(function (state) {
		return state.user.systemUsePoly;
	});
	var setSystemUsePoly = useCallback(function (usePoly) {
		dispatch(updateSystemUsePloy({ systemUsePoly: usePoly }));
	}, [dispatch]);
	return [userUsePoly, setSystemUsePoly];
}
function useUserTransactionTTL() {
	var dispatch = useDispatch();
	var userDeadline = useSelector(function (state) {
		return state.user.userDeadline;
	});
	var setUserDeadline = useCallback(function (deadline) {
		dispatch(updateUserDeadline({ userDeadline: deadline }));
	}, [dispatch]);
	return [userDeadline, setUserDeadline];
}
function useAddUserToken() {
	var dispatch = useDispatch();
	return useCallback(function (token) {
		dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
	}, [dispatch]);
}
function useRemoveUserAddedToken() {
	var dispatch = useDispatch();
	return useCallback(function (chainId, address) {
		dispatch(removeSerializedToken({ chainId: chainId, address: address }));
	}, [dispatch]);
}

function wrappedCurrency(currency, chainId) {
	return chainId && currency === ETHER ? WETHER[chainId] : currency instanceof Token$1 ? currency : undefined;
}
function unwrappedToken(token) {
	if (token.equals(WETHER[token.chainId]))
		return ETHER;
	return token;
}

var PAIR_INTERFACE = new Interface(abi);
var PairState;
(function (PairState) {
	PairState[PairState["LOADING"] = 0] = "LOADING";
	PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
	PairState[PairState["EXISTS"] = 2] = "EXISTS";
	PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState || (PairState = {}));
function usePairs(currencies) {
	var chainId = useActiveWeb3React().chainId;
	var tokens = useMemo(function () {
		return currencies.map(function (_a) {
			var _b = __read(_a, 2), currencyA = _b[0], currencyB = _b[1];
			return [
				wrappedCurrency(currencyA, chainId),
				wrappedCurrency(currencyB, chainId),
			];
		});
	}, [chainId, currencies]);
	var pairAddresses = useMemo(function () {
		return tokens.map(function (_a) {
			var _b = __read(_a, 2), tokenA = _b[0], tokenB = _b[1];
			return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined;
		});
	}, [tokens]);
	var results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves');
	return useMemo(function () {
		return results.map(function (result, i) {
			var reserves = result.result, loading = result.loading;
			var tokenA = tokens[i][0];
			var tokenB = tokens[i][1];
			if (loading)
				return [PairState.LOADING, null];
			if (!tokenA || !tokenB || tokenA.equals(tokenB))
				return [PairState.INVALID, null];
			if (!reserves)
				return [PairState.NOT_EXISTS, null];
			var reserve0 = reserves.reserve0, reserve1 = reserves.reserve1;
			var _a = __read(tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA], 2), token0 = _a[0], token1 = _a[1];
			return [
				PairState.EXISTS,
				new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString())),
			];
		});
	}, [results, tokens]);
}
function usePair(tokenA, tokenB) {
	return usePairs([[tokenA, tokenB]])[0];
}

function useAllCommonPairs(currencyA, currencyB, poly) {
	var chainId = useActiveWeb3React().chainId;
	var _a = __read(chainId
		? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
		: [undefined, undefined], 2), tokenA = _a[0], tokenB = _a[1];
	var bases = useMemo(function () {
		var _a, _b, _c, _d, _e;
		if (!chainId)
			return [];
		var common = (_a = BASES_TO_CHECK_TRADES_AGAINST[chainId]) !== null && _a !== void 0 ? _a : [];
		var additionalA = tokenA ? (_c = (_b = ADDITIONAL_BASES[chainId]) === null || _b === void 0 ? void 0 : _b[tokenA.address]) !== null && _c !== void 0 ? _c : [] : [];
		var additionalB = tokenB ? (_e = (_d = ADDITIONAL_BASES[chainId]) === null || _d === void 0 ? void 0 : _d[tokenB.address]) !== null && _e !== void 0 ? _e : [] : [];
		return __spreadArray(__spreadArray(__spreadArray([], __read(common)), __read(additionalA)), __read(additionalB));
	}, [chainId, tokenA, tokenB]);
	var basePairs = useMemo(function () { return flatMap(bases, function (base) { return bases.map(function (otherBase) { return [base, otherBase]; }); }); }, [bases]);
	var allPairCombinations = useMemo(function () {
		return tokenA && tokenB
			? __spreadArray(__spreadArray(__spreadArray([
				// the direct pair
				[tokenA, tokenB]
			], __read(bases.map(function (base) { return [tokenA, base]; }))), __read(bases.map(function (base) { return [tokenB, base]; }))), __read(basePairs)).filter(function (tokens) { return Boolean(tokens[0] && tokens[1]); })
				.filter(function (_a) {
					var _b = __read(_a, 2), t0 = _b[0], t1 = _b[1];
					return t0.address !== t1.address;
				})
				.filter(function (_a) {
					var _b = __read(_a, 2), tokenA_ = _b[0], tokenB_ = _b[1];
					if (!chainId)
						return true;
					var customBases = CUSTOM_BASES[chainId];
					var customBasesA = customBases === null || customBases === void 0 ? void 0 : customBases[tokenA_.address];
					var customBasesB = customBases === null || customBases === void 0 ? void 0 : customBases[tokenB_.address];
					if (!customBasesA && !customBasesB)
						return true;
					if (customBasesA && !customBasesA.find(function (base) { return tokenB_.equals(base); }))
						return false;
					if (customBasesB && !customBasesB.find(function (base) { return tokenA_.equals(base); }))
						return false;
					return true;
				})
			: [];
	}, [tokenA, tokenB, bases, basePairs, chainId]);
	var allPairs = usePairs(allPairCombinations);
	// only pass along valid pairs, non-duplicated pairs
	return useMemo(function () {
		return Object.values(allPairs
			// filter out invalid pairs
			.filter(function (result) { return Boolean(result[0] === PairState.EXISTS && result[1]); })
			// filter out duplicated pairs
			.reduce(function (memo, _a) {
				var _b;
				var _c = __read(_a, 2), curr = _c[1];
				memo[curr.liquidityToken.address] = (_b = memo[curr.liquidityToken.address]) !== null && _b !== void 0 ? _b : curr;
				return memo;
			}, {}));
	}, [allPairs]);
}
var MAX_HOPS = 3;
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
function useTradeExactIn(currencyAmountIn, currencyOut, poly) {
	var allowedPairs = useAllCommonPairs(currencyAmountIn === null || currencyAmountIn === void 0 ? void 0 : currencyAmountIn.currency, currencyOut);
	var _a = __read(useUserSingleHopOnly(), 1), singleHopOnly = _a[0];
	return useMemo(function () {
		var _a, _b;
		if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
			if (singleHopOnly || poly) {
				return ((_a = Trade$1.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null);
			}
			// search through trades with varying hops, find best trade out of them
			var bestTradeSoFar = null;
			for (var i = 1; i <= MAX_HOPS; i++) {
				var currentTrade = (_b = Trade$1.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
				// if current trade is best yet, save it
				if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
					bestTradeSoFar = currentTrade;
				}
			}
			return bestTradeSoFar;
		}
		return null;
	}, [allowedPairs, currencyAmountIn, currencyOut, singleHopOnly, poly]);
}
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
function useTradeExactOut(currencyIn, currencyAmountOut, poly) {
	var allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut === null || currencyAmountOut === void 0 ? void 0 : currencyAmountOut.currency);
	var _a = __read(useUserSingleHopOnly(), 1), singleHopOnly = _a[0];
	return useMemo(function () {
		var _a, _b;
		if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
			if (singleHopOnly || poly) {
				return ((_a = Trade$1.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null);
			}
			// search through trades with varying hops, find best trade out of them
			var bestTradeSoFar = null;
			for (var i = 1; i <= MAX_HOPS; i++) {
				var currentTrade = (_b = Trade$1.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
				if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
					bestTradeSoFar = currentTrade;
				}
			}
			return bestTradeSoFar;
		}
		return null;
	}, [currencyIn, currencyAmountOut, allowedPairs, singleHopOnly, poly]);
}
function useIsTransactionUnsupported(currencyIn, currencyOut) {
	var unsupportedTokens = useUnsupportedTokens();
	var chainId = useActiveWeb3React().chainId;
	var tokenIn = wrappedCurrency(currencyIn, chainId);
	var tokenOut = wrappedCurrency(currencyOut, chainId);
	// if unsupported list loaded & either token on list, mark as unsupported
	if (unsupportedTokens) {
		if (tokenIn && Object.keys(unsupportedTokens).includes(tokenIn.address)) {
			return true;
		}
		if (tokenOut && Object.keys(unsupportedTokens).includes(tokenOut.address)) {
			return true;
		}
	}
	return false;
}

var Row = styled(Box)(templateObject_1$t || (templateObject_1$t = __makeTemplateObject(["\n  width: ", ";\n  display: flex;\n  padding: 0;\n  align-items: ", ";\n  justify-content: ", ";\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n"], ["\n  width: ", ";\n  display: flex;\n  padding: 0;\n  align-items: ", ";\n  justify-content: ", ";\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n"])), function (_a) {
	var width = _a.width;
	return width !== null && width !== void 0 ? width : '100%';
}, function (_a) {
	var align = _a.align;
	return align !== null && align !== void 0 ? align : 'center';
}, function (_a) {
	var justify = _a.justify;
	return justify !== null && justify !== void 0 ? justify : 'flex-start';
}, function (_a) {
	var padding = _a.padding;
	return padding;
}, function (_a) {
	var border = _a.border;
	return border;
}, function (_a) {
	var borderRadius = _a.borderRadius;
	return borderRadius;
});
var RowBetween = styled(Row)(templateObject_2$g || (templateObject_2$g = __makeTemplateObject(["\n  justify-content: space-between;\n"], ["\n  justify-content: space-between;\n"])));
styled.div(templateObject_3$b || (templateObject_3$b = __makeTemplateObject(["\n  display: flex;\n  align-items: flex-end;\n"], ["\n  display: flex;\n  align-items: flex-end;\n"])));
var AutoRow = styled(Row)(templateObject_4$5 || (templateObject_4$5 = __makeTemplateObject(["\n  flex-wrap: wrap;\n  margin: ", ";\n  justify-content: ", ";\n\n  & > * {\n    margin: ", " !important;\n  }\n"], ["\n  flex-wrap: wrap;\n  margin: ", ";\n  justify-content: ", ";\n\n  & > * {\n    margin: ", " !important;\n  }\n"])), function (_a) {
	var gap = _a.gap;
	return gap && "-" + gap;
}, function (_a) {
	var justify = _a.justify;
	return justify && justify;
}, function (_a) {
	var gap = _a.gap;
	return gap;
});
var RowFixed = styled(Row)(templateObject_5$2 || (templateObject_5$2 = __makeTemplateObject(["\n  width: fit-content;\n  margin: ", ";\n"], ["\n  width: fit-content;\n  margin: ", ";\n"])), function (_a) {
	var gap = _a.gap;
	return gap && "-" + gap;
});
var templateObject_1$t, templateObject_2$g, templateObject_3$b, templateObject_4$5, templateObject_5$2;

var Column = styled.div(templateObject_1$s || (templateObject_1$s = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n"])));
var ColumnCenter = styled(Column)(templateObject_2$f || (templateObject_2$f = __makeTemplateObject(["\n  width: 100%;\n  align-items: center;\n"], ["\n  width: 100%;\n  align-items: center;\n"])));
var AutoColumn = styled.div(templateObject_3$a || (templateObject_3$a = __makeTemplateObject(["\n  display: grid;\n  grid-auto-rows: auto;\n  grid-row-gap: ", ";\n  justify-items: ", ";\n"], ["\n  display: grid;\n  grid-auto-rows: auto;\n  grid-row-gap: ", ";\n  justify-items: ", ";\n"])), function (_a) {
	var gap = _a.gap;
	return (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap;
}, function (_a) {
	var justify = _a.justify;
	return justify && justify;
});
var templateObject_1$s, templateObject_2$f, templateObject_3$a;

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
function isZero(hexNumberString) {
	return /^0x0*$/.test(hexNumberString);
}

/**
 * Does a lookup for an ENS name to find its contenthash.
 */
function useENSContentHash(ensName) {
	var _a, _b, _c;
	var ensNodeArgument = useMemo(function () {
		if (!ensName)
			return [undefined];
		try {
			return ensName ? [namehash(ensName)] : [undefined];
		}
		catch (error) {
			return [undefined];
		}
	}, [ensName]);
	var registrarContract = useENSRegistrarContract(false);
	var resolverAddressResult = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
	var resolverAddress = (_a = resolverAddressResult.result) === null || _a === void 0 ? void 0 : _a[0];
	var resolverContract = useENSResolverContract(resolverAddress && isZero(resolverAddress) ? undefined : resolverAddress, false);
	var contenthash = useSingleCallResult(resolverContract, 'contenthash', ensNodeArgument);
	return {
		contenthash: (_c = (_b = contenthash.result) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null,
		loading: resolverAddressResult.loading || contenthash.loading,
	};
}

function useHttpLocations(uri) {
	var ens = useMemo(function () { return (uri ? parseENSAddress(uri) : undefined); }, [uri]);
	var resolvedContentHash = useENSContentHash(ens === null || ens === void 0 ? void 0 : ens.ensName);
	return useMemo(function () {
		if (ens) {
			return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash)) : [];
		}
		return uri ? uriToHttp(uri) : [];
	}, [ens, resolvedContentHash.contenthash, uri]);
}

var getTokenLogoURL = function (address) {
	return "https://assets.trustwalletapp.com/blockchains/smartchain/assets/" + address + "/logo.png";
};
var getSymbolLogoUrl = function (address) { return "/images/tokens/" + address + ".png"; };

var BAD_SRCS = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
var Logo = function (_a) {
	var srcs = _a.srcs, alt = _a.alt, rest = __rest(_a, ["srcs", "alt"]);
	var _b = __read(useState(0), 2), refresh = _b[1];
	var src = srcs.find(function (s) { return !BAD_SRCS[s]; });
	if (src) {
		return (jsx("img", __assign({}, rest, {
			alt: alt, src: src, onError: function () {
				console.debug("" + src);
				if (src)
					BAD_SRCS[src] = true;
				refresh(function (i) { return i + 1; });
			}
		}), void 0));
	}
	return jsx(Icon$D, __assign({}, rest), void 0);
};

var StyledLogo = styled(Logo)(templateObject_1$r || (templateObject_1$r = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n"], ["\n  width: ", ";\n  height: ", ";\n"])), function (_a) {
	var size = _a.size;
	return size;
}, function (_a) {
	var size = _a.size;
	return size;
});
function CurrencyLogo(_a) {
	var _b;
	var currency = _a.currency, _c = _a.size, size = _c === void 0 ? '24px' : _c, style = _a.style, symbol = _a.symbol;
	var uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined);
	var srcs = useMemo(function () {
		if (currency === ETHER)
			return [
				getSymbolLogoUrl(ETHER.symbol)
			];
		if (currency instanceof Token$1) {
			if (currency instanceof WrappedTokenInfo) {
				return __spreadArray(__spreadArray([], __read(uriLocations)), [getSymbolLogoUrl(currency.address), getTokenLogoURL(currency.address)]);
			}
			return [getSymbolLogoUrl(currency.address), getTokenLogoURL(currency.address)];
		}
		if (symbol)
			return [getSymbolLogoUrl(symbol)];
		return [];
	}, [currency, uriLocations, symbol]);
	// if (currency === ETHER) {
	//   return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
	// }
	return jsx(StyledLogo, { size: size, srcs: srcs, alt: ((_b = currency === null || currency === void 0 ? void 0 : currency.symbol) !== null && _b !== void 0 ? _b : 'token') + " logo", style: style }, void 0);
}
var templateObject_1$r;

var Wrapper$5 = styled.div(templateObject_1$q || (templateObject_1$q = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  margin-right: ", ";\n"], ["\n  display: flex;\n  flex-direction: row;\n  margin-right: ", ";\n"])), function (_a) {
	var margin = _a.margin;
	return margin && '4px';
});
function DoubleCurrencyLogo(_a) {
	var currency0 = _a.currency0, currency1 = _a.currency1, _b = _a.size, size = _b === void 0 ? 20 : _b, _c = _a.margin, margin = _c === void 0 ? false : _c;
	return (jsxs(Wrapper$5, __assign({ margin: margin }, { children: [currency0 && jsx(CurrencyLogo, { currency: currency0, size: size.toString() + "px", style: { marginRight: '4px' } }, void 0), currency1 && jsx(CurrencyLogo, { currency: currency1, size: size.toString() + "px" }, void 0)] }), void 0));
}
var templateObject_1$q;

var StyledListLogo = styled(Logo)(templateObject_1$p || (templateObject_1$p = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n"], ["\n  width: ", ";\n  height: ", ";\n"])), function (_a) {
	var size = _a.size;
	return size;
}, function (_a) {
	var size = _a.size;
	return size;
});
function ListLogo(_a) {
	var logoURI = _a.logoURI, style = _a.style, _b = _a.size, size = _b === void 0 ? '24px' : _b, alt = _a.alt;
	var srcs = useHttpLocations(logoURI);
	return jsx(StyledListLogo, { alt: alt, size: size, srcs: srcs, style: style }, void 0);
}
var templateObject_1$p;

var DetailsFooter = styled.div(templateObject_1$o || (templateObject_1$o = __makeTemplateObject(["\n  padding: 8px 0;\n  width: 100%;\n  max-width: 400px;\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n  color: ", ";\n  background-color: ", ";\n  text-align: center;\n"], ["\n  padding: 8px 0;\n  width: 100%;\n  max-width: 400px;\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n  color: ", ";\n  background-color: ", ";\n  text-align: center;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.invertedContrast;
});
var UnsupportedModal = function (_a) {
	var currencies = _a.currencies, onDismiss = _a.onDismiss;
	var chainId = useActiveWeb3React().chainId;
	var tokens = chainId && currencies
		? currencies.map(function (currency) {
			return wrappedCurrency(currency, chainId);
		})
		: [];
	var unsupportedTokens = useUnsupportedTokens();
	return (jsx(Modal, __assign({ title: "Unsupported Assets", maxWidth: "420px", onDismiss: onDismiss }, {
		children: jsxs(AutoColumn, __assign({ gap: "lg" }, {
			children: [tokens.map(function (token) {
				var _a;
				return (token &&
					unsupportedTokens &&
					Object.keys(unsupportedTokens).includes(token.address) && (jsxs(AutoColumn, __assign({ gap: "10px" }, { children: [jsxs(AutoRow, __assign({ gap: "5px", align: "center" }, { children: [jsx(CurrencyLogo, { currency: token, size: "24px" }, void 0), jsx(Text, { children: token.symbol }, void 0)] }), void 0), chainId && (jsx(Link, __assign({ external: true, small: true, color: "primaryDark", href: getBscScanLink(token.address, 'address', chainId) }, { children: token.address }), void 0))] }), (_a = token.address) === null || _a === void 0 ? void 0 : _a.concat('not-supported'))));
			}), jsx(AutoColumn, __assign({ gap: "lg" }, { children: jsx(Text, { children: "Some assets are not available through this interface because they may not work well with our smart contract or we are unable to allow trading for legal reasons." }, void 0) }), void 0)]
		}), void 0)
	}), void 0));
};
function UnsupportedCurrencyFooter(_a) {
	var currencies = _a.currencies;
	var _b = __read(useModal(jsx(UnsupportedModal, { currencies: currencies }, void 0)), 1), onPresentModal = _b[0];
	return (jsx(DetailsFooter, { children: jsx(Button, __assign({ variant: "text", onClick: onPresentModal }, { children: "Read more about unsupported assets" }), void 0) }, void 0));
}
var templateObject_1$o;

var SwapWarningTokens = {
	// safemoon,
	// bondly,
};

var Dots = styled.span(templateObject_1$n || (templateObject_1$n = __makeTemplateObject(["\n  &::after {\n    display: inline-block;\n    animation: ellipsis 1.25s infinite;\n    content: '.';\n    width: 1em;\n    text-align: left;\n  }\n  @keyframes ellipsis {\n    0% {\n      content: '.';\n    }\n    33% {\n      content: '..';\n    }\n    66% {\n      content: '...';\n    }\n  }\n"], ["\n  &::after {\n    display: inline-block;\n    animation: ellipsis 1.25s infinite;\n    content: '.';\n    width: 1em;\n    text-align: left;\n  }\n  @keyframes ellipsis {\n    0% {\n      content: '.';\n    }\n    33% {\n      content: '..';\n    }\n    66% {\n      content: '...';\n    }\n  }\n"])));
var templateObject_1$n;

/**
 * Does a lookup for an ENS name to find its address.
 */
function useENSAddress(ensName) {
	var _a, _b, _c;
	var debouncedName = useDebounce(ensName, 200);
	var ensNodeArgument = useMemo(function () {
		if (!debouncedName)
			return [undefined];
		try {
			return debouncedName ? [namehash(debouncedName)] : [undefined];
		}
		catch (error) {
			return [undefined];
		}
	}, [debouncedName]);
	var registrarContract = useENSRegistrarContract(false);
	var resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
	var resolverAddressResult = (_a = resolverAddress.result) === null || _a === void 0 ? void 0 : _a[0];
	var resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
	var addr = useSingleCallResult(resolverContract, 'addr', ensNodeArgument);
	var changed = debouncedName !== ensName;
	return {
		address: changed ? null : (_c = (_b = addr.result) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null,
		loading: changed || resolverAddress.loading || addr.loading,
	};
}

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
function useENSName(address) {
	var _a, _b, _c;
	var debouncedAddress = useDebounce(address, 200);
	var ensNodeArgument = useMemo(function () {
		if (!debouncedAddress || !isAddress(debouncedAddress))
			return [undefined];
		try {
			return debouncedAddress ? [namehash(debouncedAddress.toLowerCase().substr(2) + ".addr.reverse")] : [undefined];
		}
		catch (error) {
			return [undefined];
		}
	}, [debouncedAddress]);
	var registrarContract = useENSRegistrarContract(false);
	var resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
	var resolverAddressResult = (_a = resolverAddress.result) === null || _a === void 0 ? void 0 : _a[0];
	var resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
	var name = useSingleCallResult(resolverContract, 'name', ensNodeArgument);
	var changed = debouncedAddress !== address;
	return {
		ENSName: changed ? null : (_c = (_b = name.result) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null,
		loading: changed || resolverAddress.loading || name.loading,
	};
}

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
function useENS(nameOrAddress) {
	var validated = isAddress(nameOrAddress);
	var reverseLookup = useENSName(validated || undefined);
	var lookup = useENSAddress(nameOrAddress);
	return {
		loading: reverseLookup.loading || lookup.loading,
		address: validated || lookup.address,
		name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null,
	};
}

var InputPanel$1 = styled.div(templateObject_1$m || (templateObject_1$m = __makeTemplateObject(["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: 1.25rem;\n  background-color: ", ";\n  z-index: 1;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: 1.25rem;\n  background-color: ", ";\n  z-index: 1;\n  width: 100%;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundAlt;
});
var ContainerRow = styled.div(templateObject_2$e || (templateObject_2$e = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 1.25rem;\n  border: 1px solid ", ";\n  transition: border-color 300ms ", ",\n    color 500ms ", ";\n  background-color: ", ";\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 1.25rem;\n  border: 1px solid ", ";\n  transition: border-color 300ms ", ",\n    color 500ms ", ";\n  background-color: ", ";\n"])), function (_a) {
	var error = _a.error, theme = _a.theme;
	return (error ? theme.colors.failure : theme.colors.background);
}, function (_a) {
	var error = _a.error;
	return (error ? 'step-end' : 'step-start');
}, function (_a) {
	var error = _a.error;
	return (error ? 'step-end' : 'step-start');
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundAlt;
});
var InputContainer = styled.div(templateObject_3$9 || (templateObject_3$9 = __makeTemplateObject(["\n  flex: 1;\n  padding: 1rem;\n"], ["\n  flex: 1;\n  padding: 1rem;\n"])));
var Input$1 = styled.input(templateObject_4$4 || (templateObject_4$4 = __makeTemplateObject(["\n  font-size: 1.25rem;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  width: 0;\n  background-color: ", ";\n  transition: color 300ms ", ";\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 500;\n  width: 100%;\n  ::placeholder {\n    color: ", ";\n  }\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"], ["\n  font-size: 1.25rem;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  width: 0;\n  background-color: ", ";\n  transition: color 300ms ", ";\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 500;\n  width: 100%;\n  ::placeholder {\n    color: ", ";\n  }\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundAlt;
}, function (_a) {
	var error = _a.error;
	return (error ? 'step-end' : 'step-start');
}, function (_a) {
	var error = _a.error, theme = _a.theme;
	return (error ? theme.colors.failure : theme.colors.primary);
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.textDisabled;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.textDisabled;
});
function AddressInputPanel(_a) {
	var id = _a.id, value = _a.value, onChange = _a.onChange;
	var chainId = useActiveWeb3React().chainId;
	var t = useTranslation().t;
	var _b = useENS(value), address = _b.address, loading = _b.loading, name = _b.name;
	var handleInput = useCallback(function (event) {
		var input = event.target.value;
		var withoutSpaces = input.replace(/\s+/g, '');
		onChange(withoutSpaces);
	}, [onChange]);
	var error = Boolean(value.length > 0 && !loading && !address);
	return (jsx(InputPanel$1, __assign({ id: id }, { children: jsx(ContainerRow, __assign({ error: error }, { children: jsx(InputContainer, { children: jsxs(AutoColumn, __assign({ gap: "md" }, { children: [jsxs(RowBetween, { children: [jsx(Text, { children: t('Recipient') }, void 0), address && chainId && (jsxs(Link, __assign({ external: true, small: true, href: getBscScanLink(name !== null && name !== void 0 ? name : address, 'address', chainId) }, { children: ["(", t('View on BscScan'), ")"] }), void 0))] }, void 0), jsx(Input$1, { className: "recipient-address-input", type: "text", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", placeholder: t('Wallet Address or ENS name'), error: error, pattern: "^(0x[a-fA-F0-9]{40})$", onChange: handleInput, value: value }, void 0)] }), void 0) }, void 0) }), void 0) }), void 0));
}
var templateObject_1$m, templateObject_2$e, templateObject_3$9, templateObject_4$4;

var Card = styled(Box)(templateObject_1$l || (templateObject_1$l = __makeTemplateObject(["\n  width: ", ";\n  border-radius: 16px;\n  padding: 1.25rem;\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n"], ["\n  width: ", ";\n  border-radius: 16px;\n  padding: 1.25rem;\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n"])), function (_a) {
	var width = _a.width;
	return width !== null && width !== void 0 ? width : '100%';
}, function (_a) {
	var padding = _a.padding;
	return padding;
}, function (_a) {
	var border = _a.border;
	return border;
}, function (_a) {
	var borderRadius = _a.borderRadius;
	return borderRadius;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.background;
});
styled(Card)(templateObject_2$d || (templateObject_2$d = __makeTemplateObject(["\n  border: 1px solid ", ";\n  background-color: ", ";\n"], ["\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundAlt;
});
var LightGreyCard = styled(Card)(templateObject_3$8 || (templateObject_3$8 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  background-color: ", ";\n"], ["\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.background;
});
var GreyCard = styled(Card)(templateObject_4$3 || (templateObject_4$3 = __makeTemplateObject(["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.dropdown;
});
var templateObject_1$l, templateObject_2$d, templateObject_3$8, templateObject_4$3;

BigNumber$1.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
});
var BSC_BLOCK_TIME = 2.5;
// export const BASE_BSC_SCAN_URLS = {
//   [ChainId.MAINNET]: 'https://polygonscan.com',
//   [ChainId.MATIC_TESTNET]: 'https://mumbai.polygonscan.com',
//   [ChainId.TESTNET]: 'https://mumbai.polygonscan.com',
// }
// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
var CAKE_PER_BLOCK = new BigNumber$1(40);
var BLOCKS_PER_YEAR = new BigNumber$1((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
new BigNumber$1((60 / BSC_BLOCK_TIME) * 60 * 24);
CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR);
var BASE_URL = window.location.origin + "/#";
BASE_BSC_SCAN_URLS[ChainId$1.MAINNET];
BIG_TEN.pow(18);
new BigNumber$1(3).div(1000);
new BigNumber$1(1); // 每算力价值多少USD

// Set of helper functions to facilitate wallet setup
/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
var registerToken = function (tokenAddress, tokenSymbol, tokenDecimals) {
	return __awaiter(void 0, void 0, void 0, function () {
		var tokenAdded;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0: return [4 /*yield*/, window.ethereum.request({
					method: 'wallet_watchAsset',
					params: {
						type: 'ERC20',
						options: {
							address: tokenAddress,
							symbol: tokenSymbol,
							decimals: tokenDecimals,
							image: BASE_URL + "/images/tokens/" + tokenAddress + ".png",
						},
					},
				})];
				case 1:
					tokenAdded = _a.sent();
					return [2 /*return*/, tokenAdded];
			}
		});
	});
};

var Wrapper$4 = styled.div(templateObject_1$k || (templateObject_1$k = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var Section = styled(AutoColumn)(templateObject_2$c || (templateObject_2$c = __makeTemplateObject(["\n  padding: 24px;\n"], ["\n  padding: 24px;\n"])));
var ConfirmedIcon = styled(ColumnCenter)(templateObject_3$7 || (templateObject_3$7 = __makeTemplateObject(["\n  padding: 24px 0;\n"], ["\n  padding: 24px 0;\n"])));
function ConfirmationPendingContent(_a) {
	var pendingText = _a.pendingText;
	var t = useTranslation().t;
	return (jsxs(Wrapper$4, { children: [jsx(ConfirmedIcon, { children: jsx(Spinner, {}, void 0) }, void 0), jsxs(AutoColumn, __assign({ gap: "12px", justify: "center" }, { children: [jsx(Text, __assign({ fontSize: "20px" }, { children: t('Waiting For Confirmation') }), void 0), jsx(AutoColumn, __assign({ gap: "12px", justify: "center" }, { children: jsx(Text, __assign({ bold: true, small: true, textAlign: "center" }, { children: pendingText }), void 0) }), void 0), jsx(Text, __assign({ small: true, color: "textSubtle", textAlign: "center" }, { children: t('Confirm this transaction in your wallet') }), void 0)] }), void 0)] }, void 0));
}
function TransactionSubmittedContent(_a) {
	var _b;
	var onDismiss = _a.onDismiss, chainId = _a.chainId, hash = _a.hash, currencyToAdd = _a.currencyToAdd;
	var library = useActiveWeb3React().library;
	var t = useTranslation().t;
	var token = wrappedCurrency(currencyToAdd, chainId);
	return (jsx(Wrapper$4, { children: jsxs(Section, { children: [jsx(ConfirmedIcon, { children: jsx(Icon$M, { strokeWidth: 0.5, width: "90px", color: "primary" }, void 0) }, void 0), jsxs(AutoColumn, __assign({ gap: "12px", justify: "center" }, { children: [jsx(Text, __assign({ fontSize: "20px" }, { children: t('Transaction Submitted') }), void 0), chainId && hash && (jsx(Link, __assign({ external: true, small: true, href: getBscScanLink(hash, 'transaction', chainId) }, { children: t('View on BscScan') }), void 0)), currencyToAdd && ((_b = library === null || library === void 0 ? void 0 : library.provider) === null || _b === void 0 ? void 0 : _b.isMetaMask) && (jsx(Button, __assign({ variant: "tertiary", mt: "12px", width: "fit-content", onClick: function () { return registerToken(token.address, token.symbol, token.decimals); } }, { children: jsxs(RowFixed, { children: [t('Add %asset% to Metamask', { asset: currencyToAdd.symbol }), jsx(Icon$y, { width: "16px", ml: "6px" }, void 0)] }, void 0) }), void 0)), jsx(Button, __assign({ onClick: onDismiss, mt: "20px" }, { children: t('Close') }), void 0)] }), void 0)] }, void 0) }, void 0));
}
function ConfirmationModalContent(_a) {
	var bottomContent = _a.bottomContent, topContent = _a.topContent;
	return (jsxs(Wrapper$4, { children: [jsx(Box, { children: topContent() }, void 0), jsx(Box, { children: bottomContent() }, void 0)] }, void 0));
}
function TransactionErrorContent(_a) {
	var message = _a.message, onDismiss = _a.onDismiss;
	var t = useTranslation().t;
	return (jsxs(Wrapper$4, { children: [jsxs(AutoColumn, __assign({ justify: "center" }, { children: [jsx(Icon$P, { color: "failure", width: "64px" }, void 0), jsx(Text, __assign({ color: "failure", style: { textAlign: 'center', width: '85%' } }, { children: message }), void 0)] }), void 0), jsx(Flex, __assign({ justifyContent: "center", pt: "24px" }, { children: jsx(Button, __assign({ onClick: onDismiss }, { children: t('Dismiss') }), void 0) }), void 0)] }, void 0));
}
var TransactionConfirmationModal = function (_a) {
	var title = _a.title, onDismiss = _a.onDismiss, customOnDismiss = _a.customOnDismiss, attemptingTxn = _a.attemptingTxn, hash = _a.hash, pendingText = _a.pendingText, content = _a.content, currencyToAdd = _a.currencyToAdd;
	var chainId = useActiveWeb3React().chainId;
	var handleDismiss = useCallback(function () {
		if (customOnDismiss) {
			customOnDismiss();
		}
		onDismiss();
	}, [customOnDismiss, onDismiss]);
	if (!chainId)
		return null;
	return (jsx(Modal, __assign({ title: title, headerBackground: "gradients.cardHeader", onDismiss: handleDismiss }, { children: attemptingTxn ? (jsx(ConfirmationPendingContent, { pendingText: pendingText }, void 0)) : hash ? (jsx(TransactionSubmittedContent, { chainId: chainId, hash: hash, onDismiss: onDismiss, currencyToAdd: currencyToAdd }, void 0)) : (content()) }), void 0));
};
var templateObject_1$k, templateObject_2$c, templateObject_3$7;

var Field$2;
(function (Field) {
	Field["INPUT"] = "INPUT";
	Field["OUTPUT"] = "OUTPUT";
})(Field$2 || (Field$2 = {}));
var selectCurrency = createAction('swap/selectCurrency');
var switchCurrencies = createAction('swap/switchCurrencies');
var typeInput$2 = createAction('swap/typeInput');
var replaceSwapState = createAction('swap/replaceSwapState');
var setRecipient = createAction('swap/setRecipient');
var updatePolyDataIndex = createAction('swap/updatePolyDataIndex');
var resetPolyData = createAction('swap/resetPolyDataIndex');

var BASE_FEE = new Percent(JSBI.BigInt(30), JSBI.BigInt(10000));
var ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(10000), JSBI.BigInt(10000));
var INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE);
// computes price breakdown for the trade
function computeTradePriceBreakdown(trade) {
	// for each hop in our trade, take away the x*y=k price impact from 0.3% fees
	// e.g. for 3 tokens/2 hops: 1 - ((1 - .03) * (1-.03))
	var realizedLPFee = !trade
		? undefined
		: ONE_HUNDRED_PERCENT.subtract(trade.route.pairs.reduce(function (currentFee) { return currentFee.multiply(INPUT_FRACTION_AFTER_FEE); }, ONE_HUNDRED_PERCENT));
	// remove lp fees from price impact
	var priceImpactWithoutFeeFraction = trade && realizedLPFee ? trade.priceImpact.subtract(realizedLPFee) : undefined;
	// the x*y=k impact
	var priceImpactWithoutFeePercent = priceImpactWithoutFeeFraction
		? new Percent(priceImpactWithoutFeeFraction === null || priceImpactWithoutFeeFraction === void 0 ? void 0 : priceImpactWithoutFeeFraction.numerator, priceImpactWithoutFeeFraction === null || priceImpactWithoutFeeFraction === void 0 ? void 0 : priceImpactWithoutFeeFraction.denominator)
		: undefined;
	// the amount of the input that accrues to LPs
	var realizedLPFeeAmount = realizedLPFee &&
		trade &&
		(trade.inputAmount instanceof TokenAmount
			? new TokenAmount(trade.inputAmount.token, realizedLPFee.multiply(trade.inputAmount.raw).quotient)
			: CurrencyAmount.ether(realizedLPFee.multiply(trade.inputAmount.raw).quotient));
	return { priceImpactWithoutFee: priceImpactWithoutFeePercent, realizedLPFee: realizedLPFeeAmount };
}
// computes the minimum amount out and maximum amount in for a trade given a user specified allowed slippage in bips
function computeSlippageAdjustedAmounts(trade, allowedSlippage) {
	var _a;
	var pct = basisPointsToPercent(allowedSlippage);
	return _a = {},
		_a[Field$2.INPUT] = trade === null || trade === void 0 ? void 0 : trade.maximumAmountIn(pct),
		_a[Field$2.OUTPUT] = trade === null || trade === void 0 ? void 0 : trade.minimumAmountOut(pct),
		_a;
}
function warningSeverity(priceImpact, UserSlippageTolerance) {
	if (UserSlippageTolerance === void 0) { UserSlippageTolerance = 50; }
	// if (!priceImpact?.lessThan(BLOCKED_PRICE_IMPACT_NON_EXPERT)) return 4
	var ALLOWED_PRICE_IMPACT_USER = new Percent(JSBI.BigInt(UserSlippageTolerance), BIPS_BASE);
	var IMPACT_NON_EXPERT = (BLOCKED_PRICE_IMPACT_NON_EXPERT === null || BLOCKED_PRICE_IMPACT_NON_EXPERT === void 0 ? void 0 : BLOCKED_PRICE_IMPACT_NON_EXPERT.lessThan(ALLOWED_PRICE_IMPACT_USER))
		? ALLOWED_PRICE_IMPACT_USER
		: BLOCKED_PRICE_IMPACT_NON_EXPERT;
	if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(IMPACT_NON_EXPERT)))
		return 4;
	if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(ALLOWED_PRICE_IMPACT_HIGH)))
		return 3;
	if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(ALLOWED_PRICE_IMPACT_MEDIUM)))
		return 2;
	if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(ALLOWED_PRICE_IMPACT_LOW)))
		return 1;
	return 0;
}
function formatExecutionPrice(trade, inverted) {
	if (!trade) {
		return '';
	}
	return inverted
		? trade.executionPrice.invert().toSignificant(6) + " " + trade.inputAmount.currency.symbol + " / " + trade.outputAmount.currency.symbol
		: trade.executionPrice.toSignificant(6) + " " + trade.outputAmount.currency.symbol + " / " + trade.inputAmount.currency.symbol;
}

var QuestionWrapper = styled.div(templateObject_1$j || (templateObject_1$j = __makeTemplateObject(["\n  :hover,\n  :focus {\n    opacity: 0.7;\n  }\n"], ["\n  :hover,\n  :focus {\n    opacity: 0.7;\n  }\n"])));
var QuestionHelper = function (_a) {
	var text = _a.text, _b = _a.color, color = _b === void 0 ? "textSubtle" : _b, _c = _a.placement, placement = _c === void 0 ? 'right-end' : _c, props = __rest(_a, ["text", "color", "placement"]);
	var _d = useTooltip(text, { placement: placement, trigger: 'hover' }), targetRef = _d.targetRef, tooltip = _d.tooltip, tooltipVisible = _d.tooltipVisible;
	return (jsxs(Box, __assign({}, props, { children: [tooltipVisible && tooltip, jsx(QuestionWrapper, __assign({ ref: targetRef }, { children: jsx(Icon$D, { color: color, width: "16px" }, void 0) }), void 0)] }), void 0));
};
var templateObject_1$j;

var Wrapper$3 = styled.div(templateObject_1$i || (templateObject_1$i = __makeTemplateObject(["\n  position: relative;\n  padding: 24px;\n"], ["\n  position: relative;\n  padding: 24px;\n"])));
var ArrowWrapper = styled.div(templateObject_3$6 || (templateObject_3$6 = __makeTemplateObject(["\n  padding: 2px;\n\n  ", "\n"], ["\n  padding: 2px;\n\n  ", "\n"])), function (_a) {
	var clickable = _a.clickable;
	return clickable
		? css(templateObject_2$b || (templateObject_2$b = __makeTemplateObject(["\n          :hover {\n            cursor: pointer;\n            opacity: 0.8;\n          }\n        "], ["\n          :hover {\n            cursor: pointer;\n            opacity: 0.8;\n          }\n        "]))) : null;
});
var ErrorText = styled(Text)(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (_a) {
	var theme = _a.theme, severity = _a.severity;
	return severity === 3 || severity === 4
		? theme.colors.failure
		: severity === 2
			? theme.colors.warning
			: severity === 1
				? theme.colors.text
				: theme.colors.success;
});
var StyledBalanceMaxMini = styled.button(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  height: 22px;\n  width: 22px;\n  background-color: ", ";\n  border: none;\n  border-radius: 50%;\n  padding: 0.2rem;\n  font-size: 0.875rem;\n  font-weight: 400;\n  margin-left: 0.4rem;\n  cursor: pointer;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  float: right;\n\n  :hover {\n    background-color: ", ";\n  }\n  :focus {\n    background-color: ", ";\n    outline: none;\n  }\n"], ["\n  height: 22px;\n  width: 22px;\n  background-color: ", ";\n  border: none;\n  border-radius: 50%;\n  padding: 0.2rem;\n  font-size: 0.875rem;\n  font-weight: 400;\n  margin-left: 0.4rem;\n  cursor: pointer;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  float: right;\n\n  :hover {\n    background-color: ", ";\n  }\n  :focus {\n    background-color: ", ";\n    outline: none;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.background;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.dropdown;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.dropdown;
});
var TruncatedText = styled(Text).attrs({ ellipsis: true })(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 220px;\n"], ["\n  width: 220px;\n"])));
var SwapCallbackErrorInner = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 1rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.825rem;\n  width: 100%;\n  padding: 3rem 1.25rem 1rem 1rem;\n  margin-top: -2rem;\n  color: ", ";\n  z-index: -1;\n  p {\n    padding: 0;\n    margin: 0;\n    font-weight: 500;\n  }\n"], ["\n  background-color: ", ";\n  border-radius: 1rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.825rem;\n  width: 100%;\n  padding: 3rem 1.25rem 1rem 1rem;\n  margin-top: -2rem;\n  color: ", ";\n  z-index: -1;\n  p {\n    padding: 0;\n    margin: 0;\n    font-weight: 500;\n  }\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.failure + "33";
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.failure;
});
var SwapCallbackErrorInnerAlertTriangle = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 12px;\n  border-radius: 12px;\n  min-width: 48px;\n  height: 48px;\n"], ["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 12px;\n  border-radius: 12px;\n  min-width: 48px;\n  height: 48px;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.failure + "33";
});
function SwapCallbackError(_a) {
	var error = _a.error;
	return (jsxs(SwapCallbackErrorInner, { children: [jsx(SwapCallbackErrorInnerAlertTriangle, { children: jsx(Icon$P, { width: "24px" }, void 0) }, void 0), jsx("p", { children: error }, void 0)] }, void 0));
}
var SwapShowAcceptChanges = styled(AutoColumn)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background-color: ", ";\n  padding: 0.5rem;\n  border-radius: 12px;\n  margin-top: 8px;\n"], ["\n  background-color: ", ";\n  padding: 0.5rem;\n  border-radius: 12px;\n  margin-top: 8px;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.warning + "33";
});
var templateObject_1$i, templateObject_2$b, templateObject_3$6, templateObject_4$2, templateObject_5$1, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

/**
 * Formatted version of price impact text with warning colors
 */
function FormattedPriceImpact(_a) {
	var priceImpact = _a.priceImpact;
	return (jsx(ErrorText, __assign({ fontSize: "14px", severity: warningSeverity(priceImpact) }, { children: priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : priceImpact.toFixed(2) + "%") : '-' }), void 0));
}

/**
 * Formatted version of price impact text with warning colors
 */
function LiquidityProviderFee() {
	var t = useTranslation().t;
	return (jsxs(Flex, { children: [jsx(Text, __assign({ fontSize: "14px", color: "text" }, { children: t('Liquidity Provider Fee') }), void 0), jsx(QuestionHelper, { text: jsxs(Fragment, { children: [jsxs(Text, __assign({ mb: "12px" }, { children: [t('for each trade a 0.3% fee is paid'), ":"] }), void 0), jsxs(Text, { children: ["-", t('0.1% to the LP token holders')] }, void 0), jsxs(Text, { children: ["-", t('0.04% to the Magic crystal stakers')] }, void 0), jsxs(Text, { children: ["-", t('0.05% buyback MBT and burn')] }, void 0), jsxs(Text, { children: ["-", t('0.025% buyback MBT, then to MBT LP')] }, void 0), jsxs(Text, { children: ["-", t('0.025% to vMBT holder')] }, void 0), jsxs(Text, { children: ["-", t('0.06% to operation fund')] }, void 0)] }, void 0), placement: "top-start", ml: "4px" }, void 0)] }, void 0));
}

var SwapModalFooterContainer = styled(AutoColumn)(templateObject_1$h || (templateObject_1$h = __makeTemplateObject(["\n  margin-top: 24px;\n  padding: 16px;\n  border-radius: ", ";\n  border: 1px solid ", ";\n  background-color: ", ";\n"], ["\n  margin-top: 24px;\n  padding: 16px;\n  border-radius: ", ";\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.radii.default;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.cardBorder;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.background;
});
function SwapModalFooter(_a) {
	var _b, _c, _d, _e;
	var trade = _a.trade, onConfirm = _a.onConfirm, allowedSlippage = _a.allowedSlippage, swapErrorMessage = _a.swapErrorMessage, disabledConfirm = _a.disabledConfirm;
	var t = useTranslation().t;
	var _f = __read(useState(false), 2), showInverted = _f[0], setShowInverted = _f[1];
	var slippageAdjustedAmounts = useMemo(function () { return computeSlippageAdjustedAmounts(trade, allowedSlippage); }, [allowedSlippage, trade]);
	var _g = useMemo(function () { return computeTradePriceBreakdown(trade); }, [trade]), priceImpactWithoutFee = _g.priceImpactWithoutFee, realizedLPFee = _g.realizedLPFee;
	var severity = warningSeverity(priceImpactWithoutFee);
	return (jsxs(Fragment, {
		children: [jsxs(SwapModalFooterContainer, {
			children: [jsxs(RowBetween, __assign({ align: "center" }, {
				children: [jsx(Text, __assign({ fontSize: "14px" }, { children: t("Price") }), void 0), jsxs(Text, __assign({
					fontSize: "14px", style: {
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						textAlign: 'right',
						paddingLeft: '10px',
					}
				}, { children: [formatExecutionPrice(trade, showInverted), jsx(StyledBalanceMaxMini, __assign({ onClick: function () { return setShowInverted(!showInverted); } }, { children: jsx(Icon$L, { width: "14px" }, void 0) }), void 0)] }), void 0)]
			}), void 0), jsxs(RowBetween, {
				children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ fontSize: "14px" }, { children: trade.tradeType === TradeType.EXACT_INPUT ? t("Minimum received") : t("Maximum sold") }), void 0), jsx(QuestionHelper, { text: t("Your transaction will revert if there is a large, unfavorable price movement before it is confirmed."), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsxs(RowFixed, {
					children: [jsx(Text, __assign({ fontSize: "14px" }, {
						children: trade.tradeType === TradeType.EXACT_INPUT
							? (_c = (_b = slippageAdjustedAmounts[Field$2.OUTPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(4)) !== null && _c !== void 0 ? _c : '-'
							: (_e = (_d = slippageAdjustedAmounts[Field$2.INPUT]) === null || _d === void 0 ? void 0 : _d.toSignificant(4)) !== null && _e !== void 0 ? _e : '-'
					}), void 0), jsx(Text, __assign({ fontSize: "14px", marginLeft: "4px" }, {
						children: trade.tradeType === TradeType.EXACT_INPUT
							? trade.outputAmount.currency.symbol
							: trade.inputAmount.currency.symbol
					}), void 0)]
				}, void 0)]
			}, void 0), jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ fontSize: "14px" }, { children: t("Price Impact") }), void 0), jsx(QuestionHelper, { placement: "top-start", text: t("The difference between the market price and your price due to trade size."), ml: "4px" }, void 0)] }, void 0), jsx(FormattedPriceImpact, { priceImpact: priceImpactWithoutFee }, void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(LiquidityProviderFee, {}, void 0), jsx(Text, __assign({ fontSize: "14px" }, { children: realizedLPFee ? (realizedLPFee === null || realizedLPFee === void 0 ? void 0 : realizedLPFee.toSignificant(6)) + " " + trade.inputAmount.currency.symbol : '-' }), void 0)] }, void 0)]
		}, void 0), jsxs(AutoRow, { children: [jsx(Button, __assign({ variant: severity > 2 ? 'danger' : 'primary', onClick: onConfirm, disabled: disabledConfirm, mt: "12px", id: "confirm-swap-or-send", width: "100%" }, { children: severity > 2 ? t('Swap Anyway') : t('Confirm Swap') }), void 0), swapErrorMessage ? jsx(SwapCallbackError, { error: swapErrorMessage }, void 0) : null] }, void 0)]
	}, void 0));
}
var templateObject_1$h;

function SwapModalHeader(_a) {
	var _b, _c;
	var trade = _a.trade, allowedSlippage = _a.allowedSlippage, recipient = _a.recipient, showAcceptChanges = _a.showAcceptChanges, onAcceptChanges = _a.onAcceptChanges;
	var t = useTranslation().t;
	var slippageAdjustedAmounts = useMemo(function () { return computeSlippageAdjustedAmounts(trade, allowedSlippage); }, [trade, allowedSlippage]);
	var priceImpactWithoutFee = useMemo(function () { return computeTradePriceBreakdown(trade); }, [trade]).priceImpactWithoutFee;
	var priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
	return (jsxs(AutoColumn, __assign({ gap: "md" }, {
		children: [jsxs(RowBetween, __assign({ align: "flex-end" }, { children: [jsxs(RowFixed, __assign({ gap: "0px" }, { children: [jsx(CurrencyLogo, { currency: trade.inputAmount.currency, size: "24px", style: { marginRight: '12px' } }, void 0), jsx(TruncatedText, __assign({ fontSize: "24px", color: showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? 'primary' : 'text' }, { children: trade.inputAmount.toSignificant(6) }), void 0)] }), void 0), jsx(RowFixed, __assign({ gap: "0px" }, { children: jsx(Text, __assign({ fontSize: "24px", ml: "10px" }, { children: trade.inputAmount.currency.symbol }), void 0) }), void 0)] }), void 0), jsx(RowFixed, { children: jsx(Icon$N, { width: "16px", ml: "4px" }, void 0) }, void 0), jsxs(RowBetween, __assign({ align: "flex-end" }, {
			children: [jsxs(RowFixed, __assign({ gap: "0px" }, {
				children: [jsx(CurrencyLogo, { currency: trade.outputAmount.currency, size: "24px", style: { marginRight: '12px' } }, void 0), jsx(TruncatedText, __assign({
					fontSize: "24px", color: priceImpactSeverity > 2
						? 'failure'
						: showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
							? 'primary'
							: 'text'
				}, { children: trade.outputAmount.toSignificant(6) }), void 0)]
			}), void 0), jsx(RowFixed, __assign({ gap: "0px" }, { children: jsx(Text, __assign({ fontSize: "24px", ml: "10px" }, { children: trade.outputAmount.currency.symbol }), void 0) }), void 0)]
		}), void 0), showAcceptChanges ? (jsx(SwapShowAcceptChanges, __assign({ justify: "flex-start", gap: "0px" }, { children: jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(Icon$P, { mr: "8px" }, void 0), jsxs(Text, __assign({ bold: true }, { children: [" ", t('Price Updated')] }), void 0)] }, void 0), jsx(Button, __assign({ onClick: onAcceptChanges }, { children: t('Accept') }), void 0)] }, void 0) }), void 0)) : null, jsx(AutoColumn, __assign({ justify: "flex-start", gap: "sm", style: { padding: '24px 0 0 0px' } }, { children: trade.tradeType === TradeType.EXACT_INPUT ? (jsxs(Text, __assign({ small: true, color: "textSubtle", textAlign: "left", style: { width: '100%' } }, { children: [t('Output is estimated. You will receive at least'), "\u00A0", jsxs("b", { children: [(_b = slippageAdjustedAmounts[Field$2.OUTPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(6), " ", trade.outputAmount.currency.symbol] }, void 0), "\u00A0", t('or the transaction will revert.')] }), void 0)) : (jsxs(Text, __assign({ small: true, color: "textSubtle", textAlign: "left", style: { width: '100%' } }, { children: [t('Input is estimated. You will sell at most'), "\u00A0", jsxs("b", { children: [(_c = slippageAdjustedAmounts[Field$2.INPUT]) === null || _c === void 0 ? void 0 : _c.toSignificant(6), " ", trade.inputAmount.currency.symbol] }, void 0), "\u00A0", t('or the transaction will revert.')] }), void 0)) }), void 0), recipient !== null ? (jsx(AutoColumn, __assign({ justify: "flex-start", gap: "sm", style: { padding: '12px 0 0 0px' } }, { children: jsxs(Text, __assign({ color: "textSubtle" }, { children: [t('Output will be sent to'), ' ', jsx("b", __assign({ title: recipient }, { children: isAddress(recipient) ? shortenAddress(recipient) : recipient }), void 0)] }), void 0) }), void 0)) : null]
	}), void 0));
}

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA, tradeB) {
	return (tradeA.tradeType !== tradeB.tradeType ||
		!currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
		!tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
		!currencyEquals(tradeA.outputAmount.currency, tradeB.outputAmount.currency) ||
		!tradeA.outputAmount.equalTo(tradeB.outputAmount));
}
var ConfirmSwapModal = function (_a) {
	var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
	var trade = _a.trade, originalTrade = _a.originalTrade, onAcceptChanges = _a.onAcceptChanges, allowedSlippage = _a.allowedSlippage, onConfirm = _a.onConfirm, onDismiss = _a.onDismiss, customOnDismiss = _a.customOnDismiss, recipient = _a.recipient, swapErrorMessage = _a.swapErrorMessage, attemptingTxn = _a.attemptingTxn, txHash = _a.txHash;
	var showAcceptChanges = useMemo(function () { return Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)); }, [originalTrade, trade]);
	var t = useTranslation().t;
	var modalHeader = useCallback(function () {
		return trade ? (jsx(SwapModalHeader, { trade: trade, allowedSlippage: allowedSlippage, recipient: recipient, showAcceptChanges: showAcceptChanges, onAcceptChanges: onAcceptChanges }, void 0)) : null;
	}, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade]);
	var modalBottom = useCallback(function () {
		return trade ? (jsx(SwapModalFooter, { onConfirm: onConfirm, trade: trade, disabledConfirm: showAcceptChanges, swapErrorMessage: swapErrorMessage, allowedSlippage: allowedSlippage }, void 0)) : null;
	}, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade]);
	// text to show while loading
	var pendingText = t('Swapping %amountA% %symbolA% for %amountB% %symbolB%', {
		amountA: (_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.toSignificant(6)) !== null && _c !== void 0 ? _c : '',
		symbolA: (_f = (_e = (_d = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _d === void 0 ? void 0 : _d.currency) === null || _e === void 0 ? void 0 : _e.symbol) !== null && _f !== void 0 ? _f : '',
		amountB: (_h = (_g = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _g === void 0 ? void 0 : _g.toSignificant(6)) !== null && _h !== void 0 ? _h : '',
		symbolB: (_l = (_k = (_j = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _j === void 0 ? void 0 : _j.currency) === null || _k === void 0 ? void 0 : _k.symbol) !== null && _l !== void 0 ? _l : '',
	});
	var confirmationContent = useCallback(function () {
		return swapErrorMessage ? (jsx(TransactionErrorContent, { onDismiss: onDismiss, message: swapErrorMessage }, void 0)) : (jsx(ConfirmationModalContent, { topContent: modalHeader, bottomContent: modalBottom }, void 0));
	}, [onDismiss, modalBottom, modalHeader, swapErrorMessage]);
	return (jsx(TransactionConfirmationModal, { title: t('Confirm Swap'), onDismiss: onDismiss, customOnDismiss: customOnDismiss, attemptingTxn: attemptingTxn, hash: txHash, content: confirmationContent, pendingText: pendingText, currencyToAdd: trade === null || trade === void 0 ? void 0 : trade.outputAmount.currency }, void 0));
};

/**
 * Returns a map of the given addresses to their eventually consistent BNB balances.
 */
function useBNBBalances(uncheckedAddresses) {
	var multicallContract = useMulticallContract();
	var addresses = useMemo(function () {
		return uncheckedAddresses
			? uncheckedAddresses
				.map(isAddress)
				.filter(function (a) { return a !== false; })
				.sort()
			: [];
	}, [uncheckedAddresses]);
	var results = useSingleContractMultipleData(multicallContract, 'getEthBalance', addresses.map(function (address) { return [address]; }));
	return useMemo(function () {
		return addresses.reduce(function (memo, address, i) {
			var _a, _b;
			var value = (_b = (_a = results === null || results === void 0 ? void 0 : results[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
			if (value)
				memo[address] = CurrencyAmount.ether(JSBI.BigInt(value.toString()));
			return memo;
		}, {});
	}, [addresses, results]);
}
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
function useTokenBalancesWithLoadingIndicator(address, tokens) {
	var validatedTokens = useMemo(function () { var _a; return (_a = tokens === null || tokens === void 0 ? void 0 : tokens.filter(function (t) { return isAddress(t === null || t === void 0 ? void 0 : t.address) !== false; })) !== null && _a !== void 0 ? _a : []; }, [tokens]);
	var validatedTokenAddresses = useMemo(function () { return validatedTokens.map(function (vt) { return vt.address; }); }, [validatedTokens]);
	var balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address]);
	var anyLoading = useMemo(function () { return balances.some(function (callState) { return callState.loading; }); }, [balances]);
	return [
		useMemo(function () {
			return address && validatedTokens.length > 0
				? validatedTokens.reduce(function (memo, token, i) {
					var _a, _b;
					var value = (_b = (_a = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
					var amount = value ? JSBI.BigInt(value.toString()) : undefined;
					if (amount) {
						memo[token.address] = new TokenAmount(token, amount);
					}
					return memo;
				}, {})
				: {};
		}, [address, validatedTokens, balances]),
		anyLoading,
	];
}
function useTokenBalances(address, tokens) {
	return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}
function useCurrencyBalances(account, currencies) {
	var tokens = useMemo(function () { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.filter(function (currency) { return currency instanceof Token$1; })) !== null && _a !== void 0 ? _a : []; }, [currencies]);
	var tokenBalances = useTokenBalances(account, tokens);
	var containsBNB = useMemo(function () { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.some(function (currency) { return currency === ETHER; })) !== null && _a !== void 0 ? _a : false; }, [currencies]);
	var ethBalance = useBNBBalances(containsBNB ? [account] : []);
	return useMemo(function () {
		var _a;
		return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.map(function (currency) {
			if (!account || !currency)
				return undefined;
			if (currency instanceof Token$1)
				return tokenBalances[currency.address];
			if (currency === ETHER)
				return ethBalance[account];
			return undefined;
		})) !== null && _a !== void 0 ? _a : [];
	}, [account, currencies, ethBalance, tokenBalances]);
}
function useCurrencyBalance(account, currency) {
	return useCurrencyBalances(account, [currency])[0];
}
// mimics useAllBalances
function useAllTokenBalances() {
	var account = useWeb3React().account;
	var allTokens = useAllTokens();
	var allTokensArray = useMemo(function () { return Object.values(allTokens !== null && allTokens !== void 0 ? allTokens : {}); }, [allTokens]);
	var balances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, allTokensArray);
	return balances !== null && balances !== void 0 ? balances : {};
}

/**
 * Returns the previous value of the given value
 *
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
var usePreviousValue = function (value) {
	var ref = useRef();
	useEffect(function () {
		ref.current = value;
	}, [value]);
	return ref.current;
};

var ErrorBoundary = /** @class */ (function (_super) {
	__extends(ErrorBoundary, _super);
	function ErrorBoundary(props) {
		var _this = _super.call(this, props) || this;
		_this.state = { hasError: false };
		return _this;
	}
	ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			hasError: true,
		});
		// You can also log error messages to an error reporting service here
	};
	ErrorBoundary.prototype.render = function () {
		var children = this.props.children;
		var hasError = this.state.hasError;
		if (hasError)
			return (children === null || children === void 0 ? void 0 : children[0]) || null;
		// Normally, just render children
		return jsx(Fragment, { children: children }, void 0);
	};
	return ErrorBoundary;
}(React.Component));
var FlexAutoWarpper = function (_a) {
	var children = _a.children, _b = _a.lineMax, lineMax = _b === void 0 ? 6 : _b, _c = _a.flatNum, flatNum = _c === void 0 ? 3 : _c;
	var _d = __read(useState(0), 2), childrenLength = _d[0], setChildrenLength = _d[1];
	var _e = __read(useState(null), 2), autoDom = _e[0], setAutoDom = _e[1];
	/**
	 *
	 * @dev 弥补flex布局缺陷
	 * flex 换行是会 依据@justifyContent 进行布局
	 * 我希望它换的时候从左向右一次对齐第一排排列
	 * 所有就出现了这个组件
	 * 初步测试成功，暂时没遇到太大问题 能满足需求
	 */
	useEffect(function () {
		var _a, _b;
		try {
			if (!children || !children.length)
				return;
			if (childrenLength === ((_a = children) === null || _a === void 0 ? void 0 : _a.length))
				return;
			if (childrenLength !== children.length) {
				setChildrenLength(children.length);
			}
			var realChildren = (_b = children) === null || _b === void 0 ? void 0 : _b.flat(flatNum);
			var len = realChildren.length;
			var sliceLen = Math.min(lineMax, realChildren.length - 1);
			var InvisibleDoms = realChildren === null || realChildren === void 0 ? void 0 : realChildren.slice(len - sliceLen, len).map(function (item) {
				var _a;
				if (!item)
					return item;
				return __assign(__assign({}, item), { props: __assign(__assign({}, item === null || item === void 0 ? void 0 : item.props), { style: __assign(__assign({}, (_a = item === null || item === void 0 ? void 0 : item.props) === null || _a === void 0 ? void 0 : _a.style), { visibility: 'hidden', height: 0, minHight: 0, maxHeight: 0, marginTop: 0, marginBottom: 0, paddingBottom: 0, paddingTop: 0 }) }) });
			});
			setAutoDom(InvisibleDoms);
		}
		catch (error) {
			setAutoDom(null);
		}
	}, [children, childrenLength, lineMax, flatNum, setAutoDom]);
	return (jsx(Fragment, { children: jsxs(ErrorBoundary, { children: [children, autoDom] }, void 0) }, void 0));
};

var BaseWrapper = styled.div(templateObject_1$g || (templateObject_1$g = __makeTemplateObject(["\n  border: 1px solid ", ";\n  border-radius: 10px;\n  display: flex;\n  padding: 6px;\n  margin-bottom: 4px !important;\n\n  align-items: center;\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n\n  background-color: ", ";\n  opacity: ", ";\n"], ["\n  border: 1px solid ", ";\n  border-radius: 10px;\n  display: flex;\n  padding: 6px;\n  margin-bottom: 4px !important;\n\n  align-items: center;\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n\n  background-color: ", ";\n  opacity: ", ";\n"])), function (_a) {
	var theme = _a.theme, disable = _a.disable;
	return (disable ? 'transparent' : theme.colors.dropdown);
}, function (_a) {
	var disable = _a.disable;
	return !disable && 'pointer';
}, function (_a) {
	var theme = _a.theme, disable = _a.disable;
	return !disable && theme.colors.background;
}, function (_a) {
	var theme = _a.theme, disable = _a.disable;
	return disable && theme.colors.dropdown;
}, function (_a) {
	var disable = _a.disable;
	return disable && '0.4';
});
function CommonBases(_a) {
	var chainId = _a.chainId, onSelect = _a.onSelect, selectedCurrency = _a.selectedCurrency;
	var t = useTranslation().t;
	return (jsxs(AutoColumn, __assign({ gap: "md" }, {
		children: [jsxs(AutoRow, { children: [jsx(Text, __assign({ fontSize: "14px" }, { children: t('Common bases') }), void 0), jsx(QuestionHelper, { placement: "top-start", text: t('These tokens are commonly paired with other tokens.'), ml: "4px" }, void 0)] }, void 0), jsx(AutoRow, __assign({ gap: "auto" }, {
			children: jsxs(FlexAutoWarpper, __assign({ lineMax: 4 }, {
				children: [jsxs(BaseWrapper, __assign({
					onClick: function () {
						if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
							onSelect(ETHER);
						}
					}, disable: selectedCurrency === ETHER
				}, { children: [jsx(CurrencyLogo, { symbol: ETHER.symbol, style: { marginRight: 8 } }, void 0), jsx(Text, { children: ETHER === null || ETHER === void 0 ? void 0 : ETHER.symbol }, void 0)] }), void 0), (chainId ? (SUGGESTED_BASES[chainId] || []) : []).map(function (token) {
					var selected = selectedCurrency instanceof Token$1 && selectedCurrency.address === token.address;
					return (jsxs(BaseWrapper, __assign({ onClick: function () { return !selected && onSelect(token); }, disable: selected }, { children: [jsx(CurrencyLogo, { currency: token, style: { marginRight: 8 } }, void 0), jsx(Text, { children: token.symbol }, void 0)] }), token.address));
				})]
			}), void 0)
		}), void 0)]
	}), void 0));
}
var templateObject_1$g;

var rotate = keyframes(templateObject_1$f || (templateObject_1$f = __makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var StyledSVG = styled.svg(templateObject_2$a || (templateObject_2$a = __makeTemplateObject(["\n  animation: 2s ", " linear infinite;\n  height: ", ";\n  width: ", ";\n  path {\n    stroke: ", ";\n  }\n"], ["\n  animation: 2s ", " linear infinite;\n  height: ", ";\n  width: ", ";\n  path {\n    stroke: ", ";\n  }\n"
	/**
	 * Takes in custom size and stroke for circle color, default to primary color as fill,
	 * need ...rest for layered styles on top
	 */
])), rotate, function (_a) {
	var size = _a.size;
	return size;
}, function (_a) {
	var size = _a.size;
	return size;
}, function (_a) {
	var stroke = _a.stroke, theme = _a.theme;
	return stroke !== null && stroke !== void 0 ? stroke : theme.colors.primary;
});
/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
function CircleLoader(_a) {
	var _b = _a.size, size = _b === void 0 ? '16px' : _b, stroke = _a.stroke, rest = __rest(_a, ["size", "stroke"]);
	return (jsx(StyledSVG, __assign({ viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", size: size, stroke: stroke }, rest, { children: jsx("path", { d: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0) }), void 0));
}
var templateObject_1$f, templateObject_2$a;

var TokenSection = styled.div(templateObject_1$e || (templateObject_1$e = __makeTemplateObject(["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) auto;\n  grid-gap: 16px;\n  align-items: center;\n\n  opacity: ", ";\n"], ["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) auto;\n  grid-gap: 16px;\n  align-items: center;\n\n  opacity: ", ";\n"])), function (_a) {
	var dim = _a.dim;
	return (dim ? '0.4' : '1');
});
var CheckIcon = styled(Icon$Q)(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject(["\n  height: 16px;\n  width: 16px;\n  margin-right: 6px;\n  stroke: ", ";\n"], ["\n  height: 16px;\n  width: 16px;\n  margin-right: 6px;\n  stroke: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.success;
});
var NameOverflow = styled.div(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject(["\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 140px;\n  font-size: 12px;\n"], ["\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 140px;\n  font-size: 12px;\n"])));
function ImportRow(_a) {
	var _b, _c;
	var token = _a.token, style = _a.style, dim = _a.dim, showImportView = _a.showImportView, setImportToken = _a.setImportToken;
	// gloabls
	var chainId = useActiveWeb3React().chainId;
	var t = useTranslation().t;
	// check if token comes from list
	var inactiveTokenList = useCombinedInactiveList();
	var list = chainId && ((_c = (_b = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _b === void 0 ? void 0 : _b[token.address]) === null || _c === void 0 ? void 0 : _c.list);
	// check if already active on list or local storage tokens
	var isAdded = useIsUserAddedToken(token);
	var isActive = useIsTokenActive(token);
	return (jsxs(TokenSection, __assign({ style: style }, {
		children: [jsx(CurrencyLogo, { currency: token, size: "24px", style: { opacity: dim ? '0.6' : '1' } }, void 0), jsxs(AutoColumn, __assign({ gap: "4px", style: { opacity: dim ? '0.6' : '1' } }, { children: [jsxs(AutoRow, { children: [jsx(Text, { children: token.symbol }, void 0), jsx(Text, __assign({ color: "textDisabled", ml: "8px" }, { children: jsx(NameOverflow, __assign({ title: token.name }, { children: token.name }), void 0) }), void 0)] }, void 0), list && list.logoURI && (jsxs(RowFixed, { children: [jsxs(Text, __assign({ small: true, mr: "4px", color: "textSubtle" }, { children: [t('via'), " ", list.name] }), void 0), jsx(ListLogo, { logoURI: list.logoURI, size: "12px" }, void 0)] }, void 0))] }), void 0), !isActive && !isAdded ? (jsx(Button, __assign({
			width: "fit-content", onClick: function () {
				if (setImportToken) {
					setImportToken(token);
				}
				showImportView();
			}
		}, { children: t('Import') }), void 0)) : (jsxs(RowFixed, __assign({ style: { minWidth: 'fit-content' } }, { children: [jsx(CheckIcon, {}, void 0), jsx(Text, __assign({ color: "success" }, { children: "Active" }), void 0)] }), void 0))]
	}), void 0));
}
var templateObject_1$e, templateObject_2$9, templateObject_3$5;

function currencyKey(currency) {
	return currency instanceof Token$1 ? currency.address : currency === ETHER ? 'ETHER' : '';
}
var StyledBalanceText = styled(Text)(templateObject_1$d || (templateObject_1$d = __makeTemplateObject(["\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 5rem;\n  text-overflow: ellipsis;\n"], ["\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 5rem;\n  text-overflow: ellipsis;\n"])));
var FixedContentRow = styled.div(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject(["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-gap: 16px;\n  align-items: center;\n"], ["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-gap: 16px;\n  align-items: center;\n"])));
function Balance(_a) {
	var balance = _a.balance;
	return jsx(StyledBalanceText, __assign({ title: balance.toExact() }, { children: balance.toSignificant(4) }), void 0);
}
var MenuItem = styled(RowBetween)(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);\n  grid-gap: 8px;\n  cursor: ", ";\n  pointer-events: ", ";\n  :hover {\n    background-color: ", ";\n  }\n  opacity: ", ";\n"], ["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);\n  grid-gap: 8px;\n  cursor: ", ";\n  pointer-events: ", ";\n  :hover {\n    background-color: ", ";\n  }\n  opacity: ", ";\n"])), function (_a) {
	var disabled = _a.disabled;
	return !disabled && 'pointer';
}, function (_a) {
	var disabled = _a.disabled;
	return disabled && 'none';
}, function (_a) {
	var theme = _a.theme, disabled = _a.disabled;
	return !disabled && theme.colors.background;
}, function (_a) {
	var disabled = _a.disabled, selected = _a.selected;
	return (disabled || selected ? 0.5 : 1);
});
function CurrencyRow(_a) {
	var currency = _a.currency, onSelect = _a.onSelect, isSelected = _a.isSelected, otherSelected = _a.otherSelected, style = _a.style;
	var account = useActiveWeb3React().account;
	var key = currencyKey(currency);
	var selectedTokenList = useCombinedActiveList();
	var isOnSelectedList = isTokenOnList(selectedTokenList, currency);
	var customAdded = useIsUserAddedToken(currency);
	var balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency);
	// only show add or remove buttons if not on selected list
	return (jsxs(MenuItem, __assign({ style: style, className: "token-item-" + key, onClick: function () { return (isSelected ? null : onSelect()); }, disabled: isSelected, selected: otherSelected }, { children: [jsx(CurrencyLogo, { currency: currency, size: "24px" }, void 0), jsxs(Column, { children: [jsx(Text, __assign({ bold: true }, { children: currency.symbol }), void 0), jsxs(Text, __assign({ color: "textSubtle", small: true, ellipsis: true, maxWidth: "200px" }, { children: [!isOnSelectedList && customAdded && 'Added by user •', " ", currency.name] }), void 0)] }, void 0), jsx(RowFixed, __assign({ style: { justifySelf: 'flex-end' } }, { children: balance ? jsx(Balance, { balance: balance }, void 0) : account ? jsx(CircleLoader, {}, void 0) : null }), void 0)] }), void 0));
}
function CurrencyList(_a) {
	var height = _a.height, currencies = _a.currencies, selectedCurrency = _a.selectedCurrency, onCurrencySelect = _a.onCurrencySelect, otherCurrency = _a.otherCurrency, fixedListRef = _a.fixedListRef, showETH = _a.showETH, showImportView = _a.showImportView, setImportToken = _a.setImportToken, breakIndex = _a.breakIndex;
	var itemData = useMemo(function () {
		var formatted = showETH ? __spreadArray([ETHER], __read(currencies)) : currencies;
		if (breakIndex !== undefined) {
			formatted = __spreadArray(__spreadArray(__spreadArray([], __read(formatted.slice(0, breakIndex))), [undefined]), __read(formatted.slice(breakIndex, formatted.length)));
		}
		return formatted;
	}, [breakIndex, currencies, showETH]);
	var chainId = useActiveWeb3React().chainId;
	var t = useTranslation().t;
	var inactiveTokens = useAllInactiveTokens();
	var Row = useCallback(function (_a) {
		var data = _a.data, index = _a.index, style = _a.style;
		var currency = data[index];
		var isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency));
		var otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency));
		var handleSelect = function () { return onCurrencySelect(currency); };
		var token = wrappedCurrency(currency, chainId);
		var showImport = inactiveTokens && token && Object.keys(inactiveTokens).includes(token.address);
		if (index === breakIndex || !data) {
			return (jsx(FixedContentRow, __assign({ style: style }, { children: jsx(LightGreyCard, __assign({ padding: "8px 12px", borderRadius: "8px" }, { children: jsxs(RowBetween, { children: [jsx(Text, __assign({ small: true }, { children: t('Expanded results from inactive Token Lists') }), void 0), jsx(QuestionHelper, { text: t("Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists."), placement: "top-start", ml: "4px" }, void 0)] }, void 0) }), void 0) }), void 0));
		}
		if (showImport && token) {
			return (jsx(ImportRow, { style: style, token: token, showImportView: showImportView, setImportToken: setImportToken, dim: true }, void 0));
		}
		return (jsx(CurrencyRow, { style: style, currency: currency, isSelected: isSelected, onSelect: handleSelect, otherSelected: otherSelected }, void 0));
	}, [
		chainId,
		inactiveTokens,
		onCurrencySelect,
		otherCurrency,
		selectedCurrency,
		setImportToken,
		showImportView,
		breakIndex,
		t,
	]);
	var itemKey = useCallback(function (index, data) { return currencyKey(data[index]); }, []);
	return (jsx(FixedSizeList, __assign({ height: height, ref: fixedListRef, width: "100%", itemData: itemData, itemCount: itemData.length, itemSize: 56, itemKey: itemKey }, { children: Row }), void 0));
}
var templateObject_1$d, templateObject_2$8, templateObject_3$4;

// compare two token amounts with highest one coming first
function balanceComparator(balanceA, balanceB) {
	if (balanceA && balanceB) {
		return balanceA.greaterThan(balanceB) ? -1 : balanceA.equalTo(balanceB) ? 0 : 1;
	}
	if (balanceA && balanceA.greaterThan('0')) {
		return -1;
	}
	if (balanceB && balanceB.greaterThan('0')) {
		return 1;
	}
	return 0;
}
function getTokenComparator(balances) {
	return function sortTokens(tokenA, tokenB) {
		// -1 = a is first
		// 1 = b is first
		// sort by balances
		var balanceA = balances[tokenA.address];
		var balanceB = balances[tokenB.address];
		var balanceComp = balanceComparator(balanceA, balanceB);
		if (balanceComp !== 0)
			return balanceComp;
		if (tokenA.symbol && tokenB.symbol) {
			// sort by symbol
			return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1;
		}
		return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0;
	};
}
function useTokenComparator(inverted) {
	var balances = useAllTokenBalances();
	var comparator = useMemo(function () { return getTokenComparator(balances !== null && balances !== void 0 ? balances : {}); }, [balances]);
	return useMemo(function () {
		if (inverted) {
			return function (tokenA, tokenB) { return comparator(tokenA, tokenB) * -1; };
		}
		return comparator;
	}, [inverted, comparator]);
}

var swapSound = new Audio('swap.mp3');
function CurrencySearch(_a) {
	var selectedCurrency = _a.selectedCurrency, onCurrencySelect = _a.onCurrencySelect, otherSelectedCurrency = _a.otherSelectedCurrency, showCommonBases = _a.showCommonBases, showImportView = _a.showImportView, setImportToken = _a.setImportToken;
	var t = useTranslation().t;
	var chainId = useActiveWeb3React().chainId;
	// refs for fixed size lists
	var fixedList = useRef();
	var _b = __read(useState(''), 2), searchQuery = _b[0], setSearchQuery = _b[1];
	var debouncedQuery = useDebounce(searchQuery, 200);
	var _c = __read(useState(false), 1), invertSearchOrder = _c[0];
	var allTokens = useAllTokens();
	// if they input an address, use it
	var searchToken = useToken(debouncedQuery);
	var searchTokenIsAdded = useIsUserAddedToken(searchToken);
	var _d = __read(useAudioModeManager(), 1), audioPlay = _d[0];
	var showETH = useMemo(function () {
		var s = debouncedQuery.toLowerCase().trim();
		return s === '' || s === 'b' || s === 'bn' || s === 'bnb';
	}, [debouncedQuery]);
	var tokenComparator = useTokenComparator(invertSearchOrder);
	var filteredTokens = useMemo(function () {
		return filterTokens(Object.values(allTokens), debouncedQuery);
	}, [allTokens, debouncedQuery]);
	var sortedTokens = useMemo(function () {
		return filteredTokens.sort(tokenComparator);
	}, [filteredTokens, tokenComparator]);
	var filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery);
	var handleCurrencySelect = useCallback(function (currency) {
		onCurrencySelect(currency);
		if (audioPlay) {
			swapSound.play();
		}
	}, [audioPlay, onCurrencySelect]);
	// manage focus on modal show
	var inputRef = useRef();
	useEffect(function () {
		inputRef.current.focus();
	}, []);
	var handleInput = useCallback(function (event) {
		var _a;
		var input = event.target.value;
		var checksummedInput = isAddress(input);
		setSearchQuery(checksummedInput || input);
		(_a = fixedList.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0);
	}, []);
	var handleEnter = useCallback(function (e) {
		var _a;
		if (e.key === 'Enter') {
			var s = debouncedQuery.toLowerCase().trim();
			if (s === 'bnb') {
				handleCurrencySelect(ETHER);
			}
			else if (filteredSortedTokens.length > 0) {
				if (((_a = filteredSortedTokens[0].symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === debouncedQuery.trim().toLowerCase() ||
					filteredSortedTokens.length === 1) {
					handleCurrencySelect(filteredSortedTokens[0]);
				}
			}
		}
	}, [filteredSortedTokens, handleCurrencySelect, debouncedQuery]);
	// if no results on main list, show option to expand into inactive
	var inactiveTokens = useFoundOnInactiveList(debouncedQuery);
	var filteredInactiveTokens = useSortedTokensByQuery(inactiveTokens, debouncedQuery);
	return (jsx(Fragment, { children: jsxs("div", { children: [jsxs(AutoColumn, __assign({ gap: "16px" }, { children: [jsx(Row, { children: jsx(Input$4, { id: "token-search-input", placeholder: t('Search name or paste address'), scale: "lg", autoComplete: "off", value: searchQuery, ref: inputRef, onChange: handleInput, onKeyDown: handleEnter }, void 0) }, void 0), showCommonBases && (jsx(CommonBases, { chainId: chainId, onSelect: handleCurrencySelect, selectedCurrency: selectedCurrency }, void 0))] }), void 0), searchToken && !searchTokenIsAdded ? (jsx(Column, __assign({ style: { padding: '20px 0', height: '100%' } }, { children: jsx(ImportRow, { token: searchToken, showImportView: showImportView, setImportToken: setImportToken }, void 0) }), void 0)) : (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) > 0 || (filteredInactiveTokens === null || filteredInactiveTokens === void 0 ? void 0 : filteredInactiveTokens.length) > 0 ? (jsx(Box, __assign({ margin: "24px -24px" }, { children: jsx(CurrencyList, { height: 390, showETH: showETH, currencies: filteredInactiveTokens ? filteredSortedTokens.concat(filteredInactiveTokens) : filteredSortedTokens, breakIndex: inactiveTokens && filteredSortedTokens ? filteredSortedTokens.length : undefined, onCurrencySelect: handleCurrencySelect, otherCurrency: otherSelectedCurrency, selectedCurrency: selectedCurrency, fixedListRef: fixedList, showImportView: showImportView, setImportToken: setImportToken }, void 0) }), void 0)) : (jsx(Column, __assign({ style: { padding: '20px', height: '100%' } }, { children: jsx(Text, __assign({ color: "textSubtle", textAlign: "center", mb: "20px" }, { children: t('No results found.') }), void 0) }), void 0))] }, void 0) }, void 0));
}

function ImportToken(_a) {
	var tokens = _a.tokens, handleCurrencySelect = _a.handleCurrencySelect;
	var chainId = useActiveWeb3React().chainId;
	var t = useTranslation().t;
	var _b = __read(useState(false), 2), confirmed = _b[0], setConfirmed = _b[1];
	var addToken = useAddUserToken();
	// use for showing import source on inactive tokens
	var inactiveTokenList = useCombinedInactiveList();
	return (jsxs(AutoColumn, __assign({ gap: "lg" }, {
		children: [jsx(Message, __assign({ variant: "warning" }, {
			children: jsxs(Text, {
				children: [t('Anyone can create a %token% token on %chain% with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.', {
					token: 'ERC20',
					chain: 'Polygon'
				}), jsx("br", {}, void 0), jsx("br", {}, void 0), t('If you purchase an arbitrary token, you may be unable to sell it back.')]
			}, void 0)
		}), void 0), tokens.map(function (token) {
			var _a, _b;
			var list = chainId && ((_b = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[token.address]) === null || _b === void 0 ? void 0 : _b.list);
			var address = token.address
				? token.address.substring(0, 6) + "..." + token.address.substring(token.address.length - 4)
				: null;
			return (jsxs(Grid, __assign({ gridTemplateRows: "1fr 1fr 1fr", gridGap: "4px" }, { children: [list !== undefined ? (jsxs(Tag, __assign({ variant: "success", outline: true, scale: "sm", startIcon: list.logoURI && jsx(ListLogo, { logoURI: list.logoURI, size: "12px" }, void 0) }, { children: [t('via'), " ", list.name] }), void 0)) : (jsx(Tag, __assign({ variant: "failure", outline: true, scale: "sm", startIcon: jsx(Icon$P, { color: "failure" }, void 0) }, { children: t('Unknown Source') }), void 0)), jsxs(Flex, __assign({ alignItems: "center" }, { children: [jsx(Text, __assign({ mr: "8px" }, { children: token.name }), void 0), jsxs(Text, { children: ["(", token.symbol, ")"] }, void 0)] }), void 0), chainId && (jsxs(Flex, __assign({ justifyContent: "space-between", width: "100%" }, { children: [jsx(Text, __assign({ mr: "4px" }, { children: address }), void 0), jsxs(Link, __assign({ href: getBscScanLink(token.address, 'address', chainId), external: true }, { children: ["(", t('View on BscScan'), ")"] }), void 0)] }), void 0))] }), token.address));
		}), jsxs(Flex, __assign({ justifyContent: "space-between", alignItems: "center" }, {
			children: [jsxs(Flex, __assign({ alignItems: "center", onClick: function () { return setConfirmed(!confirmed); } }, { children: [jsx(Checkbox, { scale: "sm", name: "confirmed", type: "checkbox", checked: confirmed, onChange: function () { return setConfirmed(!confirmed); } }, void 0), jsx(Text, __assign({ ml: "8px", style: { userSelect: 'none' } }, { children: t('I understand') }), void 0)] }), void 0), jsx(Button, __assign({
				variant: "danger", disabled: !confirmed, onClick: function () {
					tokens.map(function (token) { return addToken(token); });
					if (handleCurrencySelect) {
						handleCurrencySelect(tokens[0]);
					}
				}, className: ".token-dismiss-button"
			}, { children: t('Import') }), void 0)]
		}), void 0)]
	}), void 0));
}

var CurrencyModalView;
(function (CurrencyModalView) {
	CurrencyModalView[CurrencyModalView["search"] = 0] = "search";
	CurrencyModalView[CurrencyModalView["manage"] = 1] = "manage";
	CurrencyModalView[CurrencyModalView["importToken"] = 2] = "importToken";
	CurrencyModalView[CurrencyModalView["importList"] = 3] = "importList";
})(CurrencyModalView || (CurrencyModalView = {}));

function listVersionLabel(version) {
	return "v" + version.major + "." + version.minor + "." + version.patch;
}
var Wrapper$2 = styled(Column)(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n"], ["\n  width: 100%;\n  height: 100%;\n"])));
var RowWrapper = styled(Row)(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject(["\n  background-color: ", ";\n  border: solid 1px;\n  border-color: ", ";\n  transition: 200ms;\n  align-items: center;\n  padding: 1rem;\n  border-radius: 20px;\n"], ["\n  background-color: ", ";\n  border: solid 1px;\n  border-color: ", ";\n  transition: 200ms;\n  align-items: center;\n  padding: 1rem;\n  border-radius: 20px;\n"])), function (_a) {
	var active = _a.active, theme = _a.theme;
	return (active ? theme.colors.success + "19" : 'transparent');
}, function (_a) {
	var active = _a.active, theme = _a.theme;
	return (active ? theme.colors.success : theme.colors.tertiary);
});
function listUrlRowHTMLId(listUrl) {
	return "list-row-" + listUrl.replace(/\./g, '-');
}
var ListRow = memo(function ListRow(_a) {
	var listUrl = _a.listUrl;
	var listsByUrl = useSelector(function (state) { return state.lists.byUrl; });
	var dispatch = useDispatch();
	var _b = listsByUrl[listUrl], list = _b.current, pending = _b.pendingUpdate;
	var isActive = useIsListActive(listUrl);
	var t = useTranslation().t;
	var handleAcceptListUpdate = useCallback(function () {
		if (!pending)
			return;
		dispatch(acceptListUpdate(listUrl));
	}, [dispatch, listUrl, pending]);
	var handleRemoveList = useCallback(function () {
		// eslint-disable-next-line no-alert
		if (window.confirm('Please confirm you would like to remove this list')) {
			dispatch(removeList(listUrl));
		}
	}, [dispatch, listUrl]);
	var handleEnableList = useCallback(function () {
		dispatch(enableList(listUrl));
	}, [dispatch, listUrl]);
	var handleDisableList = useCallback(function () {
		dispatch(disableList(listUrl));
	}, [dispatch, listUrl]);
	var _c = useTooltip(jsxs("div", { children: [jsx(Text, { children: list && listVersionLabel(list.version) }, void 0), jsx(LinkExternal, __assign({ external: true, href: "https://tokenlists.org/token-list?url=" + listUrl }, { children: t('See') }), void 0), jsx(Button, __assign({ variant: "danger", scale: "xs", onClick: handleRemoveList, disabled: Object.keys(listsByUrl).length === 1 }, { children: t('Remove') }), void 0), pending && (jsx(Button, __assign({ variant: "text", onClick: handleAcceptListUpdate, style: { fontSize: '12px' } }, { children: t('Update list') }), void 0))] }, void 0), { placement: 'right-end', trigger: 'click' }), targetRef = _c.targetRef, tooltip = _c.tooltip, tooltipVisible = _c.tooltipVisible;
	if (!list)
		return null;
	return (jsxs(RowWrapper, __assign({ active: isActive, id: listUrlRowHTMLId(listUrl) }, {
		children: [tooltipVisible && tooltip, list.logoURI ? (jsx(ListLogo, { size: "40px", style: { marginRight: '1rem' }, logoURI: list.logoURI, alt: list.name + " list logo" }, void 0)) : (jsx("div", { style: { width: '24px', height: '24px', marginRight: '1rem' } }, void 0)), jsxs(Column, __assign({ style: { flex: '1' } }, { children: [jsx(Row, { children: jsx(Text, __assign({ bold: true }, { children: list.name }), void 0) }, void 0), jsxs(RowFixed, __assign({ mt: "4px" }, { children: [jsxs(Text, __assign({ fontSize: "12px", mr: "6px", textTransform: "lowercase" }, { children: [list.tokens.length, " ", t('Tokens')] }), void 0), jsx("span", __assign({ ref: targetRef }, { children: jsx(Icon$F, { color: "text", width: "16px" }, void 0) }), void 0)] }), void 0)] }), void 0), jsx(Toggle, {
			checked: isActive, onChange: function () {
				if (isActive) {
					handleDisableList();
				}
				else {
					handleEnableList();
				}
			}
		}, void 0)]
	}), listUrl));
});
var ListContainer = styled.div(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  padding: 1rem 0;\n  height: 100%;\n  overflow: auto;\n"], ["\n  padding: 1rem 0;\n  height: 100%;\n  overflow: auto;\n"])));
function ManageLists(_a) {
	var setModalView = _a.setModalView, setImportList = _a.setImportList, setListUrl = _a.setListUrl;
	var _b = __read(useState(''), 2), listUrlInput = _b[0], setListUrlInput = _b[1];
	var t = useTranslation().t;
	var lists = useAllLists();
	// sort by active but only if not visible
	var activeListUrls = useActiveListUrls();
	var _c = __read(useState(), 2), activeCopy = _c[0], setActiveCopy = _c[1];
	useEffect(function () {
		if (!activeCopy && activeListUrls) {
			setActiveCopy(activeListUrls);
		}
	}, [activeCopy, activeListUrls]);
	var handleInput = useCallback(function (e) {
		setListUrlInput(e.target.value);
	}, []);
	var fetchList = useFetchListCallback();
	var validUrl = useMemo(function () {
		return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput));
	}, [listUrlInput]);
	var sortedLists = useMemo(function () {
		var listUrls = Object.keys(lists);
		return listUrls
			.filter(function (listUrl) {
				// only show loaded lists, hide unsupported lists
				return Boolean(lists[listUrl].current) && !UNSUPPORTED_LIST_URLS.includes(listUrl);
			})
			.sort(function (u1, u2) {
				var l1 = lists[u1].current;
				var l2 = lists[u2].current;
				// first filter on active lists
				if ((activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u1)) && !(activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u2))) {
					return -1;
				}
				if (!(activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u1)) && (activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u2))) {
					return 1;
				}
				if (l1 && l2) {
					return l1.name.toLowerCase() < l2.name.toLowerCase()
						? -1
						: l1.name.toLowerCase() === l2.name.toLowerCase()
							? 0
							: 1;
				}
				if (l1)
					return -1;
				if (l2)
					return 1;
				return 0;
			});
	}, [lists, activeCopy]);
	// temporary fetched list for import flow
	var _d = __read(useState(), 2), tempList = _d[0], setTempList = _d[1];
	var _e = __read(useState(), 2), addError = _e[0], setAddError = _e[1];
	useEffect(function () {
		function fetchTempList() {
			return __awaiter(this, void 0, void 0, function () {
				return __generator(this, function (_a) {
					fetchList(listUrlInput, false)
						.then(function (list) { return setTempList(list); })
						.catch(function () { return setAddError('Error importing list'); });
					return [2 /*return*/];
				});
			});
		}
		// if valid url, fetch details for card
		if (validUrl) {
			fetchTempList();
		}
		else {
			setTempList(undefined);
			if (listUrlInput !== '') {
				setAddError('Enter valid list location');
			}
		}
		// reset error
		if (listUrlInput === '') {
			setAddError(undefined);
		}
	}, [fetchList, listUrlInput, validUrl]);
	// check if list is already imported
	var isImported = Object.keys(lists).includes(listUrlInput);
	// set list values and have parent modal switch to import list view
	var handleImport = useCallback(function () {
		if (!tempList)
			return;
		setImportList(tempList);
		setModalView(CurrencyModalView.importList);
		setListUrl(listUrlInput);
	}, [listUrlInput, setImportList, setListUrl, setModalView, tempList]);
	return (jsxs(Wrapper$2, { children: [jsxs(AutoColumn, __assign({ gap: "14px" }, { children: [jsx(Row, { children: jsx(Input$4, { id: "list-add-input", scale: "lg", placeholder: t('https:// or ipfs:// or ENS name'), value: listUrlInput, onChange: handleInput }, void 0) }, void 0), addError ? (jsx(Text, __assign({ color: "failure", style: { textOverflow: 'ellipsis', overflow: 'hidden' } }, { children: addError }), void 0)) : null] }), void 0), tempList && (jsx(AutoColumn, __assign({ style: { paddingTop: 0 } }, { children: jsx(Card, __assign({ padding: "12px 20px" }, { children: jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [tempList.logoURI && jsx(ListLogo, { logoURI: tempList.logoURI, size: "40px" }, void 0), jsxs(AutoColumn, __assign({ gap: "4px", style: { marginLeft: '20px' } }, { children: [jsx(Text, __assign({ bold: true }, { children: tempList.name }), void 0), jsxs(Text, __assign({ color: "textSubtle", small: true, textTransform: "lowercase" }, { children: [tempList.tokens.length, " ", t('Tokens')] }), void 0)] }), void 0)] }, void 0), isImported ? (jsxs(RowFixed, { children: [jsx(Icon$J, { width: "16px", mr: "10px" }, void 0), jsx(Text, { children: t('Loaded') }, void 0)] }, void 0)) : (jsx(Button, __assign({ width: "fit-content", onClick: handleImport }, { children: t('Import') }), void 0))] }, void 0) }), void 0) }), void 0)), jsx(ListContainer, { children: jsx(AutoColumn, __assign({ gap: "md" }, { children: sortedLists.map(function (listUrl) { return (jsx(ListRow, { listUrl: listUrl }, listUrl)); }) }), void 0) }, void 0)] }, void 0));
}
var templateObject_1$c, templateObject_2$7, templateObject_3$3;

var Wrapper$1 = styled.div(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  width: 100%;\n  height: calc(100% - 60px);\n  position: relative;\n  padding-bottom: 60px;\n"], ["\n  width: 100%;\n  height: calc(100% - 60px);\n  position: relative;\n  padding-bottom: 60px;\n"])));
var Footer$1 = styled.div(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));
function ManageTokens(_a) {
	var setModalView = _a.setModalView, setImportToken = _a.setImportToken;
	var chainId = useActiveWeb3React().chainId;
	var t = useTranslation().t;
	var _b = __read(useState(''), 2), searchQuery = _b[0], setSearchQuery = _b[1];
	// manage focus on modal show
	var inputRef = useRef();
	var handleInput = useCallback(function (event) {
		var input = event.target.value;
		var checksummedInput = isAddress(input);
		setSearchQuery(checksummedInput || input);
	}, []);
	// if they input an address, use it
	var searchToken = useToken(searchQuery);
	// all tokens for local lisr
	var userAddedTokens = useUserAddedTokens();
	var removeToken = useRemoveUserAddedToken();
	var handleRemoveAll = useCallback(function () {
		if (chainId && userAddedTokens) {
			userAddedTokens.map(function (token) {
				return removeToken(chainId, token.address);
			});
		}
	}, [removeToken, userAddedTokens, chainId]);
	var tokenList = useMemo(function () {
		return (chainId &&
			userAddedTokens.map(function (token) { return (jsxs(RowBetween, __assign({ width: "100%" }, { children: [jsxs(RowFixed, { children: [jsx(CurrencyLogo, { currency: token, size: "20px" }, void 0), jsx(Link, __assign({ external: true, href: getBscScanLink(token.address, 'address', chainId), color: "textSubtle", ml: "10px" }, { children: token.symbol }), void 0)] }, void 0), jsxs(RowFixed, { children: [jsx(IconButton, __assign({ variant: "text", onClick: function () { return removeToken(chainId, token.address); } }, { children: jsx(Icon$G, {}, void 0) }), void 0), jsx(LinkExternal, { href: getBscScanLink(token.address, 'address', chainId) }, void 0)] }, void 0)] }), token.address)); }));
	}, [userAddedTokens, chainId, removeToken]);
	var isAddressValid = searchQuery === '' || isAddress(searchQuery);
	return (jsx(Wrapper$1, { children: jsxs(Column, __assign({ style: { width: '100%', flex: '1 1' } }, { children: [jsxs(AutoColumn, __assign({ gap: "14px" }, { children: [jsx(Row, { children: jsx(Input$4, { id: "token-search-input", scale: "lg", placeholder: "0x0000", value: searchQuery, autoComplete: "off", ref: inputRef, onChange: handleInput, isWarning: !isAddressValid }, void 0) }, void 0), !isAddressValid && jsx(Text, __assign({ color: "failure" }, { children: t('Enter valid token address') }), void 0), searchToken && (jsx(ImportRow, { token: searchToken, showImportView: function () { return setModalView(CurrencyModalView.importToken); }, setImportToken: setImportToken, style: { height: 'fit-content' } }, void 0))] }), void 0), tokenList, jsxs(Footer$1, { children: [jsxs(Text, __assign({ bold: true, color: "textSubtle" }, { children: [userAddedTokens === null || userAddedTokens === void 0 ? void 0 : userAddedTokens.length, " ", userAddedTokens.length === 1 ? t('Custom Token') : t('Custom Tokens')] }), void 0), userAddedTokens.length > 0 && (jsx(Button, __assign({ variant: "tertiary", onClick: handleRemoveAll }, { children: t('Clear all') }), void 0))] }, void 0)] }), void 0) }, void 0));
}
var templateObject_1$b, templateObject_2$6;

var StyledButtonMenu = styled(ButtonMenu)(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
function Manage(_a) {
	var setModalView = _a.setModalView, setImportList = _a.setImportList, setImportToken = _a.setImportToken, setListUrl = _a.setListUrl;
	var _b = __read(useState(true), 2), showLists = _b[0], setShowLists = _b[1];
	var t = useTranslation().t;
	return (jsxs(ModalBody, { children: [jsxs(StyledButtonMenu, __assign({ activeIndex: showLists ? 0 : 1, onItemClick: function () { return setShowLists(function (prev) { return !prev; }); }, scale: "sm", variant: "subtle", mb: "32px" }, { children: [jsx(ButtonMenuItem, __assign({ width: "50%" }, { children: t('Lists') }), void 0), jsx(ButtonMenuItem, __assign({ width: "50%" }, { children: t('Tokens') }), void 0)] }), void 0), showLists ? (jsx(ManageLists, { setModalView: setModalView, setImportList: setImportList, setListUrl: setListUrl }, void 0)) : (jsx(ManageTokens, { setModalView: setModalView, setImportToken: setImportToken }, void 0))] }, void 0));
}
var templateObject_1$a;

var useTheme = function () {
	var _a = __read(useThemeManager(), 2), isDark = _a[0], toggleTheme = _a[1];
	var theme = useContext(ThemeContext);
	return { isDark: isDark, theme: theme, toggleTheme: toggleTheme };
};

var Wrapper = styled.div(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n"], ["\n  position: relative;\n  width: 100%;\n"])));
var TextDot = styled.div(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n  height: 3px;\n  width: 3px;\n  background-color: ", ";\n  border-radius: 50%;\n"], ["\n  height: 3px;\n  width: 3px;\n  background-color: ", ";\n  border-radius: 50%;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
});
function ImportList(_a) {
	var _b;
	var listURL = _a.listURL, list = _a.list, onImport = _a.onImport;
	var theme = useTheme().theme;
	var dispatch = useDispatch();
	var t = useTranslation().t;
	// user must accept
	var _c = __read(useState(false), 2), confirmed = _c[0], setConfirmed = _c[1];
	var lists = useAllLists();
	var fetchList = useFetchListCallback();
	// monitor is list is loading
	var adding = Boolean((_b = lists[listURL]) === null || _b === void 0 ? void 0 : _b.loadingRequestId);
	var _d = __read(useState(null), 2), addError = _d[0], setAddError = _d[1];
	var handleAddList = useCallback(function () {
		if (adding)
			return;
		setAddError(null);
		fetchList(listURL)
			.then(function () {
				dispatch(enableList(listURL));
				onImport();
			})
			.catch(function (error) {
				setAddError(error.message);
				dispatch(removeList(listURL));
			});
	}, [adding, dispatch, fetchList, listURL, onImport]);
	return (jsx(Wrapper, { children: jsx(AutoColumn, __assign({ gap: "md" }, { children: jsxs(AutoColumn, __assign({ gap: "md" }, { children: [jsx(Card, __assign({ padding: "12px 20px" }, { children: jsx(RowBetween, { children: jsxs(RowFixed, { children: [list.logoURI && jsx(ListLogo, { logoURI: list.logoURI, size: "40px" }, void 0), jsxs(AutoColumn, __assign({ gap: "sm", style: { marginLeft: '20px' } }, { children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ bold: true, mr: "6px" }, { children: list.name }), void 0), jsx(TextDot, {}, void 0), jsxs(Text, __assign({ small: true, color: "textSubtle", ml: "6px" }, { children: [list.tokens.length, " tokens"] }), void 0)] }, void 0), jsx(Link, __assign({ small: true, external: true, ellipsis: true, maxWidth: "90%", href: "https://tokenlists.org/token-list?url=" + listURL }, { children: listURL }), void 0)] }), void 0)] }, void 0) }, void 0) }), void 0), jsx(Message, __assign({ variant: "danger" }, { children: jsxs(Flex, __assign({ flexDirection: "column" }, { children: [jsx(Text, __assign({ fontSize: "20px", textAlign: "center", color: theme.colors.failure, mb: "16px" }, { children: t('Import at your own risk') }), void 0), jsx(Text, __assign({ color: theme.colors.failure, mb: "8px" }, { children: t('By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.') }), void 0), jsx(Text, __assign({ bold: true, color: theme.colors.failure, mb: "16px" }, { children: typeof 'If you purchase a token from this list, you may not be able to sell it back.' }), void 0), jsxs(Flex, __assign({ alignItems: "center" }, { children: [jsx(Checkbox, { name: "confirmed", type: "checkbox", checked: confirmed, onChange: function () { return setConfirmed(!confirmed); }, scale: "sm" }, void 0), jsx(Text, __assign({ ml: "10px", style: { userSelect: 'none' } }, { children: t('I understand') }), void 0)] }), void 0)] }), void 0) }), void 0), jsx(Button, __assign({ disabled: !confirmed, onClick: handleAddList }, { children: t('Import') }), void 0), addError ? (jsx(Text, __assign({ color: "failure", style: { textOverflow: 'ellipsis', overflow: 'hidden' } }, { children: addError }), void 0)) : null] }), void 0) }), void 0) }, void 0));
}
var templateObject_1$9, templateObject_2$5;

var Footer = styled.div(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n  width: 100%;\n  background-color: ", ";\n  text-align: center;\n"], ["\n  width: 100%;\n  background-color: ", ";\n  text-align: center;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundAlt;
});
var StyledModalContainer$1 = styled(ModalContainer)(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n  max-width: 420px;\n  width: 100%;\n"], ["\n  max-width: 420px;\n  width: 100%;\n"])));
var StyledModalBody = styled(ModalBody)(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  padding: 24px;\n"], ["\n  padding: 24px;\n"])));
function CurrencySearchModal(_a) {
	var _b;
	var _c = _a.onDismiss, onDismiss = _c === void 0 ? function () { return null; } : _c, onCurrencySelect = _a.onCurrencySelect, selectedCurrency = _a.selectedCurrency, otherSelectedCurrency = _a.otherSelectedCurrency, _d = _a.showCommonBases, showCommonBases = _d === void 0 ? false : _d;
	var _e = __read(useState(CurrencyModalView.search), 2), modalView = _e[0], setModalView = _e[1];
	var handleCurrencySelect = useCallback(function (currency) {
		onDismiss();
		onCurrencySelect(currency);
	}, [onDismiss, onCurrencySelect]);
	// for token import view
	var prevView = usePreviousValue(modalView);
	// used for import token flow
	var _f = __read(useState(), 2), importToken = _f[0], setImportToken = _f[1];
	// used for import list
	var _g = __read(useState(), 2), importList = _g[0], setImportList = _g[1];
	var _h = __read(useState(), 2), listURL = _h[0], setListUrl = _h[1];
	var t = useTranslation().t;
	var config = (_b = {},
		_b[CurrencyModalView.search] = { title: t('Select a Token'), onBack: undefined },
		_b[CurrencyModalView.manage] = { title: t('Manage'), onBack: function () { return setModalView(CurrencyModalView.search); } },
		_b[CurrencyModalView.importToken] = {
			title: t('Import Tokens'),
			onBack: function () {
				return setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search);
			},
		},
		_b[CurrencyModalView.importList] = { title: t('Import List'), onBack: function () { return setModalView(CurrencyModalView.search); } },
		_b);
	return (jsxs(StyledModalContainer$1, __assign({ minWidth: "320px" }, { children: [jsxs(ModalHeader, { children: [jsxs(ModalTitle, { children: [config[modalView].onBack && jsx(ModalBackButton, { onBack: config[modalView].onBack }, void 0), jsx(Heading, { children: config[modalView].title }, void 0)] }, void 0), jsx(ModalCloseButton, { onDismiss: onDismiss }, void 0)] }, void 0), jsxs(StyledModalBody, { children: [modalView === CurrencyModalView.search ? (jsx(CurrencySearch, { onCurrencySelect: handleCurrencySelect, selectedCurrency: selectedCurrency, otherSelectedCurrency: otherSelectedCurrency, showCommonBases: showCommonBases, showImportView: function () { return setModalView(CurrencyModalView.importToken); }, setImportToken: setImportToken }, void 0)) : modalView === CurrencyModalView.importToken && importToken ? (jsx(ImportToken, { tokens: [importToken], handleCurrencySelect: handleCurrencySelect }, void 0)) : modalView === CurrencyModalView.importList && importList && listURL ? (jsx(ImportList, { list: importList, listURL: listURL, onImport: function () { return setModalView(CurrencyModalView.manage); } }, void 0)) : modalView === CurrencyModalView.manage ? (jsx(Manage, { setModalView: setModalView, setImportToken: setImportToken, setImportList: setImportList, setListUrl: setListUrl }, void 0)) : (''), modalView === CurrencyModalView.search && (jsx(Footer, { children: jsx(Button, __assign({ scale: "sm", variant: "text", onClick: function () { return setModalView(CurrencyModalView.manage); }, className: "list-token-manage-button" }, { children: t('Manage Tokens') }), void 0) }, void 0))] }, void 0)] }), void 0));
}
var templateObject_1$8, templateObject_2$4, templateObject_3$2;

var StyledInput = styled.input(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  color: ", ";\n  width: 0;\n  position: relative;\n  font-weight: 500;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  background-color: transparent;\n  font-size: 16px;\n  text-align: ", ";\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  &:disabled {\n    /* background-color: ", "; */\n    box-shadow: none;\n    /* color: ", "; */\n    cursor: not-allowed;\n  }\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  [type='number'] {\n    -moz-appearance: textfield;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"], ["\n  color: ", ";\n  width: 0;\n  position: relative;\n  font-weight: 500;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  background-color: transparent;\n  font-size: 16px;\n  text-align: ", ";\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  &:disabled {\n    /* background-color: ", "; */\n    box-shadow: none;\n    /* color: ", "; */\n    cursor: not-allowed;\n  }\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  [type='number'] {\n    -moz-appearance: textfield;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"])), function (_a) {
	var error = _a.error, theme = _a.theme;
	return (error ? theme.colors.failure : theme.colors.text);
}, function (_a) {
	var align = _a.align;
	return align && align;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.backgroundDisabled;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.textDisabled;
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
});
var inputRegex = RegExp("^\\d*(?:\\\\[.])?\\d*$"); // match escaped "." characters via in a non-capturing group
var Input = React.memo(function InnerInput(_a) {
	var value = _a.value, onUserInput = _a.onUserInput, placeholder = _a.placeholder, decimals = _a.decimals, rest = __rest(_a, ["value", "onUserInput", "placeholder", "decimals"]);
	var enforcer = useCallback(function (event) {
		if (event.currentTarget.validity.valid) {
			var nextUserInput = event.target.value.replace(/,/g, '.');
			if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
				onUserInput(nextUserInput);
			}
		}
	}, [onUserInput]);
	var t = useTranslation().t;
	return (jsx(StyledInput, __assign({}, rest, {
		// universal input options
		pattern: "^[0-9]*[.,]?[0-9]{0," + (decimals || 18) + "}$", inputMode: "decimal", title: t('Token Amount'), value: value, onChange: enforcer,
		// text-specific options
		type: "text", placeholder: placeholder || '0.0', minLength: 1, maxLength: 79, spellCheck: "false"
	}), void 0));
});
var templateObject_1$7;

var InputRow = styled.div(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  padding: ", ";\n"], ["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  padding: ", ";\n"])), function (_a) {
	var selected = _a.selected;
	return (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem');
});
var CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  padding: 0 0.5rem;\n"], ["\n  padding: 0 0.5rem;\n"])));
var LabelRow = styled.div(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  padding: 0.75rem 1rem 0 1rem;\n"], ["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  padding: 0.75rem 1rem 0 1rem;\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.text;
});
var InputPanel = styled.div(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: ", ";\n  background-color: ", ";\n  z-index: 1;\n"], ["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: ", ";\n  background-color: ", ";\n  z-index: 1;\n"])), function (_a) {
	var hideInput = _a.hideInput;
	return (hideInput ? '8px' : '20px');
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.background;
});
var Container = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  border-radius: 16px;\n  background-color: ", ";\n  box-shadow: ", ";\n"], ["\n  border-radius: 16px;\n  background-color: ", ";\n  box-shadow: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.input;
}, function (_a) {
	var theme = _a.theme;
	return theme.shadows.inset;
});
function CurrencyInputPanel(_a) {
	var _b;
	var value = _a.value, onUserInput = _a.onUserInput, onMax = _a.onMax, showMaxButton = _a.showMaxButton, label = _a.label, onCurrencySelect = _a.onCurrencySelect, currency = _a.currency, _c = _a.disableCurrencySelect, disableCurrencySelect = _c === void 0 ? false : _c, _d = _a.hideBalance, hideBalance = _d === void 0 ? false : _d, disabled = _a.disabled, _e = _a.pair, pair = _e === void 0 ? null : _e, // used for double token logo
		_f = _a.hideInput, // used for double token logo
		hideInput = _f === void 0 ? false : _f, otherCurrency = _a.otherCurrency, id = _a.id, onSelect = _a.onSelect, showCommonBases = _a.showCommonBases;
	var account = useActiveWeb3React().account;
	var selectedCurrencyBalance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
	var t = useTranslation().t;
	var translatedLabel = label || t('Input');
	var _g = __read(useModal(jsx(CurrencySearchModal, { onCurrencySelect: onCurrencySelect, selectedCurrency: currency, otherSelectedCurrency: otherCurrency, showCommonBases: showCommonBases }, void 0)), 1), onPresentCurrencyModal = _g[0];
	return (jsx(InputPanel, __assign({ id: id }, {
		children: jsxs(Container, __assign({ hideInput: hideInput }, {
			children: [!hideInput && (jsx(LabelRow, {
				children: jsxs(RowBetween, {
					children: [jsx(Text, __assign({ fontSize: "14px" }, { children: translatedLabel }), void 0), account && (jsx(Text, __assign({ onClick: onMax, fontSize: "14px", style: { display: 'inline', cursor: 'pointer' } }, {
						children: !hideBalance && !!currency && selectedCurrencyBalance
							? t('Balance: %amount%', { amount: (_b = selectedCurrencyBalance === null || selectedCurrencyBalance === void 0 ? void 0 : selectedCurrencyBalance.toSignificant(6)) !== null && _b !== void 0 ? _b : '' })
							: ' -'
					}), void 0))]
				}, void 0)
			}, void 0)), jsxs(InputRow, __assign({ style: hideInput ? { padding: '0', borderRadius: '8px' } : {}, selected: disableCurrencySelect }, {
				children: [!hideInput && (jsxs(Fragment, {
					children: [jsx(Input, {
						className: "token-amount-input", disabled: disabled, decimals: currency === null || currency === void 0 ? void 0 : currency.decimals, value: value, onUserInput: function (val) {
							onUserInput(val);
						}
					}, void 0), account && currency && showMaxButton && label !== 'To' && (jsx(Button, __assign({ onClick: onMax, scale: "sm", variant: "text" }, { children: "MAX" }), void 0))]
				}, void 0)), jsx(CurrencySelectButton, __assign({
					selected: !!currency, className: "open-currency-select-button", onClick: function () {
						if (!disableCurrencySelect) {
							if (onSelect) {
								onSelect();
							}
							else if (onCurrencySelect) {
								onPresentCurrencyModal();
							}
						}
					}
				}, {
					children: jsxs(Flex, __assign({ alignItems: "center", justifyContent: "space-between" }, {
						children: [pair ? (jsx(DoubleCurrencyLogo, { currency0: pair.token0, currency1: pair.token1, size: 16, margin: true }, void 0)) : currency ? (jsx(CurrencyLogo, { currency: currency, size: "24px", style: { marginRight: '8px' } }, void 0)) : null, pair ? (jsxs(Text, __assign({ color: 'primary', id: "pair" }, { children: [pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol] }), void 0)) : (jsx(Text, __assign({ color: 'primary', id: "pair" }, {
							children: (currency && currency.symbol && currency.symbol.length > 20
								? currency.symbol.slice(0, 4) + "..." + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
								: currency === null || currency === void 0 ? void 0 : currency.symbol) || t('Select')
						}), void 0)), !disableCurrencySelect && jsx(Icon$I, { color: 'primary' }, void 0)]
					}), void 0)
				}), void 0)]
			}), void 0)]
		}), void 0)
	}), void 0));
}
var templateObject_1$6, templateObject_2$3, templateObject_3$1, templateObject_4$1, templateObject_5;

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
function useLast(value, filterFn) {
	var _a = __read(useState(filterFn && filterFn(value) ? value : undefined), 2), last = _a[0], setLast = _a[1];
	useEffect(function () {
		setLast(function (prev) {
			var shouldUse = filterFn ? filterFn(value) : true;
			if (shouldUse)
				return value;
			return prev;
		});
	}, [filterFn, value]);
	return last;
}
function isDefined(x) {
	return x !== null && x !== undefined;
}
/**
 * Returns the last truthy value of type T
 * @param value changing value
 */
function useLastTruthy(value) {
	return useLast(value, isDefined);
}

var SwapRoute = memo(function SwapRoute(_a) {
	var trade = _a.trade, polyData = _a.polyData, isPolyMethed = _a.isPolyMethed;
	var renderPath = isPolyMethed ? polyData.protocols : trade.route.path;
	return (jsx(Flex, __assign({ flexWrap: "wrap", width: "100%", justifyContent: "flex-end", alignItems: "center" }, {
		children: renderPath.map(function (token, i, path) {
			var isLastItem = i === path.length - 1;
			var currency = unwrappedToken(token);
			return (
				// eslint-disable-next-line react/no-array-index-key
				jsxs(Fragment$1, { children: [jsx(Flex, __assign({ alignItems: "end" }, { children: jsx(Text, __assign({ fontSize: "14px", ml: "0.125rem", mr: "0.125rem" }, { children: currency.symbol }), void 0) }), void 0), !isLastItem && jsx(Icon$H, { width: "12px" }, void 0)] }, i));
		})
	}), void 0));
});

function TradeSummary(_a) {
	var _b, _c, _d, _e;
	var trade = _a.trade, allowedSlippage = _a.allowedSlippage;
	var t = useTranslation().t;
	var _f = computeTradePriceBreakdown(trade), priceImpactWithoutFee = _f.priceImpactWithoutFee, realizedLPFee = _f.realizedLPFee;
	var isExactIn = trade.tradeType === TradeType.EXACT_INPUT;
	var slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage);
	return (jsxs(AutoColumn, __assign({ style: { padding: '0 16px' } }, {
		children: [jsxs(RowBetween, {
			children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ fontSize: "14px", color: "text" }, { children: isExactIn ? t('Minimum received') : t('Maximum sold') }), void 0), jsx(QuestionHelper, { text: t('Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsx(RowFixed, {
				children: jsx(Text, __assign({ fontSize: "14px" }, {
					children: isExactIn
						? (_c = ((_b = slippageAdjustedAmounts[Field$2.OUTPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(4)) + " " + trade.outputAmount.currency.symbol) !== null && _c !== void 0 ? _c : '-'
						: (_e = ((_d = slippageAdjustedAmounts[Field$2.INPUT]) === null || _d === void 0 ? void 0 : _d.toSignificant(4)) + " " + trade.inputAmount.currency.symbol) !== null && _e !== void 0 ? _e : '-'
				}), void 0)
			}, void 0)]
		}, void 0), jsxs(Fragment, { children: [jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ fontSize: "14px", color: "text" }, { children: t('Price Impact') }), void 0), jsx(QuestionHelper, { text: t('The difference between the market price and estimated price due to trade size.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsx(FormattedPriceImpact, { priceImpact: priceImpactWithoutFee }, void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(LiquidityProviderFee, {}, void 0), jsx(Text, __assign({ fontSize: "14px" }, { children: realizedLPFee ? realizedLPFee.toSignificant(4) + " " + trade.inputAmount.currency.symbol : '-' }), void 0)] }, void 0)] }, void 0)]
	}), void 0));
}
function TradeSummaryPloy(_a) {
	var _b, _c, _d;
	var polyData = _a.polyData;
	var t = useTranslation().t;
	return (jsx(AutoColumn, __assign({ style: { padding: '0 16px' } }, { children: jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ fontSize: "14px", color: "textSubtle" }, { children: t('Minimum received') }), void 0), jsx(QuestionHelper, { text: t('Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsx(RowFixed, { children: jsx(Text, __assign({ fontSize: "14px" }, { children: (_d = ((_b = polyData === null || polyData === void 0 ? void 0 : polyData.toCurrencyAmount) === null || _b === void 0 ? void 0 : _b.toSignificant(4)) + " " + ((_c = polyData === null || polyData === void 0 ? void 0 : polyData.toToken) === null || _c === void 0 ? void 0 : _c.symbol)) !== null && _d !== void 0 ? _d : '-' }), void 0) }, void 0)] }, void 0) }), void 0));
}
function AdvancedSwapDetails(_a) {
	var trade = _a.trade, isPolyMethed = _a.isPolyMethed, polyData = _a.polyData;
	var _b = __read(useUserSlippageTolerance(), 1), allowedSlippage = _b[0];
	var t = useTranslation().t;
	var showRoute = !isPolyMethed ? Boolean(trade && trade.route.path.length > 2) : Boolean(polyData && polyData.protocols.length > 2);
	return (jsxs(AutoColumn, __assign({ gap: "0px" }, { children: [isPolyMethed && (jsx(TradeSummaryPloy, { polyData: polyData }, void 0)), (trade && !isPolyMethed) && (jsxs(Fragment, { children: [jsx(TradeSummary, { trade: trade, allowedSlippage: allowedSlippage }, void 0), showRoute && (jsx(Fragment, { children: jsxs(RowBetween, __assign({ style: { padding: '0 16px' } }, { children: [jsxs(RowFixed, __assign({ minWidth: "80px" }, { children: [jsx(Text, __assign({ fontSize: "14px", color: "text" }, { children: t('Route') }), void 0), jsx(QuestionHelper, { text: t("Routing through these tokens resulted in the best price for your trade."), ml: "4px", placement: "top-start" }, void 0)] }), void 0), jsx(SwapRoute, { isPolyMethed: isPolyMethed, polyData: polyData, trade: trade }, void 0)] }), void 0) }, void 0))] }, void 0))] }), void 0));
}

var AdvancedDetailsFooter = styled.div(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  margin-top: ", ";\n  padding-top: 16px;\n  padding-bottom: 16px;\n  width: 100%;\n  max-width: 400px;\n  border-radius: 20px;\n  background-color: ", ";\n\n  transform: ", ";\n  transition: transform 300ms ease-in-out;\n"], ["\n  margin-top: ", ";\n  padding-top: 16px;\n  padding-bottom: 16px;\n  width: 100%;\n  max-width: 400px;\n  border-radius: 20px;\n  background-color: ", ";\n\n  transform: ", ";\n  transition: transform 300ms ease-in-out;\n"])), function (_a) {
	var show = _a.show;
	return (show ? '16px' : 0);
}, function (_a) {
	var theme = _a.theme;
	return theme.colors.invertedContrast;
}, function (_a) {
	var show = _a.show;
	return (show ? 'translateY(0%)' : 'translateY(-100%)');
});
function AdvancedSwapDetailsDropdown(_a) {
	var _b;
	var trade = _a.trade, isPolyMethed = _a.isPolyMethed, polyData = _a.polyData, rest = __rest(_a, ["trade", "isPolyMethed", "polyData"]);
	var lastTrade = useLastTruthy(trade);
	return (jsx(AdvancedDetailsFooter, __assign({ show: Boolean(isPolyMethed ? polyData : trade) }, { children: jsx(AdvancedSwapDetails, __assign({}, rest, { isPolyMethed: isPolyMethed, polyData: polyData, trade: (_b = trade !== null && trade !== void 0 ? trade : lastTrade) !== null && _b !== void 0 ? _b : undefined }), void 0) }), void 0));
}
var templateObject_1$5;

/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 */
function confirmPriceImpactWithoutFee(priceImpactWithoutFee) {
	if (!priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
		return (
			// eslint-disable-next-line no-alert
			window.prompt("This swap has a price impact of at least " + PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(0) + "%. Please type the word \"confirm\" to continue with this swap.") === 'confirm');
	}
	if (!priceImpactWithoutFee.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
		// eslint-disable-next-line no-alert
		return window.confirm("This swap has a price impact of at least " + ALLOWED_PRICE_IMPACT_HIGH.toFixed(0) + "%. Please confirm that you would like to continue with this swap.");
	}
	return true;
}

function TradePrice(_a) {
	var _b, _c, _d, _e, _f;
	var price = _a.price, showInverted = _a.showInverted, setShowInverted = _a.setShowInverted;
	var formattedPrice = showInverted ? price === null || price === void 0 ? void 0 : price.toSignificant(6) : (_b = price === null || price === void 0 ? void 0 : price.invert()) === null || _b === void 0 ? void 0 : _b.toSignificant(6);
	var show = Boolean((price === null || price === void 0 ? void 0 : price.baseCurrency) && (price === null || price === void 0 ? void 0 : price.quoteCurrency));
	var label = showInverted
		? ((_c = price === null || price === void 0 ? void 0 : price.quoteCurrency) === null || _c === void 0 ? void 0 : _c.symbol) + " per " + ((_d = price === null || price === void 0 ? void 0 : price.baseCurrency) === null || _d === void 0 ? void 0 : _d.symbol)
		: ((_e = price === null || price === void 0 ? void 0 : price.baseCurrency) === null || _e === void 0 ? void 0 : _e.symbol) + " per " + ((_f = price === null || price === void 0 ? void 0 : price.quoteCurrency) === null || _f === void 0 ? void 0 : _f.symbol);
	return (jsx(Text, __assign({ style: { justifyContent: 'center', alignItems: 'center', display: 'flex' } }, { children: show ? (jsxs(Fragment, { children: [formattedPrice !== null && formattedPrice !== void 0 ? formattedPrice : '-', " ", label, jsx(StyledBalanceMaxMini, __assign({ onClick: function () { return setShowInverted(!showInverted); } }, { children: jsx(Icon$L, { width: "14px" }, void 0) }), void 0)] }, void 0)) : ('-') }), void 0));
}

var Grouping = styled(RowBetween)(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  width: 50%;\n"], ["\n  width: 50%;\n"])));
var Circle = styled.div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  min-width: 20px;\n  min-height: 20px;\n  background-color: ", ";\n  border-radius: 50%;\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 8px;\n  font-size: 12px;\n"], ["\n  min-width: 20px;\n  min-height: 20px;\n  background-color: ", ";\n  border-radius: 50%;\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 8px;\n  font-size: 12px;\n"])), function (_a) {
	var theme = _a.theme, confirmed = _a.confirmed, disabled = _a.disabled;
	return disabled ? theme.colors.backgroundDisabled : confirmed ? theme.colors.success : theme.colors.primary;
});
var CircleRow = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: calc(100% - 20px);\n  display: flex;\n  align-items: center;\n"], ["\n  width: calc(100% - 20px);\n  display: flex;\n  align-items: center;\n"])));
var Connector = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(\n    90deg,\n    ", "\n      0%,\n    ", "\n      80%\n  );\n  opacity: 0.6;\n"], ["\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(\n    90deg,\n    ", "\n      0%,\n    ", "\n      80%\n  );\n  opacity: 0.6;\n"])), function (_a) {
	var theme = _a.theme, prevConfirmed = _a.prevConfirmed, disabled = _a.disabled;
	return disabled ? theme.colors.backgroundDisabled : prevConfirmed ? theme.colors.success : theme.colors.primary;
}, function (_a) {
	var theme = _a.theme, prevConfirmed = _a.prevConfirmed, disabled = _a.disabled;
	return disabled
		? theme.colors.backgroundDisabled
		: prevConfirmed
			? theme.colors.primary
			: theme.colors.backgroundDisabled;
});
/**
 * Based on array of steps, create a step counter of circles.
 * A circle can be enabled, disabled, or confirmed. States are derived
 * from previous step.
 *
 * An extra circle is added to represent the ability to swap, add, or remove.
 * This step will never be marked as complete (because no 'txn done' state in body ui).
 *
 * @param steps  array of booleans where true means step is complete
 */
function ProgressCircles(_a) {
	var steps = _a.steps, _b = _a.disabled, disabled = _b === void 0 ? false : _b, rest = __rest(_a, ["steps", "disabled"]);
	return (jsx(AutoColumn, __assign({ justify: "center" }, rest, {
		children: jsxs(Grouping, {
			children: [steps.map(function (step, i) {
				return (
					// eslint-disable-next-line react/no-array-index-key
					jsxs(CircleRow, { children: [jsx(Circle, __assign({ confirmed: step, disabled: disabled || (!steps[i - 1] && i !== 0) }, { children: step ? '✓' : i + 1 }), void 0), jsx(Connector, { prevConfirmed: step, disabled: disabled }, void 0)] }, i));
			}), jsx(Circle, __assign({ disabled: disabled || !steps[steps.length - 1] }, { children: steps.length + 1 }), void 0)]
		}, void 0)
	}), void 0));
}
var templateObject_1$4, templateObject_2$2, templateObject_3, templateObject_4;

var SlippageError;
(function (SlippageError) {
	SlippageError["InvalidInput"] = "InvalidInput";
	SlippageError["RiskyLow"] = "RiskyLow";
	SlippageError["RiskyHigh"] = "RiskyHigh";
})(SlippageError || (SlippageError = {}));
var DeadlineError;
(function (DeadlineError) {
	DeadlineError["InvalidInput"] = "InvalidInput";
})(DeadlineError || (DeadlineError = {}));
function SlippageTabs(_a) {
	var rawSlippage = _a.rawSlippage, setRawSlippage = _a.setRawSlippage, deadline = _a.deadline, setDeadline = _a.setDeadline, singleHopOnly = _a.singleHopOnly, setSingleHopOnly = _a.setSingleHopOnly, userUsePoly = _a.userUsePoly, setUserUsePoly = _a.setUserUsePoly;
	var _b = __read(useState(''), 2), slippageInput = _b[0], setSlippageInput = _b[1];
	var _c = __read(useState(''), 2), deadlineInput = _c[0], setDeadlineInput = _c[1];
	var t = useTranslation().t;
	var slippageInputIsValid = slippageInput === '' || (rawSlippage / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2);
	var deadlineInputIsValid = deadlineInput === '' || (deadline / 60).toString() === deadlineInput;
	var slippageError;
	if (slippageInput !== '' && !slippageInputIsValid) {
		slippageError = SlippageError.InvalidInput;
	}
	else if (slippageInputIsValid && rawSlippage < 50) {
		slippageError = SlippageError.RiskyLow;
	}
	else if (slippageInputIsValid && rawSlippage > 500) {
		slippageError = SlippageError.RiskyHigh;
	}
	else {
		slippageError = undefined;
	}
	var deadlineError;
	if (deadlineInput !== '' && !deadlineInputIsValid) {
		deadlineError = DeadlineError.InvalidInput;
	}
	else {
		deadlineError = undefined;
	}
	function parseCustomSlippage(value) {
		setSlippageInput(value);
		try {
			var valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString());
			if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
				setRawSlippage(valueAsIntFromRoundedFloat);
			}
		}
		catch (error) {
			console.error(error);
		}
	}
	function parseCustomDeadline(value) {
		setDeadlineInput(value);
		try {
			var valueAsInt = Number.parseInt(value) * 60;
			if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
				setDeadline(valueAsInt);
			}
		}
		catch (error) {
			console.error(error);
		}
	}
	return (jsxs(AutoColumn, __assign({ gap: "md" }, {
		children: [jsxs(AutoColumn, __assign({ gap: "sm" }, {
			children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ fontSize: "14px" }, { children: t('Slippage Tolerance') }), void 0), jsx(QuestionHelper, { text: t('Your transaction will revert if the price changes unfavorably by more than this percentage.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsxs(Flex, __assign({ flexWrap: ['wrap', 'wrap', 'nowrap'] }, {
				children: [jsxs(Grid, __assign({ gridTemplateColumns: "1fr 1fr 1fr", gridGap: "8px", mb: ['8px', '8px', 0], mr: [0, 0, '8px'] }, {
					children: [jsx(Button, __assign({
						scale: "sm", onClick: function () {
							setSlippageInput('');
							setRawSlippage(10);
						}, variant: rawSlippage === 10 ? 'primary' : 'tertiary'
					}, { children: "0.1%" }), void 0), jsx(Button, __assign({
						scale: "sm", onClick: function () {
							setSlippageInput('');
							setRawSlippage(50);
						}, variant: rawSlippage === 50 ? 'primary' : 'tertiary'
					}, { children: "0.5%" }), void 0), jsx(Button, __assign({
						scale: "sm", onClick: function () {
							setSlippageInput('');
							setRawSlippage(100);
						}, variant: rawSlippage === 100 ? 'primary' : 'tertiary'
					}, { children: "1%" }), void 0)]
				}), void 0), jsxs(Flex, __assign({ width: "102px" }, {
					children: [jsx(Input$4, {
						scale: "sm", placeholder: (rawSlippage / 100).toFixed(2), value: slippageInput, onBlur: function () {
							parseCustomSlippage((rawSlippage / 100).toFixed(2));
						}, onChange: function (e) { return parseCustomSlippage(e.target.value); }, isWarning: !slippageInputIsValid, isSuccess: ![10, 50, 100].includes(rawSlippage)
					}, void 0), jsx(Text, __assign({ color: "primary", bold: true, ml: "8px" }, { children: "%" }), void 0)]
				}), void 0)]
			}), void 0), !!slippageError && (jsx(RowBetween, __assign({
				style: {
					fontSize: '14px',
					paddingTop: '7px',
					color: slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E',
				}
			}, {
				children: slippageError === SlippageError.InvalidInput
					? t('Enter a valid slippage percentage')
					: slippageError === SlippageError.RiskyLow
						? t('Your transaction may fail')
						: t('Your transaction may be frontrun')
			}), void 0))]
		}), void 0), jsxs(AutoColumn, __assign({ style: { marginTop: '8px' }, gap: "sm" }, {
			children: [jsxs(RowFixed, { children: [jsx(Text, __assign({ fontSize: "14px" }, { children: t('Transaction deadline') }), void 0), jsx(QuestionHelper, { placement: "top-start", text: t('Your transaction will revert if it is pending for more than this long.'), ml: "4px" }, void 0)] }, void 0), jsxs(RowFixed, __assign({ style: { width: '182px' } }, {
				children: [jsx(Input$4, {
					scale: "md", color: deadlineError ? 'red' : undefined, onBlur: function () {
						parseCustomDeadline((deadline / 60).toString());
					}, placeholder: (deadline / 60).toString(), value: deadlineInput, onChange: function (e) { return parseCustomDeadline(e.target.value); }
				}, void 0), jsx(Text, __assign({ width: "80px", pl: "8px", fontSize: "14px" }, { children: t('minutes') }), void 0)]
			}), void 0)]
		}), void 0), jsx(AutoColumn, __assign({ gap: "sm" }, { children: jsxs(RowBetween, __assign({ mt: "8px", width: "98%" }, { children: [jsxs(RowFixed, { children: [jsx(Text, { children: t('Aggregate trading') }, void 0), jsx(QuestionHelper, { placement: "top-start", text: t('Unable to get trading pool rewards using Aggregate trading'), ml: "4px" }, void 0)] }, void 0), jsx(Toggle, { checked: userUsePoly, scale: "sm", onChange: function () { return setUserUsePoly(!userUsePoly); } }, void 0)] }), void 0) }), void 0), jsx(AutoColumn, __assign({ gap: "sm" }, { children: jsxs(RowBetween, __assign({ mt: "8px", width: "98%" }, { children: [jsxs(RowFixed, { children: [jsx(Text, { children: t('Disable Route') }, void 0), jsx(QuestionHelper, { placement: "top-start", text: t('Restricts swaps to direct pairs only.'), ml: "4px" }, void 0)] }, void 0), jsx(Toggle, { checked: singleHopOnly, scale: "sm", onChange: function () { return setSingleHopOnly(!singleHopOnly); } }, void 0)] }), void 0) }), void 0)]
	}), void 0));
}

var SettingsModal = function (_a) {
	var onDismiss = _a.onDismiss;
	var _b = __read(useState(false), 2), showConfirmExpertModal = _b[0], setShowConfirmExpertModal = _b[1];
	var _c = __read(useUserSlippageTolerance(), 2), userSlippageTolerance = _c[0], setUserslippageTolerance = _c[1];
	var _d = __read(useUserUsePoly(), 2), userUsePoly = _d[0], setUserUsePoly = _d[1];
	var _e = __read(useUserTransactionTTL(), 2), ttl = _e[0], setTtl = _e[1];
	// const [expertMode, toggleExpertMode] = useExpertModeManager()
	var _f = __read(useUserSingleHopOnly(), 2), singleHopOnly = _f[0], setSingleHopOnly = _f[1];
	// const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
	// const { onChangeRecipient } = useSwapActionHandlers()
	var t = useTranslation().t;
	if (showConfirmExpertModal) {
		return (jsx(Modal, __assign({ title: t('Are you sure?'), onBack: function () { return setShowConfirmExpertModal(false); }, onDismiss: onDismiss, style: { maxWidth: '420px' } }, {
			children: jsxs(ModalBody, {
				children: [jsx(Message, __assign({ variant: "warning", mb: "24px" }, { children: jsx(Text, { children: t("Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.") }, void 0) }), void 0), jsx(Text, __assign({ mb: "24px" }, { children: t('Only use this mode if you know what you’re doing.') }), void 0), jsx(Button, __assign({
					variant: "danger", id: "confirm-expert-mode", onClick: function () {
						// eslint-disable-next-line no-alert
						if (window.prompt("Please type the word \"confirm\" to enable expert mode.") === 'confirm') {
							// toggleExpertMode()
							setShowConfirmExpertModal(false);
						}
					}
				}, { children: t('Turn On Expert Mode') }), void 0)]
			}, void 0)
		}), void 0));
	}
	return (jsx(Modal, __assign({ title: t('Settings'), headerBackground: "gradients.cardHeader", onDismiss: onDismiss }, { children: jsx(ModalBody, { children: jsx(AutoColumn, __assign({ gap: "md" }, { children: jsx(SlippageTabs, { rawSlippage: userSlippageTolerance, setRawSlippage: setUserslippageTolerance, deadline: ttl, setDeadline: setTtl, userUsePoly: userUsePoly, setUserUsePoly: setUserUsePoly, singleHopOnly: singleHopOnly, setSingleHopOnly: setSingleHopOnly }, void 0) }), void 0) }, void 0) }), void 0));
};

function SettingsTab() {
	var _a = __read(useModal(jsx(SettingsModal, {}, void 0)), 1), onPresentSettingsModal = _a[0];
	var _b = __read(useExpertModeManager(), 1), expertMode = _b[0];
	return (jsx(NotificationDot, __assign({ show: expertMode }, { children: jsx(Button, __assign({ variant: "text", p: 0, onClick: onPresentSettingsModal, id: "open-settings-dialog-button" }, { children: jsx(Icon$F, { color: "primary", width: "32px" }, void 0) }), void 0) }), void 0));
}

// helper that can take a ethers library transaction response and add it to the list of transactions
function useTransactionAdder() {
	var _a = useActiveWeb3React(), chainId = _a.chainId, account = _a.account;
	var dispatch = useDispatch();
	return useCallback(function (response, _a) {
		var _b = _a === void 0 ? {} : _a, summary = _b.summary, approval = _b.approval, claim = _b.claim;
		if (!account)
			return;
		if (!chainId)
			return;
		var hash = response.hash;
		if (!hash) {
			throw Error('No transaction hash found.');
		}
		dispatch(addTransaction({ hash: hash, from: account, chainId: chainId, approval: approval, summary: summary, claim: claim }));
	}, [dispatch, chainId, account]);
}
// returns all the transactions for the current chain
function useAllTransactions() {
	var _a;
	var chainId = useActiveWeb3React().chainId;
	var state = useSelector(function (s) { return s.transactions; });
	return chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {};
}
/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
function isTransactionRecent(tx) {
	return new Date().getTime() - tx.addedTime < 86400000;
}
// returns whether a token has a pending approval transaction
function useHasPendingApproval(tokenAddress, spender) {
	var allTransactions = useAllTransactions();
	return useMemo(function () {
		return typeof tokenAddress === 'string' &&
			typeof spender === 'string' &&
			Object.keys(allTransactions).some(function (hash) {
				var tx = allTransactions[hash];
				if (!tx)
					return false;
				if (tx.receipt) {
					return false;
				}
				var approval = tx.approval;
				if (!approval)
					return false;
				return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx);
			});
	}, [allTransactions, spender, tokenAddress]);
}

var TransactionState = styled.div(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  text-decoration: none !important;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0rem;\n  font-weight: 500;\n  font-size: 0.825rem;\n  color: ", ";\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  text-decoration: none !important;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0rem;\n  font-weight: 500;\n  font-size: 0.825rem;\n  color: ", ";\n"])), function (_a) {
	var theme = _a.theme;
	return theme.colors.primary;
});
var IconWrapper = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (_a) {
	var pending = _a.pending, success = _a.success, theme = _a.theme;
	return pending ? theme.colors.primary : success ? theme.colors.success : theme.colors.failure;
});
function Transaction(_a) {
	var _b, _c;
	var tx = _a.tx;
	var chainId = useActiveWeb3React().chainId;
	var summary = tx === null || tx === void 0 ? void 0 : tx.summary;
	var pending = !(tx === null || tx === void 0 ? void 0 : tx.receipt);
	var success = !pending && tx && (((_b = tx.receipt) === null || _b === void 0 ? void 0 : _b.status) === 1 || typeof ((_c = tx.receipt) === null || _c === void 0 ? void 0 : _c.status) === 'undefined');
	if (!chainId)
		return null;
	return (jsxs(TransactionState, __assign({ pending: pending, success: success }, { children: [jsx(LinkExternal, __assign({ href: getBscScanLink(tx.hash, 'transaction', chainId) }, { children: summary !== null && summary !== void 0 ? summary : tx.hash }), void 0), jsx(IconWrapper, __assign({ pending: pending, success: success }, { children: pending ? jsx(CircleLoader, {}, void 0) : success ? jsx(Icon$J, { color: "success" }, void 0) : jsx(Icon$G, { color: "failure" }, void 0) }), void 0)] }), void 0));
}
var templateObject_1$3, templateObject_2$1;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a, b) {
	return b.addedTime - a.addedTime;
}
function renderTransactions(transactions) {
	return (jsx(Flex, __assign({ flexDirection: "column" }, {
		children: transactions.map(function (tx) {
			return jsx(Transaction, { tx: tx }, tx.hash + tx.addedTime);
		})
	}), void 0));
}
var TransactionsModal = function (_a) {
	var onDismiss = _a.onDismiss;
	var _b = useActiveWeb3React(), account = _b.account, chainId = _b.chainId;
	var dispatch = useDispatch();
	var allTransactions = useAllTransactions();
	var t = useTranslation().t;
	var sortedRecentTransactions = useMemo(function () {
		var txs = Object.values(allTransactions);
		return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
	}, [allTransactions]);
	var pending = sortedRecentTransactions.filter(function (tx) { return !tx.receipt; });
	var confirmed = sortedRecentTransactions.filter(function (tx) { return tx.receipt; });
	var clearAllTransactionsCallback = useCallback(function () {
		if (chainId)
			dispatch(clearAllTransactions({ chainId: chainId }));
	}, [dispatch, chainId]);
	return (jsx(Modal, __assign({ title: t('Recent Transactions'), headerBackground: "gradients.cardHeader", onDismiss: onDismiss }, { children: account && (jsx(ModalBody, { children: !!pending.length || !!confirmed.length ? (jsxs(Fragment, { children: [jsxs(AutoRow, __assign({ mb: "1rem", style: { justifyContent: 'space-between' } }, { children: [jsx(Text, { children: t('Recent Transactions') }, void 0), jsx(Button, __assign({ variant: "tertiary", scale: "xs", onClick: clearAllTransactionsCallback }, { children: t('clear all') }), void 0)] }), void 0), renderTransactions(pending), renderTransactions(confirmed)] }, void 0)) : (jsx(Text, { children: t('No recent transactions') }, void 0)) }, void 0)) }), void 0));
};

var Transactions = function () {
	var _a = __read(useModal(jsx(TransactionsModal, {}, void 0)), 1), onPresentTransactionsModal = _a[0];
	return (jsx(Fragment, { children: jsx(Button, __assign({ variant: "text", p: 0, onClick: onPresentTransactionsModal, ml: "16px" }, { children: jsx(Icon$C, { color: "primary", width: "32px" }, void 0) }), void 0) }, void 0));
};

var AppHeaderContainer = styled(Flex)(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  align-items: flex-end;\n  justify-content: space-between;\n  padding: 24px;\n  width: 100%;\n  /* box-shadow: ", "; */\n"], ["\n  align-items: flex-end;\n  justify-content: space-between;\n  padding: 24px;\n  width: 100%;\n  /* box-shadow: ", "; */\n"])), function (_a) {
	var theme = _a.theme;
	return theme.shadows.success;
});
var AppHeader = function (_a) {
	var title = _a.title, subtitle = _a.subtitle, helper = _a.helper, backTo = _a.backTo, hideSetting = _a.hideSetting, _b = _a.noConfig, noConfig = _b === void 0 ? false : _b;
	return (jsxs(AppHeaderContainer, { children: [jsxs(Flex, __assign({ alignItems: "center", mr: noConfig ? 0 : '16px' }, { children: [backTo && (jsx(IconButton, __assign({ as: Link$1, to: backTo }, { children: jsx(Icon$O, { color: 'primary', width: "32px" }, void 0) }), void 0)), jsxs(Flex, __assign({ alignContent: subtitle ? '' : 'center', justifyContent: subtitle ? '' : 'center', flexDirection: subtitle ? 'column' : 'row' }, { children: [jsx(Heading, __assign({ as: "h2", mb: subtitle ? '8px' : '0' }, { children: title }), void 0), jsxs(Flex, __assign({ alignItems: "center" }, { children: [helper && jsx(QuestionHelper, { placement: "top-start", text: helper, mr: "4px" }, void 0), jsx(Text, __assign({ ml: "0px", color: "text", fontSize: "14px" }, { children: subtitle }), void 0)] }), void 0)] }), void 0)] }), void 0), !noConfig && (jsxs(Flex, { children: [hideSetting ? null : jsx(SettingsTab, {}, void 0), jsx(Transactions, {}, void 0)] }, void 0))] }, void 0));
};
var templateObject_1$2;

var BodyWrapper = styled(Card$1)(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  max-width: 436px;\n  width: 100%;\n  z-index: 1;\n"], ["\n  max-width: 436px;\n  width: 100%;\n  z-index: 1;\n"
	/**
	 * The styled container element that wraps the content of most pages and the tabs.
	 */
])));
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
function AppBody(_a) {
	var children = _a.children;
	return jsx(BodyWrapper, { children: children }, void 0);
}
var templateObject_1$1;

var ConnectWallet = React.createContext({ onConnectWallet: null });
var ConnectWalletProvider = function (_a) {
	var children = _a.children, onConnectWallet = _a.onConnectWallet;
	return jsx(ConnectWallet.Provider, __assign({ value: { onConnectWallet: onConnectWallet } }, { children: children }), void 0);
};

var useConnectWallet = function () {
	var onConnectWallet = useContext(ConnectWallet).onConnectWallet;
	return { onConnectWallet: onConnectWallet };
};

var ConnectWalletButton = function (props) {
	var t = useTranslation().t;
	var onConnectWallet = useConnectWallet().onConnectWallet;
	return (jsx(Button, __assign({ onClick: onConnectWallet }, props, { children: t('Connect Wallet') }), void 0));
};

function useTokenAllowance(token, owner, spender) {
	var contract = useTokenContract(token === null || token === void 0 ? void 0 : token.address, false);
	var inputs = useMemo(function () { return [owner, spender]; }, [owner, spender]);
	var allowance = useSingleCallResult(contract, 'allowance', inputs).result;
	return useMemo(function () { return (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined); }, [token, allowance]);
}

var ApprovalState;
(function (ApprovalState) {
	ApprovalState[ApprovalState["UNKNOWN"] = 0] = "UNKNOWN";
	ApprovalState[ApprovalState["NOT_APPROVED"] = 1] = "NOT_APPROVED";
	ApprovalState[ApprovalState["PENDING"] = 2] = "PENDING";
	ApprovalState[ApprovalState["APPROVED"] = 3] = "APPROVED";
})(ApprovalState || (ApprovalState = {}));
// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveCallback(amountToApprove, spender) {
	var _this = this;
	var account = useActiveWeb3React().account;
	var token = amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined;
	var currentAllowance = useTokenAllowance(token, account !== null && account !== void 0 ? account : undefined, spender);
	var pendingApproval = useHasPendingApproval(token === null || token === void 0 ? void 0 : token.address, spender);
	// check the current approval status
	var t = useTranslation().t;
	var approvalState = useMemo(function () {
		if (!amountToApprove || !spender)
			return ApprovalState.UNKNOWN;
		if (amountToApprove.currency === ETHER)
			return ApprovalState.APPROVED;
		// we might not have enough data to know whether or not we need to approve
		if (!currentAllowance)
			return ApprovalState.UNKNOWN;
		// amountToApprove will be defined if currentAllowance is
		return currentAllowance.lessThan(amountToApprove)
			? pendingApproval
				? ApprovalState.PENDING
				: ApprovalState.NOT_APPROVED
			: ApprovalState.APPROVED;
	}, [amountToApprove, currentAllowance, pendingApproval, spender]);
	var tokenContract = useTokenContract(token === null || token === void 0 ? void 0 : token.address);
	var addTransaction = useTransactionAdder();
	var approve = useCallback(function () {
		return __awaiter(_this, void 0, void 0, function () {
			var useExact, estimatedGas;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						if (approvalState !== ApprovalState.NOT_APPROVED) {
							console.error('approve was called unnecessarily');
							return [2 /*return*/];
						}
						if (!token) {
							console.error('no token');
							return [2 /*return*/];
						}
						if (!tokenContract) {
							console.error('tokenContract is null');
							return [2 /*return*/];
						}
						if (!amountToApprove) {
							console.error('missing amount to approve');
							return [2 /*return*/];
						}
						if (!spender) {
							console.error('no spender');
							return [2 /*return*/];
						}
						useExact = false;
						return [4 /*yield*/, tokenContract.estimateGas.approve(spender, MaxUint256).catch(function () {
							// general fallback for tokens who restrict approval amounts
							useExact = true;
							return tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString());
						})
							// eslint-disable-next-line consistent-return
						];
					case 1:
						estimatedGas = _a.sent();
						// eslint-disable-next-line consistent-return
						return [2 /*return*/, tokenContract
							.approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
								gasLimit: calculateGasMargin(estimatedGas),
							})
							.then(function (response) {
								addTransaction(response, {
									summary: t('Approve') + " " + amountToApprove.currency.symbol,
									approval: { tokenAddress: token.address, spender: spender },
								});
							})
							.catch(function (error) {
								console.error('Failed to approve token', error);
								throw error;
							})];
				}
			});
		});
	}, [approvalState, t, token, tokenContract, amountToApprove, spender, addTransaction]);
	return [approvalState, approve];
}
// wraps useApproveCallback in the context of a swap
function useApproveCallbackFromTrade(trade, allowedSlippage) {
	if (allowedSlippage === void 0) { allowedSlippage = 0; }
	var amountToApprove = useMemo(function () { return (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field$2.INPUT] : undefined); }, [trade, allowedSlippage]);
	return useApproveCallback(amountToApprove, getValueWithChainId(contracts.SwapRouter));
}
// wraps useApproveCallback in the context of a swap
function useApproveCallbackPolyTrade(currencyAmount, spender) {
	return useApproveCallback(currencyAmount, spender);
}

// gets the current timestamp from the blockchain
function useCurrentBlockTimestamp() {
	var _a, _b;
	var multicall = useMulticallContract();
	return (_b = (_a = useSingleCallResult(multicall, 'getCurrentBlockTimestamp')) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
}

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
function useTransactionDeadline() {
	var ttl = useSelector(function (state) { return state.user.userDeadline; });
	var blockTimestamp = useCurrentBlockTimestamp();
	return useMemo(function () {
		if (blockTimestamp && ttl) {
			return blockTimestamp.add(ttl);
		}
		return undefined;
	}, [blockTimestamp, ttl]);
}

var SwapCallbackState;
(function (SwapCallbackState) {
	SwapCallbackState[SwapCallbackState["INVALID"] = 0] = "INVALID";
	SwapCallbackState[SwapCallbackState["LOADING"] = 1] = "LOADING";
	SwapCallbackState[SwapCallbackState["VALID"] = 2] = "VALID";
})(SwapCallbackState || (SwapCallbackState = {}));
/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
function useSwapCallArguments(trade, // trade to execute, required
	allowedSlippage, // in bips
	recipientAddressOrName) {
	if (allowedSlippage === void 0) { allowedSlippage = INITIAL_ALLOWED_SLIPPAGE; }
	var _a = useActiveWeb3React(), account = _a.account, chainId = _a.chainId, library = _a.library;
	var recipientAddress = useENS(recipientAddressOrName).address;
	var recipient = recipientAddressOrName === null ? account : recipientAddress;
	var deadline = useTransactionDeadline();
	return useMemo(function () {
		var _a, _b, _c;
		if (!trade || !recipient || !library || !account || !chainId || !deadline)
			return [];
		var contract = getRouterContract(chainId, library, account);
		if (!contract) {
			return [];
		}
		var isDsgFrom = false;
		if (((_a = SWAP_TOKEN[chainId]) === null || _a === void 0 ? void 0 : _a.address) === ((_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.address) && trade.tradeType === TradeType.EXACT_OUTPUT) {
			isDsgFrom = true;
		}
		var swapMethods = [];
		swapMethods.push(Router.swapCallParameters(trade, {
			feeOnTransfer: false,
			isDsgFrom: isDsgFrom,
			allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
			recipient: recipient,
			deadline: deadline.toNumber(),
		}));
		if (trade.tradeType === TradeType.EXACT_INPUT) {
			swapMethods.push(Router.swapCallParameters(trade, {
				feeOnTransfer: true,
				allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
				recipient: recipient,
				deadline: deadline.toNumber(),
			}));
		}
		return swapMethods.map(function (parameters) { return ({ parameters: parameters, contract: contract }); });
	}, [account, allowedSlippage, chainId, deadline, library, recipient, trade]);
}
// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
function useSwapCallback(trade, // trade to execute, required
	allowedSlippage, // in bips
	recipientAddressOrName) {
	if (allowedSlippage === void 0) { allowedSlippage = INITIAL_ALLOWED_SLIPPAGE; }
	var _a = useActiveWeb3React(), account = _a.account, chainId = _a.chainId, library = _a.library;
	var t = useTranslation().t;
	var swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName);
	var addTransaction = useTransactionAdder();
	var recipientAddress = useENS(recipientAddressOrName).address;
	var recipient = recipientAddressOrName === null ? account : recipientAddress;
	return useMemo(function () {
		if (!trade || !library || !account || !chainId) {
			return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' };
		}
		if (!recipient) {
			if (recipientAddressOrName !== null) {
				return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' };
			}
			return { state: SwapCallbackState.LOADING, callback: null, error: null };
		}
		return {
			state: SwapCallbackState.VALID,
			callback: function onSwap() {
				return __awaiter(this, void 0, void 0, function () {
					var estimatedCalls, successfulEstimation, errorCalls, _a, contract, _b, methodName, args, value;
					return __generator(this, function (_c) {
						switch (_c.label) {
							case 0: return [4 /*yield*/, Promise.all(swapCalls.map(function (call) {
								var _a;
								var _b = call.parameters, methodName = _b.methodName, args = _b.args, value = _b.value, contract = call.contract;
								var options = !value || isZero(value) ? {} : { value: value };
								return (_a = contract.estimateGas)[methodName].apply(_a, __spreadArray(__spreadArray([], __read(args)), [options])).then(function (gasEstimate) {
									return {
										call: call,
										gasEstimate: gasEstimate,
									};
								})
									.catch(function (gasError) {
										var _a;
										console.error('Gas estimate failed, trying eth_call to extract error', call);
										return (_a = contract.callStatic)[methodName].apply(_a, __spreadArray(__spreadArray([], __read(args)), [options])).then(function (result) {
											console.error('Unexpected successful call after failed estimate gas', call, gasError, result);
											return { call: call, error: new Error('Unexpected issue with estimating the gas. Please try again.') };
										})
											.catch(function (callError) {
												var _a;
												console.error('Call threw error', call, callError);
												var reason = callError.reason || ((_a = callError.data) === null || _a === void 0 ? void 0 : _a.message) || callError.message;
												var errorMessage = "The transaction cannot succeed due to error: " + (reason !== null && reason !== void 0 ? reason : 'Unknown error, check the logs') + ".";
												return { call: call, error: new Error(errorMessage) };
											});
									});
							}))
								// a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
							];
							case 1:
								estimatedCalls = _c.sent();
								successfulEstimation = estimatedCalls.find(function (el, ix, list) {
									return 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]);
								});
								if (!successfulEstimation) {
									errorCalls = estimatedCalls.filter(function (call) { return 'error' in call; });
									if (errorCalls.length > 0)
										throw errorCalls[errorCalls.length - 1].error;
									throw new Error('Unexpected error. Please contact support: none of the calls threw an error');
								}
								_a = successfulEstimation.call, contract = _a.contract, _b = _a.parameters, methodName = _b.methodName, args = _b.args, value = _b.value;
								return [2 /*return*/, contract[methodName].apply(contract, __spreadArray(__spreadArray([], __read(args)), [__assign({
									// gasLimit: calculateGasMargin(gasEstimate),
									// swap gasLimit
									gasLimit: 1530000
								}, (value && !isZero(value) ? { value: value, from: account } : { from: account }))])).then(function (response) {
									var inputSymbol = trade.inputAmount.currency.symbol;
									var outputSymbol = trade.outputAmount.currency.symbol;
									var inputAmount = trade.inputAmount.toSignificant(3);
									var outputAmount = trade.outputAmount.toSignificant(3);
									var base = "Swap " + inputAmount + " " + inputSymbol + " for " + outputAmount + " " + outputSymbol;
									var withRecipient = recipient === account
										? base
										: base + " to " + (recipientAddressOrName && isAddress(recipientAddressOrName)
											? shortenAddress(recipientAddressOrName)
											: recipientAddressOrName);
									addTransaction(response, {
										summary: withRecipient,
									});
									return response.hash;
								})
									.catch(function (error) {
										// if the user rejected the tx, pass this along
										if ((error === null || error === void 0 ? void 0 : error.code) === 4001) {
											throw new Error(t('Transaction rejected.'));
										}
										else {
											// otherwise, the error was unexpected and we need to convey that
											console.error("Swap failed", error, methodName, args, value);
											throw new Error("Swap failed: " + error.message);
										}
									})];
						}
					});
				});
			},
			error: null,
		};
	}, [trade, library, account, t, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction]);
}

function usePolySwap(polyData, trade, showWrap) {
	var chainId = useWeb3React().chainId;
	var polyCurrencyData = useMemo(function () {
		var price = null;
		var currencyAmount = null;
		var toTokenAmount = null;
		var fromCurrencyToken = null;
		var fromCurrencyTokenAmount = null;
		if (polyData) {
			price = new Price$1(polyData.fromToken, polyData.toToken, polyData.fromTokenAmount, polyData.toTokenAmount);
			var currency = new Token$1(chainId, polyData.fromToken.address, polyData.fromToken.decimals, polyData.fromToken.symbol);
			currencyAmount = new TokenAmount(currency, JSBI.BigInt(polyData.fromTokenAmount));
			//  CurrencyAmount.ether(JSBI.BigInt(polyData.fromTokenAmount))
			var toToken = new Token$1(chainId, polyData.toToken.address, polyData.toToken.decimals, polyData.toToken.symbol);
			toTokenAmount = new TokenAmount(toToken, JSBI.BigInt(polyData.toTokenAmount));
			// toTokenAmount = CurrencyAmount.ether(JSBI.BigInt(polyData.toTokenAmount))
			fromCurrencyToken = new Token$1(ChainId$1.MAINNET, polyData.fromToken.address, polyData.fromToken.decimals, polyData.fromToken.symbol, polyData.fromToken.name);
			fromCurrencyTokenAmount = new TokenAmount(fromCurrencyToken, JSBI.BigInt(polyData.fromTokenAmount));
		}
		return {
			price: price,
			currencyAmount: currencyAmount,
			fromCurrencyTokenAmount: fromCurrencyTokenAmount,
			fromCurrencyToken: fromCurrencyToken,
			toTokenAmount: toTokenAmount
		};
	}, [polyData, chainId]);
	var isPolyMethed = useMemo(function () {
		var _a;
		if (showWrap)
			return false;
		if (!polyData)
			return false;
		if (!trade)
			return true;
		return !!((_a = trade === null || trade === void 0 ? void 0 : trade.executionPrice) === null || _a === void 0 ? void 0 : _a.lessThan(polyCurrencyData === null || polyCurrencyData === void 0 ? void 0 : polyCurrencyData.price));
	}, [polyData, polyCurrencyData, trade, showWrap]);
	var polyDataRes = __assign(__assign({}, polyData), { isPolyMethed: isPolyMethed, price: polyCurrencyData.price, currencyAmount: polyCurrencyData.currencyAmount, fromCurrencyTokenAmount: polyCurrencyData.fromCurrencyTokenAmount, fromCurrencyToken: polyCurrencyData.fromCurrencyToken, toCurrencyAmount: polyCurrencyData.toTokenAmount });
	return {
		polyData: polyDataRes,
	};
}

var supportChainIds = [
	1,
	56,
	137,
	10,
	42161,
];
var isSupportChainId = function (chainId) {
	return supportChainIds.includes(Number(chainId));
};
var ETHER_1INCH_ADDRESS = {
	1: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	56: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	137: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	// 10,
	// 42161,
};

axios.defaults.timeout = 30 * 1000;
axios.defaults.withCredentials = false;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get.Accept = 'application/json';
function resetConfig(config) {
	var resConfig = __assign({}, config);
	if (resConfig.noLang)
		return resConfig;
	if (!resConfig.data) {
		resConfig.data = {};
	}
	if (!resConfig.params) {
		resConfig.params = {};
	}
	return resConfig;
}
var request = axios.create();
request.interceptors.request.use(function (config) {
	return resetConfig(config);
}, function (error) { return Promise.reject(error); });
// Add a response interceptor
request.interceptors.response.use(function (response) {
	return response.data;
}, function (error) {
	return Promise.reject(error);
});

var get1inch = function (url, params) {
	return request({
		url: url,
		params: params,
		method: 'get',
		withCredentials: false,
		baseURL: getValueWithChainId(POLY_BASE_URL),
	});
};
var get1inchQuoteData = function (chainId, data) { return get1inch("/" + chainId + "/quote", data); };
var get1inchSwapData = function (chainId, data) { return get1inch("/" + chainId + "/swap", data); };
var get1inchApproveSpender = function (chainId, data) { return get1inch("/" + chainId + "/approve/spender", data); };

var multicall$1 = function (abi, calls) {
	return __awaiter(void 0, void 0, void 0, function () {
		var multi, itf_1, calldata, returnData, res, error_1;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 2, , 3]);
					multi = getMulticallContract();
					itf_1 = new ethers.utils.Interface(abi);
					calldata = calls.map(function (call) { return [call.address.toLowerCase(), itf_1.encodeFunctionData(call.name, call.params)]; });
					return [4 /*yield*/, multi.aggregate(calldata)];
				case 1:
					returnData = (_a.sent()).returnData;
					res = returnData.map(function (call, i) { return itf_1.decodeFunctionResult(calls[i].name, call); });
					return [2 /*return*/, res];
				case 2:
					error_1 = _a.sent();
					// console.error(error)
					// return null
					throw new Error(error_1);
				case 3: return [2 /*return*/];
			}
		});
	});
};

var fetchPolyQuoteData = function (chanId, data) {
	if (!isSupportChainId(chanId))
		return null;
	try {
		return get1inchQuoteData(chanId, data);
	}
	catch (error) {
		console.error(error);
		return null;
	}
};
var fetchSpenderAddress = function (chanId) {
	return __awaiter(void 0, void 0, void 0, function () {
		var address, error_1;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					if (!isSupportChainId(chanId))
						return [2 /*return*/, null];
					_a.label = 1;
				case 1:
					_a.trys.push([1, 3, , 4]);
					return [4 /*yield*/, get1inchApproveSpender(chanId)];
				case 2:
					address = (_a.sent()).address;
					return [2 /*return*/, address];
				case 3:
					error_1 = _a.sent();
					console.error(error_1);
					return [2 /*return*/, ''];
				case 4: return [2 /*return*/];
			}
		});
	});
};
var fetchAllowancceAmount = function (spender, account, tokenAddress) {
	return __awaiter(void 0, void 0, void 0, function () {
		var calls, _a, allowance, error_2;
		return __generator(this, function (_b) {
			switch (_b.label) {
				case 0:
					_b.trys.push([0, 2, , 3]);
					calls = [
						{
							address: spender,
							name: 'allowance',
							params: [account, tokenAddress],
						}
					];
					return [4 /*yield*/, multicall$1(Erc20Abi, calls)];
				case 1:
					_a = __read.apply(void 0, [_b.sent(), 1]), allowance = _a[0];
					return [2 /*return*/, allowance[0].toJSON().hex];
				case 2:
					error_2 = _b.sent();
					console.error(error_2);
					return [2 /*return*/, '0'];
				case 3: return [2 /*return*/];
			}
		});
	});
};

var _a$1;
var initialState$8 = (_a$1 = {
	independentField: Field$2.INPUT,
	typedValue: ''
},
	_a$1[Field$2.INPUT] = {
		currencyId: '',
	},
	_a$1[Field$2.OUTPUT] = {
		currencyId: '',
	},
	_a$1.recipient = null,
	_a$1.polyDataIndex = {
		lastQueryTimestamp: 0,
	},
	_a$1);
// Async thunks
var fetchPolySwapDataAsync = createAsyncThunk('swap/fetchPolySwapDataAsync', function (_a) {
	var chainId = _a.chainId, polyQueryData = _a.polyQueryData;
	return __awaiter(void 0, void 0, void 0, function () {
		var res;
		return __generator(this, function (_b) {
			switch (_b.label) {
				case 0: return [4 /*yield*/, fetchPolyQuoteData(chainId, polyQueryData)];
				case 1:
					res = _b.sent();
					return [2 /*return*/, res];
			}
		});
	});
});
var fetchPolyAllowaceAsync = createAsyncThunk('swap/fetchSpenderAddressAsync', function (_a, _b) {
	var chainId = _a.chainId, account = _a.account, tokenAddress = _a.tokenAddress;
	var getState = _b.getState;
	return __awaiter(void 0, void 0, void 0, function () {
		var swap, spender, allowance;
		return __generator(this, function (_c) {
			switch (_c.label) {
				case 0:
					swap = getState().swap;
					spender = swap.polySpender;
					if (!!spender) return [3 /*break*/, 2];
					return [4 /*yield*/, fetchSpenderAddress(chainId)];
				case 1:
					spender = _c.sent();
					_c.label = 2;
				case 2: return [4 /*yield*/, fetchAllowancceAmount(spender, account, tokenAddress)];
				case 3:
					allowance = _c.sent();
					return [2 /*return*/, {
						spender: spender,
						allowance: {
							tokenAddress: tokenAddress,
							allowance: allowance,
						},
					}];
			}
		});
	});
});
var fetchPolySpenderAsync = createAsyncThunk('swap/fetchPolySpenderAsync', function (chainId, _a) {
	var getState = _a.getState;
	return __awaiter(void 0, void 0, void 0, function () {
		var swap, spender;
		return __generator(this, function (_b) {
			switch (_b.label) {
				case 0:
					swap = getState().swap;
					spender = swap.polySpender;
					if (!!spender) return [3 /*break*/, 2];
					return [4 /*yield*/, fetchSpenderAddress(chainId)];
				case 1:
					spender = _b.sent();
					_b.label = 2;
				case 2: return [2 /*return*/, spender];
			}
		});
	});
});
// export const fetchPolyAllowaceAsync = createAsyncThunk<PolyData, { chainId: number, polyQueryData: PolyDataIndex } >(
//   'swap/fetchPolySwapDataAsync',
//   async ({ chainId, polyQueryData }) => {
//     const res: PolyData = await get1inchSwapData(chainId, polyQueryData)
//     return res
//   },
// )
var swap = createReducer(initialState$8, function (builder) {
	return builder
		.addCase(replaceSwapState, function (state, _a) {
			var _b;
			var _c = _a.payload, typedValue = _c.typedValue, recipient = _c.recipient, field = _c.field, inputCurrencyId = _c.inputCurrencyId, outputCurrencyId = _c.outputCurrencyId;
			return __assign(__assign({}, state), (_b = {}, _b[Field$2.INPUT] = {
				currencyId: inputCurrencyId,
			}, _b[Field$2.OUTPUT] = {
				currencyId: outputCurrencyId,
			}, _b.independentField = field, _b.typedValue = typedValue, _b.recipient = recipient, _b));
		})
		.addCase(selectCurrency, function (state, _a) {
			var _b, _c;
			var _d = _a.payload, currencyId = _d.currencyId, field = _d.field;
			var otherField = field === Field$2.INPUT ? Field$2.OUTPUT : Field$2.INPUT;
			if (currencyId === state[otherField].currencyId) {
				// the case where we have to swap the order
				return __assign(__assign({}, state), (_b = { independentField: state.independentField === Field$2.INPUT ? Field$2.OUTPUT : Field$2.INPUT }, _b[field] = { currencyId: currencyId }, _b[otherField] = { currencyId: state[field].currencyId }, _b));
			}
			// the normal case
			return __assign(__assign({}, state), (_c = {}, _c[field] = { currencyId: currencyId }, _c));
		})
		.addCase(switchCurrencies, function (state) {
			var _a;
			return __assign(__assign({}, state), (_a = { independentField: state.independentField === Field$2.INPUT ? Field$2.OUTPUT : Field$2.INPUT }, _a[Field$2.INPUT] = { currencyId: state[Field$2.OUTPUT].currencyId }, _a[Field$2.OUTPUT] = { currencyId: state[Field$2.INPUT].currencyId }, _a));
		})
		.addCase(typeInput$2, function (state, _a) {
			var _b = _a.payload, field = _b.field, typedValue = _b.typedValue;
			return __assign(__assign({}, state), { independentField: field, typedValue: typedValue });
		})
		.addCase(setRecipient, function (state, _a) {
			var recipient = _a.payload.recipient;
			state.recipient = recipient;
		})
		.addCase(updatePolyDataIndex, function (state, _a) {
			var payload = _a.payload;
			state.polyDataIndex = __assign(__assign({}, state.polyDataIndex), payload.data);
		})
		.addCase(resetPolyData, function (state) {
			state.polyData = null;
		})
		.addCase(fetchPolyAllowaceAsync.fulfilled, function (state, _a) {
			var payload = _a.payload;
			var spender = payload.spender, allowance = payload.allowance;
			var allowanceString = allowance.allowance, tokenAddress = allowance.tokenAddress;
			state.polySpender = spender;
			state.polyAllowance[tokenAddress] = allowanceString;
		})
		.addCase(fetchPolySpenderAsync.fulfilled, function (state, _a) {
			var payload = _a.payload;
			state.polySpender = payload;
		})
		.addCase(fetchPolySwapDataAsync.fulfilled, function (state, _a) {
			var payload = _a.payload;
			state.polyData = payload;
		});
});

var PolyDataIndexStatus;
(function (PolyDataIndexStatus) {
	PolyDataIndexStatus[PolyDataIndexStatus["NOT_SWAP_DATA"] = 0] = "NOT_SWAP_DATA";
	PolyDataIndexStatus[PolyDataIndexStatus["NEED_QUERY"] = 1] = "NEED_QUERY";
	PolyDataIndexStatus[PolyDataIndexStatus["NEED_REFRESH"] = 2] = "NEED_REFRESH";
	PolyDataIndexStatus[PolyDataIndexStatus["LOADED"] = 3] = "LOADED";
})(PolyDataIndexStatus || (PolyDataIndexStatus = {}));

// ETHER_1INCH_ADDRESS
var POLY_REFRESH_INTERVAL = 10 * 1000;
var POLY_MAX_SLIPPAGE = 50;
var currentTimestamp$1 = function () { return new Date().getTime(); };
function useSwapState() {
	return useSelector(function (state) { return state.swap; });
}
function useSwapActionHandlers() {
	var dispatch = useDispatch();
	var onCurrencySelection = useCallback(function (field, currency) {
		dispatch(selectCurrency({
			field: field,
			currencyId: currency instanceof Token$1 ? currency.address : currency === ETHER ? ETHER.symbol : '',
		}));
	}, [dispatch]);
	var onSwitchTokens = useCallback(function () {
		dispatch(switchCurrencies());
	}, [dispatch]);
	var onUserInput = useCallback(function (field, typedValue) {
		dispatch(typeInput$2({ field: field, typedValue: typedValue }));
	}, [dispatch]);
	var onChangeRecipient = useCallback(function (recipient) {
		dispatch(setRecipient({ recipient: recipient }));
	}, [dispatch]);
	return {
		onSwitchTokens: onSwitchTokens,
		onCurrencySelection: onCurrencySelection,
		onUserInput: onUserInput,
		onChangeRecipient: onChangeRecipient,
	};
}
// try to parse a user entered amount for a given token
function tryParseAmount(value, currency) {
	if (!value || !currency) {
		return undefined;
	}
	try {
		var typedValueParsed = parseUnits(value, currency.decimals).toString();
		if (typedValueParsed !== '0') {
			return currency instanceof Token$1
				? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
				: CurrencyAmount.ether(JSBI.BigInt(typedValueParsed));
		}
	}
	catch (error) {
		// should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
		console.debug("Failed to parse input amount: \"" + value + "\"", error);
	}
	// necessary for all paths to return a value
	return undefined;
}
var BAD_RECIPIENT_ADDRESSES = [
	'0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
	'0xf164fC0Ec4E93095b804a4795bBe1e041497b92a',
	'0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
	'0x89f1DeC8297eF2cBB47a4894089E5f6aa2888c44',
];
/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(trade, checksummedAddress) {
	return (trade.route.path.some(function (token) { return token.address === checksummedAddress; }) ||
		trade.route.pairs.some(function (pair) { return pair.liquidityToken.address === checksummedAddress; }));
}
function useCheckUpdatePolyIndex() {
	var _a = useActiveWeb3React(), account = _a.account, chainId = _a.chainId;
	var polyDataIndex = useSwapState().polyDataIndex;
	var _b = __read(useUserUsePoly(), 1), userUsePoly = _b[0];
	var dispatch = useDispatch();
	var _c = useSwapState(), independentField = _c.independentField, typedValue = _c.typedValue, _d = Field$2.INPUT, inputCurrencyId = _c[_d].currencyId, _e = Field$2.OUTPUT, outputCurrencyId = _c[_e].currencyId; _c.recipient;
	var _f = __read(useUserSlippageTolerance(), 1), allowedSlippage = _f[0];
	var inputCurrency = useCurrency(inputCurrencyId);
	var outputCurrency = useCurrency(outputCurrencyId);
	var debouncedValue = useDebounce(typedValue, 300);
	if (!chainId || !outputCurrency || !outputCurrency || !Number(debouncedValue) || !userUsePoly)
		return [PolyDataIndexStatus.NOT_SWAP_DATA, null];
	if ((inputCurrency === ETHER || outputCurrency === ETHER) && currencyEquals(WETHER[chainId], outputCurrency)) {
		return [PolyDataIndexStatus.NOT_SWAP_DATA, null];
	}
	var isExactIn = independentField === Field$2.INPUT;
	if (!isExactIn)
		return [PolyDataIndexStatus.NOT_SWAP_DATA, null];
	var slippage = allowedSlippage > POLY_MAX_SLIPPAGE ? POLY_MAX_SLIPPAGE : allowedSlippage;
	var data = {
		slippage: slippage,
		lastQueryTimestamp: polyDataIndex === null || polyDataIndex === void 0 ? void 0 : polyDataIndex.lastQueryTimestamp,
		fromTokenAddress: inputCurrency === ETHER ? ETHER_1INCH_ADDRESS[chainId] : inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.address,
		toTokenAddress: outputCurrency === ETHER ? ETHER_1INCH_ADDRESS[chainId] : outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.address,
		amount: debouncedValue,
		amountDecimal: getDecimalAmount(new BigNumber$1(debouncedValue), inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.decimals).toString(),
		fromAddress: account,
	};
	var timestamp = currentTimestamp$1();
	if (!isEqual(data, polyDataIndex)) {
		dispatch(resetPolyData());
		dispatch(updatePolyDataIndex({ data: __assign(__assign({}, data), { lastQueryTimestamp: timestamp }) }));
		return [PolyDataIndexStatus.NEED_REFRESH, data];
	}
	if (timestamp - (polyDataIndex === null || polyDataIndex === void 0 ? void 0 : polyDataIndex.lastQueryTimestamp) > POLY_REFRESH_INTERVAL) {
		dispatch(updatePolyDataIndex({ data: __assign(__assign({}, data), { lastQueryTimestamp: timestamp }) }));
		return [PolyDataIndexStatus.NEED_REFRESH, data];
	}
	return [PolyDataIndexStatus.LOADED, data];
}
// from the current swap inputs, compute the best trade and return it.
function useDerivedSwapInfo() {
	var _a, _b;
	var _c, _d;
	var _e = useActiveWeb3React(), account = _e.account, chainId = _e.chainId;
	var t = useTranslation().t;
	var dispatch = useDispatch();
	var _f = useSwapState(), independentField = _f.independentField, typedValue = _f.typedValue, _g = Field$2.INPUT, inputCurrencyId = _f[_g].currencyId, _h = Field$2.OUTPUT, outputCurrencyId = _f[_h].currencyId, recipient = _f.recipient;
	var inputCurrency = useCurrency(inputCurrencyId);
	var outputCurrency = useCurrency(outputCurrencyId);
	var recipientLookup = useENS(recipient !== null && recipient !== void 0 ? recipient : undefined);
	var to = (_c = (recipient === null ? account : recipientLookup.address)) !== null && _c !== void 0 ? _c : null;
	var relevantTokenBalances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, [
		inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined,
		outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined,
	]);
	var isExactIn = independentField === Field$2.INPUT;
	var parsedAmount = tryParseAmount(typedValue, (_d = (isExactIn ? inputCurrency : outputCurrency)) !== null && _d !== void 0 ? _d : undefined);
	var bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined);
	var bestTradeExactOut = useTradeExactOut(inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, !isExactIn ? parsedAmount : undefined);
	var _j = __read(usePair(inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined), 1), pairStateIn = _j[0];
	var _k = __read(usePair(inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined), 1), pairStateOut = _k[0];
	// const bestPolyTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined, true)
	// const bestPolyTradeExactOut = useTradeExactOut(
	//   inputCurrency ?? undefined,
	//   !isExactIn ? parsedAmount : undefined,
	//   true,
	// )
	var v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut;
	// const v2TradePoly = isExactIn ? bestPolyTradeExactIn : bestPolyTradeExactOut
	var pairState = isExactIn ? pairStateIn : pairStateOut;
	// let polyPairs = null
	// if (v2TradePoly?.route?.pairs?.length === 1) {
	//   polyPairs = v2TradePoly.route.pairs[0]
	// }
	var currencyBalances = (_a = {},
		_a[Field$2.INPUT] = relevantTokenBalances[0],
		_a[Field$2.OUTPUT] = relevantTokenBalances[1],
		_a);
	var currencies = (_b = {},
		_b[Field$2.INPUT] = inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined,
		_b[Field$2.OUTPUT] = outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined,
		_b);
	var inputError;
	if (!account) {
		inputError = t('Connect Wallet');
	}
	if (!parsedAmount) {
		inputError = inputError !== null && inputError !== void 0 ? inputError : t('Enter an amount');
	}
	if (!currencies[Field$2.INPUT] || !currencies[Field$2.OUTPUT]) {
		inputError = inputError !== null && inputError !== void 0 ? inputError : t('Select a token');
	}
	var formattedTo = isAddress(to);
	if (!to || !formattedTo) {
		inputError = inputError !== null && inputError !== void 0 ? inputError : t('Enter a recipient');
	}
	else if (BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1 ||
		(bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
		(bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))) {
		inputError = inputError !== null && inputError !== void 0 ? inputError : t('Invalid recipient');
	}
	var _l = __read(useUserSlippageTolerance(), 1), allowedSlippage = _l[0];
	var _m = __read(useSystemUsePoly(), 1); _m[0];
	var slippageAdjustedAmounts = v2Trade && allowedSlippage && computeSlippageAdjustedAmounts(v2Trade, allowedSlippage);
	// compare input balance to max input based on version
	var _o = __read([
		currencyBalances[Field$2.INPUT],
		slippageAdjustedAmounts ? slippageAdjustedAmounts[Field$2.INPUT] : null,
	], 2), balanceIn = _o[0], amountIn = _o[1];
	if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
		inputError = t('Insufficient %symbol% balance', { symbol: amountIn.currency.symbol });
	}
	var _p = __read(useCheckUpdatePolyIndex(), 2), checkUpdatePolyIndex = _p[0], polyIndex = _p[1];
	if (checkUpdatePolyIndex === PolyDataIndexStatus.NEED_REFRESH && !inputError) {
		var polyQueryData = __assign(__assign({}, polyIndex), { amount: polyIndex === null || polyIndex === void 0 ? void 0 : polyIndex.amountDecimal, slippage: new BigNumber$1(polyIndex === null || polyIndex === void 0 ? void 0 : polyIndex.slippage).div(100).toNumber() });
		dispatch(fetchPolySwapDataAsync({ chainId: chainId, polyQueryData: polyQueryData }));
		dispatch(fetchPolySpenderAsync(chainId));
		// dispatch(fetchPolySwapDataAsync({ chainId, polyQueryData }))
	}
	else if (checkUpdatePolyIndex === PolyDataIndexStatus.NOT_SWAP_DATA) {
		dispatch(resetPolyData());
	}
	else if (checkUpdatePolyIndex === PolyDataIndexStatus.LOADED) {
		var inputCurrencyAmount = new TokenAmount(inputCurrency, polyIndex.amountDecimal);
		if (balanceIn && inputCurrencyAmount && balanceIn.lessThan(inputCurrencyAmount)) {
			inputError = t('Insufficient %symbol% balance', { symbol: inputCurrency.symbol });
		}
	}
	return {
		pairState: pairState,
		currencies: currencies,
		currencyBalances: currencyBalances,
		parsedAmount: parsedAmount,
		v2Trade: v2Trade !== null && v2Trade !== void 0 ? v2Trade : undefined,
		inputError: inputError,
		// polyPairs: polyPairs ?? undefined,
	};
}

var WrapType;
(function (WrapType) {
	WrapType[WrapType["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
	WrapType[WrapType["WRAP"] = 1] = "WRAP";
	WrapType[WrapType["UNWRAP"] = 2] = "UNWRAP";
})(WrapType || (WrapType = {}));
var NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE };
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
function useWrapCallback(inputCurrency, outputCurrency, typedValue) {
	var _this = this;
	var _a = useActiveWeb3React(), chainId = _a.chainId, account = _a.account;
	var wethContract = useWETHContract();
	var balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, inputCurrency);
	// we can always parse the amount typed as the input currency, since wrapping is 1:1
	var inputAmount = useMemo(function () { return tryParseAmount(typedValue, inputCurrency); }, [inputCurrency, typedValue]);
	var addTransaction = useTransactionAdder();
	return useMemo(function () {
		if (!wethContract || !chainId || !inputCurrency || !outputCurrency)
			return NOT_APPLICABLE;
		var sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount);
		if (inputCurrency === ETHER && currencyEquals(WETHER[chainId], outputCurrency)) {
			return {
				wrapType: WrapType.WRAP,
				execute: sufficientBalance && inputAmount
					? function () {
						return __awaiter(_this, void 0, void 0, function () {
							var txReceipt, error_1;
							return __generator(this, function (_a) {
								switch (_a.label) {
									case 0:
										_a.trys.push([0, 2, , 3]);
										return [4 /*yield*/, wethContract.deposit({ value: "0x" + inputAmount.raw.toString(16) })];
									case 1:
										txReceipt = _a.sent();
										addTransaction(txReceipt, { summary: "Wrap " + inputAmount.toSignificant(6) + " BNB to WBNB" });
										return [3 /*break*/, 3];
									case 2:
										error_1 = _a.sent();
										console.error('Could not deposit', error_1);
										return [3 /*break*/, 3];
									case 3: return [2 /*return*/];
								}
							});
						});
					}
					: undefined,
				inputError: sufficientBalance ? undefined : 'Insufficient BNB balance',
			};
		}
		if (currencyEquals(WETHER[chainId], inputCurrency) && outputCurrency === ETHER) {
			return {
				wrapType: WrapType.UNWRAP,
				execute: sufficientBalance && inputAmount
					? function () {
						return __awaiter(_this, void 0, void 0, function () {
							var txReceipt, error_2;
							return __generator(this, function (_a) {
								switch (_a.label) {
									case 0:
										_a.trys.push([0, 2, , 3]);
										return [4 /*yield*/, wethContract.withdraw("0x" + inputAmount.raw.toString(16))];
									case 1:
										txReceipt = _a.sent();
										addTransaction(txReceipt, { summary: "Unwrap " + inputAmount.toSignificant(6) + " WBNB to BNB" });
										return [3 /*break*/, 3];
									case 2:
										error_2 = _a.sent();
										console.error('Could not withdraw', error_2);
										return [3 /*break*/, 3];
									case 3: return [2 /*return*/];
								}
							});
						});
					}
					: undefined,
				inputError: sufficientBalance ? undefined : 'Insufficient WBNB balance',
			};
		}
		return NOT_APPLICABLE;
	}, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction]);
}

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
function maxAmountSpend(currencyAmount) {
	if (!currencyAmount)
		return undefined;
	if (currencyAmount.currency === ETHER) {
		if (JSBI.greaterThan(currencyAmount.raw, MIN_BNB)) {
			return CurrencyAmount.ether(JSBI.subtract(currencyAmount.raw, MIN_BNB));
		}
		return CurrencyAmount.ether(JSBI.BigInt(0));
	}
	return currencyAmount;
}

var SafemoonWarning = function () {
	var t = useTranslation().t;
	return (jsxs(Fragment, { children: [jsxs(Text, { children: [t('To trade SAFEMOON, you must:'), " "] }, void 0), jsxs(Text, { children: ["\u2022 ", t('Click on the settings icon')] }, void 0), jsxs(Text, __assign({ mb: "24px" }, { children: ["\u2022 ", t('Set your slippage tolerance to 12%+')] }), void 0), jsx(Text, { children: t('This is because SafeMoon taxes a 10% fee on each transaction:') }, void 0), jsxs(Text, { children: ["\u2022 ", t('5% fee = redistributed to all existing holders')] }, void 0), jsxs(Text, { children: ["\u2022 ", t('5% fee = used to add liquidity')] }, void 0)] }, void 0));
};

var BondlyWarning = function () {
	var t = useTranslation().t;
	return jsx(Text, { children: t('Warning: BONDLY has been compromised. Please remove liqudity until further notice.') }, void 0);
};

var Acknowledgement = function (_a) {
	var handleContinueClick = _a.handleContinueClick;
	var t = useTranslation().t;
	var _b = __read(useState(false), 2), isConfirmed = _b[0], setIsConfirmed = _b[1];
	return (jsx(Fragment, { children: jsxs(Flex, __assign({ justifyContent: "space-between" }, { children: [jsxs(Flex, __assign({ alignItems: "center" }, { children: [jsx(Checkbox, { name: "confirmed", type: "checkbox", checked: isConfirmed, onChange: function () { return setIsConfirmed(!isConfirmed); }, scale: "sm" }, void 0), jsx(Text, __assign({ ml: "10px", style: { userSelect: 'none' } }, { children: t('I understand') }), void 0)] }), void 0), jsx(Button, __assign({ disabled: !isConfirmed, onClick: handleContinueClick }, { children: t('Continue') }), void 0)] }), void 0) }, void 0));
};

var StyledModalContainer = styled(ModalContainer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 440px;\n"], ["\n  max-width: 440px;\n"])));
var MessageContainer = styled(Message)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  align-items: flex-start;\n  justify-content: flex-start;\n"], ["\n  align-items: flex-start;\n  justify-content: flex-start;\n"])));
// Modal is fired by a useEffect and doesn't respond to closeOnOverlayClick prop being set to false
var usePreventModalOverlayClick = function () {
	useEffect(function () {
		var preventClickHandler = function (e) {
			e.stopPropagation();
			e.preventDefault();
			return false;
		};
		document.querySelectorAll('[role="presentation"]').forEach(function (el) {
			el.addEventListener('click', preventClickHandler, true);
		});
		return function () {
			document.querySelectorAll('[role="presentation"]').forEach(function (el) {
				el.removeEventListener('click', preventClickHandler, true);
			});
		};
	}, []);
};
var SwapWarningModal = function (_a) {
	var _b;
	var swapCurrency = _a.swapCurrency, onDismiss = _a.onDismiss;
	var t = useTranslation().t;
	var theme = useTheme().theme;
	usePreventModalOverlayClick();
	var TOKEN_WARNINGS = (_b = {},
		_b[getAddress(SwapWarningTokens.safemoon.address)] = {
			symbol: SwapWarningTokens.safemoon.symbol,
			component: jsx(SafemoonWarning, {}, void 0),
		},
		_b[getAddress(SwapWarningTokens.bondly.address)] = {
			symbol: SwapWarningTokens.bondly.symbol,
			component: jsx(BondlyWarning, {}, void 0),
		},
		_b);
	var SWAP_WARNING = TOKEN_WARNINGS[swapCurrency.address];
	return (jsxs(StyledModalContainer, __assign({ minWidth: "280px" }, { children: [jsx(ModalHeader, __assign({ background: theme.colors.gradients.cardHeader }, { children: jsx(Heading, __assign({ p: "12px 24px" }, { children: t('Notice for trading %symbol%', { symbol: SWAP_WARNING.symbol }) }), void 0) }), void 0), jsxs(ModalBody, __assign({ p: "24px" }, { children: [jsx(MessageContainer, __assign({ variant: "warning", mb: "24px" }, { children: jsx(Box, { children: SWAP_WARNING.component }, void 0) }), void 0), jsx(Acknowledgement, { handleContinueClick: onDismiss }, void 0)] }), void 0)] }), void 0));
};
var templateObject_1, templateObject_2;

function usePloyCallData() {
	var _this = this;
	var _a = useActiveWeb3React(), account = _a.account, chainId = _a.chainId, library = _a.library;
	var _b = __read(useUserSlippageTolerance(), 1), allowedSlippage = _b[0];
	var polyDataIndex = useSwapState().polyDataIndex;
	var _c = polyDataIndex || {}, fromTokenAddress = _c.fromTokenAddress, toTokenAddress = _c.toTokenAddress, amountDecimal = _c.amountDecimal;
	var params = useMemo(function () {
		return ({
			fromTokenAddress: fromTokenAddress,
			toTokenAddress: toTokenAddress,
			amount: amountDecimal,
			fromAddress: account,
			slippage: allowedSlippage / 100,
		});
	}, [fromTokenAddress, toTokenAddress, amountDecimal, account, allowedSlippage]);
	var polySwapCallback = useCallback(function () {
		return __awaiter(_this, void 0, void 0, function () {
			var callData, res;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0: return [4 /*yield*/, get1inchSwapData(chainId, params)];
					case 1:
						callData = _a.sent();
						delete callData.tx.gasPrice; // ethersjs will find the gasPrice needed
						delete callData.tx.gas; // ethersjs will find the gasLimit for users
						callData.tx.value = "0x" + Number(callData.tx.value).toString(16);
						return [4 /*yield*/, library.getSigner().sendTransaction(callData.tx)];
					case 2:
						res = _a.sent();
						return [2 /*return*/, res.hash];
				}
			});
		});
	}, [chainId, params, library]);
	return {
		polySwapCallback: polySwapCallback,
	};
}

function Swap(_a) {
	// const loadedUrlParams = useDefaultsFromURLSearch()
	var _b, _c, _d;
	var _this = this;
	var _e, _f, _g, _h, _j, _k;
	var inputCurrencyId = _a.inputCurrencyId, outputCurrencyId = _a.outputCurrencyId;
	var t = useTranslation().t;
	// token warning stuff
	var _l = __read([
		useCurrency(inputCurrencyId),
		useCurrency(outputCurrencyId),
	], 2), loadedInputCurrency = _l[0], loadedOutputCurrency = _l[1];
	var urlLoadedTokens = useMemo(function () { var _a, _b; return (_b = (_a = [loadedInputCurrency, loadedOutputCurrency]) === null || _a === void 0 ? void 0 : _a.filter(function (c) { return c instanceof Token$1; })) !== null && _b !== void 0 ? _b : []; }, [loadedInputCurrency, loadedOutputCurrency]);
	// dismiss warning if all imported tokens are in active lists
	var defaultTokens = useAllTokens();
	urlLoadedTokens &&
		urlLoadedTokens.filter(function (token) {
			return !(token.address in defaultTokens);
		});
	var _m = useActiveWeb3React(), account = _m.account, chainId = _m.chainId;
	// for expert mode
	var _o = __read(useExpertModeManager(), 1), isExpertMode = _o[0];
	// get custom setting values for user
	var _p = __read(useUserSlippageTolerance(), 1), allowedSlippage = _p[0];
	// swap state
	var _q = useSwapState(), independentField = _q.independentField, typedValue = _q.typedValue, recipient = _q.recipient, polyDataSimple = _q.polyData, polySpender = _q.polySpender;
	var _r = useDerivedSwapInfo(), v2Trade = _r.v2Trade, currencyBalances = _r.currencyBalances, parsedAmount = _r.parsedAmount, currencies = _r.currencies, pairState = _r.pairState, swapInputError = _r.inputError;
	var _s = useWrapCallback(currencies[Field$2.INPUT], currencies[Field$2.OUTPUT], typedValue), wrapType = _s.wrapType, onWrap = _s.execute, wrapInputError = _s.inputError;
	// when input is dsg, to disable output
	var disabledOutput = useMemo(function () {
		var _a;
		if (currencies[Field$2.INPUT] && ((_a = SWAP_TOKEN[chainId]) === null || _a === void 0 ? void 0 : _a.equals(currencies[Field$2.INPUT]))) {
			return true;
		}
		return false;
	}, [chainId, currencies]);
	var showWrap = wrapType !== WrapType.NOT_APPLICABLE;
	var trade = showWrap ? undefined : v2Trade;
	var polyData = usePolySwap(polyDataSimple, trade, showWrap).polyData;
	var _t = __read(useState(false), 2), polySwapPending = _t[0], setPolySwapPending = _t[1];
	var parsedAmounts = showWrap
		? (_b = {},
			_b[Field$2.INPUT] = parsedAmount,
			_b[Field$2.OUTPUT] = parsedAmount,
			_b) : (_c = {},
				_c[Field$2.INPUT] = independentField === Field$2.INPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.inputAmount,
				_c[Field$2.OUTPUT] = independentField === Field$2.OUTPUT ? parsedAmount : ((polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed) ? polyData === null || polyData === void 0 ? void 0 : polyData.toCurrencyAmount : trade === null || trade === void 0 ? void 0 : trade.outputAmount),
				_c);
	var _u = useSwapActionHandlers(), onSwitchTokens = _u.onSwitchTokens, onCurrencySelection = _u.onCurrencySelection, onUserInput = _u.onUserInput, onChangeRecipient = _u.onChangeRecipient;
	var isValid = !swapInputError;
	var dependentField = independentField === Field$2.INPUT ? Field$2.OUTPUT : Field$2.INPUT;
	var handleTypeInput = useCallback(function (value) {
		onUserInput(Field$2.INPUT, value);
	}, [onUserInput]);
	var handleTypeOutput = useCallback(function (value) {
		onUserInput(Field$2.OUTPUT, value);
	}, [onUserInput]);
	// modal and loading
	var _v = __read(useState({
		tradeToConfirm: undefined,
		attemptingTxn: false,
		swapErrorMessage: undefined,
		txHash: undefined,
	}), 2), _w = _v[0], tradeToConfirm = _w.tradeToConfirm, swapErrorMessage = _w.swapErrorMessage, attemptingTxn = _w.attemptingTxn, txHash = _w.txHash, setSwapState = _v[1];
	var formattedAmounts = (_d = {},
		_d[independentField] = typedValue,
		_d[dependentField] = showWrap
			? (_f = (_e = parsedAmounts[independentField]) === null || _e === void 0 ? void 0 : _e.toExact()) !== null && _f !== void 0 ? _f : ''
			// : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
			: (_h = (_g = parsedAmounts[dependentField]) === null || _g === void 0 ? void 0 : _g.toSignificant(6, undefined, independentField === Field$2.INPUT ? Rounding.ROUND_DOWN : Rounding.ROUND_UP)) !== null && _h !== void 0 ? _h : '',
		_d);
	var route = trade === null || trade === void 0 ? void 0 : trade.route;
	var userHasSpecifiedInputOutput = Boolean(currencies[Field$2.INPUT] && currencies[Field$2.OUTPUT] && ((_j = parsedAmounts[independentField]) === null || _j === void 0 ? void 0 : _j.greaterThan(JSBI.BigInt(0))));
	var noRoute = !route;
	// check whether the user has approved the router on the input token
	var _x = __read(useApproveCallbackFromTrade(trade, allowedSlippage), 2), approvalAsLiquild = _x[0], approveCallbackAsLiquild = _x[1];
	var _y = __read(useApproveCallbackPolyTrade(polyData === null || polyData === void 0 ? void 0 : polyData.fromCurrencyTokenAmount, polySpender), 2), approvalAsPoly = _y[0], approveCallbackAsPloy = _y[1];
	var _z = __read(useMemo(function () {
		return (polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed) ? [approvalAsPoly, approveCallbackAsPloy] : [approvalAsLiquild, approveCallbackAsLiquild];
	}, [polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed, approvalAsLiquild, approveCallbackAsLiquild, approvalAsPoly, approveCallbackAsPloy]), 2), approval = _z[0], approveCallback = _z[1];
	// const [approval, approveCallback] = useApproveCallbackFromTradeOrPoly(polyData?.isPolyMethed, trade, polyData?.currencyAmount, allowedSlippage)
	// check if user has gone through approval process, used to show two step buttons, reset on token change
	var _0 = __read(useState(false), 2), approvalSubmitted = _0[0], setApprovalSubmitted = _0[1];
	// mark when a user has submitted an approval, reset onTokenSelection for input field
	useEffect(function () {
		if (approval === ApprovalState.PENDING) {
			setApprovalSubmitted(true);
		}
	}, [approval, approvalSubmitted]);
	var maxAmountInput = maxAmountSpend(currencyBalances[Field$2.INPUT]);
	var atMaxAmountInput = Boolean(maxAmountInput && ((_k = parsedAmounts[Field$2.INPUT]) === null || _k === void 0 ? void 0 : _k.equalTo(maxAmountInput)));
	// the callback to execute the swap
	var _1 = useSwapCallback(trade, allowedSlippage, recipient), swapCallback = _1.callback, swapCallbackError = _1.error;
	var polySwapCallback = usePloyCallData().polySwapCallback;
	var priceImpactWithoutFee = computeTradePriceBreakdown(trade).priceImpactWithoutFee;
	var _2 = __read(useUserSingleHopOnly(), 1), singleHopOnly = _2[0];
	var handleSwap = useCallback(function () {
		if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
			return;
		}
		if (!swapCallback) {
			return;
		}
		setSwapState({ attemptingTxn: true, tradeToConfirm: tradeToConfirm, swapErrorMessage: undefined, txHash: undefined });
		swapCallback()
			.then(function (hash) {
				setSwapState({ attemptingTxn: false, tradeToConfirm: tradeToConfirm, swapErrorMessage: undefined, txHash: hash });
			})
			.catch(function (error) {
				setSwapState({
					attemptingTxn: false,
					tradeToConfirm: tradeToConfirm,
					swapErrorMessage: error.message,
					txHash: undefined,
				});
			});
	}, [priceImpactWithoutFee, swapCallback, tradeToConfirm]);
	var handlePolySwap = useCallback(function () {
		return __awaiter(_this, void 0, void 0, function () {
			var error_1;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						if (!polyData && !polyData.isPolyMethed) {
							return [2 /*return*/];
						}
						if (!polySwapCallback) {
							return [2 /*return*/];
						}
						_a.label = 1;
					case 1:
						_a.trys.push([1, 3, , 4]);
						setPolySwapPending(true);
						// setSwapState({ attemptingTxn: true, tradeToConfirm: null, swapErrorMessage: undefined, txHash: undefined })
						return [4 /*yield*/, polySwapCallback()
							.then(function (hash) {
								setSwapState({ attemptingTxn: false, tradeToConfirm: null, swapErrorMessage: undefined, txHash: hash });
							})
							.catch(function (error) {
								console.error(error);
								setSwapState({
									attemptingTxn: false,
									tradeToConfirm: null,
									swapErrorMessage: error.message,
									txHash: undefined,
								});
							}).finally(function () {
								setPolySwapPending(false);
							})];
					case 2:
						// setSwapState({ attemptingTxn: true, tradeToConfirm: null, swapErrorMessage: undefined, txHash: undefined })
						_a.sent();
						return [3 /*break*/, 4];
					case 3:
						error_1 = _a.sent();
						console.error(error_1);
						return [3 /*break*/, 4];
					case 4: return [2 /*return*/];
				}
			});
		});
	}, [polySwapCallback, polyData, setPolySwapPending]);
	// errors
	var _3 = __read(useState(false), 2), showInverted = _3[0], setShowInverted = _3[1];
	// warnings on slippage
	var priceImpactSeverity = warningSeverity(priceImpactWithoutFee, allowedSlippage);
	// show approve flow when: no error on inputs, not approved or pending, or approved in current session
	// never show if price impact is above threshold in non expert mode
	var showApproveFlowTrade = (!swapInputError) &&
		(approval === ApprovalState.NOT_APPROVED ||
			approval === ApprovalState.PENDING ||
			(approvalSubmitted && approval === ApprovalState.APPROVED)) &&
		!(priceImpactSeverity > 3 && !isExpertMode);
	var showApproveFlowPoly = (polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed) &&
		(approval === ApprovalState.NOT_APPROVED ||
			approval === ApprovalState.PENDING ||
			(approvalSubmitted && approval === ApprovalState.APPROVED));
	var showApproveFlow = showApproveFlowTrade || showApproveFlowPoly;
	var handleConfirmDismiss = useCallback(function () {
		setSwapState({ tradeToConfirm: tradeToConfirm, attemptingTxn: attemptingTxn, swapErrorMessage: swapErrorMessage, txHash: txHash });
		// if there was a tx hash, we want to clear the input
		if (txHash) {
			onUserInput(Field$2.INPUT, '');
		}
	}, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);
	var handleAcceptChanges = useCallback(function () {
		setSwapState({ tradeToConfirm: trade, swapErrorMessage: swapErrorMessage, txHash: txHash, attemptingTxn: attemptingTxn });
	}, [attemptingTxn, swapErrorMessage, trade, txHash]);
	// swap warning state
	var _4 = __read(useState(null), 2), swapWarningCurrency = _4[0], setSwapWarningCurrency = _4[1];
	var _5 = __read(useModal(jsx(SwapWarningModal, { swapCurrency: swapWarningCurrency }, void 0)), 1), onPresentSwapWarningModal = _5[0];
	var shouldShowSwapWarning = function (swapCurrency) {
		var isWarningToken = Object.entries(SwapWarningTokens).find(function (warningTokenConfig) {
			var warningTokenData = warningTokenConfig[1];
			var warningTokenAddress = getAddress(warningTokenData.address);
			return swapCurrency.address === warningTokenAddress;
		});
		return Boolean(isWarningToken);
	};
	useEffect(function () {
		if (swapWarningCurrency) {
			onPresentSwapWarningModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [swapWarningCurrency]);
	var handleInputSelect = useCallback(function (inputCurrency) {
		setApprovalSubmitted(false); // reset 2 step UI for approvals
		onCurrencySelection(Field$2.INPUT, inputCurrency);
		var showSwapWarning = shouldShowSwapWarning(inputCurrency);
		if (showSwapWarning) {
			setSwapWarningCurrency(inputCurrency);
		}
		else {
			setSwapWarningCurrency(null);
		}
	}, [onCurrencySelection]);
	var handleMaxInput = useCallback(function () {
		if (maxAmountInput) {
			onUserInput(Field$2.INPUT, maxAmountInput.toFixed(6));
		}
	}, [maxAmountInput, onUserInput]);
	var handleOutputSelect = useCallback(function (outputCurrency) {
		onCurrencySelection(Field$2.OUTPUT, outputCurrency);
		var showSwapWarning = shouldShowSwapWarning(outputCurrency);
		if (showSwapWarning) {
			setSwapWarningCurrency(outputCurrency);
		}
		else {
			setSwapWarningCurrency(null);
		}
	}, [onCurrencySelection]);
	var swapIsUnsupported = useIsTransactionUnsupported(currencies === null || currencies === void 0 ? void 0 : currencies.INPUT, currencies === null || currencies === void 0 ? void 0 : currencies.OUTPUT);
	// const [onPresentImportTokenWarningModal] = useModal(
	//   <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')} />,
	// )
	// useEffect(() => {
	//   if (importTokensNotInDefault.length > 0) {
	//     onPresentImportTokenWarningModal()
	//   }
	//   // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [importTokensNotInDefault.length])
	var _6 = __read(useModal(jsx(ConfirmSwapModal, { trade: trade, originalTrade: tradeToConfirm, onAcceptChanges: handleAcceptChanges, attemptingTxn: attemptingTxn, txHash: txHash, recipient: recipient, allowedSlippage: allowedSlippage, onConfirm: handleSwap, swapErrorMessage: swapErrorMessage, customOnDismiss: handleConfirmDismiss }, void 0), true, true, 'confirmSwapModal'), 1), onPresentConfirmModal = _6[0];
	useMemo(function () {
		return noRoute || swapIsUnsupported;
	}, [noRoute, swapIsUnsupported]);
	var getButtonSupported = function () {
		var _a, _b;
		if (swapIsUnsupported)
			return (jsx(Flex, __assign({ justifyContent: "center" }, { children: jsx(Button, __assign({ disabled: true, scale: "ld", mb: "4px" }, { children: t('Unsupported Asset') }), void 0) }), void 0));
		if (!account)
			return (jsx(Flex, __assign({ justifyContent: "center" }, { children: jsx(ConnectWalletButton, { scale: "ld" }, void 0) }), void 0));
		if (showWrap)
			return (jsx(Flex, __assign({ justifyContent: "center" }, { children: jsx(Button, __assign({ disabled: Boolean(wrapInputError), onClick: onWrap }, { children: wrapInputError !== null && wrapInputError !== void 0 ? wrapInputError : (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null) }), void 0) }), void 0));
		if (noRoute && pairState === PairState.LOADING && !polyData.isPolyMethed) {
			return (jsx(GreyCard, __assign({ style: { textAlign: 'center' } }, { children: jsx(Text, __assign({ color: "textSubtle", mb: "4px" }, { children: jsx(Dots, { children: t('Loading') }, void 0) }), void 0) }), void 0));
		}
		if (noRoute && userHasSpecifiedInputOutput && !polyData.isPolyMethed)
			return (jsxs(GreyCard, __assign({ style: { textAlign: 'center' } }, { children: [jsx(Text, __assign({ color: "textSubtle", mb: "4px" }, { children: t('Insufficient liquidity for this trade.') }), void 0), singleHopOnly && (jsx(Text, __assign({ color: "textSubtle", mb: "4px" }, { children: t('Try enabling multi-hop trades.') }), void 0))] }), void 0));
		if (showApproveFlow)
			return (jsxs(Fragment, {
				children: [jsxs(RowBetween, {
					children: [jsx(Button, __assign({ variant: approval === ApprovalState.APPROVED ? 'success' : 'primary', onClick: approveCallback, disabled: approval !== ApprovalState.NOT_APPROVED || approvalSubmitted, width: "48%" }, { children: approval === ApprovalState.PENDING ? (jsxs(AutoRow, __assign({ gap: "6px", justify: "center" }, { children: [t('Enabling'), " ", jsx(CircleLoader, { stroke: "white" }, void 0)] }), void 0)) : approvalSubmitted && approval === ApprovalState.APPROVED ? (t('Enabled')) : (t('Enable %asset%', { asset: (_b = (_a = currencies[Field$2.INPUT]) === null || _a === void 0 ? void 0 : _a.symbol) !== null && _b !== void 0 ? _b : '' })) }), void 0), polyData.isPolyMethed
						?
						jsx(Button, __assign({
							width: "48%", disabled: !isValid || polySwapPending, onClick: function () {
								return __awaiter(_this, void 0, void 0, function () {
									return __generator(this, function (_a) {
										switch (_a.label) {
											case 0: return [4 /*yield*/, handlePolySwap()];
											case 1:
												_a.sent();
												setTimeout(function () {
													onPresentConfirmModal();
												}, 0);
												return [2 /*return*/];
										}
									});
								});
							}
						}, {
							children: polySwapPending
								?
								jsx(Dots, { children: t('Swap') }, void 0)
								:
								swapInputError || t('Swap')
						}), void 0)
						:
						jsx(Button, __assign({
							variant: isValid && priceImpactSeverity > 2 ? 'danger' : 'primary', onClick: function () {
								if (isExpertMode) {
									handleSwap();
								}
								else {
									setSwapState({
										tradeToConfirm: trade,
										attemptingTxn: false,
										swapErrorMessage: undefined,
										txHash: undefined,
									});
									setTimeout(function () {
										onPresentConfirmModal();
									}, 0);
								}
							}, width: "48%", id: "swap-button", disabled: !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
						}, {
							children: priceImpactSeverity > 3 && !isExpertMode
								? t('Price Impact High')
								: priceImpactSeverity > 2
									? t('Swap Anyway')
									: t('Swap')
						}), void 0)]
				}, void 0), jsx(Column, __assign({ style: { marginTop: '1rem' } }, { children: jsx(ProgressCircles, { steps: [approval === ApprovalState.APPROVED] }, void 0) }), void 0)]
			}, void 0));
		return (jsx(Flex, __assign({ justifyContent: "center" }, {
			children: polyData.isPolyMethed
				?
				jsx(Button, __assign({
					disabled: !isValid || polySwapPending, onClick: function () {
						return __awaiter(_this, void 0, void 0, function () {
							return __generator(this, function (_a) {
								switch (_a.label) {
									case 0: return [4 /*yield*/, handlePolySwap()];
									case 1:
										_a.sent();
										setTimeout(function () {
											onPresentConfirmModal();
										}, 0);
										return [2 /*return*/];
								}
							});
						});
					}
				}, {
					children: polySwapPending
						?
						jsx(Dots, { children: t('Swap') }, void 0)
						:
						swapInputError || t('Swap')
				}), void 0)
				:
				jsx(Button, __assign({
					variant: polyData.isPolyMethed ? 'primary' : (isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'), onClick: function () {
						if (isExpertMode) {
							handleSwap();
						}
						else {
							setSwapState({
								tradeToConfirm: trade,
								attemptingTxn: false,
								swapErrorMessage: undefined,
								txHash: undefined,
							});
							setTimeout(function () {
								onPresentConfirmModal();
							}, 0);
						}
					}, id: "swap-button", scale: "ld", disabled: !isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError
				}, {
					children: (swapInputError ||
						(priceImpactSeverity > 3 && !isExpertMode
							? t('Swap Anyway')
							: priceImpactSeverity > 2
								? t('Swap Anyway')
								: t('Swap')))
				}), void 0)
		}), void 0));
	};
	return (jsxs("div", {
		children: [jsxs(AppBody, {
			children: [jsx(AppHeader, { title: t('Exchange'), subtitle: t('Trade tokens in an instant') }, void 0), jsxs(Wrapper$3, __assign({ id: "swap-page" }, {
				children: [jsxs(AutoColumn, __assign({ gap: "md" }, {
					children: [jsx(CurrencyInputPanel, { label: independentField === Field$2.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From'), value: formattedAmounts[Field$2.INPUT], showMaxButton: !atMaxAmountInput, currency: currencies[Field$2.INPUT], onUserInput: handleTypeInput, onMax: handleMaxInput, onCurrencySelect: handleInputSelect, otherCurrency: currencies[Field$2.OUTPUT], id: "swap-currency-input", showCommonBases: true }, void 0), jsx(AutoColumn, __assign({ justify: "space-between" }, {
						children: jsxs(AutoRow, __assign({ justify: isExpertMode ? 'space-between' : 'center', style: { padding: '0 1rem' } }, {
							children: [jsx(ArrowWrapper, __assign({ clickable: true }, {
								children: jsx(Icon$u, {
									width: "32px", onClick: function () {
										setApprovalSubmitted(false); // reset 2 step UI for approvals
										onSwitchTokens();
									}, color: currencies[Field$2.INPUT] && currencies[Field$2.OUTPUT] ? 'primary' : 'text'
								}, void 0)
							}), void 0), recipient === null && !showWrap && isExpertMode ? (jsx(Button, __assign({ variant: "text", id: "add-recipient-button", onClick: function () { return onChangeRecipient(''); } }, { children: t('+ Add a send (optional)') }), void 0)) : null]
						}), void 0)
					}), void 0), jsx(CurrencyInputPanel, { value: formattedAmounts[Field$2.OUTPUT], onUserInput: handleTypeOutput, label: independentField === Field$2.INPUT && !showWrap && trade ? t('To (estimated)') : t('To'), showMaxButton: false, currency: currencies[Field$2.OUTPUT], onCurrencySelect: handleOutputSelect, otherCurrency: currencies[Field$2.INPUT], id: "swap-currency-output", disabled: disabledOutput, showCommonBases: true }, void 0), isExpertMode && recipient !== null && !showWrap ? (jsxs(Fragment, { children: [jsxs(AutoRow, __assign({ justify: "space-between", style: { padding: '0 1rem' } }, { children: [jsx(ArrowWrapper, __assign({ clickable: false }, { children: jsx(Icon$u, { width: "32px" }, void 0) }), void 0), jsx(Button, __assign({ variant: "text", id: "remove-recipient-button", onClick: function () { return onChangeRecipient(null); } }, { children: t('- Remove send') }), void 0)] }), void 0), jsx(AddressInputPanel, { id: "recipient", value: recipient, onChange: onChangeRecipient }, void 0)] }, void 0)) : null, showWrap ? null : (jsxs(AutoColumn, __assign({ gap: "8px", style: { padding: '0 16px' } }, { children: [(Boolean(trade) || polyData.isPolyMethed) && (jsxs(RowBetween, __assign({ align: "center" }, { children: [jsx(Text, __assign({ fontSize: "16px" }, { children: t('Price') }), void 0), jsx(TradePrice, { price: (polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed) ? polyData === null || polyData === void 0 ? void 0 : polyData.price : trade === null || trade === void 0 ? void 0 : trade.executionPrice, showInverted: showInverted, setShowInverted: setShowInverted }, void 0)] }), void 0)), allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (jsxs(RowBetween, __assign({ align: "center" }, { children: [jsx(Text, __assign({ fontSize: "16px" }, { children: t('Slippage Tolerance') }), void 0), jsxs(Text, __assign({ fontSize: "16px", color: "textSubtle" }, { children: [allowedSlippage / 100, "%"] }), void 0)] }), void 0))] }), void 0))]
				}), void 0), jsxs(Box, __assign({ mt: "1rem" }, { children: [getButtonSupported(), isExpertMode && swapErrorMessage ? jsx(SwapCallbackError, { error: swapErrorMessage }, void 0) : null] }), void 0)]
			}), void 0)]
		}, void 0), !swapIsUnsupported ? (jsx(AdvancedSwapDetailsDropdown, { isPolyMethed: polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed, polyData: polyData, trade: trade }, void 0)) : (jsx(UnsupportedCurrencyFooter, { currencies: [currencies.INPUT, currencies.OUTPUT] }, void 0))]
	}, void 0));
}

var FAST_INTERVAL = 10000;
var SLOW_INTERVAL = 60000;
var RefreshContext = React.createContext({ slow: 0, fast: 0 });
// Check if the tab is active in the user browser
var useIsBrowserTabActive = function () {
	var isBrowserTabActiveRef = useRef(true);
	useEffect(function () {
		var onVisibilityChange = function () {
			isBrowserTabActiveRef.current = !document.hidden;
		};
		window.addEventListener('visibilitychange', onVisibilityChange);
		return function () {
			window.removeEventListener('visibilitychange', onVisibilityChange);
		};
	}, []);
	return isBrowserTabActiveRef;
};
// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
var RefreshContextProvider = function (_a) {
	var children = _a.children;
	var _b = __read(useState(0), 2), slow = _b[0], setSlow = _b[1];
	var _c = __read(useState(0), 2), fast = _c[0], setFast = _c[1];
	var isBrowserTabActiveRef = useIsBrowserTabActive();
	useEffect(function () {
		var interval = setInterval(function () {
			return __awaiter(void 0, void 0, void 0, function () {
				return __generator(this, function (_a) {
					if (isBrowserTabActiveRef.current) {
						setFast(function (prev) { return prev + 1; });
					}
					return [2 /*return*/];
				});
			});
		}, FAST_INTERVAL);
		return function () { return clearInterval(interval); };
	}, [isBrowserTabActiveRef]);
	useEffect(function () {
		var interval = setInterval(function () {
			return __awaiter(void 0, void 0, void 0, function () {
				return __generator(this, function (_a) {
					if (isBrowserTabActiveRef.current) {
						setSlow(function (prev) { return prev + 1; });
					}
					return [2 /*return*/];
				});
			});
		}, SLOW_INTERVAL);
		return function () { return clearInterval(interval); };
	}, [isBrowserTabActiveRef]);
	return jsx(RefreshContext.Provider, __assign({ value: { slow: slow, fast: fast } }, { children: children }), void 0);
};

var initialState$7 = { currentBlock: 0, initialBlock: 0 };
var blockSlice = createSlice({
	name: 'Block',
	initialState: initialState$7,
	reducers: {
		setBlock: function (state, action) {
			if (state.initialBlock === 0) {
				state.initialBlock = action.payload;
			}
			state.currentBlock = action.payload;
		},
	},
});
// Actions
blockSlice.actions.setBlock;
var blockReducer = blockSlice.reducer;

var initialState$6 = {
	blockNumber: {},
};
var application = createReducer(initialState$6, function (builder) {
	return builder.addCase(updateBlockNumber, function (state, action) {
		var _a = action.payload, chainId = _a.chainId, blockNumber = _a.blockNumber;
		if (typeof state.blockNumber[chainId] !== 'number') {
			state.blockNumber[chainId] = blockNumber;
		}
		else {
			state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
		}
	});
});

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
var updateVersion = createAction('global/updateVersion');

var currentTimestamp = function () { return new Date().getTime(); };
function pairKey(token0Address, token1Address) {
	return token0Address + ";" + token1Address;
}
var initialState$5 = {
	userExpertMode: false,
	userSingleHopOnly: false,
	userUsePoly: false,
	systemUsePoly: false,
	userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
	userDeadline: DEFAULT_DEADLINE_FROM_NOW,
	tokens: {},
	pairs: {},
	timestamp: currentTimestamp(),
	audioPlay: false,
	isDark: false,
	vDsgInviteAddress: '',
	useFarmGet: false,
	useFarmPledge: false,
	useNestGet: false,
	useNestPledge: false,
};
var user = createReducer(initialState$5, function (builder) {
	return builder
		.addCase(updateVersion, function (state) {
			// slippage isnt being tracked in local storage, reset to default
			// noinspection SuspiciousTypeOfGuard
			if (typeof state.userSlippageTolerance !== 'number') {
				state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE;
			}
			// deadline isnt being tracked in local storage, reset to default
			// noinspection SuspiciousTypeOfGuard
			if (typeof state.userDeadline !== 'number') {
				state.userDeadline = DEFAULT_DEADLINE_FROM_NOW;
			}
			state.lastUpdateVersionTimestamp = currentTimestamp();
		})
		.addCase(updateUserExpertMode, function (state, action) {
			state.userExpertMode = action.payload.userExpertMode;
			state.timestamp = currentTimestamp();
		})
		.addCase(updateUserSlippageTolerance, function (state, action) {
			state.userSlippageTolerance = action.payload.userSlippageTolerance;
			state.timestamp = currentTimestamp();
		})
		.addCase(updateUserDeadline, function (state, action) {
			state.userDeadline = action.payload.userDeadline;
			state.timestamp = currentTimestamp();
		})
		.addCase(updateUserSingleHopOnly, function (state, action) {
			state.userSingleHopOnly = action.payload.userSingleHopOnly;
		})
		.addCase(addSerializedToken, function (state, _a) {
			var serializedToken = _a.payload.serializedToken;
			if (!state.tokens) {
				state.tokens = {};
			}
			state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {};
			state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken;
			state.timestamp = currentTimestamp();
		})
		.addCase(removeSerializedToken, function (state, _a) {
			var _b = _a.payload, address = _b.address, chainId = _b.chainId;
			if (!state.tokens) {
				state.tokens = {};
			}
			state.tokens[chainId] = state.tokens[chainId] || {};
			delete state.tokens[chainId][address];
			state.timestamp = currentTimestamp();
		})
		.addCase(addSerializedPair, function (state, _a) {
			var serializedPair = _a.payload.serializedPair;
			if (serializedPair.token0.chainId === serializedPair.token1.chainId &&
				serializedPair.token0.address !== serializedPair.token1.address) {
				var chainId = serializedPair.token0.chainId;
				state.pairs[chainId] = state.pairs[chainId] || {};
				state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair;
			}
			state.timestamp = currentTimestamp();
		})
		.addCase(removeSerializedPair, function (state, _a) {
			var _b = _a.payload, chainId = _b.chainId, tokenAAddress = _b.tokenAAddress, tokenBAddress = _b.tokenBAddress;
			if (state.pairs[chainId]) {
				// just delete both keys if either exists
				delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)];
				delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)];
			}
			state.timestamp = currentTimestamp();
		})
		.addCase(muteAudio, function (state) {
			state.audioPlay = false;
		})
		.addCase(unmuteAudio, function (state) {
			state.audioPlay = true;
		})
		.addCase(updateUserUsePloy, function (state, _a) {
			var userUsePoly = _a.payload.userUsePoly;
			state.userUsePoly = userUsePoly;
		})
		.addCase(updateSystemUsePloy, function (state, _a) {
			var systemUsePoly = _a.payload.systemUsePoly;
			state.systemUsePoly = systemUsePoly;
		})
		.addCase(setVDsgInviteAddress, function (state, _a) {
			var address = _a.payload.address;
			state.vDsgInviteAddress = address;
		})
		.addCase(toggleTheme, function (state) {
			state.isDark = !state.isDark;
		})
		.addCase(updateUseFarmGet, function (state, _a) {
			var useFarmGet = _a.payload.useFarmGet;
			state.useFarmGet = useFarmGet;
		})
		.addCase(updateUseFarmPledge, function (state, _a) {
			var useFarmPledge = _a.payload.useFarmPledge;
			state.useFarmPledge = useFarmPledge;
		})
		.addCase(updateUseNestGet, function (state, _a) {
			var useNestGet = _a.payload.useNestGet;
			state.useNestGet = useNestGet;
		})
		.addCase(updateUseNestPledge, function (state, _a) {
			var useNestPledge = _a.payload.useNestPledge;
			state.useNestPledge = useNestPledge;
		});
});

/* eslint-disable no-param-reassign */
var now = function () { return new Date().getTime(); };
var initialState$4 = {};
var transactions = createReducer(initialState$4, function (builder) {
	return builder
		.addCase(addTransaction, function (transactions, _a) {
			var _b, _c;
			var _d = _a.payload, chainId = _d.chainId, from = _d.from, hash = _d.hash, approval = _d.approval, summary = _d.summary, claim = _d.claim;
			if ((_b = transactions[chainId]) === null || _b === void 0 ? void 0 : _b[hash]) {
				throw Error('Attempted to add existing transaction.');
			}
			var txs = (_c = transactions[chainId]) !== null && _c !== void 0 ? _c : {};
			txs[hash] = { hash: hash, approval: approval, summary: summary, claim: claim, from: from, addedTime: now() };
			transactions[chainId] = txs;
		})
		.addCase(clearAllTransactions, function (transactions, _a) {
			var chainId = _a.payload.chainId;
			if (!transactions[chainId])
				return;
			transactions[chainId] = {};
		})
		.addCase(checkedTransaction, function (transactions, _a) {
			var _b;
			var _c = _a.payload, chainId = _c.chainId, hash = _c.hash, blockNumber = _c.blockNumber;
			var tx = (_b = transactions[chainId]) === null || _b === void 0 ? void 0 : _b[hash];
			if (!tx) {
				return;
			}
			if (!tx.lastCheckedBlockNumber) {
				tx.lastCheckedBlockNumber = blockNumber;
			}
			else {
				tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
			}
		})
		.addCase(finalizeTransaction, function (transactions, _a) {
			var _b;
			var _c = _a.payload, hash = _c.hash, chainId = _c.chainId, receipt = _c.receipt;
			var tx = (_b = transactions[chainId]) === null || _b === void 0 ? void 0 : _b[hash];
			if (!tx) {
				return;
			}
			tx.receipt = receipt;
			tx.confirmedTime = now();
		});
});

var Field$1;
(function (Field) {
	Field["CURRENCY_A"] = "CURRENCY_A";
	Field["CURRENCY_B"] = "CURRENCY_B";
})(Field$1 || (Field$1 = {}));
var typeInput$1 = createAction('mint/typeInputMint');
var resetMintState = createAction('mint/resetMintState');

var initialState$3 = {
	independentField: Field$1.CURRENCY_A,
	typedValue: '',
	otherTypedValue: '',
};
var mint = createReducer(initialState$3, function (builder) {
	return builder
		.addCase(resetMintState, function () { return initialState$3; })
		.addCase(typeInput$1, function (state, _a) {
			var _b = _a.payload, field = _b.field, typedValue = _b.typedValue, noLiquidity = _b.noLiquidity;
			if (noLiquidity) {
				// they're typing into the field they've last typed in
				if (field === state.independentField) {
					return __assign(__assign({}, state), { independentField: field, typedValue: typedValue });
				}
				// they're typing into a new field, store the other value
				return __assign(__assign({}, state), { independentField: field, typedValue: typedValue, otherTypedValue: state.typedValue });
			}
			return __assign(__assign({}, state), { independentField: field, typedValue: typedValue, otherTypedValue: '' });
		});
});

var _a;
var NEW_LIST_STATE = {
	error: null,
	current: null,
	loadingRequestId: null,
	pendingUpdate: null,
};
var initialState$2 = {
	lastInitializedDefaultListOfLists: getTokenDefaultList(),
	byUrl: __assign({}, (_a = getTokenDefaultList()).concat.apply(_a, __spreadArray([], __read(UNSUPPORTED_LIST_URLS))).reduce(function (memo, listUrl) {
		memo[listUrl] = NEW_LIST_STATE;
		return memo;
	}, {})),
	activeChainId: chainIdProxy.chainId,
	activeListUrls: getTokenDefaultActiveList(),
};
var lists = createReducer(initialState$2, function (builder) {
	return builder
		.addCase(fetchTokenList.pending, function (state, _a) {
			var _b = _a.payload, requestId = _b.requestId, url = _b.url;
			state.byUrl[url] = __assign(__assign({ current: null, pendingUpdate: null }, state.byUrl[url]), { loadingRequestId: requestId, error: null });
		})
		.addCase(fetchTokenList.fulfilled, function (state, _a) {
			var _b, _c, _d;
			var _e = _a.payload, requestId = _e.requestId, tokenList = _e.tokenList, url = _e.url;
			var current = (_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.current;
			var loadingRequestId = (_c = state.byUrl[url]) === null || _c === void 0 ? void 0 : _c.loadingRequestId;
			// no-op if update does nothing
			if (current) {
				var upgradeType = getVersionUpgrade(current.version, tokenList.version);
				if (upgradeType === VersionUpgrade.NONE)
					return;
				if (loadingRequestId === null || loadingRequestId === requestId) {
					state.byUrl[url] = __assign(__assign({}, state.byUrl[url]), { loadingRequestId: null, error: null, current: current, pendingUpdate: tokenList });
				}
			}
			else {
				// activate if on default active
				if (getTokenDefaultActiveList().includes(url)) {
					(_d = state.activeListUrls) === null || _d === void 0 ? void 0 : _d.push(url);
				}
				state.byUrl[url] = __assign(__assign({}, state.byUrl[url]), { loadingRequestId: null, error: null, current: tokenList, pendingUpdate: null });
			}
		})
		.addCase(fetchTokenList.rejected, function (state, _a) {
			var _b;
			var _c = _a.payload, url = _c.url, requestId = _c.requestId, errorMessage = _c.errorMessage;
			if (((_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.loadingRequestId) !== requestId) {
				// no-op since it's not the latest request
				return;
			}
			state.byUrl[url] = __assign(__assign({}, state.byUrl[url]), { loadingRequestId: null, error: errorMessage, current: null, pendingUpdate: null });
		})
		.addCase(addList, function (state, _a) {
			var url = _a.payload;
			if (!state.byUrl[url]) {
				state.byUrl[url] = NEW_LIST_STATE;
			}
		})
		.addCase(removeList, function (state, _a) {
			var url = _a.payload;
			if (state.byUrl[url]) {
				delete state.byUrl[url];
			}
			// remove list from active urls if needed
			if (state.activeListUrls && state.activeListUrls.includes(url)) {
				state.activeListUrls = state.activeListUrls.filter(function (u) { return u !== url; });
			}
		})
		.addCase(enableList, function (state, _a) {
			var url = _a.payload;
			if (!state.byUrl[url]) {
				state.byUrl[url] = NEW_LIST_STATE;
			}
			if (state.activeListUrls && !state.activeListUrls.includes(url)) {
				state.activeListUrls.push(url);
			}
			if (!state.activeListUrls) {
				state.activeListUrls = [url];
			}
		})
		.addCase(disableList, function (state, _a) {
			var url = _a.payload;
			if (state.activeListUrls && state.activeListUrls.includes(url)) {
				state.activeListUrls = state.activeListUrls.filter(function (u) { return u !== url; });
			}
		})
		.addCase(acceptListUpdate, function (state, _a) {
			var _b;
			var url = _a.payload;
			if (!((_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.pendingUpdate)) {
				throw new Error('accept list update called without pending update');
			}
			state.byUrl[url] = __assign(__assign({}, state.byUrl[url]), { pendingUpdate: null, current: state.byUrl[url].pendingUpdate });
		})
		.addCase(acceptListUpdateOfChainId, function (state, _a) {
			var _b;
			var chainId = _a.payload;
			if (state.activeChainId === chainId)
				return;
			state.activeChainId = chainId;
			state.byUrl = __assign({}, (_b = getTokenDefaultList()).concat.apply(_b, __spreadArray([], __read(UNSUPPORTED_LIST_URLS))).reduce(function (memo, listUrl) {
				memo[listUrl] = NEW_LIST_STATE;
				return memo;
			}, {}));
		})
		.addCase(updateVersion, function (state) {
			// state loaded from localStorage, but new lists have never been initialized
			if (!state.lastInitializedDefaultListOfLists) {
				state.byUrl = initialState$2.byUrl;
				state.activeListUrls = initialState$2.activeListUrls;
			}
			else if (state.lastInitializedDefaultListOfLists) {
				var lastInitializedSet_1 = state.lastInitializedDefaultListOfLists.reduce(function (s, l) { return s.add(l); }, new Set());
				var newListOfListsSet_1 = getTokenDefaultList().reduce(function (s, l) { return s.add(l); }, new Set());
				getTokenDefaultList().forEach(function (listUrl) {
					if (!lastInitializedSet_1.has(listUrl)) {
						state.byUrl[listUrl] = NEW_LIST_STATE;
					}
				});
				state.lastInitializedDefaultListOfLists.forEach(function (listUrl) {
					if (!newListOfListsSet_1.has(listUrl)) {
						delete state.byUrl[listUrl];
					}
				});
			}
			state.lastInitializedDefaultListOfLists = getTokenDefaultList();
			// if no active lists, activate defaults
			if (!state.activeListUrls) {
				state.activeListUrls = getTokenDefaultActiveList();
				// for each list on default list, initialize if needed
				getTokenDefaultActiveList().map(function (listUrl) {
					if (!state.byUrl[listUrl]) {
						state.byUrl[listUrl] = NEW_LIST_STATE;
					}
					return true;
				});
			}
		});
});

var Field;
(function (Field) {
	Field["LIQUIDITY_PERCENT"] = "LIQUIDITY_PERCENT";
	Field["LIQUIDITY"] = "LIQUIDITY";
	Field["CURRENCY_A"] = "CURRENCY_A";
	Field["CURRENCY_B"] = "CURRENCY_B";
})(Field || (Field = {}));
var typeInput = createAction('burn/typeInputBurn');

var initialState$1 = {
	independentField: Field.LIQUIDITY_PERCENT,
	typedValue: '0',
};
var burn = createReducer(initialState$1, function (builder) {
	return builder.addCase(typeInput, function (state, _a) {
		var _b = _a.payload, field = _b.field, typedValue = _b.typedValue;
		return __assign(__assign({}, state), { independentField: field, typedValue: typedValue });
	});
});

var initialState = {
	callResults: {},
};
var multicall = createReducer(initialState, function (builder) {
	return builder
		.addCase(addMulticallListeners, function (state, _a) {
			var _b;
			var _c = _a.payload, calls = _c.calls, chainId = _c.chainId, _d = _c.options, _e = _d === void 0 ? {} : _d, _f = _e.blocksPerFetch, blocksPerFetch = _f === void 0 ? 1 : _f;
			var listeners = state.callListeners
				? state.callListeners
				: (state.callListeners = {});
			listeners[chainId] = (_b = listeners[chainId]) !== null && _b !== void 0 ? _b : {};
			calls.forEach(function (call) {
				var _a, _b;
				var callKey = toCallKey(call);
				listeners[chainId][callKey] = (_a = listeners[chainId][callKey]) !== null && _a !== void 0 ? _a : {};
				listeners[chainId][callKey][blocksPerFetch] = ((_b = listeners[chainId][callKey][blocksPerFetch]) !== null && _b !== void 0 ? _b : 0) + 1;
			});
		})
		.addCase(removeMulticallListeners, function (state, _a) {
			var _b = _a.payload, chainId = _b.chainId, calls = _b.calls, _c = _b.options, _d = _c === void 0 ? {} : _c, _e = _d.blocksPerFetch, blocksPerFetch = _e === void 0 ? 1 : _e;
			var listeners = state.callListeners
				? state.callListeners
				: (state.callListeners = {});
			if (!listeners[chainId])
				return;
			calls.forEach(function (call) {
				var callKey = toCallKey(call);
				if (!listeners[chainId][callKey])
					return;
				if (!listeners[chainId][callKey][blocksPerFetch])
					return;
				if (listeners[chainId][callKey][blocksPerFetch] === 1) {
					delete listeners[chainId][callKey][blocksPerFetch];
				}
				else {
					listeners[chainId][callKey][blocksPerFetch]--;
				}
			});
		})
		.addCase(fetchingMulticallResults, function (state, _a) {
			var _b;
			var _c = _a.payload, chainId = _c.chainId, fetchingBlockNumber = _c.fetchingBlockNumber, calls = _c.calls;
			state.callResults[chainId] = (_b = state.callResults[chainId]) !== null && _b !== void 0 ? _b : {};
			calls.forEach(function (call) {
				var _a;
				var callKey = toCallKey(call);
				var current = state.callResults[chainId][callKey];
				if (!current) {
					state.callResults[chainId][callKey] = {
						fetchingBlockNumber: fetchingBlockNumber,
					};
				}
				else {
					if (((_a = current.fetchingBlockNumber) !== null && _a !== void 0 ? _a : 0) >= fetchingBlockNumber)
						return;
					state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber;
				}
			});
		})
		.addCase(errorFetchingMulticallResults, function (state, _a) {
			var _b;
			var _c = _a.payload, fetchingBlockNumber = _c.fetchingBlockNumber, chainId = _c.chainId, calls = _c.calls;
			state.callResults[chainId] = (_b = state.callResults[chainId]) !== null && _b !== void 0 ? _b : {};
			calls.forEach(function (call) {
				var callKey = toCallKey(call);
				var current = state.callResults[chainId][callKey];
				if (!current)
					return; // only should be dispatched if we are already fetching
				if (current.fetchingBlockNumber === fetchingBlockNumber) {
					delete current.fetchingBlockNumber;
					current.data = null;
					current.blockNumber = fetchingBlockNumber;
				}
			});
		})
		.addCase(updateMulticallResults, function (state, _a) {
			var _b;
			var _c = _a.payload, chainId = _c.chainId, results = _c.results, blockNumber = _c.blockNumber;
			state.callResults[chainId] = (_b = state.callResults[chainId]) !== null && _b !== void 0 ? _b : {};
			Object.keys(results).forEach(function (callKey) {
				var _a;
				var current = state.callResults[chainId][callKey];
				if (((_a = current === null || current === void 0 ? void 0 : current.blockNumber) !== null && _a !== void 0 ? _a : 0) > blockNumber)
					return;
				state.callResults[chainId][callKey] = {
					data: results[callKey],
					blockNumber: blockNumber,
				};
			});
		});
});

var PERSISTED_KEYS = ['user', 'transactions', 'lists'];
var store = configureStore({
	devTools: process.env.NODE_ENV !== 'production',
	reducer: {
		block: blockReducer,
		application: application,
		user: user,
		transactions: transactions,
		swap: swap,
		mint: mint,
		burn: burn,
		multicall: multicall,
		lists: lists,
	},
	middleware: __spreadArray(__spreadArray([], __read(getDefaultMiddleware({ thunk: true }))), [save({ states: PERSISTED_KEYS })]),
	preloadedState: load({ states: PERSISTED_KEYS }),
});
store.dispatch(updateVersion());

var ThemeProviderWrapper = function (_a) {
	var isDark = _a.isDark, resetTheme = _a.resetTheme, props = __rest(_a, ["isDark", "resetTheme"]);
	return jsx(ThemeProvider, __assign({ theme: isDark ? merge(darkTheme, resetTheme === null || resetTheme === void 0 ? void 0 : resetTheme.dark) : merge(lightTheme, resetTheme === null || resetTheme === void 0 ? void 0 : resetTheme.light) }, props), void 0);
};
var Providers = function (_a) {
	var isDark = _a.isDark; _a.chainId; var lang = _a.lang, children = _a.children, resetTheme = _a.resetTheme, onConnectWallet = _a.onConnectWallet, props = __rest(_a, ["isDark", "chainId", "lang", "children", "resetTheme", "onConnectWallet"]);
	return (jsx(Provider, __assign({ store: store }, { children: jsx(ConnectWalletProvider, __assign({}, props, { onConnectWallet: onConnectWallet }, { children: jsx(ToastsProvider, { children: jsx(HelmetProvider, { children: jsx(ThemeProviderWrapper, __assign({ resetTheme: resetTheme, isDark: isDark }, { children: jsx(LanguageProvider, __assign({ lang: lang }, { children: jsx(RefreshContextProvider, { children: jsx(ModalProvider, { children: jsx(ModalProvider$1, { children: children }, void 0) }, void 0) }, void 0) }), void 0) }), void 0) }, void 0) }, void 0) }), void 0) }), void 0));
};

function Updaters() {
	return (jsxs(Fragment, { children: [jsx(Updater$2, {}, void 0), jsx(Updater$3, {}, void 0), jsx(Updater, {}, void 0), jsx(Updater$1, {}, void 0)] }, void 0));
}
function Blocklist(_a) {
	var children = _a.children;
	var account = useActiveWeb3React().account;
	var blocked = useMemo(function () { return Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1); }, [account]);
	if (blocked) {
		return jsx("div", { children: "Blocked address" }, void 0);
	}
	return jsx(Fragment, { children: children }, void 0);
}
var MiniSwap = function (_a) {
	var isDark = _a.isDark, lang = _a.lang, resetTheme = _a.resetTheme, onConnectWallet = _a.onConnectWallet, chainId = _a.chainId;
	useEffect(function () {
		console.debug("chainId is change " + chainId);
		setChainId(chainId);
	}, [chainId]);
	return (jsxs(Providers, __assign({ resetTheme: resetTheme, lang: lang, onConnectWallet: onConnectWallet, isDark: isDark, chainId: chainId }, { children: [jsx(Updaters, {}, void 0), jsx(Blocklist, { children: jsx(Swap, {}, void 0) }, void 0)] }), void 0));
};

export { MiniSwap as default };
