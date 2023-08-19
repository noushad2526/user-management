import axios from 'axios';

export const registerUser = (userDetails) => {
    return axios.post("/user/registerUser", userDetails).then((response) => response.data);
};

export const getUsers = () => {
    return axios.get("/user/getAllUsers").then((response) => response.data)
}

export const updateUser = (userDetails) => {
    return axios.put("/user/updateUser", userDetails).then((response) => response.data);
};

export const deleteUserById = (userId) => {
    return axios.delete(`/user/deleteUserById/${userId}`).then((response) => response.data);
}