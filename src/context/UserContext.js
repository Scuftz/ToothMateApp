import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import axiosApi from '../api/axios';
import { navigate } from "../navigationRef";
import axios from "../api/axios";

const UserReducer = (state, action) => {
    switch(action.type) {
        case 'get_DOB':
            return action.payload;
    }
}

const getUserDOB = (dispatch) => {
    return async () => {
        const id = await AsyncStorage.getItem("id");
        const response = await axiosApi.get('/getDOB/' + id );

        dispatch({ type: 'get_DOB', payload: response.data });
    }
}

export const { Provider, Context } = createDataContext(
    UserReducer,
    { getUserDOB },
    []);