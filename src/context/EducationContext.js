import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from '../api/axios';
import { navigate } from "../navigationRef";
import axios from "../api/axios";

const EducationReducer = (state, action) => {
    switch(action.type) {
        case 'get_education_content':
            return action.payload;
        case 'get_age_content':
            return action.payload;
    }
}

const getEducationContent =(dispatch) => {
    return async () => {
        const response = await axiosApi.get("/Education")

        dispatch({ type: 'get_education_content', payload: response.data })
    }
}

const getEducationRange = (dispatch) => {
    return async () => {
        const id = await AsyncStorage.getItem("id");
    const dobResponse = await axiosApi.get("/getDOB/" + id);
    const date1 = new Date();
    console.log(date1)
    const date2 = new Date(dobResponse.data.dob);
    console.log(date2)
    const dateDiff = (Math.abs(date1-date2))/ (1000 * 60 * 60 * 24 * 365);
    console.log(dateDiff);
    let range = 0;
    if (dateDiff > 0 && dateDiff < 11) {
            range = 1;
        } else if (dateDiff > 10 && dateDiff < 18) {
            range = 2;
        } else {
           range = 3;
        }

        const response = await axiosApi("/Education/" + range)
        dispatch({ type: "get_age_content", payload: response.data });
    }
}

const addEducationContent = dispatch =>  async ({ topic, content }) => {
        try {
            const response = await axiosApi.post("/addEducation", { topic, content });
        } catch (err) {
           console.log("oops")
        }
    }


export const { Provider, Context } = createDataContext(
    EducationReducer,
    { getEducationContent, addEducationContent, getEducationRange },
    [])