import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-[var(--putih)] text-[var(--black)]">
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer/>
        </div>
    );
}