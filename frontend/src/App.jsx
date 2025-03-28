import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import FinancialDashboard from './Pages/FinancialDashboard';
import Dashboard from './Pages/Dashboard'; // Path to the Dashboard component
import LoginPage from './Pages/user/LoginPage'; // Path to the Login page
import RegisterPage from './Pages/user/RegisterPage'; // Path to the Register page
import PachchaDetail from './Pages/CropDetails/PachchaDetail';
import StockPage from './Pages/StockManage/StockPage'; // kasuni
import Header from './Components/NavBar/FarmerHeader';  
import DiseaseUser from './Pages/DiseaseUser';
import DiseasesAdmin from './Pages/DiseasesAdmin';

function App() {
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
        <Route path="/stock-management" element={<StockPage />} />

        


        <Route path="/crop-detail/pachchaperumal" element={<PachchaDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" exact component={<LoginPage />} /> */}

        <Route path="/disease-user" element={<DiseaseUser />} />
        <Route path="/diseases-admin" element={<DiseasesAdmin />} />
      </Routes>
    </>
  );
}

export default App;
