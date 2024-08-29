import axios from "axios";
export const fetchUser = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/profile`, {}, { withCredentials: true });
        if (response.status !== 200) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}