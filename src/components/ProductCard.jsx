import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart, onDelete }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
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
                <p className="text-lg font-semibold text-gray-700">${product.price}</p> {/* Afficher le prix */}
                <button
                    className="btn btn-sm btn-outline mb-2"
                    onClick={toggleDescription}
                >
                    {showDescription ? "Hide" : "Show"} Description
                </button>
                {showDescription && <p>{product.description}</p>}
                <p className="text-sm text-gray-600">Available: {product.stock} items</p>
                <div className="card-actions justify-between"> {/* Réarranger les boutons */}
                    <button
                        className="btn btn-secondary"
                        onClick={() => onAddToCart(product)}
                    >
                        Ajouter au panier
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={() => onDelete(product.id)} // Appeler onDelete pour supprimer
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
