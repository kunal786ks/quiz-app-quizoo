import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/signup";
import HomePage from "./Pages/homePage";
import LoginPage from "./Pages/login";
import LayoutComponent from "./layout";
import ProfilePage from "./Pages/profile";
import PrivateRoutes from "./utils/ProtectedRoutes";
import PageNotFound from "./component/PageNotFound";
import UserInformation from "./Pages/userInfo";
import CreateTest from "./Pages/CreateTest";
import ViewTest from "./Pages/ViewTest";
import AdminPage from "./Pages/AdminPage";
import UserAll from "./Pages/AdminPage/admin-subpages/UserAll";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<SignUp />}></Route>
        <Route path="/login" exact element={<LoginPage />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<LayoutComponent />}>
            <Route path={"/home"} element={<HomePage />} />
            <Route path={"/home/admin"} element={<AdminPage/>}>
              <Route path={"/home/admin/all-users"} element={<UserAll/>}/>
            </Route>
            <Route path={"/home/create-test"} element={<CreateTest/>}/>
        <Route path={"/home/view-test/:testId"} element={<ViewTest/>}/>
            
            
            <Route path={"/home/profile"} element={<ProfilePage />}>
              <Route
                path={"/home/profile/user-info"}
                element={<UserInformation />}
              />
               <Route
                path={"/home/profile/other"}
                element={<UserInformation />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
