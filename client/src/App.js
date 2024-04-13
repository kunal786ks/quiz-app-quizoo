import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/signup";
import HomePage from "./Pages/homePage";
import LoginPage from "./Pages/login";
function App() {
  return <div className="App">
    <Routes>
        <Route path='/' exact element={<SignUp/>}></Route>
        <Route path='/login' exact element={<LoginPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        </Routes>
  </div>;
}

export default App;
