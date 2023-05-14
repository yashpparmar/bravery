export const register = (obj) => async (dispatch, getState) => {
  try {
    if (!obj) {
      dispatchAuthError('body is required', dispatch)
    } else {
    }
  } catch (error) {
  } finally {
  }
}

function dispatchAuthError(msg, dispatch) {
  dispatch(setAuthResponseError(msg))
}
