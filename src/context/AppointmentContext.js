import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";

const AppointmentReducer = (state, action) => {
  switch (action.type) {
    case "get_appointment_content":
      return action.payload;
  }
};

const getAppointmentContent = (dispatch) => {
  return async () => {
    const response = await axiosApi.get("/Appointment");

    dispatch({ type: "get_appointment_content", payload: response.data });
  };
};

export const { Provider, Context } = createDataContext(
  AppointmentReducer,
  { getAppointmentContent },
  []
);
