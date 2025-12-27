import { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Beneficiary } from './pages/Beneficiary';
import { PublicView } from './pages/PublicView';

type Page = 'home' | 'admin' | 'beneficiary' | 'public';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'admin':
        return <Admin />;
      case 'beneficiary':
        return <Beneficiary />;
      case 'public':
        return <PublicView />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
