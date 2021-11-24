import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]

const getNodeUrl = () => {
  // return process.env.REACT_APP_NODE_3
  // return 'http://192.168.101.129:8545/'
  return 'https://data-seed-prebsc-1-s3.binance.org:8545/'
  // return sample(nodes)
}

export default getNodeUrl
