import React, { useState } from "react";
import "./Footer.module.css";

function Footer({ tasks, taches, setTaches, categories, setCategories, relations, setRelations }) {
    const [nouvelleTache, setNouvelleTache] = useState({
        title: "",
        description: "",
        date_echeance: "",
        urgent: false,
    });
    const [afficherFormulaire, setAfficherFormulaire] = useState(false);
    const [categoriesSelectionnees, setCategoriesSelectionnees] = useState([]);
    const [nouveauTitreCategorie, setNouveauTitreCategorie] = useState("");

    function formaterDate(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    // Fonction pour ajouter une nouvelle tâche avec ses relations - maintenant dans Footer
    function addTask(nouvelleTache, categoriesTitles) {
        // Créer la nouvelle tâche
        const newTaskId = Date.now();
        const newTask = {
            id: newTaskId,
            ...nouvelleTache,
            done: false
        };

        // Ajouter la tâche
        setTaches(prevTaches => [...prevTaches, newTask]);

        // Obtenir les IDs des catégories sélectionnées
        const newRelations = categoriesTitles.map(categoryTitle => {
            const category = categories.find(cat => cat.title === categoryTitle);
            return category ? {
                tache: newTaskId,
                categorie: category.id
            } : null;
        }).filter(Boolean);

        // Ajouter les relations
        setRelations(prevRelations => [...prevRelations, ...newRelations]);
    }

    function soumettreTache(event) {
        event.preventDefault();

        if (!nouvelleTache.title || !nouvelleTache.date_echeance) {
            alert("Le titre et la date d'échéance sont obligatoires !");
            return;
        }

        const tacheFormatee = {
            title: nouvelleTache.title,
            description: nouvelleTache.description,
            date_creation: new Date().toLocaleDateString('fr-FR'),
            date_echeance: formaterDate(nouvelleTache.date_echeance),
            urgent: nouvelleTache.urgent,
        };

        // Utiliser la fonction addTask locale
        addTask(tacheFormatee, categoriesSelectionnees);

        // Réinitialiser le formulaire
        setNouvelleTache({ title: "", description: "", date_echeance: "", urgent: false });
        setCategoriesSelectionnees([]);
        setAfficherFormulaire(false);
    }

    // Fonction pour ajouter une catégorie - maintenant dans Footer
    function ajouterCategorie() {
        if (!nouveauTitreCategorie.trim()) {
            alert("Le titre de la catégorie ne peut pas être vide!");
            return;
        }

        // Créer la nouvelle catégorie
        const newCategoryId = Date.now();
        const newCategory = {
            id: newCategoryId,
            title: nouveauTitreCategorie,
            description: "",
            color: "blue", // Couleur par défaut
            icon: ""
        };

        // Ajouter la catégorie
        setCategories(prevCategories => [...prevCategories, newCategory]);

        // Réinitialiser le champ
        setNouveauTitreCategorie("");
    }

    return (
        <div>
            <h3>Ajouter une tâche</h3>
            <button className="addTache" onClick={() => setAfficherFormulaire(true)}>
                + Tache
            </button>

            {afficherFormulaire && (
                <form onSubmit={soumettreTache}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={nouvelleTache.title}
                        onChange={(e) => setNouvelleTache({...nouvelleTache, title: e.target.value})}
                    />
                    <textarea
                        placeholder="Description"
                        value={nouvelleTache.description}
                        onChange={(e) =>
                            setNouvelleTache({...nouvelleTache, description: e.target.value})
                        }
                    />
                    <input
                        type="date"
                        value={nouvelleTache.date_echeance}
                        onChange={(e) =>
                            setNouvelleTache({...nouvelleTache, date_echeance: e.target.value})
                        }
                    />
                    <input
                        type="checkbox"
                        checked={nouvelleTache.urgent}
                        onChange={(e) => setNouvelleTache({...nouvelleTache, urgent: e.target.checked})}
                    />
                    <label>Urgent</label>
                    <select multiple onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setCategoriesSelectionnees(selected);
                    }}>
                        {categories.map(category => (
                            <option key={category.id} value={category.title}>{category.title}</option>
                        ))}
                    </select>
                    <button type="submit">Ajouter</button>
                </form>
            )}

            <div className="addCategory">
                <h3>Ajouter une catégorie</h3>
                <input
                    type="text"
                    value={nouveauTitreCategorie}
                    onChange={(e) => setNouveauTitreCategorie(e.target.value)}
                    placeholder="Nom de la catégorie"
                />
                <button onClick={ajouterCategorie}>+ Catégorie</button>
            </div>

            {afficherFormulaire && (
                <button onClick={() => setAfficherFormulaire(false)}>Annuler</button>
            )}
        </div>
    );
}

Footer.propTypes = {};

export default Footer;