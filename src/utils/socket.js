import io from "socket.io-client";
import { BASE_URL } from "./constants";

const socketConnect = () => {
    if(location.hostname === "localhost"){

        return io(BASE_URL,{
            auth: {
                serverOffset: 0
            }
        });

    }else{
        return io(BASE_URL,{
            auth: {
                serverOffset: 0
            },
            path: "/api/socket.io/"
        });
    }
    
};

export default socketConnect;
