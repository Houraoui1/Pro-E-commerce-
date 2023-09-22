import axios from "axios";

export default function RequestGestUser() {
  return axios.request({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/users",
  });
}

