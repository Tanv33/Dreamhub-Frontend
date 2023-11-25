import { GET_THEME } from "../action/theme";

const initialState = {
    theme: false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        default:
            return {
                ...state
            }

    }
}