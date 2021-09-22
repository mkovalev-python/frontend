import axios from "axios";

export default axios.create({
    baseURL: 'http://31.31.202.177:8000/api/v0/'
});