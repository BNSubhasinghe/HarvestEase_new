import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './Components/NavBar/FarmerHeader';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Services from './Pages/Services';

import CropSidebar from './Components/CropSidebar';
import CropLanding from './Pages/CropLanding';
import CropForm from './Pages/CropForm';
import CropTable from './Pages/CropTable';
import CropUpdate from './Pages/CropUpdate';
import CropChart from './Pages/CropChart';
import CropPlanning from './Pages/CropPlanning';

import NaduDetail from './Pages/CropDetails/NaduDetail';
import SambaDetail from './Pages/CropDetails/SambaDetail';
import RedRiceDetail from './Pages/CropDetails/RedRiceDetail';
import Bg352Detail from './Pages/CropDetails/Bg352Detail';
import SuwandelDetail from './Pages/CropDetails/SuwandelDetail';
import PachchaDetail from './Pages/CropDetails/PachchaDetail';

import CropTrackingDetail from './Pages/CropTrackingDetail';
import HarvestStockDetail from './Pages/HarvestStockDetail';
import CostTrackingDetail from './Pages/CostTrackingDetail';
import SmartPlantCareDetail from './Pages/SmartPlantCareDetail';
import FinancialDashboard from './Pages/FinancialDashboard';
import Dashboard from './Pages/Dashboard'; // Path to the Dashboard component
import LoginPage from './Pages/user/LoginPage'; // Path to the Login page
import RegisterPage from './Pages/user/RegisterPage'; // Path to the Register page
import StockPage from './Pages/StockManage/StockPage'; // kasuni
import ShopPage from './Pages/StockManage/ShopPage'; // kasuni
import ShopDetailPage from './Pages/StockManage/ShopDetailPage';
import CartPage from './Pages/StockManage/CartPage'; // kasuni
import NaduStockDetail from './Pages/StockManage/NaduStockDetail';   // kasuni
import DiseaseUser from './Pages/DiseaseUser';
import DiseasesAdmin from './Pages/DiseasesAdmin';
import KnowledgeHub from './Pages/KnowleadgeHub';
import './App.css';

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";

import NotAuthorized from "./Pages/NotAuthorized";
import PrivateRoute from "./Components/PrivateRoute";


function App() {
  const location = useLocation();

  const cropSidebarRoutes = [
    '/crop-form',
    '/crop-table',
    '/crop-update',
    '/crop-chart',
    '/crop-planning'
  ];

  const showCropSidebar = cropSidebarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<CropLanding />} />
        <Route path="/crop-form" element={<CropForm />} />
        <Route path="/crop-table" element={<CropTable />} />
        <Route path="/crop-update/:id" element={<CropUpdate />} />
        <Route path="/crop-chart" element={<CropChart />} />
        <Route path="/crop-planning" element={<CropPlanning />} />
        <Route path="/crop-detail/nadu" element={<NaduDetail />} />
        <Route path="/crop-detail/samba" element={<SambaDetail />} />
        <Route path="/crop-detail/redrice" element={<RedRiceDetail />} />
        <Route path="/crop-detail/bg352" element={<Bg352Detail />} />
        <Route path="/crop-detail/suwandel" element={<SuwandelDetail />} />
        <Route path="/finance" element={<FinancialDashboard />} />

        {/* kasuni */}
        <Route path="/stock-management" element={<StockPage />} />
        <Route path="/shop" element={<ShopPage />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop-detail/:id" element={<ShopDetailPage />} />
        <Route path="/nadu-stock-detail" element={<NaduStockDetail />} />


      <div className="flex">
        {showCropSidebar && <CropSidebar />}

        <div className="flex-1 p-4">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />

            {/* Crop Management Module */}
            <Route path="/crop-landing" element={<CropLanding />} />
            <Route path="/crop-form" element={<CropForm />} />
            <Route path="/crop-table" element={<CropTable />} />
            <Route path="/crop-update/:id" element={<CropUpdate />} />
            <Route path="/crop-chart" element={<CropChart />} />
            <Route path="/crop-planning" element={<CropPlanning />} />

            {/* Crop Detail Pages */}
            <Route path="/crop-detail/nadu" element={<NaduDetail />} />
            <Route path="/crop-detail/samba" element={<SambaDetail />} />
            <Route path="/crop-detail/redrice" element={<RedRiceDetail />} />
            <Route path="/crop-detail/bg352" element={<Bg352Detail />} />
            <Route path="/crop-detail/suwandel" element={<SuwandelDetail />} />
            <Route path="/crop-detail/pachchaperumal" element={<PachchaDetail />} />

            {/* Services Detail Pages */}
            <Route path="/services/crop-tracking" element={<CropTrackingDetail />} />
            <Route path="/services/harvest-stock" element={<HarvestStockDetail />} />
            <Route path="/services/cost-tracking" element={<CostTrackingDetail />} />
            <Route path="/services/smart-plant" element={<SmartPlantCareDetail />} />

            {/* Protected Dashboards */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            
            
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
