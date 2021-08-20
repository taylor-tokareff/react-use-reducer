/* eslint-disable max-len */
import React, { useReducer } from 'react';

const initialState = {
  before: [],
  current: '#ff0000',
  after: []
};

const UNDO = 'UNDO';
const REDO = 'REDO';
const RECORD = 'RECORD';

const undo = () => ({ type: UNDO });
const redo = () => ({ type: REDO });
const record = (color) => ({
  type: RECORD,
  payload: color
});

const reducer = (state, action) => {
  switch (action.type) {
    case UNDO:
      return {
        ...state,
        current: state.before[state.before.length - 1],
        after: [state.current, ...state.after],
        before: state.before.slice(0, -1)
      };
    case REDO:
      return {
        ...state,
        current: state.after[0],
        after: state.after.slice(1),
        before: [...state.before, state.current]
      };
    case RECORD:
      return {
        ...state,
        current: action.payload,
        before: [...state.before, state.current]
      };
  }
};

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <button onClick={() => dispatch(undo())} data-testid="undo" >undo</button>
      <button onClick={() => dispatch(redo())} data-testid="redo">redo</button>
      <input
        type="color"
        data-testid="input"
        value={state.current}
        onChange={({ target }) => dispatch(record(target.value))}
      />
      <div
        role="colordiv"
        style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}

export default App;
