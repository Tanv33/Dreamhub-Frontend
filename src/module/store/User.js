import { GET_SIGNED_IN_USER, SIGN_IN_LOADER, SIGN_UP_LOADER, UPDATE_PROFILE_LOADER } from "../action/user-task";


const initialState = {
    signedInUser: false,
    signedUpLoader: false,
    updateProfileLoader: false,
    signInLoader: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SIGNED_IN_USER:
            return {
                ...state,
                signedInUser: action.payload,
            };
        case SIGN_UP_LOADER:
            return {
                ...state,
                signedUpLoader: action.payload
            }
        case UPDATE_PROFILE_LOADER:
            return {
                ...state,
                updateProfileLoader: action.payload
            }
        case SIGN_IN_LOADER:
            return {
                ...state,
                signInLoader: action.payload
            }
            
        default:
            return {
                ...state
            }

    }
}