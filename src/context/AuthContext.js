import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from '../api/axios';
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "signup":
            return { errorMessage: "", token: action.payload };
        default:
            return state;
    }
};

//make an api request to sign up with user details
const signup = dispatch =>  async ({ firstname, lastname, email, mobile, password }) => {
    try {
        const response = await axiosApi.post("/signup", { firstname, lastname, email, mobile, password });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "signup", payload: response.data.token });
        navigate("Account");
    } catch (err) {
        dispatch({ type: "add_error", payload: "Something went wrong with Signup"});
    }
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
    { token: null, errorMessage: "" }
)