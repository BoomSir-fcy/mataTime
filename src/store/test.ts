import produce from "immer";

const initialState = {
	show: false
};
  
export type Test = typeof initialState;

const TestStore = (state = initialState, action) => produce(state, draft => {
	switch (action.type) {
    case "TEST/SHOW":
      draft.show = !state.show;
    break;
	}
});

export default TestStore;