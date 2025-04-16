
import { Navigate } from 'react-router-dom';
import HomePage from './public/home';

const Index = () => {
  // We can either render the HomePage directly or redirect to the /home route
  return <HomePage />;
  // Alternatively: return <Navigate to="/" replace />;
};

export default Index;
