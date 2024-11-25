import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Admin/Admin";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import { useDispatch } from "react-redux";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./profile/UserProfile";
import AdminProfile from "./profile/AdminProfile";
import AddMovie from "./components/Movies/AddMovie";

function App() {

  const dispatch = useDispatch()

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  console.log("isAdminLoggedIn", isAdminLoggedIn)
  console.log("isUserLoggedIn", isUserLoggedIn)


  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login())
    }
    if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login())
    }
  }, )

  return (
    <>

      <Header />

      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/add" element={<AddMovie />} />
        </Routes>
      </section>
    </>
  );
}

export default App;