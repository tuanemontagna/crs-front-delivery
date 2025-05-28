import axios from "@/utils/axios";

export const InfoToken = async () => {
    try {
        const response = await axios.get('/user/get-data-by-token');
        return response.data.data.id;
    } catch (error) {
        return false;
    }
}

export default InfoToken;