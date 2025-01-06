import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState(""); // Nouveau champ pour la description
    const navigate = useNavigate();

    // Fonction pour ajouter un produit
    const handleAddProduct = async (e) => {
        e.preventDefault();

        // Validation des champs
        if (!title || !price || !stock || !image || !description) {
            alert("Tous les champs doivent être remplis.");
            return;
        }

        const newProduct = {
            title,
            price: parseFloat(price),
            stock: parseInt(stock),
            image,
            description, // Ajouter la description ici
        };

        try {
            // Envoi des données au serveur
            await axios.post("http://localhost:3001/products", newProduct);
            alert("Produit ajouté avec succès !");
            navigate("/"); // Redirection vers la page d'accueil après l'ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
            alert("Erreur lors de l'ajout du produit.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Ajouter un Nouveau Produit</h1>
            <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-lg font-semibold">
                        Nom du produit
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-lg font-semibold">
                        Prix
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-lg font-semibold">
                        En Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-lg font-semibold">
                        URL de l'image
                    </label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-lg font-semibold">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                    Ajouter le produit
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
