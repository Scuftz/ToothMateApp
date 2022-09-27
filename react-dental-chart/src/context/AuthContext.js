import createDataContext from './createDataContext'
import axiosApi from '../api/axios'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'signin':
      return {
        errorMessage: '',
        token: action.payload.token,
        id: action.payload.id,
      }
    case 'user':
      return { errorMessage: 'Hello', token: action.payload }
    default:
      return state
  }
}

const user = (dispatch) => async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axiosApi.post('/user', { token })
    dispatch({ type: 'user', payload: response.data.user })
  } catch (err) {}
}

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axiosApi.post('/signin', { email, password })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('id', response.data.id)

      dispatch({
        type: 'signin',
        payload: { token: response.data.token, id: response.data.id },
      })

      window.location = '/'
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Invalid login details, please try again.',
      })
    }
  }

async function getUser() {
  try {
    const id = localStorage.getItem('id')
    const response = axiosApi.get(`/user/${id}`)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    user,
    getUser,
  },
  { token: null, errorMessage: '', id: null }
)
