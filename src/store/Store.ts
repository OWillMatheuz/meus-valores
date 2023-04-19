import {createStore} from 'redux';
export const deleteItem = (index: any) => {
    return {
      type: 'DELETE_ITEM',
      payload: index
    }
  }
  
  // historicoReducer.js
  const initialState = {
    historico: []
  };
  
  const historicoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          historico: [...state.historico, action.payload]
        };
      case 'DELETE_ITEM':
        const index = action.payload;
        const newHistorico = state.historico.slice();
        newHistorico.splice(index, 1);
        return {
          ...state,
          historico: newHistorico
        };
      default:
        return state;
    }
  };
  