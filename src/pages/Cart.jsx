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
        await axios.delete(`http://localhost:3001/cart/${item.id}`);
        fetchCartItems();
    };

    // Calculer le total du panier
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Gérer le paiement (simulation)
    const handlePayment = async () => {
        const totalAmount = calculateTotal();

        if (totalAmount <= 0) {
            alert("Your cart is empty. Please add items to the cart.");
            return;
        }

        // Simuler le paiement (ici vous pouvez intégrer un vrai service de paiement)
        alert(`Payment successful! Total amount: $${totalAmount}`);

        // Après paiement, vider le panier
        for (let item of cartItems) {
            await axios.delete(`http://localhost:3001/cart/${item.id}`);
        }
        fetchCartItems(); // Réinitialiser l'état du panier après le paiement
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Cart</h2>
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
                <p className="font-semibold">Total: ${calculateTotal()}</p>
                <button
                    className="btn btn-primary mt-4"
                    onClick={handlePayment}
                >
                    Proceder au paiement
                </button>
            </div>
        </div>
    );
};

export default Cart;
