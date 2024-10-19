import { Footer } from '../components/Login/Footer';
import { Login } from '../components/Login/Login';
import { Navbar } from '../components/Login/Navbar';
import '../assets/login.css';

export const LoginPage = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Login />
      </div>
      <Footer />
    </div>
  );
}

