import createDataContext from "./createDataContext";
import axiosApi from "../api/axios";

const ClinicReducer = (state, action) => {
  switch (action.type) {
    case "get_all_clinics":
      return action.payload;
    case "search_clinics":
      return action.payload;
  }
};

const getAllClinics = (dispatch) => {
  return async () => {
    const response = await axiosApi.get("/Clinics");

    dispatch({ type: "get_all_clinics", payload: response.data });
  };
};

const getClinicNames = (dispatch) => {
  return async () => {
    const response = await axiosApi.get("/nameClinics");
    dispatch({ type: "get_all_clinics", payload: response.data });
  };
};

const searchClinics = (dispatch) => {
  return async (search) => {
    const response = await axiosApi.get("/Clinics/" + search);

    dispatch({ type: "search_clinics", payload: response.data });
  };
};

const addClinic =
  (dispatch) =>
  async ({ name, suburb, phone, email, bookingURL }) => {
    try {
      const response = await axiosApi.post("/addClinic", {
        name,
        suburb,
        phone,
        email,
        bookingURL,
      });
    } catch (err) {
      console.log("oops");
    }
  };

export const { Provider, Context } = createDataContext(
  ClinicReducer,
  { getAllClinics, addClinic, searchClinics, getClinicNames },
  []
);
