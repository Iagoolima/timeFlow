import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './../privateRoute';

import Login from '../../pages/login';
import Master from '../../pages/master';
import NotFound from '../notFound';

import AuthProvider from '../../component/login-components/authContext';


export default function AppRoute() {
  return (
    <AuthProvider>
      <Router>

        <Routes>

          <Route path="/" element={<Login />} />


       
           <Route path="/master" element={<PrivateRoute><Master /></PrivateRoute>} /> 

          <Route path="*" element={<NotFound />} />

        </Routes>

      </Router>
    </AuthProvider>
  )
}