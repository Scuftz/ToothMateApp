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
      return {
        errorMessage: "",
        token: action.payload.token,
        id: action.payload.id,
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    case "user":
      return { errorMessage: "Hello", token: action.payload };
    case "getchildaccounts":
      return {
        errorMessage: "",
        children: action.payload.children,
      };
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
  const id = await AsyncStorage.getItem("id");
  console.log(id);
  console.log(token);
  if (token) {
    if (id) {
      /*
      const response = await axiosApi.post("/user", { token });
      dispatch({ type: "signin", payload: response.data });
      navigate("Account");
      */
      dispatch({ type: "signin", payload: { token, id } });
      navigate("AccountFlow");
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
  async ({ firstname, lastname, email, mobile, password, dob, clinic }) => {
    try {
      const parentid = await AsyncStorage.getItem("id");
      if (parentid === null) {
        const response = await axiosApi.post("/signup", {
          firstname,
          lastname,
          email,
          mobile,
          password,
          dob,
          clinic,
        });
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("id", response.data.id);
        dispatch({
          type: "signin",
          payload: { token: response.data.token, id: response.data.id },
        });
        navigate("AccountFlow");
      } else {
        const response = await axiosApi.post("/signupchild", {
          firstname,
          lastname,
          email,
          mobile,
          password,
          dob,
          clinic,
          parent: parentid,
        });
        //await AsyncStorage.setItem("token", response.data.token);
        //dispatch({ type: "signin", payload: response.data.token });
        navigate("AccountFlow");
        console.log("sign up child here");
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signup",
      });
    }
  };

const getchildaccounts = (dispatch) => async () => {
  try {
    const id = await AsyncStorage.getItem("id");
    const response = await axiosApi.get("/getchildaccounts/" + id);
    dispatch({
      type: "getchildaccounts",
      payload: { children: response.data },
    });
  } catch (err) {
    console.log("Error retrieving child accounts");
  }
};

const signupchild =
  (dispatch) =>
  async ({
    firstname,
    lastname,
    email,
    mobile,
    password,
    dob,
    clinic,
    parent,
  }) => {
    try {
      const response = await axiosApi.post("/signupchild", {
        firstname,
        lastname,
        email,
        mobile,
        password,
        dob,
        clinic,
        parent,
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

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axiosApi.post("/signin", { email, password });

      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("id", response.data.id);
      console.log("here");
      dispatch({
        type: "signin",
        payload: { token: response.data.token, id: response.data.id },
      });
      navigate("AccountFlow");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signin",
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
      console.log(response.data);
      dispatch({ type: "signin", payload: response.data });
      navigate("Account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Signin",
      });
    }
  };*/

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("id");
  await AsyncStorage.removeItem("parentid");
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
    getchildaccounts,
  },
  { token: null, errorMessage: "", id: null }
);
