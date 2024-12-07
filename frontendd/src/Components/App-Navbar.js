import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../Assets/Vegbridge_sl-removebg-preview.png';

const Navbar2 = ({ setIsLoggedIn }) => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Check logged-in user role
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    // Back Button Logic
    const handleBackButtonClick = () => {
        const userRole = localStorage.getItem("userRole");
        const currentPath = location.pathname;

        if (currentPath.includes('/order-summary')) {
            navigate("/checkout");
        } else if (currentPath.includes('/checkout')) {
            navigate("/add-to-cart");
        } else if (currentPath.includes('/add-to-cart')) {
            switch (userRole) {
                case "admin":
                    navigate("/admin-marketplace");
                    break;
                case "business":
                    navigate("/business-marketplace");
                    break;
                case "farmer":
                    navigate("/farmer-marketplace");
                    break;
                default:
                    localStorage.removeItem("userRole");
                    setIsLoggedIn(false);
                    navigate("/login");
            }
        } else {
            switch (userRole) {
                case "admin":
                    navigate("/admin-marketplace");
                    break;
                case "business":
                    navigate("/business-marketplace");
                    break;
                case "farmer":
                    navigate("/farmer-marketplace");
                    break;
                default:
                    localStorage.removeItem("userRole");
                    setIsLoggedIn(false);
                    navigate("/login");
            }
        }
    };

    // Logout Functionality
    const handleLogout = () => {
        localStorage.removeItem("userRole");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <section className="fixed-top w-100 mb-5" style={{ marginBottom: '100px' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
                <div className="container d-flex align-items-center">
                    {/* Logout Button */}
                    <button className="btn btn-danger ms-3 me-3" onClick={handleLogout}>
                        Logout
                    </button>

                    {/* Back Button */}
                    <button onClick={handleBackButtonClick} className="btn btn-outline-secondary me-3">
                        &#8592; Back
                    </button>

                    {/* Logo */}
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img
                            src={logo}
                            alt="Vegbridge logo"
                            className="d-inline-block align-text-top"
                            style={{ height: '80px' }}
                        />
                    </Link>

                    {/* Toggler Button for Mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="d-flex ms-auto">
                            {/* Admin Role Components */}
                            {userRole === "admin" && (
                                <>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/admin-marketplace"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Marketplace
                                    </Link>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/admin-transactions"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Transaction History
                                    </Link>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/admin-guides"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Guides
                                    </Link>
                                </>
                            )}

                            {/* Farmer Role Components */}
                            {userRole === "farmer" && (
                                <>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/farmer-marketplace"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Marketplace
                                    </Link>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/stock-dashboard"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Stock Dashboard
                                    </Link>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/farmer-transactions"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Transaction History
                                    </Link>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/farmer-guides"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Guides
                                    </Link>
                                </>
                            )}

                            {/* Business Role Components */}
                            {userRole === "business" && (
                                <>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/business-marketplace"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Marketplace
                                    </Link>
                                    <Link
                                        className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                        to="/business-transactions"
                                        style={{ marginRight: '15px' }}
                                    >
                                        Transaction History
                                    </Link>
                                </>
                            )}

                            {/* Common Components */}
                            <Link
                                className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                                to="/order-tracking"
                                style={{ marginRight: '15px' }}
                            >
                                Order Status & Tracking
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar2;
