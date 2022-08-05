import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";
import axios from "../api/axios";

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
    case "get_dental_chart":
      return { ...state, dentalChart: action.payload };
    case "get_tooth":
      return { ...state, tooth: action.payload };
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

const getNhiAndAppointments = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const nhiResponse = await axiosApi.get("/getNhi/" + id);
    const nhi = nhiResponse.data.nhi;
    const response = await axiosApi.get("/Appointment/" + nhi);

    const temp = []
      .concat(response.data)
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    dispatch({ type: "get_user_appointment", payload: temp });
  };
};

const getAllImages = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const nhiResponse = await axiosApi.get("/getNhi/" + id);
    const nhi = nhiResponse.data.nhi;
    const response = await axiosApi.get("/getAllImages/" + nhi);

    dispatch({ type: "get_all_images", payload: response.data });
  };
};

const getDentalChart = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const response = await axiosApi.get("/getDentalChart/" + id);

    dispatch({ type: "get_dental_chart", payload: response.data });
  };
};

const getTooth = (dispatch) => {
  return async () => {
    const id = await AsyncStorage.getItem("id");
    const toothId = await AsyncStorage.getItem("toothId");
    const response = await axiosApi.get("/" + id + "/tooth/" + toothId);

    dispatch({ type: "get_tooth", payload: response.data });
  }
}

export const { Provider, Context } = createDataContext(
  UserReducer,
  {
    getUserDOB,
    getNhiAndAppointments,
    getDentalClinic,
    getUser,
    canDisconnect,
    disconnectChild,
    getAllImages,
    getDentalChart,
    getTooth,
  },
  {
    appointments: [],
    clinic: null,
    test: "testx",
    details: {},
    canDisconnect: null,
    images: [],
    dentalChart: [],
    tooth: null,
  }
);
