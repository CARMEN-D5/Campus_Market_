import {request} from "./http.js";

export const productApi = {
    getAll(){
        return request("/api/products");
    },



    delete(id, userId) {
        return request(`/api/products/${id}?userId=${userId}`, {
            method: "DELETE",
        });
    },

    create(formData) {
        return fetch("http://localhost:8080/api/products", {
            method: "POST",
            body:formData,
        }).then(res => res.json());
    }
};