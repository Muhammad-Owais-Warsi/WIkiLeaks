
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx"
import Main from './components/main.jsx';

export default function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/home' element={<Main></Main>}></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}
