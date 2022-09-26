import createDataContext from './createDataContext';
import axiosApi from '../api/axios';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        errorMessage: '',
        token: action.payload.token,
        id: action.payload.id,
      };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'user':
      return { errorMessage: 'Hello', token: action.payload };
    default:
      return state;
  }
};

const user = dispatch => async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosApi.post('/user', { token });
    dispatch({ type: 'user', payload: response.data.user });
  } catch (err) {}
};

const signin =
  dispatch =>
  async ({ email, password }) => {
    try {
      const response = await axiosApi.post('/signin', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);

      dispatch({
        type: 'signin',
        payload: { token: response.data.token, id: response.data.id },
      });
      window.location = '/'
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Invalid Login Details',
      });
    }
  };

const signout = dispatch => async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('parentid');
  dispatch({ type: 'signout' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    user,
  },
  { token: null, errorMessage: '', id: null },
);
