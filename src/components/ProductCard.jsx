import React, { useState } from "react";
import axios from "axios";

const ProductCard = ({ product, onAddToCart, onDelete }) => {
    const [stock, setStock] = useState(product.stock);
    const [showDescription, setShowDescription] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
    };

    const handleAddToCart = async () => {
        if (stock > 0) {
            // Ajouter au panier
            await onAddToCart(product);

            // Mettre à jour le stock dans db.json
            try {
                const updatedProduct = { ...product, stock: stock - 1 };
                await axios.put(`http://localhost:3001/products/${product.id}`, updatedProduct);
                setStock(stock - 1); // Mettre à jour l'état local du stock
            } catch (error) {
                console.error("Erreur lors de la mise à jour du stock :", error);
            }
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-xl relative">
            <figure>
                {product.image ? (
                    <img src={product.image} alt={product.title} />
                ) : (
                    <p>No Image Available</p>
                )}
            </figure>
            <div className="card-body">
                <div className="absolute top-2 right-2">
                    <button
                        className={`text-xl ${isLiked ? "text-red-500" : "text-gray-500"}`}
                        onClick={handleLikeToggle}
                    >
                        {isLiked ? "❤️" : "🤍"}
                    </button>
                </div>

                <h2 className="card-title">{product.title}</h2>
                <p className="text-lg font-semibold">Prix : ${product.price}</p>
                <button
                    className="btn btn-sm btn-outline mb-2"
                    onClick={toggleDescription}
                >
                    {showDescription ? "Cacher" : "Afficher"} la description
                </button>
                {showDescription && <p>{product.description}</p>}
                <p className="text-sm text-gray-600">
                    Stock disponible : {stock > 0 ? stock : "Rupture de stock"}
                </p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-secondary"
                        onClick={handleAddToCart}
                        disabled={stock === 0} // Désactiver si le stock est à zéro
                    >
                        Ajouter au panier
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={() => onDelete(product.id)}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
