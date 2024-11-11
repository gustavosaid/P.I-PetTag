import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/login.js';
import Admin from './Admin/admin.js';
import UserNovo from './UserNovo/UserNovo.js';



const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Admin/editar/:Id" element={<UserNovo />} />  {/* Rota de edição */}
      <Route path="/UserNovo" element={<UserNovo />} />
        {/* <Route path="/Admin/" element={<UserNovo />} /> Rota de edição */}
        {/* colocar :id em frente userNovo para puxar o User ID */}



      </Routes>
    </BrowserRouter>
  </React.StrictMode>


);