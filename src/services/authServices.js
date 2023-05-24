import axios from 'axios'
import { REACT_API_URL } from '../global/environment'
import {
  clearAuthResponse,
  setAuthLoader,
  setAuthResponseError,
  setAuthResponseSuccess,
} from '../redux/actions/authActions'
import { getAPIResponseError } from '../common/helpers/functions'

export const register = (obj) => async (dispatch, getState) => {
  try {
    dispatch(clearAuthResponse())
    // console.log('body', body)
    if (!obj) {
      dispatchAuthError('body is required', dispatch)
    } else {
      console.log(obj)
      const body = new FormData()
      body.append('name', obj.fullName)
      body.append('gender', obj.gender)
      body.append('dateOfBirth', obj.dateOfBirth)
      body.append('email', obj.email)
      body.append('phoneNumber', obj.phoneNumber)
      body.append('password', obj.password)
      body.append('avatar', obj.avatar)
      const headers = { 'Content-Type': 'multipart/form-data' }

      console.log({ body })

      dispatch(setAuthLoader(true))

      const response = await axios.post(
        `${REACT_API_URL}/public/auth/signup`,
        body,
        {
          headers: headers,
        }
      )
      const { status } = response
      console.log('status---', status)
      if (status === 200) {
        dispatch(setAuthResponseSuccess('User registered successfully.'))
      }
      return status
    }
  } catch (error) {
    dispatchAuthError(
      getAPIResponseError(error) || 'Unable to Register, please try again',
      dispatch
    )
  } finally {
    dispatch(setAuthLoader(false))
  }
}

export const login = (obj) => async (dispatch, getState) => {
  try {
    dispatch(clearAuthResponse())
    if (!obj) {
      dispatchAuthError('body is required', dispatch)
    } else {
      console.log({ obj })
      dispatch(setAuthLoader(false))
      const response = await axios.post(
        `${REACT_API_URL}/public/auth/login`,
        obj
      )
      const { status } = response
      console.log('status---', status)
      if (status === 200) {
        dispatch(setAuthResponseSuccess('User login successfully.'))
      }
      return status
    }
  } catch (error) {
    dispatchAuthError(
      getAPIResponseError(error) || 'Unable to login, please try again',
      dispatch
    )
  } finally {
    dispatch(setAuthLoader(false))
  }
}

function dispatchAuthError(msg, dispatch) {
  dispatch(setAuthResponseError(msg))
}
