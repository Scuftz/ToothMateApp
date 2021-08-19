import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";
import { navigate } from "../navigationRef";
import axios from "../api/axios";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    // case "signup":
    //     return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    case "user":
      return { errorMessage: "Hello", token: action.payload };
    default:
      return state;
  }
};

const user = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axiosApi.post("/user", { token });
    //console.log(response.data.user);
    dispatch({ type: "user", payload: response.data.user });
  } catch (err) {}
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    const response = await axiosApi.post("/user", { token });
    dispatch({ type: "signin", payload: response.data });
    navigate("Account");
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
      dispatch({ type: "signin", payload: response.data.token });
      navigate("Account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signup",
      });
    }
  };

const signupchild =
  (dispatch) =>
  async ({ firstname, lastname, email, mobile, password }) => {
    try {
      const parentToken = await AsyncStorage.getItem("token");
      const response = await axiosApi.post("/signupchild", {
        firstname,
        lastname,
        email,
        mobile,
        password,
        parentToken,
      });
      //await AsyncStorage.setItem("token", response.data.token);
      //dispatch({ type: "signin", payload: response.data.token });
      navigate("Account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signup",
      });
    }
  };

/*const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axiosApi.post("/signin", { email, password });
      console.log("here");
      await AsyncStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("Account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signin",
      });
    }
  };*/

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axiosApi.post("/signin", { email, password });
      console.log("here");
      await AsyncStorage.setItem("token", response.data.token);
      console.log(response.data);
      dispatch({ type: "signin", payload: response.data });
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
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    tryLocalSignin,
    user,
    signupchild,
  },
  { token: null, errorMessage: "" }
);
