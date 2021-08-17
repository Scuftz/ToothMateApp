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
    return async (age) => {
        const response = await axiosApi.get("/Education/" + age);

        dispatch({ type: 'get_age_content', payload: response.data })
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