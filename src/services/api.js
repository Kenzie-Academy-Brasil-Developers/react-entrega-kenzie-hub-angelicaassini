import axios from "axios";

const apiKenzieHub = axios.create({
    baseURL: "https://kenziehub.herokuapp.com",
    timeout: 5000,
})
export default apiKenzieHub;