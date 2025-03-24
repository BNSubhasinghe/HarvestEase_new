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



import PachchaDetail from './Pages/CropDetails/PachchaDetail';


import Header from './Components/NavBar/FarmerHeader';  

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
        
  
        <Route path="/crop-detail/pachchaperumal" element={<PachchaDetail />} />
        

      </Routes>
    </>
  );
}

export default App;
