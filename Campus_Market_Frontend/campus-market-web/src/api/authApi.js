import {request} from "./http.js";

export const authApi = {
    login(data) {
        return request("/api/users/login", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    register(data) {
        return request("/api/users/register", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }
};