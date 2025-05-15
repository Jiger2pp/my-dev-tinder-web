import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socketConnect from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import TimeAgo from "react-timeago";


const Chat = () => {

    const {targetId} = useParams();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [otherParticipant, setOtherParticipant] = useState([]);
    const user = useSelector((state) => state.user);
    const chatBoxRef = useRef(null);    
    const userId = user?._id;
    const firstName = user?.firstName;   
    const lastName = user?.lastName; 
    const socket = socketConnect();

    const fetchUserChat = async() => {
        
        const res = await axios.get(BASE_URL+"chat/"+targetId, { withCredentials: true });        
        
        let userSavedMessages = res?.data?.data?.messages;
        const participants = res?.data?.data?.participants;
        //console.log(participants);
        if(!userSavedMessages){
            userSavedMessages = [];
        }       
        setOtherParticipant(typeof participants !== "undefined" && participants.filter((participant) => participant._id.toString() === targetId ));
        setMessages(userSavedMessages.map((userSavedMessage) => { 
            let {_id, firstName, lastName}=  userSavedMessage?.fromUserId;            
            let text =  userSavedMessage?.text;
            let timeAgo = userSavedMessage?.timestamps.createdAt;
            let row = { fromUserId:_id, firstName, lastName, text , timeAgo}            
            
            return row;
        }));        
        
    }
    useEffect(() => {              
        fetchUserChat();
    }, []);

    useEffect(() => {
        const chatBoxContainer = chatBoxRef.current;        
        if(chatBoxContainer){
            chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight;
        }
    }, [messages]);
    
    useEffect(() => {
        if(!userId){            
            return 
        }
        socket.connect(); 
        
        setIsConnected(socket.connected);               
        socket.emit("joinRoom", {targetId, userId, firstName, isConnected});
        socket.on("conectedToServer", ({isConnected}) => {            
            setIsConnected(isConnected);
        }); 
               
        socket.on("messageReceived", addMessages);            

        return () => {  
           
           setIsConnected(socket.connected? true : false);
           socket.off("joinRoom");           
           socket.off("sendMessage");           
           socket.disconnect();
        }

    }, [targetId, userId]); 
    
   const handleSendMessage = () => {        
        socket.connect();
        socket.emit("sendMessage", {targetId, userId, firstName, lastName, text:message});                   

   } 

   const addMessages = ({fromUserId, firstName, lastName, text, isConnected}, serverOffset) => {
        
        setIsConnected(isConnected? true : false); 
        
        setMessages((messages) => [...messages, {fromUserId,firstName, lastName, text, timeAgo: Date.now()}]);            
        setMessage("");
        socket.auth.serverOffset = serverOffset;            
                     
    }    

    return (
        <div className="w-3/4 m-auto border border-orange-100">            
            <div className="inline-grid *:[grid-area:1/1] mx-2">{ isConnected ? <span className="status status-success"></span> : <span className="status status-neutral"></span>}</div><span className="text-xs">{`${firstName} ${lastName}`}</span>
            <div className="divider"></div>
            <div className="chat-box h-100 w-full overflow-auto" ref={chatBoxRef}>
                {                   
                  
                  messages.map((textMessage, index) => {                        
                        return (<div key={index} className={"chat " + `${textMessage.fromUserId !== userId ? 'chat-start' : 'chat-end'}`}>
                                    <div className="chat-header">
                                        {`${textMessage?.firstName} ${textMessage?.lastName}`}
                                        <time className="text-xs opacity-50"><TimeAgo date={textMessage?.timeAgo} /></time>
                                    </div>
                                    <div className="chat-bubble">{textMessage?.text}</div>                                    
                                </div>)
                    })
                }
                                            
               
            </div> 
            <div className="card h-12 w-full">
                <div className="absolute bottom-0 px-2 flex justify-center">
                        <input type="text" placeholder="Type here" value={message} onChange={(e) => setMessage(e.target.value)} className="input rounded mb-1" />
                        <button className="btn btn-secondary ml-1 mb-1 w-20" onClick={ handleSendMessage }>Send</button>                       
                </div>
            </div>           
        </div>
        
    );


}

export default Chat;