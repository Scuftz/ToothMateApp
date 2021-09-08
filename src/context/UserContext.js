import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";
import { navigate } from "../navigationRef";
import axios from "../api/axios";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "get_DOB":
      return action.payload;
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

const getDentalClinic = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const userClinic = await axiosApi.get("/getUserClinic/" + id);
    const clinicID = userClinic.data.clinic;
    const response = await axiosApi.get("/getDentalClinic/" + clinicID);

    dispatch({ type: "get_clinic", payload: response.data.clinic });
  };
};

const getEmailAndAppointments = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const emailResponse = await axiosApi.get("/getEmail/" + id);
    const email = emailResponse.data.email;
    const response = await axiosApi.get("/Appointment/" + email);

    const temp = []
      .concat(response.data)
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    dispatch({ type: "get_user_appointment", payload: temp });
  };
};

export const { Provider, Context } = createDataContext(
  UserReducer,
  { getUserDOB, getEmailAndAppointments, getDentalClinic },
  { appointments: [], clinic: null, test: "testx" }
);
