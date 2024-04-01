import actionTypes from "./actionTypes";

export const addItem = (item) => async (dispatch) => {
    dispatch({
        type: actionTypes.ADD_ITEM,
        payload: item
    });
};

export const removeItemfromStore = (id) => async (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_ITEM,
        payload: id
    });
};