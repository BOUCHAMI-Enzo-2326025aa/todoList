import React, { useState } from 'react';
import './filter.css';
import List from "../List/List";

function Filter({ tasks, setTasks, relations, setRelations }) {
    const [afficherUniquementEnAttente, setAfficherUniquementEnAttente] = useState(false);
    const [triCroissant, setTriCroissant] = useState(true);
    const [afficherUrgentes, setAfficherUrgentes] = useState(false);
    const [categorieSelectionnee, setCategorieSelectionnee] = useState('');

    const toutesCategories = [...new Set(tasks.flatMap(task => task.categories || []))];



    // Fonction pour marquer une tâche comme terminée
    const basculerTacheFait = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, done: !task.done } : task
            )
        );
    };

    // Filtrer les tâches selon les options sélectionnées
    let tachesFiltres = afficherUniquementEnAttente ? tasks.filter(task => !task.done) : tasks;
    if (afficherUrgentes) {
        tachesFiltres = tachesFiltres.filter(task => task.urgent);
    }

    //trier par categorie
    if (categorieSelectionnee) {
        tachesFiltres = tachesFiltres.filter(task =>
            task.categories && task.categories.includes(categorieSelectionnee)
        );
    }

    // Fonction de tri
    const changerTriDate = () => {
        setTriCroissant(prev => !prev);
    };

    tachesFiltres = [...tachesFiltres].sort((a, b) => {
        const dateA = new Date(a.date_echeance.split('/').reverse().join('-'));
        const dateB = new Date(b.date_echeance.split('/').reverse().join('-'));
        return triCroissant ? dateA - dateB : dateB - dateA;
    });

    return (
        <>
            <button id="urgent" onClick={() => setAfficherUrgentes(prev => !prev)}>
                {afficherUrgentes ? "Afficher toutes les tâches" : "Afficher seulement tâches urgentes"}
            </button>
            <button id="filter" onClick={() => setAfficherUniquementEnAttente(prev => !prev)}>
                {afficherUniquementEnAttente ? "Afficher toutes les tâches" : "Afficher uniquement les tâches non faites"}
            </button>
            <button id="tri" onClick={changerTriDate}>
                {triCroissant ? "Trier par date échéance longue" : "Trier par date échéance courte"}
            </button>
            <div id="categorie-filter">
                <select value={categorieSelectionnee}
                    onChange={(e) => setCategorieSelectionnee(e.target.value)}
                >
                       <option value="">Toutes les catégories</option>
                    {toutesCategories.map(categorie => (
                        <option>
                            {categorie}
                        </option>
                    ))}
                </select>
            </div>
            <List tasks={tachesFiltres} onToggleDone={basculerTacheFait}/>
        </>
    );
}

Filter.propTypes = {};
Filter.defaultProps = {};
export default Filter;