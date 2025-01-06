import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        const { data } = await axios.get("http://localhost:3001/cart");
        setCartItems(data);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (item) => {
        // Suppression de l'article du panier
        await axios.delete(`http://localhost:3001/cart/${item.id}`);

        // Mise à jour du stock dans `db.json`
        const { data: product } = await axios.get(`http://localhost:3001/products/${item.id}`);
        const updatedProduct = {
            ...product,
            stock: product.stock + item.quantity, // Ajouter uniquement la quantité retirée
        };

        await axios.put(`http://localhost:3001/products/${item.id}`, updatedProduct);

        fetchCartItems(); // Recharger les articles du panier
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePayment = async () => {
        const totalAmount = calculateTotal();

        if (totalAmount <= 0) {
            alert("Votre panier est vide. Veuillez ajouter des articles.");
            return;
        }

        alert(`Paiement réussi ! Montant total : $${totalAmount}`);

        // Vider le panier après paiement
        for (let item of cartItems) {
            await axios.delete(`http://localhost:3001/cart/${item.id}`);
        }

        fetchCartItems();
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Panier</h2>
            {cartItems.length === 0 ? (
                <p>Le panier est vide.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
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
                                <button
                                    className="btn btn-error btn-sm mt-2"
                                    onClick={() => handleRemoveFromCart(item)}
                                >
                                    Enlever
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4">
                <p className="font-semibold">Total : ${calculateTotal()}</p>
                <button
                    className="btn btn-primary mt-4"
                    onClick={handlePayment}
                >
                    Procéder au paiement
                </button>
            </div>
        </div>
    );
};

export default Cart;
