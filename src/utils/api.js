const API = async (URL, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(token && {Authorization: `Bearer ${token}`}),
        ...options.headers,
    }

    try {

        const res = await fetch(URL, {
            method: "GET",
            ...options,
            headers,
        });

        if (res.status === 403 || res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"
            return null
        }

        return res
    } catch (error) {
        console.log(" Network or API error",error)
        throw error
    }
} 

export default API