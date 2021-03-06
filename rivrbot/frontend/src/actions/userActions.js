import axios from 'axios'

// Fetch authenticated user action creators
export const fetchUserPending = () => ({ type: 'FETCH_USER_PENDING' })
export const fetchUserFulfilled = (user) => ({ type: 'FETCH_USER_FULFILLED', user })
export const fetchUserRejected = () => ({ type: 'FETCH_USER_REJECTED' })

// Update user data action creator
export const putUserDataFulfilled = (user) => ({ type: 'PUT_USER_DATA_FULFILLED', user })
export const putUserDataRejected = () => ({ type: 'PUT_USER_DATA_REJECTED' })

// Update stipe user data
export const putUserSubscriptionDataFulfilled = (user) => ({ type: 'PUT_USER_SUBSCRIPTION_DATA_FULFILLED', user })
export const putUserSubscriptionDataRejected = () => ({ type: 'PUT_USER_SUBSCRIPTION_DATA_REJECTED' })

// Fetch sungle user action creators
export const fetchSingleUserPending = () => ({ type: 'FETCH_SINGLE_USER_PENDING' })
export const fetchSingleUserFulfilled = (user) => ({ type: 'FETCH_SINGLE_USER_FULFILLED', user })
export const fetchSingleUserRejected = () => ({ type: 'FETCH_SINGLE_USER_REJECTED' })


// Fetch authenticated user action stripe account
// export const fetchSingleUserStripe = () => ({ type: ' ' })

// GET requests the Django REST API, which returns authenticated user object.
export const fetchUser = () => {
  const token = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(fetchUserPending())
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/rest-auth/user/`, { headers: { Authorization: `Token ${token}` } })
      .then((response) => {
        const user = response.data
        dispatch(fetchUserFulfilled(user))
      })
      .catch((err) => {
        dispatch(fetchUserRejected())
        dispatch({ type: 'ADD_ERROR', error: err })
      })
  }
}

// PUT requests the Django REST API to update user object.
export const putUserData = (username, email, countries, home, biography, street, state, zipcode, success) => {
  const token = localStorage.getItem('token')
  return (dispatch) => {
    // console.log(street);
    axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/rest-auth/user/`,
      {
        username,
        email,
        countries,
        home,
        biography,
        street,
        state,
        zipcode,
      },
      { headers: { Authorization: `Token ${token}` } },
  )
      .then((response) => {
        const user = response.data
        dispatch(putUserDataFulfilled(user))
        dispatch({ type: 'ADD_SUCCESS', success })
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log(err.message);

        dispatch(putUserDataRejected())
        dispatch({ type: 'ADD_ERROR', error: err })
      })
  }
}


// GET requests the Django REST API, which returns user object from List View.
export const fetchSingleUser = (username) => (dispatch) => {
    dispatch(fetchSingleUserPending())
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/?search=${username}`)
      .then((response) => {
        const user = response.data
        dispatch(fetchSingleUserFulfilled(user))
      })
      .catch((err) => {
        dispatch(fetchSingleUserRejected())
        dispatch({ type: 'ADD_ERROR', error: err })
      })
  }

  // PUT requests the Django REST API to update user object.
  export const putUserSubscriptionData = (product, success) => {
    const token = localStorage.getItem('token')
    return (dispatch) => {
      // console.log(product, success);
      axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/rest-auth/user/`,
        {
          product,
          success
        },
        { headers: { Authorization: `Token ${token}` } },
    )
        .then((response) => {
          const user = response.data
          dispatch(putUserDataFulfilled(user))
          dispatch({ type: 'ADD_SUCCESS', success })
        })
        .catch((err) => {
          // console.log(err);
          dispatch(putUserDataRejected())
          dispatch({ type: 'ADD_ERROR', error: err })
        })
    }
  }
