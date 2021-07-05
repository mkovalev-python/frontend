import axios from "axios";

export default axios.create({
    baseURL: 'http://194.58.108.26:8000/api/v0/'
});