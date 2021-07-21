import createDataContext from "./createDataContext";
import axiosApi from '../api/axios';

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const signup = dispatch => {
    return async ({ firstname, lastname, email, mobile, password }) => {
        //make an api request to sign up with user details
        //if we sign up, modify our state and say that we are authenticated
        //if sign up fails, reflect an error message
        try {
            const response = await axiosApi.post("/signup", { firstname, lastname, email, mobile, password });
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };
};

const signin = dispatch => {
    return ({ email, password }) => {
        //try to sign in

        //handle success by updating state

        //handle error with error message
    };
};

const signout = dispatch => {
    return () =>{
        //sign out
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { isSignedIn: false }
)