

//Get Expense
export function getTheme(theme) {
    return async (dispatch) => {
        if (theme) {
            localStorage.setItem("theme", theme)

            dispatch(getThemeSuccess(theme))
        } else {
            let theme2 = localStorage.getItem("theme")

            dispatch(getThemeSuccess(theme2))

        }
    };
}
export const GET_THEME = "GET_THEME";
export const getThemeSuccess = (payload) => ({
    type: GET_THEME,
    payload: payload,
});

