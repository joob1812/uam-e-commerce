import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <div className="navbar bg-violet-500 shadow-lg shadow-violet-200 rounded ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl text-white ">UAM E-Commerce</a>
                </div>
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="input input-bordered input-sm w-48 ml-4"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/" className="text-white">Home</Link>
                        </li>
                        <li>
                            <Link to="/my-cart" className="text-white">Cart</Link>
                        </li>
                        <li>
                            <Link to="/add-product" className="text-white">New Product</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="min-h-screen bg-base-200 py-4 px-8 mt-4">
                {/* Passer la recherche à l'outlet (Home) */}
                <Outlet context={{ searchQuery }} />
            </div>
        </>
    );
}
