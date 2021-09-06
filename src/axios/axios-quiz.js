import axios from "axios";

export default axios.create({
    baseURL: 'https://react-components-practice-default-rtdb.firebaseio.com'
});