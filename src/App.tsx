import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CarreraPage } from './pages/CarreraPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<CarreraPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
