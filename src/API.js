import axios from "axios";
import Cookies from "js-cookie"

export default axios.create({
    baseURL: '/api/v0/',
});