import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componenti comuni
import MyNavBar from './components/MyNavbar';

// Pagine pubbliche
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Area utente
import UserBookings from './pages/user/UserBookings';

// Area admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AdminEditPackage from './pages/admin/AdminEditPackage';

function App() {
  return (
    <BrowserRouter>
    <MyNavBar />
      <Routes>
        {/* Rotte pubbliche */}
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Area utente */}
        <Route path="/user/bookings" element={<UserBookings />} />

        {/* Area admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/packages" element={<AdminPackages />} />
        <Route path="/admin/packages/edit/:id" element={<AdminEditPackage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
