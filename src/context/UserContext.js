import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "get_user":
      return { ...state, details: action.payload };
    case "get_user_appointment":
      return { ...state, appointments: action.payload };
    case "get_clinic":
      return { ...state, clinic: action.payload };
    case "get_DOB":
      return { ...state, dob: action.payload };
    case "can_disconnect":
      return { ...state, canDisconnect: action.payload };
    case "get_all_images":
      return { ...state, images: action.payload };
  }
};

const canDisconnect = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const dobResponse = await axiosApi.get("/getDOB/" + id);
    const isChild = await axiosApi.get("/isChild/" + id);
    const date1 = new Date();
    const date2 = new Date(dobResponse.data.dob);
    const dateDiff = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24 * 365);
    let canDisconnect = false;
    if (dateDiff > 18 && isChild.data.isChild != null) {
      canDisconnect = true;
    }

    dispatch({ type: "can_disconnect", payload: canDisconnect });
  };
};

const disconnectChild = () => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const response = await axiosApi.post("/disconnectchild", { id });
  };
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
    dispatch({ type: "get_user", payload: response.data });
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

const getAllImages = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const emailResponse = await axiosApi.get("/getEmail/" + id);
    const email = emailResponse.data.email;
    const response = await axiosApi.get("/getAllImages/" + email);

    dispatch({ type: "get_all_images", payload: response.data });
  };
};

export const { Provider, Context } = createDataContext(
  UserReducer,
  {
    getUserDOB,
    getEmailAndAppointments,
    getDentalClinic,
    getUser,
    canDisconnect,
    disconnectChild,
    getAllImages,
  },
  {
    appointments: [],
    clinic: null,
    test: "testx",
    details: {},
    canDisconnect: null,
    images: [],
  }
);
