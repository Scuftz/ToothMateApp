import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";

const AppointmentReducer = (state, action) => {
  switch (action.type) {
    case "get_appointment_content":
      return action.payload;
    case "get_user_appointment":
      return action.payload;
  }
};

const getAppointmentContent = (dispatch) => {
  return async () => {
    const response = await axiosApi.get("/Appointment");

    dispatch({ type: "get_appointment_content", payload: response.data });
  };
};

const getUserAppointments = (dispatch) => {
  return async (email) => {
    console.log("Appointment Context Entry");
    const response = await axiosApi.get("/Appointment/" + email);

    dispatch({ type: "get_user_appointment", payload: response.data });
  };
};

export const { Provider, Context } = createDataContext(
  AppointmentReducer,
  { getAppointmentContent, getUserAppointments },
  []
);
