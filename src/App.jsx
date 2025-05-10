import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import ReceivedRequests from "./components/ReceivedRequests";
import Chat from "./components/Chat";


function App() {  

  return (
    <> 
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connection" element={<Connections />} />
            <Route path="/my-connection-requests" element={<ReceivedRequests />} /> 
            <Route path="/chat/:targetId" element={<Chat/>} />           
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>           
    </>
  )
}

export default App
