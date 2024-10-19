import { Landing } from "../components/Landing/Landing";
import { Footer } from "../components/Login/Footer";
import { Navbar } from "../components/Login/Navbar";
import '../assets/landing.css';


export const LandingPage = (): JSX.Element => {
    return (
        <>
            <div className="landing-container">
                <Navbar />
                <div className="landing-content">
                    <Landing />
                </div>
                <Footer />
            </div>
        </>
    );
}