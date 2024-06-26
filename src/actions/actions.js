import actionTypes from "./actionTypes";

export const addItemToStore = (item) => async (dispatch) => {
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

export const updateItemInStore = (item) => async (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_ITEM,
        payload: item
    });
};