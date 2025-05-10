import io from "socket.io-client";
import { BASE_URL } from "./constants";

const socketConnect = () => {
    return io(BASE_URL,{
        auth: {
            serverOffset: 0
        }
    });
};

export default socketConnect;
