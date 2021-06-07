import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:4000/",
});

export default clienteAxios;

//json-server db.json --port 4000
