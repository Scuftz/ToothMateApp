import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    // case "signup":
    //     return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload.token, id: action.payload.id };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const id = await AsyncStorage.getItem("token");
  if (token) {
    if (id) {
      dispatch({ type: "signin", payload: { token, id } });
      navigate("Account");
    } else {
      navigate("Signup");
    }
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

//make an api request to sign up with user details
const signup =
  (dispatch) =>
  async ({ firstname, lastname, email, mobile, password }) => {
    try {
      const response = await axiosApi.post("/signup", {
        firstname,
        lastname,
        email,
        mobile,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("id", response.data.id);
      dispatch({ type: "signin", payload: { token: response.data.token, id: response.data.id } });
      navigate("Account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signup",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axiosApi.post("/signin", { email, password });
      
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("id", response.data.id);
      console.log("here");
      dispatch({ type: "signin", payload: { token: response.data.token, id: response.data.id } });
      navigate("Account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signin",
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("id")
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "", id: null }
);
