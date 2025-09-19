import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
import Loader from "./components/pages/Loader";
import ViewService from "./components/pages/ViewService.jsx";
import FeedBackPage from "./components/pages/FeedBackPage.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import ContactForm from "./components/admin/adminContactSection/ContactForm.jsx";
import FounderPage from "./components/pages/FounderPage.jsx";
import ProtectedRoute from "./components/pages/ProtectedRoute.jsx";
import AdminLoginForm from "./components/admin/AdminLoginForm.jsx";
import AdminAbout from "./components/admin/adminDataSection/AdminAbout.jsx";
import EditFounderForm from "./components/admin/EditFounderForm.jsx";
import AdminClients from "./components/admin/adminClientSection/AdminClients.jsx";
import AdminStrengths from "./components/admin/adminStrengthSection/AdminStrength.jsx";
import AdminFeedback from "./components/admin/feedback/AdminFeedback.jsx";
import AdminLogoutButton from "./components/admin/AdminLogoutButton.jsx";
import AdminService from "./components/admin/adminServiceSection/AdminService.jsx";

// Redux thunks
import { fetchClients } from "./utils/redux/slices/clientDataSlice.js";
import { fetchStrengths } from "./utils/redux/slices/strengthDataSlice.js";
import { fetchContact } from "./utils/redux/slices/contacDatatSlice.js";
import { fetchServices } from "./utils/redux/slices/serviceDataSlice.js";
import { fetchAdmin } from "./utils/redux/slices/adminSlice.js";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import FounderForm from "./components/admin/FounderForm.jsx";


const App = () => {
  const dispatch = useDispatch();

  const {  loading: clientsLoading } = useSelector((state) => state.clients);
  const {  loading: strengthsLoading } = useSelector((state) => state.strengths);
  const {  loading: contactLoading } = useSelector(  (state) => state.contact);
  const {  loading: serviceLoading } = useSelector(  (state) => state.services); 

  const [loading, setLoading] = useState(true);



useEffect(() => {
  dispatch(fetchAdmin()); // ✅ check session on app load

  const loadApp = async () => {
    await Promise.all([
      dispatch(fetchClients()),
      dispatch(fetchStrengths()),
      dispatch(fetchContact()),
      dispatch(fetchServices()),
    ]);
    setLoading(false);
  };

  const timer = setTimeout(loadApp, 1000);
  return () => clearTimeout(timer);
}, [dispatch]);


  const isLoading = loading 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="service/:serviceId" element={<ViewService />} />
            <Route path="feedback" element={<FeedBackPage />} />
            <Route path="/founder" element={<FounderPage />} />
          </Route>

          <Route path="admin" element={<ProtectedRoute> <AdminLayout/> </ProtectedRoute>}>
              <Route  index element={<AdminDashboard/>} />
              <Route path="clients" element={<AdminClients  />} />
              {/* <Route index element={<AdminClients  />} /> */}
              <Route path="services" element={<AdminService  />}/>
              <Route path="strength" element={<AdminStrengths  />} />
              <Route path="contact" element={<ContactForm  />} />
              {/* <Route path="founder" element={<EditFounderForm />} /> */}
              <Route path="founder" element={<FounderForm/>} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="feedback" element={<AdminFeedback />} />
              <Route path="admin-logout" element={<AdminLogoutButton/>} />
          </Route>

           <Route path="admin-login" element={<AdminLoginForm />} />
           <Route path="*" element={<Home />} />
        </Routes>
      )}
    </>
  );
};

export default App;
