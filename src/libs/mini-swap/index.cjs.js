'use strict';

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var dsgswapSdk = require('dsgswap-sdk');
var units = require('@ethersproject/units');
var BigNumber = require('bignumber.js');
var ethers = require('ethers');
var utils = require('ethers/lib/utils');
var isEqual = require('lodash/isEqual');
var reactRedux = require('react-redux');
var contracts$1 = require('@ethersproject/contracts');
var address = require('@ethersproject/address');
var constants = require('@ethersproject/constants');
var bignumber = require('@ethersproject/bignumber');
var core = require('@web3-react/core');
var sample = require('lodash/sample');
var toolkit = require('@reduxjs/toolkit');
var abi$1 = require('@ethersproject/abi');
var strings = require('@ethersproject/strings');
var flatMap = require('lodash/flatMap');
var axios = require('axios');
var tokenLists = require('@uniswap/token-lists');
var Ajv = require('ajv');
var CID = require('cids');
var multicodec = require('multicodec');
var multihashes = require('multihashes');
var styled = require('styled-components');
var styledSystem = require('styled-system');
var get = require('lodash/get');
require('lodash/uniqueId');
var lodash = require('lodash');
var ReactLoading = require('react-loading');
var reactDom = require('react-dom');
var reactPopper = require('react-popper');
require('lodash/noop');
require('lodash/debounce');
require('react-transition-group');
var reactWindow = require('react-window');
var reactRouterDom = require('react-router-dom');
var reactHelmetAsync = require('react-helmet-async');
var merge = require('lodash/merge');
var reduxLocalstorageSimple = require('redux-localstorage-simple');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var sample__default = /*#__PURE__*/_interopDefaultLegacy(sample);
var flatMap__default = /*#__PURE__*/_interopDefaultLegacy(flatMap);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var Ajv__default = /*#__PURE__*/_interopDefaultLegacy(Ajv);
var CID__default = /*#__PURE__*/_interopDefaultLegacy(CID);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var ReactLoading__default = /*#__PURE__*/_interopDefaultLegacy(ReactLoading);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);

var EN = { locale: 'en-US', language: 'English', code: 'en' };
var ZHCN = { locale: 'zh-CN', language: '简体中文', code: 'CN' };
var ZHTW = { locale: 'zh-TW', language: '繁體中文', code: 'zh-tw' };
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
    'zh-TW': ZHTW,
};
Object.values(languages);

var dataFormat$2 = "YYYY-MM-DD";
var airTime$2 = "HHA, MMM-DD";
var Exchange$2 = "Exchange";
var Locked$2 = "Locked";
var Finished$2 = "Finished";
var Total$2 = "Total";
var End$2 = "End";
var Close$2 = "Close";
var Max$2 = "Max";
var Cancel$2 = "Cancel";
var Confirm$2 = "Confirm";
var Warning$2 = "Warning";
var Core$2 = "Core";
var Available$2 = "Available";
var Select$2 = "Select";
var Connect$2 = "Connect";
var Details$2 = "Details";
var Trade$2 = "Trade";
var More$2 = "More";
var Liquidity$2 = "Liquidity";
var Token$2 = "Token";
var Pairs$2 = "Pairs";
var Accounts$2 = "Accounts";
var Active$2 = "Active";
var Inactive$2 = "Inactive";
var Dual$2 = "Dual";
var Compound$2 = "Compound";
var Search$2 = "Search";
var History$2 = "History";
var Burned$2 = "Burned";
var Logout$2 = "Logout";
var Confirmed$2 = "Confirmed";
var Show$2 = "Show";
var Hide$2 = "Hide";
var Stake$2 = "Stake";
var Balance$3 = "Balance";
var Live$2 = "Live";
var Start$2 = "Start";
var Finish$2 = "Finish";
var Enable$2 = "Enable";
var Enabling$2 = "Enabling";
var Expired$2 = "Expired";
var Calculating$2 = "Calculating";
var All$2 = "All";
var d$2 = "d";
var h$2 = "h";
var m$2 = "m";
var Blocks$2 = "Blocks";
var Buy$2 = "Buy";
var Filter$2 = "Filter";
var Volume$2 = "Volume";
var Tokens$2 = "Tokens";
var Contact$2 = "Contact";
var Merch$2 = "Merch";
var New$2 = "New";
var Rates$2 = "Rates";
var Price$2 = "Price";
var Prices$2 = "Prices";
var Amount$2 = "Amount";
var Simple$2 = "Simple";
var Detailed$2 = "Detailed";
var Remove$2 = "Remove";
var Input$6 = "Input";
var Output$2 = "Output";
var From$2 = "From";
var To$2 = "To";
var Swap$3 = "Swap";
var Audio$3 = "Audio";
var minutes$2 = "minutes";
var Manage$3 = "Manage";
var Import$2 = "Import";
var via$2 = "via";
var Lists$2 = "Lists";
var See$2 = "See";
var Loaded$2 = "Loaded";
var Loading$3 = "Loading";
var Recipient$2 = "Recipient";
var Dismiss$2 = "Dismiss";
var Latest$2 = "Latest";
var Claimed$2 = "Claimed";
var Settings$2 = "Settings";
var Supply$2 = "Supply";
var Learn$2 = "Learn";
var Wrap$2 = "Wrap";
var Unwrap$2 = "Unwrap";
var Fee$2 = "Fee";
var Route$2 = "Route";
var translationLast$2 = "translationLast";
var translationEnd$2 = "translationEnd";
var translations = {
	dataFormat: dataFormat$2,
	airTime: airTime$2,
	Exchange: Exchange$2,
	"Connect Wallet": "Connect Wallet",
	"Your %asset% Balance": "Your %asset% Balance",
	"My %asset%": "My %asset%",
	"Total %asset% Supply": "Total %asset% Supply",
	Locked: Locked$2,
	"Total Liquidity": "Total Liquidity",
	"View on BscScan": "View on BscScan",
	Finished: Finished$2,
	"Project site": "Project site",
	"Project Site": "Project Site",
	"See Token Info": "See Token Info",
	Total: Total$2,
	End: End$2,
	"View Project Site": "View Project Site",
	"Create a pool for your token": "Create a pool for your token",
	Close: Close$2,
	Max: Max$2,
	"%num% %symbol% Available": "%num% %symbol% Available",
	Cancel: Cancel$2,
	Confirm: Confirm$2,
	Warning: Warning$2,
	"I understand": "I understand",
	"Pending Confirmation": "Pending Confirmation",
	"Buy new tokens with a brand new token sale model.": "Buy new tokens with a brand new token sale model.",
	"You get the tokens.": "You get the tokens.",
	"Want to launch your own IFO?": "Want to launch your own IFO?",
	"Apply to launch": "Apply to launch",
	Core: Core$2,
	Available: Available$2,
	"Sign out": "Sign out",
	Select: Select$2,
	"Launch Time": "Launch Time",
	"For Sale": "For Sale",
	"Done!": "Done!",
	"Read more": "Read more",
	Connect: Connect$2,
	"Loading…": "Loading…",
	Details: Details$2,
	"Wallet Disconnected": "Wallet Disconnected",
	Trade: Trade$2,
	More: More$2,
	Liquidity: Liquidity$2,
	Token: Token$2,
	Pairs: Pairs$2,
	Accounts: Accounts$2,
	Active: Active$2,
	Inactive: Inactive$2,
	Dual: Dual$2,
	Compound: Compound$2,
	"In Wallet": "In Wallet",
	"Loading...": "Loading...",
	Search: Search$2,
	History: History$2,
	Burned: Burned$2,
	"To burn": "To burn",
	"Total Value Locked": "Total Value Locked",
	"Your wallet": "Your wallet",
	Logout: Logout$2,
	Confirmed: Confirmed$2,
	Show: Show$2,
	Hide: Hide$2,
	"Stake LP tokens": "Stake LP tokens",
	Stake: Stake$2,
	"I understand that people can view my wallet if they know my username": "I understand that people can view my wallet if they know my username",
	"Please connect your wallet to continue": "Please connect your wallet to continue",
	"Get %symbol%": "Get %symbol%",
	Balance: Balance$3,
	"Oops, page not found.": "Oops, page not found.",
	"Back Home": "Back Home",
	Live: Live$2,
	Start: Start$2,
	Finish: Finish$2,
	"Connect wallet to view": "Connect wallet to view",
	"Your volume": "Your volume",
	"Since start": "Since start",
	Enable: Enable$2,
	Enabling: Enabling$2,
	Expired: Expired$2,
	Calculating: Calculating$2,
	"Your history": "Your history",
	All: All$2,
	"%num%d": "%num%d",
	d: d$2,
	h: h$2,
	m: m$2,
	"Success!": "Success!",
	Blocks: Blocks$2,
	"Add to Metamask": "Add to Metamask",
	"Insufficient %symbol% balance": "Insufficient %symbol% balance",
	Buy: Buy$2,
	"Locate Assets": "Locate Assets",
	"%symbol% required": "%symbol% required",
	"Your History": "Your History",
	Filter: Filter$2,
	Volume: Volume$2,
	Tokens: Tokens$2,
	Contact: Contact$2,
	Merch: Merch$2,
	New: New$2,
	"Output is estimated. You will receive at least %amount% %symbol% or the transaction will revert.": "Output is estimated. You will receive at least  %amount% %symbol% or the transaction will revert.",
	"Output is estimated. You will receive at least": "Output is estimated. You will receive at least",
	"or the transaction will revert.": "or the transaction will revert.",
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
	Rates: Rates$2,
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
	Price: Price$2,
	Prices: Prices$2,
	"Remove %assetA%-%assetB% liquidity": "Remove %assetA%-%assetB% liquidity",
	Amount: Amount$2,
	Simple: Simple$2,
	Detailed: Detailed$2,
	"Receive WBNB": "Receive WBNB",
	"Receive BNB": "Receive BNB",
	Remove: Remove$2,
	Input: Input$6,
	Output: Output$2,
	"Trade tokens in an instant": "Trade tokens in an instant",
	"From (estimated)": "From (estimated)",
	From: From$2,
	"To (estimated)": "To (estimated)",
	To: To$2,
	"+ Add a send (optional)": "+ Add a send (optional)",
	"- Remove send": "- Remove send",
	"Slippage Tolerance": "Slippage Tolerance",
	"Insufficient liquidity for this trade.": "Insufficient liquidity for this trade.",
	"Try enabling multi-hop trades.": "Try enabling multi-hop trades.",
	"Price Impact High": "Price Impact High",
	Swap: Swap$3,
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
	Audio: Audio$3,
	"🐰 Turn down your volume a bit before you swap": "🐰 Turn down your volume a bit before you swap",
	"Your transaction will revert if the price changes unfavorably by more than this percentage.": "Your transaction will revert if the price changes unfavorably by more than this percentage.",
	"Enter a valid slippage percentage": "Enter a valid slippage percentage",
	"Your transaction may fail": "Your transaction may fail",
	"Your transaction may be frontrun": "Your transaction may be frontrun",
	"Your transaction will revert if it is pending for more than this long.": "Your transaction will revert if it is pending for more than this long.",
	minutes: minutes$2,
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
	Manage: Manage$3,
	"Manage Tokens": "Manage your token list",
	"Import Tokens": "Import Tokens",
	"Import List": "Import List",
	"Import at your own risk": "Import at your own risk",
	"By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.": "By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.",
	"If you purchase a token from this list, you may not be able to sell it back.": "If you purchase a token from this list, you may not be able to sell it back.",
	Import: Import$2,
	via: via$2,
	"Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.": "Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.",
	"If you purchase an arbitrary token, you may be unable to sell it back.": "If you purchase an arbitrary token, you may be unable to sell it back.",
	"Unknown Source": "Unknown Source",
	Lists: Lists$2,
	See: See$2,
	"Update list": "Update list",
	"https:// or ipfs:// or ENS name": "https:// or ipfs:// or ENS name",
	Loaded: Loaded$2,
	Loading: Loading$3,
	"Enter valid token address": "Enter valid token address",
	"Custom Token": "Custom Token",
	"Custom Tokens": "Custom Tokens",
	"Unknown Error": "Unknown Error",
	"Select ": "Select",
	"Search name or paste address": "Search name or paste address",
	"Add %asset% to Metamask": "Add %asset% to Metamask",
	"Added %asset%": "Added %asset%",
	"Transaction Submitted": "Transaction Submitted",
	"Wallet Address or ENS name": "Wallet Address or ENS name",
	Recipient: Recipient$2,
	"Waiting For Confirmation": "Waiting For Confirmation",
	"Confirm this transaction in your wallet": "Confirm this transaction in your wallet",
	Dismiss: Dismiss$2,
	Latest: Latest$2,
	"Notice for trading %symbol%": "Notice for trading %symbol%",
	"To trade SAFEMOON, you must:": "To trade SAFEMOON, you must:",
	"Click on the settings icon": "Click on the settings icon",
	"Set your slippage tolerance to 12%+": "Set your slippage tolerance to 12%+",
	"This is because SafeMoon taxes a 10% fee on each transaction:": "This is because SafeMoon taxes a 10% fee on each transaction:",
	"5% fee = redistributed to all existing holders": "5% fee = redistributed to all existing holders",
	"5% fee = used to add liquidity": "5% fee = used to add liquidity",
	"Warning: BONDLY has been compromised. Please remove liqudity until further notice.": "Warning: BONDLY has been compromised. Please remove liqudity until further notice.",
	Claimed: Claimed$2,
	Settings: Settings$2,
	"Transaction deadline": "Transaction deadline",
	"Convert ERC-20 to BEP-20": "Convert ERC-20 to BEP-20",
	"Need help ?": "Need help ?",
	"Select a token": "Select a token",
	"Enter a recipient": "Enter a recipient",
	"Invalid recipient": "Invalid recipient",
	Supply: Supply$2,
	"Your Liquidity": "Your Liquidity",
	"Remove liquidity to receive tokens back": "Remove liquidity to receive tokens back",
	"Trade anything. No registration, no hassle.": "Trade anything. No registration, no hassle.",
	"Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.": "Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.",
	Learn: Learn$2,
	"BNB token": "BNB token",
	"BTC token": "BTC token",
	"Earn passive income with crypto.": "Earn passive income with crypto.",
	"Unwrap %amoun% %symbolA% to %symbolB%": "Unwrap %amoun% %symbolA% to %symbolB%",
	"Wrap %amoun% %symbolA% to %symbolB%": "Wrap %amoun% %symbolA% to %symbolB%",
	Wrap: Wrap$2,
	Unwrap: Unwrap$2,
	"Aggregate trading": "Aggregate trading",
	"Unable to get trading pool rewards using Aggregate trading": "Unable to get trading pool rewards using Aggregate trading",
	"Disable Route": "Disable Route",
	"Minimum received": "Minimum received",
	"Price Impact": "Price Impact",
	"Liquidity Provider Fee": "Liquidity Provider Fee",
	Fee: Fee$2,
	Route: Route$2,
	"Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.": "Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.",
	"The difference between the market price and estimated price due to trade size.": "The difference between the market price and estimated price due to trade size.",
	"for each trade a 0.3% fee is paid": "for each trade a 0.3% fee is paid",
	"0.1% to the LP token holders": "0.1% to the LP token holders",
	"0.04% to the %symbol% stakers": "0.04% to the %symbol% stakers",
	"0.05% buyback %symbol% and burn": "0.05% buyback %symbol% and burn",
	"0.025% buyback %symbol%, then to %symbol% LP": "0.025% buyback %symbol%, then to %symbol% LP",
	"0.025% to %symbol% holder": "0.025% to %symbol% holder",
	"0.06% to operation fund": "0.06% to operation fund",
	"Routing through these tokens resulted in the best price for your trade.": "Routing through these tokens resulted in the best price for your trade.",
	"Money-hungry Dino": "Money-hungry Dino",
	"Enter an amount": "Enter an amount",
	"Transaction rejected.": "Transaction rejected.",
	"Enter valid list location": "Enter valid list location",
	"Error importing list": "Error importing list",
	translationLast: translationLast$2,
	translationEnd: translationEnd$2
};

var dataFormat$1 = "YYYY-MM-DD";
var airTime$1 = "HHA, MMM-DD";
var Exchange$1 = "兑换";
var Locked$1 = "已锁定";
var Finished$1 = "已完成";
var Total$1 = "总计";
var End$1 = "结束";
var Close$1 = "关闭";
var Max$1 = "最大";
var Cancel$1 = "取消";
var Confirm$1 = "确认";
var Warning$1 = "警告";
var Core$1 = "核心";
var Available$1 = "可用";
var Select$1 = "选择";
var Connect$1 = "连接";
var Details$1 = "详情";
var Trade$1 = "交易";
var More$1 = "更多";
var Liquidity$1 = "流动性";
var Token$1 = "代币";
var Pairs$1 = "币对";
var Accounts$1 = "账户";
var Active$1 = "有效";
var Inactive$1 = "停用";
var Dual$1 = "双重";
var Compound$1 = "复利";
var Search$1 = "搜索";
var History$1 = "历史记录";
var Burned$1 = "销毁";
var Logout$1 = "退出";
var Confirmed$1 = "已确认";
var Show$1 = "显示";
var Hide$1 = "隐藏";
var Stake$1 = "质押";
var Balance$2 = "余额";
var Live$1 = "实时";
var Start$1 = "开始";
var Finish$1 = "完成";
var Enable$1 = "启用";
var Enabling$1 = "启用";
var Expired$1 = "已过期";
var Calculating$1 = "正在计算";
var All$1 = "全部";
var d$1 = "天";
var h$1 = "小时";
var m$1 = "分钟";
var Blocks$1 = "区块";
var Buy$1 = "购买";
var Filter$1 = "筛选器";
var Volume$1 = "交易量";
var Tokens$1 = "代币";
var Contact$1 = "联系";
var Merch$1 = "商品";
var New$1 = "新";
var Rates$1 = "汇率";
var Price$1 = "价格";
var Prices$1 = "价格";
var Amount$1 = "金额";
var Simple$1 = "简单";
var Detailed$1 = "详细";
var Remove$1 = "移除";
var Input$5 = "输入";
var Output$1 = "输出";
var From$1 = "从";
var To$1 = "到";
var Swap$2 = "兑换";
var Audio$2 = "音频";
var minutes$1 = "分钟";
var Manage$2 = "管理";
var Import$1 = "导入";
var via$1 = "通过";
var Lists$1 = "列表";
var See$1 = "查看";
var Loaded$1 = "已加载";
var Loading$2 = "正在加载";
var Recipient$1 = "接收人";
var Dismiss$1 = "取消";
var Latest$1 = "最新";
var Claimed$1 = "已领取";
var Settings$1 = "设置";
var Supply$1 = "供应";
var Accept$1 = "同意";
var Learn$1 = "了解";
var Wrap$1 = "兑换";
var Unwrap$1 = "兑换";
var Route$1 = "路由";
var Fee$1 = "手续费";
var translationLast$1 = "translationLast";
var translationEnd$1 = "translationEnd";
var translationsZhCN = {
	dataFormat: dataFormat$1,
	airTime: airTime$1,
	Exchange: Exchange$1,
	"Connect Wallet": "连接钱包",
	"Your %asset% Balance": "您的 %asset% 余额",
	"My %asset%": "我的 %asset%",
	"Total %asset% Supply": "%asset% 总供应量",
	Locked: Locked$1,
	"Total Liquidity": "总流动性",
	"View on BscScan": "在 BscScan 上查看",
	Finished: Finished$1,
	"Project site": "项目网站",
	"Project Site": "Project Site",
	"See Token Info": "查看代币信息",
	Total: Total$1,
	End: End$1,
	"View Project Site": "查看项目网站",
	"Create a pool for your token": "为您的代币创建资金池",
	Close: Close$1,
	Max: Max$1,
	"%num% %symbol% Available": "%num% %symbol% 可用",
	Cancel: Cancel$1,
	Confirm: Confirm$1,
	Warning: Warning$1,
	"I understand": "我了解",
	"Pending Confirmation": "等待确认",
	"Buy new tokens with a brand new token sale model.": "使用全新的代币销售模型购买新代币。",
	"You get the tokens.": "您获得了代币。",
	"Want to launch your own IFO?": "想要发起您自己的 IFO？",
	"Apply to launch": "申请发起",
	Core: Core$1,
	Available: Available$1,
	"Sign out": "退出",
	Select: Select$1,
	"Launch Time": "发起时间",
	"For Sale": "待售",
	"Done!": "完成！",
	"Read more": "阅读更多",
	Connect: Connect$1,
	"Loading…": "正在加载…",
	Details: Details$1,
	"Wallet Disconnected": "钱包已断开连接",
	Trade: Trade$1,
	More: More$1,
	Liquidity: Liquidity$1,
	Token: Token$1,
	Pairs: Pairs$1,
	Accounts: Accounts$1,
	Active: Active$1,
	Inactive: Inactive$1,
	Dual: Dual$1,
	Compound: Compound$1,
	"In Wallet": "钱包中",
	"Loading...": "正在加载…",
	Search: Search$1,
	History: History$1,
	Burned: Burned$1,
	"To burn": "要焚毁",
	"Total Value Locked": "锁定的总价值",
	"Your wallet": "您的钱包",
	Logout: Logout$1,
	Confirmed: Confirmed$1,
	Show: Show$1,
	Hide: Hide$1,
	"Stake LP tokens": "质押 LP 代币",
	Stake: Stake$1,
	"I understand that people can view my wallet if they know my username": "我了解，如果其他人知道我的用户名，他们就可以查看我的钱包",
	"Please connect your wallet to continue": "请连接您的钱包以继续",
	"Get %symbol%": "获取 %symbol%",
	Balance: Balance$2,
	"Oops, page not found.": "糟糕，找不到页面",
	"Back Home": "返回首页",
	Live: Live$1,
	Start: Start$1,
	Finish: Finish$1,
	"Connect wallet to view": "连接要查看的钱包",
	"Your volume": "交易量",
	"Since start": "自开始以来的时间",
	Enable: Enable$1,
	Enabling: Enabling$1,
	Expired: Expired$1,
	Calculating: Calculating$1,
	"Your history": "历史记录",
	All: All$1,
	"%num%d": "%num%d",
	d: d$1,
	h: h$1,
	m: m$1,
	"Success!": "成功！",
	Blocks: Blocks$1,
	"Add to Metamask": "添加到 Metamask",
	"Insufficient %symbol% balance": "%symbol% 余额不足",
	Buy: Buy$1,
	"Locate Assets": "查找资产",
	"%symbol% required": "需要 %symbol%",
	"Your History": "历史记录",
	Filter: Filter$1,
	Volume: Volume$1,
	Tokens: Tokens$1,
	Contact: Contact$1,
	Merch: Merch$1,
	New: New$1,
	"Output is estimated. If the price changes by more than %slippage%% your transaction will revert.": "输出为估值。如果价格变化超过 %slippage%%，则您的交易将被撤回。",
	"Output is estimated. You will receive at least  %amount% %symbol% or the transaction will revert.": "输出为估值。你将收到最少%amount% %symbol%，否则您的交易将被撤回。",
	"Output is estimated. You will receive at least": "输出为估值。你将收到最少",
	"or the transaction will revert.": "否则您的交易将被撤回。",
	"Supplying %amountA% %symbolA% and %amountB% %symbolB%": "正在供应 %amountA% %symbolA% 和 %amountB% %symbolB%",
	"Removing %amountA% %symbolA% and %amountB% %symbolB%": "正在移除 %amountA% %symbolA% 和 %amountB% %symbolB%",
	"Swapping %amountA% %symbolA% for %amountB% %symbolB%": "正在将 %amountA% %symbolA% 兑换为 %amountB% %symbolB%",
	"Add Liquidity": "增加流动性",
	"Add liquidity to receive LP tokens": "增加流动性以接收 LP 代币",
	"Liquidity providers earn a 0.1% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.": "流动性供应商将对该代币对的所有交易赚取 0.1% 的交易费，与他们在流动性资金池中的份额成正比。",
	"You are creating a pool": "您正在创建资金池",
	"You are the first liquidity provider.": "您是第一个流动性供应商。",
	"The ratio of tokens you add will set the price of this pool.": "您添加的代币比率将设置此资金池的价格。",
	"Once you are happy with the rate click supply to review.": "如果您对汇率满意，请点击“供应”以进行检查。",
	"Initial prices and pool share": "初始价格和资金池份额",
	"Prices and pool share": "价格和资金池份额",
	"Unsupported Asset": "不受支持的资产",
	"Enabling %asset%": "正在批准 %asset%",
	"Enable %asset%": "批准 %asset%",
	"Share of Pool": "资金池中的份额",
	"%assetA% per %assetB%": "%assetA%/%assetB%",
	"%asset% Deposited": "已入金 %asset%",
	Rates: Rates$1,
	"Create Pool & Supply": "创建资金池和供应",
	"Confirm Supply": "确认供应",
	"Confirm Swap": "确认兑换",
	"Connect to a wallet to view your liquidity.": "连接到钱包以查看您的流动性。",
	"Connect to a wallet to find pools": "连接到钱包以查找资金池",
	"Select a token to find your liquidity.": "选择代币以查找您的流动性。",
	"No liquidity found.": "未找到流动性。",
	"Don't see a pool you joined?": "未看到您加入的资金池？",
	"Find other LP tokens": "查找其他 LP 代币",
	"Import Pool": "导入资金池",
	"Import an existing pool": "导入现有资金池",
	"Select a Token": "选择代币",
	"Pool Found!": "发现资金池！",
	"No pool found.": "未找到资金池。",
	"Create pool.": "创建资金池。",
	"Manage this pool.": "管理此资金池。",
	"Invalid pair.": "币对无效。",
	"You don’t have liquidity in this pool yet.": "您在此资金池中还没有流动性。",
	"%assetA%/%assetB% Burned": "已焚毁 %assetA%/%assetB%",
	Price: Price$1,
	Prices: Prices$1,
	"Remove %assetA%-%assetB% liquidity": "移除 %assetA%-%assetB% 流动性",
	Amount: Amount$1,
	Simple: Simple$1,
	Detailed: Detailed$1,
	"Receive WBNB": "接收 WBNB",
	"Receive BNB": "接收 BNB",
	Remove: Remove$1,
	Input: Input$5,
	Output: Output$1,
	"Trade tokens in an instant": "即时交易兑换代币",
	"From (estimated)": "从（估计）",
	From: From$1,
	"To (estimated)": "到（估计）",
	To: To$1,
	"+ Add a send (optional)": "+ 添加发送（可选）",
	"- Remove send": "- 移除发送",
	"Slippage Tolerance": "滑点容差",
	"Insufficient liquidity for this trade.": "此交易的流动性不足。",
	"Try enabling multi-hop trades.": "尝试启用多跳交易。",
	"Price Impact High": "价格影响较高",
	Swap: Swap$2,
	"Swap Anyway": "仍要兑换",
	"Recent Transactions": "最近的交易",
	"clear all": "全部清除",
	"Clear all": "全部清除",
	"No recent transactions": "最近没有交易",
	"Are you sure?": "您确定吗？",
	"Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.": "专家模式会关闭“确认”交易提示，并允许进行常会导致汇率不佳和资金损失的高滑点交易。",
	"Only use this mode if you know what you’re doing.": "请仅在您清楚自身需求时才使用此模式。",
	"Turn On Expert Mode": "开启专家模式",
	"Transaction Settings": "交易设置",
	"Interface Settings": "界面设置",
	"Toggle Expert Mode": "切换专家模式",
	"Bypasses confirmation modals and allows high slippage trades. Use at your own risk.": "绕过确认模式并允许高滑点交易。使用风险自负。",
	"Disable Multihops": "禁用多跳",
	"Restricts swaps to direct pairs only.": "将兑换限制为仅限直接币对。",
	Audio: Audio$2,
	"🐰 Turn down your volume a bit before you swap": "🐰 在您兑换之前略微调低音量",
	"Your transaction will revert if the price changes unfavorably by more than this percentage.": "如果价格变动幅度超过此百分比，您的交易将被撤回。",
	"Enter a valid slippage percentage": "输入有效的滑点百分比",
	"Your transaction may fail": "您的交易可能会失败",
	"Your transaction may be frontrun": "您的交易可能会被超前交易",
	"Your transaction will revert if it is pending for more than this long.": "如果您的交易等待处理的时间超过此时间，它将被撤回。",
	minutes: minutes$1,
	"Token Amount": "代币金额",
	"Balance: %amount%": "余额：%amount%",
	"LP tokens in your wallet": "您的钱包中的 LP 代币",
	"Pooled %asset%": "已入池 %asset%",
	"By adding liquidity, you will earn 0.1% of all transactions for the pair, proportional to your share in the pool. The fees accrued each day will be added to the pool the following day, and you can receive your earnings by removing your liquidity.": "通过添加流动性，您将赚取该币对所有交易额的0.1%，与您在资金池中的份额成正比。每天累计的费用将在次日添加到资金池中，可通过解除流动性来领取收益。",
	"Common bases": "一般基准",
	"These tokens are commonly paired with other tokens.": "这些代币通常与其他代币配对。",
	"Expanded results from inactive Token Lists": "来自停用代币列表的扩展结果",
	"Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists.": "代币来自停用列表。在下方导入特定代币或点击“管理”以激活更多列表。",
	"No results found.": "未找到结果。",
	Manage: Manage$2,
	"Manage Tokens": "管理代币",
	"Import Tokens": "导入代币",
	"Import List": "导入列表",
	"Import at your own risk": "导入风险自负",
	"By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.": "添加此列表，即表示您完全信任数据的正确性。任何人都可以创建列表，包括创建现有列表的虚假版本和声称代表没有列表的项目的列表。",
	"If you purchase a token from this list, you may not be able to sell it back.": "如果您购买了此列表中的代币，则可能无法将其出售。",
	Import: Import$1,
	via: via$1,
	"Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.": "任何人都可以在 BSC 上使用任意名称创建 BEP20 代币，包括创建虚假版本的现有代币和声称代表没有代币的项目的代币。",
	"If you purchase an arbitrary token, you may be unable to sell it back.": "如果您购买任意代币，可能无法将其出售。",
	"Unknown Source": "未知来源",
	Lists: Lists$1,
	See: See$1,
	"Update list": "更新列表",
	"https:// or ipfs:// or ENS name": "https:// 或 ipfs:// 或 ENS 名称",
	Loaded: Loaded$1,
	Loading: Loading$2,
	"Enter valid token address": "输入有效的代币地址",
	"Custom Token": "自定义代币",
	"Custom Tokens": "自定义代币",
	"Unknown Error": "未知错误",
	"Select ": "选择币种",
	"Search name or paste address": "搜索名称或粘贴地址",
	"Add %asset% to Metamask": "将 %asset% 添加到 Metamask",
	"Added %asset%": "已添加 %asset%",
	"Transaction Submitted": "已提交交易",
	"Wallet Address or ENS name": "钱包地址或 ENS 名称",
	Recipient: Recipient$1,
	"Waiting For Confirmation": "正在等待确认",
	"Confirm this transaction in your wallet": "在您的钱包中确认此交易",
	Dismiss: Dismiss$1,
	Latest: Latest$1,
	"Notice for trading %symbol%": "关于 %symbol% 的交易须知",
	"To trade SAFEMOON, you must:": "若要交易 SafeMoon，您必须：",
	"Click on the settings icon": "点击设置图标",
	"Set your slippage tolerance to 12%+": "把滑点设置为 12% 或更高",
	"This is because SafeMoon taxes a 10% fee on each transaction:": "这是因为交易 SafeMoon 时需支付 10% 的费用：",
	"5% fee = redistributed to all existing holders": "5% 费用 = 分配给所有持有者",
	"5% fee = used to add liquidity": "5% 费用 = 用于添加流动性",
	"Warning: BONDLY has been compromised. Please remove liqudity until further notice.": "警告：BONDLY 已被攻击，在得到进一步通知之前，请移除流动性",
	Claimed: Claimed$1,
	Settings: Settings$1,
	"Transaction deadline": "交易截止期",
	"Convert ERC-20 to BEP-20": "将 ERC-20 转换为 BEP-20",
	"Need help ?": "需要帮助？",
	"Select a token": "选择代币",
	"Enter a recipient": "输入接收人",
	"Invalid recipient": "接收人无效",
	Supply: Supply$1,
	Accept: Accept$1,
	"Price Updated": "价格已更新",
	"Your Liquidity": "您的流动性",
	"Remove liquidity to receive tokens back": "移除流动性以收回代币",
	"Trade anything. No registration, no hassle.": "交易任何代币。无需注册，不必麻烦。",
	"Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.": "只需连接您的钱包，即可在 Binance Smart Chain 上快速交易任何代币。",
	Learn: Learn$1,
	"BNB token": "BNB 代币",
	"BTC token": "BTC 代币",
	"Earn passive income with crypto.": "利用加密货币赚取被动收入。",
	"Unwrap %amoun% %symbolA% to %symbolB%": "兑换 %amoun% %symbolA% 到 %symbolB%",
	"Wrap %amoun% %symbolA% to %symbolB%": "兑换 %amoun% %symbolA% 到 %symbolB%",
	Wrap: Wrap$1,
	Unwrap: Unwrap$1,
	"Aggregate trading": "聚合交易",
	"Unable to get trading pool rewards using Aggregate trading": "使用聚合交易无法获得交易挖矿奖励",
	"Disable Route": "禁用路由",
	"Minimum received": "最小获得量",
	"Maximum sold": "最大出售量",
	"Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.": "如果在交易确认之前价格有较大的不利变动，你的交易将被退回。",
	"Price Impact": "价格影响",
	Route: Route$1,
	"The difference between the market price and your price due to trade size.": "由于交易规模，市场价格与您的价格之间的差异。",
	"The difference between the market price and estimated price due to trade size.": "由于交易规模造成的市场价格与估计价格之间的差异 ",
	"for each trade a 0.3% fee is paid": "每笔交易需要支付0.3%的手续费，其中",
	"0.1% to the LP token holders": "0.1%分配给流动性提供者",
	"0.04% to the %symbol% stakers": "0.04%分配给持有%symbol%并质押的用户",
	"0.05% buyback %symbol% and burn": "0.05%回购%symbol%进行销毁",
	"0.025% buyback %symbol%, then to %symbol% LP": "0.025%回购%symbol%注入%symbol%交易对的流动性池",
	"0.025% to %symbol% holder": "0.025%分配给%symbol%质押用户",
	"0.06% to operation fund": "0.06%分配给运营基金",
	"Liquidity Provider Fee": "流动性提供者费用",
	Fee: Fee$1,
	"Routing through these tokens resulted in the best price for your trade.": "使交易获得最佳价格的路由。",
	"Money-hungry Dino": "贪财龙",
	"Enter an amount": "输入金额",
	"Transaction rejected.": "交易被拒绝。",
	"Enter valid list location": "輸入有效的列表位置",
	translationLast: translationLast$1,
	translationEnd: translationEnd$1
};

var dataFormat = "YYYY-MM-DD";
var airTime = "HHA, MMM-DD";
var Exchange = "兌換";
var Locked = "已鎖定";
var Finished = "已完成";
var Total = "總計";
var End = "結束";
var Close = "關閉";
var Max = "最大";
var Cancel = "取消";
var Confirm = "確認";
var Warning = "警告";
var Core = "核心";
var Available = "可用";
var Select = "選擇";
var Connect = "連接";
var Details = "詳情";
var Trade = "交易";
var More = "更多";
var Liquidity = "流動性";
var Token = "代幣";
var Pairs = "幣對";
var Accounts = "賬戶";
var Active = "有效";
var Inactive = "停用";
var Dual = "雙重";
var Compound = "復利";
var Search = "搜索";
var History = "歷史記錄";
var Burned = "銷毀";
var Logout = "退出";
var Confirmed = "已確認";
var Show = "顯示";
var Hide = "隱藏";
var Stake = "質押";
var Balance$1 = "余額";
var Live = "實時";
var Start = "開始";
var Finish = "完成";
var Enable = "啟用";
var Enabling = "啟用";
var Expired = "已過期";
var Calculating = "正在計算";
var All = "全部";
var d = "天";
var h = "小時";
var m = "分鐘";
var Blocks = "區塊";
var Buy = "購買";
var Filter = "篩選器";
var Volume = "交易量";
var Tokens = "代幣";
var Contact = "聯系";
var Merch = "商品";
var New = "新";
var Rates = "匯率";
var Price = "價格";
var Prices = "價格";
var Amount = "金額";
var Simple = "簡單";
var Detailed = "詳細";
var Remove = "移除";
var Input$4 = "輸入";
var Output = "輸出";
var From = "從";
var To = "到";
var Swap$1 = "兌換";
var Audio$1 = "音頻";
var minutes = "分鐘";
var Manage$1 = "管理";
var Import = "導入";
var via = "通過";
var Lists = "列表";
var See = "查看";
var Loaded = "已加載";
var Loading$1 = "正在加載";
var Recipient = "接收人";
var Dismiss = "取消";
var Latest = "最新";
var Claimed = "已領取";
var Settings = "設置";
var Supply = "供應";
var Accept = "同意";
var Learn = "了解";
var Wrap = "兌換";
var Unwrap = "兌換";
var Route = "路由";
var Fee = "手續費";
var translationLast = "translationLast";
var translationEnd = "translationEnd";
var translationsZhTW = {
	dataFormat: dataFormat,
	airTime: airTime,
	Exchange: Exchange,
	"Connect Wallet": "連接錢包",
	"Your %asset% Balance": "您的 %asset% 余額",
	"My %asset%": "我的 %asset%",
	"Total %asset% Supply": "%asset% 總供應量",
	Locked: Locked,
	"Total Liquidity": "總流動性",
	"View on BscScan": "在 BscScan 上查看",
	Finished: Finished,
	"Project site": "項目網站",
	"Project Site": "Project Site",
	"See Token Info": "查看代幣信息",
	Total: Total,
	End: End,
	"View Project Site": "查看項目網站",
	"Create a pool for your token": "為您的代幣創建資金池",
	Close: Close,
	Max: Max,
	"%num% %symbol% Available": "%num% %symbol% 可用",
	Cancel: Cancel,
	Confirm: Confirm,
	Warning: Warning,
	"I understand": "我了解",
	"Pending Confirmation": "等待確認",
	"Buy new tokens with a brand new token sale model.": "使用全新的代幣銷售模型購買新代幣。",
	"You get the tokens.": "您獲得了代幣。",
	"Want to launch your own IFO?": "想要發起您自己的 IFO？",
	"Apply to launch": "申請發起",
	Core: Core,
	Available: Available,
	"Sign out": "退出",
	Select: Select,
	"Launch Time": "發起時間",
	"For Sale": "待售",
	"Done!": "完成！",
	"Read more": "閱讀更多",
	Connect: Connect,
	"Loading…": "正在加載…",
	Details: Details,
	"Wallet Disconnected": "錢包已斷開連接",
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
	"In Wallet": "錢包中",
	"Loading...": "正在加載…",
	Search: Search,
	History: History,
	Burned: Burned,
	"To burn": "要焚毀",
	"Total Value Locked": "鎖定的總價值",
	"Your wallet": "您的錢包",
	Logout: Logout,
	Confirmed: Confirmed,
	Show: Show,
	Hide: Hide,
	"Stake LP tokens": "質押 LP 代幣",
	Stake: Stake,
	"I understand that people can view my wallet if they know my username": "我了解，如果其他人知道我的用戶名，他們就可以查看我的錢包",
	"Please connect your wallet to continue": "請連接您的錢包以繼續",
	"Get %symbol%": "獲取 %symbol%",
	Balance: Balance$1,
	"Oops, page not found.": "糟糕，找不到頁面",
	"Back Home": "返回首頁",
	Live: Live,
	Start: Start,
	Finish: Finish,
	"Connect wallet to view": "連接要查看的錢包",
	"Your volume": "交易量",
	"Since start": "自開始以來的時間",
	Enable: Enable,
	Enabling: Enabling,
	Expired: Expired,
	Calculating: Calculating,
	"Your history": "歷史記錄",
	All: All,
	"%num%d": "%num%d",
	d: d,
	h: h,
	m: m,
	"Success!": "成功！",
	Blocks: Blocks,
	"Add to Metamask": "添加到 Metamask",
	"Insufficient %symbol% balance": "%symbol% 余額不足",
	Buy: Buy,
	"Locate Assets": "查找資產",
	"%symbol% required": "需要 %symbol%",
	"Your History": "歷史記錄",
	Filter: Filter,
	Volume: Volume,
	Tokens: Tokens,
	Contact: Contact,
	Merch: Merch,
	New: New,
	"Output is estimated. If the price changes by more than %slippage%% your transaction will revert.": "輸出為估值。如果價格變化超過 %slippage%%，則您的交易將被撤回。",
	"Output is estimated. You will receive at least  %amount% %symbol% or the transaction will revert.": "輸出為估值。你將收到最少%amount% %symbol%，否則您的交易將被撤回。",
	"Output is estimated. You will receive at least": "輸出為估值。你將收到最少",
	"or the transaction will revert.": "否則您的交易將被撤回。",
	"Supplying %amountA% %symbolA% and %amountB% %symbolB%": "正在供應 %amountA% %symbolA% 和 %amountB% %symbolB%",
	"Removing %amountA% %symbolA% and %amountB% %symbolB%": "正在移除 %amountA% %symbolA% 和 %amountB% %symbolB%",
	"Swapping %amountA% %symbolA% for %amountB% %symbolB%": "正在將 %amountA% %symbolA% 兌換為 %amountB% %symbolB%",
	"Add Liquidity": "增加流動性",
	"Add liquidity to receive LP tokens": "增加流動性以接收 LP 代幣",
	"Liquidity providers earn a 0.1% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.": "流動性供應商將對該代幣對的所有交易賺取 0.1% 的交易費，與他們在流動性資金池中的份額成正比。",
	"You are creating a pool": "您正在創建資金池",
	"You are the first liquidity provider.": "您是第一個流動性供應商。",
	"The ratio of tokens you add will set the price of this pool.": "您添加的代幣比率將設置此資金池的價格。",
	"Once you are happy with the rate click supply to review.": "如果您對匯率滿意，請點擊「供應」以進行檢查。",
	"Initial prices and pool share": "初始價格和資金池份額",
	"Prices and pool share": "價格和資金池份額",
	"Unsupported Asset": "不受支持的資產",
	"Enabling %asset%": "正在批準 %asset%",
	"Enable %asset%": "批準 %asset%",
	"Share of Pool": "資金池中的份額",
	"%assetA% per %assetB%": "%assetA%/%assetB%",
	"%asset% Deposited": "已入金 %asset%",
	Rates: Rates,
	"Create Pool & Supply": "創建資金池和供應",
	"Confirm Supply": "確認供應",
	"Confirm Swap": "確認兌換",
	"Connect to a wallet to view your liquidity.": "連接到錢包以查看您的流動性。",
	"Connect to a wallet to find pools": "連接到錢包以查找資金池",
	"Select a token to find your liquidity.": "選擇代幣以查找您的流動性。",
	"No liquidity found.": "未找到流動性。",
	"Don't see a pool you joined?": "未看到您加入的資金池？",
	"Find other LP tokens": "查找其他 LP 代幣",
	"Import Pool": "導入資金池",
	"Import an existing pool": "導入現有資金池",
	"Select a Token": "選擇代幣",
	"Pool Found!": "發現資金池！",
	"No pool found.": "未找到資金池。",
	"Create pool.": "創建資金池。",
	"Manage this pool.": "管理此資金池。",
	"Invalid pair.": "幣對無效。",
	"You don』t have liquidity in this pool yet.": "您在此資金池中還沒有流動性。",
	"%assetA%/%assetB% Burned": "已焚毀 %assetA%/%assetB%",
	Price: Price,
	Prices: Prices,
	"Remove %assetA%-%assetB% liquidity": "移除 %assetA%-%assetB% 流動性",
	Amount: Amount,
	Simple: Simple,
	Detailed: Detailed,
	"Receive WBNB": "接收 WBNB",
	"Receive BNB": "接收 BNB",
	Remove: Remove,
	Input: Input$4,
	Output: Output,
	"Trade tokens in an instant": "即時交易兌換代幣",
	"From (estimated)": "從（估計）",
	From: From,
	"To (estimated)": "到（估計）",
	To: To,
	"+ Add a send (optional)": "+ 添加發送（可選）",
	"- Remove send": "- 移除發送",
	"Slippage Tolerance": "滑點容差",
	"Insufficient liquidity for this trade.": "此交易的流動性不足。",
	"Try enabling multi-hop trades.": "嘗試啟用多跳交易。",
	"Price Impact High": "價格影響較高",
	Swap: Swap$1,
	"Swap Anyway": "仍要兌換",
	"Recent Transactions": "最近的交易",
	"clear all": "全部清除",
	"Clear all": "全部清除",
	"No recent transactions": "最近沒有交易",
	"Are you sure?": "您確定嗎？",
	"Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.": "專家模式會關閉「確認」交易提示，並允許進行常會導致匯率不佳和資金損失的高滑點交易。",
	"Only use this mode if you know what you』re doing.": "請僅在您清楚自身需求時才使用此模式。",
	"Turn On Expert Mode": "開啟專家模式",
	"Transaction Settings": "交易設置",
	"Interface Settings": "界面設置",
	"Toggle Expert Mode": "切換專家模式",
	"Bypasses confirmation modals and allows high slippage trades. Use at your own risk.": "繞過確認模式並允許高滑點交易。使用風險自負。",
	"Disable Multihops": "禁用多跳",
	"Restricts swaps to direct pairs only.": "將兌換限製為僅限直接幣對。",
	Audio: Audio$1,
	"🐰 Turn down your volume a bit before you swap": "🐰 在您兌換之前略微調低音量",
	"Your transaction will revert if the price changes unfavorably by more than this percentage.": "如果價格變動幅度超過此百分比，您的交易將被撤回。",
	"Enter a valid slippage percentage": "輸入有效的滑點百分比",
	"Your transaction may fail": "您的交易可能會失敗",
	"Your transaction may be frontrun": "您的交易可能會被超前交易",
	"Your transaction will revert if it is pending for more than this long.": "如果您的交易等待處理的時間超過此時間，它將被撤回。",
	minutes: minutes,
	"Token Amount": "代幣金額",
	"Balance: %amount%": "余額：%amount%",
	"LP tokens in your wallet": "您的錢包中的 LP 代幣",
	"Pooled %asset%": "已入池 %asset%",
	"By adding liquidity, you will earn 0.1% of all transactions for the pair, proportional to your share in the pool. The fees accrued each day will be added to the pool the following day, and you can receive your earnings by removing your liquidity.": "通過添加流動性，您將賺取該幣對所有交易額的0.1%，與您在資金池中的份額成正比。每天累計的費用將在次日添加到資金池中，可通過解除流動性來領取收益。",
	"Common bases": "一般基準",
	"These tokens are commonly paired with other tokens.": "這些代幣通常與其他代幣配對。",
	"Expanded results from inactive Token Lists": "來自停用代幣列表的擴展結果",
	"Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists.": "代幣來自停用列表。在下方導入特定代幣或點擊「管理」以激活更多列表。",
	"No results found.": "未找到結果。",
	Manage: Manage$1,
	"Manage Tokens": "管理代幣",
	"Import Tokens": "導入代幣",
	"Import List": "導入列表",
	"Import at your own risk": "導入風險自負",
	"By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.": "添加此列表，即表示您完全信任數據的正確性。任何人都可以創建列表，包括創建現有列表的虛假版本和聲稱代表沒有列表的項目的列表。",
	"If you purchase a token from this list, you may not be able to sell it back.": "如果您購買了此列表中的代幣，則可能無法將其出售。",
	Import: Import,
	via: via,
	"Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.": "任何人都可以在 BSC 上使用任意名稱創建 BEP20 代幣，包括創建虛假版本的現有代幣和聲稱代表沒有代幣的項目的代幣。",
	"If you purchase an arbitrary token, you may be unable to sell it back.": "如果您購買任意代幣，可能無法將其出售。",
	"Unknown Source": "未知來源",
	Lists: Lists,
	See: See,
	"Update list": "更新列表",
	"https:// or ipfs:// or ENS name": "https:// 或 ipfs:// 或 ENS 名稱",
	Loaded: Loaded,
	Loading: Loading$1,
	"Enter valid token address": "輸入有效的代幣地址",
	"Custom Token": "自定義代幣",
	"Custom Tokens": "自定義代幣",
	"Unknown Error": "未知錯誤",
	"Select ": "選擇幣種",
	"Search name or paste address": "搜索名稱或粘貼地址",
	"Add %asset% to Metamask": "將 %asset% 添加到 Metamask",
	"Added %asset%": "已添加 %asset%",
	"Transaction Submitted": "已提交交易",
	"Wallet Address or ENS name": "錢包地址或 ENS 名稱",
	Recipient: Recipient,
	"Waiting For Confirmation": "正在等待確認",
	"Confirm this transaction in your wallet": "在您的錢包中確認此交易",
	Dismiss: Dismiss,
	Latest: Latest,
	"Notice for trading %symbol%": "關於 %symbol% 的交易須知",
	"To trade SAFEMOON, you must:": "若要交易 SafeMoon，您必須：",
	"Click on the settings icon": "點擊設置圖標",
	"Set your slippage tolerance to 12%+": "把滑點設置為 12% 或更高",
	"This is because SafeMoon taxes a 10% fee on each transaction:": "這是因為交易 SafeMoon 時需支付 10% 的費用：",
	"5% fee = redistributed to all existing holders": "5% 費用 = 分配給所有持有者",
	"5% fee = used to add liquidity": "5% 費用 = 用於添加流動性",
	"Warning: BONDLY has been compromised. Please remove liqudity until further notice.": "警告：BONDLY 已被攻擊，在得到進一步通知之前，請移除流動性",
	Claimed: Claimed,
	Settings: Settings,
	"Transaction deadline": "交易截止期",
	"Convert ERC-20 to BEP-20": "將 ERC-20 轉換為 BEP-20",
	"Need help ?": "需要幫助？",
	"Select a token": "選擇代幣",
	"Enter a recipient": "輸入接收人",
	"Invalid recipient": "接收人無效",
	Supply: Supply,
	Accept: Accept,
	"Price Updated": "價格已更新",
	"Your Liquidity": "您的流動性",
	"Remove liquidity to receive tokens back": "移除流動性以收回代幣",
	"Trade anything. No registration, no hassle.": "交易任何代幣。無需註冊，不必麻煩。",
	"Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.": "只需連接您的錢包，即可在 Binance Smart Chain 上快速交易任何代幣。",
	Learn: Learn,
	"BNB token": "BNB 代幣",
	"BTC token": "BTC 代幣",
	"Earn passive income with crypto.": "利用加密貨幣賺取被動收入。",
	"Unwrap %amoun% %symbolA% to %symbolB%": "兌換 %amoun% %symbolA% 到 %symbolB%",
	"Wrap %amoun% %symbolA% to %symbolB%": "兌換 %amoun% %symbolA% 到 %symbolB%",
	Wrap: Wrap,
	Unwrap: Unwrap,
	"Aggregate trading": "聚合交易",
	"Unable to get trading pool rewards using Aggregate trading": "使用聚合交易無法獲得交易挖礦獎勵",
	"Disable Route": "禁用路由",
	"Minimum received": "最小獲得量",
	"Maximum sold": "最大出售量",
	"Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.": "如果在交易確認之前價格有較大的不利變動，你的交易將被退回。",
	"Price Impact": "價格影響",
	Route: Route,
	"The difference between the market price and your price due to trade size.": "由於交易規模，市場價格與您的價格之間的差異。",
	"The difference between the market price and estimated price due to trade size.": "由於交易規模造成的市場價格與估計價格之間的差異 ",
	"for each trade a 0.3% fee is paid": "每筆交易需要支付0.3%的手續費，其中",
	"0.1% to the LP token holders": "0.1%分配給流動性提供者",
	"0.04% to the %symbol% stakers": "0.04%分配給持有%symbol%並質押的用戶",
	"0.05% buyback %symbol% and burn": "0.05%回購%symbol%進行銷毀",
	"0.025% buyback %symbol%, then to %symbol% LP": "0.025%回購%symbol%註入%symbol%交易對的流動性池",
	"0.025% to %symbol% holder": "0.025%分配給%symbol%質押用戶",
	"0.06% to operation fund": "0.06%分配給運營基金",
	"Liquidity Provider Fee": "流動性提供者費用",
	Fee: Fee,
	"Routing through these tokens resulted in the best price for your trade.": "使交易獲得最佳價格的路由。",
	"Money-hungry Dino": "貪財龍",
	"Enter an amount": "輸入金額",
	"Transaction rejected.": "交易被拒絕。",
	"Enter valid list location": "輸入有效的列表位置",
	"Error importing list": "導入列表時出錯",
	translationLast: translationLast,
	translationEnd: translationEnd
};

var _a$c;
var translation = (_a$c = {},
    _a$c[EN.locale] = translations,
    _a$c[ZHCN.locale] = translationsZhCN,
    _a$c[ZHTW.locale] = translationsZhTW,
    _a$c);
var fetchLocale = function (locale) { return tslib.__awaiter(void 0, void 0, void 0, function () {
    return tslib.__generator(this, function (_a) {
        // const response = await fetch(`${publicUrl}/locales/${locale}.json`)
        // const data = await response.json()
        return [2 /*return*/, translation[locale]];
    });
}); };
var getLanguageCodeFromLS = function () {
    try {
        // const codeFromStorage = localStorage.getItem(LS_KEY)
        // return codeFromStorage || EN.locale
        return EN.locale;
    }
    catch (_a) {
        return EN.locale;
    }
};

new BigNumber__default["default"](0);
new BigNumber__default["default"](1);
new BigNumber__default["default"](9);
var BIG_TEN = new BigNumber__default["default"](10);
new BigNumber__default["default"](1000000000);

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
var getDecimalAmount = function (amount, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return new BigNumber__default["default"](amount).times(BIG_TEN.pow(decimals));
};

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

// modified from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
    var _a = tslib.__read(React.useState(value), 2), debouncedValue = _a[0], setDebouncedValue = _a[1];
    React.useEffect(function () {
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

var _a$b;
var contracts = {
    SwapRouter: (_a$b = {},
        _a$b[dsgswapSdk.ChainId.MAINNET] = '0xe9c7650b97712c0ec958ff270fbf4189fb99c071',
        _a$b[dsgswapSdk.ChainId.TESTNET] = '0xddb1a59ad3b87b914c4466dc6c39c2542ec565a1',
        _a$b[dsgswapSdk.ChainId.MATIC_MAINNET] = '0xddb1a59ad3b87b914c4466dc6c39c2542ec565a1',
        _a$b[dsgswapSdk.ChainId.MATIC_TESTNET] = '0xddb1a59ad3b87b914c4466dc6c39c2542ec565a1',
        _a$b)
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
        return address.getAddress(value);
    }
    catch (_a) {
        return false;
    }
}
function getBscScanLink(data, type, chainId) {
    if (chainId === void 0) { chainId = dsgswapSdk.chainIdProxy.chainId; }
    switch (type) {
        case 'transaction': {
            return dsgswapSdk.BASE_BSC_SCAN_URLS[chainId] + "/tx/" + data;
        }
        case 'token': {
            return dsgswapSdk.BASE_BSC_SCAN_URLS[chainId] + "/token/" + data;
        }
        case 'block': {
            return dsgswapSdk.BASE_BSC_SCAN_URLS[chainId] + "/block/" + data;
        }
        case 'countdown': {
            return dsgswapSdk.BASE_BSC_SCAN_URLS[chainId] + "/block/countdown/" + data;
        }
        default: {
            return dsgswapSdk.BASE_BSC_SCAN_URLS[chainId] + "/address/" + data;
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
    return value.mul(bignumber.BigNumber.from(10000).add(bignumber.BigNumber.from(5000))).div(bignumber.BigNumber.from(10000));
}
// converts a basis points value to a sdk percent
function basisPointsToPercent(num) {
    return new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(num), dsgswapSdk.JSBI.BigInt(10000));
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
    if (!isAddress(address) || address === constants.AddressZero) {
        throw Error("Invalid 'address' parameter '" + address + "'.");
    }
    return new contracts$1.Contract(address, ABI, getProviderOrSigner(library, account));
}
// account is optional
function getRouterContract(_, library, account) {
    return getContract$1(dsgswapSdk.getValueWithChainId(contracts.SwapRouter), swapRouterAbi, library, account);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function isTokenOnList(defaultTokens, currency) {
    var _a;
    if (currency === dsgswapSdk.getActiveETHERWidthChainId())
        return true;
    return Boolean(currency instanceof dsgswapSdk.Token && ((_a = defaultTokens[currency.chainId]) === null || _a === void 0 ? void 0 : _a[currency.address]));
}

var getNodeUrl = function (chainId) {
    // return process.env.REACT_APP_NODE_3
    return sample__default["default"](dsgswapSdk.ETHEREUM_CHAIN[chainId || dsgswapSdk.chainIdProxy.chainId].rpcUrls);
    // return 'https://polygon-mumbai.infura.io/v3/330472ed44dd4692a16dfcb4cc41f122'
};

var RPC_URL = getNodeUrl();
var simpleRpcProvider = new ethers.ethers.providers.JsonRpcProvider(RPC_URL);

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
var useActiveWeb3React = function () {
    var _a = core.useWeb3React(), library = _a.library, chainId = _a.chainId, web3React = tslib.__rest(_a, ["library", "chainId"]);
    var refEth = React.useRef(library);
    var _b = tslib.__read(React.useState(library || simpleRpcProvider), 2), provider = _b[0], setprovider = _b[1];
    React.useEffect(function () {
        if (library !== refEth.current) {
            setprovider(library || new ethers.ethers.providers.JsonRpcProvider(getNodeUrl(chainId)));
            refEth.current = library;
        }
    }, [library, chainId]);
    return tslib.__assign({ library: provider, chainId: chainId !== null && chainId !== void 0 ? chainId : dsgswapSdk.chainIdProxy.chainId }, web3React);
};

function useBlockNumber() {
    var chainId = useActiveWeb3React().chainId;
    return reactRedux.useSelector(function (state) { return state.application.blockNumber[chainId !== null && chainId !== void 0 ? chainId : -1]; });
}

var ADDRESS_REGEX$1 = /^0x[a-fA-F0-9]{40}$/;
var LOWER_HEX_REGEX = /^0x[a-f0-9]*$/;
function toCallKey(call) {
    if (!ADDRESS_REGEX$1.test(call.address)) {
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
var addMulticallListeners = toolkit.createAction('multicall/addMulticallListeners');
var removeMulticallListeners = toolkit.createAction('multicall/removeMulticallListeners');
var fetchingMulticallResults = toolkit.createAction('multicall/fetchingMulticallResults');
var errorFetchingMulticallResults = toolkit.createAction('multicall/errorFetchingMulticallResults');
var updateMulticallResults = toolkit.createAction('multicall/updateMulticallResults');

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
    var callResults = reactRedux.useSelector(function (state) { return state.multicall.callResults; });
    var dispatch = reactRedux.useDispatch();
    var serializedCallKeys = React.useMemo(function () {
        var _a, _b, _c;
        return JSON.stringify((_c = (_b = (_a = calls === null || calls === void 0 ? void 0 : calls.filter(function (c) { return Boolean(c); })) === null || _a === void 0 ? void 0 : _a.map(toCallKey)) === null || _b === void 0 ? void 0 : _b.sort()) !== null && _c !== void 0 ? _c : []);
    }, [calls]);
    // update listeners when there is an actual change that persists for at least 100ms
    React.useEffect(function () {
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
    return React.useMemo(function () {
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
    var fragment = React.useMemo(function () { var _a; return (_a = contract === null || contract === void 0 ? void 0 : contract.interface) === null || _a === void 0 ? void 0 : _a.getFunction(methodName); }, [contract, methodName]);
    var calls = React.useMemo(function () {
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
    return React.useMemo(function () {
        return results.map(function (result) { return toCallState(result, contract === null || contract === void 0 ? void 0 : contract.interface, fragment, latestBlockNumber); });
    }, [fragment, contract, results, latestBlockNumber]);
}
function useMultipleContractSingleData(addresses, contractInterface, methodName, callInputs, options) {
    var fragment = React.useMemo(function () { return contractInterface.getFunction(methodName); }, [contractInterface, methodName]);
    var callData = React.useMemo(function () {
        return fragment && isValidMethodArgs(callInputs)
            ? contractInterface.encodeFunctionData(fragment, callInputs)
            : undefined;
    }, [callInputs, contractInterface, fragment]);
    var calls = React.useMemo(function () {
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
    return React.useMemo(function () {
        return results.map(function (result) { return toCallState(result, contractInterface, fragment, latestBlockNumber); });
    }, [fragment, results, contractInterface, latestBlockNumber]);
}
function useSingleCallResult(contract, methodName, inputs, options) {
    var fragment = React.useMemo(function () { var _a; return (_a = contract === null || contract === void 0 ? void 0 : contract.interface) === null || _a === void 0 ? void 0 : _a.getFunction(methodName); }, [contract, methodName]);
    var calls = React.useMemo(function () {
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
    return React.useMemo(function () {
        return toCallState(result, contract === null || contract === void 0 ? void 0 : contract.interface, fragment, latestBlockNumber);
    }, [result, contract, fragment, latestBlockNumber]);
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
function isZero(hexNumberString) {
    return /^0x0*$/.test(hexNumberString);
}

var getAddress = function (address) {
    return dsgswapSdk.getValueWithChainId(address);
};
var getMulticallAddress = function () {
    return getAddress(dsgswapSdk.contractAddress.multiCall);
};

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
    return new ethers.ethers.Contract(address, abi, signerOrProvider);
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

var ERC20_INTERFACE = new abi$1.Interface(Erc20Abi);
new abi$1.Interface(ERC20_BYTES32_ABI);

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

var MULTICALL_NETWORKS = tslib.__assign({}, dsgswapSdk.contractAddress.multiCall);

// Code below migrated from Exchange useContract.ts
// returns null on errors
function useContract(address, ABI, withSignerIfPossible) {
    if (withSignerIfPossible === void 0) { withSignerIfPossible = true; }
    var _a = useActiveWeb3React(), library = _a.library, account = _a.account;
    return React.useMemo(function () {
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
    return useContract(chainId && dsgswapSdk.WETHER[chainId] ? dsgswapSdk.WETHER[chainId].address : undefined, WETH_ABI, withSignerIfPossible);
}
function useENSRegistrarContract(withSignerIfPossible) {
    var chainId = useActiveWeb3React().chainId;
    var address;
    if (chainId) {
        // eslint-disable-next-line default-case
        switch (chainId) {
            case dsgswapSdk.ChainId.MAINNET:
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

/**
 * Does a lookup for an ENS name to find its address.
 */
function useENSAddress(ensName) {
    var _a, _b, _c;
    var debouncedName = useDebounce(ensName, 200);
    var ensNodeArgument = React.useMemo(function () {
        if (!debouncedName)
            return [undefined];
        try {
            return debouncedName ? [utils.namehash(debouncedName)] : [undefined];
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
    var ensNodeArgument = React.useMemo(function () {
        if (!debouncedAddress || !isAddress(debouncedAddress))
            return [undefined];
        try {
            return debouncedAddress ? [utils.namehash(debouncedAddress.toLowerCase().substr(2) + ".addr.reverse")] : [undefined];
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

function wrappedCurrency(currency, chainId) {
    return chainId && currency === dsgswapSdk.getActiveETHERWidthChainId() ? dsgswapSdk.WETHER[chainId] : currency instanceof dsgswapSdk.Token ? currency : undefined;
}
function unwrappedToken(token) {
    if (token.equals(dsgswapSdk.WETHER[token.chainId]))
        return dsgswapSdk.getActiveETHERWidthChainId();
    return token;
}

var PAIR_INTERFACE = new abi$1.Interface(abi);
var PairState;
(function (PairState) {
    PairState[PairState["LOADING"] = 0] = "LOADING";
    PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
    PairState[PairState["EXISTS"] = 2] = "EXISTS";
    PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState || (PairState = {}));
function usePairs(currencies) {
    var chainId = useActiveWeb3React().chainId;
    var tokens = React.useMemo(function () {
        return currencies.map(function (_a) {
            var _b = tslib.__read(_a, 2), currencyA = _b[0], currencyB = _b[1];
            return [
                wrappedCurrency(currencyA, chainId),
                wrappedCurrency(currencyB, chainId),
            ];
        });
    }, [chainId, currencies]);
    var pairAddresses = React.useMemo(function () {
        return tokens.map(function (_a) {
            var _b = tslib.__read(_a, 2), tokenA = _b[0], tokenB = _b[1];
            if ((tokenA === null || tokenA === void 0 ? void 0 : tokenA.chainId) !== (tokenB === null || tokenB === void 0 ? void 0 : tokenB.chainId)) {
                console.debug(tokenA, tokenB);
            }
            return tokenA && tokenB && !tokenA.equals(tokenB) ? dsgswapSdk.Pair.getAddress(tokenA, tokenB) : undefined;
        });
    }, [tokens]);
    var results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves');
    return React.useMemo(function () {
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
            var _a = tslib.__read(tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA], 2), token0 = _a[0], token1 = _a[1];
            return [
                PairState.EXISTS,
                new dsgswapSdk.Pair(new dsgswapSdk.TokenAmount(token0, reserve0.toString()), new dsgswapSdk.TokenAmount(token1, reserve1.toString())),
            ];
        });
    }, [results, tokens]);
}
function usePair(tokenA, tokenB) {
    return usePairs([[tokenA, tokenB]])[0];
}

var UNSUPPORTED_LIST_URLS = [];
// lower index == higher priority for token import
tslib.__spreadArray([
    // PANCAKE_TOP100,
    // PANCAKE_EXTENDED,
    getAddress(dsgswapSdk.DSG_TOKENS_TOP100)
], tslib.__read(UNSUPPORTED_LIST_URLS));
var getTokenDefaultList = function () { return tslib.__spreadArray([
    // PANCAKE_TOP100,
    // PANCAKE_EXTENDED,
    getAddress(dsgswapSdk.DSG_TOKENS_TOP100)
], tslib.__read(UNSUPPORTED_LIST_URLS)); };
// default lists to be 'active' aka searched across
[getAddress(dsgswapSdk.DSG_TOKENS_TOP100)];
var getTokenDefaultActiveList = function () { return [getAddress(dsgswapSdk.DSG_TOKENS_TOP100)]; };

var name$1 = "Dsg Default List";
var timestamp$1 = "2021-11-12T06:00:00Z";
var version$1 = {
	major: 1,
	minor: 0,
	patch: 1
};
var tags$2 = {
};
var logoURI$1 = "https://dsgmetaverse.com/logo.png";
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
		name: "DSG",
		symbol: "DSG",
		address: "0xf8e8c2e77c47B9da858477341a649823f500c295",
		chainId: 97,
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
		name: "WBNB Token",
		symbol: "WBNB",
		address: "0xD2754634e39cC8aaC7b8174af7e0552545cF63CB",
		chainId: 97,
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
		name: "BUSD",
		symbol: "BUSD",
		address: "0x0858241B08b1335d7711838D6cC9C60a72c92C4B",
		chainId: 97,
		decimals: 18,
		logoURI: "https://tokens.pancakeswap.finance/images/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
	},
	{
		name: "USDT",
		symbol: "USDT",
		address: "0x865746A11eC78819c0067a031e9dd8D69F0B319d",
		chainId: 97,
		decimals: 18,
		logoURI: "https://dsgmetaverse.com/images/tokens/USDT.png"
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
		logoURI: "https://dsgmetaverse.com/images/tokens/USDT.png"
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
		name: "Venus",
		symbol: "XVS",
		address: "0x997003114c52945798c48757021938c257c76A57",
		chainId: 97,
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
		name: "VAI Stablecoin",
		symbol: "VAI",
		address: "0x5b0663Ecb9cdFe770214AA6324DE5253F15FF2E1",
		chainId: 97,
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

var _a$a;
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
    tslib.__extends(WrappedTokenInfo, _super);
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
}(dsgswapSdk.Token));
/**
 * An empty result, useful as a default.
 */
var EMPTY_LIST = (_a$a = {},
    _a$a[dsgswapSdk.ChainId.MAINNET] = {},
    _a$a[dsgswapSdk.ChainId.TESTNET] = {},
    _a$a[dsgswapSdk.ChainId.MATIC_MAINNET] = {},
    _a$a[dsgswapSdk.ChainId.MATIC_TESTNET] = {},
    _a$a);
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
            return tslib.__assign(tslib.__assign({}, list.tags[tagId]), { id: tagId });
        })) === null || _d === void 0 ? void 0 : _d.filter(function (x) { return Boolean(x); })) !== null && _e !== void 0 ? _e : [];
        var token = new WrappedTokenInfo(tokenInfo, tags);
        if (tokenMap[token.chainId][token.address] !== undefined) {
            console.debug(tokenMap[token.chainId][token.address]);
            throw Error('Duplicate tokens.');
        }
        return tslib.__assign(tslib.__assign({}, tokenMap), (_a = {}, _a[token.chainId] = tslib.__assign(tslib.__assign({}, tokenMap[token.chainId]), (_b = {}, _b[token.address] = {
            token: token,
            list: list,
        }, _b)), _a));
    }, tslib.__assign({}, EMPTY_LIST));
    listCache === null || listCache === void 0 ? void 0 : listCache.set(list, map);
    return map;
}
function useAllLists() {
    return reactRedux.useSelector(function (state) { return state.lists.byUrl; });
}
function combineMaps(map1, map2) {
    var _a;
    return _a = {},
        _a[dsgswapSdk.ChainId.MAINNET] = tslib.__assign(tslib.__assign({}, map1[dsgswapSdk.ChainId.MAINNET]), map2[dsgswapSdk.ChainId.MAINNET]),
        _a[dsgswapSdk.ChainId.TESTNET] = tslib.__assign(tslib.__assign({}, map1[dsgswapSdk.ChainId.TESTNET]), map2[dsgswapSdk.ChainId.TESTNET]),
        _a[dsgswapSdk.ChainId.MATIC_MAINNET] = tslib.__assign(tslib.__assign({}, map1[dsgswapSdk.ChainId.MATIC_MAINNET]), map2[dsgswapSdk.ChainId.MATIC_MAINNET]),
        _a[dsgswapSdk.ChainId.MATIC_TESTNET] = tslib.__assign(tslib.__assign({}, map1[dsgswapSdk.ChainId.MATIC_TESTNET]), map2[dsgswapSdk.ChainId.MATIC_TESTNET]),
        _a;
}
// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls) {
    var lists = useAllLists();
    return React.useMemo(function () {
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
    return (_a = reactRedux.useSelector(function (state) { return state.lists.activeListUrls; })) === null || _a === void 0 ? void 0 : _a.filter(function (url) { return !UNSUPPORTED_LIST_URLS.includes(url); });
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
    return new dsgswapSdk.Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}

function useUserAddedTokens() {
    var chainId = useActiveWeb3React().chainId;
    var serializedTokensMap = reactRedux.useSelector(function (_a) {
        var tokens = _a.user.tokens;
        return tokens;
    });
    return React.useMemo(function () {
        var _a;
        if (!chainId)
            return [];
        return Object.values((_a = serializedTokensMap === null || serializedTokensMap === void 0 ? void 0 : serializedTokensMap[chainId]) !== null && _a !== void 0 ? _a : {}).map(deserializeToken);
    }, [serializedTokensMap, chainId]);
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
    return React.useMemo(function () {
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
        return tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(exactMatches)), tslib.__read(symbolSubtrings)), tslib.__read(rest));
    }, [tokens, searchQuery]);
}

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap, includeUserAdded) {
    var chainId = useActiveWeb3React().chainId;
    var userAddedTokens = useUserAddedTokens();
    return React.useMemo(function () {
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
            }, tslib.__assign({}, mapWithoutUrls)));
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
    return React.useMemo(function () {
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
    return !!userAddedTokens.find(function (token) { return dsgswapSdk.currencyEquals(currency, token); });
}
// parse a name or symbol from a token response
var BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;
function parseStringOrBytes32(str, bytes32, defaultValue) {
    return str && str.length > 0
        ? str
        : // need to check for proper bytes string and valid terminator
            bytes32 && BYTES32_REGEX.test(bytes32) && utils.arrayify(bytes32)[31] === 0
                ? strings.parseBytes32String(bytes32)
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
    return React.useMemo(function () {
        var _a, _b, _c, _d;
        if (token)
            return token;
        if (!chainId || !address)
            return undefined;
        if (decimals.loading || symbol.loading || tokenName.loading)
            return null;
        if (decimals.result) {
            return new dsgswapSdk.Token(chainId, address, decimals.result[0], parseStringOrBytes32((_a = symbol.result) === null || _a === void 0 ? void 0 : _a[0], (_b = symbolBytes32.result) === null || _b === void 0 ? void 0 : _b[0], 'UNKNOWN'), parseStringOrBytes32((_c = tokenName.result) === null || _c === void 0 ? void 0 : _c[0], (_d = tokenNameBytes32.result) === null || _d === void 0 ? void 0 : _d[0], 'Unknown Token'));
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
    var ETHER = dsgswapSdk.getActiveETHERWidthChainId();
    var isBNB = (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase()) === ((_a = ETHER.symbol) === null || _a === void 0 ? void 0 : _a.toUpperCase());
    var token = useToken(isBNB ? undefined : currencyId);
    return isBNB ? ETHER : token;
}

var _a$9, _b$4, _c, _d, _e, _f;
// used to construct intermediary pairs for trading
var BASES_TO_CHECK_TRADES_AGAINST = (_a$9 = {},
    _a$9[dsgswapSdk.ChainId.MATIC_TESTNET] = [
        dsgswapSdk.WETHER[dsgswapSdk.ChainId.MATIC_TESTNET],
        dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_TESTNET],
        dsgswapSdk.USDT[dsgswapSdk.ChainId.MATIC_TESTNET],
        dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_TESTNET],
        dsgswapSdk.WETH[dsgswapSdk.ChainId.MATIC_TESTNET],
        dsgswapSdk.WBTC[dsgswapSdk.ChainId.MATIC_TESTNET],
    ],
    _a$9[dsgswapSdk.ChainId.MATIC_MAINNET] = [
        dsgswapSdk.WETHER[dsgswapSdk.ChainId.MATIC_MAINNET],
        dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_MAINNET],
        dsgswapSdk.USDT[dsgswapSdk.ChainId.MATIC_MAINNET],
        dsgswapSdk.WETH[dsgswapSdk.ChainId.MATIC_MAINNET],
        dsgswapSdk.WBTC[dsgswapSdk.ChainId.MATIC_MAINNET],
        // ETH,
        // USDC[ChainId.MATIC_MAINNET],
        // DAI,
    ],
    _a$9[dsgswapSdk.ChainId.MAINNET] = [
        dsgswapSdk.WETHER[dsgswapSdk.ChainId.MAINNET],
        dsgswapSdk.DSG[dsgswapSdk.ChainId.MAINNET],
        dsgswapSdk.BUSD[dsgswapSdk.ChainId.MAINNET],
        dsgswapSdk.USDT[dsgswapSdk.ChainId.MAINNET],
        dsgswapSdk.USDC[dsgswapSdk.ChainId.MAINNET],
    ],
    _a$9[dsgswapSdk.ChainId.TESTNET] = [
        dsgswapSdk.WETHER[dsgswapSdk.ChainId.TESTNET],
        dsgswapSdk.DSG[dsgswapSdk.ChainId.TESTNET],
        dsgswapSdk.BUSD[dsgswapSdk.ChainId.TESTNET],
        dsgswapSdk.USDT[dsgswapSdk.ChainId.TESTNET],
        dsgswapSdk.USDC[dsgswapSdk.ChainId.TESTNET],
    ],
    _a$9);
/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
var ADDITIONAL_BASES = (_b$4 = {},
    _b$4[dsgswapSdk.ChainId.MAINNET] = {},
    _b$4[dsgswapSdk.ChainId.TESTNET] = {},
    _b$4[dsgswapSdk.ChainId.MATIC_MAINNET] = {},
    _b$4[dsgswapSdk.ChainId.MATIC_TESTNET] = {},
    _b$4);
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETHER[ChainId.MAINNET]]
 */
var CUSTOM_BASES = (_c = {},
    _c[dsgswapSdk.ChainId.MAINNET] = {},
    _c[dsgswapSdk.ChainId.TESTNET] = {},
    _c[dsgswapSdk.ChainId.MATIC_MAINNET] = {},
    _c[dsgswapSdk.ChainId.MATIC_TESTNET] = {},
    _c);
// used for display in the default list when adding liquidity
var SUGGESTED_BASES = (_d = {},
    _d[dsgswapSdk.ChainId.MATIC_MAINNET] = [
        dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.WETH[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.MATIC_MAINNET],
        dsgswapSdk.DSG[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.DAI[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.WBTC[dsgswapSdk.ChainId.MATIC_MAINNET]
    ],
    _d[dsgswapSdk.ChainId.MATIC_TESTNET] = [
        dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.WETH[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.MATIC_TESTNET],
        dsgswapSdk.DSG[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.DAI[dsgswapSdk.ChainId.MATIC_TESTNET]
    ],
    _d[dsgswapSdk.ChainId.MAINNET] = [dsgswapSdk.BUSD[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.DSG[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.VAI[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.XVS[dsgswapSdk.ChainId.MAINNET]],
    _d[dsgswapSdk.ChainId.TESTNET] = [dsgswapSdk.DSG[dsgswapSdk.ChainId.TESTNET], dsgswapSdk.BUSD[dsgswapSdk.ChainId.TESTNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.TESTNET], dsgswapSdk.VAI[dsgswapSdk.ChainId.TESTNET], dsgswapSdk.XVS[dsgswapSdk.ChainId.TESTNET]],
    _d);
// used to construct the list of all pairs we consider by default in the frontend
(_e = {},
    _e[dsgswapSdk.ChainId.MATIC_MAINNET] = [
        dsgswapSdk.WETHER[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.MATIC_MAINNET]
    ],
    _e[dsgswapSdk.ChainId.MATIC_TESTNET] = [
        dsgswapSdk.WETHER[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.MATIC_TESTNET]
    ],
    _e[dsgswapSdk.ChainId.MAINNET] = [dsgswapSdk.WETH[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.BUSD[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.MAINNET]],
    _e[dsgswapSdk.ChainId.TESTNET] = [dsgswapSdk.WETH[dsgswapSdk.ChainId.TESTNET], dsgswapSdk.DSG[dsgswapSdk.ChainId.TESTNET], dsgswapSdk.BUSD[dsgswapSdk.ChainId.TESTNET]],
    _e);
(_f = {},
    _f[dsgswapSdk.ChainId.MAINNET] = [
        [dsgswapSdk.DSG[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.WETHER[dsgswapSdk.ChainId.MAINNET]],
        [dsgswapSdk.BUSD[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.USDT[dsgswapSdk.ChainId.MAINNET]],
        [dsgswapSdk.DSG[dsgswapSdk.ChainId.MAINNET], dsgswapSdk.BUSD[dsgswapSdk.ChainId.MAINNET]],
    ],
    _f[dsgswapSdk.ChainId.MATIC_TESTNET] = [
        [dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.WETHER[dsgswapSdk.ChainId.MATIC_TESTNET]],
        [dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_TESTNET]],
        [dsgswapSdk.WETHER[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_TESTNET]],
        [dsgswapSdk.WETH[dsgswapSdk.ChainId.MATIC_TESTNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_TESTNET]],
    ],
    _f[dsgswapSdk.ChainId.MATIC_MAINNET] = [
        [dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.WETH[dsgswapSdk.ChainId.MATIC_MAINNET]],
        [dsgswapSdk.MBT[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_MAINNET]],
        [dsgswapSdk.WETHER[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_MAINNET]],
        [dsgswapSdk.WETH[dsgswapSdk.ChainId.MATIC_MAINNET], dsgswapSdk.USDC[dsgswapSdk.ChainId.MATIC_MAINNET]],
    ],
    _f);
// default allowed slippage, in bips
var INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
var DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
dsgswapSdk.JSBI.BigInt(0);
// one basis point
var ONE_BIPS = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(1), dsgswapSdk.JSBI.BigInt(10000));
var BIPS_BASE = dsgswapSdk.JSBI.BigInt(10000);
// used for warning states
var ALLOWED_PRICE_IMPACT_LOW = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(100), BIPS_BASE); // 1%
var ALLOWED_PRICE_IMPACT_MEDIUM = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(300), BIPS_BASE); // 3%
var ALLOWED_PRICE_IMPACT_HIGH = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
var PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
var BLOCKED_PRICE_IMPACT_NON_EXPERT = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(1500), BIPS_BASE); // 15%
// used to ensure the user doesn't send so much BNB so they end up with <.01
var MIN_BNB = dsgswapSdk.JSBI.exponentiate(dsgswapSdk.JSBI.BigInt(10), dsgswapSdk.JSBI.BigInt(16)); // .01 BNB
var BETTER_TRADE_LESS_HOPS_THRESHOLD = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(50), dsgswapSdk.JSBI.BigInt(10000));
var ZERO_PERCENT = new dsgswapSdk.Percent('0');
var ONE_HUNDRED_PERCENT$1 = new dsgswapSdk.Percent('1');
// SDN OFAC addresses(美国海外资产控制办公室地址)
var BLOCKED_ADDRESSES = [
    '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
    '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
    '0x901bb9583b24D97e995513C6778dc6888AB6870e',
    '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
    '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
];

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
        !dsgswapSdk.currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
        !dsgswapSdk.currencyEquals(tradeB.outputAmount.currency, tradeB.outputAmount.currency)) {
        throw new Error('Trades are not comparable');
    }
    if (minimumDelta.equalTo(ZERO_PERCENT)) {
        return tradeA.executionPrice.lessThan(tradeB.executionPrice);
    }
    return tradeA.executionPrice.raw.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT$1)).lessThan(tradeB.executionPrice);
}

var updateUserExpertMode = toolkit.createAction('user/updateUserExpertMode');
var updateUserUsePloy = toolkit.createAction('user/updateUserUsePloy');
var updateSystemUsePloy = toolkit.createAction('user/updateSystemUsePloy');
var updateUserSingleHopOnly = toolkit.createAction('user/updateUserSingleHopOnly');
var updateUserSlippageTolerance = toolkit.createAction('user/updateUserSlippageTolerance');
var updateUserDeadline = toolkit.createAction('user/updateUserDeadline');
var addSerializedToken = toolkit.createAction('user/addSerializedToken');
var removeSerializedToken = toolkit.createAction('user/removeSerializedToken');
var addSerializedPair = toolkit.createAction('user/addSerializedPair');
var removeSerializedPair = toolkit.createAction('user/removeSerializedPair');
var muteAudio = toolkit.createAction('user/muteAudio');
var unmuteAudio = toolkit.createAction('user/unmuteAudio');
var toggleTheme = toolkit.createAction('user/toggleTheme');
var setVDsgInviteAddress = toolkit.createAction('user/setVDsgInviteAddress');
var updateUseFarmGet = toolkit.createAction('user/updateUseFarmGet');
var updateUseFarmPledge = toolkit.createAction('user/updateUseFarmPledge');
var updateUseNestGet = toolkit.createAction('user/updateUseNestGet');
var updateUseNestPledge = toolkit.createAction('user/updateUseNestPledge');

function useAudioModeManager() {
    var dispatch = reactRedux.useDispatch();
    var audioPlay = reactRedux.useSelector(function (state) { return state.user.audioPlay; });
    var toggleSetAudioMode = React.useCallback(function () {
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
    return reactRedux.useSelector(function (state) { return state.user.userExpertMode; });
}
function useExpertModeManager() {
    var dispatch = reactRedux.useDispatch();
    var expertMode = useIsExpertMode();
    var toggleSetExpertMode = React.useCallback(function () {
        dispatch(updateUserExpertMode({ userExpertMode: !expertMode }));
    }, [expertMode, dispatch]);
    return [expertMode, toggleSetExpertMode];
}
function useThemeManager() {
    var dispatch = reactRedux.useDispatch();
    var isDark = reactRedux.useSelector(function (state) { return state.user.isDark; });
    var toggleTheme$1 = React.useCallback(function () {
        dispatch(toggleTheme());
    }, [dispatch]);
    return [isDark, toggleTheme$1];
}
function useUserSingleHopOnly() {
    var dispatch = reactRedux.useDispatch();
    var singleHopOnly = reactRedux.useSelector(function (state) { return state.user.userSingleHopOnly; });
    var setSingleHopOnly = React.useCallback(function (newSingleHopOnly) {
        dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }));
    }, [dispatch]);
    return [singleHopOnly, setSingleHopOnly];
}
function useUserSlippageTolerance() {
    var dispatch = reactRedux.useDispatch();
    var userSlippageTolerance = reactRedux.useSelector(function (state) {
        return state.user.userSlippageTolerance;
    });
    var setUserSlippageTolerance = React.useCallback(function (slippage) {
        dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }));
    }, [dispatch]);
    return [userSlippageTolerance, setUserSlippageTolerance];
}
function useUserUsePoly() {
    var dispatch = reactRedux.useDispatch();
    var userUsePoly = reactRedux.useSelector(function (state) {
        return state.user.userUsePoly;
    });
    var setUserUsePoly = React.useCallback(function (usePoly) {
        dispatch(updateUserUsePloy({ userUsePoly: usePoly }));
    }, [dispatch]);
    return [userUsePoly, setUserUsePoly];
}
function useSystemUsePoly() {
    var dispatch = reactRedux.useDispatch();
    var userUsePoly = reactRedux.useSelector(function (state) {
        return state.user.systemUsePoly;
    });
    var setSystemUsePoly = React.useCallback(function (usePoly) {
        dispatch(updateSystemUsePloy({ systemUsePoly: usePoly }));
    }, [dispatch]);
    return [userUsePoly, setSystemUsePoly];
}
function useUserTransactionTTL() {
    var dispatch = reactRedux.useDispatch();
    var userDeadline = reactRedux.useSelector(function (state) {
        return state.user.userDeadline;
    });
    var setUserDeadline = React.useCallback(function (deadline) {
        dispatch(updateUserDeadline({ userDeadline: deadline }));
    }, [dispatch]);
    return [userDeadline, setUserDeadline];
}
function useAddUserToken() {
    var dispatch = reactRedux.useDispatch();
    return React.useCallback(function (token) {
        dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
    }, [dispatch]);
}
function useRemoveUserAddedToken() {
    var dispatch = reactRedux.useDispatch();
    return React.useCallback(function (chainId, address) {
        dispatch(removeSerializedToken({ chainId: chainId, address: address }));
    }, [dispatch]);
}

function useAllCommonPairs(currencyA, currencyB, poly) {
    var chainId = useActiveWeb3React().chainId;
    var _a = tslib.__read(chainId
        ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
        : [undefined, undefined], 2), tokenA = _a[0], tokenB = _a[1];
    var bases = React.useMemo(function () {
        var _a, _b, _c, _d, _e;
        if (!chainId)
            return [];
        var common = (_a = BASES_TO_CHECK_TRADES_AGAINST[chainId]) !== null && _a !== void 0 ? _a : [];
        var additionalA = tokenA ? (_c = (_b = ADDITIONAL_BASES[chainId]) === null || _b === void 0 ? void 0 : _b[tokenA.address]) !== null && _c !== void 0 ? _c : [] : [];
        var additionalB = tokenB ? (_e = (_d = ADDITIONAL_BASES[chainId]) === null || _d === void 0 ? void 0 : _d[tokenB.address]) !== null && _e !== void 0 ? _e : [] : [];
        return tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(common)), tslib.__read(additionalA)), tslib.__read(additionalB));
    }, [chainId, tokenA, tokenB]);
    var basePairs = React.useMemo(function () { return flatMap__default["default"](bases, function (base) { return bases.map(function (otherBase) { return [base, otherBase]; }); }); }, [bases]);
    var allPairCombinations = React.useMemo(function () {
        return tokenA && tokenB
            ? tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([
                // the direct pair
                [tokenA, tokenB]
            ], tslib.__read(bases.map(function (base) { return [tokenA, base]; }))), tslib.__read(bases.map(function (base) { return [tokenB, base]; }))), tslib.__read(basePairs)).filter(function (tokens) { return Boolean(tokens[0] && tokens[1]); })
                .filter(function (_a) {
                var _b = tslib.__read(_a, 2), t0 = _b[0], t1 = _b[1];
                return t0.address !== t1.address;
            })
                .filter(function (_a) {
                var _b = tslib.__read(_a, 2), tokenA_ = _b[0], tokenB_ = _b[1];
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
    return React.useMemo(function () {
        return Object.values(allPairs
            // filter out invalid pairs
            .filter(function (result) { return Boolean(result[0] === PairState.EXISTS && result[1]); })
            // filter out duplicated pairs
            .reduce(function (memo, _a) {
            var _b;
            var _c = tslib.__read(_a, 2), curr = _c[1];
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
    var _a = tslib.__read(useUserSingleHopOnly(), 1), singleHopOnly = _a[0];
    return React.useMemo(function () {
        var _a, _b;
        if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
            if (singleHopOnly || poly) {
                return ((_a = dsgswapSdk.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null);
            }
            // search through trades with varying hops, find best trade out of them
            var bestTradeSoFar = null;
            for (var i = 1; i <= MAX_HOPS; i++) {
                var currentTrade = (_b = dsgswapSdk.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
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
    var _a = tslib.__read(useUserSingleHopOnly(), 1), singleHopOnly = _a[0];
    return React.useMemo(function () {
        var _a, _b;
        if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
            if (singleHopOnly || poly) {
                return ((_a = dsgswapSdk.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null);
            }
            // search through trades with varying hops, find best trade out of them
            var bestTradeSoFar = null;
            for (var i = 1; i <= MAX_HOPS; i++) {
                var currentTrade = (_b = dsgswapSdk.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
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

var initialState$9 = {
    isFetching: true,
    currentLanguage: EN,
};
var saveLang = {};
// Export the translations directly
var languageMap = new Map();
languageMap.set(EN.locale, translations);
var LanguageContext = React.createContext(undefined);
var LanguageProvider = function (_a) {
    var lang = _a.lang, children = _a.children;
    var _b = tslib.__read(React.useState(function () {
        var codeFromStorage = getLanguageCodeFromLS();
        return tslib.__assign(tslib.__assign({}, initialState$9), { currentLanguage: languages[codeFromStorage] });
    }), 2), state = _b[0], setState = _b[1];
    var currentLanguage = state.currentLanguage;
    React.useEffect(function () {
        var fetchInitialLocales = function () { return tslib.__awaiter(void 0, void 0, void 0, function () {
            var codeFromStorage, enLocale, currentLocale;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        codeFromStorage = getLanguageCodeFromLS();
                        if (!(codeFromStorage !== EN.locale)) return [3 /*break*/, 2];
                        enLocale = languageMap.get(EN.locale);
                        return [4 /*yield*/, fetchLocale(codeFromStorage)];
                    case 1:
                        currentLocale = _a.sent();
                        languageMap.set(codeFromStorage, tslib.__assign(tslib.__assign({}, enLocale), currentLocale));
                        _a.label = 2;
                    case 2:
                        setState(function (prevState) { return (tslib.__assign(tslib.__assign({}, prevState), { isFetching: false })); });
                        return [2 /*return*/];
                }
            });
        }); };
        fetchInitialLocales();
    }, [setState]);
    var setLanguage = function (language) { return tslib.__awaiter(void 0, void 0, void 0, function () {
        var locale, enLocale;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!languageMap.has(language.locale)) return [3 /*break*/, 2];
                    setState(function (prevState) { return (tslib.__assign(tslib.__assign({}, prevState), { isFetching: true })); });
                    return [4 /*yield*/, fetchLocale(language.locale)];
                case 1:
                    locale = _a.sent();
                    enLocale = languageMap.get(EN.locale);
                    // Merge the EN locale to ensure that any locale fetched has all the keys
                    languageMap.set(language.locale, tslib.__assign(tslib.__assign({}, enLocale), locale));
                    // localStorage.setItem(LS_KEY, language.locale)
                    setState(function (prevState) { return (tslib.__assign(tslib.__assign({}, prevState), { isFetching: false, currentLanguage: language })); });
                    return [3 /*break*/, 3];
                case 2:
                    // localStorage.setItem(LS_KEY, language.locale)
                    setState(function (prevState) { return (tslib.__assign(tslib.__assign({}, prevState), { isFetching: false, currentLanguage: language })); });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var setLanguageOfLocale = function (localeKeys) { return tslib.__awaiter(void 0, void 0, void 0, function () {
        var locale, enLocale;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!languages[localeKeys])
                        return [2 /*return*/];
                    if (!!languageMap.has(localeKeys)) return [3 /*break*/, 2];
                    setState(function (prevState) { return (tslib.__assign(tslib.__assign({}, prevState), { isFetching: true })); });
                    return [4 /*yield*/, fetchLocale(localeKeys)];
                case 1:
                    locale = _a.sent();
                    enLocale = languageMap.get(EN.locale);
                    // Merge the EN locale to ensure that any locale fetched has all the keys
                    languageMap.set(localeKeys, tslib.__assign(tslib.__assign({}, enLocale), locale));
                    // localStorage.setItem(LS_KEY, localeKeys)
                    setState(function (prevState) { return (tslib.__assign(tslib.__assign({}, prevState), { isFetching: false, currentLanguage: languages[localeKeys] })); });
                    return [3 /*break*/, 3];
                case 2:
                    // localStorage.setItem(LS_KEY, localeKeys)
                    setState(function (prevState) { return (tslib.__assign(tslib.__assign({}, prevState), { isFetching: false, currentLanguage: languages[localeKeys] })); });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var translate = React.useCallback(function (key, data) {
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
    var getHTML = React.useCallback(function (key, data) {
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
            var el = React__default["default"].createElement('span', {
                dangerouslySetInnerHTML: {
                    __html: interpolatedText_2,
                },
            });
            // when key exists, it should still return element if there's defaultMessage() after getHTML()
            return el;
        }
        return translatedText;
    }, [currentLanguage]);
    React.useEffect(function () {
        if (lang) {
            setLanguageOfLocale(lang);
        }
    }, [lang]);
    return (jsxRuntime.jsx(LanguageContext.Provider, tslib.__assign({ value: tslib.__assign(tslib.__assign({}, state), { setLanguage: setLanguage, getHTML: getHTML, t: translate }) }, { children: children }), void 0));
};

var useTranslation = function () {
    var languageContext = React.useContext(LanguageContext);
    if (languageContext === undefined) {
        throw new Error('Language context is undefined');
    }
    return languageContext;
};

var Field$2;
(function (Field) {
    Field["INPUT"] = "INPUT";
    Field["OUTPUT"] = "OUTPUT";
})(Field$2 || (Field$2 = {}));
var selectCurrency = toolkit.createAction('swap/selectCurrency');
var switchCurrencies = toolkit.createAction('swap/switchCurrencies');
var typeInput$2 = toolkit.createAction('swap/typeInput');
var replaceSwapState = toolkit.createAction('swap/replaceSwapState');
var setRecipient = toolkit.createAction('swap/setRecipient');
var updatePolyDataIndex = toolkit.createAction('swap/updatePolyDataIndex');
var resetPolyData = toolkit.createAction('swap/resetPolyDataIndex');

var BASE_FEE = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(30), dsgswapSdk.JSBI.BigInt(10000));
var ONE_HUNDRED_PERCENT = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(10000), dsgswapSdk.JSBI.BigInt(10000));
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
        ? new dsgswapSdk.Percent(priceImpactWithoutFeeFraction === null || priceImpactWithoutFeeFraction === void 0 ? void 0 : priceImpactWithoutFeeFraction.numerator, priceImpactWithoutFeeFraction === null || priceImpactWithoutFeeFraction === void 0 ? void 0 : priceImpactWithoutFeeFraction.denominator)
        : undefined;
    // the amount of the input that accrues to LPs
    var realizedLPFeeAmount = realizedLPFee &&
        trade &&
        (trade.inputAmount instanceof dsgswapSdk.TokenAmount
            ? new dsgswapSdk.TokenAmount(trade.inputAmount.token, realizedLPFee.multiply(trade.inputAmount.raw).quotient)
            : dsgswapSdk.CurrencyAmount.ether(realizedLPFee.multiply(trade.inputAmount.raw).quotient));
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
    var ALLOWED_PRICE_IMPACT_USER = new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(UserSlippageTolerance), BIPS_BASE);
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

/**
 * Returns a map of the given addresses to their eventually consistent BNB balances.
 */
function useBNBBalances(uncheckedAddresses) {
    var multicallContract = useMulticallContract();
    var addresses = React.useMemo(function () {
        return uncheckedAddresses
            ? uncheckedAddresses
                .map(isAddress)
                .filter(function (a) { return a !== false; })
                .sort()
            : [];
    }, [uncheckedAddresses]);
    var results = useSingleContractMultipleData(multicallContract, 'getEthBalance', addresses.map(function (address) { return [address]; }));
    return React.useMemo(function () {
        return addresses.reduce(function (memo, address, i) {
            var _a, _b;
            var value = (_b = (_a = results === null || results === void 0 ? void 0 : results[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
            if (value)
                memo[address] = dsgswapSdk.CurrencyAmount.ether(dsgswapSdk.JSBI.BigInt(value.toString()));
            return memo;
        }, {});
    }, [addresses, results]);
}
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
function useTokenBalancesWithLoadingIndicator(address, tokens) {
    var validatedTokens = React.useMemo(function () { var _a; return (_a = tokens === null || tokens === void 0 ? void 0 : tokens.filter(function (t) { return isAddress(t === null || t === void 0 ? void 0 : t.address) !== false; })) !== null && _a !== void 0 ? _a : []; }, [tokens]);
    var validatedTokenAddresses = React.useMemo(function () { return validatedTokens.map(function (vt) { return vt.address; }); }, [validatedTokens]);
    var balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address]);
    var anyLoading = React.useMemo(function () { return balances.some(function (callState) { return callState.loading; }); }, [balances]);
    return [
        React.useMemo(function () {
            return address && validatedTokens.length > 0
                ? validatedTokens.reduce(function (memo, token, i) {
                    var _a, _b;
                    var value = (_b = (_a = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                    var amount = value ? dsgswapSdk.JSBI.BigInt(value.toString()) : undefined;
                    if (amount) {
                        memo[token.address] = new dsgswapSdk.TokenAmount(token, amount);
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
    var tokens = React.useMemo(function () { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.filter(function (currency) { return currency instanceof dsgswapSdk.Token; })) !== null && _a !== void 0 ? _a : []; }, [currencies]);
    var ETHER = dsgswapSdk.getActiveETHERWidthChainId();
    var tokenBalances = useTokenBalances(account, tokens);
    var containsBNB = React.useMemo(function () { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.some(function (currency) { return currency === ETHER; })) !== null && _a !== void 0 ? _a : false; }, [currencies, ETHER]);
    var ethBalance = useBNBBalances(containsBNB ? [account] : []);
    return React.useMemo(function () {
        var _a;
        return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.map(function (currency) {
            if (!account || !currency)
                return undefined;
            if (currency instanceof dsgswapSdk.Token)
                return tokenBalances[currency.address];
            if (currency === ETHER)
                return ethBalance[account];
            return undefined;
        })) !== null && _a !== void 0 ? _a : [];
    }, [account, currencies, ETHER, ethBalance, tokenBalances]);
}
function useCurrencyBalance(account, currency) {
    return useCurrencyBalances(account, [currency])[0];
}
// mimics useAllBalances
function useAllTokenBalances() {
    var account = core.useWeb3React().account;
    var allTokens = useAllTokens();
    var allTokensArray = React.useMemo(function () { return Object.values(allTokens !== null && allTokens !== void 0 ? allTokens : {}); }, [allTokens]);
    var balances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, allTokensArray);
    return balances !== null && balances !== void 0 ? balances : {};
}

axios__default["default"].defaults.timeout = 30 * 1000;
axios__default["default"].defaults.withCredentials = false;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios__default["default"].defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios__default["default"].defaults.headers.get.Accept = 'application/json';
function resetConfig(config) {
    var resConfig = tslib.__assign({}, config);
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
var request = axios__default["default"].create();
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
        baseURL: dsgswapSdk.getValueWithChainId(dsgswapSdk.POLY_BASE_URL),
    });
};
var get1inchQuoteData = function (chainId, data) { return get1inch("/" + chainId + "/quote", data); };
var get1inchSwapData = function (chainId, data) { return get1inch("/" + chainId + "/swap", data); };
var get1inchApproveSpender = function (chainId, data) { return get1inch("/" + chainId + "/approve/spender", data); };

var multicall$1 = function (abi, calls) { return tslib.__awaiter(void 0, void 0, void 0, function () {
    var multi, itf_1, calldata, returnData, res, error_1;
    return tslib.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                multi = getMulticallContract();
                itf_1 = new ethers.ethers.utils.Interface(abi);
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
}); };

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
var fetchSpenderAddress = function (chanId) { return tslib.__awaiter(void 0, void 0, void 0, function () {
    var address, error_1;
    return tslib.__generator(this, function (_a) {
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
}); };
var fetchAllowancceAmount = function (spender, account, tokenAddress) { return tslib.__awaiter(void 0, void 0, void 0, function () {
    var calls, _a, allowance, error_2;
    return tslib.__generator(this, function (_b) {
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
                _a = tslib.__read.apply(void 0, [_b.sent(), 1]), allowance = _a[0];
                return [2 /*return*/, allowance[0].toJSON().hex];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                return [2 /*return*/, '0'];
            case 3: return [2 /*return*/];
        }
    });
}); };

var _a$8;
var initialState$8 = (_a$8 = {
        independentField: Field$2.INPUT,
        typedValue: ''
    },
    _a$8[Field$2.INPUT] = {
        currencyId: '',
    },
    _a$8[Field$2.OUTPUT] = {
        currencyId: '',
    },
    _a$8.recipient = null,
    _a$8.polyDataIndex = {
        lastQueryTimestamp: 0,
    },
    _a$8);
// Async thunks
var fetchPolySwapDataAsync = toolkit.createAsyncThunk('swap/fetchPolySwapDataAsync', function (_a) {
    var chainId = _a.chainId, polyQueryData = _a.polyQueryData;
    return tslib.__awaiter(void 0, void 0, void 0, function () {
        var res;
        return tslib.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchPolyQuoteData(chainId, polyQueryData)];
                case 1:
                    res = _b.sent();
                    return [2 /*return*/, res];
            }
        });
    });
});
var fetchPolyAllowaceAsync = toolkit.createAsyncThunk('swap/fetchSpenderAddressAsync', function (_a, _b) {
    var chainId = _a.chainId, account = _a.account, tokenAddress = _a.tokenAddress;
    var getState = _b.getState;
    return tslib.__awaiter(void 0, void 0, void 0, function () {
        var swap, spender, allowance;
        return tslib.__generator(this, function (_c) {
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
var fetchPolySpenderAsync = toolkit.createAsyncThunk('swap/fetchPolySpenderAsync', function (chainId, _a) {
    var getState = _a.getState;
    return tslib.__awaiter(void 0, void 0, void 0, function () {
        var swap, spender;
        return tslib.__generator(this, function (_b) {
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
var swap = toolkit.createReducer(initialState$8, function (builder) {
    return builder
        .addCase(replaceSwapState, function (state, _a) {
        var _b;
        var _c = _a.payload, typedValue = _c.typedValue, recipient = _c.recipient, field = _c.field, inputCurrencyId = _c.inputCurrencyId, outputCurrencyId = _c.outputCurrencyId;
        return tslib.__assign(tslib.__assign({}, state), (_b = {}, _b[Field$2.INPUT] = {
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
            return tslib.__assign(tslib.__assign({}, state), (_b = { independentField: state.independentField === Field$2.INPUT ? Field$2.OUTPUT : Field$2.INPUT }, _b[field] = { currencyId: currencyId }, _b[otherField] = { currencyId: state[field].currencyId }, _b));
        }
        // the normal case
        return tslib.__assign(tslib.__assign({}, state), (_c = {}, _c[field] = { currencyId: currencyId }, _c));
    })
        .addCase(switchCurrencies, function (state) {
        var _a;
        return tslib.__assign(tslib.__assign({}, state), (_a = { independentField: state.independentField === Field$2.INPUT ? Field$2.OUTPUT : Field$2.INPUT }, _a[Field$2.INPUT] = { currencyId: state[Field$2.OUTPUT].currencyId }, _a[Field$2.OUTPUT] = { currencyId: state[Field$2.INPUT].currencyId }, _a));
    })
        .addCase(typeInput$2, function (state, _a) {
        var _b = _a.payload, field = _b.field, typedValue = _b.typedValue;
        return tslib.__assign(tslib.__assign({}, state), { independentField: field, typedValue: typedValue });
    })
        .addCase(setRecipient, function (state, _a) {
        var recipient = _a.payload.recipient;
        state.recipient = recipient;
    })
        .addCase(updatePolyDataIndex, function (state, _a) {
        var payload = _a.payload;
        state.polyDataIndex = tslib.__assign(tslib.__assign({}, state.polyDataIndex), payload.data);
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
    return reactRedux.useSelector(function (state) { return state.swap; });
}
function useSwapActionHandlers() {
    var dispatch = reactRedux.useDispatch();
    var onCurrencySelection = React.useCallback(function (field, currency) {
        var ETHER = dsgswapSdk.getActiveETHERWidthChainId();
        dispatch(selectCurrency({
            field: field,
            currencyId: currency instanceof dsgswapSdk.Token ? currency.address : currency === ETHER ? ETHER.symbol : '',
        }));
    }, [dispatch]);
    var onSwitchTokens = React.useCallback(function () {
        dispatch(switchCurrencies());
    }, [dispatch]);
    var onUserInput = React.useCallback(function (field, typedValue) {
        dispatch(typeInput$2({ field: field, typedValue: typedValue }));
    }, [dispatch]);
    var onChangeRecipient = React.useCallback(function (recipient) {
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
        var typedValueParsed = units.parseUnits(value, currency.decimals).toString();
        if (typedValueParsed !== '0') {
            return currency instanceof dsgswapSdk.Token
                ? new dsgswapSdk.TokenAmount(currency, dsgswapSdk.JSBI.BigInt(typedValueParsed))
                : dsgswapSdk.CurrencyAmount.ether(dsgswapSdk.JSBI.BigInt(typedValueParsed));
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
    var _b = tslib.__read(useUserUsePoly(), 1), userUsePoly = _b[0];
    var ETHER = dsgswapSdk.getActiveETHERWidthChainId();
    var dispatch = reactRedux.useDispatch();
    var _c = useSwapState(), independentField = _c.independentField, typedValue = _c.typedValue, _d = Field$2.INPUT, inputCurrencyId = _c[_d].currencyId, _e = Field$2.OUTPUT, outputCurrencyId = _c[_e].currencyId; _c.recipient;
    var _f = tslib.__read(useUserSlippageTolerance(), 1), allowedSlippage = _f[0];
    var inputCurrency = useCurrency(inputCurrencyId);
    var outputCurrency = useCurrency(outputCurrencyId);
    var debouncedValue = useDebounce(typedValue, 300);
    if (!chainId || !outputCurrency || !outputCurrency || !Number(debouncedValue) || !userUsePoly)
        return [PolyDataIndexStatus.NOT_SWAP_DATA, null];
    if ((inputCurrency === ETHER || outputCurrency === ETHER) && dsgswapSdk.currencyEquals(dsgswapSdk.WETHER[chainId], outputCurrency)) {
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
        amountDecimal: getDecimalAmount(new BigNumber__default["default"](debouncedValue), inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.decimals).toString(),
        fromAddress: account,
    };
    var timestamp = currentTimestamp$1();
    if (!isEqual__default["default"](data, polyDataIndex)) {
        dispatch(resetPolyData());
        dispatch(updatePolyDataIndex({ data: tslib.__assign(tslib.__assign({}, data), { lastQueryTimestamp: timestamp }) }));
        return [PolyDataIndexStatus.NEED_REFRESH, data];
    }
    if (timestamp - (polyDataIndex === null || polyDataIndex === void 0 ? void 0 : polyDataIndex.lastQueryTimestamp) > POLY_REFRESH_INTERVAL) {
        dispatch(updatePolyDataIndex({ data: tslib.__assign(tslib.__assign({}, data), { lastQueryTimestamp: timestamp }) }));
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
    var dispatch = reactRedux.useDispatch();
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
    var _j = tslib.__read(usePair(inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined), 1), pairStateIn = _j[0];
    var _k = tslib.__read(usePair(inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined), 1), pairStateOut = _k[0];
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
    var _l = tslib.__read(useUserSlippageTolerance(), 1), allowedSlippage = _l[0];
    var _m = tslib.__read(useSystemUsePoly(), 1); _m[0];
    var slippageAdjustedAmounts = v2Trade && allowedSlippage && computeSlippageAdjustedAmounts(v2Trade, allowedSlippage);
    // compare input balance to max input based on version
    var _o = tslib.__read([
        currencyBalances[Field$2.INPUT],
        slippageAdjustedAmounts ? slippageAdjustedAmounts[Field$2.INPUT] : null,
    ], 2), balanceIn = _o[0], amountIn = _o[1];
    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        inputError = t('Insufficient %symbol% balance', { symbol: amountIn.currency.symbol });
    }
    var _p = tslib.__read(useCheckUpdatePolyIndex(), 2), checkUpdatePolyIndex = _p[0], polyIndex = _p[1];
    if (checkUpdatePolyIndex === PolyDataIndexStatus.NEED_REFRESH && !inputError) {
        var polyQueryData = tslib.__assign(tslib.__assign({}, polyIndex), { amount: polyIndex === null || polyIndex === void 0 ? void 0 : polyIndex.amountDecimal, slippage: new BigNumber__default["default"](polyIndex === null || polyIndex === void 0 ? void 0 : polyIndex.slippage).div(100).toNumber() });
        dispatch(fetchPolySwapDataAsync({ chainId: chainId, polyQueryData: polyQueryData }));
        dispatch(fetchPolySpenderAsync(chainId));
        // dispatch(fetchPolySwapDataAsync({ chainId, polyQueryData }))
    }
    else if (checkUpdatePolyIndex === PolyDataIndexStatus.NOT_SWAP_DATA) {
        dispatch(resetPolyData());
    }
    else if (checkUpdatePolyIndex === PolyDataIndexStatus.LOADED) {
        var inputCurrencyAmount = new dsgswapSdk.TokenAmount(inputCurrency, polyIndex.amountDecimal);
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
function parseCurrencyFromURLParameter(urlParam) {
    var _a, _b, _c, _d, _e;
    var ETHER = dsgswapSdk.getActiveETHERWidthChainId();
    if (typeof urlParam === 'string') {
        var valid = isAddress(urlParam);
        if (valid)
            return valid;
        if (urlParam.toUpperCase() === ((_a = ETHER.symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()))
            return (_b = ETHER.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if (valid === false)
            return (_c = ETHER.symbol) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    }
    return (_e = (_d = ETHER.symbol) === null || _d === void 0 ? void 0 : _d.toLowerCase()) !== null && _e !== void 0 ? _e : '';
}
function parseTokenAmountURLParameter(urlParam) {
    // eslint-disable-next-line no-restricted-globals
    return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : '';
}
function parseIndependentFieldURLParameter(urlParam) {
    return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field$2.OUTPUT : Field$2.INPUT;
}
var ENS_NAME_REGEX$1 = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
var ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function validatedRecipient(recipient) {
    if (typeof recipient !== 'string')
        return null;
    var address = isAddress(recipient);
    if (address)
        return address;
    if (ENS_NAME_REGEX$1.test(recipient))
        return recipient;
    if (ADDRESS_REGEX.test(recipient))
        return recipient;
    return null;
}
function queryParametersToSwapState(parsedQs) {
    var _a;
    var inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency);
    var outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency);
    if (inputCurrency === outputCurrency) {
        if (typeof parsedQs.outputCurrency === 'string') {
            inputCurrency = '';
        }
        else {
            outputCurrency = '';
        }
    }
    var recipient = validatedRecipient(parsedQs.recipient);
    return _a = {},
        _a[Field$2.INPUT] = {
            currencyId: inputCurrency,
        },
        _a[Field$2.OUTPUT] = {
            currencyId: outputCurrency,
        },
        _a.typedValue = parseTokenAmountURLParameter(parsedQs.exactAmount),
        _a.independentField = parseIndependentFieldURLParameter(parsedQs.exactField),
        _a.recipient = recipient,
        _a;
}
// updates the swap state to use the defaults for a given network
function useDefaultsFromURLSearch(outputCurrency, inputCurrency) {
    var chainId = useActiveWeb3React().chainId;
    var dispatch = reactRedux.useDispatch();
    var _a = tslib.__read(React.useState(), 2), result = _a[0], setResult = _a[1];
    React.useEffect(function () {
        if (!chainId)
            return;
        var parsed = queryParametersToSwapState({ outputCurrency: outputCurrency, inputCurrency: inputCurrency });
        dispatch(replaceSwapState({
            typedValue: parsed.typedValue,
            field: parsed.independentField,
            inputCurrencyId: parsed[Field$2.INPUT].currencyId,
            outputCurrencyId: parsed[Field$2.OUTPUT].currencyId,
            recipient: null,
        }));
        setResult({ inputCurrencyId: parsed[Field$2.INPUT].currencyId, outputCurrencyId: parsed[Field$2.OUTPUT].currencyId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, chainId, outputCurrency, inputCurrency]);
    return result;
}
function useSwapCurrencies() {
    var _a = useSwapState() || {}, _b = Field$2.INPUT, inputStateCurrency = _a[_b], _c = Field$2.OUTPUT, outputStateCurrency = _a[_c];
    var inputCurrency = useCurrency(inputStateCurrency === null || inputStateCurrency === void 0 ? void 0 : inputStateCurrency.currencyId);
    var outputCurrency = useCurrency(outputStateCurrency === null || outputStateCurrency === void 0 ? void 0 : outputStateCurrency.currencyId);
    return React.useMemo(function () {
        return {
            inputCurrency: inputCurrency,
            outputCurrency: outputCurrency,
        };
    }, [outputCurrency, inputCurrency]);
}

var VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document;
function isWindowVisible() {
    return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden';
}
/**
 * Returns whether the window is currently visible to the user.
 */
function useIsWindowVisible() {
    var _a = tslib.__read(React.useState(isWindowVisible()), 2), focused = _a[0], setFocused = _a[1];
    var listener = React.useCallback(function () {
        setFocused(isWindowVisible());
    }, [setFocused]);
    React.useEffect(function () {
        if (!VISIBILITY_STATE_SUPPORTED)
            return undefined;
        document.addEventListener('visibilitychange', listener);
        return function () {
            document.removeEventListener('visibilitychange', listener);
        };
    }, [listener]);
    return focused;
}

var updateBlockNumber = toolkit.createAction('application/updateBlockNumber');

function Updater$3() {
    var _a = useActiveWeb3React(), library = _a.library, chainId = _a.chainId;
    var dispatch = reactRedux.useDispatch();
    var windowVisible = useIsWindowVisible();
    var _b = tslib.__read(React.useState({
        chainId: chainId,
        blockNumber: null,
    }), 2), state = _b[0], setState = _b[1];
    var blockNumberCallback = React.useCallback(function (blockNumber) {
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
    React.useEffect(function () {
        var _a;
        if (!library || !chainId || !windowVisible)
            return undefined;
        setState({ chainId: chainId, blockNumber: null });
        library
            .getBlockNumber()
            .then(blockNumberCallback)
            .catch(function (error) { return console.error("Failed to get block number for chainId: " + chainId, error); });
        if (!((_a = library._events) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.type === 'block'; }))) {
            library.on('block', blockNumberCallback);
        }
        return function () {
            library.removeListener('block', blockNumberCallback);
        };
    }, [dispatch, chainId, library, blockNumberCallback, windowVisible]);
    var debouncedState = useDebounce(state, 100);
    React.useEffect(function () {
        if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible)
            return;
        dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }));
    }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);
    return null;
}

var fetchTokenList = {
    pending: toolkit.createAction('lists/fetchTokenList/pending'),
    fulfilled: toolkit.createAction('lists/fetchTokenList/fulfilled'),
    rejected: toolkit.createAction('lists/fetchTokenList/rejected'),
};
// add and remove from list options
var addList = toolkit.createAction('lists/addList');
var removeList = toolkit.createAction('lists/removeList');
// select which lists to search across from loaded lists
var enableList = toolkit.createAction('lists/enableList');
var disableList = toolkit.createAction('lists/disableList');
// versioning
var acceptListUpdate = toolkit.createAction('lists/acceptListUpdate');
toolkit.createAction('lists/rejectVersionUpdate');
// chainId
var acceptListUpdateOfChainId = toolkit.createAction('lists/acceptListUpdateOfChainId');

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
    var codec = multicodec.getCodec(buff); // the typing is wrong for @types/multicodec
    switch (codec) {
        case 'ipfs-ns': {
            var data = multicodec.rmPrefix(buff);
            var cid = new CID__default["default"](data);
            return "ipfs://" + multihashes.toB58String(cid.multihash);
        }
        case 'ipns-ns': {
            var data = multicodec.rmPrefix(buff);
            var cid = new CID__default["default"](data);
            var multihash = multihashes.decode(cid.multihash);
            if (multihash.name === 'identity') {
                return "ipns://" + UTF_8_DECODER.decode(multihash.digest).trim();
            }
            return "ipns://" + multihashes.toB58String(cid.multihash);
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

var tokenListValidator = new Ajv__default["default"]({ allErrors: true }).compile(schema);
/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */
function getTokenList(listUrl, resolveENSContentHash) {
    var _a, _b, _c;
    return tslib.__awaiter(this, void 0, void 0, function () {
        var parsedENS, urls, contentHashUri, error_1, translatedUri, i, url, isLast, response, error_2, json, validationErrors;
        return tslib.__generator(this, function (_d) {
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
    return new contracts$1.Contract(resolverAddress, RESOLVER_ABI, provider);
}
/**
 * Fetches and decodes the result of an ENS contenthash lookup on mainnet to a URI
 * @param ensName to resolve
 * @param provider provider to use to fetch the data
 */
function resolveENSContentHash(ensName, provider) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var ensRegistrarContract, hash, resolverAddress;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ensRegistrarContract = new contracts$1.Contract(REGISTRAR_ADDRESS, REGISTRAR_ABI, provider);
                    hash = utils.namehash(ensName);
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
    var dispatch = reactRedux.useDispatch();
    var ensResolver = React.useCallback(function (ensName) {
        if (chainId !== dsgswapSdk.ChainId.MAINNET) {
            throw new Error('Could not construct mainnet ENS resolver');
        }
        return resolveENSContentHash(ensName, library);
    }, [chainId, library]);
    // note: prevent dispatch if using for list search or unsupported list
    return React.useCallback(function (listUrl, sendDispatch) {
        if (sendDispatch === void 0) { sendDispatch = true; }
        return tslib.__awaiter(_this, void 0, void 0, function () {
            var requestId;
            return tslib.__generator(this, function (_a) {
                requestId = toolkit.nanoid();
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
    var savedCallback = React.useRef();
    // Remember the latest callback.
    React.useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    React.useEffect(function () {
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
    var dispatch = reactRedux.useDispatch();
    var isWindowVisible = useIsWindowVisible();
    // get all loaded lists, and the active urls
    var lists = useAllLists();
    var activeListUrls = useActiveListUrls();
    // initiate loading
    useAllInactiveTokens();
    var fetchList = useFetchListCallback();
    var fetchAllListsCallback = React.useCallback(function () {
        if (!isWindowVisible)
            return;
        Object.keys(lists).forEach(function (url) {
            return fetchList(url).catch(function (error) { return console.debug('interval list fetching error', error); });
        });
    }, [fetchList, isWindowVisible, lists]);
    // fetch all lists every 10 minutes, but only after we initialize library
    useInterval(fetchAllListsCallback, library ? 1000 * 60 * 10 : null);
    // whenever a list is not loaded and not loading, try again to load it
    React.useEffect(function () {
        Object.keys(lists).forEach(function (listUrl) {
            var list = lists[listUrl];
            if (!list.current && !list.loadingRequestId && !list.error) {
                fetchList(listUrl).catch(function (error) { return console.debug('list added fetching error', error); });
            }
        });
    }, [dispatch, fetchList, library, lists]);
    // if any lists from unsupported lists are loaded, check them too (in case new updates since last visit)
    React.useEffect(function () {
        Object.keys(UNSUPPORTED_LIST_URLS).forEach(function (listUrl) {
            var list = lists[listUrl];
            if (!list || (!list.current && !list.loadingRequestId && !list.error)) {
                fetchList(listUrl).catch(function (error) { return console.debug('list added fetching error', error); });
            }
        });
    }, [dispatch, fetchList, library, lists]);
    // automatically update lists if versions are minor/patch
    React.useEffect(function () {
        Object.keys(lists).forEach(function (listUrl) {
            var list = lists[listUrl];
            if (list.current && list.pendingUpdate) {
                var bump = tokenLists.getVersionUpgrade(list.current.version, list.pendingUpdate.version);
                // eslint-disable-next-line default-case
                switch (bump) {
                    case tokenLists.VersionUpgrade.NONE:
                        throw new Error('unexpected no version bump');
                    // update any active or inactive lists
                    case tokenLists.VersionUpgrade.PATCH:
                    case tokenLists.VersionUpgrade.MINOR:
                    case tokenLists.VersionUpgrade.MAJOR:
                        dispatch(acceptListUpdate(listUrl));
                }
            }
        });
    }, [dispatch, lists, activeListUrls]);
    var handleUpdateOfChainId = React.useCallback(function (newChainId) {
        dispatch(acceptListUpdateOfChainId(newChainId));
    }, [dispatch]);
    React.useEffect(function () {
        dsgswapSdk.chainIdProxy.onChange(function (newChainId) { return handleUpdateOfChainId(newChainId); });
        return dsgswapSdk.chainIdProxy.removeChange(function (newChainId) { return handleUpdateOfChainId(newChainId); });
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
    tslib.__extends(CancelledError, _super);
    function CancelledError() {
        var _this = _super.call(this, 'Cancelled') || this;
        _this.isCancelledError = true; // hack class and instanceof in es5
        return _this;
    }
    return CancelledError;
}(Error));
/**
 * Throw this error if the function should retry
 */
var RetryableError = /** @class */ (function (_super) {
    tslib.__extends(RetryableError, _super);
    function RetryableError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRetryableError = true;
        return _this;
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
    var promise = new Promise(function (resolve, reject) { return tslib.__awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return tslib.__generator(this, function (_a) {
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
                    if (n <= 0 || !(error_1 === null || error_1 === void 0 ? void 0 : error_1.isRetryableError)) {
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
    }); });
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
    return tslib.__spreadArray([], tslib.__read(Array(numChunks).keys())).map(function (ix) { return items.slice(ix * chunkSize, ix * chunkSize + chunkSize); });
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
    return tslib.__awaiter(this, void 0, void 0, function () {
        var resultsBlockNumber, returnData, error_1;
        var _a;
        return tslib.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.debug('Fetching chunk', multicallContract, chunk, minBlockNumber);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, multicallContract.aggregate(chunk.map(function (obj) { return [obj.address, obj.callData]; }))];
                case 2:
                    // prettier-ignore  
                    _a = tslib.__read.apply(void 0, [_b.sent(), 2]), resultsBlockNumber = _a[0], returnData = _a[1];
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.debug('Failed to fetch chunk inside retry', error_1);
                    throw error_1;
                case 4:
                    if (resultsBlockNumber.toNumber() < minBlockNumber) {
                        console.debug("Fetched results for old block number: %c " + resultsBlockNumber.toString() + " vs. " + minBlockNumber, 'color: red');
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
        //  no data, must fetch
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
    var dispatch = reactRedux.useDispatch();
    var state = reactRedux.useSelector(function (s) { return s.multicall; });
    // wait for listeners to settle before triggering updates
    var debouncedListeners = useDebounce(state.callListeners, 100);
    var latestBlockNumber = useBlockNumber();
    var chainId = useActiveWeb3React().chainId;
    var multicallContract = useMulticallContract();
    var cancellations = React.useRef();
    var listeningKeys = React.useMemo(function () {
        return activeListeningKeys(debouncedListeners, chainId);
    }, [debouncedListeners, chainId]);
    var unserializedOutdatedCallKeys = React.useMemo(function () {
        return outdatedListeningKeys(state.callResults, listeningKeys, chainId, latestBlockNumber);
    }, [chainId, state.callResults, listeningKeys, latestBlockNumber]);
    var serializedOutdatedCallKeys = React.useMemo(function () { return JSON.stringify(unserializedOutdatedCallKeys.sort()); }, [unserializedOutdatedCallKeys]);
    React.useEffect(function () {
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
                    if (error === null || error === void 0 ? void 0 : error.isCancelledError) {
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
        return get__default["default"](theme, path, fallback);
    };
};

var rotate$2 = styled.keyframes(templateObject_1$1p || (templateObject_1$1p = tslib.__makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var spinStyle = styled.css(templateObject_2$E || (templateObject_2$E = tslib.__makeTemplateObject(["\n  animation: ", " 2s linear infinite;\n"], ["\n  animation: ", " 2s linear infinite;\n"])), rotate$2);
var Svg = styled__default["default"].svg(templateObject_3$o || (templateObject_3$o = tslib.__makeTemplateObject(["\n  align-self: center; // Safari fix\n  fill: ", ";\n  flex-shrink: 0;\n  ", "\n  ", "\n"], ["\n  align-self: center; // Safari fix\n  fill: ", ";\n  flex-shrink: 0;\n  ", "\n  ", "\n"])), function (_a) {
    var theme = _a.theme, color = _a.color;
    return getThemeValue("colors." + color, color)(theme);
}, function (_a) {
    var spin = _a.spin;
    return spin && spinStyle;
}, styledSystem.space);
Svg.defaultProps = {
    color: "text",
    width: "20px",
    xmlns: "http://www.w3.org/2000/svg",
    spin: false,
};
var templateObject_1$1p, templateObject_2$E, templateObject_3$o;

var Icon$g = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" }, void 0) }), void 0));
};

var Icon$f = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 17H11V15H13V17Z" }, void 0) }), void 0));
};

var getColor = function (_a) {
    var color = _a.color, theme = _a.theme;
    return getThemeValue("colors." + color, color)(theme);
};
var getFontSize = function (_a) {
    var fontSize = _a.fontSize, small = _a.small;
    return small ? "14px" : fontSize || "16px";
};
var Text = styled__default["default"].div(templateObject_1$1o || (templateObject_1$1o = tslib.__makeTemplateObject(["\n  color: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  font-family: ", ";\n  line-height: 1.5;\n  ", "\n  ", "\n\n  ", "\n  ", "\n  ", "\n"], ["\n  color: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  font-family: ", ";\n  line-height: 1.5;\n  ", "\n  ", "\n\n  ", "\n  ", "\n  ", "\n"])), getColor, getFontSize, function (_a) {
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
}, styledSystem.space, styledSystem.typography, styledSystem.layout);
Text.defaultProps = {
    color: "text",
    small: false,
    ellipsis: false,
};
var templateObject_1$1o;

styled__default["default"](Text)(templateObject_1$1n || (templateObject_1$1n = tslib.__makeTemplateObject(["\n  text-decoration: ", ";\n  text-underline-offset: 0.1em;\n"], ["\n  text-decoration: ", ";\n  text-underline-offset: 0.1em;\n"])), function (_a) {
    var theme = _a.theme;
    return "underline dotted " + theme.colors.textSubtle;
});
var templateObject_1$1n;

var getExternalLinkProps = function () { return ({
    target: "_blank",
    rel: "noreferrer noopener",
}); };

var scales$9 = {
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
    DANGER: "danger",
    SUBTLE: "subtle",
    SUCCESS: "success",
    CIRCULAR: "circular",
    ORANGE: "orange",
    LEFT: "left",
    RIGHT: "right",
};

var _a$7, _b$3;
// import aFront from '../../image/button/a-front.png';
// import eFront from '../../image/button/e-front.png';
// import btn from '../../image/button/btn.png';
// import btn1 from '../../image/button/btn-1.png';
// import btn2 from '../../image/button/btn-2.png';
// import e1 from '../../image/button/e1.png';
// import e2 from '../../image/button/e2.png';
// import e3 from '../../image/button/e3.png';
// import btnLeft from '../../image/button/btn-left.png';
// import btnRight from '../../image/button/btn-right.png';
var scaleVariants$1 = (_a$7 = {},
    _a$7[scales$9.LD] = {
        fontSize: '18px',
        height: '44px',
        minWidth: '108px',
        padding: '0 30px'
    },
    _a$7[scales$9.MD] = {
        height: '35px',
        padding: '0 20px'
    },
    _a$7[scales$9.SM] = {
        height: '32px',
        padding: '0 16px'
    },
    _a$7[scales$9.XS] = {
        height: '20px',
        fontSize: '12px',
        padding: '0 8px'
    },
    _a$7);
var styleVariants$2 = (_b$3 = {},
    _b$3[variants$5.PRIMARY] = {
        background: 'linear-gradient(90deg, #353535, #080808)',
        color: 'primary',
        border: '1px solid',
        borderColor: 'primary'
        // backgroundRepeat: "no-repeat",
        // backgroundImage: `url(${btn1}), url(${btn}), url(${btn2})`,
        // backgroundPosition: "0 0px, 10px 0px, 100% -1px",
        // backgroundSize: "20px 36px, calc(100% - 20px) 36px, 20px 38px",
    },
    _b$3[variants$5.SECONDARY] = {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'white',
        color: 'white',
        ':disabled': {
            backgroundColor: 'primary'
        }
    },
    _b$3[variants$5.TERTIARY] = {
        backgroundColor: 'backgroundDisabled',
        boxShadow: 'none',
        color: 'primary'
    },
    _b$3[variants$5.SUBTLE] = {
        backgroundColor: 'textSubtle',
        color: 'backgroundAlt'
    },
    _b$3[variants$5.DANGER] = {
        backgroundColor: "failure",
        // color: "white",
        color: 'white',
        backgroundRepeat: 'no-repeat',
        // backgroundImage: `url(${e1}), url(${e2}), url(${e3})`,
        backgroundPosition: '0 0px, 10px 0px, 100% -1px',
        backgroundSize: '20px 36px, calc(100% - 20px) 36px, 20px 38px'
    },
    _b$3[variants$5.LEFT] = {
        color: 'white',
        backgroundRepeat: 'no-repeat',
        // backgroundImage: `url(${btnLeft})`,
        backgroundPosition: '0',
        backgroundSize: '57px 60px',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: '0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), 1px 0px 0px 0px rgba(14, 14, 44, 0.4)'
    },
    _b$3[variants$5.RIGHT] = {
        color: 'white',
        backgroundRepeat: 'no-repeat',
        // backgroundImage: `url(${btnRight})`,
        backgroundPosition: 'right',
        backgroundSize: '57px 60px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        boxShadow: '0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), -1px 0px 0px 0px rgba(14, 14, 44, 0.4)'
    },
    _b$3[variants$5.SUCCESS] = {
        backgroundColor: 'success',
        color: 'white'
    },
    _b$3[variants$5.ORANGE] = {
        backgroundColor: 'orange',
        color: 'white',
        boxShadow: 'none'
    },
    _b$3[variants$5.TEXT] = {
        backgroundColor: 'transparent',
        color: 'primary',
        boxShadow: 'none',
        ':disabled': {
            color: 'white'
        }
    },
    _b$3[variants$5.CIRCULAR] = {
        // backgroundImage: `url(${eFront})`,
        color: 'white',
        width: '36px',
        height: '36px',
        padding: '0'
    },
    _b$3);

var getDisabledStyles = function (_a) {
    var $isLoading = _a.$isLoading, theme = _a.theme;
    if ($isLoading === true) {
        return "\n      &:disabled,\n      &.pancake-button--disabled {\n        cursor: progress;\n      }\n    ";
    }
    // background-size: 20px 36px, calc(100% - 20px) 36px, 20px 38px;
    return "\n    &:disabled,\n    &.pancake-button--disabled {\n      background-repeat: no-repeat;\n      background-position: 0 0px, 10px 0px, 100% -1px;\n      border-color: " + theme.colors.backgroundDisabled + ";\n      box-shadow: none;\n      color: white;\n      // color: " + theme.colors.textDisabled + ";\n      cursor: not-allowed;\n    }\n  ";
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
var StyledButton = styled__default["default"].button(templateObject_1$1m || (templateObject_1$1m = tslib.__makeTemplateObject(["\n  align-items: center;\n  border: 1px solid transparent;\n  border-radius: 10px;\n  /* box-shadow: 0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset; */\n  cursor: pointer;\n  display: inline-flex;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  justify-content: center;\n  /* letter-spacing: 0.03em; */\n  line-height: 1;\n  opacity: ", ";\n  outline: 0;\n  transition: background-color 0.2s, opacity 0.2s;\n\n  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {\n    opacity: 0.8;\n  }\n\n  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n  background-size: 100% 100%;\n  ", "\n  ", "\n  ", "\n"], ["\n  align-items: center;\n  border: 1px solid transparent;\n  border-radius: 10px;\n  /* box-shadow: 0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset; */\n  cursor: pointer;\n  display: inline-flex;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  justify-content: center;\n  /* letter-spacing: 0.03em; */\n  line-height: 1;\n  opacity: ", ";\n  outline: 0;\n  transition: background-color 0.2s, opacity 0.2s;\n\n  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {\n    opacity: 0.8;\n  }\n\n  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {\n    opacity: 0.85;\n    transform: translateY(1px);\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n  background-size: 100% 100%;\n  ", "\n  ", "\n  ", "\n"])), getOpacity, getDisabledStyles, styledSystem.variant({
    prop: "scale",
    variants: scaleVariants$1,
}), styledSystem.variant({
    variants: styleVariants$2,
}), styledSystem.layout, styledSystem.space);
var templateObject_1$1m;

var Button = function (props) {
    var startIcon = props.startIcon, endIcon = props.endIcon, external = props.external, className = props.className, isLoading = props.isLoading, disabled = props.disabled, children = props.children, rest = tslib.__rest(props, ["startIcon", "endIcon", "external", "className", "isLoading", "disabled", "children"]);
    var internalProps = external ? getExternalLinkProps() : {};
    var isDisabled = isLoading || disabled;
    var classNames = className ? [className] : [];
    if (isLoading) {
        classNames.push("pancake-button--loading");
    }
    if (isDisabled && !isLoading) {
        classNames.push("pancake-button--disabled");
    }
    return (jsxRuntime.jsx(StyledButton, tslib.__assign({ "$isLoading": isLoading, className: classNames.join(" "), disabled: isDisabled }, internalProps, rest, { children: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [React.isValidElement(startIcon) &&
                    React.cloneElement(startIcon, {
                        mr: "0.5rem",
                    }), children, React.isValidElement(endIcon) &&
                    React.cloneElement(endIcon, {
                        ml: "0.5rem",
                    })] }, void 0) }), void 0));
};
Button.defaultProps = {
    isLoading: false,
    external: false,
    variant: variants$5.PRIMARY,
    scale: scales$9.MD,
    disabled: false,
};

var IconButton = styled__default["default"](Button)(templateObject_1$1l || (templateObject_1$1l = tslib.__makeTemplateObject(["\n  padding: 0;\n  width: ", ";\n"], ["\n  padding: 0;\n  width: ", ";\n"])), function (_a) {
    var scale = _a.scale;
    return (scale === "sm" ? "32px" : "48px");
});
var templateObject_1$1l;

styled__default["default"](Button)(templateObject_1$1k || (templateObject_1$1k = tslib.__makeTemplateObject(["\n  padding: 0;\n  width: ", ";\n  height: ", ";\n  background: none;\n"], ["\n  padding: 0;\n  width: ", ";\n  height: ", ";\n  background: none;\n"])), function (_a) {
    var width = _a.width;
    return width ? width : 'auto';
}, function (_a) {
    var height = _a.height;
    return height ? height : 'auto';
});
var templateObject_1$1k;

var Icon$e = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 1024 1024" }, props, { children: jsxRuntime.jsx("path", { d: "M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m58.272-487.296a16 16 0 0 1 0 22.624l-129.12 129.12 129.12 129.12a16 16 0 0 1 0 22.64l-11.312 11.312a16 16 0 0 1-22.624 0l-151.76-151.76a16 16 0 0 1 0-22.624l151.76-151.744a16 16 0 0 1 22.624 0l11.312 11.312z", "p-id": "2877" }, void 0) }), void 0));
};

var Icon$d = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z" }, void 0) }), void 0));
};

var Icon$c = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M13 19V7.83001L17.88 12.71C18.27 13.1 18.91 13.1 19.3 12.71C19.69 12.32 19.69 11.69 19.3 11.3L12.71 4.71001C12.32 4.32001 11.69 4.32001 11.3 4.71001L4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7C5.08997 13.09 5.71997 13.09 6.10997 12.7L11 7.83001V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19Z" }, void 0) }), void 0));
};

var Icon$b = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z" }, void 0) }), void 0));
};

var Icon$a = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M9.00012 16.2L5.50012 12.7C5.11012 12.31 4.49012 12.31 4.10012 12.7C3.71012 13.09 3.71012 13.71 4.10012 14.1L8.29012 18.29C8.68012 18.68 9.31012 18.68 9.70012 18.29L20.3001 7.70001C20.6901 7.31001 20.6901 6.69001 20.3001 6.30001C19.9101 5.91001 19.2901 5.91001 18.9001 6.30001L9.00012 16.2Z" }, void 0) }), void 0));
};

var Icon$9 = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" }, void 0) }), void 0));
};

var Icon$8 = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M9.29006 15.88L13.1701 12L9.29006 8.12001C8.90006 7.73001 8.90006 7.10001 9.29006 6.71001C9.68006 6.32001 10.3101 6.32001 10.7001 6.71001L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" }, void 0) }), void 0));
};

var Icon$7 = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 1024 1024" }, props, { children: jsxRuntime.jsx("path", { d: "M621.714286 512 1002.057143 131.657143c29.257143-29.257143 29.257143-80.457143 0-109.714286-29.257143-29.257143-80.457143-29.257143-109.714286 0L512 402.285714 131.657143 21.942857c-29.257143-29.257143-80.457143-29.257143-109.714286 0-29.257143 29.257143-29.257143 80.457143 0 109.714286L402.285714 512 21.942857 892.342857c-29.257143 29.257143-29.257143 80.457143 0 109.714286 29.257143 29.257143 80.457143 29.257143 109.714286 0L512 621.714286l380.342857 380.342857c29.257143 29.257143 80.457143 29.257143 109.714286 0 29.257143-29.257143 29.257143-80.457143 0-109.714286L621.714286 512z", "p-id": "3258" }, void 0) }), void 0));
};

var Icon$6 = function (props) {
    return (jsxRuntime.jsxs(Svg, tslib.__assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsxRuntime.jsx("path", { d: "M999.80733706 414.70094965c-5.9202079-31.29128338-25.11399958-51.52580009-49.6952182-51.52580008l-4.26225148 0c-66.42380891 0-120.45082563-54.02577396-120.45082564-120.46821209 0-20.98960065 10.07192807-44.92253957 10.46064758-45.87384559 12.25521501-27.57671626 2.85143617-61.3704578-21.94090788-78.71503838l-124.64104577-69.39943701-1.83182465-0.89666233c-24.93516398-10.8133514-59.0642217-3.89216119-77.6569281 15.47798299-13.45490367 13.87715455-59.84041916 53.44579979-95.23498917 53.44579979-35.85531965 0-82.34391355-40.36222794-95.86712273-54.50266973-18.56041537-19.51172259-52.33677046-26.83653567-77.55384847-16.04181228l-129.07840702 70.72083332-1.93738736 1.23322125c-24.79482713 17.27503353-34.23337889 51.06753354-22.0464706 78.53868707 0.42100933 1.00470935 10.53019462 24.74266655 10.53019461 46.01418244 0 66.44243812-54.02701673 120.46821209-120.44958287 120.46821209l-5.03596465 0c-23.80874699 0-43.00378143 20.23327517-48.92026227 51.52580009-0.4408801 2.20191493-10.42587466 55.15467525-10.42587466 97.61201387 0 42.40269494 9.98499457 95.33682605 10.42587466 97.52135331 5.91648207 31.31115414 25.11151529 51.5630573 49.69397544 51.56305731l4.26225148 0c66.42256737 0 120.44958288 54.02701673 120.44958287 120.44958287 0 21.13117904-10.10794374 44.97470017-10.49542169 45.88999051-12.22044089 27.63011838-2.85143617 61.3704578 21.87135961 78.62810487l122.28140753 68.60833739 1.86659757 0.84574451c25.28786781 11.13003956 59.48523103 3.87353198 77.97609934-16.34111397 17.080053-18.45609419 63.36000577-56.77661479 97.345002-56.7766148 36.8389167 0 84.28130092 42.8982187 97.94733003 57.97133729 12.60667609 13.80636596 31.97806182 22.12098503 51.80647258 22.12098504 9.26220046 0 18.03136022-1.83430773 26.06158097-5.28434731l126.79080011-69.87384847 1.86659757-1.20093142c24.79234404-17.32595257 34.23213735-51.066292 22.01293801-78.55483199-0.42349242-1.02209582-10.53143738-24.76129575-10.53143738-46.0315689 0-66.42256737 54.02701673-120.44958288 120.45082563-120.44958287l4.96765915 0c23.84103682 0 43.06960262-20.25190317 48.98856778-51.5630573 0.42225087-2.18452848 10.42339036-55.11865958 10.42339035-97.52135331C1010.23072741 469.8556237 1000.22958794 416.90286338 999.80733706 414.70094965M937.96246779 512.31296231c0 27.43513786-5.45945706 62.69061378-7.96067371 77.41227008-99.63633474 8.17055638-176.8722523 91.42976148-176.8722523 192.12172342 0 28.42246076 9.01754243 55.64647318 13.80760751 68.16869884l-108.15959495 59.7311306c-5.31912021-5.56377824-21.02685787-21.41433583-42.40393648-37.33444047-37.54432436-27.82261582-73.53998085-42.03508773-106.928858-42.03508775-33.10572035 0-68.81697853 13.8597681-106.18495038 41.33092163-21.27275744 15.49661221-36.7681269 30.92243463-42.19281104 36.62779127l-104.03768032-58.25076823c5.07198032-13.15560319 13.84238163-40.02815332 13.84238165-68.23824589 0-100.69196193-77.23591877-183.95116703-176.83623785-192.12172342-2.53598956-14.72165751-7.99544661-49.97589068-7.99544661-77.41227008 0-27.48978275 5.45945706-62.76140237 7.99544661-77.48305988 99.60031907-8.15316992 176.83623785-91.42976148 176.83623785-192.12172341 0-28.26349469-9.01630089-55.57568338-13.80636598-68.07928104l110.83592136-60.91219126c4.8248392 4.82608075 20.63813837 20.30406375 42.26235809 35.69511326 36.84015824 26.29133441 71.92052319 39.60466091 104.39162569 39.60466091 32.15441435 0 66.98639664-13.06618539 103.57941377-38.84709267 21.80057103-15.3202597 37.57909728-30.58711726 42.15679537-34.90152933l106.67923259 59.25547759c-4.8248392 12.43280786-13.84238163 39.65682149-13.84238163 68.18484375 0 100.69196193 77.23591877 183.96855349 176.8722523 192.12172342C932.50301072 449.58509132 937.96246779 484.99953209 937.96246779 512.31296231", "p-id": "2036" }, void 0), jsxRuntime.jsx("path", { d: "M509.83472211 334.36521206c-97.7337215 0-177.25848871 79.52600876-177.25848871 177.25973027 0 97.74986642 79.52600876 177.2423438 177.25848871 177.2423438 97.7337215 0 177.25973026-79.49247739 177.25973026-177.2423438C687.09445237 413.89122082 607.5684424 334.36521206 509.83472211 334.36521206M614.82494998 511.62494233c0 57.88191949-47.08843884 104.96911679-104.99022907 104.96911678-57.9005487 0-104.95421341-47.0871973-104.95421342-104.96911678 0-57.84838812 47.05366471-104.95421341 104.95421342-104.95421342C567.73651236 406.67197045 614.82494998 453.77655421 614.82494998 511.62494233", "p-id": "2037" }, void 0)] }), void 0));
};

var Icon$5 = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 1024 1024" }, props, { children: jsxRuntime.jsx("path", { d: "M512 1024c-284.444444 0-512-227.555556-512-512s227.555556-512 512-512 512 227.555556 512 512-227.555556 512-512 512z m0-68.266667c244.622222 0 443.733333-199.111111 443.733333-443.733333S756.622222 68.266667 512 68.266667 68.266667 267.377778 68.266667 512s199.111111 443.733333 443.733333 443.733333z m11.377778-694.044444c45.511111 0 85.333333 11.377778 113.777778 39.822222 28.444444 22.755556 45.511111 62.577778 45.511111 102.4 0 34.133333-11.377778 68.266667-28.444445 91.022222-5.688889 5.688889-28.444444 28.444444-62.577778 56.888889-11.377778 11.377778-22.755556 22.755556-28.444444 39.822222-5.688889 17.066667-11.377778 34.133333-11.377778 45.511112v11.377777H472.177778v-11.377777c0-28.444444 5.688889-51.2 17.066666-68.266667 11.377778-22.755556 39.822222-51.2 79.644445-91.022222l11.377778-11.377778c11.377778-17.066667 22.755556-34.133333 22.755555-51.2 0-22.755556-5.688889-45.511111-22.755555-56.888889-17.066667-17.066667-34.133333-22.755556-62.577778-22.755556-34.133333 0-56.888889 11.377778-73.955556 28.444445-11.377778 17.066667-17.066667 39.822222-17.066666 73.955555H352.711111c0-51.2 17.066667-96.711111 45.511111-125.155555 28.444444-34.133333 73.955556-51.2 125.155556-51.2zM512 688.355556c17.066667 0 28.444444 5.688889 39.822222 17.066666 11.377778 11.377778 17.066667 22.755556 17.066667 39.822222 0 17.066667-5.688889 28.444444-17.066667 39.822223-11.377778 11.377778-22.755556 17.066667-39.822222 17.066666-28.444444 0-51.2-22.755556-51.2-51.2 0-17.066667 5.688889-28.444444 17.066667-39.822222 5.688889-17.066667 22.755556-22.755556 34.133333-22.755555z", "p-id": "1908" }, void 0) }), void 0));
};

var Icon$4 = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 1024 1024" }, props, { children: jsxRuntime.jsx("path", { d: "M839.104 192.96A460.48 460.48 0 0 0 511.488 57.216a460.352 460.352 0 0 0-327.68 135.744 460.352 460.352 0 0 0-135.744 327.68c0 90.176 25.92 177.6 74.944 252.8a32.192 32.192 0 1 0 53.952-35.2 397.824 397.824 0 0 1-64.512-217.6A399.36 399.36 0 0 1 511.36 121.792c219.968 0 398.848 178.944 398.848 398.848s-178.944 398.848-398.848 398.848a398.08 398.08 0 0 1-206.08-57.28 32.256 32.256 0 0 0-33.408 55.168 462.208 462.208 0 0 0 239.424 66.56 460.288 460.288 0 0 0 327.616-135.68c87.488-87.552 135.744-203.968 135.744-327.68s-48-240.064-135.552-327.616z m-345.472 10.496a40.768 40.768 0 0 0-40.768 40.832v293.504c0 1.408 0.384 2.816 0.512 4.16a40.32 40.32 0 0 0 40.768 35.84l0.128-0.896h231.488a40.832 40.832 0 1 0 0-81.6H534.464V244.288a40.832 40.832 0 0 0-40.832-40.832z m0 0", "p-id": "2168" }, void 0) }), void 0));
};

var Icon$3 = function (props) {
    return (jsxRuntime.jsxs(Svg, tslib.__assign({ viewBox: "0 0 40 40" }, props, { children: [jsxRuntime.jsx("path", { d: "M36.0112 3.33337L22.1207 13.6277L24.7012 7.56091L36.0112 3.33337Z", fill: "#E17726" }, void 0), jsxRuntime.jsx("path", { d: "M4.00261 3.33337L17.7558 13.7238L15.2989 7.56091L4.00261 3.33337Z", fill: "#E27625" }, void 0), jsxRuntime.jsx("path", { d: "M31.0149 27.2023L27.3227 32.8573L35.2287 35.0397L37.4797 27.3258L31.0149 27.2023Z", fill: "#E27625" }, void 0), jsxRuntime.jsx("path", { d: "M2.53386 27.3258L4.77116 35.0397L12.6772 32.8573L8.9987 27.2023L2.53386 27.3258Z", fill: "#E27625" }, void 0), jsxRuntime.jsx("path", { d: "M12.2518 17.6496L10.0419 20.9712L17.8793 21.3281L17.6048 12.8867L12.2518 17.6496Z", fill: "#E27625" }, void 0), jsxRuntime.jsx("path", { d: "M27.762 17.6494L22.3129 12.7905L22.1207 21.3279L29.9581 20.9711L27.762 17.6494Z", fill: "#E27625" }, void 0), jsxRuntime.jsx("path", { d: "M12.6772 32.8574L17.3989 30.5652L13.336 27.3809L12.6772 32.8574Z", fill: "#E27625" }, void 0), jsxRuntime.jsx("path", { d: "M22.6009 30.5652L27.3226 32.8574L26.6637 27.3809L22.6009 30.5652Z", fill: "#E27625" }, void 0), jsxRuntime.jsx("path", { d: "M27.3226 32.8575L22.6009 30.5653L22.9715 33.6399L22.9303 34.9301L27.3226 32.8575Z", fill: "#D5BFB2" }, void 0), jsxRuntime.jsx("path", { d: "M12.6772 32.8575L17.0694 34.9301L17.042 33.6399L17.3989 30.5653L12.6772 32.8575Z", fill: "#D5BFB2" }, void 0), jsxRuntime.jsx("path", { d: "M17.1518 25.3495L13.2262 24.1965L15.9988 22.92L17.1518 25.3495Z", fill: "#233447" }, void 0), jsxRuntime.jsx("path", { d: "M22.848 25.3495L24.001 22.92L26.801 24.1965L22.848 25.3495Z", fill: "#233447" }, void 0), jsxRuntime.jsx("path", { d: "M12.6773 32.8573L13.3635 27.2023L8.99876 27.3258L12.6773 32.8573Z", fill: "#CC6228" }, void 0), jsxRuntime.jsx("path", { d: "M26.6364 27.2023L27.3227 32.8573L31.0149 27.3258L26.6364 27.2023Z", fill: "#CC6228" }, void 0), jsxRuntime.jsx("path", { d: "M29.9581 20.9709L22.1207 21.3278L22.8482 25.3495L24.0011 22.92L26.8012 24.1965L29.9581 20.9709Z", fill: "#CC6228" }, void 0), jsxRuntime.jsx("path", { d: "M13.2263 24.1965L15.9989 22.92L17.1519 25.3495L17.8793 21.3278L10.0419 20.9709L13.2263 24.1965Z", fill: "#CC6228" }, void 0), jsxRuntime.jsx("path", { d: "M10.0419 20.9709L13.3361 27.3809L13.2263 24.1965L10.0419 20.9709Z", fill: "#E27525" }, void 0), jsxRuntime.jsx("path", { d: "M26.8011 24.1965L26.6638 27.3809L29.958 20.9709L26.8011 24.1965Z", fill: "#E27525" }, void 0), jsxRuntime.jsx("path", { d: "M17.8793 21.3278L17.1519 25.3494L18.0715 30.0985L18.2637 23.8396L17.8793 21.3278Z", fill: "#E27525" }, void 0), jsxRuntime.jsx("path", { d: "M22.1205 21.3278L21.7499 23.8258L21.9283 30.0985L22.848 25.3494L22.1205 21.3278Z", fill: "#E27525" }, void 0), jsxRuntime.jsx("path", { d: "M22.848 25.3496L21.9284 30.0987L22.601 30.5654L26.6638 27.381L26.8011 24.1967L22.848 25.3496Z", fill: "#F5841F" }, void 0), jsxRuntime.jsx("path", { d: "M13.2262 24.1967L13.336 27.381L17.3989 30.5654L18.0714 30.0987L17.1518 25.3496L13.2262 24.1967Z", fill: "#F5841F" }, void 0), jsxRuntime.jsx("path", { d: "M22.9303 34.93L22.9715 33.6398L22.6284 33.3378H17.3714L17.042 33.6398L17.0694 34.93L12.6772 32.8574L14.2145 34.1202L17.3302 36.2751H22.6696L25.7853 34.1202L27.3226 32.8574L22.9303 34.93Z", fill: "#C0AC9D" }, void 0), jsxRuntime.jsx("path", { d: "M22.601 30.5653L21.9284 30.0986H18.0715L17.3989 30.5653L17.0421 33.6399L17.3715 33.3379H22.6285L22.9716 33.6399L22.601 30.5653Z", fill: "#161616" }, void 0), jsxRuntime.jsx("path", { d: "M36.5875 14.3003L37.7542 8.61779L36.011 3.33337L22.6009 13.2846L27.7618 17.6493L35.0365 19.7768L36.6424 17.8964L35.9424 17.3886L37.0679 16.3728L36.2169 15.7003L37.3287 14.863L36.5875 14.3003Z", fill: "#763E1A" }, void 0), jsxRuntime.jsx("path", { d: "M2.24573 8.61779L3.42615 14.3003L2.67123 14.863L3.78302 15.7003L2.93202 16.3728L4.05753 17.3886L3.35752 17.8964L4.96343 19.7768L12.2518 17.6493L17.399 13.2846L4.00263 3.33337L2.24573 8.61779Z", fill: "#763E1A" }, void 0), jsxRuntime.jsx("path", { d: "M35.0365 19.777L27.7619 17.6495L29.958 20.9712L26.6638 27.3811L31.0149 27.3262H37.4797L35.0365 19.777Z", fill: "#F5841F" }, void 0), jsxRuntime.jsx("path", { d: "M12.2517 17.6495L4.96332 19.777L2.53386 27.3262H8.99869L13.336 27.3811L10.0419 20.9712L12.2517 17.6495Z", fill: "#F5841F" }, void 0), jsxRuntime.jsx("path", { d: "M22.1205 21.3276L22.6009 13.2843L24.701 7.56067H15.2988L17.3988 13.2843L17.8792 21.3276L18.0577 23.8531L18.0714 30.0984H21.9283L21.9421 23.8531L22.1205 21.3276Z", fill: "#F5841F" }, void 0)] }), void 0));
};

var Icon$2 = function (props) {
    return (jsxRuntime.jsxs(Svg, tslib.__assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsxRuntime.jsx("path", { d: "M797.47878827 983.66060587h-570.95757654A186.4300608 186.4300608 0 0 1 40.33939413 797.47878827v-570.95757654A186.4300608 186.4300608 0 0 1 226.52121173 40.33939413H512a37.23636373 37.23636373 0 0 1 0 74.47272747H226.52121173A111.95733333 111.95733333 0 0 0 114.8121216 226.52121173v570.95757654a111.95733333 111.95733333 0 0 0 111.70909013 111.70909013h570.95757654a111.95733333 111.95733333 0 0 0 111.70909013-111.70909013V512a37.23636373 37.23636373 0 0 1 74.47272747 0v285.47878827a186.4300608 186.4300608 0 0 1-186.1818176 186.1818176z", "p-id": "2692" }, void 0), jsxRuntime.jsx("path", { d: "M499.5878784 561.64848533a37.48460587 37.48460587 0 0 1-26.31369707-10.92266666 36.9881216 36.9881216 0 0 1 0-52.62739414l446.83636374-446.83636373a37.23636373 37.23636373 0 0 1 52.62739413 52.62739413l-446.83636373 446.83636374a37.48460587 37.48460587 0 0 1-26.31369707 10.92266666z", "p-id": "2693" }, void 0), jsxRuntime.jsx("path", { d: "M946.42424213 114.8121216h-198.5939392a37.23636373 37.23636373 0 0 1 0-74.47272747h198.5939392a37.23636373 37.23636373 0 0 1 0 74.47272747z", "p-id": "2694" }, void 0), jsxRuntime.jsx("path", { d: "M946.42424213 313.4060608a37.23636373 37.23636373 0 0 1-37.23636373-37.23636373v-198.5939392a37.23636373 37.23636373 0 0 1 74.47272747 0v198.5939392a37.23636373 37.23636373 0 0 1-37.23636374 37.23636373z", "p-id": "2695" }, void 0)] }), void 0));
};

var Icon$1 = function (props) {
    return (jsxRuntime.jsxs(Svg, tslib.__assign({ viewBox: "0 0 1024 1024" }, props, { children: [jsxRuntime.jsx("path", { d: "M514.42725925 1014.56402963c-277.07164445 0-502.44266667-225.37102222-502.44266666-502.44266666s225.37102222-502.44266667 502.44266666-502.44266667 502.44266667 225.37102222 502.44266667 502.44266667-225.37102222 502.44266667-502.44266667 502.44266666z m0-936.07253333c-239.08503703 0-433.62986667 194.54482963-433.62986666 433.62986667S275.34222222 945.75122963 514.42725925 945.75122963s433.62986667-194.54482963 433.62986667-433.62986666S753.5122963 78.4914963 514.42725925 78.4914963z", "p-id": "2429" }, void 0), jsxRuntime.jsx("path", { d: "M784.45985185 470.3725037h-540.06518518V401.5597037h435.69303703l-36.16616295-26.82121481 40.8993185-55.34151111 120.02797038 88.83768889c11.89357037 8.8594963 16.86945185 24.27259259 12.25765926 38.47205925-4.61179259 14.19946667-17.84035555 23.66577778-32.64663704 23.66577778zM344.03365925 704.84574815l-120.02797036-88.8376889c-11.89357037-8.8594963-16.86945185-24.27259259-12.25765926-38.47205925 4.61179259-14.0781037 17.84035555-23.66577778 32.64663704-23.66577778h540.06518518v68.8128h-435.69303703l36.16616296 26.82121481-40.89931853 55.34151112z", "p-id": "2430" }, void 0)] }), void 0));
};

var Icon = function (props) {
    return (jsxRuntime.jsx(Svg, tslib.__assign({ viewBox: "0 0 24 24" }, props, { children: jsxRuntime.jsx("path", { d: "M4.47 20.9999H19.53C21.07 20.9999 22.03 19.3299 21.26 17.9999L13.73 4.98993C12.96 3.65993 11.04 3.65993 10.27 4.98993L2.74 17.9999C1.97 19.3299 2.93 20.9999 4.47 20.9999ZM12 13.9999C11.45 13.9999 11 13.5499 11 12.9999V10.9999C11 10.4499 11.45 9.99993 12 9.99993C12.55 9.99993 13 10.4499 13 10.9999V12.9999C13 13.5499 12.55 13.9999 12 13.9999ZM13 17.9999H11V15.9999H13V17.9999Z" }, void 0) }), void 0));
};

var Box = styled__default["default"].div(templateObject_1$1j || (templateObject_1$1j = tslib.__makeTemplateObject(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), styledSystem.background, styledSystem.border, styledSystem.layout, styledSystem.position, styledSystem.space);
var templateObject_1$1j;

var Flex = styled__default["default"](Box)(templateObject_1$1i || (templateObject_1$1i = tslib.__makeTemplateObject(["\n  display: flex;\n  ", "\n"], ["\n  display: flex;\n  ", "\n"])), styledSystem.flexbox);
var templateObject_1$1i;

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
styled__default["default"].div(templateObject_1$1h || (templateObject_1$1h = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 16px 0 0 16px;\n  color: ", ";\n  padding: 12px;\n"], ["\n  background-color: ", ";\n  border-radius: 16px 0 0 16px;\n  color: ", ";\n  padding: 12px;\n"])), getThemeColor, function (_a) {
    var theme = _a.theme;
    return theme.alert.background;
});
var withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
styled__default["default"].div(templateObject_2$D || (templateObject_2$D = tslib.__makeTemplateObject(["\n  flex: 1;\n  padding-bottom: 12px;\n  padding-left: 12px;\n  padding-right: ", ";\n  padding-top: 12px;\n"], ["\n  flex: 1;\n  padding-bottom: 12px;\n  padding-left: 12px;\n  padding-right: ", ";\n  padding-top: 12px;\n"])), function (_a) {
    var hasHandler = _a.hasHandler;
    return (hasHandler ? withHandlerSpacing + "px" : "12px");
});
styled__default["default"].div(templateObject_3$n || (templateObject_3$n = tslib.__makeTemplateObject(["\n  border-radius: 0 16px 16px 0;\n  right: 8px;\n  position: absolute;\n  top: 8px;\n"], ["\n  border-radius: 0 16px 16px 0;\n  right: 8px;\n  position: absolute;\n  top: 8px;\n"])));
styled__default["default"](Flex)(templateObject_4$d || (templateObject_4$d = tslib.__makeTemplateObject(["\n  position: relative;\n  background-color: ", ";\n  border-radius: 16px;\n  /* box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05); */\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.05);\n"], ["\n  position: relative;\n  background-color: ", ";\n  border-radius: 16px;\n  /* box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05); */\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.05);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.alert.background;
});
var templateObject_1$1h, templateObject_2$D, templateObject_3$n, templateObject_4$d;

var Grid = styled__default["default"](Box)(templateObject_1$1g || (templateObject_1$1g = tslib.__makeTemplateObject(["\n  display: grid;\n  ", "\n  ", "\n"], ["\n  display: grid;\n  ", "\n  ", "\n"])), styledSystem.flexbox, styledSystem.grid);
var templateObject_1$1g;

var scales$8 = {
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
    var _b = _a.scale, scale = _b === void 0 ? scales$8.MD : _b;
    switch (scale) {
        case scales$8.SM:
            return "32px";
        case scales$8.LG:
            return "48px";
        case scales$8.MD:
        default:
            return "40px";
    }
};
var Input$3 = styled__default["default"].input(templateObject_1$1f || (templateObject_1$1f = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  border: 0;\n  border-radius: 10px;\n  box-shadow: ", ";\n  color: ", ";\n  display: block;\n  font-size: 16px;\n  height: ", ";\n  outline: 0;\n  padding: 0 16px;\n  width: 100%;\n  border: none;\n  padding-left: ", ";;\n\n  &::placeholder {\n    color: ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n    box-shadow: none;\n    color: ", ";\n    cursor: not-allowed;\n  }\n  &:read-only {\n    box-shadow: none;\n  }\n\n  &:focus:not(:disabled):not(:readonly) {\n    box-shadow: ", ";\n  }\n"], ["\n  background-color: ", ";\n  border: 0;\n  border-radius: 10px;\n  box-shadow: ", ";\n  color: ", ";\n  display: block;\n  font-size: 16px;\n  height: ", ";\n  outline: 0;\n  padding: 0 16px;\n  width: 100%;\n  border: none;\n  padding-left: ", ";;\n\n  &::placeholder {\n    color: ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n    box-shadow: none;\n    color: ", ";\n    cursor: not-allowed;\n  }\n  &:read-only {\n    box-shadow: none;\n  }\n\n  &:focus:not(:disabled):not(:readonly) {\n    box-shadow: ", ";\n  }\n"])), function (_a) {
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
    return theme.colors.textSubtle;
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
Input$3.defaultProps = {
    scale: scales$8.MD,
    isSuccess: false,
    isWarning: false,
};
var templateObject_1$1f;

styled__default["default"](IconButton)(templateObject_1$1e || (templateObject_1$1e = tslib.__makeTemplateObject(["\n  width: 16px;\n"], ["\n  width: 16px;\n"])));
styled__default["default"](Text)(templateObject_2$C || (templateObject_2$C = tslib.__makeTemplateObject(["\n  margin-left: 4px;\n  text-align: right;\n  color: ", ";\n  white-space: nowrap;\n"], ["\n  margin-left: 4px;\n  text-align: right;\n  color: ", ";\n  white-space: nowrap;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.textSubtle;
});
styled__default["default"](Box)(templateObject_3$m || (templateObject_3$m = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 16px;\n  box-shadow: ", ";\n  padding: 8px 16px;\n"], ["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 16px;\n  box-shadow: ", ";\n  padding: 8px 16px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.input;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.inputSecondary;
}, function (_a) {
    var theme = _a.theme, isWarning = _a.isWarning;
    return theme.shadows[isWarning ? "warning" : "inset"];
});
styled__default["default"](Input$3)(templateObject_4$c || (templateObject_4$c = tslib.__makeTemplateObject(["\n  background: transparent;\n  border-radius: 0;\n  box-shadow: none;\n  padding-left: 0;\n  padding-right: 0;\n  text-align: ", ";\n  border: none;\n\n  ::placeholder {\n    color: ", ";\n  }\n\n  &:focus:not(:disabled) {\n    box-shadow: none;\n  }\n"], ["\n  background: transparent;\n  border-radius: 0;\n  box-shadow: none;\n  padding-left: 0;\n  padding-right: 0;\n  text-align: ", ";\n  border: none;\n\n  ::placeholder {\n    color: ", ";\n  }\n\n  &:focus:not(:disabled) {\n    box-shadow: none;\n  }\n"])), function (_a) {
    var _b = _a.textAlign, textAlign = _b === void 0 ? "right" : _b;
    return textAlign;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.textSubtle;
});
var templateObject_1$1e, templateObject_2$C, templateObject_3$m, templateObject_4$c;

styled__default["default"].div(templateObject_1$1d || (templateObject_1$1d = tslib.__makeTemplateObject(["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  padding-left: 4px;\n  padding-right: 4px;\n\n  ", " {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n\n  ", " {\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n"], ["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  padding-left: 4px;\n  padding-right: 4px;\n\n  ", " {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n\n  ", " {\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.textDisabled;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.sm;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
});
styled__default["default"].ul(templateObject_2$B || (templateObject_2$B = tslib.__makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  list-style-type: none;\n\n  ", "\n"], ["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  list-style-type: none;\n\n  ", "\n"])), styledSystem.space);
jsxRuntime.jsx(Icon$8, { color: "currentColor", width: "24px" }, void 0);
var templateObject_1$1d, templateObject_2$B;

var getBackgroundColor = function (_a) {
    var theme = _a.theme, variant = _a.variant;
    return theme.colors[variant === variants$5.SUBTLE ? "inputSelect" : "tertiary"];
};
var getBorderColor = function (_a) {
    var theme = _a.theme, variant = _a.variant;
    return theme.colors[variant === variants$5.SUBTLE ? "inputSecondary" : "disabled"];
};
var StyledButtonMenu$1 = styled__default["default"].div(templateObject_1$1c || (templateObject_1$1c = tslib.__makeTemplateObject(["\n  background-color: ", "; \n  \n  /* background: #DBDBDB; */\n  border-radius: 10px;\n  display: ", ";\n  /* border: 1px solid ", "; */\n  box-shadow: 0px 4px 0px 0px #7E7E7E;;\n  width: ", ";\n\n  & > button,\n  & > a {\n    margin-left: ", "; // To avoid focus shadow overlap\n    flex: ", ";\n  }\n\n  & > button + button,\n  & > a + a {\n    margin-left: 2px; // To avoid focus shadow overlap\n  }\n\n  & > button,\n  & a {\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n"], ["\n  background-color: ", "; \n  \n  /* background: #DBDBDB; */\n  border-radius: 10px;\n  display: ", ";\n  /* border: 1px solid ", "; */\n  box-shadow: 0px 4px 0px 0px #7E7E7E;;\n  width: ", ";\n\n  & > button,\n  & > a {\n    margin-left: ", "; // To avoid focus shadow overlap\n    flex: ", ";\n  }\n\n  & > button + button,\n  & > a + a {\n    margin-left: 2px; // To avoid focus shadow overlap\n  }\n\n  & > button,\n  & a {\n    box-shadow: none;\n  }\n\n  ", "\n  ", "\n"])), getBackgroundColor, function (_a) {
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
}, styledSystem.space);
var ButtonMenu = function (_a) {
    var _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, _c = _a.scale, scale = _c === void 0 ? scales$9.MD : _c, _d = _a.variant, variant = _d === void 0 ? variants$5.PRIMARY : _d, onItemClick = _a.onItemClick, disabled = _a.disabled, children = _a.children, _e = _a.fullWidth, fullWidth = _e === void 0 ? false : _e, props = tslib.__rest(_a, ["activeIndex", "scale", "variant", "onItemClick", "disabled", "children", "fullWidth"]);
    return (jsxRuntime.jsx(StyledButtonMenu$1, tslib.__assign({ disabled: disabled, variant: variant, fullWidth: fullWidth }, props, { children: React.Children.map(children, function (child, index) {
            return React.cloneElement(child, {
                isActive: activeIndex === index,
                onClick: onItemClick ? function () { return onItemClick(index); } : undefined,
                scale: scale,
                variant: variant,
                disabled: disabled,
            });
        }) }), void 0));
};
var templateObject_1$1c;

var InactiveButton = styled__default["default"](Button)(templateObject_1$1b || (templateObject_1$1b = tslib.__makeTemplateObject(["\n  background: transparent;\n  color: ", ";\n  &:hover:not(:disabled):not(:active) {\n    background: transparent;\n    background-image: none;\n  }\n"], ["\n  background: transparent;\n  color: ", ";\n  &:hover:not(:disabled):not(:active) {\n    background: transparent;\n    background-image: none;\n  }\n"])), function (_a) {
    var theme = _a.theme, variant = _a.variant;
    return (variant === variants$5.PRIMARY ? theme.colors.primary : theme.colors.primary);
});
var ButtonMenuItem = function (_a) {
    var _b = _a.isActive, isActive = _b === void 0 ? false : _b, _c = _a.variant, variant = _c === void 0 ? variants$5.PRIMARY : _c, as = _a.as, props = tslib.__rest(_a, ["isActive", "variant", "as"]);
    if (!isActive) {
        return jsxRuntime.jsx(InactiveButton, tslib.__assign({ forwardedAs: as, variant: variant }, props), void 0);
    }
    return jsxRuntime.jsx(Button, tslib.__assign({ as: as, variant: variant }, props), void 0);
};
var templateObject_1$1b;

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
var StyledCard = styled__default["default"].div(templateObject_1$1a || (templateObject_1$1a = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  color: ", ";\n  overflow: hidden;\n  position: relative;\n\n  ", "\n"], ["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  color: ", ";\n  overflow: hidden;\n  position: relative;\n\n  ", "\n"])), function (_a) {
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
}, styledSystem.space);
StyledCard.defaultProps = {
    isActive: false,
    isSuccess: false,
    isWarning: false,
    isDisabled: false,
};
var templateObject_1$1a;

var Card$1 = function (_a) {
    var ribbon = _a.ribbon, children = _a.children, props = tslib.__rest(_a, ["ribbon", "children"]);
    return (jsxRuntime.jsxs(StyledCard, tslib.__assign({}, props, { children: [ribbon, children] }), void 0));
};

var CardBody = styled__default["default"].div(templateObject_1$19 || (templateObject_1$19 = tslib.__makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), styledSystem.space);
CardBody.defaultProps = {
    p: "24px",
};
var templateObject_1$19;

var CardHeader = styled__default["default"].div(templateObject_1$18 || (templateObject_1$18 = tslib.__makeTemplateObject(["\n  background: ", ";\n  ", "\n"], ["\n  background: ", ";\n  ", "\n"])), function (_a) {
    var theme = _a.theme, _b = _a.variant, variant = _b === void 0 ? "default" : _b;
    return theme.card.cardHeaderBackground[variant];
}, styledSystem.space);
CardHeader.defaultProps = {
    p: "24px",
};
var templateObject_1$18;

var CardFooter = styled__default["default"].div(templateObject_1$17 || (templateObject_1$17 = tslib.__makeTemplateObject(["\n  border-top: 1px solid ", ";\n  ", "\n"], ["\n  border-top: 1px solid ", ";\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.cardBorder;
}, styledSystem.space);
CardFooter.defaultProps = {
    p: "24px",
};
var templateObject_1$17;

styled__default["default"].div(templateObject_1$16 || (templateObject_1$16 = tslib.__makeTemplateObject(["\n  z-index: 1;\n  background-color: ", ";\n  color: white;\n  margin: 0;\n  padding: 0;\n  padding: 8px 0;\n  position: absolute;\n  right: ", ";\n  top: 0;\n  text-align: center;\n  transform: translateX(30%) translateY(0%) rotate(45deg);\n  transform: ", ";\n  transform-origin: top left;\n  width: 96px;\n\n  &:before,\n  &:after {\n    background-color: ", ";\n    content: \"\";\n    height: 100%;\n    margin: 0 -1px; /* Removes tiny gap */\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  &:before {\n    right: 100%;\n  }\n\n  &:after {\n    left: 100%;\n  }\n\n  & > div {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    width: 96px;\n  }\n"], ["\n  z-index: 1;\n  background-color: ", ";\n  color: white;\n  margin: 0;\n  padding: 0;\n  padding: 8px 0;\n  position: absolute;\n  right: ", ";\n  top: 0;\n  text-align: center;\n  transform: translateX(30%) translateY(0%) rotate(45deg);\n  transform: ", ";\n  transform-origin: top left;\n  width: 96px;\n\n  &:before,\n  &:after {\n    background-color: ", ";\n    content: \"\";\n    height: 100%;\n    margin: 0 -1px; /* Removes tiny gap */\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  &:before {\n    right: 100%;\n  }\n\n  &:after {\n    left: 100%;\n  }\n\n  & > div {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    width: 96px;\n  }\n"])), function (_a) {
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
var templateObject_1$16;

var scales$7 = {
    XS: "xs",
    SM: "sm",
    MD: "md",
};

var getScale$3 = function (_a) {
    var scale = _a.scale;
    switch (scale) {
        case scales$7.XS:
            return "16px";
        case scales$7.SM:
            return "24px";
        case scales$7.MD:
        default:
            return "32px";
    }
};
var Checkbox = styled__default["default"].input.attrs({ type: "checkbox" })(templateObject_1$15 || (templateObject_1$15 = tslib.__makeTemplateObject(["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 8px;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    content: \"\";\n    position: absolute;\n    border-bottom: 2px solid;\n    border-left: 2px solid;\n    border-color: transparent;\n    top: 30%;\n    left: 0;\n    right: 0;\n    width: 50%;\n    height: 25%;\n    margin: auto;\n    transform: rotate(-50deg);\n    transition: border-color 0.2s ease-in-out;\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      border-color: white;\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n"], ["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 8px;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    content: \"\";\n    position: absolute;\n    border-bottom: 2px solid;\n    border-left: 2px solid;\n    border-color: transparent;\n    top: 30%;\n    left: 0;\n    right: 0;\n    width: 50%;\n    height: 25%;\n    margin: auto;\n    transform: rotate(-50deg);\n    transition: border-color 0.2s ease-in-out;\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      border-color: white;\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n"])), getScale$3, getScale$3, function (_a) {
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
    scale: scales$7.MD,
};
var templateObject_1$15;

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
var DropdownContent = styled__default["default"].div(templateObject_1$14 || (templateObject_1$14 = tslib.__makeTemplateObject(["\n  width: max-content;\n  display: none;\n  flex-direction: column;\n  position: absolute;\n  transform: translate(-50%, 0);\n  left: ", ";\n  bottom: ", ";\n  background-color: ", ";\n  /* box-shadow: ", "; */\n  padding: 16px;\n  max-height: 400px;\n  overflow-y: auto;\n  z-index: ", ";\n  border-radius: ", ";\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);\n"], ["\n  width: max-content;\n  display: none;\n  flex-direction: column;\n  position: absolute;\n  transform: translate(-50%, 0);\n  left: ", ";\n  bottom: ", ";\n  background-color: ", ";\n  /* box-shadow: ", "; */\n  padding: 16px;\n  max-height: 400px;\n  overflow-y: auto;\n  z-index: ", ";\n  border-radius: ", ";\n  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);\n"])), getLeft, getBottom, function (_a) {
    var theme = _a.theme;
    return theme.colors.backgroundAlt;
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
styled__default["default"].div(templateObject_2$A || (templateObject_2$A = tslib.__makeTemplateObject(["\n  position: relative;\n  &:hover ", ", &:focus-within ", " {\n    display: flex;\n  }\n"], ["\n  position: relative;\n  &:hover ", ", &:focus-within ", " {\n    display: flex;\n  }\n"])), DropdownContent, DropdownContent);
var templateObject_1$14, templateObject_2$A;

var bunnyFall = styled.keyframes(templateObject_1$13 || (templateObject_1$13 = tslib.__makeTemplateObject(["\n  0% {\n    opacity: 1;\n    transform: translate(0, -100%) rotateZ(0deg);\n  }\n\n  75% {\n    opacity: 1;\n    transform: translate(100px, 75vh) rotateZ(270deg);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translate(150px, 100vh) rotateZ(360deg);\n  }\n"], ["\n  0% {\n    opacity: 1;\n    transform: translate(0, -100%) rotateZ(0deg);\n  }\n\n  75% {\n    opacity: 1;\n    transform: translate(100px, 75vh) rotateZ(270deg);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translate(150px, 100vh) rotateZ(360deg);\n  }\n"])));
styled__default["default"].div(templateObject_2$z || (templateObject_2$z = tslib.__makeTemplateObject(["\n  display: inline-flex;\n  position: fixed;\n  top: 0;\n  left: ", ";\n  transform: translate3d(0, -100%, 0);\n  user-select: none;\n  pointer-events: none;\n  z-index: 99999;\n\n  animation-name: ", ";\n  animation-duration: ", ";\n  animation-timing-function: linear;\n  animation-iteration-count: ", ";\n  animation-play-state: running;\n\n  &:nth-child(5n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(2n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 10) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(7n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(4n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 7) {\n    animation-delay: ", ";\n  }\n"], ["\n  display: inline-flex;\n  position: fixed;\n  top: 0;\n  left: ", ";\n  transform: translate3d(0, -100%, 0);\n  user-select: none;\n  pointer-events: none;\n  z-index: 99999;\n\n  animation-name: ", ";\n  animation-duration: ", ";\n  animation-timing-function: linear;\n  animation-iteration-count: ", ";\n  animation-play-state: running;\n\n  &:nth-child(5n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(2n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 10) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(7n + 2) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(4n + 5) {\n    animation-delay: ", ";\n  }\n\n  &:nth-child(3n + 7) {\n    animation-delay: ", ";\n  }\n"])), function (_a) {
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
var templateObject_1$13, templateObject_2$z;

var tags = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
};
var scales$6 = {
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

var _a$6;
var style = (_a$6 = {},
    _a$6[scales$6.SM] = {
        fontSize: "12px",
        fontSizeLg: "12px",
    },
    _a$6[scales$6.LD] = {
        fontSize: "14px",
        fontSizeLg: "16px",
    },
    _a$6[scales$6.MD] = {
        fontSize: "16px",
        fontSizeLg: "18px",
    },
    _a$6[scales$6.LG] = {
        fontSize: "24px",
        fontSizeLg: "24px",
    },
    _a$6[scales$6.LGG] = {
        fontSize: "18px",
        fontSizeLg: "34px",
    },
    _a$6[scales$6.LX] = {
        fontSize: "24px",
        fontSizeLg: "32px",
    },
    _a$6[scales$6.XL] = {
        fontSize: "32px",
        fontSizeLg: "40px",
    },
    _a$6[scales$6.XLD] = {
        fontSize: "32px",
        fontSizeLg: "48px",
    },
    _a$6[scales$6.XXL] = {
        fontSize: "48px",
        fontSizeLg: "64px",
    },
    _a$6[scales$6.XXLD] = {
        fontSize: "54px",
        fontSizeLg: "80px",
    },
    _a$6[scales$6.XXXL] = {
        fontSize: "44px",
        fontSizeLg: "90px",
    },
    _a$6);
var Heading = styled__default["default"](Text).attrs({ bold: true })(templateObject_1$12 || (templateObject_1$12 = tslib.__makeTemplateObject(["\n  font-size: ", ";\n  font-weight: 600;\n  line-height: 1.1;\n\n  ", " {\n    font-size: ", ";\n  }\n"], ["\n  font-size: ", ";\n  font-weight: 600;\n  line-height: 1.1;\n\n  ", " {\n    font-size: ", ";\n  }\n"])), function (_a) {
    var scale = _a.scale;
    return style[scale || scales$6.MD].fontSize;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.lg;
}, function (_a) {
    var scale = _a.scale;
    return style[scale || scales$6.MD].fontSizeLg;
});
Heading.defaultProps = {
    as: tags.H2,
};
var templateObject_1$12;

var observerOptions = {
    root: null,
    rootMargin: "200px",
    threshold: 0,
};

var StyledWrapper = styled__default["default"].div(templateObject_1$11 || (templateObject_1$11 = tslib.__makeTemplateObject(["\n  max-height: ", "px;\n  max-width: ", "px;\n  position: relative;\n  width: 100%;\n\n  &:after {\n    content: \"\";\n    display: block;\n    padding-top: ", "%;\n  }\n\n  ", "\n"], ["\n  max-height: ", "px;\n  max-width: ", "px;\n  position: relative;\n  width: 100%;\n\n  &:after {\n    content: \"\";\n    display: block;\n    padding-top: ", "%;\n  }\n\n  ", "\n"])), function (_a) {
    var $height = _a.$height;
    return $height;
}, function (_a) {
    var $width = _a.$width;
    return $width;
}, function (_a) {
    var $width = _a.$width, $height = _a.$height;
    return ($height / $width) * 100;
}, styledSystem.space);
var Wrapper$6 = React.forwardRef(function (_a, ref) {
    var width = _a.width, height = _a.height, props = tslib.__rest(_a, ["width", "height"]);
    return jsxRuntime.jsx(StyledWrapper, tslib.__assign({ ref: ref, "$width": width, "$height": height }, props), void 0);
});
var templateObject_1$11;

styled__default["default"](Wrapper$6)(templateObject_1$10 || (templateObject_1$10 = tslib.__makeTemplateObject(["\n  background-repeat: no-repeat;\n  background-size: contain;\n"], ["\n  background-repeat: no-repeat;\n  background-size: contain;\n"])));
var templateObject_1$10;

var StyledImage = styled__default["default"].img(templateObject_1$$ || (templateObject_1$$ = tslib.__makeTemplateObject(["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  -webkit-user-drag: ", ";\n"], ["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  -webkit-user-drag: ", ";\n"])), function (_a) {
    var userDrag = _a.userDrag;
    return userDrag || '';
});
var Placeholder = styled__default["default"].div(templateObject_2$y || (templateObject_2$y = tslib.__makeTemplateObject(["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n"], ["\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n"])));
var Image = function (_a) {
    var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, props = tslib.__rest(_a, ["src", "alt", "width", "height"]);
    var imgRef = React.useRef(null);
    var _b = tslib.__read(React.useState(false), 2), isLoaded = _b[0], setIsLoaded = _b[1];
    React.useEffect(function () {
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
    return (jsxRuntime.jsx(Wrapper$6, tslib.__assign({ ref: imgRef, height: height, width: width }, props, { children: isLoaded ? jsxRuntime.jsx(StyledImage, { src: src, alt: alt }, void 0) : jsxRuntime.jsx(Placeholder, {}, void 0) }), void 0));
};
var templateObject_1$$, templateObject_2$y;

var BAD_SRCS$1 = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
var Logo$1 = function (_a) {
    var srcs = _a.srcs, alt = _a.alt, rest = tslib.__rest(_a, ["srcs", "alt"]);
    var _b = tslib.__read(React.useState(0), 2), refresh = _b[1];
    var src = srcs.find(function (s) { return !BAD_SRCS$1[s]; });
    if (src) {
        return (jsxRuntime.jsx(Image, tslib.__assign({}, rest, { alt: alt, src: src, onError: function () {
                console.debug("" + src);
                if (src)
                    BAD_SRCS$1[src] = true;
                refresh(function (i) { return i + 1; });
            } }), void 0));
    }
    return jsxRuntime.jsx(Icon$5, tslib.__assign({}, rest), void 0);
};

var TokenImage = styled__default["default"](Logo$1)(templateObject_1$_ || (templateObject_1$_ = tslib.__makeTemplateObject(["\n  &:before {\n    border-radius: 50%;\n    /* border: 1px solid rgba(0, 0, 0, 0.25); */\n    box-shadow: ", ";\n    transform: scale(0.92);\n    content: \"\";\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 7;\n  }\n"], ["\n  &:before {\n    border-radius: 50%;\n    /* border: 1px solid rgba(0, 0, 0, 0.25); */\n    box-shadow: ", ";\n    transform: scale(0.92);\n    content: \"\";\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 7;\n  }\n"])), function (_a) {
    var shadow = _a.shadow;
    return shadow ? '0px 0px 5px 0px rgba(25, 95, 81, 0.5)' : 'none';
});
var templateObject_1$_;

var variants$3 = {
    DEFAULT: "default",
    INVERTED: "inverted",
    BINARY: "binary",
};

var _a$5, _b$2;
styled__default["default"](TokenImage)(templateObject_1$Z || (templateObject_1$Z = tslib.__makeTemplateObject(["\n  position: absolute;\n  border-radius: 50%;\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"], ["\n  position: absolute;\n  border-radius: 50%;\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"])), function (_a) {
    var variant = _a.variant;
    return variant === variants$3.DEFAULT ? "82%" : "70%";
}, styledSystem.variant({
    variants: (_a$5 = {},
        _a$5[variants$3.DEFAULT] = {
            width: '82%',
            bottom: "auto",
            left: 0,
            right: "auto",
            top: 0,
            zIndex: 5,
        },
        _a$5[variants$3.INVERTED] = {
            width: '70%',
            bottom: 0,
            left: "auto",
            right: 0,
            top: "auto",
            zIndex: 6,
        },
        _a$5[variants$3.BINARY] = {
            width: '100%',
            height: '100%',
            bottom: 0,
            left: "auto",
            // margin: "auto",
            right: 0,
            top: "auto",
            zIndex: 5,
        },
        _a$5),
}));
styled__default["default"](TokenImage)(templateObject_2$x || (templateObject_2$x = tslib.__makeTemplateObject(["\n  position: absolute;\n  transform: scale(0.95);\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"], ["\n  position: absolute;\n  transform: scale(0.95);\n  /* width: ", "; // 92, 82 are arbitrary numbers to fit the variant */\n\n  ", "\n"])), function (_a) {
    var variant = _a.variant;
    return variant === variants$3.DEFAULT ? "82%" : "70%";
}, styledSystem.variant({
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
var templateObject_1$Z, templateObject_2$x;

var img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAABNCAYAAACYAek5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkRBNTcyODE2QzAxMUVDQTQ0REJGMEY4MEZBRDUyQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkRBNTcyOTE2QzAxMUVDQTQ0REJGMEY4MEZBRDUyQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyREE1NzI2MTZDMDExRUNBNDREQkYwRjgwRkFENTJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYyREE1NzI3MTZDMDExRUNBNDREQkYwRjgwRkFENTJBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PCYB/wAACXxJREFUeNrsnWmME+cZxx+Pvbu2l+VYWKDlaCBtqVBvCUJa2qolBSqVEmijRgqHml6qlFRRlQPoFeVDQ1KpyodKfOqHEIiqqgmHWgmkJh8aIiBEahMIyxIWFnbZ03v4HNvjGff5j8fbLQG6p9cT/j/0145tscfr+fl533femQkca9snFWaWZrXmU14+qVmimauZoQkLIdVLVpPS9GvaNRc1FzQtmtOaeCV/mVCFfs69mi2aDZpPawzuB8SnhL3M06zQ3DfiNUdzTnNcc0hz0s8CL9c8pNmpuZvvO7kDQGH6rJcnNK2a/ZoDmstT8QMDU9CF/oxmj+YBTfDGF22nIGkrKVkrI9mCKTlN3s5KQZ93irbG4W5AqtfQgKEJSsgISW0wLHWhiISRmqjU1zRI0LhpTcRO/RfN7zRnq7UCf1zze81mfDCMfCGdT8igGZNEblBMK829gPgWFBik4FhuARLdp0cSqamXmXVzZE5kntTXzhxZmR/UfF9zVPO45lK1CBzR7NI8pakrP5krZGXA7JX+TI9bZQm5E0CBQnpSHW51nhudL42RBbrtzs0GvAK3UfO85ln8l+nsQq/RHPTGu8N/QHfymltxi/qPECIqcZMsbFjqVugRYFyMeaJTla7A+CR5TPOcpqZUcU3piF+WoWw/3y1CbmDA7HMzOzxXFs9a7lZnr/D90+u9vqApVkLgqOYlzdbymKA72S7dqXYpcgKKkNuCAhfXcfPCGYvdimwEDBTAP2i+otmmyYzl+431eGyj5h9leTE5db73belKXqW8hIwSuNKlw0y4A4c8tnhuNU6VwIs0b0hpUYYO0q9LS+wdd7KKEDJ24A4cgkse93qOLZpsgZs0r2lWosvcOnBex7ut+knCSSpCJlaNi65LcMpbA7FS87rn3KQIjDHv3zQrsNjiYuxdGTJjbHlCJnNsrE7BLTgmpfMD/u65NyGBMdv8sma1Zeekpe/fI/vshJBJBG7BMbimrPLcC0xE4F9qNmPVCT4dsoUMW5mQKQSOlSqxhYdY9PGr8Qq8VvM0+uWX+s+Vlo0RQiogsek6542Jf+u5OCaBsVzkRU3wykCzlvYkW5WQinankwL3pHRC0Iuek6MW+BnNchyr4soqQqYHuAcHpbRi65nRCoyrZPw8lY9LV+IqW5GQaQQOwkU46bn5fwV+3inaobbBFp6MQMg0AwfhIpyU0hlMtxX4Hs2mTrWeK6wIqQ7gYmepN7xJSteTu6XAuzGN3fvfpV2EkCoATnqHcffcSuBlMLwjfoVdZ0KqsCsNN70qvOxmAu9I55NGnLPOhFQlcBOOwtUbBQ44jv1wd2nKmhBSpcBRuCreEsuywF+yitZSHvMlpLqBo3AVzo4U+DsDmR62DiE+wHN187DAViH/3f5ML1uGEB8AV9XZrWWBZ+ec7HJe+pUQfwBX4axuzoHAq+Nmf4DNQoiPxsJmDM6uMrKW+fl4boAtQoiPcO9yks98wUiZibW83Qkh/gLOprPJLxt5J7uCzUGI/4C7huXkm9gUhPgP27HmG3k7F2FTEOI/rKJVbxScfC2bghA/dqFzIcMu2gabghBfdqEDRlF4TyNC/AguAm9Ydp4tQYgfBbYtMQoFiy1BiF8FtmyLfWhCfClwoWjYdsFmUxDiP9TdgmEVeMMjQvwI3DUsK897hRLiR4HVXSOXy7ayKQjxH3DXGEz2n2BTEOI/BpMDbxpmLvNWJsvTCQnxE3DWzKVPYxnlqXhykFdyJ8RHeM6eNn6y4cl4PDnEcTAhvhJ4qFXdHTKCRkgSqaG/ZvO8mRkhfgCuJlLxV+Bu+Uyko7FBXheaED9QcrV4FNuuwDvWPXJyYCjGu3kT4gM8V08OC1xfO1OyOfNPg3HeWoWQqpY3HnNd/dm39hSHBfY40NnXzhMbCKliuno74OiB8uNhgR9e/4sr6Uzq8GCCVZiQagRups3UIbj6AYHrgmF82dve1VZU2FqEVBFwEm7CUc9VubELLTvWPXpG+9dHu2PX2WKEVBFwUt08snPdo2+PfP5/BK6vbcCXXdd7rlk5HhcmpCqAi3BSN3dHS47eXGDwg28+dsFxnBdar7UIu9KETH/XGS7CSbh54+sfEDgciuLL06lMsvV6Dw8NEzKdaOUVuAgnPTdvLzD46cZduErH9s7eDpvHhgmZHuBeZ287Lnm13XNydAIbAcNdnaWbv25tb5FkOsHWJKSCwDm4p/wGLsLJUQsMsDpL2at970MX284LzxkmpDLANTgH9/Ths56LYxMYeMu1ttl24Y2LV94TM8fr3xEylcAxuKbO4Uo528pLJscl8Ijx8Ka8lT/b3HpW0pkkW5mQKSCdSQkcg2v68Nu3GveOSWD0vXHSv25uLBSs5ubL59wF1YSQyQMTVs2Xzwocg2tw7lbj3jEJDHDi8I/WP96pm19zHPutS1cvSEd3G48TEzJB4BBcev9qs4557TNwDK7BudEw6luL1gRr5ccbnujTzW9oXuns7dBy/y6Wd/FdIGQcwB04BJeUVzVfh2NwbbSM6d7AIaNGx8RPYTr6Ac2eVCZZOHfxX+7BZsfhmYiEjAa4AmfgDhyCS5rvwS04NhYCx9r2jeuX6E62y6ETL63Rzf2aT9TVhmXJR+6Sxlnz+A4Rcgswf9Te1SbeuQbva3ZsWbv91MKGJeP6fuMWGKTzCdn/2h9xbtOTml2aSCQclY82LZbG2U0SCAT4jhGOc3WcOzDUJ519HWJm3YlljDufQ3aseyR7u+O8Uyqw2x0oOtKTapfDJw7erQ/3araia15XWydNcxbKvMb5UltTx3eR3JFj3Nhgr5u8lXN18ca6u+5f+1DrghlLZDQzzVMqcJlcwZTriSty/PThlfpwt+ZBDJvx2oxog8yeOVdmNcyWaLielZl8aCstVlHFk0MylOjH+Lb8Esa5f0aB23DP/e8tmrlM6kKRSfmZkybw8KdOISNdyWty7NSrH9OHP9Ts1Cwtvx40glKvQkPkSDgiGDuHQjXu88FgSAzDmPCnEiFTAXqbmICy7YLYjo1jtu5Y1syarrhY5ITnR4DT/w5q9m9cs/XawhlLJVITndTfadIFLpO3sxJLd8uRN19GucVk1ybNBs3n4DF3B/IhBPa+ozmuOfLVL64/3RidL3OjC6Q2ODXDyMDmfUsq/UfikgKrPJHR3b5L0+Q9P0tTrwlzXyDVOKzV4DAqViaif4x1EW2a8564Z7znK0ZoGhoBf+DrXgghE+A/AgwAaq5/MncNmMsAAAAASUVORK5CYII=";

styled__default["default"](Flex)(templateObject_1$Y || (templateObject_1$Y = tslib.__makeTemplateObject(["\n  /* background: url(", ") no-repeat; */\n  background: ", ";\n  border-radius: 24px;\n  background-size: 100%;\n  width: 140px;\n  height: 48px;\n  padding: 0 5px;\n"], ["\n  /* background: url(", ") no-repeat; */\n  background: ", ";\n  border-radius: 24px;\n  background-size: 100%;\n  width: 140px;\n  height: 48px;\n  padding: 0 5px;\n"])), img$3, function (_a) {
    var theme = _a.theme;
    return theme.colors.primary;
});
styled__default["default"](Input$3)(templateObject_2$w || (templateObject_2$w = tslib.__makeTemplateObject(["\n  width: 50px;\n  padding: 5px;\n  min-width: 50px;\n  box-shadow: none;\n  text-align: center;\n  font-weight: bold;\n  font-size: 20px;\n  color: ", ";\n  background: transparent;\n"], ["\n  width: 50px;\n  padding: 5px;\n  min-width: 50px;\n  box-shadow: none;\n  text-align: center;\n  font-weight: bold;\n  font-size: 20px;\n  color: ", ";\n  background: transparent;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.white;
});
var templateObject_1$Y, templateObject_2$w;

var GridLayout = styled__default["default"](Grid)(templateObject_1$X || (templateObject_1$X = tslib.__makeTemplateObject(["\n  grid-template-columns: repeat(6, 1fr);\n  grid-gap: 16px;\n  ", " {\n    grid-template-columns: repeat(8, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 32px;\n  }\n"], ["\n  grid-template-columns: repeat(6, 1fr);\n  grid-gap: 16px;\n  ", " {\n    grid-template-columns: repeat(8, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 24px;\n  }\n  ", " {\n    grid-template-columns: repeat(12, 1fr);\n    grid-gap: 32px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.sm;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.lg;
});
var templateObject_1$X;

styled__default["default"](GridLayout)(templateObject_1$W || (templateObject_1$W = tslib.__makeTemplateObject(["\n  & > div {\n    grid-column: span 6;\n    ", " {\n      grid-column: span 4;\n    }\n  }\n"], ["\n  & > div {\n    grid-column: span 6;\n    ", " {\n      grid-column: span 4;\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.sm;
});
var templateObject_1$W;

var StyledLink = styled__default["default"](Text)(templateObject_1$V || (templateObject_1$V = tslib.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  &:hover {\n    text-decoration: underline;\n  }\n"])));
var Link = function (_a) {
    var external = _a.external, props = tslib.__rest(_a, ["external"]);
    var internalProps = external ? getExternalLinkProps() : {};
    return jsxRuntime.jsx(StyledLink, tslib.__assign({ as: "a" }, internalProps, props), void 0);
};
Link.defaultProps = {
    color: "primary",
};
var templateObject_1$V;

var LinkExternal = function (_a) {
    var children = _a.children, props = tslib.__rest(_a, ["children"]);
    return (jsxRuntime.jsxs(Link, tslib.__assign({ external: true }, props, { children: [children, jsxRuntime.jsx(Icon$2, { color: props.color ? props.color : "primary", ml: "4px" }, void 0)] }), void 0));
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

var Icons = {
    warning: Icon,
    danger: Icon$f,
};
var MessageContainer$1 = styled__default["default"].div(templateObject_1$U || (templateObject_1$U = tslib.__makeTemplateObject(["\n  display: flex;\n  background-color: gray;\n  padding: 16px;\n  border-radius: 16px;\n  border: solid 1px;\n\n  ", "\n  ", "\n"], ["\n  display: flex;\n  background-color: gray;\n  padding: 16px;\n  border-radius: 16px;\n  border: solid 1px;\n\n  ", "\n  ", "\n"])), styledSystem.space, styledSystem.variant({
    variants: variants$2,
}));
var Message = function (_a) {
    var children = _a.children, variant = _a.variant, icon = _a.icon, props = tslib.__rest(_a, ["children", "variant", "icon"]);
    var Icon = Icons[variant];
    return (jsxRuntime.jsxs(MessageContainer$1, tslib.__assign({ variant: variant }, props, { children: [jsxRuntime.jsx(Box, tslib.__assign({ mr: "12px" }, { children: icon !== null && icon !== void 0 ? icon : jsxRuntime.jsx(Icon, { color: variants$2[variant].borderColor, width: "24px" }, void 0) }), void 0), children] }), void 0));
};
var templateObject_1$U;

var NotificationDotRoot = styled__default["default"].span(templateObject_1$T || (templateObject_1$T = tslib.__makeTemplateObject(["\n  display: inline-flex;\n  position: relative;\n"], ["\n  display: inline-flex;\n  position: relative;\n"])));
var Dot = styled__default["default"].span(templateObject_2$v || (templateObject_2$v = tslib.__makeTemplateObject(["\n  display: ", ";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  pointer-events: none;\n  border: 2px solid ", ";\n  border-radius: 50%;\n  background-color: ", ";\n"], ["\n  display: ", ";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  pointer-events: none;\n  border: 2px solid ", ";\n  border-radius: 50%;\n  background-color: ", ";\n"])), function (_a) {
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
    var _b = _a.show, show = _b === void 0 ? false : _b, children = _a.children, props = tslib.__rest(_a, ["show", "children"]);
    return (jsxRuntime.jsxs(NotificationDotRoot, { children: [React.Children.map(children, function (child) { return React.cloneElement(child, props); }), jsxRuntime.jsx(Dot, { show: show }, void 0)] }, void 0));
};
var templateObject_1$T, templateObject_2$v;

var Overlay = styled__default["default"].div.attrs({ role: "presentation" })(templateObject_1$S || (templateObject_1$S = tslib.__makeTemplateObject(["\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background-color: ", ";\n  transition: opacity 0.4s;\n  opacity: ", ";\n  z-index: ", ";\n  pointer-events: ", ";\n"], ["\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background-color: ", ";\n  transition: opacity 0.4s;\n  opacity: ", ";\n  z-index: ", ";\n  pointer-events: ", ";\n"])), function (_a) {
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
var templateObject_1$S;

var scales$5 = {
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
        var _b = _a.scale, scale = _b === void 0 ? scales$5.MD : _b;
        return scaleKeyValues$1[scale][property];
    };
};
styled__default["default"].div(templateObject_1$R || (templateObject_1$R = tslib.__makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n\n  &:label:before {\n    content: none;\n  }\n\n  .pancakes {\n    transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  }\n\n  .pancake {\n    background: #e27c31;\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    position: absolute;\n    transition: 0.4s ease;\n    top: 2px;\n    left: 4px;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n  }\n\n  .pancake:nth-child(1) {\n    background: ", ";\n    box-shadow: 0 ", " 0 ", "\n      ", ";\n  }\n\n  .pancake:nth-child(2) {\n    left: 0;\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3) {\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3):before,\n  .pancake:nth-child(3):after {\n    content: \"\";\n    position: absolute;\n    background: #ef8927;\n    border-radius: 20px;\n    width: 50%;\n    height: 20%;\n  }\n\n  .pancake:nth-child(3):before {\n    top: ", ";\n    left: ", ";\n  }\n\n  .pancake:nth-child(3):after {\n    top: ", ";\n    right: ", ";\n  }\n\n  .butter {\n    width: ", ";\n    height: ", ";\n    background: #fbdb60;\n    top: ", ";\n    left: ", ";\n    position: absolute;\n    border-radius: ", ";\n    box-shadow: 0 ", " 0 ", " #d67823;\n    transform: scale(0);\n    transition: 0.2s ease;\n  }\n"], ["\n  position: relative;\n  display: inline-block;\n\n  &:label:before {\n    content: none;\n  }\n\n  .pancakes {\n    transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  }\n\n  .pancake {\n    background: #e27c31;\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    position: absolute;\n    transition: 0.4s ease;\n    top: 2px;\n    left: 4px;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n  }\n\n  .pancake:nth-child(1) {\n    background: ", ";\n    box-shadow: 0 ", " 0 ", "\n      ", ";\n  }\n\n  .pancake:nth-child(2) {\n    left: 0;\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3) {\n    top: ", ";\n    transform: scale(0);\n    transition: 0.2s ease 0.2s;\n  }\n\n  .pancake:nth-child(3):before,\n  .pancake:nth-child(3):after {\n    content: \"\";\n    position: absolute;\n    background: #ef8927;\n    border-radius: 20px;\n    width: 50%;\n    height: 20%;\n  }\n\n  .pancake:nth-child(3):before {\n    top: ", ";\n    left: ", ";\n  }\n\n  .pancake:nth-child(3):after {\n    top: ", ";\n    right: ", ";\n  }\n\n  .butter {\n    width: ", ";\n    height: ", ";\n    background: #fbdb60;\n    top: ", ";\n    left: ", ";\n    position: absolute;\n    border-radius: ", ";\n    box-shadow: 0 ", " 0 ", " #d67823;\n    transform: scale(0);\n    transition: 0.2s ease;\n  }\n"])), getScale$2("pancakeSize"), getScale$2("pancakeSize"), getScale$2("pancakeThickness"), getScale$2("pancakeThickness"), function (_a) {
    var theme = _a.theme;
    return theme.pancakeToggle.handleBackground;
}, getScale$2("pancakeThickness"), getScale$2("pancakeThickness"), function (_a) {
    var theme = _a.theme;
    return theme.pancakeToggle.handleShadow;
}, getScale$2("pancakeTwoOffset"), getScale$2("pancakeThreeOffset"), getScale$2("butterSmearOneTop"), getScale$2("butterSmearOneLeft"), getScale$2("butterSmearTwoTop"), getScale$2("butterSmearTwoRight"), getScale$2("butterWidth"), getScale$2("butterHeight"), getScale$2("butterTop"), getScale$2("butterLeft"), getScale$2("butterRadius"), getScale$2("butterThickness"), getScale$2("butterThickness"));
styled__default["default"].input(templateObject_2$u || (templateObject_2$u = tslib.__makeTemplateObject(["\n  height: 40px;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  width: 40px;\n\n  &:focus + label {\n    box-shadow: ", ";\n  }\n\n  &:checked + label .pancakes {\n    transform: translateX(", ");\n  }\n\n  &:checked + label .pancake:nth-child(1) {\n    background: #e27c31;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(2) {\n    transform: scale(1);\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(3) {\n    transform: scale(1);\n    transition-delay: 0.4s;\n  }\n\n  &:checked + label .butter {\n    transform: scale(1);\n    transition-delay: 0.6s;\n  }\n"], ["\n  height: 40px;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  width: 40px;\n\n  &:focus + label {\n    box-shadow: ", ";\n  }\n\n  &:checked + label .pancakes {\n    transform: translateX(", ");\n  }\n\n  &:checked + label .pancake:nth-child(1) {\n    background: #e27c31;\n    box-shadow: 0 ", " 0 ", " #fbbe7c;\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(2) {\n    transform: scale(1);\n    transition-delay: 0.2s;\n  }\n\n  &:checked + label .pancake:nth-child(3) {\n    transform: scale(1);\n    transition-delay: 0.4s;\n  }\n\n  &:checked + label .butter {\n    transform: scale(1);\n    transition-delay: 0.6s;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.shadows.focus;
}, getScale$2("travelDistance"), getScale$2("pancakeThickness"), getScale$2("pancakeThickness"));
styled__default["default"].label(templateObject_3$l || (templateObject_3$l = tslib.__makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background: ", ";\n  box-shadow: ", ";\n  display: inline-block;\n  border-radius: 50px;\n  position: relative;\n  transition: all 0.3s ease;\n  transform-origin: 20% center;\n  cursor: pointer;\n"], ["\n  width: ", ";\n  height: ", ";\n  background: ", ";\n  box-shadow: ", ";\n  display: inline-block;\n  border-radius: 50px;\n  position: relative;\n  transition: all 0.3s ease;\n  transform-origin: 20% center;\n  cursor: pointer;\n"])), getScale$2("toggleWidth"), getScale$2("toggleHeight"), function (_a) {
    var theme = _a.theme, checked = _a.checked;
    return theme.colors[checked ? "success" : "input"];
}, function (_a) {
    var theme = _a.theme;
    return theme.shadows.inset;
});
var templateObject_1$R, templateObject_2$u, templateObject_3$l;

var variants$1 = {
    ROUND: "round",
    FLAT: "flat",
};
var scales$4 = {
    MD: "md",
    SM: "sm",
};

var _a$4, _b$1;
var styleVariants$1 = (_a$4 = {},
    _a$4[variants$1.ROUND] = {
        borderRadius: "32px",
    },
    _a$4[variants$1.FLAT] = {
        borderRadius: 0,
    },
    _a$4);
var styleScales = (_b$1 = {},
    _b$1[scales$4.MD] = {
        height: "16px",
    },
    _b$1[scales$4.SM] = {
        height: "8px",
    },
    _b$1);

var Bar = styled__default["default"].div(templateObject_1$Q || (templateObject_1$Q = tslib.__makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: ", ";\n  height: 100%;\n  transition: width 200ms ease;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: ", ";\n  height: 100%;\n  transition: width 200ms ease;\n"])), function (props) { return (props.primary ? props.theme.colors.secondary : props.theme.colors.secondary + "80"); });
Bar.defaultProps = {
    primary: false,
};
styled__default["default"].div(templateObject_2$t || (templateObject_2$t = tslib.__makeTemplateObject(["\n  position: relative;\n  background-color: ", ";\n  box-shadow: ", ";\n  overflow: hidden;\n\n  ", " {\n    border-top-left-radius: ", ";\n    border-bottom-left-radius: ", ";\n  }\n\n  ", "\n  ", "\n  ", "\n"], ["\n  position: relative;\n  background-color: ", ";\n  box-shadow: ", ";\n  overflow: hidden;\n\n  ", " {\n    border-top-left-radius: ", ";\n    border-bottom-left-radius: ", ";\n  }\n\n  ", "\n  ", "\n  ", "\n"])), function (_a) {
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
}, styledSystem.variant({
    variants: styleVariants$1,
}), styledSystem.variant({
    prop: "scale",
    variants: styleScales,
}), styledSystem.space);
var templateObject_1$Q, templateObject_2$t;

styled__default["default"].div(templateObject_1$P || (templateObject_1$P = tslib.__makeTemplateObject(["\n  display: flex;\n  z-index: 2;\n  top: -65%;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  transition: left 200ms ease-out;\n"], ["\n  display: flex;\n  z-index: 2;\n  top: -65%;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  transition: left 200ms ease-out;\n"])));
var templateObject_1$P;

var scales$3 = {
    SM: "sm",
    MD: "md",
};

var getScale$1 = function (_a) {
    var scale = _a.scale;
    switch (scale) {
        case scales$3.SM:
            return "24px";
        case scales$3.MD:
        default:
            return "32px";
    }
};
var getCheckedScale = function (_a) {
    var scale = _a.scale;
    switch (scale) {
        case scales$3.SM:
            return "12px";
        case scales$3.MD:
        default:
            return "20px";
    }
};
var Radio = styled__default["default"].input.attrs({ type: "radio" })(templateObject_1$O || (templateObject_1$O = tslib.__makeTemplateObject(["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 50%;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    border-radius: 50%;\n    content: \"\";\n    height: ", ";\n    left: 6px;\n    position: absolute;\n    top: 6px;\n    width: ", ";\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      background-color: ", ";\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n  ", "\n"], ["\n  appearance: none;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  height: ", ";\n  width: ", ";\n  vertical-align: middle;\n  transition: background-color 0.2s ease-in-out;\n  border: 0;\n  border-radius: 50%;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  &:after {\n    border-radius: 50%;\n    content: \"\";\n    height: ", ";\n    left: 6px;\n    position: absolute;\n    top: 6px;\n    width: ", ";\n  }\n\n  &:hover:not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: ", ";\n  }\n\n  &:checked {\n    background-color: ", ";\n    &:after {\n      background-color: ", ";\n    }\n  }\n\n  &:disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n  ", "\n"])), getScale$1, getScale$1, function (_a) {
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
}, styledSystem.space);
Radio.defaultProps = {
    scale: scales$3.MD,
    m: 0,
};
var templateObject_1$O;

var img$2 = "data:image/svg+xml,%3csvg width='24' height='32' viewBox='0 0 28 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='1' y='19' width='17' height='11' fill='%231FC7D4'/%3e%3cpath d='M9.507 24.706C8.14635 26.0666 9.73795 28.2313 11.7555 30.2489C13.7731 32.2665 15.9378 33.8581 17.2984 32.4974C18.6591 31.1368 17.9685 28.0711 15.9509 26.0535C13.9333 24.0359 10.8676 23.3453 9.507 24.706Z' fill='%231FC7D4'/%3e%3cpath d='M15.507 22.706C14.1463 24.0666 15.7379 26.2313 17.7555 28.2489C19.7731 30.2665 21.9378 31.8581 23.2984 30.4974C24.6591 29.1368 23.9685 26.0711 21.9509 24.0535C19.9333 22.0359 16.8676 21.3453 15.507 22.706Z' fill='%231FC7D4'/%3e%3cg filter='url(%23filter0_d)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.146 6.75159C14.2105 7.10896 14.2703 7.48131 14.3281 7.86164C14.2189 7.85865 14.1095 7.85714 14 7.85714C13.3803 7.85714 12.7648 7.90539 12.159 7.99779C11.879 7.41458 11.5547 6.82246 11.1872 6.23145C8.69897 2.22947 6.53826 1.98679 4.67882 2.98366C2.81938 3.98052 2.85628 6.67644 5.26696 9.40538C5.58076 9.76061 5.90097 10.1398 6.2247 10.5286C3.69013 12.4659 2 15.2644 2 18.2695C2 23.8292 7.78518 25 14 25C20.2148 25 26 23.8292 26 18.2695C26 14.8658 23.8318 11.7272 20.7243 9.80476C20.9022 8.86044 21 7.83019 21 6.75159C21 2.19612 19.2549 1 17.1022 1C14.9495 1 13.5261 3.31847 14.146 6.75159Z' fill='url(%23paint0_linear_bunnyhead_main)'/%3e%3c/g%3e%3cg transform='translate(2)'%3e%3cpath d='M12.7284 16.4446C12.796 17.3149 12.4446 19.0556 10.498 19.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M12.7457 16.4446C12.6781 17.3149 13.0296 19.0556 14.9761 19.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M9 14.5C9 15.6046 8.55228 16 8 16C7.44772 16 7 15.6046 7 14.5C7 13.3954 7.44772 13 8 13C8.55228 13 9 13.3954 9 14.5Z' fill='%23452A7A'/%3e%3cpath d='M18 14.5C18 15.6046 17.5523 16 17 16C16.4477 16 16 15.6046 16 14.5C16 13.3954 16.4477 13 17 13C17.5523 13 18 13.3954 18 14.5Z' fill='%23452A7A'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3e%3cfeOffset dy='1'/%3e%3cfeGaussianBlur stdDeviation='1'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_bunnyhead_main' x1='14' y1='1' x2='14' y2='25' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2353DEE9'/%3e%3cstop offset='1' stop-color='%231FC7D4'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3csvg width='24' height='32' viewBox='0 0 28 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='1' y='19' width='17' height='11' fill='%231FC7D4'/%3e%3cpath d='M9.507 24.706C8.14635 26.0666 9.73795 28.2313 11.7555 30.2489C13.7731 32.2665 15.9378 33.8581 17.2984 32.4974C18.6591 31.1368 17.9685 28.0711 15.9509 26.0535C13.9333 24.0359 10.8676 23.3453 9.507 24.706Z' fill='%231FC7D4'/%3e%3cpath d='M15.507 22.706C14.1463 24.0666 15.7379 26.2313 17.7555 28.2489C19.7731 30.2665 21.9378 31.8581 23.2984 30.4974C24.6591 29.1368 23.9685 26.0711 21.9509 24.0535C19.9333 22.0359 16.8676 21.3453 15.507 22.706Z' fill='%231FC7D4'/%3e%3cg filter='url(%23filter0_d)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.146 6.75159C14.2105 7.10896 14.2703 7.48131 14.3281 7.86164C14.2189 7.85865 14.1095 7.85714 14 7.85714C13.3803 7.85714 12.7648 7.90539 12.159 7.99779C11.879 7.41458 11.5547 6.82246 11.1872 6.23145C8.69897 2.22947 6.53826 1.98679 4.67882 2.98366C2.81938 3.98052 2.85628 6.67644 5.26696 9.40538C5.58076 9.76061 5.90097 10.1398 6.2247 10.5286C3.69013 12.4659 2 15.2644 2 18.2695C2 23.8292 7.78518 25 14 25C20.2148 25 26 23.8292 26 18.2695C26 14.8658 23.8318 11.7272 20.7243 9.80476C20.9022 8.86044 21 7.83019 21 6.75159C21 2.19612 19.2549 1 17.1022 1C14.9495 1 13.5261 3.31847 14.146 6.75159Z' fill='url(%23paint0_linear_bunnyhead_max)'/%3e%3c/g%3e%3cpath d='M11.5047 16.0634C10.9435 14.4456 8.79685 14.4456 8.08131 16.0635' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M20.8894 16.0634C20.3283 14.4456 18.1816 14.4456 17.4661 16.0635' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M14.7284 17.4446C14.796 18.3149 14.4446 20.0556 12.498 20.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M14.7457 17.4446C14.6781 18.3149 15.0296 20.0556 16.9761 20.0556' stroke='%23452A7A' stroke-linecap='round'/%3e%3cpath d='M13.4505 20.0787C13.4505 21.5097 15.955 21.5097 15.955 20.0787' stroke='%23452A7A' stroke-linecap='round'/%3e%3cdefs%3e%3cfilter id='filter0_d' x='0' y='0' width='28' height='28' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3e%3cfeOffset dy='1'/%3e%3cfeGaussianBlur stdDeviation='1'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_bunnyhead_max' x1='14' y1='1' x2='14' y2='25' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2353DEE9'/%3e%3cstop offset='1' stop-color='%231FC7D4'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAhCAYAAACr8emlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQjNGQjBGMjMyMUQxMUVDQTQyQUNEREI5RkU3RTMxMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQjNGQjBGMzMyMUQxMUVDQTQyQUNEREI5RkU3RTMxMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNCM0ZCMEYwMzIxRDExRUNBNDJBQ0REQjlGRTdFMzEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNCM0ZCMEYxMzIxRDExRUNBNDJBQ0REQjlGRTdFMzEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ANTkKgAADXxJREFUeNqsWHlsHOd9fXPs7MzeB3d5n6IoUZRk67IsyWITRZLTRE2NGK5dAzaaNkhQ5I+0aJ20RVq4QNCgthEYbRK3aGsgbpLCdQC7curUiq1Akm0xOmxJpkWJIiXe55J7HzM7R9+slkosO2jcZIAP5OzMft/73u/93u/3rXBuqYJf8fLUh1M27YpfFp1tCW/tQdl0xPmS6ZcEQbEdyFXbkU3b0as2sobtmJbjOIIgQBbwkS/5V3hH4ghz+CwHhgPH0WQxnNTkKj8TOQKaLCR7Qp7E2gYqNl/iP5WqM8fN5IpVxyia1nLFcgouRo8owPkNAoxwsiiZKZCB/oBH8ke8kpHUxCCfZTi8hZLROz5f6MrmdM0f0QKJoNrq94qn40GlGvVKnkLVGTYscbZo2uOpirWsW45GkO7abvjKvw5AD4F5GCI7JgmP+wQ8GPTK2bAm/MvcSrH0P29MbJuYyW4qQ2gXfUrErELp721Awl/EG2emtiqqLO3a2hK7d0fL+ZgqficGMapKwuJ82ZoomY6LMMrIL3CdEodL7geIFc5Sg2tPqJv3PeStJApCmJM3a6ZzqT2uzGSKxvefeGH4k4vpUlsgGkg0dSTQ0xVHW1xFlJJsYNBnizbG0zpmry9jQ1SGrpu4NJ05/tcPbn2B06pTmWp/znTeKlrO65IInetbdbm4AHSO4hpY4fxypSYYIoHKVyjs2uXUR8wrdsRUeZ1fxh+fGF6666mXhlc29ia2Dw5uRIGSe+9GGkwEaJoHH2/04EbexJVVA4oooqcjgvvbgNGZIp45NoqFmfTo3z58x9TO3viO2Uz1bQrys2ndVrhsVBJgCqKgO7ajcdkUR7aWAF/8ytdqgKrcw7qwB+0BGY0+qTaafJIc9IibvBLazo2mtg6NpncP7u1p3rizCycupVGdSSFcKiO1kMPYYhF+VUa2WMXJS0sorxYws1pB0ZYQCWnYe3cLIn4t/uTzFxtCqjx01/pYr2UjQ/ZUpv3j1Yp1P5MqJCviiBvMujYd6QuP1QGSBXoCWvzvk+V6aqThxbcm73vi6OhDT39+O4YtHy6MZfCHGzR8ZksMd/fH4Ocqb42swPZ6sK3Zh86Yis6EhtlUGWemi9jXojH0EsTGIDZ0JLyn35ntHexPDIV98v5y3vyqIAkzFVH4pmNYvyPK4jVRFGa5tuGq7BYalSlKO8BopopeMsmIu7YRH5/NbH766JVH//JLgxgtCfCUSviTHWFElZ+bWr5swadIyJRNjOZMNIVUJDUJ65I+LBeqGFsu4QbB9jUH0NgUwp8+vB3fenm46dDu9mpvIjBHYhYl2AuyJl20IHgc55bKasK8ecdbH0EulEwOy3XgPo6Wv3/+0hfuPdAvViMa/u1CBnsT8vvAnRpJ48W3FxENehCnmiZXyjg5kcdr8zpmTAlpW8T5RR3/eWEZr1xegVWoIEWdh6OBbcfPzd4Z8klP0nNKooN+WRJ1TtFq3wyx+AGbYZQFnywqNP5eNz9+NDT5qayobBzc34EfnFyCarne7L/1/uvjBXz/XApaUEWAQrVNCyFuXPZ5awRcXiqz7DBhqibW06MuL5bR06QjS9Af29OF3NSKMp/RW2NBr+LXrVaunyjazhlXl2v+KP6iJ9qOE1dkIaopUoz3e49dWvztfbvX4eqMgfL8KkpFHUXr5sun5w3885USQi0RJJrDEBUZtfrAchOGjVaSEK8aUA0DYlmHpHjQQg2aXLJqmGC1wdW8haOnJ+/k3lJE9GXdcc7qDk4Ldde7HaBbzhQ6fFPAI3z91OXU5wTFE9uxJYGR0WWyUMVy0cSPrmapKQOWXsXDm8JQon6IzNIAJSBKEvyM0YaYgo1hGRECNStknfqUybLs86Cb+h4Iinhn0UBPWwgjc7kt1xeLnSG/PELhn+QmXfbSt2tQctwSKQqKYtpPUWLKyPTqaS3gU1h8UVrJs8BWmYk2hiZyGF4uk38RMdnBJxok6k/BXb0RDHRF0B3X0BpV4XEdmN5lMHv98QB83MgdCRWbox68Mp7H5FIB+1pVmIqSODW8OBDyim8EPKILK7/G3u0atJi5HILbHMxNLhcsIRLF/KoNu6SDPQkUy4JftvEmE+BTfV4307E9IKDdJ6KJzFTjHuRKFoJk8To3kTYF+MlcZ1MQzWEFdwYF/Dv986dXM/ir32rCVcrFUrzSQrbS4tZ1RRRCXH+FnFSFXwBIq0OM0nG4YN6jiK/TMP9iV2/Sa0fDmMyUbtYhlQA0FVrEj5zkwauLJrr8Eq6wctwTkxAT3RgIaFTl+m59uIcs61Rmnn83+oBjYzmcnc7jz3Y3YIVucWakgmTUB7lUcBuPz3BcIIYFJktFEH4OUKFeJZaaTubn57mLbKZsvXl4c/PhCUfCOxdXIcisEAJLFz3skxsi6HQzMl3FOPOsJeCBnwyWWSM1atBVjm4ySfhZa7eGa1kbOpMiyA34GcIHN0VwZTaHo++tYvDuLjy4kxXGNJAu23GyZ9W1F3FNhaPgAqSykGc12MMXchXLXuGind/44bvTm/qa2zsaAjhHwnd3BfDxniAW8lU0emQcpB/eRaXEQ3ItBhmGNperwr7ZYUA1nZrAu+g440zZJ37GzqxQxkqqgOGZPB7Z3457N4cwNp1BOVvC797d9lbZcN5hJMk1Qq4fkERJriN2A0S3wlkS0SqLaChXHXFssYDdO+L43J5mtGgivnchhUn2Hp3NQXyxT8MWasrVnNssyPwS84JZLCGgSmTNxhKfOdxMgb7XRY2+cGUZywtZPLCjEYc2J3CxIOK14RQ6BGP0Aal9q6Wb345LQpiJ+bOi47xMTDn5Vltzs5x0mxDeJNAn/+hjPY9OFOxopmKBjSbmChZ2tviwnSjiIQ9KpP2leROz/Kc/IuNwm8SSx/BSCj6WJeKFzgweXdJxbaGIe1o1bLq3AxfnihhsD+DHY3n4OlRIuoEN3f6jXL1VrNqPmCK+Q7kFaBCNxDEt1/TMKldxMKQJOEK3vq+g25FEVH1NU6z11yF6UrKECdrCozuTZAP4weUshki+Rc2tJ9gYZ9Er3BpDvVJ2mQM0uu8oa/CVqykuIGKUtdntQ9JMjgzZzTDR4gIdolwxd/V1vktFLNFCDrNYsNUSbHK/5OaIC5BmALYJmMvb+C6Fs7li2EfimvQHz/30hicTjyMtedHJ0L06sorGuA9RLtZBAO0E5/qhSvGzmcNUiWWAFpQpGEjSWYt0gPEFMuVXMMWm4eRkHoep4/4mHypJBSfOTCHsFc50N4V2zebMtoLjPM7wzphwRt2mlbjMNR90+zK/26+yyz0eUYUxek6yuzHwaUWmU3X78dSxVaxenUNnYwAP7WnBDBf/4SRLFs9UR/pCKJkK/pu1eZ5Mq+wRF+mZYcbKjfV7rjzafPi7Q22YYhN1KWPhYA/w7LUF+/e2JRu4/kbWm6/nbJzgN8LsWbz1diu31g+6OjQYIR7CHFqOEAoo4uxAW3D0m0dHNm+Mqv6dA0lcmCshu5DB8dF0rYUSaR9eugGTFxMpHfNzWTdkyDJeORqGKqDmg7EGVhH2iSNpg2x6sbc7gLnZvPvc+uzezmEi+RY76wsV0xZYat2Wv7DWsIq3nVFcs64UqvY0zXraNc7797T+x988f9HcFxfxif09kCLs6YwKYjwhlRwBNjsXtzmdp0hWaAHzVLkd8kMP+nCV7eYKBRRmZUlQFopHwuD6EK6zN/zz587j09ub/jWois/ldftG3rDyJKaw1qj+0lMdXwLPr+Vc1R4OKaL/wJbm815RGv7eaxN3tt7RhS07OnBjqIo866yf55BHBqLooIW4VeUfVko4uD6IR/lZlklzaqqI61kDu8iehyXvYHu4liCP/eMb+OqRdc+2NviOZw1nMa1bEyS9pIgfPFaKH3rWpHYWS5YxUzRnCqZT3TeQFFTJ1p9+5oQ9kPRi56F+GJ3NuO+OJCxa0CP/NQWD4X7mYDMOUmsvs4l95XoBzQk/7t8SRxMTK9SgILNaxFe+8RN86UDndx/Y3+Oe8Gaqln0uZ9hZ9zD/ob8arJ1JbkftipIHbodYK+6hbU9fbFDQjdlXT10PH9qSZKI0YHezih8v2MjbApZoWjkmzEs3ihii962IzHDFi75WBW0BEa8eu4JnXxzOffnIhn/6/QPrXuT0KxzD7KBKPMzXnFj4EIzCL/ttxn2XtLP8I9KgSbGAKDyW8Ev7Z1JlFutK4O2x5ebJooO2Dc1ItoRqPxHQXeCGiZGnWVPl80ymq/MYHl+GV1NOfu2hrS+0NvgvudnJcc21EpOm/m7KqPmc9FEA3urBHAQ4RzTsFQNxr7iBYm/ix8GfXFroefPi/IBZMnrKjtDoKB7ZYZXhUZLF3XIrhO6DPa36vZcP7Go7u2dT49v1s65rwBPuQXLtNPnuiuGS8f8D6L7DOcKW48iaLMoJVYpHvFKzT64dTjycN3RlLBVfTJdiZcPyuWHyeaRiU9yf6uuJT9UP4Xod3Hy9W751/SYA3tIrJ6OxwE5osrcjIAc4YZCAXKDeuiOsJZ1d74rdyfN1cLkPm/T/Aih/hJ/qLEWsWRBoC3pPSNbrQncvpT6k+r1ZD6GBX/P6XwEGAIpSIMF+aO18AAAAAElFTkSuQmCC";

var getCursorStyle = function (_a) {
    var _b = _a.disabled, disabled = _b === void 0 ? false : _b;
    return disabled ? "not-allowed" : "cursor";
};
var getBaseThumbStyles = function (_a) {
    var isMax = _a.isMax, disabled = _a.disabled;
    return "\n  -webkit-appearance: none;\n  background: no-repeat;\n  background-image: url(" + img + ");\n  background-size: 32px;\n  // background-image: url(" + (isMax ? img$1 : img$2) + ");\n  background-color: transparent;\n  border: 0;\n  cursor: " + getCursorStyle + ";\n  width: 32px;\n  height: 32px;\n  filter: " + (disabled ? "grayscale(100%)" : "none") + ";\n  transform: scale(1.25) translate(-6px, 6px);\n  transition: 200ms transform;\n  z-index: 10;\n\n  &:hover {\n    transform: " + (disabled ? "scale(1.25) translate(-6px, 6px)" : "scale(1.35) translate(-4px, 4px)") + ";\n  }\n";
};
styled__default["default"].div(templateObject_1$N || (templateObject_1$N = tslib.__makeTemplateObject(["\n  bottom: 0;\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 30px);\n"], ["\n  bottom: 0;\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 30px);\n"])));
styled__default["default"](Text)(templateObject_2$s || (templateObject_2$s = tslib.__makeTemplateObject(["\n  bottom: 0;\n  font-size: 12px;\n  left: ", ";\n  position: absolute;\n  text-align: center;\n  min-width: 24px; // Slider thumb size\n"], ["\n  bottom: 0;\n  font-size: 12px;\n  left: ", ";\n  position: absolute;\n  text-align: center;\n  min-width: 24px; // Slider thumb size\n"])), function (_a) {
    var progress = _a.progress;
    return progress;
});
styled__default["default"].div(templateObject_3$k || (templateObject_3$k = tslib.__makeTemplateObject(["\n  background: url(", ") no-repeat;\n  background-size: 32px;\n  height: 32px;\n  filter: ", ";\n  position: absolute;\n  width: 32px;\n  left: 8px;\n  top: 8px;\n  z-index: 1;\n  pointer-events: none;\n"], ["\n  background: url(", ") no-repeat;\n  background-size: 32px;\n  height: 32px;\n  filter: ", ";\n  position: absolute;\n  width: 32px;\n  left: 8px;\n  top: 8px;\n  z-index: 1;\n  pointer-events: none;\n"])), img, function (_a) {
    var disabled = _a.disabled;
    return (disabled ? "grayscale(100%)" : "none");
});
styled__default["default"].div(templateObject_4$b || (templateObject_4$b = tslib.__makeTemplateObject(["\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 14px);\n"], ["\n  position: absolute;\n  left: 14px;\n  width: calc(100% - 14px);\n"])));
styled__default["default"].input(templateObject_5$8 || (templateObject_5$8 = tslib.__makeTemplateObject(["\n  cursor: ", ";\n  height: 32px;\n  position: relative;\n\n  ::-webkit-slider-thumb {\n    ", "\n  }\n\n  ::-moz-range-thumb {\n    ", "\n  }\n\n  ::-ms-thumb {\n    ", "\n  }\n"], ["\n  cursor: ", ";\n  height: 32px;\n  position: relative;\n\n  ::-webkit-slider-thumb {\n    ", "\n  }\n\n  ::-moz-range-thumb {\n    ", "\n  }\n\n  ::-ms-thumb {\n    ", "\n  }\n"])), getCursorStyle, getBaseThumbStyles, getBaseThumbStyles, getBaseThumbStyles);
styled__default["default"].div(templateObject_6$3 || (templateObject_6$3 = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  height: 2px;\n  position: absolute;\n  top: 18px;\n  width: 100%;\n"], ["\n  background-color: ", ";\n  height: 2px;\n  position: absolute;\n  top: 18px;\n  width: 100%;\n"])), function (_a) {
    var theme = _a.theme, disabled = _a.disabled;
    return theme.colors[disabled ? "textDisabled" : '#adcae3'];
});
styled__default["default"].div(templateObject_7$3 || (templateObject_7$3 = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  filter: ", ";\n  height: 10px;\n  position: absolute;\n  top: 18px;\n"], ["\n  background-color: ", ";\n  filter: ", ";\n  height: 10px;\n  position: absolute;\n  top: 18px;\n"])), function (_a) {
    _a.theme;
    return '#adcae3';
}, function (_a) {
    var disabled = _a.disabled;
    return (disabled ? "grayscale(100%)" : "none");
});
var templateObject_1$N, templateObject_2$s, templateObject_3$k, templateObject_4$b, templateObject_5$8, templateObject_6$3, templateObject_7$3;

var variant = {
    RECT: "rect",
    CIRCLE: "circle",
};

var waves = styled.keyframes(templateObject_1$M || (templateObject_1$M = tslib.__makeTemplateObject(["\n   from {\n        left: -150px;\n    }\n    to   {\n        left: 100%;\n    }\n"], ["\n   from {\n        left: -150px;\n    }\n    to   {\n        left: 100%;\n    }\n"])));
var pulse = styled.keyframes(templateObject_2$r || (templateObject_2$r = tslib.__makeTemplateObject(["\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n"], ["\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n"])));
var Root = styled__default["default"].div(templateObject_3$j || (templateObject_3$j = tslib.__makeTemplateObject(["\n  min-height: 20px;\n  display: block;\n  background-color: ", ";\n  border-radius: ", ";\n\n  ", "\n  ", "\n"], ["\n  min-height: 20px;\n  display: block;\n  background-color: ", ";\n  border-radius: ", ";\n\n  ", "\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.backgroundDisabled;
}, function (_a) {
    var variant$1 = _a.variant, theme = _a.theme;
    return (variant$1 === variant.CIRCLE ? theme.radii.circle : theme.radii.small);
}, styledSystem.layout, styledSystem.space);
styled__default["default"](Root)(templateObject_4$a || (templateObject_4$a = tslib.__makeTemplateObject(["\n  animation: ", " 2s infinite ease-out;\n  transform: translate3d(0, 0, 0);\n"], ["\n  animation: ", " 2s infinite ease-out;\n  transform: translate3d(0, 0, 0);\n"])), pulse);
styled__default["default"](Root)(templateObject_5$7 || (templateObject_5$7 = tslib.__makeTemplateObject(["\n  position: relative;\n  overflow: hidden;\n  transform: translate3d(0, 0, 0);\n  &:before {\n    content: \"\";\n    position: absolute;\n    background-image: linear-gradient(90deg, transparent, rgba(243, 243, 243, 0.5), transparent);\n    top: 0;\n    left: -150px;\n    height: 100%;\n    width: 150px;\n    animation: ", " 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n  }\n"], ["\n  position: relative;\n  overflow: hidden;\n  transform: translate3d(0, 0, 0);\n  &:before {\n    content: \"\";\n    position: absolute;\n    background-image: linear-gradient(90deg, transparent, rgba(243, 243, 243, 0.5), transparent);\n    top: 0;\n    left: -150px;\n    height: 100%;\n    width: 150px;\n    animation: ", " 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n  }\n"])), waves);
var templateObject_1$M, templateObject_2$r, templateObject_3$j, templateObject_4$a, templateObject_5$7;

var useTheme = function () {
    var _a = tslib.__read(useThemeManager(), 2), isDark = _a[0], toggleTheme = _a[1];
    var theme = React.useContext(styled.ThemeContext);
    return { isDark: isDark, theme: theme, toggleTheme: toggleTheme };
};

var rotate$1 = styled.keyframes(templateObject_1$L || (templateObject_1$L = tslib.__makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var float = styled.keyframes(templateObject_2$q || (templateObject_2$q = tslib.__makeTemplateObject(["\n\t0% {\n\t\ttransform: translatey(0px);\n\t}cd \n\t50% {\n\t\ttransform: translatey(20px);\n\t}\n\t100% {\n\t\ttransform: translatey(0px);\n\t}\n"], ["\n\t0% {\n\t\ttransform: translatey(0px);\n\t}cd \n\t50% {\n\t\ttransform: translatey(20px);\n\t}\n\t100% {\n\t\ttransform: translatey(0px);\n\t}\n"])));
var Container$1 = styled__default["default"](Box)(templateObject_3$i || (templateObject_3$i = tslib.__makeTemplateObject(["\n  position: relative;\n  margin: 0 auto;\n"], ["\n  position: relative;\n  margin: 0 auto;\n"])));
styled__default["default"](Image)(templateObject_4$9 || (templateObject_4$9 = tslib.__makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  animation: ", " 2s linear infinite;\n  transform: translate3d(0, 0, 0);\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  animation: ", " 2s linear infinite;\n  transform: translate3d(0, 0, 0);\n"])), rotate$1);
styled__default["default"](Image)(templateObject_5$6 || (templateObject_5$6 = tslib.__makeTemplateObject(["\n  animation: ", " 2s ease-in-out infinite;\n  transform: translate3d(0, 0, 0);\n"], ["\n  animation: ", " 2s ease-in-out infinite;\n  transform: translate3d(0, 0, 0);\n"])), float);
var Spinner = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 128 : _b;
    var theme = useTheme().theme;
    return (jsxRuntime.jsx(Container$1, tslib.__assign({ width: size, height: size }, { children: jsxRuntime.jsx(ReactLoading__default["default"], { type: 'cylon', color: theme.colors.primary }, void 0) }), void 0));
};
var templateObject_1$L, templateObject_2$q, templateObject_3$i, templateObject_4$9, templateObject_5$6;

styled__default["default"].div(templateObject_1$K || (templateObject_1$K = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: fit-content;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: fit-content;\n"])));
var templateObject_1$K;

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
styled__default["default"](Flex)(templateObject_1$J || (templateObject_1$J = tslib.__makeTemplateObject(["\n  ", " {\n    justify-content: center;\n  }\n"], ["\n  ", " {\n    justify-content: center;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
});
styled__default["default"].div(templateObject_2$p || (templateObject_2$p = tslib.__makeTemplateObject(["\n  position: absolute;\n  width: 4px;\n  height: 110%;\n  top: 50%;\n  left: calc(50% - 2px);\n  background-color: ", ";\n"], ["\n  position: absolute;\n  width: 4px;\n  height: 110%;\n  top: 50%;\n  left: calc(50% - 2px);\n  background-color: ", ";\n"])), function (_a) {
    var theme = _a.theme, status = _a.status;
    return theme.colors[status === "past" ? "success" : "textDisabled"];
});
var ChildrenWrapper$1 = styled__default["default"](Box)(templateObject_3$h || (templateObject_3$h = tslib.__makeTemplateObject(["\n  ", " {\n    visibility: ", ";\n  }\n"], ["\n  ", " {\n    visibility: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
}, function (_a) {
    var isVisible = _a.isVisible;
    return (isVisible ? "visible" : "hidden");
});
styled__default["default"](ChildrenWrapper$1)(templateObject_4$8 || (templateObject_4$8 = tslib.__makeTemplateObject(["\n  display: none;\n  ", " {\n    display: block;\n    margin-right: 16px;\n  }\n"], ["\n  display: none;\n  ", " {\n    display: block;\n    margin-right: 16px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
});
styled__default["default"](ChildrenWrapper$1)(templateObject_5$5 || (templateObject_5$5 = tslib.__makeTemplateObject(["\n  margin-left: 8px;\n  ", " {\n    margin-left: 16px;\n  }\n"], ["\n  margin-left: 8px;\n  ", " {\n    margin-left: 16px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
});
styled__default["default"].div(templateObject_6$2 || (templateObject_6$2 = tslib.__makeTemplateObject(["\n  position: relative;\n  display: flex;\n  align-items: center;\n"], ["\n  position: relative;\n  display: flex;\n  align-items: center;\n"])));
styled__default["default"].div(templateObject_7$2 || (templateObject_7$2 = tslib.__makeTemplateObject(["\n  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);\n  background-color: ", ";\n  border: 2px solid ", ";\n  border-radius: ", ";\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  font-size: 32px;\n  width: 48px;\n  height: 48px;\n  z-index: 1;\n  ", " {\n    font-size: 40px;\n    width: 80px;\n    height: 80px;\n  }\n"], ["\n  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);\n  background-color: ", ";\n  border: 2px solid ", ";\n  border-radius: ", ";\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  font-size: 32px;\n  width: 48px;\n  height: 48px;\n  z-index: 1;\n  ", " {\n    font-size: 40px;\n    width: 80px;\n    height: 80px;\n  }\n"])), function (_a) {
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
var templateObject_1$J, templateObject_2$p, templateObject_3$h, templateObject_4$8, templateObject_5$5, templateObject_6$2, templateObject_7$2;

styled__default["default"].div(templateObject_1$I || (templateObject_1$I = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-width: 136px;\n  background: ", ";\n  border-radius: ", ";\n  border: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-width: 136px;\n  background: ", ";\n  border-radius: ", ";\n  border: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.input;
}, function (_a) {
    var theme = _a.theme;
    return theme.radii.default;
}, function (_a) {
    var theme = _a.theme;
    return "1px solid " + theme.colors.inputSecondary;
});
styled__default["default"].div(templateObject_2$o || (templateObject_2$o = tslib.__makeTemplateObject(["\n  cursor: pointer;\n"], ["\n  cursor: pointer;\n"])));
styled__default["default"].button(templateObject_3$g || (templateObject_3$g = tslib.__makeTemplateObject(["\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n  background: transparent;\n  padding: 8px 16px;\n  color: ", ";\n  width: 100%;\n  font-size: 16px;\n  text-align: left;\n\n  &:hover {\n    background-color: ", ";\n    text-decoration: none;\n  }\n"], ["\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n  background: transparent;\n  padding: 8px 16px;\n  color: ", ";\n  width: 100%;\n  font-size: 16px;\n  text-align: left;\n\n  &:hover {\n    background-color: ", ";\n    text-decoration: none;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.text;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.inputSecondary;
});
var templateObject_1$I, templateObject_2$o, templateObject_3$g;

document.getElementById("portal-root");

styled__default["default"](Flex)(templateObject_1$H || (templateObject_1$H = tslib.__makeTemplateObject(["\n  border-bottom: 2px solid ", ";\n  overflow-x: scroll;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n"], ["\n  border-bottom: 2px solid ", ";\n  overflow-x: scroll;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.textSubtle;
});
styled__default["default"](Flex)(templateObject_2$n || (templateObject_2$n = tslib.__makeTemplateObject(["\n  justify-content: space-between;\n  flex-grow: 1;\n\n  & > button + button {\n    margin-left: 4px;\n  }\n\n  ", " {\n    flex-grow: 0;\n  }\n"], ["\n  justify-content: space-between;\n  flex-grow: 1;\n\n  & > button + button {\n    margin-left: 4px;\n  }\n\n  ", " {\n    flex-grow: 0;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
});
var templateObject_1$H, templateObject_2$n;

var getBorderRadius = function (_a) {
    var scale = _a.scale;
    return (scale === "md" ? "16px 16px 0 0" : "24px 24px 0 0");
};
var getPadding = function (_a) {
    var scale = _a.scale;
    return (scale === "md" ? "8px" : "16px");
};
var Tab = styled__default["default"].button(templateObject_1$G || (templateObject_1$G = tslib.__makeTemplateObject(["\n  display: inline-flex;\n  justify-content: center;\n  cursor: pointer;\n  border: 0;\n  outline: 0;\n  flex-grow: 1;\n  padding: ", ";\n  border-radius: ", ";\n  font-size: 16px;\n  font-weight: 600;\n\n  ", " {\n    flex-grow: 0;\n  }\n\n  ", "\n"], ["\n  display: inline-flex;\n  justify-content: center;\n  cursor: pointer;\n  border: 0;\n  outline: 0;\n  flex-grow: 1;\n  padding: ", ";\n  border-radius: ", ";\n  font-size: 16px;\n  font-weight: 600;\n\n  ", " {\n    flex-grow: 0;\n  }\n\n  ", "\n"])), getPadding, getBorderRadius, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
}, styledSystem.color);
Tab.defaultProps = {
    scale: "md",
};
var templateObject_1$G;

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
var scales$2 = {
    MD: "md",
    SM: "sm",
};

var _a$3, _b;
var scaleVariants = (_a$3 = {},
    _a$3[scales$2.MD] = {
        height: "28px",
        padding: "0 8px",
        fontSize: "14px",
    },
    _a$3[scales$2.SM] = {
        height: "24px",
        padding: "0 4px",
        fontSize: "12px",
    },
    _a$3);
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
var StyledTag = styled__default["default"].div(templateObject_1$F || (templateObject_1$F = tslib.__makeTemplateObject(["\n  align-items: center;\n  border-radius: 16px;\n  color: #ffffff;\n  display: inline-flex;\n  font-weight: 400;\n  white-space: nowrap;\n\n  & > svg {\n    fill: currentColor;\n  }\n\n  ", "\n  ", "\n  ", "\n\n  ", "\n"], ["\n  align-items: center;\n  border-radius: 16px;\n  color: #ffffff;\n  display: inline-flex;\n  font-weight: 400;\n  white-space: nowrap;\n\n  & > svg {\n    fill: currentColor;\n  }\n\n  ", "\n  ", "\n  ", "\n\n  ", "\n"])), styledSystem.variant({
    prop: "scale",
    variants: scaleVariants,
}), styledSystem.variant({
    variants: styleVariants,
}), styledSystem.space, getOutlineStyles);
var templateObject_1$F;

var Tag = function (_a) {
    var startIcon = _a.startIcon, endIcon = _a.endIcon, children = _a.children, props = tslib.__rest(_a, ["startIcon", "endIcon", "children"]);
    return (jsxRuntime.jsxs(StyledTag, tslib.__assign({}, props, { children: [React__default["default"].isValidElement(startIcon) &&
                React__default["default"].cloneElement(startIcon, {
                    mr: "0.5em",
                }), children, React__default["default"].isValidElement(endIcon) &&
                React__default["default"].cloneElement(endIcon, {
                    ml: "0.5em",
                })] }), void 0));
};
Tag.defaultProps = {
    variant: "primary",
    scale: scales$2.MD,
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
        var _b = _a.scale, scale = _b === void 0 ? scales$7.MD : _b;
        return scaleKeyValues[scale][property];
    };
};
var Handle = styled__default["default"].div(templateObject_1$E || (templateObject_1$E = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 50%;\n  cursor: pointer;\n  height: ", ";\n  left: ", ";\n  position: absolute;\n  top: ", ";\n  transition: left 200ms ease-in;\n  width: ", ";\n  z-index: 1;\n  box-shadow: 0px 0px 3px 0px rgba(150, 150, 150, 0.9);\n"], ["\n  background-color: ", ";\n  border-radius: 50%;\n  cursor: pointer;\n  height: ", ";\n  left: ", ";\n  position: absolute;\n  top: ", ";\n  transition: left 200ms ease-in;\n  width: ", ";\n  z-index: 1;\n  box-shadow: 0px 0px 3px 0px rgba(150, 150, 150, 0.9);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.toggle.handleBackground;
}, getScale("handleHeight"), getScale("handleLeft"), getScale("handleTop"), getScale("handleWidth"));
var Input$2 = styled__default["default"].input(templateObject_2$m || (templateObject_2$m = tslib.__makeTemplateObject(["\n  cursor: pointer;\n  opacity: 0;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n  z-index: 3;\n\n  &:checked + ", " {\n    left: ", ";\n  }\n\n  &:focus + ", " {\n    box-shadow: ", ";\n  }\n\n  &:hover + ", ":not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n"], ["\n  cursor: pointer;\n  opacity: 0;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n  z-index: 3;\n\n  &:checked + ", " {\n    left: ", ";\n  }\n\n  &:focus + ", " {\n    box-shadow: ", ";\n  }\n\n  &:hover + ", ":not(:disabled):not(:checked) {\n    box-shadow: ", ";\n  }\n"])), Handle, getScale("checkedLeft"), Handle, function (_a) {
    var theme = _a.theme;
    return theme.shadows.focus;
}, Handle, function (_a) {
    var theme = _a.theme;
    return theme.shadows.focus;
});
var StyledToggle = styled__default["default"].div(templateObject_3$f || (templateObject_3$f = tslib.__makeTemplateObject(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 24px;\n  box-shadow: ", ";\n  cursor: pointer;\n  display: inline-flex;\n  height: ", ";\n  position: relative;\n  transition: background-color 200ms;\n  width: ", ";\n"], ["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 24px;\n  box-shadow: ", ";\n  cursor: pointer;\n  display: inline-flex;\n  height: ", ";\n  position: relative;\n  transition: background-color 200ms;\n  width: ", ";\n"])), function (_a) {
    var theme = _a.theme, checked = _a.checked;
    return theme.colors[checked ? "success" : "backgroundSelect"];
}, function (_a) {
    var theme = _a.theme;
    return theme.shadows.inset;
}, getScale("toggleHeight"), getScale("toggleWidth"));
var templateObject_1$E, templateObject_2$m, templateObject_3$f;

var scales$1 = {
    SM: "sm",
    MD: "md",
};

var Toggle = function (_a) {
    var checked = _a.checked, _b = _a.scale, scale = _b === void 0 ? scales$1.MD : _b, props = tslib.__rest(_a, ["checked", "scale"]);
    var isChecked = !!checked;
    return (jsxRuntime.jsxs(StyledToggle, tslib.__assign({ checked: isChecked, scale: scale }, { children: [jsxRuntime.jsx(Input$2, tslib.__assign({ checked: checked, scale: scale }, props, { type: "checkbox" }), void 0), jsxRuntime.jsx(Handle, { scale: scale }, void 0)] }), void 0));
};
Toggle.defaultProps = {
    scale: scales$1.MD,
};

var getBoxShadow = function (_a) {
    var _b = _a.isWarning, isWarning = _b === void 0 ? false : _b, theme = _a.theme;
    if (isWarning) {
        return theme.shadows.warning;
    }
    return theme.colors.inpuShadows;
};
styled__default["default"](Text)(templateObject_1$D || (templateObject_1$D = tslib.__makeTemplateObject(["\n  position: absolute;\n  bottom: -22px;\n  a {\n    display: inline;\n  }\n"], ["\n  position: absolute;\n  bottom: -22px;\n  a {\n    display: inline;\n  }\n"])));
styled__default["default"](Box)(templateObject_2$l || (templateObject_2$l = tslib.__makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
styled__default["default"](Box)(templateObject_3$e || (templateObject_3$e = tslib.__makeTemplateObject(["\n  border-radius: 16px;\n  background-color: ", ";\n  box-shadow: ", ";\n  position: relative;\n  padding: 8px 20px;\n"], ["\n  border-radius: 16px;\n  background-color: ", ";\n  box-shadow: ", ";\n  position: relative;\n  padding: 8px 20px;\n"])), function (_a) {
    var theme = _a.theme, background = _a.background;
    return theme.colors[background] || theme.colors.inputPanel;
}, getBoxShadow);
var templateObject_1$D, templateObject_2$l, templateObject_3$e;

var scales = {
    SM: "sm",
    MD: "md",
    LG: "lg",
};

var _a$2;
(_a$2 = {},
    _a$2[scales.LG] = {
        width: 496,
        height: 700
    },
    _a$2[scales.MD] = {
        width: 248,
        height: 350.8
    },
    _a$2[scales.SM] = {
        width: 146,
        height: 177
    },
    _a$2);

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
    card: "10px",
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
            return tslib.__assign(tslib.__assign({}, accum), (_a = {}, _a[size] = "(min-width: " + prevMinWidth + "px)", _a));
        }
        var minWidth = prevMinWidth;
        var breakpoint = breakpointMap[size];
        // Min width for next iteration
        prevMinWidth = breakpoint + 1;
        return tslib.__assign(tslib.__assign({}, accum), (_b = {}, _b[size] = "(min-width: " + minWidth + "px) and (max-width: " + breakpoint + "px)", _b));
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
var lightColors = tslib.__assign(tslib.__assign(tslib.__assign(tslib.__assign({}, baseColors), additionalColors), nftTokenColors), { smHeadText: '#56604E', smTitletext: '#759290', white_blue: '#010101', white: "white", background: "#FAF9FA", backgroundPage: "#f5fdfc", backgroundLight: "#E7EFF9", backgroundSelect: "#F5F5F5", backgroundDisabled: "#969696", backgroundPrimary: "#8EB5EF", backgroundMember: "#5D95E7", backgroundCard: "#FFFFFF", backgroundAlt: "#FFFFFF", cardBorder: "#E7E3EB", contrast: "#191326", dropdown: "#F6F6F6", dropdownDeep: "#EEEEEE", invertedContrast: "#FFFFFF", input: "#F5F5F5", inputPanel: "#E7EFF9", inpuShadows: "inset 0px 1px 3px 0px rgba(16, 64, 54, 0.21)", inputSecondary: "#d7caec", inputSelect: "#DBDBDB", tertiary: "#EFF4F5", text: "#283433", white_black: '#000', member_num: '#305C9C', textValue: "#7E7E7E", textPrimary: "#5D95E7", textSubtle: "#5D95E7", textDisabled: "#BDC2C4", disabled: "#E9EAEB", gradients: {
        bubblegum: "linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)",
        inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
        cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
        blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
        violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
        violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
        gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
    } });
var darkColors = tslib.__assign(tslib.__assign(tslib.__assign(tslib.__assign({}, baseColors), additionalColors), nftTokenColors), { smHeadText: '#B3C7E3', smTitletext: '#759290', white_blue: '#5D95E7', white: "white", secondary: "#9A6AFF", background: "#08060B", backgroundPage: "#0B1513", backgroundLight: "#334542", backgroundSelect: "#2f3836", backgroundDisabled: "#3c3742", backgroundPrimary: "#8EB5EF", backgroundMember: 'rgba(93, 149, 231, 0.498)', backgroundCard: "#191F2D", backgroundAlt: "#212827", cardBorder: "#383241", contrast: "#FFFFFF", dropdown: "#1E1D20", dropdownDeep: "#212827", invertedContrast: "#191326", input: "#292D34", inputPanel: "#21262A", inpuShadows: "inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35)", inputSelect: "#292D34", inputSecondary: "#262130", primaryDark: "#0098A1", tertiary: "#353547", text: "#bad1bd", white_black: '#FFFFFF', member_num: '#FFFFFF', textValue: "#7E7E7E", textPrimary: "#5D95E7", textSubtle: "#5D95E7", textDisabled: "#666171", disabled: "#524B63", gradients: {
        bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
        inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
        cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
        blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
        violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
        violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
        gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
    } });

var light$6 = {
    background: lightColors.backgroundAlt,
};
var dark$6 = {
    background: darkColors.backgroundAlt,
};

var light$5 = {
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
var dark$5 = {
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

var light$4 = {
    handleBackground: lightColors.backgroundAlt,
    handleShadow: lightColors.textDisabled,
};
var dark$4 = {
    handleBackground: darkColors.backgroundAlt,
    handleShadow: darkColors.textDisabled,
};

var light$3 = {
    handleBackground: lightColors.backgroundAlt,
};
var dark$3 = {
    handleBackground: darkColors.backgroundAlt,
};

var light$2 = {
    handleBackground: lightColors.backgroundAlt,
};
var dark$2 = {
    handleBackground: darkColors.backgroundAlt,
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

var darkTheme = tslib.__assign(tslib.__assign({}, base), { isDark: true, filter: darkFilter, alert: dark$6, colors: darkColors, card: dark$5, toggle: dark$2, modal: dark$1, pancakeToggle: dark$4, radio: dark$3, tooltip: dark });

var lightTheme = tslib.__assign(tslib.__assign({}, base), { isDark: false, filter: lightFilter, alert: light$6, colors: lightColors, card: light$5, toggle: light$2, modal: light$1, pancakeToggle: light$4, radio: light$3, tooltip: light });

var isTouchDevice = function () {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

var Arrow = styled__default["default"].div(templateObject_1$C || (templateObject_1$C = tslib.__makeTemplateObject(["\n  &,\n  &::before {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: 2px;\n    z-index: -1;\n  }\n\n  &::before {\n    content: \"\";\n    transform: rotate(45deg);\n    background: ", ";\n  }\n"], ["\n  &,\n  &::before {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: 2px;\n    z-index: -1;\n  }\n\n  &::before {\n    content: \"\";\n    transform: rotate(45deg);\n    background: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.tooltip.background;
});
var StyledTooltip = styled__default["default"].div(templateObject_2$k || (templateObject_2$k = tslib.__makeTemplateObject(["\n  padding: 16px;\n  font-size: 16px;\n  line-height: 130%;\n  border-radius: 16px;\n  max-width: 320px;\n  z-index: 101;\n  background: ", ";\n  color: ", ";\n  box-shadow: ", ";\n\n  &[data-popper-placement^=\"top\"] > ", " {\n    bottom: -4px;\n  }\n\n  &[data-popper-placement^=\"bottom\"] > ", " {\n    top: -4px;\n  }\n\n  &[data-popper-placement^=\"left\"] > ", " {\n    right: -4px;\n  }\n\n  &[data-popper-placement^=\"right\"] > ", " {\n    left: -4px;\n  }\n"], ["\n  padding: 16px;\n  font-size: 16px;\n  line-height: 130%;\n  border-radius: 16px;\n  max-width: 320px;\n  z-index: 101;\n  background: ", ";\n  color: ", ";\n  box-shadow: ", ";\n\n  &[data-popper-placement^=\"top\"] > ", " {\n    bottom: -4px;\n  }\n\n  &[data-popper-placement^=\"bottom\"] > ", " {\n    top: -4px;\n  }\n\n  &[data-popper-placement^=\"left\"] > ", " {\n    right: -4px;\n  }\n\n  &[data-popper-placement^=\"right\"] > ", " {\n    left: -4px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.tooltip.background;
}, function (_a) {
    var theme = _a.theme;
    return theme.tooltip.text;
}, function (_a) {
    var theme = _a.theme;
    return theme.tooltip.boxShadow;
}, Arrow, Arrow, Arrow, Arrow);
var templateObject_1$C, templateObject_2$k;

var invertTheme = function (currentTheme) {
    if (currentTheme.isDark) {
        return lightTheme;
    }
    return darkTheme;
};
var portalRoot = document.getElementById("portal-root");
var useTooltip = function (content, options) {
    var _a = options.placement, placement = _a === void 0 ? "auto" : _a, _b = options.trigger, trigger = _b === void 0 ? "hover" : _b, _c = options.arrowPadding, arrowPadding = _c === void 0 ? 16 : _c, _d = options.tooltipPadding, tooltipPadding = _d === void 0 ? { left: 16, right: 16 } : _d, _e = options.tooltipOffset, tooltipOffset = _e === void 0 ? [0, 10] : _e;
    var _f = tslib.__read(React.useState(null), 2), targetElement = _f[0], setTargetElement = _f[1];
    var _g = tslib.__read(React.useState(null), 2), tooltipElement = _g[0], setTooltipElement = _g[1];
    var _h = tslib.__read(React.useState(null), 2), arrowElement = _h[0], setArrowElement = _h[1];
    var _j = tslib.__read(React.useState(false), 2), visible = _j[0], setVisible = _j[1];
    var isHoveringOverTooltip = React.useRef(false);
    var hideTimeout = React.useRef();
    var hideTooltip = React.useCallback(function (e) {
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
    var showTooltip = React.useCallback(function (e) {
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
    var toggleTooltip = React.useCallback(function (e) {
        e.stopPropagation();
        setVisible(!visible);
    }, [visible]);
    // Trigger = hover
    React.useEffect(function () {
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
    React.useEffect(function () {
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
    React.useEffect(function () {
        if (targetElement === null || trigger !== "click")
            return undefined;
        targetElement.addEventListener("click", toggleTooltip);
        return function () { return targetElement.removeEventListener("click", toggleTooltip); };
    }, [trigger, targetElement, visible, toggleTooltip]);
    // Handle click outside
    React.useEffect(function () {
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
    React.useEffect(function () {
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
    var _k = reactPopper.usePopper(targetElement, tooltipElement, {
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
    var tooltip = (jsxRuntime.jsxs(StyledTooltip, tslib.__assign({ ref: setTooltipElement, style: styles.popper }, attributes.popper, { children: [jsxRuntime.jsx(styled.ThemeProvider, tslib.__assign({ theme: invertTheme }, { children: content }), void 0), jsxRuntime.jsx(Arrow, { ref: setArrowElement, style: styles.arrow }, void 0)] }), void 0));
    var tooltipInPortal = portalRoot ? reactDom.createPortal(tooltip, portalRoot) : null;
    return {
        targetRef: setTargetElement,
        tooltip: tooltipInPortal !== null && tooltipInPortal !== void 0 ? tooltipInPortal : tooltip,
        tooltipVisible: visible,
    };
};

var ModalHeader = styled__default["default"].div(templateObject_1$B || (templateObject_1$B = tslib.__makeTemplateObject(["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"], ["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"])), function (_a) {
    var background = _a.background;
    return background || "transparent";
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.cardBorder;
});
var ModalTitle = styled__default["default"](Flex)(templateObject_2$j || (templateObject_2$j = tslib.__makeTemplateObject(["\n  align-items: center;\n  flex: 1;\n"], ["\n  align-items: center;\n  flex: 1;\n"])));
var ModalBody = styled__default["default"](Flex)(templateObject_3$d || (templateObject_3$d = tslib.__makeTemplateObject(["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"], ["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"])));
var IconButtonStyled = styled__default["default"](IconButton)(templateObject_4$7 || (templateObject_4$7 = tslib.__makeTemplateObject(["\n  width: auto;\n"], ["\n  width: auto;\n"])));
var ModalCloseButton = function (_a) {
    var onDismiss = _a.onDismiss;
    return (jsxRuntime.jsx(IconButtonStyled, tslib.__assign({ variant: "text", onClick: onDismiss, "aria-label": "Close the dialog" }, { children: jsxRuntime.jsx(Icon$7, { color: "primary" }, void 0) }), void 0));
};
var ModalBackButton = function (_a) {
    var onBack = _a.onBack;
    return (jsxRuntime.jsx(IconButton, tslib.__assign({ variant: "text", onClick: onBack, "area-label": "go back", mr: "8px" }, { children: jsxRuntime.jsx(Icon$e, { width: 32, color: "primary" }, void 0) }), void 0));
};
var ModalContainer = styled__default["default"](Box)(templateObject_5$4 || (templateObject_5$4 = tslib.__makeTemplateObject(["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"], ["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"])), function (_a) {
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
var templateObject_1$B, templateObject_2$j, templateObject_3$d, templateObject_4$7, templateObject_5$4;

var Modal = function (_a) {
    var title = _a.title, onDismiss = _a.onDismiss, onBack = _a.onBack, children = _a.children, _b = _a.hideCloseButton, hideCloseButton = _b === void 0 ? false : _b, _c = _a.bodyPadding, bodyPadding = _c === void 0 ? "24px" : _c, _d = _a.headerBackground, headerBackground = _d === void 0 ? "transparent" : _d, _e = _a.minWidth, minWidth = _e === void 0 ? "320px" : _e, props = tslib.__rest(_a, ["title", "onDismiss", "onBack", "children", "hideCloseButton", "bodyPadding", "headerBackground", "minWidth"]);
    var theme = styled.useTheme();
    return (jsxRuntime.jsxs(ModalContainer, tslib.__assign({ minWidth: minWidth }, props, { children: [jsxRuntime.jsxs(ModalHeader, tslib.__assign({ background: getThemeValue("colors." + headerBackground, headerBackground)(theme) }, { children: [jsxRuntime.jsxs(ModalTitle, { children: [onBack && jsxRuntime.jsx(ModalBackButton, { onBack: onBack }, void 0), jsxRuntime.jsx(Heading, { children: title }, void 0)] }, void 0), !hideCloseButton && jsxRuntime.jsx(ModalCloseButton, { onDismiss: onDismiss }, void 0)] }), void 0), jsxRuntime.jsx(ModalBody, tslib.__assign({ p: bodyPadding }, { children: children }), void 0)] }), void 0));
};

var ModalWrapper$1 = styled__default["default"].div(templateObject_1$A || (templateObject_1$A = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.zIndices.modal - 1;
});
var Context$1 = React.createContext({
    isOpen: false,
    nodeId: "",
    modalNode: null,
    setModalNode: function () { return null; },
    onPresent: function () { return null; },
    onDismiss: function () { return null; },
    setCloseOnOverlayClick: function () { return true; },
});
var OPEN_CLASS_NAME = ' mini-swap-Modal__Body--open';
var ModalProvider$1 = function (_a) {
    var children = _a.children;
    var _b = tslib.__read(React.useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var _c = tslib.__read(React.useState(), 2), modalNode = _c[0], setModalNode = _c[1];
    var _d = tslib.__read(React.useState(""), 2), nodeId = _d[0], setNodeId = _d[1];
    var _e = tslib.__read(React.useState(true), 2), closeOnOverlayClick = _e[0], setCloseOnOverlayClick = _e[1];
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
    React.useEffect(function () {
        if (isOpen) {
            document.body.className = "" + document.body.className + OPEN_CLASS_NAME;
        }
        else {
            var reg = new RegExp(OPEN_CLASS_NAME, 'g');
            document.body.className = ("" + document.body.className).replace(reg, '');
        }
    }, [isOpen]);
    return (jsxRuntime.jsxs(Context$1.Provider, tslib.__assign({ value: {
            isOpen: isOpen,
            nodeId: nodeId,
            modalNode: modalNode,
            setModalNode: setModalNode,
            onPresent: handlePresent,
            onDismiss: handleDismiss,
            setCloseOnOverlayClick: setCloseOnOverlayClick,
        } }, { children: [isOpen && (jsxRuntime.jsxs(ModalWrapper$1, { children: [jsxRuntime.jsx(Overlay, { show: true, onClick: handleOverlayDismiss }, void 0), React__default["default"].isValidElement(modalNode) &&
                        React__default["default"].cloneElement(modalNode, {
                            onDismiss: handleDismiss,
                        })] }, void 0)), children] }), void 0));
};
var templateObject_1$A;

var useModal = function (modal, closeOnOverlayClick, updateOnPropsChange, modalId) {
    if (closeOnOverlayClick === void 0) { closeOnOverlayClick = true; }
    if (updateOnPropsChange === void 0) { updateOnPropsChange = false; }
    if (modalId === void 0) { modalId = "defaultNodeId"; }
    var _a = React.useContext(Context$1), isOpen = _a.isOpen, nodeId = _a.nodeId, modalNode = _a.modalNode, setModalNode = _a.setModalNode, onPresent = _a.onPresent, onDismiss = _a.onDismiss, setCloseOnOverlayClick = _a.setCloseOnOverlayClick;
    var onPresentCallback = React.useCallback(function () {
        onPresent(modal, modalId);
    }, [modal, modalId, onPresent]);
    // Updates the "modal" component if props are changed
    // Use carefully since it might result in unnecessary rerenders
    // Typically if modal is staic there is no need for updates, use when you expect props to change
    React.useEffect(function () {
        // NodeId is needed in case there are 2 useModal hooks on the same page and one has updateOnPropsChange
        if (updateOnPropsChange && isOpen && nodeId === modalId) {
            var modalProps = get__default["default"](modal, "props");
            var oldModalProps = get__default["default"](modalNode, "props");
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
    React.useEffect(function () {
        setCloseOnOverlayClick(closeOnOverlayClick);
    }, [closeOnOverlayClick, setCloseOnOverlayClick]);
    return [onPresentCallback, onDismiss];
};

var types = {
    SUCCESS: "success",
    DANGER: "danger",
    WARNING: "warning",
    INFO: "info",
    CUSTOM: "custom",
};

var _a$1;
(_a$1 = {},
    _a$1[types.INFO] = variants$4.INFO,
    _a$1[types.SUCCESS] = variants$4.SUCCESS,
    _a$1[types.DANGER] = variants$4.DANGER,
    _a$1[types.WARNING] = variants$4.WARNING,
    _a$1[types.CUSTOM] = variants$4.CUSTOM,
    _a$1);
styled__default["default"].div(templateObject_1$z || (templateObject_1$z = tslib.__makeTemplateObject(["\n  right: 16px;\n  position: fixed;\n  max-width: calc(100% - 32px);\n  transition: all 250ms ease-in;\n  width: 100%;\n\n  ", " {\n    max-width: 400px;\n  }\n"], ["\n  right: 16px;\n  position: fixed;\n  max-width: calc(100% - 32px);\n  transition: all 250ms ease-in;\n  width: 100%;\n\n  ", " {\n    max-width: 400px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.sm;
});
var templateObject_1$z;

styled__default["default"].div(templateObject_1$y || (templateObject_1$y = tslib.__makeTemplateObject(["\n  .enter,\n  .appear {\n    opacity: 0.01;\n    transform: translateX(100%);\n  }\n\n  .enter.enter-active,\n  .appear.appear-active {\n    opacity: 1;\n    transition: opacity 250ms ease-in;\n  }\n\n  .exit {\n    opacity: 1;\n  }\n\n  .exit.exit-active {\n    opacity: 0.01;\n    transition: opacity 250ms ease-out;\n  }\n"], ["\n  .enter,\n  .appear {\n    opacity: 0.01;\n    transform: translateX(100%);\n  }\n\n  .enter.enter-active,\n  .appear.appear-active {\n    opacity: 1;\n    transition: opacity 250ms ease-in;\n  }\n\n  .exit {\n    opacity: 1;\n  }\n\n  .exit.exit-active {\n    opacity: 0.01;\n    transition: opacity 250ms ease-out;\n  }\n"])));
var templateObject_1$y;

styled__default["default"].div(templateObject_1$x || (templateObject_1$x = tslib.__makeTemplateObject(["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"], ["\n  align-items: center;\n  /* background: ", "; */\n  /* border-bottom: 1px solid ", "; */\n  display: flex;\n  padding: 12px 24px;\n"])), function (_a) {
    var background = _a.background;
    return background || "transparent";
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.cardBorder;
});
styled__default["default"](Flex)(templateObject_2$i || (templateObject_2$i = tslib.__makeTemplateObject(["\n  align-items: center;\n  flex: 1;\n"], ["\n  align-items: center;\n  flex: 1;\n"])));
styled__default["default"](Flex)(templateObject_3$c || (templateObject_3$c = tslib.__makeTemplateObject(["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"], ["\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding-top: 0;\n"])));
styled__default["default"](Box)(templateObject_4$6 || (templateObject_4$6 = tslib.__makeTemplateObject(["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"], ["\n  overflow: hidden;\n  background: ", ";\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  width: 100%;\n  max-height: 100vh;\n  z-index: ", ";\n\n  ", " {\n    width: auto;\n    min-width: ", ";\n    max-width: 100%;\n  }\n"])), function (_a) {
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
var LoadingContainer = styled__default["default"](Box)(templateObject_5$3 || (templateObject_5$3 = tslib.__makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: ", ";\n  width: 650px;\n  /* height: 200px; */\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: ", ";\n  width: 650px;\n  /* height: 200px; */\n"])), function (_a) {
    var theme = _a.theme;
    return theme.zIndices.modal;
});
var VideoStyled = styled__default["default"].video(templateObject_6$1 || (templateObject_6$1 = tslib.__makeTemplateObject(["\n  width: 500px;\n  height: 500px;\n  mix-blend-mode: screen;\n  object-fit: fill;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: 2;\n"], ["\n  width: 500px;\n  height: 500px;\n  mix-blend-mode: screen;\n  object-fit: fill;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: 2;\n"])));
var ImageStyled = styled__default["default"].img(templateObject_7$1 || (templateObject_7$1 = tslib.__makeTemplateObject(["\n  /* width: 500px;\n  height: 500px; */\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: ", ";\n"], ["\n  /* width: 500px;\n  height: 500px; */\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n  z-index: ", ";\n"])), function (_a) {
    var zIndex = _a.zIndex;
    return zIndex || 2;
});
var ChildrenWrapper = styled__default["default"](Box)(templateObject_8$1 || (templateObject_8$1 = tslib.__makeTemplateObject(["\n  width: auto;\n  height: auto;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n"], ["\n  width: auto;\n  height: auto;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n"])));
styled__default["default"](Box)(templateObject_9$1 || (templateObject_9$1 = tslib.__makeTemplateObject(["\n  background: pink;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: 100vw;\n  height: 100vh;\n"], ["\n  background: pink;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: 100vw;\n  height: 100vh;\n"])));
var scaleFrame = styled.keyframes(templateObject_10 || (templateObject_10 = tslib.__makeTemplateObject(["\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  90% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n"], ["\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  90% {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n"])));
var opacityFrame = styled.keyframes(templateObject_11 || (templateObject_11 = tslib.__makeTemplateObject(["\n  0% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 0.8;\n  }\n  100% {\n    opacity: 0;\n  }\n"], ["\n  0% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 0.8;\n  }\n  100% {\n    opacity: 0;\n  }\n"])));
var BoxAnimationStyled = styled__default["default"](Box)(templateObject_12 || (templateObject_12 = tslib.__makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 3.2s;\n  /* animation-delay: 0s; */\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n"], ["\n  animation-name: ", ";\n  animation-duration: 3.2s;\n  /* animation-delay: 0s; */\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n"])), scaleFrame);
styled__default["default"](Box)(templateObject_13 || (templateObject_13 = tslib.__makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 0.5s;\n  animation-delay: 30ms;\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n  opacity: 0;\n"], ["\n  animation-name: ", ";\n  animation-duration: 0.5s;\n  animation-delay: 30ms;\n  animation-timing-function: linear;\n  animation-iteration-count: 1;\n  opacity: 0;\n"])), opacityFrame);
var templateObject_1$x, templateObject_2$i, templateObject_3$c, templateObject_4$6, templateObject_5$3, templateObject_6$1, templateObject_7$1, templateObject_8$1, templateObject_9$1, templateObject_10, templateObject_11, templateObject_12, templateObject_13;

var LoadingType;
(function (LoadingType) {
    LoadingType[LoadingType["HARVEST"] = 0] = "HARVEST";
    LoadingType[LoadingType["MEAT_MYSTERY"] = 1] = "MEAT_MYSTERY";
    LoadingType[LoadingType["EGG_MYSTERY"] = 2] = "EGG_MYSTERY";
})(LoadingType || (LoadingType = {}));

(jsxRuntime.jsx(VideoStyled, { loop: true, muted: true, autoPlay: true, src: "/images/loading/harvest.mp4" }, void 0));
(jsxRuntime.jsx(ImageStyled, { src: "/images/loading/harvest-loop.png" }, void 0));
var Loading = function (_a) {
    var children = _a.children, loadingType = _a.loadingType, loaded = _a.loaded, props = tslib.__rest(_a, ["children", "loadingType", "loaded"]);
    styled.useTheme();
    var renderLoadingType = function () {
        if (loaded)
            return null;
        var time = new Date().getTime();
        switch (loadingType) {
            case LoadingType.HARVEST:
                return (jsxRuntime.jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
            case LoadingType.MEAT_MYSTERY:
                return (jsxRuntime.jsx(ImageStyled, { src: "/images/loading/card_ending.png?" + time }, void 0));
            case LoadingType.EGG_MYSTERY:
                return (jsxRuntime.jsx(ImageStyled, { src: "/images/loading/card_ending.png?" + time }, void 0));
            default:
                return (jsxRuntime.jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
        }
    };
    var renderLoadedType = React.useMemo(function () {
        if (!loaded)
            return null;
        var time = new Date().getTime();
        switch (loadingType) {
            case LoadingType.HARVEST:
                return (jsxRuntime.jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
            case LoadingType.MEAT_MYSTERY:
                return (jsxRuntime.jsx(ImageStyled, { zIndex: 4, src: "/images/loading/card_loadng.png?" + time }, void 0));
            case LoadingType.EGG_MYSTERY:
                return (jsxRuntime.jsx(ImageStyled, { zIndex: 4, src: "/images/loading/card_loadng.png?" + time }, void 0));
            default:
                return (jsxRuntime.jsx(ImageStyled, { src: "/images/loading/harvest-loop.png?" + time }, void 0));
        }
    }, [loaded, loadingType]);
    return (jsxRuntime.jsxs(LoadingContainer, tslib.__assign({}, props, { children: [renderLoadingType(), renderLoadedType, jsxRuntime.jsx(ChildrenWrapper, { children: children && (jsxRuntime.jsx(BoxAnimationStyled, { children: children }, void 0)) }, void 0)] }), void 0));
};

var ModalWrapper = styled__default["default"].div(templateObject_1$w || (templateObject_1$w = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.zIndices.modal - 1;
});
var Context = React.createContext({
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
    var _b = tslib.__read(React.useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var _c = tslib.__read(React.useState(), 2), modalNode = _c[0], setModalNode = _c[1];
    var _d = tslib.__read(React.useState(""), 2), nodeId = _d[0], setNodeId = _d[1];
    var _e = tslib.__read(React.useState(LoadingType.HARVEST), 2), loadingType = _e[0], setLoadingType = _e[1];
    var _f = tslib.__read(React.useState(false), 2), loaded = _f[0], setLoaded = _f[1];
    var _g = tslib.__read(React.useState(true), 2), closeOnOverlayClick = _g[0], setCloseOnOverlayClick = _g[1];
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
    return (jsxRuntime.jsxs(Context.Provider, tslib.__assign({ value: {
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
        } }, { children: [isOpen && (jsxRuntime.jsxs(ModalWrapper, { children: [jsxRuntime.jsx(Overlay, { show: true, onClick: handleOverlayDismiss }, void 0), jsxRuntime.jsx(Loading, tslib.__assign({ loaded: loaded, loadingType: loadingType }, { children: React__default["default"].isValidElement(modalNode) &&
                            React__default["default"].cloneElement(modalNode, {
                                onDismiss: handleDismiss,
                            }) }), void 0)] }, void 0)), children] }), void 0));
};
var templateObject_1$w;

styled.createGlobalStyle(templateObject_1$v || (templateObject_1$v = tslib.__makeTemplateObject(["\n  /* prettier-ignore */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed, \n  figure, figcaption, footer, header, hgroup, \n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    vertical-align: baseline;\n  }\n  /* HTML5 display-role reset for older browsers */\n  /* prettier-ignore */\n  article, aside, details, figcaption, figure, \n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n    font-size: 16px;\n    /* background-color: ", "; */\n  }\n  body{\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    -webkit-tap-highlight-color: transparent;\n  }\n  ol,\n  ul {\n    list-style: disc;\n    list-style-position: inside;\n  }\n  blockquote,\n  q {\n    quotes: none;\n  }\n  blockquote:before,\n  blockquote:after,\n  q:before,\n  q:after {\n    content: \"\";\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n  a {\n    color: inherit;\n    text-decoration: none;\n  }\n  [role=\"button\"] {\n    cursor: pointer;\n  }\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n  * {\n    font-family: 'SourceHanSansCN', sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  /* Number */\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  input[type=number] {\n    -moz-appearance: textfield;\n  }\n\n  /* Scrollbar */\n  ::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ", "; \n    border-radius: 8px;\n  }\n  ::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 5px ", "; \n    border-radius: 10px;\n  }\n\n  /* Slider */ \n  input[type=range] {\n    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */\n    width: 100%; /* Specific width is required for Firefox. */\n    background: transparent; /* Otherwise white in Chrome */\n  }\n  input[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n  }\n  input[type=range]:focus {\n    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */\n  }\n  input[type=range]::-ms-track {\n    width: 100%;\n    cursor: pointer;\n    /* Hides the slider so custom styles can be added */\n    background: transparent; \n    border-color: transparent;\n    color: transparent;\n  }\n  .show-media-lg {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-md {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-nav {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-sm {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xl {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xs {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .hide-media-lg {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-md {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-nav {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-sm {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xl {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xs {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n"], ["\n  /* prettier-ignore */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed, \n  figure, figcaption, footer, header, hgroup, \n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    vertical-align: baseline;\n  }\n  /* HTML5 display-role reset for older browsers */\n  /* prettier-ignore */\n  article, aside, details, figcaption, figure, \n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n    font-size: 16px;\n    /* background-color: ", "; */\n  }\n  body{\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    -webkit-tap-highlight-color: transparent;\n  }\n  ol,\n  ul {\n    list-style: disc;\n    list-style-position: inside;\n  }\n  blockquote,\n  q {\n    quotes: none;\n  }\n  blockquote:before,\n  blockquote:after,\n  q:before,\n  q:after {\n    content: \"\";\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n  a {\n    color: inherit;\n    text-decoration: none;\n  }\n  [role=\"button\"] {\n    cursor: pointer;\n  }\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n  * {\n    font-family: 'SourceHanSansCN', sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  /* Number */\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  input[type=number] {\n    -moz-appearance: textfield;\n  }\n\n  /* Scrollbar */\n  ::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ", "; \n    border-radius: 8px;\n  }\n  ::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 5px ", "; \n    border-radius: 10px;\n  }\n\n  /* Slider */ \n  input[type=range] {\n    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */\n    width: 100%; /* Specific width is required for Firefox. */\n    background: transparent; /* Otherwise white in Chrome */\n  }\n  input[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n  }\n  input[type=range]:focus {\n    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */\n  }\n  input[type=range]::-ms-track {\n    width: 100%;\n    cursor: pointer;\n    /* Hides the slider so custom styles can be added */\n    background: transparent; \n    border-color: transparent;\n    color: transparent;\n  }\n  .show-media-lg {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-md {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-nav {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-sm {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xl {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .show-media-xs {\n    display: none;\n    ", " {\n      display: block;\n    }\n  }\n  .hide-media-lg {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-md {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-nav {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-sm {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xl {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n  .hide-media-xs {\n    display: block;\n    ", " {\n      display: none;\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.backgroundPage;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.textSubtle;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.input;
}, mediaQueries.lg, mediaQueries.md, mediaQueries.nav, mediaQueries.sm, mediaQueries.xl, mediaQueries.xs, mediaQueries.lg, mediaQueries.md, mediaQueries.nav, mediaQueries.sm, mediaQueries.xl, mediaQueries.xs);
var templateObject_1$v;

// Components
var ConnectorNames;
(function (ConnectorNames) {
    ConnectorNames["Injected"] = "injected";
    ConnectorNames["WalletConnect"] = "walletconnect";
    ConnectorNames["BSC"] = "bsc";
})(ConnectorNames || (ConnectorNames = {}));

var ToastsContext = React.createContext(undefined);
var ToastsProvider = function (_a) {
    var children = _a.children;
    var _b = tslib.__read(React.useState([]), 2), toasts = _b[0], setToasts = _b[1];
    var toast = React.useCallback(function (_a) {
        var title = _a.title, description = _a.description, type = _a.type, custom = _a.custom, ttl = _a.ttl, hideRemove = _a.hideRemove, width = _a.width, stackSpacing = _a.stackSpacing;
        var id = title ? lodash.kebabCase(title) : lodash.kebabCase("" + +new Date());
        setToasts(function (prevToasts) {
            // Remove any existing toasts with the same id
            var currentToasts = prevToasts.filter(function (prevToast) { return prevToast.id !== id; });
            return tslib.__spreadArray([
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
            ], tslib.__read(currentToasts));
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
    return (jsxRuntime.jsx(ToastsContext.Provider, tslib.__assign({ value: { toasts: toasts, clear: clear, remove: remove, toastError: toastError, toastInfo: toastInfo, toastSuccess: toastSuccess, toastWarning: toastWarning, toastCustom: toastCustom } }, { children: children }), void 0));
};

var useToast = function () {
    var toastContext = React.useContext(ToastsContext);
    if (toastContext === undefined) {
        throw new Error('Toasts context undefined');
    }
    return toastContext;
};

var addTransaction = toolkit.createAction('transactions/addTransaction');
var clearAllTransactions = toolkit.createAction('transactions/clearAllTransactions');
var finalizeTransaction = toolkit.createAction('transactions/finalizeTransaction');
var checkedTransaction = toolkit.createAction('transactions/checkedTransaction');

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
    var dispatch = reactRedux.useDispatch();
    var state = reactRedux.useSelector(function (s) { return s.transactions; });
    var transactions = React.useMemo(function () { var _a; return (chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {}); }, [chainId, state]);
    var _b = useToast(), toastError = _b.toastError, toastSuccess = _b.toastSuccess;
    React.useEffect(function () {
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
                    toast(t("Transaction receipt"), jsxRuntime.jsxs(Flex, tslib.__assign({ flexDirection: "column" }, { children: [jsxRuntime.jsx(Text, { children: (_b = (_a = transactions[hash]) === null || _a === void 0 ? void 0 : _a.summary) !== null && _b !== void 0 ? _b : "Hash: " + hash.slice(0, 8) + "..." + hash.slice(58, 65) }, void 0), chainId && (jsxRuntime.jsx(Link, tslib.__assign({ external: true, href: getBscScanLink(hash, 'transaction', chainId) }, { children: t("View on BscScan") }), void 0))] }), void 0));
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

var Row = styled__default["default"](Box)(templateObject_1$u || (templateObject_1$u = tslib.__makeTemplateObject(["\n  width: ", ";\n  display: flex;\n  padding: 0;\n  align-items: ", ";\n  justify-content: ", ";\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n"], ["\n  width: ", ";\n  display: flex;\n  padding: 0;\n  align-items: ", ";\n  justify-content: ", ";\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n"])), function (_a) {
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
var RowBetween = styled__default["default"](Row)(templateObject_2$h || (templateObject_2$h = tslib.__makeTemplateObject(["\n  justify-content: space-between;\n"], ["\n  justify-content: space-between;\n"])));
styled__default["default"].div(templateObject_3$b || (templateObject_3$b = tslib.__makeTemplateObject(["\n  display: flex;\n  align-items: flex-end;\n"], ["\n  display: flex;\n  align-items: flex-end;\n"])));
var AutoRow = styled__default["default"](Row)(templateObject_4$5 || (templateObject_4$5 = tslib.__makeTemplateObject(["\n  flex-wrap: wrap;\n  margin: ", ";\n  justify-content: ", ";\n\n  & > * {\n    margin: ", " !important;\n  }\n"], ["\n  flex-wrap: wrap;\n  margin: ", ";\n  justify-content: ", ";\n\n  & > * {\n    margin: ", " !important;\n  }\n"])), function (_a) {
    var gap = _a.gap;
    return gap && "-" + gap;
}, function (_a) {
    var justify = _a.justify;
    return justify && justify;
}, function (_a) {
    var gap = _a.gap;
    return gap;
});
var RowFixed = styled__default["default"](Row)(templateObject_5$2 || (templateObject_5$2 = tslib.__makeTemplateObject(["\n  width: fit-content;\n  margin: ", ";\n"], ["\n  width: fit-content;\n  margin: ", ";\n"])), function (_a) {
    var gap = _a.gap;
    return gap && "-" + gap;
});
var templateObject_1$u, templateObject_2$h, templateObject_3$b, templateObject_4$5, templateObject_5$2;

var Column = styled__default["default"].div(templateObject_1$t || (templateObject_1$t = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n"])));
var ColumnCenter = styled__default["default"](Column)(templateObject_2$g || (templateObject_2$g = tslib.__makeTemplateObject(["\n  width: 100%;\n  align-items: center;\n"], ["\n  width: 100%;\n  align-items: center;\n"])));
var AutoColumn = styled__default["default"].div(templateObject_3$a || (templateObject_3$a = tslib.__makeTemplateObject(["\n  display: grid;\n  grid-auto-rows: auto;\n  grid-row-gap: ", ";\n  justify-items: ", ";\n"], ["\n  display: grid;\n  grid-auto-rows: auto;\n  grid-row-gap: ", ";\n  justify-items: ", ";\n"])), function (_a) {
    var gap = _a.gap;
    return (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap;
}, function (_a) {
    var justify = _a.justify;
    return justify && justify;
});
var templateObject_1$t, templateObject_2$g, templateObject_3$a;

/**
 * Does a lookup for an ENS name to find its contenthash.
 */
function useENSContentHash(ensName) {
    var _a, _b, _c;
    var ensNodeArgument = React.useMemo(function () {
        if (!ensName)
            return [undefined];
        try {
            return ensName ? [utils.namehash(ensName)] : [undefined];
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
    var ens = React.useMemo(function () { return (uri ? parseENSAddress(uri) : undefined); }, [uri]);
    var resolvedContentHash = useENSContentHash(ens === null || ens === void 0 ? void 0 : ens.ensName);
    return React.useMemo(function () {
        if (ens) {
            return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash)) : [];
        }
        return uri ? uriToHttp(uri) : [];
    }, [ens, resolvedContentHash.contenthash, uri]);
}

BigNumber__default["default"].config({
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
var CAKE_PER_BLOCK = new BigNumber__default["default"](40);
var BLOCKS_PER_YEAR = new BigNumber__default["default"]((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
new BigNumber__default["default"]((60 / BSC_BLOCK_TIME) * 60 * 24);
CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR);
var BASE_TOKEN_URL = 'https://dsgmetaverse.com/images/tokens/';
dsgswapSdk.BASE_BSC_SCAN_URLS[dsgswapSdk.ChainId.MAINNET];
BIG_TEN.pow(18);
new BigNumber__default["default"](3).div(1000);
new BigNumber__default["default"](1); // 每算力价值多少USD

var getTokenLogoURL = function (address) {
    return "https://assets.trustwalletapp.com/blockchains/smartchain/assets/" + address + "/logo.png";
};
var getSymbolLogoUrl = function (address) { return "" + BASE_TOKEN_URL + address + ".png"; };

var BAD_SRCS = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
var Logo = function (_a) {
    var srcs = _a.srcs, alt = _a.alt, rest = tslib.__rest(_a, ["srcs", "alt"]);
    var _b = tslib.__read(React.useState(0), 2), refresh = _b[1];
    var src = srcs.find(function (s) { return !BAD_SRCS[s]; });
    if (src) {
        return (jsxRuntime.jsx("img", tslib.__assign({}, rest, { alt: alt, src: src, onError: function () {
                console.debug("" + src);
                if (src)
                    BAD_SRCS[src] = true;
                refresh(function (i) { return i + 1; });
            } }), void 0));
    }
    return jsxRuntime.jsx(Icon$5, tslib.__assign({}, rest), void 0);
};

var StyledLogo = styled__default["default"](Logo)(templateObject_1$s || (templateObject_1$s = tslib.__makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n"], ["\n  width: ", ";\n  height: ", ";\n"])), function (_a) {
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
    var ETHER = dsgswapSdk.getActiveETHERWidthChainId();
    var srcs = React.useMemo(function () {
        if (currency === ETHER)
            return [
                getSymbolLogoUrl(ETHER.symbol)
            ];
        if (currency instanceof dsgswapSdk.Token) {
            if (currency instanceof WrappedTokenInfo) {
                return tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(uriLocations)), [getSymbolLogoUrl(currency.address), getTokenLogoURL(currency.address)]);
            }
            return [getSymbolLogoUrl(currency.address), getTokenLogoURL(currency.address)];
        }
        if (symbol)
            return [getSymbolLogoUrl(symbol)];
        return [];
    }, [currency, uriLocations, ETHER, symbol]);
    // if (currency === ETHER) {
    //   return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
    // }
    return jsxRuntime.jsx(StyledLogo, { size: size, srcs: srcs, alt: ((_b = currency === null || currency === void 0 ? void 0 : currency.symbol) !== null && _b !== void 0 ? _b : 'token') + " logo", style: style }, void 0);
}
var templateObject_1$s;

var Wrapper$5 = styled__default["default"].div(templateObject_1$r || (templateObject_1$r = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  margin-right: ", ";\n"], ["\n  display: flex;\n  flex-direction: row;\n  margin-right: ", ";\n"])), function (_a) {
    var margin = _a.margin;
    return margin && '4px';
});
function DoubleCurrencyLogo(_a) {
    var currency0 = _a.currency0, currency1 = _a.currency1, _b = _a.size, size = _b === void 0 ? 20 : _b, _c = _a.margin, margin = _c === void 0 ? false : _c;
    return (jsxRuntime.jsxs(Wrapper$5, tslib.__assign({ margin: margin }, { children: [currency0 && jsxRuntime.jsx(CurrencyLogo, { currency: currency0, size: size.toString() + "px", style: { marginRight: '4px' } }, void 0), currency1 && jsxRuntime.jsx(CurrencyLogo, { currency: currency1, size: size.toString() + "px" }, void 0)] }), void 0));
}
var templateObject_1$r;

var StyledListLogo = styled__default["default"](Logo)(templateObject_1$q || (templateObject_1$q = tslib.__makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n"], ["\n  width: ", ";\n  height: ", ";\n"])), function (_a) {
    var size = _a.size;
    return size;
}, function (_a) {
    var size = _a.size;
    return size;
});
function ListLogo(_a) {
    var logoURI = _a.logoURI, style = _a.style, _b = _a.size, size = _b === void 0 ? '24px' : _b, alt = _a.alt;
    var srcs = useHttpLocations(logoURI);
    return jsxRuntime.jsx(StyledListLogo, { alt: alt, size: size, srcs: srcs, style: style }, void 0);
}
var templateObject_1$q;

var DetailsFooter = styled__default["default"].div(templateObject_1$p || (templateObject_1$p = tslib.__makeTemplateObject(["\n  padding: 8px 0;\n  width: 100%;\n  max-width: 400px;\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n  color: ", ";\n  background-color: ", ";\n  text-align: center;\n"], ["\n  padding: 8px 0;\n  width: 100%;\n  max-width: 400px;\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n  color: ", ";\n  background-color: ", ";\n  text-align: center;\n"])), function (_a) {
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
    return (jsxRuntime.jsx(Modal, tslib.__assign({ title: "Unsupported Assets", maxWidth: "420px", onDismiss: onDismiss }, { children: jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "lg" }, { children: [tokens.map(function (token) {
                    var _a;
                    return (token &&
                        unsupportedTokens &&
                        Object.keys(unsupportedTokens).includes(token.address) && (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "10px" }, { children: [jsxRuntime.jsxs(AutoRow, tslib.__assign({ gap: "5px", align: "center" }, { children: [jsxRuntime.jsx(CurrencyLogo, { currency: token, size: "24px" }, void 0), jsxRuntime.jsx(Text, { children: token.symbol }, void 0)] }), void 0), chainId && (jsxRuntime.jsx(Link, tslib.__assign({ external: true, small: true, color: "primaryDark", href: getBscScanLink(token.address, 'address', chainId) }, { children: token.address }), void 0))] }), (_a = token.address) === null || _a === void 0 ? void 0 : _a.concat('not-supported'))));
                }), jsxRuntime.jsx(AutoColumn, tslib.__assign({ gap: "lg" }, { children: jsxRuntime.jsx(Text, { children: "Some assets are not available through this interface because they may not work well with our smart contract or we are unable to allow trading for legal reasons." }, void 0) }), void 0)] }), void 0) }), void 0));
};
function UnsupportedCurrencyFooter(_a) {
    var currencies = _a.currencies;
    var _b = tslib.__read(useModal(jsxRuntime.jsx(UnsupportedModal, { currencies: currencies }, void 0)), 1), onPresentModal = _b[0];
    return (jsxRuntime.jsx(DetailsFooter, { children: jsxRuntime.jsx(Button, tslib.__assign({ variant: "text", onClick: onPresentModal }, { children: "Read more about unsupported assets" }), void 0) }, void 0));
}
var templateObject_1$p;

var SwapWarningTokens = {
// safemoon,
// bondly,
};

var Dots = styled__default["default"].span(templateObject_1$o || (templateObject_1$o = tslib.__makeTemplateObject(["\n  &::after {\n    display: inline-block;\n    animation: ellipsis 1.25s infinite;\n    content: '.';\n    width: 1em;\n    text-align: left;\n  }\n  @keyframes ellipsis {\n    0% {\n      content: '.';\n    }\n    33% {\n      content: '..';\n    }\n    66% {\n      content: '...';\n    }\n  }\n"], ["\n  &::after {\n    display: inline-block;\n    animation: ellipsis 1.25s infinite;\n    content: '.';\n    width: 1em;\n    text-align: left;\n  }\n  @keyframes ellipsis {\n    0% {\n      content: '.';\n    }\n    33% {\n      content: '..';\n    }\n    66% {\n      content: '...';\n    }\n  }\n"])));
var templateObject_1$o;

var InputPanel$1 = styled__default["default"].div(templateObject_1$n || (templateObject_1$n = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: 1.25rem;\n  background-color: ", ";\n  z-index: 1;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: 1.25rem;\n  background-color: ", ";\n  z-index: 1;\n  width: 100%;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.backgroundAlt;
});
var ContainerRow = styled__default["default"].div(templateObject_2$f || (templateObject_2$f = tslib.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 1.25rem;\n  border: 1px solid ", ";\n  transition: border-color 300ms ", ",\n    color 500ms ", ";\n  background-color: ", ";\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 1.25rem;\n  border: 1px solid ", ";\n  transition: border-color 300ms ", ",\n    color 500ms ", ";\n  background-color: ", ";\n"])), function (_a) {
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
var InputContainer = styled__default["default"].div(templateObject_3$9 || (templateObject_3$9 = tslib.__makeTemplateObject(["\n  flex: 1;\n  padding: 1rem;\n"], ["\n  flex: 1;\n  padding: 1rem;\n"])));
var Input$1 = styled__default["default"].input(templateObject_4$4 || (templateObject_4$4 = tslib.__makeTemplateObject(["\n  font-size: 1.25rem;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  width: 0;\n  background-color: ", ";\n  transition: color 300ms ", ";\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 500;\n  width: 100%;\n  ::placeholder {\n    color: ", ";\n  }\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"], ["\n  font-size: 1.25rem;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  width: 0;\n  background-color: ", ";\n  transition: color 300ms ", ";\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 500;\n  width: 100%;\n  ::placeholder {\n    color: ", ";\n  }\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"])), function (_a) {
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
    var handleInput = React.useCallback(function (event) {
        var input = event.target.value;
        var withoutSpaces = input.replace(/\s+/g, '');
        onChange(withoutSpaces);
    }, [onChange]);
    var error = Boolean(value.length > 0 && !loading && !address);
    return (jsxRuntime.jsx(InputPanel$1, tslib.__assign({ id: id }, { children: jsxRuntime.jsx(ContainerRow, tslib.__assign({ error: error }, { children: jsxRuntime.jsx(InputContainer, { children: jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "md" }, { children: [jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsx(Text, { children: t('Recipient') }, void 0), address && chainId && (jsxRuntime.jsxs(Link, tslib.__assign({ external: true, small: true, href: getBscScanLink(name !== null && name !== void 0 ? name : address, 'address', chainId) }, { children: ["(", t('View on BscScan'), ")"] }), void 0))] }, void 0), jsxRuntime.jsx(Input$1, { className: "recipient-address-input", type: "text", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", placeholder: t('Wallet Address or ENS name'), error: error, pattern: "^(0x[a-fA-F0-9]{40})$", onChange: handleInput, value: value }, void 0)] }), void 0) }, void 0) }), void 0) }), void 0));
}
var templateObject_1$n, templateObject_2$f, templateObject_3$9, templateObject_4$4;

var Card = styled__default["default"](Box)(templateObject_1$m || (templateObject_1$m = tslib.__makeTemplateObject(["\n  width: ", ";\n  border-radius: 16px;\n  padding: 1.25rem;\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n"], ["\n  width: ", ";\n  border-radius: 16px;\n  padding: 1.25rem;\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n"])), function (_a) {
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
styled__default["default"](Card)(templateObject_2$e || (templateObject_2$e = tslib.__makeTemplateObject(["\n  border: 1px solid ", ";\n  background-color: ", ";\n"], ["\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.background;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.backgroundAlt;
});
var LightGreyCard = styled__default["default"](Card)(templateObject_3$8 || (templateObject_3$8 = tslib.__makeTemplateObject(["\n  border: 1px solid ", ";\n  background-color: ", ";\n"], ["\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.cardBorder;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.background;
});
var GreyCard = styled__default["default"](Card)(templateObject_4$3 || (templateObject_4$3 = tslib.__makeTemplateObject(["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.dropdown;
});
var templateObject_1$m, templateObject_2$e, templateObject_3$8, templateObject_4$3;

// Set of helper functions to facilitate wallet setup
/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
var registerToken = function (tokenAddress, tokenSymbol, tokenDecimals) { return tslib.__awaiter(void 0, void 0, void 0, function () {
    var tokenAdded;
    return tslib.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, window.ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: tokenAddress,
                            symbol: tokenSymbol,
                            decimals: tokenDecimals,
                            image: "" + BASE_TOKEN_URL + tokenAddress + ".png",
                        },
                    },
                })];
            case 1:
                tokenAdded = _a.sent();
                return [2 /*return*/, tokenAdded];
        }
    });
}); };

var Wrapper$4 = styled__default["default"].div(templateObject_1$l || (templateObject_1$l = tslib.__makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var Section = styled__default["default"](AutoColumn)(templateObject_2$d || (templateObject_2$d = tslib.__makeTemplateObject(["\n  padding: 24px;\n"], ["\n  padding: 24px;\n"])));
var ConfirmedIcon = styled__default["default"](ColumnCenter)(templateObject_3$7 || (templateObject_3$7 = tslib.__makeTemplateObject(["\n  padding: 24px 0;\n"], ["\n  padding: 24px 0;\n"])));
function ConfirmationPendingContent(_a) {
    var pendingText = _a.pendingText;
    var t = useTranslation().t;
    return (jsxRuntime.jsxs(Wrapper$4, { children: [jsxRuntime.jsx(ConfirmedIcon, { children: jsxRuntime.jsx(Spinner, {}, void 0) }, void 0), jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "12px", justify: "center" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "20px" }, { children: t('Waiting For Confirmation') }), void 0), jsxRuntime.jsx(AutoColumn, tslib.__assign({ gap: "12px", justify: "center" }, { children: jsxRuntime.jsx(Text, tslib.__assign({ bold: true, small: true, textAlign: "center" }, { children: pendingText }), void 0) }), void 0), jsxRuntime.jsx(Text, tslib.__assign({ small: true, color: "textSubtle", textAlign: "center" }, { children: t('Confirm this transaction in your wallet') }), void 0)] }), void 0)] }, void 0));
}
function TransactionSubmittedContent(_a) {
    var _b;
    var onDismiss = _a.onDismiss, chainId = _a.chainId, hash = _a.hash, currencyToAdd = _a.currencyToAdd;
    var library = useActiveWeb3React().library;
    var t = useTranslation().t;
    var token = wrappedCurrency(currencyToAdd, chainId);
    return (jsxRuntime.jsx(Wrapper$4, { children: jsxRuntime.jsxs(Section, { children: [jsxRuntime.jsx(ConfirmedIcon, { children: jsxRuntime.jsx(Icon$c, { strokeWidth: 0.5, width: "90px", color: "primary" }, void 0) }, void 0), jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "12px", justify: "center" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "20px" }, { children: t('Transaction Submitted') }), void 0), chainId && hash && (jsxRuntime.jsx(Link, tslib.__assign({ external: true, small: true, href: getBscScanLink(hash, 'transaction', chainId) }, { children: t('View on BscScan') }), void 0)), currencyToAdd && ((_b = library === null || library === void 0 ? void 0 : library.provider) === null || _b === void 0 ? void 0 : _b.isMetaMask) && (jsxRuntime.jsx(Button, tslib.__assign({ variant: "tertiary", mt: "12px", width: "fit-content", onClick: function () { return registerToken(token.address, token.symbol, token.decimals); } }, { children: jsxRuntime.jsxs(RowFixed, { children: [t('Add %asset% to Metamask', { asset: currencyToAdd.symbol }), jsxRuntime.jsx(Icon$3, { width: "16px", ml: "6px" }, void 0)] }, void 0) }), void 0)), jsxRuntime.jsx(Button, tslib.__assign({ onClick: onDismiss, mt: "20px" }, { children: t('Close') }), void 0)] }), void 0)] }, void 0) }, void 0));
}
function ConfirmationModalContent(_a) {
    var bottomContent = _a.bottomContent, topContent = _a.topContent;
    return (jsxRuntime.jsxs(Wrapper$4, { children: [jsxRuntime.jsx(Box, { children: topContent() }, void 0), jsxRuntime.jsx(Box, { children: bottomContent() }, void 0)] }, void 0));
}
function TransactionErrorContent(_a) {
    var message = _a.message, onDismiss = _a.onDismiss;
    var t = useTranslation().t;
    return (jsxRuntime.jsxs(Wrapper$4, { children: [jsxRuntime.jsxs(AutoColumn, tslib.__assign({ justify: "center" }, { children: [jsxRuntime.jsx(Icon$f, { color: "failure", width: "64px" }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ color: "failure", style: { textAlign: 'center', width: '85%' } }, { children: message }), void 0)] }), void 0), jsxRuntime.jsx(Flex, tslib.__assign({ justifyContent: "center", pt: "24px" }, { children: jsxRuntime.jsx(Button, tslib.__assign({ onClick: onDismiss }, { children: t('Dismiss') }), void 0) }), void 0)] }, void 0));
}
var TransactionConfirmationModal = function (_a) {
    var title = _a.title, onDismiss = _a.onDismiss, customOnDismiss = _a.customOnDismiss, attemptingTxn = _a.attemptingTxn, hash = _a.hash, pendingText = _a.pendingText, content = _a.content, currencyToAdd = _a.currencyToAdd;
    var chainId = useActiveWeb3React().chainId;
    var handleDismiss = React.useCallback(function () {
        if (customOnDismiss) {
            customOnDismiss();
        }
        onDismiss();
    }, [customOnDismiss, onDismiss]);
    if (!chainId)
        return null;
    return (jsxRuntime.jsx(Modal, tslib.__assign({ title: title, headerBackground: "gradients.cardHeader", onDismiss: handleDismiss }, { children: attemptingTxn ? (jsxRuntime.jsx(ConfirmationPendingContent, { pendingText: pendingText }, void 0)) : hash ? (jsxRuntime.jsx(TransactionSubmittedContent, { chainId: chainId, hash: hash, onDismiss: onDismiss, currencyToAdd: currencyToAdd }, void 0)) : (content()) }), void 0));
};
var templateObject_1$l, templateObject_2$d, templateObject_3$7;

var QuestionWrapper = styled__default["default"].div(templateObject_1$k || (templateObject_1$k = tslib.__makeTemplateObject(["\n  :hover,\n  :focus {\n    opacity: 0.7;\n  }\n"], ["\n  :hover,\n  :focus {\n    opacity: 0.7;\n  }\n"])));
var QuestionHelper = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? "textSubtle" : _b, _c = _a.trigger, trigger = _c === void 0 ? 'hover' : _c, _d = _a.placement, placement = _d === void 0 ? 'right-end' : _d, props = tslib.__rest(_a, ["text", "color", "trigger", "placement"]);
    var _e = useTooltip(text, { placement: placement, trigger: trigger }), targetRef = _e.targetRef, tooltip = _e.tooltip, tooltipVisible = _e.tooltipVisible;
    return (jsxRuntime.jsxs(Box, tslib.__assign({}, props, { children: [tooltipVisible && tooltip, jsxRuntime.jsx(QuestionWrapper, tslib.__assign({ ref: targetRef }, { children: jsxRuntime.jsx(Icon$5, { color: color, width: "16px" }, void 0) }), void 0)] }), void 0));
};
var templateObject_1$k;

var Wrapper$3 = styled__default["default"].div(templateObject_1$j || (templateObject_1$j = tslib.__makeTemplateObject(["\n  position: relative;\n  padding: 20px;\n  padding-top: 0;\n"], ["\n  position: relative;\n  padding: 20px;\n  padding-top: 0;\n"])));
var ArrowWrapper = styled__default["default"].div(templateObject_3$6 || (templateObject_3$6 = tslib.__makeTemplateObject(["\n  padding: 2px;\n\n  ", "\n"], ["\n  padding: 2px;\n\n  ", "\n"])), function (_a) {
    var clickable = _a.clickable;
    return clickable
        ? styled.css(templateObject_2$c || (templateObject_2$c = tslib.__makeTemplateObject(["\n          :hover {\n            cursor: pointer;\n            opacity: 0.8;\n          }\n        "], ["\n          :hover {\n            cursor: pointer;\n            opacity: 0.8;\n          }\n        "]))) : null;
});
var ErrorText = styled__default["default"](Text)(templateObject_4$2 || (templateObject_4$2 = tslib.__makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (_a) {
    var theme = _a.theme, severity = _a.severity;
    return severity === 3 || severity === 4
        ? theme.colors.failure
        : severity === 2
            ? theme.colors.warning
            : severity === 1
                ? theme.colors.text
                : theme.colors.success;
});
var StyledBalanceMaxMini = styled__default["default"].button(templateObject_5$1 || (templateObject_5$1 = tslib.__makeTemplateObject(["\n  height: 22px;\n  width: 22px;\n  background-color: ", ";\n  border: none;\n  border-radius: 50%;\n  padding: 0.2rem;\n  font-size: 0.875rem;\n  font-weight: 400;\n  margin-left: 0.4rem;\n  cursor: pointer;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  float: right;\n\n  :hover {\n    background-color: ", ";\n  }\n  :focus {\n    background-color: ", ";\n    outline: none;\n  }\n"], ["\n  height: 22px;\n  width: 22px;\n  background-color: ", ";\n  border: none;\n  border-radius: 50%;\n  padding: 0.2rem;\n  font-size: 0.875rem;\n  font-weight: 400;\n  margin-left: 0.4rem;\n  cursor: pointer;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  float: right;\n\n  :hover {\n    background-color: ", ";\n  }\n  :focus {\n    background-color: ", ";\n    outline: none;\n  }\n"])), function (_a) {
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
var TruncatedText = styled__default["default"](Text).attrs({ ellipsis: true })(templateObject_6 || (templateObject_6 = tslib.__makeTemplateObject(["\n  width: 220px;\n"], ["\n  width: 220px;\n"])));
var SwapCallbackErrorInner = styled__default["default"].div(templateObject_7 || (templateObject_7 = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 1rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.825rem;\n  width: 100%;\n  padding: 3rem 1.25rem 1rem 1rem;\n  margin-top: -2rem;\n  color: ", ";\n  z-index: -1;\n  p {\n    padding: 0;\n    margin: 0;\n    font-weight: 500;\n  }\n"], ["\n  background-color: ", ";\n  border-radius: 1rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.825rem;\n  width: 100%;\n  padding: 3rem 1.25rem 1rem 1rem;\n  margin-top: -2rem;\n  color: ", ";\n  z-index: -1;\n  p {\n    padding: 0;\n    margin: 0;\n    font-weight: 500;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.failure + "33";
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.failure;
});
var SwapCallbackErrorInnerAlertTriangle = styled__default["default"].div(templateObject_8 || (templateObject_8 = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 12px;\n  border-radius: 12px;\n  min-width: 48px;\n  height: 48px;\n"], ["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 12px;\n  border-radius: 12px;\n  min-width: 48px;\n  height: 48px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.failure + "33";
});
function SwapCallbackError(_a) {
    var error = _a.error;
    return (jsxRuntime.jsxs(SwapCallbackErrorInner, { children: [jsxRuntime.jsx(SwapCallbackErrorInnerAlertTriangle, { children: jsxRuntime.jsx(Icon$f, { width: "24px" }, void 0) }, void 0), jsxRuntime.jsx("p", { children: error }, void 0)] }, void 0));
}
var SwapShowAcceptChanges = styled__default["default"](AutoColumn)(templateObject_9 || (templateObject_9 = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  padding: 0.5rem;\n  border-radius: 12px;\n  margin-top: 8px;\n"], ["\n  background-color: ", ";\n  padding: 0.5rem;\n  border-radius: 12px;\n  margin-top: 8px;\n"])), function (_a) {
    var theme = _a.theme;
    return "" + theme.colors.input;
});
var templateObject_1$j, templateObject_2$c, templateObject_3$6, templateObject_4$2, templateObject_5$1, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

/**
 * Formatted version of price impact text with warning colors
 */
function FormattedPriceImpact(_a) {
    var priceImpact = _a.priceImpact;
    return (jsxRuntime.jsx(ErrorText, tslib.__assign({ fontSize: "14px", severity: warningSeverity(priceImpact) }, { children: priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : priceImpact.toFixed(2) + "%") : '-' }), void 0));
}

/**
 * Formatted version of price impact text with warning colors
 */
function LiquidityProviderFee() {
    var t = useTranslation().t;
    var nftInfo = dsgswapSdk.getValueWithChainId(dsgswapSdk.SWAP_STAKE_NFT_INFO);
    var swapToken = dsgswapSdk.getValueWithChainId(dsgswapSdk.SWAP_TOKEN);
    var swapvToken = dsgswapSdk.getValueWithChainId(dsgswapSdk.SWAP_V_TOKEN);
    return (jsxRuntime.jsxs(Flex, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px", color: "text" }, { children: t('Fee') }), void 0), jsxRuntime.jsx(QuestionHelper, { text: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(Text, tslib.__assign({ mb: "12px" }, { children: [t('for each trade a 0.3% fee is paid'), ":"] }), void 0), jsxRuntime.jsxs(Text, { children: ["-", t('0.1% to the LP token holders')] }, void 0), jsxRuntime.jsxs(Text, { children: ["-", t('0.04% to the %symbol% stakers', {
                                    symbol: t(nftInfo.name) + " NFT"
                                })] }, void 0), jsxRuntime.jsxs(Text, { children: ["-", t('0.05% buyback %symbol% and burn', {
                                    symbol: swapToken.symbol
                                })] }, void 0), jsxRuntime.jsxs(Text, { children: ["-", t('0.025% buyback %symbol%, then to %symbol% LP', {
                                    symbol: swapToken.symbol
                                })] }, void 0), jsxRuntime.jsxs(Text, { children: ["-", t('0.025% to %symbol% holder', {
                                    symbol: swapvToken.symbol
                                })] }, void 0), jsxRuntime.jsxs(Text, { children: ["-", t('0.06% to operation fund')] }, void 0)] }, void 0), placement: "top-start", ml: "4px" }, void 0)] }, void 0));
}

var SwapModalFooterContainer = styled__default["default"](AutoColumn)(templateObject_1$i || (templateObject_1$i = tslib.__makeTemplateObject(["\n  margin-top: 24px;\n  padding: 16px;\n  border-radius: ", ";\n  border: 1px solid ", ";\n  background-color: ", ";\n"], ["\n  margin-top: 24px;\n  padding: 16px;\n  border-radius: ", ";\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_a) {
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
    var _f = tslib.__read(React.useState(false), 2), showInverted = _f[0], setShowInverted = _f[1];
    var slippageAdjustedAmounts = React.useMemo(function () { return computeSlippageAdjustedAmounts(trade, allowedSlippage); }, [allowedSlippage, trade]);
    var _g = React.useMemo(function () { return computeTradePriceBreakdown(trade); }, [trade]), priceImpactWithoutFee = _g.priceImpactWithoutFee, realizedLPFee = _g.realizedLPFee;
    var severity = warningSeverity(priceImpactWithoutFee);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(SwapModalFooterContainer, { children: [jsxRuntime.jsxs(RowBetween, tslib.__assign({ align: "center" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: t("Price") }), void 0), jsxRuntime.jsxs(Text, tslib.__assign({ fontSize: "14px", style: {
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                    textAlign: 'right',
                                    paddingLeft: '10px',
                                } }, { children: [formatExecutionPrice(trade, showInverted), jsxRuntime.jsx(StyledBalanceMaxMini, tslib.__assign({ onClick: function () { return setShowInverted(!showInverted); } }, { children: jsxRuntime.jsx(Icon$b, { width: "14px" }, void 0) }), void 0)] }), void 0)] }), void 0), jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: trade.tradeType === dsgswapSdk.TradeType.EXACT_INPUT ? t("Minimum received") : t("Maximum sold") }), void 0), jsxRuntime.jsx(QuestionHelper, { text: t("Your transaction will revert if there is a large, unfavorable price movement before it is confirmed."), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: trade.tradeType === dsgswapSdk.TradeType.EXACT_INPUT
                                            ? (_c = (_b = slippageAdjustedAmounts[Field$2.OUTPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(4)) !== null && _c !== void 0 ? _c : '-'
                                            : (_e = (_d = slippageAdjustedAmounts[Field$2.INPUT]) === null || _d === void 0 ? void 0 : _d.toSignificant(4)) !== null && _e !== void 0 ? _e : '-' }), void 0), jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px", marginLeft: "4px" }, { children: trade.tradeType === dsgswapSdk.TradeType.EXACT_INPUT
                                            ? trade.outputAmount.currency.symbol
                                            : trade.inputAmount.currency.symbol }), void 0)] }, void 0)] }, void 0), jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: t("Price Impact") }), void 0), jsxRuntime.jsx(QuestionHelper, { placement: "top-start", text: t("The difference between the market price and your price due to trade size."), ml: "4px" }, void 0)] }, void 0), jsxRuntime.jsx(FormattedPriceImpact, { priceImpact: priceImpactWithoutFee }, void 0)] }, void 0), jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsx(LiquidityProviderFee, {}, void 0), jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: realizedLPFee ? (realizedLPFee === null || realizedLPFee === void 0 ? void 0 : realizedLPFee.toSignificant(6)) + " " + trade.inputAmount.currency.symbol : '-' }), void 0)] }, void 0)] }, void 0), jsxRuntime.jsxs(AutoRow, { children: [jsxRuntime.jsx(Button, tslib.__assign({ variant: severity > 2 ? 'danger' : 'primary', onClick: onConfirm, disabled: disabledConfirm, mt: "12px", id: "confirm-swap-or-send", width: "100%" }, { children: severity > 2 ? t('Swap Anyway') : t('Confirm Swap') }), void 0), swapErrorMessage ? jsxRuntime.jsx(SwapCallbackError, { error: swapErrorMessage }, void 0) : null] }, void 0)] }, void 0));
}
var templateObject_1$i;

function SwapModalHeader(_a) {
    var _b, _c;
    var trade = _a.trade, allowedSlippage = _a.allowedSlippage, recipient = _a.recipient, showAcceptChanges = _a.showAcceptChanges, onAcceptChanges = _a.onAcceptChanges;
    var t = useTranslation().t;
    var slippageAdjustedAmounts = React.useMemo(function () { return computeSlippageAdjustedAmounts(trade, allowedSlippage); }, [trade, allowedSlippage]);
    var priceImpactWithoutFee = React.useMemo(function () { return computeTradePriceBreakdown(trade); }, [trade]).priceImpactWithoutFee;
    var priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
    return (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "md" }, { children: [jsxRuntime.jsxs(RowBetween, tslib.__assign({ align: "flex-end" }, { children: [jsxRuntime.jsxs(RowFixed, tslib.__assign({ gap: "0px" }, { children: [jsxRuntime.jsx(CurrencyLogo, { currency: trade.inputAmount.currency, size: "24px", style: { marginRight: '12px' } }, void 0), jsxRuntime.jsx(TruncatedText, tslib.__assign({ fontSize: "24px", color: showAcceptChanges && trade.tradeType === dsgswapSdk.TradeType.EXACT_OUTPUT ? 'primary' : 'text' }, { children: trade.inputAmount.toSignificant(6) }), void 0)] }), void 0), jsxRuntime.jsx(RowFixed, tslib.__assign({ gap: "0px" }, { children: jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "24px", ml: "10px" }, { children: trade.inputAmount.currency.symbol }), void 0) }), void 0)] }), void 0), jsxRuntime.jsx(RowFixed, { children: jsxRuntime.jsx(Icon$d, { width: "16px", ml: "4px" }, void 0) }, void 0), jsxRuntime.jsxs(RowBetween, tslib.__assign({ align: "flex-end" }, { children: [jsxRuntime.jsxs(RowFixed, tslib.__assign({ gap: "0px" }, { children: [jsxRuntime.jsx(CurrencyLogo, { currency: trade.outputAmount.currency, size: "24px", style: { marginRight: '12px' } }, void 0), jsxRuntime.jsx(TruncatedText, tslib.__assign({ fontSize: "24px", color: priceImpactSeverity > 2
                                    ? 'failure'
                                    : showAcceptChanges && trade.tradeType === dsgswapSdk.TradeType.EXACT_INPUT
                                        ? 'primary'
                                        : 'text' }, { children: trade.outputAmount.toSignificant(6) }), void 0)] }), void 0), jsxRuntime.jsx(RowFixed, tslib.__assign({ gap: "0px" }, { children: jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "24px", ml: "10px" }, { children: trade.outputAmount.currency.symbol }), void 0) }), void 0)] }), void 0), showAcceptChanges ? (jsxRuntime.jsx(SwapShowAcceptChanges, tslib.__assign({ justify: "flex-start", gap: "0px" }, { children: jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Icon$f, { mr: "8px" }, void 0), jsxRuntime.jsxs(Text, tslib.__assign({ bold: true }, { children: [" ", t('Price Updated')] }), void 0)] }, void 0), jsxRuntime.jsx(Button, tslib.__assign({ onClick: onAcceptChanges }, { children: t('Accept') }), void 0)] }, void 0) }), void 0)) : null, jsxRuntime.jsx(AutoColumn, tslib.__assign({ justify: "flex-start", gap: "sm", style: { padding: '24px 0 0 0px' } }, { children: trade.tradeType === dsgswapSdk.TradeType.EXACT_INPUT ? (jsxRuntime.jsxs(Text, tslib.__assign({ small: true, color: "textSubtle", textAlign: "left", style: { width: '100%' } }, { children: [t('Output is estimated. You will receive at least'), "\u00A0", jsxRuntime.jsxs("b", { children: [(_b = slippageAdjustedAmounts[Field$2.OUTPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(6), " ", trade.outputAmount.currency.symbol] }, void 0), "\u00A0", t('or the transaction will revert.')] }), void 0)) : (jsxRuntime.jsxs(Text, tslib.__assign({ small: true, color: "textSubtle", textAlign: "left", style: { width: '100%' } }, { children: [t('Input is estimated. You will sell at most'), "\u00A0", jsxRuntime.jsxs("b", { children: [(_c = slippageAdjustedAmounts[Field$2.INPUT]) === null || _c === void 0 ? void 0 : _c.toSignificant(6), " ", trade.inputAmount.currency.symbol] }, void 0), "\u00A0", t('or the transaction will revert.')] }), void 0)) }), void 0), recipient !== null ? (jsxRuntime.jsx(AutoColumn, tslib.__assign({ justify: "flex-start", gap: "sm", style: { padding: '12px 0 0 0px' } }, { children: jsxRuntime.jsxs(Text, tslib.__assign({ color: "textSubtle" }, { children: [t('Output will be sent to'), ' ', jsxRuntime.jsx("b", tslib.__assign({ title: recipient }, { children: isAddress(recipient) ? shortenAddress(recipient) : recipient }), void 0)] }), void 0) }), void 0)) : null] }), void 0));
}

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA, tradeB) {
    return (tradeA.tradeType !== tradeB.tradeType ||
        !dsgswapSdk.currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
        !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
        !dsgswapSdk.currencyEquals(tradeA.outputAmount.currency, tradeB.outputAmount.currency) ||
        !tradeA.outputAmount.equalTo(tradeB.outputAmount));
}
var ConfirmSwapModal = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var trade = _a.trade, originalTrade = _a.originalTrade, onAcceptChanges = _a.onAcceptChanges, allowedSlippage = _a.allowedSlippage, onConfirm = _a.onConfirm, onDismiss = _a.onDismiss, customOnDismiss = _a.customOnDismiss, recipient = _a.recipient, swapErrorMessage = _a.swapErrorMessage, attemptingTxn = _a.attemptingTxn, txHash = _a.txHash;
    var showAcceptChanges = React.useMemo(function () { return Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)); }, [originalTrade, trade]);
    var t = useTranslation().t;
    var modalHeader = React.useCallback(function () {
        return trade ? (jsxRuntime.jsx(SwapModalHeader, { trade: trade, allowedSlippage: allowedSlippage, recipient: recipient, showAcceptChanges: showAcceptChanges, onAcceptChanges: onAcceptChanges }, void 0)) : null;
    }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade]);
    var modalBottom = React.useCallback(function () {
        return trade ? (jsxRuntime.jsx(SwapModalFooter, { onConfirm: onConfirm, trade: trade, disabledConfirm: showAcceptChanges, swapErrorMessage: swapErrorMessage, allowedSlippage: allowedSlippage }, void 0)) : null;
    }, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade]);
    // text to show while loading
    var pendingText = t('Swapping %amountA% %symbolA% for %amountB% %symbolB%', {
        amountA: (_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.toSignificant(6)) !== null && _c !== void 0 ? _c : '',
        symbolA: (_f = (_e = (_d = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _d === void 0 ? void 0 : _d.currency) === null || _e === void 0 ? void 0 : _e.symbol) !== null && _f !== void 0 ? _f : '',
        amountB: (_h = (_g = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _g === void 0 ? void 0 : _g.toSignificant(6)) !== null && _h !== void 0 ? _h : '',
        symbolB: (_l = (_k = (_j = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _j === void 0 ? void 0 : _j.currency) === null || _k === void 0 ? void 0 : _k.symbol) !== null && _l !== void 0 ? _l : '',
    });
    var confirmationContent = React.useCallback(function () {
        return swapErrorMessage ? (jsxRuntime.jsx(TransactionErrorContent, { onDismiss: onDismiss, message: swapErrorMessage }, void 0)) : (jsxRuntime.jsx(ConfirmationModalContent, { topContent: modalHeader, bottomContent: modalBottom }, void 0));
    }, [onDismiss, modalBottom, modalHeader, swapErrorMessage]);
    return (jsxRuntime.jsx(TransactionConfirmationModal, { title: t('Confirm Swap'), onDismiss: onDismiss, customOnDismiss: customOnDismiss, attemptingTxn: attemptingTxn, hash: txHash, content: confirmationContent, pendingText: pendingText, currencyToAdd: trade === null || trade === void 0 ? void 0 : trade.outputAmount.currency }, void 0));
};

/**
 * Returns the previous value of the given value
 *
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
var usePreviousValue = function (value) {
    var ref = React.useRef();
    React.useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};

var ErrorBoundary = /** @class */ (function (_super) {
    tslib.__extends(ErrorBoundary, _super);
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
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: children }, void 0);
    };
    return ErrorBoundary;
}(React__default["default"].Component));
var FlexAutoWarpper = function (_a) {
    var children = _a.children, _b = _a.lineMax, lineMax = _b === void 0 ? 6 : _b, _c = _a.flatNum, flatNum = _c === void 0 ? 3 : _c;
    var _d = tslib.__read(React.useState(0), 2), childrenLength = _d[0], setChildrenLength = _d[1];
    var _e = tslib.__read(React.useState(null), 2), autoDom = _e[0], setAutoDom = _e[1];
    /**
     *
     * @dev 弥补flex布局缺陷
     * flex 换行是会 依据@justifyContent 进行布局
     * 我希望它换的时候从左向右一次对齐第一排排列
     * 所有就出现了这个组件
     * 初步测试成功，暂时没遇到太大问题 能满足需求
     */
    React.useEffect(function () {
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
                return tslib.__assign(tslib.__assign({}, item), { props: tslib.__assign(tslib.__assign({}, item === null || item === void 0 ? void 0 : item.props), { style: tslib.__assign(tslib.__assign({}, (_a = item === null || item === void 0 ? void 0 : item.props) === null || _a === void 0 ? void 0 : _a.style), { visibility: 'hidden', height: 0, minHight: 0, maxHeight: 0, marginTop: 0, marginBottom: 0, paddingBottom: 0, paddingTop: 0 }) }) });
            });
            setAutoDom(InvisibleDoms);
        }
        catch (error) {
            setAutoDom(null);
        }
    }, [children, childrenLength, lineMax, flatNum, setAutoDom]);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(ErrorBoundary, { children: [children, autoDom] }, void 0) }, void 0));
};

var BaseWrapper = styled__default["default"].div(templateObject_1$h || (templateObject_1$h = tslib.__makeTemplateObject(["\n  border: 1px solid ", ";\n  border-radius: 10px;\n  display: flex;\n  padding: 6px;\n  margin-bottom: 4px !important;\n\n  align-items: center;\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n\n  background-color: ", ";\n  opacity: ", ";\n"], ["\n  border: 1px solid ", ";\n  border-radius: 10px;\n  display: flex;\n  padding: 6px;\n  margin-bottom: 4px !important;\n\n  align-items: center;\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n\n  background-color: ", ";\n  opacity: ", ";\n"])), function (_a) {
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
    var ETHER = dsgswapSdk.getActiveETHERWidthChainId();
    var inactiveTokens = useAllTokens();
    return (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "md" }, { children: [jsxRuntime.jsxs(AutoRow, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: t('Common bases') }), void 0), jsxRuntime.jsx(QuestionHelper, { placement: "top-start", text: t('These tokens are commonly paired with other tokens.'), ml: "4px" }, void 0)] }, void 0), jsxRuntime.jsx(AutoRow, tslib.__assign({ gap: "auto" }, { children: jsxRuntime.jsxs(FlexAutoWarpper, tslib.__assign({ lineMax: 4 }, { children: [jsxRuntime.jsxs(BaseWrapper, tslib.__assign({ onClick: function () {
                                if (!selectedCurrency || !dsgswapSdk.currencyEquals(selectedCurrency, ETHER)) {
                                    onSelect(ETHER);
                                }
                            }, disable: selectedCurrency === ETHER }, { children: [jsxRuntime.jsx(CurrencyLogo, { symbol: ETHER.symbol, style: { marginRight: 8 } }, void 0), jsxRuntime.jsx(Text, { children: ETHER === null || ETHER === void 0 ? void 0 : ETHER.symbol }, void 0)] }), void 0), (chainId ? (SUGGESTED_BASES[chainId] || []) : []).map(function (token) {
                            var selected = selectedCurrency instanceof dsgswapSdk.Token && selectedCurrency.address === token.address;
                            return (jsxRuntime.jsxs(BaseWrapper, tslib.__assign({ onClick: function () { return !selected && onSelect(token); }, disable: selected }, { children: [jsxRuntime.jsx(CurrencyLogo, { currency: inactiveTokens[token.address] || token, style: { marginRight: 8 } }, void 0), jsxRuntime.jsx(Text, { children: token.symbol }, void 0)] }), token.address));
                        })] }), void 0) }), void 0)] }), void 0));
}
var templateObject_1$h;

var rotate = styled.keyframes(templateObject_1$g || (templateObject_1$g = tslib.__makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var StyledSVG = styled__default["default"].svg(templateObject_2$b || (templateObject_2$b = tslib.__makeTemplateObject(["\n  animation: 2s ", " linear infinite;\n  height: ", ";\n  width: ", ";\n  path {\n    stroke: ", ";\n  }\n"], ["\n  animation: 2s ", " linear infinite;\n  height: ", ";\n  width: ", ";\n  path {\n    stroke: ", ";\n  }\n"
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
    var _b = _a.size, size = _b === void 0 ? '16px' : _b, stroke = _a.stroke, rest = tslib.__rest(_a, ["size", "stroke"]);
    return (jsxRuntime.jsx(StyledSVG, tslib.__assign({ viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", size: size, stroke: stroke }, rest, { children: jsxRuntime.jsx("path", { d: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0) }), void 0));
}
var templateObject_1$g, templateObject_2$b;

var TokenSection = styled__default["default"].div(templateObject_1$f || (templateObject_1$f = tslib.__makeTemplateObject(["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) auto;\n  grid-gap: 16px;\n  align-items: center;\n\n  opacity: ", ";\n"], ["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) auto;\n  grid-gap: 16px;\n  align-items: center;\n\n  opacity: ", ";\n"])), function (_a) {
    var dim = _a.dim;
    return (dim ? '0.4' : '1');
});
var CheckIcon = styled__default["default"](Icon$g)(templateObject_2$a || (templateObject_2$a = tslib.__makeTemplateObject(["\n  height: 16px;\n  width: 16px;\n  margin-right: 6px;\n  stroke: ", ";\n"], ["\n  height: 16px;\n  width: 16px;\n  margin-right: 6px;\n  stroke: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.success;
});
var NameOverflow = styled__default["default"].div(templateObject_3$5 || (templateObject_3$5 = tslib.__makeTemplateObject(["\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 140px;\n  font-size: 12px;\n"], ["\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 140px;\n  font-size: 12px;\n"])));
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
    return (jsxRuntime.jsxs(TokenSection, tslib.__assign({ style: style }, { children: [jsxRuntime.jsx(CurrencyLogo, { currency: token, size: "24px", style: { opacity: dim ? '0.6' : '1' } }, void 0), jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "4px", style: { opacity: dim ? '0.6' : '1' } }, { children: [jsxRuntime.jsxs(AutoRow, { children: [jsxRuntime.jsx(Text, { children: token.symbol }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ color: "textDisabled", ml: "8px" }, { children: jsxRuntime.jsx(NameOverflow, tslib.__assign({ title: token.name }, { children: token.name }), void 0) }), void 0)] }, void 0), list && list.logoURI && (jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsxs(Text, tslib.__assign({ small: true, mr: "4px", color: "textSubtle" }, { children: [t('via'), " ", list.name] }), void 0), jsxRuntime.jsx(ListLogo, { logoURI: list.logoURI, size: "12px" }, void 0)] }, void 0))] }), void 0), !isActive && !isAdded ? (jsxRuntime.jsx(Button, tslib.__assign({ width: "fit-content", onClick: function () {
                    if (setImportToken) {
                        setImportToken(token);
                    }
                    showImportView();
                } }, { children: t('Import') }), void 0)) : (jsxRuntime.jsxs(RowFixed, tslib.__assign({ style: { minWidth: 'fit-content' } }, { children: [jsxRuntime.jsx(CheckIcon, {}, void 0), jsxRuntime.jsx(Text, tslib.__assign({ color: "success" }, { children: "Active" }), void 0)] }), void 0))] }), void 0));
}
var templateObject_1$f, templateObject_2$a, templateObject_3$5;

function currencyKey(currency) {
    return currency instanceof dsgswapSdk.Token ? currency.address : currency === dsgswapSdk.getActiveETHERWidthChainId() ? 'ETHER' : '';
}
var StyledBalanceText = styled__default["default"](Text)(templateObject_1$e || (templateObject_1$e = tslib.__makeTemplateObject(["\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 5rem;\n  text-overflow: ellipsis;\n"], ["\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 5rem;\n  text-overflow: ellipsis;\n"])));
var FixedContentRow = styled__default["default"].div(templateObject_2$9 || (templateObject_2$9 = tslib.__makeTemplateObject(["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-gap: 16px;\n  align-items: center;\n"], ["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-gap: 16px;\n  align-items: center;\n"])));
function Balance(_a) {
    var balance = _a.balance;
    return jsxRuntime.jsx(StyledBalanceText, tslib.__assign({ title: balance.toExact() }, { children: balance.toSignificant(4) }), void 0);
}
var MenuItem = styled__default["default"](RowBetween)(templateObject_3$4 || (templateObject_3$4 = tslib.__makeTemplateObject(["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);\n  grid-gap: 8px;\n  cursor: ", ";\n  pointer-events: ", ";\n  :hover {\n    background-color: ", ";\n  }\n  opacity: ", ";\n"], ["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);\n  grid-gap: 8px;\n  cursor: ", ";\n  pointer-events: ", ";\n  :hover {\n    background-color: ", ";\n  }\n  opacity: ", ";\n"])), function (_a) {
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
    return (jsxRuntime.jsxs(MenuItem, tslib.__assign({ style: style, className: "token-item-" + key, onClick: function () { return (isSelected ? null : onSelect()); }, disabled: isSelected, selected: otherSelected }, { children: [jsxRuntime.jsx(CurrencyLogo, { currency: currency, size: "24px" }, void 0), jsxRuntime.jsxs(Column, { children: [jsxRuntime.jsx(Text, tslib.__assign({ bold: true }, { children: currency.symbol }), void 0), jsxRuntime.jsxs(Text, tslib.__assign({ color: "textSubtle", small: true, ellipsis: true, maxWidth: "200px" }, { children: [!isOnSelectedList && customAdded && 'Added by user •', " ", currency.name] }), void 0)] }, void 0), jsxRuntime.jsx(RowFixed, tslib.__assign({ style: { justifySelf: 'flex-end' } }, { children: balance ? jsxRuntime.jsx(Balance, { balance: balance }, void 0) : account ? jsxRuntime.jsx(CircleLoader, {}, void 0) : null }), void 0)] }), void 0));
}
function CurrencyList(_a) {
    var height = _a.height, currencies = _a.currencies, selectedCurrency = _a.selectedCurrency, onCurrencySelect = _a.onCurrencySelect, otherCurrency = _a.otherCurrency, fixedListRef = _a.fixedListRef, showETH = _a.showETH, showImportView = _a.showImportView, setImportToken = _a.setImportToken, breakIndex = _a.breakIndex;
    var itemData = React.useMemo(function () {
        var formatted = showETH ? tslib.__spreadArray([dsgswapSdk.getActiveETHERWidthChainId()], tslib.__read(currencies)) : currencies;
        if (breakIndex !== undefined) {
            formatted = tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(formatted.slice(0, breakIndex))), [undefined]), tslib.__read(formatted.slice(breakIndex, formatted.length)));
        }
        return formatted;
    }, [breakIndex, currencies, showETH]);
    var chainId = useActiveWeb3React().chainId;
    var t = useTranslation().t;
    var inactiveTokens = useAllInactiveTokens();
    var Row = React.useCallback(function (_a) {
        var data = _a.data, index = _a.index, style = _a.style;
        var currency = data[index];
        var isSelected = Boolean(selectedCurrency && dsgswapSdk.currencyEquals(selectedCurrency, currency));
        var otherSelected = Boolean(otherCurrency && dsgswapSdk.currencyEquals(otherCurrency, currency));
        var handleSelect = function () { return onCurrencySelect(currency); };
        var token = wrappedCurrency(currency, chainId);
        var showImport = inactiveTokens && token && Object.keys(inactiveTokens).includes(token.address);
        if (index === breakIndex || !data) {
            return (jsxRuntime.jsx(FixedContentRow, tslib.__assign({ style: style }, { children: jsxRuntime.jsx(LightGreyCard, tslib.__assign({ padding: "8px 12px", borderRadius: "8px" }, { children: jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsx(Text, tslib.__assign({ small: true }, { children: t('Expanded results from inactive Token Lists') }), void 0), jsxRuntime.jsx(QuestionHelper, { text: t("Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists."), placement: "top-start", ml: "4px" }, void 0)] }, void 0) }), void 0) }), void 0));
        }
        if (showImport && token) {
            return (jsxRuntime.jsx(ImportRow, { style: style, token: token, showImportView: showImportView, setImportToken: setImportToken, dim: true }, void 0));
        }
        return (jsxRuntime.jsx(CurrencyRow, { style: style, currency: currency, isSelected: isSelected, onSelect: handleSelect, otherSelected: otherSelected }, void 0));
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
    var itemKey = React.useCallback(function (index, data) { return currencyKey(data[index]); }, []);
    return (jsxRuntime.jsx(reactWindow.FixedSizeList, tslib.__assign({ height: height, ref: fixedListRef, width: "100%", itemData: itemData, itemCount: itemData.length, itemSize: 56, itemKey: itemKey }, { children: Row }), void 0));
}
var templateObject_1$e, templateObject_2$9, templateObject_3$4;

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
    var comparator = React.useMemo(function () { return getTokenComparator(balances !== null && balances !== void 0 ? balances : {}); }, [balances]);
    return React.useMemo(function () {
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
    var fixedList = React.useRef();
    var _b = tslib.__read(React.useState(''), 2), searchQuery = _b[0], setSearchQuery = _b[1];
    var debouncedQuery = useDebounce(searchQuery, 200);
    var _c = tslib.__read(React.useState(false), 1), invertSearchOrder = _c[0];
    var allTokens = useAllTokens();
    // if they input an address, use it
    var searchToken = useToken(debouncedQuery);
    var searchTokenIsAdded = useIsUserAddedToken(searchToken);
    var _d = tslib.__read(useAudioModeManager(), 1), audioPlay = _d[0];
    var showETH = React.useMemo(function () {
        var s = debouncedQuery.toLowerCase().trim();
        return s === '' || s === 'b' || s === 'bn' || s === 'bnb';
    }, [debouncedQuery]);
    var tokenComparator = useTokenComparator(invertSearchOrder);
    var filteredTokens = React.useMemo(function () {
        return filterTokens(Object.values(allTokens), debouncedQuery);
    }, [allTokens, debouncedQuery]);
    var sortedTokens = React.useMemo(function () {
        return filteredTokens.sort(tokenComparator);
    }, [filteredTokens, tokenComparator]);
    var filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery);
    var handleCurrencySelect = React.useCallback(function (currency) {
        onCurrencySelect(currency);
        if (audioPlay) {
            swapSound.play();
        }
    }, [audioPlay, onCurrencySelect]);
    // manage focus on modal show
    var inputRef = React.useRef();
    React.useEffect(function () {
        inputRef.current.focus();
    }, []);
    var handleInput = React.useCallback(function (event) {
        var _a;
        var input = event.target.value;
        var checksummedInput = isAddress(input);
        setSearchQuery(checksummedInput || input);
        (_a = fixedList.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0);
    }, []);
    var handleEnter = React.useCallback(function (e) {
        var _a;
        if (e.key === 'Enter') {
            if (filteredSortedTokens.length > 0) {
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
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("div", { children: [jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "16px" }, { children: [jsxRuntime.jsx(Row, { children: jsxRuntime.jsx(Input$3, { id: "token-search-input", placeholder: t('Search name or paste address'), scale: "lg", autoComplete: "off", value: searchQuery, ref: inputRef, onChange: handleInput, onKeyDown: handleEnter }, void 0) }, void 0), showCommonBases && (jsxRuntime.jsx(CommonBases, { chainId: chainId, onSelect: handleCurrencySelect, selectedCurrency: selectedCurrency }, void 0))] }), void 0), searchToken && !searchTokenIsAdded ? (jsxRuntime.jsx(Column, tslib.__assign({ style: { padding: '20px 0', height: '100%' } }, { children: jsxRuntime.jsx(ImportRow, { token: searchToken, showImportView: showImportView, setImportToken: setImportToken }, void 0) }), void 0)) : (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) > 0 || (filteredInactiveTokens === null || filteredInactiveTokens === void 0 ? void 0 : filteredInactiveTokens.length) > 0 ? (jsxRuntime.jsx(Box, tslib.__assign({ margin: "24px -24px" }, { children: jsxRuntime.jsx(CurrencyList, { height: 390, showETH: showETH, currencies: filteredInactiveTokens ? filteredSortedTokens.concat(filteredInactiveTokens) : filteredSortedTokens, breakIndex: inactiveTokens && filteredSortedTokens ? filteredSortedTokens.length : undefined, onCurrencySelect: handleCurrencySelect, otherCurrency: otherSelectedCurrency, selectedCurrency: selectedCurrency, fixedListRef: fixedList, showImportView: showImportView, setImportToken: setImportToken }, void 0) }), void 0)) : (jsxRuntime.jsx(Column, tslib.__assign({ style: { padding: '20px', height: '100%' } }, { children: jsxRuntime.jsx(Text, tslib.__assign({ color: "textSubtle", textAlign: "center", mb: "20px" }, { children: t('No results found.') }), void 0) }), void 0))] }, void 0) }, void 0));
}

function ImportToken(_a) {
    var tokens = _a.tokens, handleCurrencySelect = _a.handleCurrencySelect;
    var chainId = useActiveWeb3React().chainId;
    var t = useTranslation().t;
    var _b = tslib.__read(React.useState(false), 2), confirmed = _b[0], setConfirmed = _b[1];
    var addToken = useAddUserToken();
    // use for showing import source on inactive tokens
    var inactiveTokenList = useCombinedInactiveList();
    return (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "lg" }, { children: [jsxRuntime.jsx(Message, tslib.__assign({ variant: "warning" }, { children: jsxRuntime.jsxs(Text, { children: [t('Anyone can create a %token% token on %chain% with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.', {
                            token: 'ERC20',
                            chain: 'BscScan'
                        }), jsxRuntime.jsx("br", {}, void 0), jsxRuntime.jsx("br", {}, void 0), t('If you purchase an arbitrary token, you may be unable to sell it back.')] }, void 0) }), void 0), tokens.map(function (token) {
                var _a, _b;
                var list = chainId && ((_b = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[token.address]) === null || _b === void 0 ? void 0 : _b.list);
                var address = token.address
                    ? token.address.substring(0, 6) + "..." + token.address.substring(token.address.length - 4)
                    : null;
                return (jsxRuntime.jsxs(Grid, tslib.__assign({ gridTemplateRows: "1fr 1fr 1fr", gridGap: "4px" }, { children: [list !== undefined ? (jsxRuntime.jsxs(Tag, tslib.__assign({ variant: "success", outline: true, scale: "sm", startIcon: list.logoURI && jsxRuntime.jsx(ListLogo, { logoURI: list.logoURI, size: "12px" }, void 0) }, { children: [t('via'), " ", list.name] }), void 0)) : (jsxRuntime.jsx(Tag, tslib.__assign({ variant: "failure", outline: true, scale: "sm", startIcon: jsxRuntime.jsx(Icon$f, { color: "failure" }, void 0) }, { children: t('Unknown Source') }), void 0)), jsxRuntime.jsxs(Flex, tslib.__assign({ alignItems: "center" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ mr: "8px" }, { children: token.name }), void 0), jsxRuntime.jsxs(Text, { children: ["(", token.symbol, ")"] }, void 0)] }), void 0), chainId && (jsxRuntime.jsxs(Flex, tslib.__assign({ justifyContent: "space-between", width: "100%" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ mr: "4px" }, { children: address }), void 0), jsxRuntime.jsxs(Link, tslib.__assign({ href: getBscScanLink(token.address, 'address', chainId), external: true }, { children: ["(", t('View on BscScan'), ")"] }), void 0)] }), void 0))] }), token.address));
            }), jsxRuntime.jsxs(Flex, tslib.__assign({ justifyContent: "space-between", alignItems: "center" }, { children: [jsxRuntime.jsxs(Flex, tslib.__assign({ alignItems: "center", onClick: function () { return setConfirmed(!confirmed); } }, { children: [jsxRuntime.jsx(Checkbox, { scale: "sm", name: "confirmed", type: "checkbox", checked: confirmed, onChange: function () { return setConfirmed(!confirmed); } }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ ml: "8px", style: { userSelect: 'none' } }, { children: t('I understand') }), void 0)] }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ variant: "danger", disabled: !confirmed, onClick: function () {
                            tokens.map(function (token) { return addToken(token); });
                            if (handleCurrencySelect) {
                                handleCurrencySelect(tokens[0]);
                            }
                        }, className: ".token-dismiss-button" }, { children: t('Import') }), void 0)] }), void 0)] }), void 0));
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
var Wrapper$2 = styled__default["default"](Column)(templateObject_1$d || (templateObject_1$d = tslib.__makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n"], ["\n  width: 100%;\n  height: 100%;\n"])));
var RowWrapper = styled__default["default"](Row)(templateObject_2$8 || (templateObject_2$8 = tslib.__makeTemplateObject(["\n  background-color: ", ";\n  border: solid 1px;\n  border-color: ", ";\n  transition: 200ms;\n  align-items: center;\n  padding: 1rem;\n  border-radius: 10px;\n"], ["\n  background-color: ", ";\n  border: solid 1px;\n  border-color: ", ";\n  transition: 200ms;\n  align-items: center;\n  padding: 1rem;\n  border-radius: 10px;\n"])), function (_a) {
    var active = _a.active, theme = _a.theme;
    return (active ? theme.colors.success + "19" : 'transparent');
}, function (_a) {
    var active = _a.active, theme = _a.theme;
    return (active ? theme.colors.success : theme.colors.tertiary);
});
function listUrlRowHTMLId(listUrl) {
    return "list-row-" + listUrl.replace(/\./g, '-');
}
var ListRow = React.memo(function ListRow(_a) {
    var listUrl = _a.listUrl;
    var listsByUrl = reactRedux.useSelector(function (state) { return state.lists.byUrl; });
    var dispatch = reactRedux.useDispatch();
    var _b = listsByUrl[listUrl], list = _b.current, pending = _b.pendingUpdate;
    var isActive = useIsListActive(listUrl);
    var t = useTranslation().t;
    var handleAcceptListUpdate = React.useCallback(function () {
        if (!pending)
            return;
        dispatch(acceptListUpdate(listUrl));
    }, [dispatch, listUrl, pending]);
    var handleRemoveList = React.useCallback(function () {
        // eslint-disable-next-line no-alert
        if (window.confirm('Please confirm you would like to remove this list')) {
            dispatch(removeList(listUrl));
        }
    }, [dispatch, listUrl]);
    var handleEnableList = React.useCallback(function () {
        dispatch(enableList(listUrl));
    }, [dispatch, listUrl]);
    var handleDisableList = React.useCallback(function () {
        dispatch(disableList(listUrl));
    }, [dispatch, listUrl]);
    var _c = useTooltip(jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(Text, { children: list && listVersionLabel(list.version) }, void 0), jsxRuntime.jsx(LinkExternal, tslib.__assign({ external: true, href: "https://tokenlists.org/token-list?url=" + listUrl }, { children: t('See') }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ variant: "danger", scale: "xs", onClick: handleRemoveList, disabled: Object.keys(listsByUrl).length === 1 }, { children: t('Remove') }), void 0), pending && (jsxRuntime.jsx(Button, tslib.__assign({ variant: "text", onClick: handleAcceptListUpdate, style: { fontSize: '12px' } }, { children: t('Update list') }), void 0))] }, void 0), { placement: 'right-end', trigger: 'click' }), targetRef = _c.targetRef, tooltip = _c.tooltip, tooltipVisible = _c.tooltipVisible;
    if (!list)
        return null;
    return (jsxRuntime.jsxs(RowWrapper, tslib.__assign({ active: isActive, id: listUrlRowHTMLId(listUrl) }, { children: [tooltipVisible && tooltip, list.logoURI ? (jsxRuntime.jsx(ListLogo, { size: "40px", style: { marginRight: '1rem' }, logoURI: list.logoURI, alt: list.name + " list logo" }, void 0)) : (jsxRuntime.jsx("div", { style: { width: '24px', height: '24px', marginRight: '1rem' } }, void 0)), jsxRuntime.jsxs(Column, tslib.__assign({ style: { flex: '1' } }, { children: [jsxRuntime.jsx(Row, { children: jsxRuntime.jsx(Text, tslib.__assign({ bold: true }, { children: list.name }), void 0) }, void 0), jsxRuntime.jsxs(RowFixed, tslib.__assign({ mt: "4px" }, { children: [jsxRuntime.jsxs(Text, tslib.__assign({ fontSize: "12px", mr: "6px", textTransform: "lowercase" }, { children: [list.tokens.length, " ", t('Tokens')] }), void 0), jsxRuntime.jsx("span", tslib.__assign({ ref: targetRef }, { children: jsxRuntime.jsx(Icon$6, { color: "text", width: "16px" }, void 0) }), void 0)] }), void 0)] }), void 0), jsxRuntime.jsx(Toggle, { checked: isActive, onChange: function () {
                    if (isActive) {
                        handleDisableList();
                    }
                    else {
                        handleEnableList();
                    }
                } }, void 0)] }), listUrl));
});
var ListContainer = styled__default["default"].div(templateObject_3$3 || (templateObject_3$3 = tslib.__makeTemplateObject(["\n  padding: 1rem 0;\n  height: 100%;\n  overflow: auto;\n"], ["\n  padding: 1rem 0;\n  height: 100%;\n  overflow: auto;\n"])));
function ManageLists(_a) {
    var setModalView = _a.setModalView, setImportList = _a.setImportList, setListUrl = _a.setListUrl;
    var _b = tslib.__read(React.useState(''), 2), listUrlInput = _b[0], setListUrlInput = _b[1];
    var t = useTranslation().t;
    var lists = useAllLists();
    // sort by active but only if not visible
    var activeListUrls = useActiveListUrls();
    var _c = tslib.__read(React.useState(), 2), activeCopy = _c[0], setActiveCopy = _c[1];
    React.useEffect(function () {
        if (!activeCopy && activeListUrls) {
            setActiveCopy(activeListUrls);
        }
    }, [activeCopy, activeListUrls]);
    var handleInput = React.useCallback(function (e) {
        setListUrlInput(e.target.value);
    }, []);
    var fetchList = useFetchListCallback();
    var validUrl = React.useMemo(function () {
        return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput));
    }, [listUrlInput]);
    var sortedLists = React.useMemo(function () {
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
    var _d = tslib.__read(React.useState(), 2), tempList = _d[0], setTempList = _d[1];
    var _e = tslib.__read(React.useState(), 2), addError = _e[0], setAddError = _e[1];
    React.useEffect(function () {
        function fetchTempList() {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
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
    var handleImport = React.useCallback(function () {
        if (!tempList)
            return;
        setImportList(tempList);
        setModalView(CurrencyModalView.importList);
        setListUrl(listUrlInput);
    }, [listUrlInput, setImportList, setListUrl, setModalView, tempList]);
    return (jsxRuntime.jsxs(Wrapper$2, { children: [jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "14px" }, { children: [jsxRuntime.jsx(Row, { children: jsxRuntime.jsx(Input$3, { id: "list-add-input", scale: "lg", placeholder: t('https:// or ipfs:// or ENS name'), value: listUrlInput, onChange: handleInput }, void 0) }, void 0), addError ? (jsxRuntime.jsx(Text, tslib.__assign({ color: "failure", style: { textOverflow: 'ellipsis', overflow: 'hidden' } }, { children: t(addError) }), void 0)) : null] }), void 0), tempList && (jsxRuntime.jsx(AutoColumn, tslib.__assign({ style: { paddingTop: 0 } }, { children: jsxRuntime.jsx(Card, tslib.__assign({ padding: "12px 20px" }, { children: jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsxs(RowFixed, { children: [tempList.logoURI && jsxRuntime.jsx(ListLogo, { logoURI: tempList.logoURI, size: "40px" }, void 0), jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "4px", style: { marginLeft: '20px' } }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ bold: true }, { children: tempList.name }), void 0), jsxRuntime.jsxs(Text, tslib.__assign({ color: "textSubtle", small: true, textTransform: "lowercase" }, { children: [tempList.tokens.length, " ", t('Tokens')] }), void 0)] }), void 0)] }, void 0), isImported ? (jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Icon$a, { width: "16px", mr: "10px" }, void 0), jsxRuntime.jsx(Text, { children: t('Loaded') }, void 0)] }, void 0)) : (jsxRuntime.jsx(Button, tslib.__assign({ width: "fit-content", onClick: handleImport }, { children: t('Import') }), void 0))] }, void 0) }), void 0) }), void 0)), jsxRuntime.jsx(ListContainer, { children: jsxRuntime.jsx(AutoColumn, tslib.__assign({ gap: "md" }, { children: sortedLists.map(function (listUrl) { return (jsxRuntime.jsx(ListRow, { listUrl: listUrl }, listUrl)); }) }), void 0) }, void 0)] }, void 0));
}
var templateObject_1$d, templateObject_2$8, templateObject_3$3;

var Wrapper$1 = styled__default["default"].div(templateObject_1$c || (templateObject_1$c = tslib.__makeTemplateObject(["\n  width: 100%;\n  height: calc(100% - 60px);\n  position: relative;\n  padding-bottom: 60px;\n"], ["\n  width: 100%;\n  height: calc(100% - 60px);\n  position: relative;\n  padding-bottom: 60px;\n"])));
var Footer$1 = styled__default["default"].div(templateObject_2$7 || (templateObject_2$7 = tslib.__makeTemplateObject(["\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));
function ManageTokens(_a) {
    var setModalView = _a.setModalView, setImportToken = _a.setImportToken;
    var chainId = useActiveWeb3React().chainId;
    var t = useTranslation().t;
    var _b = tslib.__read(React.useState(''), 2), searchQuery = _b[0], setSearchQuery = _b[1];
    // manage focus on modal show
    var inputRef = React.useRef();
    var handleInput = React.useCallback(function (event) {
        var input = event.target.value;
        var checksummedInput = isAddress(input);
        setSearchQuery(checksummedInput || input);
    }, []);
    // if they input an address, use it
    var searchToken = useToken(searchQuery);
    // all tokens for local lisr
    var userAddedTokens = useUserAddedTokens();
    var removeToken = useRemoveUserAddedToken();
    var handleRemoveAll = React.useCallback(function () {
        if (chainId && userAddedTokens) {
            userAddedTokens.map(function (token) {
                return removeToken(chainId, token.address);
            });
        }
    }, [removeToken, userAddedTokens, chainId]);
    var tokenList = React.useMemo(function () {
        return (chainId &&
            userAddedTokens.map(function (token) { return (jsxRuntime.jsxs(RowBetween, tslib.__assign({ width: "100%" }, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(CurrencyLogo, { currency: token, size: "20px" }, void 0), jsxRuntime.jsx(Link, tslib.__assign({ external: true, href: getBscScanLink(token.address, 'address', chainId), color: "textSubtle", ml: "10px" }, { children: token.symbol }), void 0)] }, void 0), jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(IconButton, tslib.__assign({ variant: "text", onClick: function () { return removeToken(chainId, token.address); } }, { children: jsxRuntime.jsx(Icon$7, {}, void 0) }), void 0), jsxRuntime.jsx(LinkExternal, { href: getBscScanLink(token.address, 'address', chainId) }, void 0)] }, void 0)] }), token.address)); }));
    }, [userAddedTokens, chainId, removeToken]);
    var isAddressValid = searchQuery === '' || isAddress(searchQuery);
    return (jsxRuntime.jsx(Wrapper$1, { children: jsxRuntime.jsxs(Column, tslib.__assign({ style: { width: '100%', flex: '1 1' } }, { children: [jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "14px" }, { children: [jsxRuntime.jsx(Row, { children: jsxRuntime.jsx(Input$3, { id: "token-search-input", scale: "lg", placeholder: "0x0000", value: searchQuery, autoComplete: "off", ref: inputRef, onChange: handleInput, isWarning: !isAddressValid }, void 0) }, void 0), !isAddressValid && jsxRuntime.jsx(Text, tslib.__assign({ color: "failure" }, { children: t('Enter valid token address') }), void 0), searchToken && (jsxRuntime.jsx(ImportRow, { token: searchToken, showImportView: function () { return setModalView(CurrencyModalView.importToken); }, setImportToken: setImportToken, style: { height: 'fit-content' } }, void 0))] }), void 0), tokenList, jsxRuntime.jsxs(Footer$1, { children: [jsxRuntime.jsxs(Text, tslib.__assign({ bold: true, color: "textSubtle" }, { children: [userAddedTokens === null || userAddedTokens === void 0 ? void 0 : userAddedTokens.length, " ", userAddedTokens.length === 1 ? t('Custom Token') : t('Custom Tokens')] }), void 0), userAddedTokens.length > 0 && (jsxRuntime.jsx(Button, tslib.__assign({ variant: "tertiary", onClick: handleRemoveAll }, { children: t('Clear all') }), void 0))] }, void 0)] }), void 0) }, void 0));
}
var templateObject_1$c, templateObject_2$7;

var StyledButtonMenu = styled__default["default"](ButtonMenu)(templateObject_1$b || (templateObject_1$b = tslib.__makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
function Manage(_a) {
    var setModalView = _a.setModalView, setImportList = _a.setImportList, setImportToken = _a.setImportToken, setListUrl = _a.setListUrl;
    var _b = tslib.__read(React.useState(true), 2), showLists = _b[0], setShowLists = _b[1];
    var t = useTranslation().t;
    return (jsxRuntime.jsxs(ModalBody, { children: [jsxRuntime.jsxs(StyledButtonMenu, tslib.__assign({ activeIndex: showLists ? 0 : 1, onItemClick: function () { return setShowLists(function (prev) { return !prev; }); }, scale: "sm", variant: "subtle", mb: "32px" }, { children: [jsxRuntime.jsx(ButtonMenuItem, tslib.__assign({ width: "50%" }, { children: t('Lists') }), void 0), jsxRuntime.jsx(ButtonMenuItem, tslib.__assign({ width: "50%" }, { children: t('Tokens') }), void 0)] }), void 0), showLists ? (jsxRuntime.jsx(ManageLists, { setModalView: setModalView, setImportList: setImportList, setListUrl: setListUrl }, void 0)) : (jsxRuntime.jsx(ManageTokens, { setModalView: setModalView, setImportToken: setImportToken }, void 0))] }, void 0));
}
var templateObject_1$b;

var Wrapper = styled__default["default"].div(templateObject_1$a || (templateObject_1$a = tslib.__makeTemplateObject(["\n  position: relative;\n  width: 100%;\n"], ["\n  position: relative;\n  width: 100%;\n"])));
var TextDot = styled__default["default"].div(templateObject_2$6 || (templateObject_2$6 = tslib.__makeTemplateObject(["\n  height: 3px;\n  width: 3px;\n  background-color: ", ";\n  border-radius: 50%;\n"], ["\n  height: 3px;\n  width: 3px;\n  background-color: ", ";\n  border-radius: 50%;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.text;
});
function ImportList(_a) {
    var _b;
    var listURL = _a.listURL, list = _a.list, onImport = _a.onImport;
    var theme = useTheme().theme;
    var dispatch = reactRedux.useDispatch();
    var t = useTranslation().t;
    // user must accept
    var _c = tslib.__read(React.useState(false), 2), confirmed = _c[0], setConfirmed = _c[1];
    var lists = useAllLists();
    var fetchList = useFetchListCallback();
    // monitor is list is loading
    var adding = Boolean((_b = lists[listURL]) === null || _b === void 0 ? void 0 : _b.loadingRequestId);
    var _d = tslib.__read(React.useState(null), 2), addError = _d[0], setAddError = _d[1];
    var handleAddList = React.useCallback(function () {
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
    return (jsxRuntime.jsx(Wrapper, { children: jsxRuntime.jsx(AutoColumn, tslib.__assign({ gap: "md" }, { children: jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "md" }, { children: [jsxRuntime.jsx(Card, tslib.__assign({ padding: "12px 20px" }, { children: jsxRuntime.jsx(RowBetween, { children: jsxRuntime.jsxs(RowFixed, { children: [list.logoURI && jsxRuntime.jsx(ListLogo, { logoURI: list.logoURI, size: "40px" }, void 0), jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "sm", style: { marginLeft: '20px' } }, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ bold: true, mr: "6px" }, { children: list.name }), void 0), jsxRuntime.jsx(TextDot, {}, void 0), jsxRuntime.jsxs(Text, tslib.__assign({ small: true, color: "textSubtle", ml: "6px" }, { children: [list.tokens.length, " tokens"] }), void 0)] }, void 0), jsxRuntime.jsx(Link, tslib.__assign({ small: true, external: true, ellipsis: true, maxWidth: "90%", href: "https://tokenlists.org/token-list?url=" + listURL }, { children: listURL }), void 0)] }), void 0)] }, void 0) }, void 0) }), void 0), jsxRuntime.jsx(Message, tslib.__assign({ variant: "danger" }, { children: jsxRuntime.jsxs(Flex, tslib.__assign({ flexDirection: "column" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "20px", textAlign: "center", color: theme.colors.failure, mb: "16px" }, { children: t('Import at your own risk') }), void 0), jsxRuntime.jsx(Text, tslib.__assign({ color: theme.colors.failure, mb: "8px" }, { children: t('By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.') }), void 0), jsxRuntime.jsx(Text, tslib.__assign({ bold: true, color: theme.colors.failure, mb: "16px" }, { children: typeof 'If you purchase a token from this list, you may not be able to sell it back.' }), void 0), jsxRuntime.jsxs(Flex, tslib.__assign({ alignItems: "center" }, { children: [jsxRuntime.jsx(Checkbox, { name: "confirmed", type: "checkbox", checked: confirmed, onChange: function () { return setConfirmed(!confirmed); }, scale: "sm" }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ ml: "10px", style: { userSelect: 'none' } }, { children: t('I understand') }), void 0)] }), void 0)] }), void 0) }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ disabled: !confirmed, onClick: handleAddList }, { children: t('Import') }), void 0), addError ? (jsxRuntime.jsx(Text, tslib.__assign({ color: "failure", style: { textOverflow: 'ellipsis', overflow: 'hidden' } }, { children: addError }), void 0)) : null] }), void 0) }), void 0) }, void 0));
}
var templateObject_1$a, templateObject_2$6;

var Footer = styled__default["default"].div(templateObject_1$9 || (templateObject_1$9 = tslib.__makeTemplateObject(["\n  width: 100%;\n  background-color: ", ";\n  text-align: center;\n"], ["\n  width: 100%;\n  background-color: ", ";\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.backgroundAlt;
});
var StyledModalContainer$1 = styled__default["default"](ModalContainer)(templateObject_2$5 || (templateObject_2$5 = tslib.__makeTemplateObject(["\n  max-width: 420px;\n  width: 100%;\n"], ["\n  max-width: 420px;\n  width: 100%;\n"])));
var StyledModalBody = styled__default["default"](ModalBody)(templateObject_3$2 || (templateObject_3$2 = tslib.__makeTemplateObject(["\n  padding: 24px;\n"], ["\n  padding: 24px;\n"])));
function CurrencySearchModal(_a) {
    var _b;
    var _c = _a.onDismiss, onDismiss = _c === void 0 ? function () { return null; } : _c, onCurrencySelect = _a.onCurrencySelect, selectedCurrency = _a.selectedCurrency, otherSelectedCurrency = _a.otherSelectedCurrency, _d = _a.showCommonBases, showCommonBases = _d === void 0 ? false : _d;
    var _e = tslib.__read(React.useState(CurrencyModalView.search), 2), modalView = _e[0], setModalView = _e[1];
    var handleCurrencySelect = React.useCallback(function (currency) {
        onDismiss();
        onCurrencySelect(currency);
    }, [onDismiss, onCurrencySelect]);
    // for token import view
    var prevView = usePreviousValue(modalView);
    // used for import token flow
    var _f = tslib.__read(React.useState(), 2), importToken = _f[0], setImportToken = _f[1];
    // used for import list
    var _g = tslib.__read(React.useState(), 2), importList = _g[0], setImportList = _g[1];
    var _h = tslib.__read(React.useState(), 2), listURL = _h[0], setListUrl = _h[1];
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
    return (jsxRuntime.jsxs(StyledModalContainer$1, tslib.__assign({ minWidth: "320px" }, { children: [jsxRuntime.jsxs(ModalHeader, { children: [jsxRuntime.jsxs(ModalTitle, { children: [config[modalView].onBack && jsxRuntime.jsx(ModalBackButton, { onBack: config[modalView].onBack }, void 0), jsxRuntime.jsx(Heading, { children: config[modalView].title }, void 0)] }, void 0), jsxRuntime.jsx(ModalCloseButton, { onDismiss: onDismiss }, void 0)] }, void 0), jsxRuntime.jsxs(StyledModalBody, { children: [modalView === CurrencyModalView.search ? (jsxRuntime.jsx(CurrencySearch, { onCurrencySelect: handleCurrencySelect, selectedCurrency: selectedCurrency, otherSelectedCurrency: otherSelectedCurrency, showCommonBases: showCommonBases, showImportView: function () { return setModalView(CurrencyModalView.importToken); }, setImportToken: setImportToken }, void 0)) : modalView === CurrencyModalView.importToken && importToken ? (jsxRuntime.jsx(ImportToken, { tokens: [importToken], handleCurrencySelect: handleCurrencySelect }, void 0)) : modalView === CurrencyModalView.importList && importList && listURL ? (jsxRuntime.jsx(ImportList, { list: importList, listURL: listURL, onImport: function () { return setModalView(CurrencyModalView.manage); } }, void 0)) : modalView === CurrencyModalView.manage ? (jsxRuntime.jsx(Manage, { setModalView: setModalView, setImportToken: setImportToken, setImportList: setImportList, setListUrl: setListUrl }, void 0)) : (''), modalView === CurrencyModalView.search && (jsxRuntime.jsx(Footer, { children: jsxRuntime.jsx(Button, tslib.__assign({ scale: "sm", variant: "text", onClick: function () { return setModalView(CurrencyModalView.manage); }, className: "list-token-manage-button" }, { children: t('Manage Tokens') }), void 0) }, void 0))] }, void 0)] }), void 0));
}
var templateObject_1$9, templateObject_2$5, templateObject_3$2;

var StyledInput = styled__default["default"].input(templateObject_1$8 || (templateObject_1$8 = tslib.__makeTemplateObject(["\n  color: ", ";\n  width: 0;\n  position: relative;\n  font-weight: 500;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  background-color: transparent;\n  font-size: 16px;\n  text-align: ", ";\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  &:disabled {\n    /* background-color: ", "; */\n    box-shadow: none;\n    /* color: ", "; */\n    cursor: not-allowed;\n  }\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  [type='number'] {\n    -moz-appearance: textfield;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"], ["\n  color: ", ";\n  width: 0;\n  position: relative;\n  font-weight: 500;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  background-color: transparent;\n  font-size: 16px;\n  text-align: ", ";\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  &:disabled {\n    /* background-color: ", "; */\n    box-shadow: none;\n    /* color: ", "; */\n    cursor: not-allowed;\n  }\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  [type='number'] {\n    -moz-appearance: textfield;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"])), function (_a) {
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
var Input = React__default["default"].memo(function InnerInput(_a) {
    var value = _a.value, onUserInput = _a.onUserInput, placeholder = _a.placeholder, decimals = _a.decimals, rest = tslib.__rest(_a, ["value", "onUserInput", "placeholder", "decimals"]);
    var enforcer = React.useCallback(function (event) {
        if (event.currentTarget.validity.valid) {
            var nextUserInput = event.target.value.replace(/,/g, '.');
            if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
                onUserInput(nextUserInput);
            }
        }
    }, [onUserInput]);
    var t = useTranslation().t;
    return (jsxRuntime.jsx(StyledInput, tslib.__assign({}, rest, { 
        // universal input options
        pattern: "^[0-9]*[.,]?[0-9]{0," + (decimals || 18) + "}$", inputMode: "decimal", title: t('Token Amount'), value: value, onChange: enforcer, 
        // text-specific options
        type: "text", placeholder: placeholder || '0.0', minLength: 1, maxLength: 79, spellCheck: "false" }), void 0));
});
var templateObject_1$8;

var InputRow = styled__default["default"].div(templateObject_1$7 || (templateObject_1$7 = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  padding: ", ";\n"], ["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  padding: ", ";\n"])), function (_a) {
    var selected = _a.selected;
    return (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem');
});
var CurrencySelectButton = styled__default["default"](Button).attrs({ variant: 'text', scale: 'sm' })(templateObject_2$4 || (templateObject_2$4 = tslib.__makeTemplateObject(["\n  padding: 0 0.5rem;\n"], ["\n  padding: 0 0.5rem;\n"])));
var LabelRow = styled__default["default"].div(templateObject_3$1 || (templateObject_3$1 = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  padding: 0.75rem 1rem 0 1rem;\n"], ["\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  padding: 0.75rem 1rem 0 1rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.text;
});
var InputPanel = styled__default["default"].div(templateObject_4$1 || (templateObject_4$1 = tslib.__makeTemplateObject(["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: ", ";\n  background-color: ", ";\n  z-index: 1;\n"], ["\n  display: flex;\n  flex-flow: column nowrap;\n  position: relative;\n  border-radius: ", ";\n  background-color: ", ";\n  z-index: 1;\n"])), function (_a) {
    var hideInput = _a.hideInput;
    return (hideInput ? '8px' : '20px');
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.background;
});
var Container = styled__default["default"].div(templateObject_5 || (templateObject_5 = tslib.__makeTemplateObject(["\n  border-radius: 10px;\n  background-color: ", ";\n  box-shadow: ", ";\n"], ["\n  border-radius: 10px;\n  background-color: ", ";\n  box-shadow: ", ";\n"])), function (_a) {
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
    var _g = tslib.__read(useModal(jsxRuntime.jsx(CurrencySearchModal, { onCurrencySelect: onCurrencySelect, selectedCurrency: currency, otherSelectedCurrency: otherCurrency, showCommonBases: showCommonBases }, void 0)), 1), onPresentCurrencyModal = _g[0];
    return (jsxRuntime.jsx(InputPanel, tslib.__assign({ id: id }, { children: jsxRuntime.jsxs(Container, tslib.__assign({ hideInput: hideInput }, { children: [!hideInput && (jsxRuntime.jsx(LabelRow, { children: jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: translatedLabel }), void 0), account && (jsxRuntime.jsx(Text, tslib.__assign({ onClick: onMax, fontSize: "14px", style: { display: 'inline', cursor: 'pointer' } }, { children: !hideBalance && !!currency && selectedCurrencyBalance
                                    ? t('Balance: %amount%', { amount: (_b = selectedCurrencyBalance === null || selectedCurrencyBalance === void 0 ? void 0 : selectedCurrencyBalance.toSignificant(6)) !== null && _b !== void 0 ? _b : '' })
                                    : ' -' }), void 0))] }, void 0) }, void 0)), jsxRuntime.jsxs(InputRow, tslib.__assign({ style: hideInput ? { padding: '0', borderRadius: '8px' } : {}, selected: disableCurrencySelect }, { children: [!hideInput && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Input, { className: "token-amount-input", disabled: disabled, decimals: currency === null || currency === void 0 ? void 0 : currency.decimals, value: value, onUserInput: function (val) {
                                        onUserInput(val);
                                    } }, void 0), account && currency && showMaxButton && label !== 'To' && (jsxRuntime.jsx(Button, tslib.__assign({ onClick: onMax, scale: "sm", variant: "text" }, { children: "MAX" }), void 0))] }, void 0)), jsxRuntime.jsx(CurrencySelectButton, tslib.__assign({ selected: !!currency, className: "open-currency-select-button", onClick: function () {
                                if (!disableCurrencySelect) {
                                    if (onSelect) {
                                        onSelect();
                                    }
                                    else if (onCurrencySelect) {
                                        onPresentCurrencyModal();
                                    }
                                }
                            } }, { children: jsxRuntime.jsxs(Flex, tslib.__assign({ alignItems: "center", justifyContent: "space-between" }, { children: [pair ? (jsxRuntime.jsx(DoubleCurrencyLogo, { currency0: pair.token0, currency1: pair.token1, size: 16, margin: true }, void 0)) : currency ? (jsxRuntime.jsx(CurrencyLogo, { currency: currency, size: "24px", style: { marginRight: '8px' } }, void 0)) : null, pair ? (jsxRuntime.jsxs(Text, tslib.__assign({ color: 'primary', id: "pair" }, { children: [pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol] }), void 0)) : (jsxRuntime.jsx(Text, tslib.__assign({ color: 'primary', id: "pair" }, { children: (currency && currency.symbol && currency.symbol.length > 20
                                            ? currency.symbol.slice(0, 4) + "..." + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                                            : currency === null || currency === void 0 ? void 0 : currency.symbol) || t('Select') }), void 0)), !disableCurrencySelect && jsxRuntime.jsx(Icon$9, { color: 'primary' }, void 0)] }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
}
var templateObject_1$7, templateObject_2$4, templateObject_3$1, templateObject_4$1, templateObject_5;

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
function useLast(value, filterFn) {
    var _a = tslib.__read(React.useState(filterFn && filterFn(value) ? value : undefined), 2), last = _a[0], setLast = _a[1];
    React.useEffect(function () {
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

var SwapRoute = React.memo(function SwapRoute(_a) {
    var trade = _a.trade, polyData = _a.polyData, isPolyMethed = _a.isPolyMethed;
    var renderPath = isPolyMethed ? polyData.protocols : trade.route.path;
    return (jsxRuntime.jsx(Flex, tslib.__assign({ flexWrap: "wrap", width: "100%", justifyContent: "flex-end", alignItems: "center" }, { children: renderPath.map(function (token, i, path) {
            var isLastItem = i === path.length - 1;
            var currency = unwrappedToken(token);
            return (
            // eslint-disable-next-line react/no-array-index-key
            jsxRuntime.jsxs(React.Fragment, { children: [jsxRuntime.jsx(Flex, tslib.__assign({ alignItems: "end" }, { children: jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px", ml: "0.125rem", mr: "0.125rem" }, { children: currency.symbol }), void 0) }), void 0), !isLastItem && jsxRuntime.jsx(Icon$8, { width: "12px" }, void 0)] }, i));
        }) }), void 0));
});

function TradeSummary(_a) {
    var _b, _c, _d, _e;
    var trade = _a.trade, allowedSlippage = _a.allowedSlippage;
    var t = useTranslation().t;
    var _f = computeTradePriceBreakdown(trade), priceImpactWithoutFee = _f.priceImpactWithoutFee, realizedLPFee = _f.realizedLPFee;
    var isExactIn = trade.tradeType === dsgswapSdk.TradeType.EXACT_INPUT;
    var slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage);
    return (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ style: { padding: '0' } }, { children: [jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px", color: "text" }, { children: isExactIn ? t('Minimum received') : t('Maximum sold') }), void 0), jsxRuntime.jsx(QuestionHelper, { text: t('Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsxRuntime.jsx(RowFixed, { children: jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: isExactIn
                                ? (_c = ((_b = slippageAdjustedAmounts[Field$2.OUTPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(4)) + " " + trade.outputAmount.currency.symbol) !== null && _c !== void 0 ? _c : '-'
                                : (_e = ((_d = slippageAdjustedAmounts[Field$2.INPUT]) === null || _d === void 0 ? void 0 : _d.toSignificant(4)) + " " + trade.inputAmount.currency.symbol) !== null && _e !== void 0 ? _e : '-' }), void 0) }, void 0)] }, void 0), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px", color: "text" }, { children: t('Price Impact') }), void 0), jsxRuntime.jsx(QuestionHelper, { text: t('The difference between the market price and estimated price due to trade size.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsxRuntime.jsx(FormattedPriceImpact, { priceImpact: priceImpactWithoutFee }, void 0)] }, void 0), jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsx(LiquidityProviderFee, {}, void 0), jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: realizedLPFee ? realizedLPFee.toSignificant(4) + " " + trade.inputAmount.currency.symbol : '-' }), void 0)] }, void 0)] }, void 0)] }), void 0));
}
function TradeSummaryPloy(_a) {
    var _b, _c, _d;
    var polyData = _a.polyData;
    var t = useTranslation().t;
    return (jsxRuntime.jsx(AutoColumn, tslib.__assign({ style: { padding: '0' } }, { children: jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px", color: "textSubtle" }, { children: t('Minimum received') }), void 0), jsxRuntime.jsx(QuestionHelper, { text: t('Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsxRuntime.jsx(RowFixed, { children: jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: (_d = ((_b = polyData === null || polyData === void 0 ? void 0 : polyData.toCurrencyAmount) === null || _b === void 0 ? void 0 : _b.toSignificant(4)) + " " + ((_c = polyData === null || polyData === void 0 ? void 0 : polyData.toToken) === null || _c === void 0 ? void 0 : _c.symbol)) !== null && _d !== void 0 ? _d : '-' }), void 0) }, void 0)] }, void 0) }), void 0));
}
function AdvancedSwapDetails(_a) {
    var trade = _a.trade, isPolyMethed = _a.isPolyMethed, polyData = _a.polyData;
    var _b = tslib.__read(useUserSlippageTolerance(), 1), allowedSlippage = _b[0];
    var t = useTranslation().t;
    var showRoute = !isPolyMethed ? Boolean(trade && trade.route.path.length > 2) : Boolean(polyData && polyData.protocols.length > 2);
    return (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "0px" }, { children: [isPolyMethed && (jsxRuntime.jsx(TradeSummaryPloy, { polyData: polyData }, void 0)), (trade && !isPolyMethed) && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(TradeSummary, { trade: trade, allowedSlippage: allowedSlippage }, void 0), showRoute && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(RowBetween, tslib.__assign({ style: { padding: '0' } }, { children: [jsxRuntime.jsxs(RowFixed, tslib.__assign({ minWidth: "80px" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px", color: "text" }, { children: t('Route') }), void 0), jsxRuntime.jsx(QuestionHelper, { text: t("Routing through these tokens resulted in the best price for your trade."), ml: "4px", placement: "top-start" }, void 0)] }), void 0), jsxRuntime.jsx(SwapRoute, { isPolyMethed: isPolyMethed, polyData: polyData, trade: trade }, void 0)] }), void 0) }, void 0))] }, void 0))] }), void 0));
}

var AdvancedDetailsFooter = styled__default["default"].div(templateObject_1$6 || (templateObject_1$6 = tslib.__makeTemplateObject(["\n  margin-top: ", ";\n  padding-top: 0;\n  padding-bottom: 0;\n  width: 100%;\n  max-width: 400px;\n  border-radius: 0;\n  background-color: ", ";\n\n  /* transform: ", "; */\n  /* max-height: ", "; */\n  /* overflow:  ", ";; */\n  transition: transform 300ms ease-in-out;\n"], ["\n  margin-top: ", ";\n  padding-top: 0;\n  padding-bottom: 0;\n  width: 100%;\n  max-width: 400px;\n  border-radius: 0;\n  background-color: ", ";\n\n  /* transform: ", "; */\n  /* max-height: ", "; */\n  /* overflow:  ", ";; */\n  transition: transform 300ms ease-in-out;\n"])), function (_a) {
    var show = _a.show;
    return (show ? '0' : 0);
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.invertedContrast;
}, function (_a) {
    var show = _a.show;
    return (show ? 'translateY(0%)' : 'translateY(-128%)');
}, function (_a) {
    var show = _a.show;
    return (show ? 'auto' : '60px');
}, function (_a) {
    var show = _a.show;
    return (show ? 'visible' : 'hide');
});
function AdvancedSwapDetailsDropdown(_a) {
    var _b;
    var trade = _a.trade, isPolyMethed = _a.isPolyMethed, polyData = _a.polyData, rest = tslib.__rest(_a, ["trade", "isPolyMethed", "polyData"]);
    var lastTrade = useLastTruthy(trade);
    var show = Boolean(isPolyMethed ? polyData : trade);
    return (jsxRuntime.jsx(AdvancedDetailsFooter, tslib.__assign({ show: show }, { children: show && jsxRuntime.jsx(AdvancedSwapDetails, tslib.__assign({}, rest, { isPolyMethed: isPolyMethed, polyData: polyData, trade: (_b = trade !== null && trade !== void 0 ? trade : lastTrade) !== null && _b !== void 0 ? _b : undefined }), void 0) }), void 0));
}
var templateObject_1$6;

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
    return (jsxRuntime.jsx(Text, tslib.__assign({ style: { justifyContent: 'center', alignItems: 'center', display: 'flex' } }, { children: show ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [formattedPrice !== null && formattedPrice !== void 0 ? formattedPrice : '-', " ", label, jsxRuntime.jsx(StyledBalanceMaxMini, tslib.__assign({ onClick: function () { return setShowInverted(!showInverted); } }, { children: jsxRuntime.jsx(Icon$b, { width: "14px" }, void 0) }), void 0)] }, void 0)) : ('-') }), void 0));
}

var Grouping = styled__default["default"](RowBetween)(templateObject_1$5 || (templateObject_1$5 = tslib.__makeTemplateObject(["\n  width: 50%;\n"], ["\n  width: 50%;\n"])));
var Circle = styled__default["default"].div(templateObject_2$3 || (templateObject_2$3 = tslib.__makeTemplateObject(["\n  min-width: 20px;\n  min-height: 20px;\n  background-color: ", ";\n  border-radius: 50%;\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 8px;\n  font-size: 12px;\n"], ["\n  min-width: 20px;\n  min-height: 20px;\n  background-color: ", ";\n  border-radius: 50%;\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 8px;\n  font-size: 12px;\n"])), function (_a) {
    var theme = _a.theme, confirmed = _a.confirmed, disabled = _a.disabled;
    return disabled ? theme.colors.backgroundDisabled : confirmed ? theme.colors.success : theme.colors.primary;
});
var CircleRow = styled__default["default"].div(templateObject_3 || (templateObject_3 = tslib.__makeTemplateObject(["\n  width: calc(100% - 20px);\n  display: flex;\n  align-items: center;\n"], ["\n  width: calc(100% - 20px);\n  display: flex;\n  align-items: center;\n"])));
var Connector = styled__default["default"].div(templateObject_4 || (templateObject_4 = tslib.__makeTemplateObject(["\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(\n    90deg,\n    ", "\n      0%,\n    ", "\n      80%\n  );\n  opacity: 0.6;\n"], ["\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(\n    90deg,\n    ", "\n      0%,\n    ", "\n      80%\n  );\n  opacity: 0.6;\n"])), function (_a) {
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
    var steps = _a.steps, _b = _a.disabled, disabled = _b === void 0 ? false : _b, rest = tslib.__rest(_a, ["steps", "disabled"]);
    return (jsxRuntime.jsx(AutoColumn, tslib.__assign({ justify: "center" }, rest, { children: jsxRuntime.jsxs(Grouping, { children: [steps.map(function (step, i) {
                    return (
                    // eslint-disable-next-line react/no-array-index-key
                    jsxRuntime.jsxs(CircleRow, { children: [jsxRuntime.jsx(Circle, tslib.__assign({ confirmed: step, disabled: disabled || (!steps[i - 1] && i !== 0) }, { children: step ? '✓' : i + 1 }), void 0), jsxRuntime.jsx(Connector, { prevConfirmed: step, disabled: disabled }, void 0)] }, i));
                }), jsxRuntime.jsx(Circle, tslib.__assign({ disabled: disabled || !steps[steps.length - 1] }, { children: steps.length + 1 }), void 0)] }, void 0) }), void 0));
}
var templateObject_1$5, templateObject_2$3, templateObject_3, templateObject_4;

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
    var _b = tslib.__read(React.useState(''), 2), slippageInput = _b[0], setSlippageInput = _b[1];
    var _c = tslib.__read(React.useState(''), 2), deadlineInput = _c[0], setDeadlineInput = _c[1];
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
    return (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "md" }, { children: [jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "sm" }, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: t('Slippage Tolerance') }), void 0), jsxRuntime.jsx(QuestionHelper, { text: t('Your transaction will revert if the price changes unfavorably by more than this percentage.'), ml: "4px", placement: "top-start" }, void 0)] }, void 0), jsxRuntime.jsxs(Flex, tslib.__assign({ flexWrap: ['wrap', 'wrap', 'nowrap'] }, { children: [jsxRuntime.jsxs(Grid, tslib.__assign({ gridTemplateColumns: "1fr 1fr 1fr", gridGap: "8px", mb: ['8px', '8px', 0], mr: [0, 0, '8px'] }, { children: [jsxRuntime.jsx(Button, tslib.__assign({ scale: "sm", onClick: function () {
                                            setSlippageInput('');
                                            setRawSlippage(10);
                                        }, variant: rawSlippage === 10 ? 'primary' : 'tertiary' }, { children: "0.1%" }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ scale: "sm", onClick: function () {
                                            setSlippageInput('');
                                            setRawSlippage(50);
                                        }, variant: rawSlippage === 50 ? 'primary' : 'tertiary' }, { children: "0.5%" }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ scale: "sm", onClick: function () {
                                            setSlippageInput('');
                                            setRawSlippage(100);
                                        }, variant: rawSlippage === 100 ? 'primary' : 'tertiary' }, { children: "1%" }), void 0)] }), void 0), jsxRuntime.jsxs(Flex, tslib.__assign({ width: "102px" }, { children: [jsxRuntime.jsx(Input$3, { scale: "sm", placeholder: (rawSlippage / 100).toFixed(2), value: slippageInput, onBlur: function () {
                                            parseCustomSlippage((rawSlippage / 100).toFixed(2));
                                        }, onChange: function (e) { return parseCustomSlippage(e.target.value); }, isWarning: !slippageInputIsValid, isSuccess: ![10, 50, 100].includes(rawSlippage) }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ color: "primary", bold: true, ml: "8px" }, { children: "%" }), void 0)] }), void 0)] }), void 0), !!slippageError && (jsxRuntime.jsx(RowBetween, tslib.__assign({ style: {
                            fontSize: '14px',
                            paddingTop: '7px',
                            color: slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E',
                        } }, { children: slippageError === SlippageError.InvalidInput
                            ? t('Enter a valid slippage percentage')
                            : slippageError === SlippageError.RiskyLow
                                ? t('Your transaction may fail')
                                : t('Your transaction may be frontrun') }), void 0))] }), void 0), jsxRuntime.jsxs(AutoColumn, tslib.__assign({ style: { marginTop: '8px' }, gap: "sm" }, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "14px" }, { children: t('Transaction deadline') }), void 0), jsxRuntime.jsx(QuestionHelper, { placement: "top-start", text: t('Your transaction will revert if it is pending for more than this long.'), ml: "4px" }, void 0)] }, void 0), jsxRuntime.jsxs(RowFixed, tslib.__assign({ style: { width: '182px' } }, { children: [jsxRuntime.jsx(Input$3, { scale: "md", color: deadlineError ? 'red' : undefined, onBlur: function () {
                                    parseCustomDeadline((deadline / 60).toString());
                                }, placeholder: (deadline / 60).toString(), value: deadlineInput, onChange: function (e) { return parseCustomDeadline(e.target.value); } }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ width: "80px", pl: "8px", fontSize: "14px" }, { children: t('minutes') }), void 0)] }), void 0)] }), void 0), jsxRuntime.jsx(AutoColumn, tslib.__assign({ gap: "sm" }, { children: jsxRuntime.jsxs(RowBetween, tslib.__assign({ mt: "8px", width: "98%" }, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, { children: t('Aggregate trading') }, void 0), jsxRuntime.jsx(QuestionHelper, { placement: "top-start", text: t('Unable to get trading pool rewards using Aggregate trading'), ml: "4px" }, void 0)] }, void 0), jsxRuntime.jsx(Toggle, { checked: userUsePoly, scale: "sm", onChange: function () { return setUserUsePoly(!userUsePoly); } }, void 0)] }), void 0) }), void 0), jsxRuntime.jsx(AutoColumn, tslib.__assign({ gap: "sm" }, { children: jsxRuntime.jsxs(RowBetween, tslib.__assign({ mt: "8px", width: "98%" }, { children: [jsxRuntime.jsxs(RowFixed, { children: [jsxRuntime.jsx(Text, { children: t('Disable Route') }, void 0), jsxRuntime.jsx(QuestionHelper, { placement: "top-start", text: t('Restricts swaps to direct pairs only.'), ml: "4px" }, void 0)] }, void 0), jsxRuntime.jsx(Toggle, { checked: singleHopOnly, scale: "sm", onChange: function () { return setSingleHopOnly(!singleHopOnly); } }, void 0)] }), void 0) }), void 0)] }), void 0));
}

var SettingsModal = function (_a) {
    var onDismiss = _a.onDismiss;
    var _b = tslib.__read(React.useState(false), 2), showConfirmExpertModal = _b[0], setShowConfirmExpertModal = _b[1];
    var _c = tslib.__read(useUserSlippageTolerance(), 2), userSlippageTolerance = _c[0], setUserslippageTolerance = _c[1];
    var _d = tslib.__read(useUserUsePoly(), 2), userUsePoly = _d[0], setUserUsePoly = _d[1];
    var _e = tslib.__read(useUserTransactionTTL(), 2), ttl = _e[0], setTtl = _e[1];
    // const [expertMode, toggleExpertMode] = useExpertModeManager()
    var _f = tslib.__read(useUserSingleHopOnly(), 2), singleHopOnly = _f[0], setSingleHopOnly = _f[1];
    // const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
    // const { onChangeRecipient } = useSwapActionHandlers()
    var t = useTranslation().t;
    if (showConfirmExpertModal) {
        return (jsxRuntime.jsx(Modal, tslib.__assign({ title: t('Are you sure?'), onBack: function () { return setShowConfirmExpertModal(false); }, onDismiss: onDismiss, style: { maxWidth: '420px' } }, { children: jsxRuntime.jsxs(ModalBody, { children: [jsxRuntime.jsx(Message, tslib.__assign({ variant: "warning", mb: "24px" }, { children: jsxRuntime.jsx(Text, { children: t("Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.") }, void 0) }), void 0), jsxRuntime.jsx(Text, tslib.__assign({ mb: "24px" }, { children: t('Only use this mode if you know what you’re doing.') }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ variant: "danger", id: "confirm-expert-mode", onClick: function () {
                            // eslint-disable-next-line no-alert
                            if (window.prompt("Please type the word \"confirm\" to enable expert mode.") === 'confirm') {
                                // toggleExpertMode()
                                setShowConfirmExpertModal(false);
                            }
                        } }, { children: t('Turn On Expert Mode') }), void 0)] }, void 0) }), void 0));
    }
    return (jsxRuntime.jsx(Modal, tslib.__assign({ title: t('Settings'), headerBackground: "gradients.cardHeader", onDismiss: onDismiss }, { children: jsxRuntime.jsx(ModalBody, { children: jsxRuntime.jsx(AutoColumn, tslib.__assign({ gap: "md" }, { children: jsxRuntime.jsx(SlippageTabs, { rawSlippage: userSlippageTolerance, setRawSlippage: setUserslippageTolerance, deadline: ttl, setDeadline: setTtl, userUsePoly: userUsePoly, setUserUsePoly: setUserUsePoly, singleHopOnly: singleHopOnly, setSingleHopOnly: setSingleHopOnly }, void 0) }), void 0) }, void 0) }), void 0));
};

function SettingsTab() {
    var _a = tslib.__read(useModal(jsxRuntime.jsx(SettingsModal, {}, void 0)), 1), onPresentSettingsModal = _a[0];
    var _b = tslib.__read(useExpertModeManager(), 1), expertMode = _b[0];
    return (jsxRuntime.jsx(NotificationDot, tslib.__assign({ show: expertMode }, { children: jsxRuntime.jsx(Button, tslib.__assign({ variant: "text", p: 0, onClick: onPresentSettingsModal, id: "open-settings-dialog-button" }, { children: jsxRuntime.jsx(Icon$6, { color: "primary", width: "22px" }, void 0) }), void 0) }), void 0));
}

// helper that can take a ethers library transaction response and add it to the list of transactions
function useTransactionAdder() {
    var _a = useActiveWeb3React(), chainId = _a.chainId, account = _a.account;
    var dispatch = reactRedux.useDispatch();
    return React.useCallback(function (response, _a) {
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
    var state = reactRedux.useSelector(function (s) { return s.transactions; });
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
    return React.useMemo(function () {
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

var TransactionState = styled__default["default"].div(templateObject_1$4 || (templateObject_1$4 = tslib.__makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  text-decoration: none !important;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0rem;\n  font-weight: 500;\n  font-size: 0.825rem;\n  color: ", ";\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  text-decoration: none !important;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0rem;\n  font-weight: 500;\n  font-size: 0.825rem;\n  color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.primary;
});
var IconWrapper = styled__default["default"].div(templateObject_2$2 || (templateObject_2$2 = tslib.__makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (_a) {
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
    return (jsxRuntime.jsxs(TransactionState, tslib.__assign({ pending: pending, success: success }, { children: [jsxRuntime.jsx(LinkExternal, tslib.__assign({ href: getBscScanLink(tx.hash, 'transaction', chainId) }, { children: summary !== null && summary !== void 0 ? summary : tx.hash }), void 0), jsxRuntime.jsx(IconWrapper, tslib.__assign({ pending: pending, success: success }, { children: pending ? jsxRuntime.jsx(CircleLoader, {}, void 0) : success ? jsxRuntime.jsx(Icon$a, { color: "success" }, void 0) : jsxRuntime.jsx(Icon$7, { color: "failure" }, void 0) }), void 0)] }), void 0));
}
var templateObject_1$4, templateObject_2$2;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a, b) {
    return b.addedTime - a.addedTime;
}
function renderTransactions(transactions) {
    return (jsxRuntime.jsx(Flex, tslib.__assign({ flexDirection: "column" }, { children: transactions.map(function (tx) {
            return jsxRuntime.jsx(Transaction, { tx: tx }, tx.hash + tx.addedTime);
        }) }), void 0));
}
var TransactionsModal = function (_a) {
    var onDismiss = _a.onDismiss;
    var _b = useActiveWeb3React(), account = _b.account, chainId = _b.chainId;
    var dispatch = reactRedux.useDispatch();
    var allTransactions = useAllTransactions();
    var t = useTranslation().t;
    var sortedRecentTransactions = React.useMemo(function () {
        var txs = Object.values(allTransactions);
        return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
    }, [allTransactions]);
    var pending = sortedRecentTransactions.filter(function (tx) { return !tx.receipt; });
    var confirmed = sortedRecentTransactions.filter(function (tx) { return tx.receipt; });
    var clearAllTransactionsCallback = React.useCallback(function () {
        if (chainId)
            dispatch(clearAllTransactions({ chainId: chainId }));
    }, [dispatch, chainId]);
    return (jsxRuntime.jsx(Modal, tslib.__assign({ title: t('Recent Transactions'), headerBackground: "gradients.cardHeader", onDismiss: onDismiss }, { children: account && (jsxRuntime.jsx(ModalBody, { children: !!pending.length || !!confirmed.length ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(AutoRow, tslib.__assign({ mb: "1rem", style: { justifyContent: 'space-between' } }, { children: [jsxRuntime.jsx(Text, { children: t('Recent Transactions') }, void 0), jsxRuntime.jsx(Button, tslib.__assign({ variant: "tertiary", scale: "xs", onClick: clearAllTransactionsCallback }, { children: t('clear all') }), void 0)] }), void 0), renderTransactions(pending), renderTransactions(confirmed)] }, void 0)) : (jsxRuntime.jsx(Text, { children: t('No recent transactions') }, void 0)) }, void 0)) }), void 0));
};

var Transactions = function () {
    var _a = tslib.__read(useModal(jsxRuntime.jsx(TransactionsModal, {}, void 0)), 1), onPresentTransactionsModal = _a[0];
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(Button, tslib.__assign({ variant: "text", p: 0, onClick: onPresentTransactionsModal, ml: "16px" }, { children: jsxRuntime.jsx(Icon$4, { color: "primary", width: "22px" }, void 0) }), void 0) }, void 0));
};

var BoxStyled = styled__default["default"](Box)(templateObject_1$3 || (templateObject_1$3 = tslib.__makeTemplateObject(["\n  padding: 20px;\n  width: 100%;\n"], ["\n  padding: 20px;\n  width: 100%;\n"])));
var AppHeaderContainer = styled__default["default"](Flex)(templateObject_2$1 || (templateObject_2$1 = tslib.__makeTemplateObject(["\n  align-items: flex-end;\n  justify-content: space-between;\n  width: 100%;\n"], ["\n  align-items: flex-end;\n  justify-content: space-between;\n  width: 100%;\n"])));
var AppHeader = function (_a) {
    var title = _a.title, subtitle = _a.subtitle, helper = _a.helper, backTo = _a.backTo, hideSetting = _a.hideSetting, tips = _a.tips, _b = _a.noConfig, noConfig = _b === void 0 ? false : _b;
    return (jsxRuntime.jsxs(BoxStyled, { children: [jsxRuntime.jsxs(AppHeaderContainer, { children: [jsxRuntime.jsxs(Flex, tslib.__assign({ alignItems: "center", mr: noConfig ? 0 : '16px' }, { children: [backTo && (jsxRuntime.jsx(IconButton, tslib.__assign({ as: reactRouterDom.Link, to: backTo }, { children: jsxRuntime.jsx(Icon$e, { color: 'primary', width: "32px" }, void 0) }), void 0)), jsxRuntime.jsxs(Flex, tslib.__assign({ alignContent: subtitle ? '' : 'center', justifyContent: subtitle ? '' : 'center', flexDirection: subtitle ? 'column' : 'row' }, { children: [jsxRuntime.jsxs(Flex, tslib.__assign({ alignItems: "center" }, { children: [jsxRuntime.jsx(Heading, tslib.__assign({ as: "h2", mb: subtitle ? '8px' : '0' }, { children: title }), void 0), helper && jsxRuntime.jsx(QuestionHelper, { placement: "top-start", text: helper, ml: "4px", mr: "4px" }, void 0)] }), void 0), jsxRuntime.jsx(Flex, tslib.__assign({ alignItems: "center" }, { children: jsxRuntime.jsx(Text, tslib.__assign({ ml: "0px", color: "text", fontSize: "14px" }, { children: subtitle }), void 0) }), void 0)] }), void 0)] }), void 0), !noConfig && (jsxRuntime.jsxs(Flex, { children: [hideSetting ? null : jsxRuntime.jsx(SettingsTab, {}, void 0), jsxRuntime.jsx(Transactions, {}, void 0)] }, void 0))] }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ mt: "8px", ml: "0px", color: "text", fontSize: "14px" }, { children: tips }), void 0)] }, void 0));
};
var templateObject_1$3, templateObject_2$1;

var BodyWrapper = styled__default["default"](Card$1)(templateObject_1$2 || (templateObject_1$2 = tslib.__makeTemplateObject(["\n  max-width: 436px;\n  width: 100%;\n  z-index: 1;\n"], ["\n  max-width: 436px;\n  width: 100%;\n  z-index: 1;\n"
    /**
     * The styled container element that wraps the content of most pages and the tabs.
     */
])));
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
function AppBody(_a) {
    var children = _a.children;
    return jsxRuntime.jsx(BodyWrapper, { children: children }, void 0);
}
var templateObject_1$2;

var ConnectWallet = React__default["default"].createContext({ onConnectWallet: null });
var ConnectWalletProvider = function (_a) {
    var children = _a.children, onConnectWallet = _a.onConnectWallet;
    return jsxRuntime.jsx(ConnectWallet.Provider, tslib.__assign({ value: { onConnectWallet: onConnectWallet } }, { children: children }), void 0);
};

var useConnectWallet = function () {
    var onConnectWallet = React.useContext(ConnectWallet).onConnectWallet;
    return { onConnectWallet: onConnectWallet };
};

var ConnectWalletButton = function (props) {
    var t = useTranslation().t;
    var onConnectWallet = useConnectWallet().onConnectWallet;
    return (jsxRuntime.jsx(Button, tslib.__assign({ onClick: onConnectWallet }, props, { children: t('Connect Wallet') }), void 0));
};

function useTokenAllowance(token, owner, spender) {
    var contract = useTokenContract(token === null || token === void 0 ? void 0 : token.address, false);
    var inputs = React.useMemo(function () { return [owner, spender]; }, [owner, spender]);
    var allowance = useSingleCallResult(contract, 'allowance', inputs).result;
    return React.useMemo(function () { return (token && allowance ? new dsgswapSdk.TokenAmount(token, allowance.toString()) : undefined); }, [token, allowance]);
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
    var token = amountToApprove instanceof dsgswapSdk.TokenAmount ? amountToApprove.token : undefined;
    var currentAllowance = useTokenAllowance(token, account !== null && account !== void 0 ? account : undefined, spender);
    var pendingApproval = useHasPendingApproval(token === null || token === void 0 ? void 0 : token.address, spender);
    // check the current approval status
    var t = useTranslation().t;
    var approvalState = React.useMemo(function () {
        if (!amountToApprove || !spender)
            return ApprovalState.UNKNOWN;
        if (amountToApprove.currency === dsgswapSdk.getActiveETHERWidthChainId())
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
    var approve = React.useCallback(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
        var useExact, estimatedGas;
        return tslib.__generator(this, function (_a) {
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
                    return [4 /*yield*/, tokenContract.estimateGas.approve(spender, constants.MaxUint256).catch(function () {
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
                            .approve(spender, useExact ? amountToApprove.raw.toString() : constants.MaxUint256, {
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
    }); }, [approvalState, t, token, tokenContract, amountToApprove, spender, addTransaction]);
    return [approvalState, approve];
}
// wraps useApproveCallback in the context of a swap
function useApproveCallbackFromTrade(trade, allowedSlippage) {
    if (allowedSlippage === void 0) { allowedSlippage = 0; }
    var amountToApprove = React.useMemo(function () { return (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field$2.INPUT] : undefined); }, [trade, allowedSlippage]);
    return useApproveCallback(amountToApprove, dsgswapSdk.getValueWithChainId(contracts.SwapRouter));
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
    var ttl = reactRedux.useSelector(function (state) { return state.user.userDeadline; });
    var blockTimestamp = useCurrentBlockTimestamp();
    return React.useMemo(function () {
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
    return React.useMemo(function () {
        var _a, _b, _c;
        if (!trade || !recipient || !library || !account || !chainId || !deadline)
            return [];
        var contract = getRouterContract(chainId, library, account);
        if (!contract) {
            return [];
        }
        var isDsgFrom = false;
        if (((_a = dsgswapSdk.SWAP_TOKEN[chainId]) === null || _a === void 0 ? void 0 : _a.address) === ((_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.address) && trade.tradeType === dsgswapSdk.TradeType.EXACT_OUTPUT) {
            isDsgFrom = true;
        }
        var swapMethods = [];
        swapMethods.push(dsgswapSdk.Router.swapCallParameters(trade, {
            feeOnTransfer: false,
            isDsgFrom: isDsgFrom,
            allowedSlippage: new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(allowedSlippage), BIPS_BASE),
            recipient: recipient,
            deadline: deadline.toNumber(),
        }));
        if (trade.tradeType === dsgswapSdk.TradeType.EXACT_INPUT) {
            swapMethods.push(dsgswapSdk.Router.swapCallParameters(trade, {
                feeOnTransfer: true,
                allowedSlippage: new dsgswapSdk.Percent(dsgswapSdk.JSBI.BigInt(allowedSlippage), BIPS_BASE),
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
    return React.useMemo(function () {
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
                return tslib.__awaiter(this, void 0, void 0, function () {
                    var estimatedCalls, successfulEstimation, errorCalls, _a, contract, _b, methodName, args, value;
                    return tslib.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, Promise.all(swapCalls.map(function (call) {
                                    var _a;
                                    var _b = call.parameters, methodName = _b.methodName, args = _b.args, value = _b.value, contract = call.contract;
                                    var options = !value || isZero(value) ? {} : { value: value };
                                    return (_a = contract.estimateGas)[methodName].apply(_a, tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(args)), [options])).then(function (gasEstimate) {
                                        return {
                                            call: call,
                                            gasEstimate: gasEstimate,
                                        };
                                    })
                                        .catch(function (gasError) {
                                        var _a;
                                        console.error('Gas estimate failed, trying eth_call to extract error', call);
                                        return (_a = contract.callStatic)[methodName].apply(_a, tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(args)), [options])).then(function (result) {
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
                                return [2 /*return*/, contract[methodName].apply(contract, tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(args)), [tslib.__assign({ 
                                            // gasLimit: calculateGasMargin(gasEstimate),
                                            // swap gasLimit
                                            gasLimit: 1530000 }, (value && !isZero(value) ? { value: value, from: account } : { from: account }))])).then(function (response) {
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
    var chainId = core.useWeb3React().chainId;
    var polyCurrencyData = React.useMemo(function () {
        var price = null;
        var currencyAmount = null;
        var toTokenAmount = null;
        var fromCurrencyToken = null;
        var fromCurrencyTokenAmount = null;
        if (polyData) {
            price = new dsgswapSdk.Price(polyData.fromToken, polyData.toToken, polyData.fromTokenAmount, polyData.toTokenAmount);
            var currency = new dsgswapSdk.Token(chainId, polyData.fromToken.address, polyData.fromToken.decimals, polyData.fromToken.symbol);
            currencyAmount = new dsgswapSdk.TokenAmount(currency, dsgswapSdk.JSBI.BigInt(polyData.fromTokenAmount));
            //  CurrencyAmount.ether(JSBI.BigInt(polyData.fromTokenAmount))
            var toToken = new dsgswapSdk.Token(chainId, polyData.toToken.address, polyData.toToken.decimals, polyData.toToken.symbol);
            toTokenAmount = new dsgswapSdk.TokenAmount(toToken, dsgswapSdk.JSBI.BigInt(polyData.toTokenAmount));
            // toTokenAmount = CurrencyAmount.ether(JSBI.BigInt(polyData.toTokenAmount))
            fromCurrencyToken = new dsgswapSdk.Token(dsgswapSdk.ChainId.MAINNET, polyData.fromToken.address, polyData.fromToken.decimals, polyData.fromToken.symbol, polyData.fromToken.name);
            fromCurrencyTokenAmount = new dsgswapSdk.TokenAmount(fromCurrencyToken, dsgswapSdk.JSBI.BigInt(polyData.fromTokenAmount));
        }
        return {
            price: price,
            currencyAmount: currencyAmount,
            fromCurrencyTokenAmount: fromCurrencyTokenAmount,
            fromCurrencyToken: fromCurrencyToken,
            toTokenAmount: toTokenAmount
        };
    }, [polyData, chainId]);
    var isPolyMethed = React.useMemo(function () {
        var _a;
        if (showWrap)
            return false;
        if (!polyData)
            return false;
        if (!trade)
            return true;
        return !!((_a = trade === null || trade === void 0 ? void 0 : trade.executionPrice) === null || _a === void 0 ? void 0 : _a.lessThan(polyCurrencyData === null || polyCurrencyData === void 0 ? void 0 : polyCurrencyData.price));
    }, [polyData, polyCurrencyData, trade, showWrap]);
    var polyDataRes = tslib.__assign(tslib.__assign({}, polyData), { isPolyMethed: isPolyMethed, price: polyCurrencyData.price, currencyAmount: polyCurrencyData.currencyAmount, fromCurrencyTokenAmount: polyCurrencyData.fromCurrencyTokenAmount, fromCurrencyToken: polyCurrencyData.fromCurrencyToken, toCurrencyAmount: polyCurrencyData.toTokenAmount });
    return {
        polyData: polyDataRes,
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
    var t = useTranslation().t;
    var wethContract = useWETHContract();
    var balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, inputCurrency);
    // we can always parse the amount typed as the input currency, since wrapping is 1:1
    var inputAmount = React.useMemo(function () { return tryParseAmount(typedValue, inputCurrency); }, [inputCurrency, typedValue]);
    var addTransaction = useTransactionAdder();
    var wEther = dsgswapSdk.getValueWithChainId(dsgswapSdk.WETHER);
    return React.useMemo(function () {
        if (!wethContract || !chainId || !inputCurrency || !outputCurrency)
            return NOT_APPLICABLE;
        var sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount);
        if (inputCurrency === dsgswapSdk.ETHER && dsgswapSdk.currencyEquals(dsgswapSdk.WETHER[chainId], outputCurrency)) {
            return {
                wrapType: WrapType.WRAP,
                execute: sufficientBalance && inputAmount
                    ? function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                        var txReceipt, error_1;
                        return tslib.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, wethContract.deposit({ value: "0x" + inputAmount.raw.toString(16) })];
                                case 1:
                                    txReceipt = _a.sent();
                                    addTransaction(txReceipt, { summary: t("Wrap %amoun% %symbolA% to %symbolB%", {
                                            amount: inputAmount.toSignificant(6),
                                            symbolA: wEther === null || wEther === void 0 ? void 0 : wEther.symbol,
                                            symbolB: dsgswapSdk.ETHER === null || dsgswapSdk.ETHER === void 0 ? void 0 : dsgswapSdk.ETHER.symbol,
                                        }) });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    console.error('Could not deposit', error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }
                    : undefined,
                inputError: sufficientBalance ? undefined : t('Insufficient %symbol% balance', { symbol: dsgswapSdk.ETHER.symbol }),
            };
        }
        if (dsgswapSdk.currencyEquals(dsgswapSdk.WETHER[chainId], inputCurrency) && outputCurrency === dsgswapSdk.ETHER) {
            return {
                wrapType: WrapType.UNWRAP,
                execute: sufficientBalance && inputAmount
                    ? function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                        var txReceipt, error_2;
                        return tslib.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, wethContract.withdraw("0x" + inputAmount.raw.toString(16))];
                                case 1:
                                    txReceipt = _a.sent();
                                    addTransaction(txReceipt, { summary: t("Unwrap %amoun% %symbolA% to %symbolB%", {
                                            amount: inputAmount.toSignificant(6),
                                            symbolA: wEther === null || wEther === void 0 ? void 0 : wEther.symbol,
                                            symbolB: dsgswapSdk.ETHER === null || dsgswapSdk.ETHER === void 0 ? void 0 : dsgswapSdk.ETHER.symbol,
                                        }) });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _a.sent();
                                    console.error('Could not withdraw', error_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }
                    : undefined,
                inputError: sufficientBalance ? undefined : t('Insufficient %symbol% balance', { symbol: wEther === null || wEther === void 0 ? void 0 : wEther.symbol }),
            };
        }
        return NOT_APPLICABLE;
    }, [wethContract, chainId, wEther, t, inputCurrency, outputCurrency, inputAmount, balance, addTransaction]);
}

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
function maxAmountSpend(currencyAmount) {
    if (!currencyAmount)
        return undefined;
    if (currencyAmount.currency === dsgswapSdk.getActiveETHERWidthChainId()) {
        if (dsgswapSdk.JSBI.greaterThan(currencyAmount.raw, MIN_BNB)) {
            return dsgswapSdk.CurrencyAmount.ether(dsgswapSdk.JSBI.subtract(currencyAmount.raw, MIN_BNB));
        }
        return dsgswapSdk.CurrencyAmount.ether(dsgswapSdk.JSBI.BigInt(0));
    }
    return currencyAmount;
}

var SafemoonWarning = function () {
    var t = useTranslation().t;
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(Text, { children: [t('To trade SAFEMOON, you must:'), " "] }, void 0), jsxRuntime.jsxs(Text, { children: ["\u2022 ", t('Click on the settings icon')] }, void 0), jsxRuntime.jsxs(Text, tslib.__assign({ mb: "24px" }, { children: ["\u2022 ", t('Set your slippage tolerance to 12%+')] }), void 0), jsxRuntime.jsx(Text, { children: t('This is because SafeMoon taxes a 10% fee on each transaction:') }, void 0), jsxRuntime.jsxs(Text, { children: ["\u2022 ", t('5% fee = redistributed to all existing holders')] }, void 0), jsxRuntime.jsxs(Text, { children: ["\u2022 ", t('5% fee = used to add liquidity')] }, void 0)] }, void 0));
};

var BondlyWarning = function () {
    var t = useTranslation().t;
    return jsxRuntime.jsx(Text, { children: t('Warning: BONDLY has been compromised. Please remove liqudity until further notice.') }, void 0);
};

var Acknowledgement = function (_a) {
    var handleContinueClick = _a.handleContinueClick;
    var t = useTranslation().t;
    var _b = tslib.__read(React.useState(false), 2), isConfirmed = _b[0], setIsConfirmed = _b[1];
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(Flex, tslib.__assign({ justifyContent: "space-between" }, { children: [jsxRuntime.jsxs(Flex, tslib.__assign({ alignItems: "center" }, { children: [jsxRuntime.jsx(Checkbox, { name: "confirmed", type: "checkbox", checked: isConfirmed, onChange: function () { return setIsConfirmed(!isConfirmed); }, scale: "sm" }, void 0), jsxRuntime.jsx(Text, tslib.__assign({ ml: "10px", style: { userSelect: 'none' } }, { children: t('I understand') }), void 0)] }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ disabled: !isConfirmed, onClick: handleContinueClick }, { children: t('Continue') }), void 0)] }), void 0) }, void 0));
};

var StyledModalContainer = styled__default["default"](ModalContainer)(templateObject_1$1 || (templateObject_1$1 = tslib.__makeTemplateObject(["\n  max-width: 440px;\n"], ["\n  max-width: 440px;\n"])));
var MessageContainer = styled__default["default"](Message)(templateObject_2 || (templateObject_2 = tslib.__makeTemplateObject(["\n  align-items: flex-start;\n  justify-content: flex-start;\n"], ["\n  align-items: flex-start;\n  justify-content: flex-start;\n"])));
// Modal is fired by a useEffect and doesn't respond to closeOnOverlayClick prop being set to false
var usePreventModalOverlayClick = function () {
    React.useEffect(function () {
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
            component: jsxRuntime.jsx(SafemoonWarning, {}, void 0),
        },
        _b[getAddress(SwapWarningTokens.bondly.address)] = {
            symbol: SwapWarningTokens.bondly.symbol,
            component: jsxRuntime.jsx(BondlyWarning, {}, void 0),
        },
        _b);
    var SWAP_WARNING = TOKEN_WARNINGS[swapCurrency.address];
    return (jsxRuntime.jsxs(StyledModalContainer, tslib.__assign({ minWidth: "280px" }, { children: [jsxRuntime.jsx(ModalHeader, tslib.__assign({ background: theme.colors.gradients.cardHeader }, { children: jsxRuntime.jsx(Heading, tslib.__assign({ p: "12px 24px" }, { children: t('Notice for trading %symbol%', { symbol: SWAP_WARNING.symbol }) }), void 0) }), void 0), jsxRuntime.jsxs(ModalBody, tslib.__assign({ p: "24px" }, { children: [jsxRuntime.jsx(MessageContainer, tslib.__assign({ variant: "warning", mb: "24px" }, { children: jsxRuntime.jsx(Box, { children: SWAP_WARNING.component }, void 0) }), void 0), jsxRuntime.jsx(Acknowledgement, { handleContinueClick: onDismiss }, void 0)] }), void 0)] }), void 0));
};
var templateObject_1$1, templateObject_2;

function usePloyCallData() {
    var _this = this;
    var _a = useActiveWeb3React(), account = _a.account, chainId = _a.chainId, library = _a.library;
    var _b = tslib.__read(useUserSlippageTolerance(), 1), allowedSlippage = _b[0];
    var polyDataIndex = useSwapState().polyDataIndex;
    var _c = polyDataIndex || {}, fromTokenAddress = _c.fromTokenAddress, toTokenAddress = _c.toTokenAddress, amountDecimal = _c.amountDecimal;
    var params = React.useMemo(function () { return ({
        fromTokenAddress: fromTokenAddress,
        toTokenAddress: toTokenAddress,
        amount: amountDecimal,
        fromAddress: account,
        slippage: allowedSlippage / 100,
    }); }, [fromTokenAddress, toTokenAddress, amountDecimal, account, allowedSlippage]);
    var polySwapCallback = React.useCallback(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
        var callData, res;
        return tslib.__generator(this, function (_a) {
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
    }); }, [chainId, params, library]);
    return {
        polySwapCallback: polySwapCallback,
    };
}

var GreyCardStyled = styled__default["default"](GreyCard)(templateObject_1 || (templateObject_1 = tslib.__makeTemplateObject(["\n  height: 40px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n"], ["\n  height: 40px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n"])));
function Swap(_a) {
    var _b, _c, _d;
    var _this = this;
    var _e, _f, _g, _h, _j, _k;
    var inputCurrencyId = _a.inputCurrencyId, outputCurrencyId = _a.outputCurrencyId, subTitleTips = _a.subTitleTips, titlehelper = _a.titlehelper, powered = _a.powered;
    var loadedUrlParams = useDefaultsFromURLSearch(outputCurrencyId, inputCurrencyId);
    var t = useTranslation().t;
    // token warning stuff
    var _l = tslib.__read([
        useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.inputCurrencyId),
        useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.outputCurrencyId),
    ], 2), loadedInputCurrency = _l[0], loadedOutputCurrency = _l[1];
    var urlLoadedTokens = React.useMemo(function () { var _a, _b; return (_b = (_a = [loadedInputCurrency, loadedOutputCurrency]) === null || _a === void 0 ? void 0 : _a.filter(function (c) { return c instanceof dsgswapSdk.Token; })) !== null && _b !== void 0 ? _b : []; }, [loadedInputCurrency, loadedOutputCurrency]);
    // dismiss warning if all imported tokens are in active lists
    var defaultTokens = useAllTokens();
    urlLoadedTokens &&
        urlLoadedTokens.filter(function (token) {
            return !(token.address in defaultTokens);
        });
    var _m = useActiveWeb3React(), account = _m.account, chainId = _m.chainId;
    // for expert mode
    var _o = tslib.__read(useExpertModeManager(), 1), isExpertMode = _o[0];
    // get custom setting values for user
    var _p = tslib.__read(useUserSlippageTolerance(), 1), allowedSlippage = _p[0];
    // swap state
    var _q = useSwapState(), independentField = _q.independentField, typedValue = _q.typedValue, recipient = _q.recipient, polyDataSimple = _q.polyData, polySpender = _q.polySpender;
    var _r = useDerivedSwapInfo(), v2Trade = _r.v2Trade, currencyBalances = _r.currencyBalances, parsedAmount = _r.parsedAmount, currencies = _r.currencies, pairState = _r.pairState, swapInputError = _r.inputError;
    var _s = useWrapCallback(currencies[Field$2.INPUT], currencies[Field$2.OUTPUT], typedValue), wrapType = _s.wrapType, onWrap = _s.execute, wrapInputError = _s.inputError;
    // when input is dsg, to disable output
    var disabledOutput = React.useMemo(function () {
        var _a;
        if (currencies[Field$2.INPUT] && ((_a = dsgswapSdk.SWAP_TOKEN[chainId]) === null || _a === void 0 ? void 0 : _a.equals(currencies[Field$2.INPUT]))) {
            return true;
        }
        return false;
    }, [chainId, currencies]);
    var showWrap = wrapType !== WrapType.NOT_APPLICABLE;
    var trade = showWrap ? undefined : v2Trade;
    var polyData = usePolySwap(polyDataSimple, trade, showWrap).polyData;
    var _t = tslib.__read(React.useState(false), 2), polySwapPending = _t[0], setPolySwapPending = _t[1];
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
    var handleTypeInput = React.useCallback(function (value) {
        onUserInput(Field$2.INPUT, value);
    }, [onUserInput]);
    var handleTypeOutput = React.useCallback(function (value) {
        onUserInput(Field$2.OUTPUT, value);
    }, [onUserInput]);
    // modal and loading
    var _v = tslib.__read(React.useState({
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
            : (_h = (_g = parsedAmounts[dependentField]) === null || _g === void 0 ? void 0 : _g.toSignificant(6, undefined, independentField === Field$2.INPUT ? dsgswapSdk.Rounding.ROUND_DOWN : dsgswapSdk.Rounding.ROUND_UP)) !== null && _h !== void 0 ? _h : '',
        _d);
    var route = trade === null || trade === void 0 ? void 0 : trade.route;
    var userHasSpecifiedInputOutput = Boolean(currencies[Field$2.INPUT] && currencies[Field$2.OUTPUT] && ((_j = parsedAmounts[independentField]) === null || _j === void 0 ? void 0 : _j.greaterThan(dsgswapSdk.JSBI.BigInt(0))));
    var noRoute = !route;
    // check whether the user has approved the router on the input token
    var _x = tslib.__read(useApproveCallbackFromTrade(trade, allowedSlippage), 2), approvalAsLiquild = _x[0], approveCallbackAsLiquild = _x[1];
    var _y = tslib.__read(useApproveCallbackPolyTrade(polyData === null || polyData === void 0 ? void 0 : polyData.fromCurrencyTokenAmount, polySpender), 2), approvalAsPoly = _y[0], approveCallbackAsPloy = _y[1];
    var _z = tslib.__read(React.useMemo(function () {
        return (polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed) ? [approvalAsPoly, approveCallbackAsPloy] : [approvalAsLiquild, approveCallbackAsLiquild];
    }, [polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed, approvalAsLiquild, approveCallbackAsLiquild, approvalAsPoly, approveCallbackAsPloy]), 2), approval = _z[0], approveCallback = _z[1];
    // const [approval, approveCallback] = useApproveCallbackFromTradeOrPoly(polyData?.isPolyMethed, trade, polyData?.currencyAmount, allowedSlippage)
    // check if user has gone through approval process, used to show two step buttons, reset on token change
    var _0 = tslib.__read(React.useState(false), 2), approvalSubmitted = _0[0], setApprovalSubmitted = _0[1];
    // mark when a user has submitted an approval, reset onTokenSelection for input field
    React.useEffect(function () {
        if (approval === ApprovalState.PENDING) {
            setApprovalSubmitted(true);
        }
    }, [approval, approvalSubmitted]);
    var maxAmountInput = maxAmountSpend(currencyBalances[Field$2.INPUT]);
    Boolean(maxAmountInput && ((_k = parsedAmounts[Field$2.INPUT]) === null || _k === void 0 ? void 0 : _k.equalTo(maxAmountInput)));
    // the callback to execute the swap
    var _1 = useSwapCallback(trade, allowedSlippage, recipient), swapCallback = _1.callback, swapCallbackError = _1.error;
    var polySwapCallback = usePloyCallData().polySwapCallback;
    var priceImpactWithoutFee = computeTradePriceBreakdown(trade).priceImpactWithoutFee;
    var _2 = tslib.__read(useUserSingleHopOnly(), 1), singleHopOnly = _2[0];
    var handleSwap = React.useCallback(function () {
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
    var handlePolySwap = React.useCallback(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
        var error_1;
        return tslib.__generator(this, function (_a) {
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
    }); }, [polySwapCallback, polyData, setPolySwapPending]);
    // errors
    var _3 = tslib.__read(React.useState(false), 2), showInverted = _3[0], setShowInverted = _3[1];
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
    var handleConfirmDismiss = React.useCallback(function () {
        setSwapState({ tradeToConfirm: tradeToConfirm, attemptingTxn: attemptingTxn, swapErrorMessage: swapErrorMessage, txHash: txHash });
        // if there was a tx hash, we want to clear the input
        if (txHash) {
            onUserInput(Field$2.INPUT, '');
        }
    }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);
    var handleAcceptChanges = React.useCallback(function () {
        setSwapState({ tradeToConfirm: trade, swapErrorMessage: swapErrorMessage, txHash: txHash, attemptingTxn: attemptingTxn });
    }, [attemptingTxn, swapErrorMessage, trade, txHash]);
    // swap warning state
    var _4 = tslib.__read(React.useState(null), 2), swapWarningCurrency = _4[0], setSwapWarningCurrency = _4[1];
    var _5 = tslib.__read(useModal(jsxRuntime.jsx(SwapWarningModal, { swapCurrency: swapWarningCurrency }, void 0)), 1), onPresentSwapWarningModal = _5[0];
    var shouldShowSwapWarning = function (swapCurrency) {
        var isWarningToken = Object.entries(SwapWarningTokens).find(function (warningTokenConfig) {
            var warningTokenData = warningTokenConfig[1];
            var warningTokenAddress = getAddress(warningTokenData.address);
            return swapCurrency.address === warningTokenAddress;
        });
        return Boolean(isWarningToken);
    };
    React.useEffect(function () {
        if (swapWarningCurrency) {
            onPresentSwapWarningModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swapWarningCurrency]);
    var handleInputSelect = React.useCallback(function (inputCurrency) {
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
    var handleMaxInput = React.useCallback(function () {
        if (maxAmountInput) {
            onUserInput(Field$2.INPUT, maxAmountInput.toFixed(6));
        }
    }, [maxAmountInput, onUserInput]);
    var handleOutputSelect = React.useCallback(function (outputCurrency) {
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
    var _6 = tslib.__read(useModal(jsxRuntime.jsx(ConfirmSwapModal, { trade: trade, originalTrade: tradeToConfirm, onAcceptChanges: handleAcceptChanges, attemptingTxn: attemptingTxn, txHash: txHash, recipient: recipient, allowedSlippage: allowedSlippage, onConfirm: handleSwap, swapErrorMessage: swapErrorMessage, customOnDismiss: handleConfirmDismiss }, void 0), true, true, 'confirmSwapModal'), 1), onPresentConfirmModal = _6[0];
    React.useMemo(function () {
        return noRoute || swapIsUnsupported;
    }, [noRoute, swapIsUnsupported]);
    var getButtonSupported = function () {
        var _a, _b;
        if (swapIsUnsupported)
            return (jsxRuntime.jsx(Flex, tslib.__assign({ justifyContent: "center" }, { children: jsxRuntime.jsx(Button, tslib.__assign({ maxWidth: "100%", width: "100%", disabled: true, mb: "4px" }, { children: t('Unsupported Asset') }), void 0) }), void 0));
        if (!account)
            return (jsxRuntime.jsx(Flex, tslib.__assign({ justifyContent: "center" }, { children: jsxRuntime.jsx(ConnectWalletButton, { width: "100%" }, void 0) }), void 0));
        if (showWrap)
            return (jsxRuntime.jsx(Flex, tslib.__assign({ justifyContent: "center" }, { children: jsxRuntime.jsx(Button, tslib.__assign({ width: "100%", disabled: Boolean(wrapInputError), onClick: onWrap }, { children: wrapInputError !== null && wrapInputError !== void 0 ? wrapInputError : (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null) }), void 0) }), void 0));
        if (noRoute && pairState === PairState.LOADING && !polyData.isPolyMethed) {
            return (jsxRuntime.jsx(GreyCardStyled, tslib.__assign({ style: { textAlign: 'center' } }, { children: jsxRuntime.jsx(Text, tslib.__assign({ color: "textSubtle", mb: "4px" }, { children: jsxRuntime.jsx(Dots, { children: t('Loading') }, void 0) }), void 0) }), void 0));
        }
        if (noRoute && userHasSpecifiedInputOutput && !polyData.isPolyMethed)
            return (jsxRuntime.jsxs(GreyCardStyled, tslib.__assign({ style: { textAlign: 'center' } }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ color: "textSubtle", mb: "4px" }, { children: t('Insufficient liquidity for this trade.') }), void 0), singleHopOnly && (jsxRuntime.jsx(Text, tslib.__assign({ color: "textSubtle", mb: "4px" }, { children: t('Try enabling multi-hop trades.') }), void 0))] }), void 0));
        if (showApproveFlow)
            return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(RowBetween, { children: [jsxRuntime.jsx(Button, tslib.__assign({ variant: approval === ApprovalState.APPROVED ? 'success' : 'primary', onClick: approveCallback, disabled: approval !== ApprovalState.NOT_APPROVED || approvalSubmitted, width: "48%" }, { children: approval === ApprovalState.PENDING ? (jsxRuntime.jsxs(AutoRow, tslib.__assign({ gap: "6px", justify: "center" }, { children: [t('Enabling'), " ", jsxRuntime.jsx(CircleLoader, { stroke: "white" }, void 0)] }), void 0)) : approvalSubmitted && approval === ApprovalState.APPROVED ? (t('Enabled')) : (t('Enable %asset%', { asset: (_b = (_a = currencies[Field$2.INPUT]) === null || _a === void 0 ? void 0 : _a.symbol) !== null && _b !== void 0 ? _b : '' })) }), void 0), polyData.isPolyMethed
                                ?
                                    jsxRuntime.jsx(Button, tslib.__assign({ width: "48%", disabled: !isValid || polySwapPending, onClick: function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                                            return tslib.__generator(this, function (_a) {
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
                                        }); } }, { children: polySwapPending
                                            ?
                                                jsxRuntime.jsx(Dots, { children: t('Swap') }, void 0)
                                            :
                                                swapInputError || t('Swap') }), void 0)
                                :
                                    jsxRuntime.jsx(Button, tslib.__assign({ variant: isValid && priceImpactSeverity > 2 ? 'danger' : 'primary', onClick: function () {
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
                                        }, width: "48%", id: "swap-button", disabled: !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode) }, { children: priceImpactSeverity > 3 && !isExpertMode
                                            ? t('Price Impact High')
                                            : priceImpactSeverity > 2
                                                ? t('Swap Anyway')
                                                : t('Swap') }), void 0)] }, void 0), jsxRuntime.jsx(Column, tslib.__assign({ style: { marginTop: '1rem' } }, { children: jsxRuntime.jsx(ProgressCircles, { steps: [approval === ApprovalState.APPROVED] }, void 0) }), void 0)] }, void 0));
        return (jsxRuntime.jsx(Flex, tslib.__assign({ justifyContent: "center" }, { children: polyData.isPolyMethed
                ?
                    jsxRuntime.jsx(Button, tslib.__assign({ width: "100%", disabled: !isValid || polySwapPending, onClick: function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                            return tslib.__generator(this, function (_a) {
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
                        }); } }, { children: polySwapPending
                            ?
                                jsxRuntime.jsx(Dots, { children: t('Swap') }, void 0)
                            :
                                swapInputError || t('Swap') }), void 0)
                :
                    jsxRuntime.jsx(Button, tslib.__assign({ width: "100%", variant: polyData.isPolyMethed ? 'primary' : (isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'), onClick: function () {
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
                        }, id: "swap-button", disabled: !isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError }, { children: (swapInputError ||
                            (priceImpactSeverity > 3 && !isExpertMode
                                ? t('Swap Anyway')
                                : priceImpactSeverity > 2
                                    ? t('Swap Anyway')
                                    : t('Swap'))) }), void 0) }), void 0));
    };
    return (jsxRuntime.jsx("div", { children: jsxRuntime.jsxs(AppBody, { children: [jsxRuntime.jsx(AppHeader, { title: t('Exchange'), helper: titlehelper, tips: subTitleTips }, void 0), jsxRuntime.jsxs(Wrapper$3, tslib.__assign({ id: "swap-page" }, { children: [jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "md" }, { children: [jsxRuntime.jsx(CurrencyInputPanel, { label: independentField === Field$2.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From'), value: formattedAmounts[Field$2.INPUT], showMaxButton: false, currency: currencies[Field$2.INPUT], onUserInput: handleTypeInput, onMax: handleMaxInput, onCurrencySelect: handleInputSelect, otherCurrency: currencies[Field$2.OUTPUT], id: "swap-currency-input", showCommonBases: true }, void 0), jsxRuntime.jsx(AutoColumn, tslib.__assign({ justify: "space-between" }, { children: jsxRuntime.jsxs(AutoRow, tslib.__assign({ justify: isExpertMode ? 'space-between' : 'center', style: { padding: '0 1rem' } }, { children: [jsxRuntime.jsx(ArrowWrapper, tslib.__assign({ clickable: true }, { children: jsxRuntime.jsx(Icon$1, { width: "20px", onClick: function () {
                                                        setApprovalSubmitted(false); // reset 2 step UI for approvals
                                                        onSwitchTokens();
                                                    }, color: currencies[Field$2.INPUT] && currencies[Field$2.OUTPUT] ? 'primary' : 'text' }, void 0) }), void 0), recipient === null && !showWrap && isExpertMode ? (jsxRuntime.jsx(Button, tslib.__assign({ variant: "text", id: "add-recipient-button", onClick: function () { return onChangeRecipient(''); } }, { children: t('+ Add a send (optional)') }), void 0)) : null] }), void 0) }), void 0), jsxRuntime.jsx(CurrencyInputPanel, { value: formattedAmounts[Field$2.OUTPUT], onUserInput: handleTypeOutput, 
                                    // label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
                                    label: independentField === Field$2.INPUT && !showWrap && trade ? t('To') : t('To'), showMaxButton: false, currency: currencies[Field$2.OUTPUT], onCurrencySelect: handleOutputSelect, otherCurrency: currencies[Field$2.INPUT], id: "swap-currency-output", disabled: disabledOutput, showCommonBases: true }, void 0), isExpertMode && recipient !== null && !showWrap ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(AutoRow, tslib.__assign({ justify: "space-between", style: { padding: '0 1rem' } }, { children: [jsxRuntime.jsx(ArrowWrapper, tslib.__assign({ clickable: false }, { children: jsxRuntime.jsx(Icon$1, { width: "32px" }, void 0) }), void 0), jsxRuntime.jsx(Button, tslib.__assign({ variant: "text", id: "remove-recipient-button", onClick: function () { return onChangeRecipient(null); } }, { children: t('- Remove send') }), void 0)] }), void 0), jsxRuntime.jsx(AddressInputPanel, { id: "recipient", value: recipient, onChange: onChangeRecipient }, void 0)] }, void 0)) : null, showWrap ? null : (jsxRuntime.jsxs(AutoColumn, tslib.__assign({ gap: "8px", style: { padding: '0' } }, { children: [(Boolean(trade) || polyData.isPolyMethed) && (jsxRuntime.jsx(RowBetween, tslib.__assign({ align: "center" }, { children: jsxRuntime.jsx(TradePrice, { price: (polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed) ? polyData === null || polyData === void 0 ? void 0 : polyData.price : trade === null || trade === void 0 ? void 0 : trade.executionPrice, showInverted: showInverted, setShowInverted: setShowInverted }, void 0) }), void 0)), allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (jsxRuntime.jsxs(RowBetween, tslib.__assign({ align: "center" }, { children: [jsxRuntime.jsx(Text, tslib.__assign({ fontSize: "16px" }, { children: t('Slippage Tolerance') }), void 0), jsxRuntime.jsxs(Text, tslib.__assign({ fontSize: "16px", color: "textSubtle" }, { children: [allowedSlippage / 100, "%"] }), void 0)] }), void 0))] }), void 0))] }), void 0), !swapIsUnsupported ? (jsxRuntime.jsx(AdvancedSwapDetailsDropdown, { isPolyMethed: polyData === null || polyData === void 0 ? void 0 : polyData.isPolyMethed, polyData: polyData, trade: trade }, void 0)) : (jsxRuntime.jsx(UnsupportedCurrencyFooter, { currencies: [currencies.INPUT, currencies.OUTPUT] }, void 0)), jsxRuntime.jsxs(Box, tslib.__assign({ mt: "0.5rem" }, { children: [isExpertMode && swapErrorMessage ? jsxRuntime.jsx(SwapCallbackError, { error: swapErrorMessage }, void 0) : null, getButtonSupported()] }), void 0)] }), void 0), jsxRuntime.jsx(Box, { children: powered }, void 0)] }, void 0) }, void 0));
}
var templateObject_1;

var FAST_INTERVAL = 10000;
var SLOW_INTERVAL = 60000;
var RefreshContext = React__default["default"].createContext({ slow: 0, fast: 0 });
// Check if the tab is active in the user browser
var useIsBrowserTabActive = function () {
    var isBrowserTabActiveRef = React.useRef(true);
    React.useEffect(function () {
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
    var _b = tslib.__read(React.useState(0), 2), slow = _b[0], setSlow = _b[1];
    var _c = tslib.__read(React.useState(0), 2), fast = _c[0], setFast = _c[1];
    var isBrowserTabActiveRef = useIsBrowserTabActive();
    React.useEffect(function () {
        var interval = setInterval(function () { return tslib.__awaiter(void 0, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                if (isBrowserTabActiveRef.current) {
                    setFast(function (prev) { return prev + 1; });
                }
                return [2 /*return*/];
            });
        }); }, FAST_INTERVAL);
        return function () { return clearInterval(interval); };
    }, [isBrowserTabActiveRef]);
    React.useEffect(function () {
        var interval = setInterval(function () { return tslib.__awaiter(void 0, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                if (isBrowserTabActiveRef.current) {
                    setSlow(function (prev) { return prev + 1; });
                }
                return [2 /*return*/];
            });
        }); }, SLOW_INTERVAL);
        return function () { return clearInterval(interval); };
    }, [isBrowserTabActiveRef]);
    return jsxRuntime.jsx(RefreshContext.Provider, tslib.__assign({ value: { slow: slow, fast: fast } }, { children: children }), void 0);
};

var initialState$7 = { currentBlock: 0, initialBlock: 0 };
var blockSlice = toolkit.createSlice({
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
var application = toolkit.createReducer(initialState$6, function (builder) {
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
var updateVersion = toolkit.createAction('global/updateVersion');

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
var user = toolkit.createReducer(initialState$5, function (builder) {
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
var transactions = toolkit.createReducer(initialState$4, function (builder) {
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
var typeInput$1 = toolkit.createAction('mint/typeInputMint');
var resetMintState = toolkit.createAction('mint/resetMintState');

var initialState$3 = {
    independentField: Field$1.CURRENCY_A,
    typedValue: '',
    otherTypedValue: '',
};
var mint = toolkit.createReducer(initialState$3, function (builder) {
    return builder
        .addCase(resetMintState, function () { return initialState$3; })
        .addCase(typeInput$1, function (state, _a) {
        var _b = _a.payload, field = _b.field, typedValue = _b.typedValue, noLiquidity = _b.noLiquidity;
        if (noLiquidity) {
            // they're typing into the field they've last typed in
            if (field === state.independentField) {
                return tslib.__assign(tslib.__assign({}, state), { independentField: field, typedValue: typedValue });
            }
            // they're typing into a new field, store the other value
            return tslib.__assign(tslib.__assign({}, state), { independentField: field, typedValue: typedValue, otherTypedValue: state.typedValue });
        }
        return tslib.__assign(tslib.__assign({}, state), { independentField: field, typedValue: typedValue, otherTypedValue: '' });
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
    byUrl: tslib.__assign({}, (_a = getTokenDefaultList()).concat.apply(_a, tslib.__spreadArray([], tslib.__read(UNSUPPORTED_LIST_URLS))).reduce(function (memo, listUrl) {
        memo[listUrl] = NEW_LIST_STATE;
        return memo;
    }, {})),
    activeChainId: dsgswapSdk.chainIdProxy.chainId,
    activeListUrls: getTokenDefaultActiveList(),
};
var lists = toolkit.createReducer(initialState$2, function (builder) {
    return builder
        .addCase(fetchTokenList.pending, function (state, _a) {
        var _b = _a.payload, requestId = _b.requestId, url = _b.url;
        state.byUrl[url] = tslib.__assign(tslib.__assign({ current: null, pendingUpdate: null }, state.byUrl[url]), { loadingRequestId: requestId, error: null });
    })
        .addCase(fetchTokenList.fulfilled, function (state, _a) {
        var _b, _c, _d;
        var _e = _a.payload, requestId = _e.requestId, tokenList = _e.tokenList, url = _e.url;
        var current = (_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.current;
        var loadingRequestId = (_c = state.byUrl[url]) === null || _c === void 0 ? void 0 : _c.loadingRequestId;
        // no-op if update does nothing
        if (current) {
            var upgradeType = tokenLists.getVersionUpgrade(current.version, tokenList.version);
            if (upgradeType === tokenLists.VersionUpgrade.NONE)
                return;
            if (loadingRequestId === null || loadingRequestId === requestId) {
                state.byUrl[url] = tslib.__assign(tslib.__assign({}, state.byUrl[url]), { loadingRequestId: null, error: null, current: current, pendingUpdate: tokenList });
            }
        }
        else {
            // activate if on default active
            if (getTokenDefaultActiveList().includes(url)) {
                (_d = state.activeListUrls) === null || _d === void 0 ? void 0 : _d.push(url);
            }
            state.byUrl[url] = tslib.__assign(tslib.__assign({}, state.byUrl[url]), { loadingRequestId: null, error: null, current: tokenList, pendingUpdate: null });
        }
    })
        .addCase(fetchTokenList.rejected, function (state, _a) {
        var _b;
        var _c = _a.payload, url = _c.url, requestId = _c.requestId, errorMessage = _c.errorMessage;
        if (((_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.loadingRequestId) !== requestId) {
            // no-op since it's not the latest request
            return;
        }
        state.byUrl[url] = tslib.__assign(tslib.__assign({}, state.byUrl[url]), { loadingRequestId: null, error: errorMessage, current: null, pendingUpdate: null });
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
        state.byUrl[url] = tslib.__assign(tslib.__assign({}, state.byUrl[url]), { pendingUpdate: null, current: state.byUrl[url].pendingUpdate });
    })
        .addCase(acceptListUpdateOfChainId, function (state, _a) {
        var _b;
        var chainId = _a.payload;
        if (state.activeChainId === chainId)
            return;
        state.activeChainId = chainId;
        state.byUrl = tslib.__assign({}, (_b = getTokenDefaultList()).concat.apply(_b, tslib.__spreadArray([], tslib.__read(UNSUPPORTED_LIST_URLS))).reduce(function (memo, listUrl) {
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
var typeInput = toolkit.createAction('burn/typeInputBurn');

var initialState$1 = {
    independentField: Field.LIQUIDITY_PERCENT,
    typedValue: '0',
};
var burn = toolkit.createReducer(initialState$1, function (builder) {
    return builder.addCase(typeInput, function (state, _a) {
        var _b = _a.payload, field = _b.field, typedValue = _b.typedValue;
        return tslib.__assign(tslib.__assign({}, state), { independentField: field, typedValue: typedValue });
    });
});

var initialState = {
    callResults: {},
};
var multicall = toolkit.createReducer(initialState, function (builder) {
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
var store = toolkit.configureStore({
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
    middleware: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(toolkit.getDefaultMiddleware({ thunk: true }))), [reduxLocalstorageSimple.save({ states: PERSISTED_KEYS })]),
    preloadedState: reduxLocalstorageSimple.load({ states: PERSISTED_KEYS }),
});
store.dispatch(updateVersion());

var ThemeProviderWrapper = function (_a) {
    var isDark = _a.isDark, resetTheme = _a.resetTheme, props = tslib.__rest(_a, ["isDark", "resetTheme"]);
    return jsxRuntime.jsx(styled.ThemeProvider, tslib.__assign({ theme: isDark ? merge__default["default"](darkTheme, resetTheme === null || resetTheme === void 0 ? void 0 : resetTheme.dark) : merge__default["default"](lightTheme, resetTheme === null || resetTheme === void 0 ? void 0 : resetTheme.light) }, props), void 0);
};
var Providers = function (_a) {
    var isDark = _a.isDark; _a.chainId; var lang = _a.lang, children = _a.children, resetTheme = _a.resetTheme, onConnectWallet = _a.onConnectWallet, props = tslib.__rest(_a, ["isDark", "chainId", "lang", "children", "resetTheme", "onConnectWallet"]);
    return (jsxRuntime.jsx(reactRedux.Provider, tslib.__assign({ store: store }, { children: jsxRuntime.jsx(ConnectWalletProvider, tslib.__assign({}, props, { onConnectWallet: onConnectWallet }, { children: jsxRuntime.jsx(ToastsProvider, { children: jsxRuntime.jsx(reactHelmetAsync.HelmetProvider, { children: jsxRuntime.jsx(ThemeProviderWrapper, tslib.__assign({ resetTheme: resetTheme, isDark: isDark }, { children: jsxRuntime.jsx(LanguageProvider, tslib.__assign({ lang: lang }, { children: jsxRuntime.jsx(RefreshContextProvider, { children: jsxRuntime.jsx(ModalProvider, { children: jsxRuntime.jsx(ModalProvider$1, { children: children }, void 0) }, void 0) }, void 0) }), void 0) }), void 0) }, void 0) }, void 0) }), void 0) }), void 0));
};

function Updaters() {
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Updater$2, {}, void 0), jsxRuntime.jsx(Updater$3, {}, void 0), jsxRuntime.jsx(Updater, {}, void 0), jsxRuntime.jsx(Updater$1, {}, void 0)] }, void 0));
}
function ListenerCurrencyChange(_a) {
    var onInputCurrencyChange = _a.onInputCurrencyChange, onOutputCurrencyChange = _a.onOutputCurrencyChange;
    var _b = useSwapCurrencies(), inputCurrency = _b.inputCurrency, outputCurrency = _b.outputCurrency;
    var _c = tslib.__read(React.useState(inputCurrency), 2), oldInputCurrency = _c[0], setOldInputCurrency = _c[1];
    var _d = tslib.__read(React.useState(outputCurrency), 2), oldOutputCurrency = _d[0], setOldOutputCurrency = _d[1];
    React.useEffect(function () {
        if ((inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.symbol) !== (oldInputCurrency === null || oldInputCurrency === void 0 ? void 0 : oldInputCurrency.symbol) || (inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.name) !== (oldInputCurrency === null || oldInputCurrency === void 0 ? void 0 : oldInputCurrency.name)) {
            setOldInputCurrency(inputCurrency);
            if (typeof onInputCurrencyChange === 'function') {
                onInputCurrencyChange(inputCurrency);
            }
        }
    }, [inputCurrency, oldInputCurrency, onInputCurrencyChange]);
    React.useEffect(function () {
        if ((outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.symbol) !== (oldOutputCurrency === null || oldOutputCurrency === void 0 ? void 0 : oldOutputCurrency.symbol) || (outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.name) !== (oldOutputCurrency === null || oldOutputCurrency === void 0 ? void 0 : oldOutputCurrency.name)) {
            setOldOutputCurrency(outputCurrency);
            if (typeof onOutputCurrencyChange === 'function') {
                onOutputCurrencyChange(outputCurrency);
            }
        }
    }, [outputCurrency, oldOutputCurrency, onOutputCurrencyChange]);
    return null;
}
function Blocklist(_a) {
    var children = _a.children;
    var account = useActiveWeb3React().account;
    var blocked = React.useMemo(function () { return Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1); }, [account]);
    if (blocked) {
        return jsxRuntime.jsx("div", { children: "Blocked address" }, void 0);
    }
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: children }, void 0);
}
var MiniSwap = function (_a) {
    var isDark = _a.isDark, lang = _a.lang, resetTheme = _a.resetTheme, onLoaded = _a.onLoaded, onInputCurrencyChange = _a.onInputCurrencyChange, onOutputCurrencyChange = _a.onOutputCurrencyChange, onConnectWallet = _a.onConnectWallet, inputCurrencyId = _a.inputCurrencyId, outputCurrencyId = _a.outputCurrencyId, chainId = _a.chainId, subTitleTips = _a.subTitleTips, titlehelper = _a.titlehelper, powered = _a.powered;
    React.useEffect(function () {
        console.debug("chainId is change " + chainId);
        dsgswapSdk.setChainId(chainId);
    }, [chainId]);
    var _b = tslib.__read(React.useState(false), 2), loaded = _b[0], setLoaded = _b[1];
    React.useEffect(function () {
        if (!loaded && typeof onLoaded === 'function') {
            setLoaded(true);
            onLoaded();
        }
    }, [onLoaded, loaded]);
    return (jsxRuntime.jsxs(Providers, tslib.__assign({ resetTheme: resetTheme, lang: lang, onConnectWallet: onConnectWallet, isDark: isDark, chainId: chainId }, { children: [jsxRuntime.jsx(Updaters, {}, void 0), jsxRuntime.jsx(ListenerCurrencyChange, { onInputCurrencyChange: onInputCurrencyChange, onOutputCurrencyChange: onOutputCurrencyChange }, void 0), jsxRuntime.jsx(Blocklist, { children: jsxRuntime.jsx(Swap, { subTitleTips: subTitleTips, titlehelper: titlehelper, powered: powered, outputCurrencyId: outputCurrencyId, inputCurrencyId: inputCurrencyId }, void 0) }, void 0)] }), void 0));
};

module.exports = MiniSwap;
