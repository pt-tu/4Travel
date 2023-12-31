import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Task1/HomePage";
import Login from "./pages/Task1/Login";
import SignUp from "./pages/Task1/SignUp";
import ForgotPassword from "./pages/Task1/ForgotPassword";
import BookingTour from "./pages/Task2/BookingTour";
import BookingTourHistory from "./pages/Task2/BookingTourHistory";
import CustomerList from "./pages/Task2/CustomerList";
import DeviceList from "./pages/Task2/DeviceList";
import TourManagement from "./pages/Task2/TourManagement";
import AddCustomer from "./pages/Task3/AddCustomer";
import AddTour from "./pages/Task3/AddTour";
import ConfirmBooking from "./pages/Task3/ConfirmBooking";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<SignUp />} />
            <Route path="/quen-mat-khau" element={<ForgotPassword />} />
            <Route path="/dat-tour" element={<BookingTour />} />
            <Route path="/lich-su-dat" element={<BookingTourHistory />} />
            <Route path="/danh-sach-khach-hang" element={<CustomerList />} />
            <Route path="/danh-sach-nguon-luc" element={<DeviceList />} />
            <Route path="/quan-ly-tour" element={<TourManagement />} />
            <Route path="/them-moi-khach-hang" element={<AddCustomer />} />
            <Route path="/them-moi-tour" element={<AddTour />} />
            <Route path="/xac-nhan-dat-tour" element={<ConfirmBooking />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
