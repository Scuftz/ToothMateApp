import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";
import { navigate } from "../navigationRef";
import axios from "../api/axios";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "get_user":
      return { ...state, details: action.payload };
    case "get_user_appointment":
      return { ...state, appointments: action.payload };
    case "get_clinic":
      return { ...state, clinic: action.payload };
  }
};

const getUserDOB = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const response = await axiosApi.get("/getDOB/" + id);

    dispatch({ type: "get_DOB", payload: response.data });
  };
};

const getUser = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const response = await axiosApi.get("/user/" + id);
    dispatch({ type: "get_user", payload: response.data})
  }
}

const getDentalClinic = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const userClinic = await axiosApi.get("/getUserClinic/" + id);

    const clinicID = userClinic.data.clinic;
    const response = await axiosApi.get("/getDentalClinic/" + clinicID);

    console.log("clinic name: " + response.data.clinic.name);
    console.log("clinic phone: " + response.data.clinic.phone);
    console.log("clinic email: " + response.data.clinic.email);

    dispatch({ type: "get_clinic", payload: response.data.clinic });
  };
};

const getEmailAndAppointments = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const emailResponse = await axiosApi.get("/getEmail/" + id);
    const email = emailResponse.data.email;
    const response = await axiosApi.get("/Appointment/" + email);

    console.log("Email: " + emailResponse.data.email);

    const temp = []
      .concat(response.data)
      .sort((a, b) => (a.date > b.date ? 1 : -1));

    dispatch({ type: "get_user_appointment", payload: temp });
  };
};

export const { Provider, Context } = createDataContext(
  UserReducer,
  { getUserDOB, getEmailAndAppointments, getDentalClinic, getUser },
  { appointments: [], clinic: null, test: "testx", details: {} }
);
