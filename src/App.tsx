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
import { QueryClient, QueryClientProvider } from "react-query";
import Test from "./pages/Test";
import Bill from "./pages/ThanhToan/Bill";
import BookingCanThanhToan from "./pages/ThanhToan/BookingCanThanhToan";
import BookingDaThanhToan from "./pages/ThanhToan/BookingDaThanhToan";
import DoiMatKhau from "./pages/Task1/DoiMatKhau";
import BaoCao from "./pages/BaoCao";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: { colorPrimaryHover: "none" },
          components: {
            Button: {
              primaryColor: "#4B268F ",
              boxShadow: "none",
            },
            Input: {
              activeBorderColor: "#4B268F ",

              activeShadow: "#4B268F ",
              hoverBorderColor: "#4B268F ",
            },
          },
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
              <Route path="/test" element={<Test />} />
              <Route path="/hoa-don/:cid/:tid" element={<Bill />} />
              <Route path="/reset-password" element={<DoiMatKhau />}></Route>
              <Route
                path="/booking-can-thanh-toan"
                element={<BookingCanThanhToan />}
              />
              <Route path="/bao-cao" element={<BaoCao />} />
              <Route
                path="/booking-da-thanh-toan"
                element={<BookingDaThanhToan />}
              />
            </Routes>
            <Footer />
          </Router>
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
