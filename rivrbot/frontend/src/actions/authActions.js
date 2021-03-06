import axios from 'axios'
import { fetchUser } from './userActions'
import { fetchUserTripReports } from './tripReportActions'

// Action creators
export const authStart = () => ({ type: 'AUTH_START' })
export const authSuccess = (token) => ({ type: 'AUTH_SUCCESS', token })
export const authFail = () => ({ type: 'AUTH_FAIL' })

/*
The token stored in localStorage to authenticate the user is removed, logging
the user out.
*/
export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  return {
    type: 'AUTH_LOGOUT',
  }
}

/*
Logs user in using axios and recieves a token from the Django API. This token
is stored in localStorage.
*/
export const authLogin = (username, password) => (dispatch) => {
  dispatch(authStart())
  axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rest-auth/login/`, {
    username,
    password,
  })
    .then((response) => {
      const token = response.data.key
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(authSuccess(token))
      dispatch(fetchUser())
      dispatch(fetchUserTripReports(username))
    })
    .catch((err) => {
      dispatch(authFail())
      dispatch({ type: 'ADD_ERROR', error: err })
    })

}

/*
Similar to login, registers a user with the Django REST API which returns a
token to authenticate the user. This token is stored in localStorage.
*/
export const authRegister = (username, email, password1, password2, home, street, state, zipcode) => (dispatch) => {
  localStorage.removeItem('token')
  dispatch(authStart())
  // console.log(username, email, password1, password2, home);
 const home = 240;
  axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rest-auth/registration/`, {
    username,
    email,
    password1,
    password2,
    home,
    street,
    state,
    zipcode
  })
    .then((response) => {
      // console.log(response);
      const token = response.data.key
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(authSuccess(token))
      dispatch(fetchUser())
      dispatch({ type: 'ADD_SUCCESS', success: 'You have successfully registered.' })
      // axios.post(`${process.env.REACT_APP_API_URL}/customer-created/webhook/`)
    })
    .catch((error) => {
      var errorArray = error.response;
      if(errorArray.data.email){
        dispatch(authFail())
        dispatch({ type: 'ADD_ERROR', error: errorArray.data.email[0] })
      }
      if(errorArray.data.username){
        dispatch(authFail())
        dispatch({ type: 'ADD_ERROR', error: errorArray.data.username[0]  })
      }
      if(errorArray.data.password1){
        // console.log(errorArray.data.password1[0] );
        dispatch(authFail())
        dispatch({
          type: 'ADD_ERROR',
          error:  'This password is incorrect. Requires: 8 or more characters, 1 or more Uppcase Letters, Atleast one special character (!?/#). '
        })
      }
       
      // if(errorArray.data.password2){
      //   // console.log(errorArray.data.password2[0] );
      //   dispatch(authFail())
      //   dispatch({
      //     type: 'ADD_ERROR',
      //     error:  'This passwords did not match, try again.'
      //   })
      // }
      // if(!errorArray.data.email, !errorArray.data.username, !errorArray.data.password1 ){
      //   dispatch(authFail())
      //   dispatch({ type: 'ADD_ERROR', error: error })
      // }
      // console.log(error.message);
      // console.log(error.config);
    })
}

/*
Checks to see if the authentication token exists in localStorage. If a token
exists, it runs the login function. If no token exits it runs the logout
function.
*/
export const authCheckState = () => {
  const token = localStorage.getItem('token')
  return (dispatch) => {
    if (token === null) {
      dispatch(authLogout())
    } else {
      dispatch(authSuccess(token))
    }
  }
}

/*
The users email is posted to the Django url, which then sends an email with a
link where the user can reset their password. Since the state is not changing,
there is no need to dispatch any actions other than those related to success
and errors.
*/
export const requestPasswordReset = (email) => (dispatch) => {

  axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rest-auth/password/reset/`, {
    email,
  })
    .then(() => {
      dispatch({ type: 'ADD_SUCCESS', success: 'An email has been sent with instructions.' })
    })
    .catch((err) => {
      dispatch({ type: 'ADD_ERROR', error: err })
    })
}
