import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePortfolio from './pages/CreatePortfolio';
import PublicPortfolio from './pages/PublicPortfolio';
import EditPortfolio from './pages/EditPortfolio';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/portfolio/:username" element={<PublicPortfolio />} />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePortfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:username"
                element={
                  <ProtectedRoute>
                    <EditPortfolio />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App

