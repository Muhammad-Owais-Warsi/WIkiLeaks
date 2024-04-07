
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx"
import Main from './components/main.jsx';
import Explore from "./components/explore.jsx";
import Post from "./components/post.jsx";


export default function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/home' element={<Main></Main>}></Route>
          <Route path="/explore" element={<Explore></Explore>}></Route>
          <Route path="/post" element={<Post/>}></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}
