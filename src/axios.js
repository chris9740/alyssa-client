import axios from "axios";

const instance = axios.create({
    baseURL: "https://alyssabot.xyz/api/v1"
});

export default instance;
