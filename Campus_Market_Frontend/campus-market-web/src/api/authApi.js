import {request} from "./http.js";

export const authApi = {
    login: (data) =>
        request("/api/users/login", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    register: (data) =>
        request("/api/users/register", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    getMe: () =>
        request("/api/users/me"),
};