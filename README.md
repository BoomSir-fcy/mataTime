## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

<!-- 测试环境/内网本地 -->

REACT_APP_VERSION = $npm_package_version
REACT_APP_API_HOST = "http://192.168.101.129:8888"
REACT_APP_DSG_API_HOST = "https://api.dsgmetaverse.com/"
GENERATE_SOURCEMAP = false
port=3007

REACT_APP_CHAIN_ID = 97

# 10+ nodes balanced, US/EU

REACT_APP_NODE_1 = "https://data-seed-prebsc-1-s1.binance.org:8545/"

# 10+ nodes balanced, US/EU

REACT_APP_NODE_2 = "https://data-seed-prebsc-2-s3.binance.org:8545/"

# 10+ nodes balanced in each region, global

REACT_APP_NODE_3 = "https://data-seed-prebsc-1-s3.binance.org:8545/"

REACT_APP_WEB_URL = "http://localhost:3000"

React_APP_WS_URL = "ws://192.168.101.129:8888"
REACT_APP_GRAPH_API = "https://api.thegraph.com/subgraphs/name/dinosaur-eggs"

<!-- 外网 -->

REACT_APP_VERSION = $npm_package_version
REACT_APP_API_HOST = "https://api.metatime.social/"
REACT_APP_DSG_API_HOST = "https://sv.dsgmetaverse.com/"
GENERATE_SOURCEMAP = false
port=3007

REACT_APP_CHAIN_ID = 56

# 10+ nodes balanced, US/EU

REACT_APP_NODE_1 = "https://nodes.pancakeswap.com/"

# 10+ nodes balanced, US/EU

REACT_APP_NODE_2 = "https://nodes.pancakeswap.com/"

# 10+ nodes balanced in each region, global

REACT_APP_NODE_3 = "https://nodes.pancakeswap.com/"

REACT_APP_WEB_URL = "https://app.social.io"

React_APP_WS_URL = "wss://api.metatime.social"

REACT_APP_GRAPH_API = "https://api.thegraph.com/subgraphs/name/dinosaur-eggs"
