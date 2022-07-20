import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
// import ProfileUI from "./pages/profile/ProfileUI";
import Timeline from "./pages/userposts/Timeline";
import SinglePost from "./components/singlePost/SinglePost";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import GetSinglePost from "./components/singlePost/GetSinglePost";
import UpdatePost from "./components/singlePost/UpdatePost";




function App() {
  
  return (
    <BrowserRouter>
    <TopBar/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/write" element={<Write/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
        <Route path="/post" element={<Single/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/timeline" element={<Timeline/>}></Route>
        <Route path="/post/:id" element={<GetSinglePost/>}></Route>
        <Route path="/editpost/:id" element={<UpdatePost/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
