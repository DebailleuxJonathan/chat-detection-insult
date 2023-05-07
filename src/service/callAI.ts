import axios from "axios";

export default class CallAI {
    predict(text: string) {
       return axios.post('http://127.0.0.1:8000/predict/', {
            text: text
        })
    }
}
