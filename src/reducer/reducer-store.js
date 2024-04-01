// import json file
import dummy from './cartItems.json';
import actionTypes from '../actions/actionTypes';

const initialState = {
    // load the cart items from a json file
    cartItems: dummy.data
};

export default function appReducer(state=initialState, action) {
    switch(action.type) {
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case actionTypes.REMOVE_ITEM:
            console.log("Removing item with id: ", action.payload);
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload)
            };
        default:
            return state;
    }
}