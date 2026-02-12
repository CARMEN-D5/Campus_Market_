const BASE_URL = "http://localhost:8080";

export async function request(url, options = {}){
    const res = await fetch(BASE_URL + url, {
        headers: {
            "Content-Type" : "application/json",
        },
        ...options,
    });

    const text = await res.text();

    if (!res.ok) {
        throw new Error(text || "Request failed");
    }
    try {
        return JSON.parse(text);
    }catch {
        return text;
    }
}