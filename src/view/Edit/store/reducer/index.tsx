import React from 'react';

const initState = {
  value: '默认值'
}
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'nikename':
      return Object.assign({}, state, action)
    default:
      break;
  }
}

export default reducer;