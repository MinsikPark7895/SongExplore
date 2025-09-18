import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";

const queryClient = new QueryClient();

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="nav">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        🌿 검색
      </Link>
      <Link 
        to="/favorites" 
        className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
      >
        🌱 찜한 노래
      </Link>
    </nav>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
