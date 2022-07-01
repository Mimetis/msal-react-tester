import { initializeIcons } from '@fluentui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import './App.css';
import SearchPage from './pages/SearchPage';

initializeIcons();

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <div>Nothing Here</div>
              </main>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
