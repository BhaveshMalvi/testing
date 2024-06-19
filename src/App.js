import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import TopNavbar from './Partials/TopNavbar';

// Lazy load components
const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));
const Admin = lazy(() => import('./Pages/Admin'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
