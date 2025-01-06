import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"; // Importer le hook pour accéder au contexte
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const { searchQuery } = useOutletContext();  // Récupérer le searchQuery du contexte
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    // Récupérer les produits
    const fetchProducts = async () => {
        const { data } = await axios.get("http://localhost:3001/products");
        setProducts(data);
    };

    // Récupérer les éléments du panier
    const fetchCart = async () => {
        const { data } = await axios.get("http://localhost:3001/cart");
        setCart(data);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    // Ajouter un produit au panier
    const handleAddToCart = async (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            await axios.patch(`http://localhost:3001/cart/${existingItem.id}`, {
                quantity: existingItem.quantity + 1,
            });
        } else {
            await axios.post("http://localhost:3001/cart", {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
                description: product.description,
            });
        }
        fetchCart();
    };

    // Acheter un produit
    const handleBuyNow = async (product) => {
        if (product.stock > 0) {
            await axios.patch(`http://localhost:3001/products/${product.id}`, {
                stock: product.stock - 1,
            });

            const existingItem = cart.find((item) => item.id === product.id);
            if (existingItem) {
                await axios.patch(`http://localhost:3001/cart/${existingItem.id}`, {
                    quantity: existingItem.quantity + 1,
                });
            } else {
                await axios.post("http://localhost:3001/cart", {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                    description: product.description,
                });
            }
            fetchProducts();
            fetchCart();
        } else {
            alert("Out of stock!");
        }
    };

    // Supprimer un produit
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/products/${id}`);
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Filtrer les produits en fonction du prix et de la recherche
    const filteredProducts = products.filter((product) => {
        const isPriceInRange =
            product.price >= minPrice && product.price <= maxPrice;
        const isSearchMatch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return isPriceInRange && isSearchMatch;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Le site de commerce des étudiants de l'uam</h1>

            {/* Filtres de prix */}
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-4">
                    <label className="text-sm">Prix:</label>
                    <input
                        type="number"
                        placeholder="Min"
                        className="input input-bordered input-sm w-24"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <span className="text-sm">à</span>
                    <input
                        type="number"
                        placeholder="Max"
                        className="input input-bordered input-sm w-24"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Colonne des produits */}
                <div className="col-span-2">
                    <h2 className="text-2xl font-semibold mb-4">Produits disponibles</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                                onBuyNow={handleBuyNow}
                                onDelete={handleDeleteProduct}
                            />
                        ))}
                    </div>
                </div>

                {/* Colonne du panier */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-semibold mb-4">Produits dans le panier</h2>
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.id} className="border-b py-2 flex items-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover mr-4"
                                />
                                <div>
                                    <p>
                                        <strong>{item.title}</strong> - ${item.price} x {item.quantity}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
