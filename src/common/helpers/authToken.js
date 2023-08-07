/**
 * @desc set login token and set user
 */
// export const setLoginToken = (data) => async (dispatch) => {
//   // save auth details and set token in header for request
//   saveToken(data);
//   // Decode token to get user data
//   const decoded = jwt_decode(data.token);
//   const user = {
//     ...decoded,
//     _id: decoded.id,
//   };
//   delete user.id;
//   // Set current user
//   dispatch(setCurrentUser(user));
// };
