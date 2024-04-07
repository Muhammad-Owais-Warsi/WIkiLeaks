
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx"
import Main from './components/main.jsx';
import Explore from "./components/explore.jsx";

export default function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/home' element={<Main></Main>}></Route>
          <Route path="/explore" element={<Explore></Explore>}></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}
