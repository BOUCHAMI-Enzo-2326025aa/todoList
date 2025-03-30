import React, { useState } from 'react';
import './App.css';
import todoData from './todo.json';
import Header from './components/Header/Header';
import Filter from './components/Filter/Filter';
import Footer from './components/Footer/Footer';

function App() {

  const [taches, setTaches] = useState(todoData.taches);
  const [categories, setCategories] = useState(todoData.categories);
  const [relations, setRelations] = useState(todoData.relations);


  const getCategorie = () => {
    return taches.map(tache => {
      const tacheRelations = relations.filter(rel => rel.tache === tache.id);
      const categoriesTitles = tacheRelations.map(rel => {
        const category = categories.find(cat => cat.id === rel.categorie);
        return category ? category.title : null;
      }).filter(Boolean);

      return { ...tache, categories: categoriesTitles };
    });
  };

  // Les tâches préparées pour l'affichage
  const tachesCategories = getCategorie();

  return (
      <div className="App">
        <div className="App-header">
          <Header tasks={tachesCategories} />
        </div>
        <Filter
            tasks={tachesCategories}
            setTasks={setTaches}
            relations={relations}
            setRelations={setRelations}
        />
        <div className="App-footer">
          <Footer
              tasks={tachesCategories}
              taches={taches}
              setTaches={setTaches}
              categories={categories}
              setCategories={setCategories}
              relations={relations}
              setRelations={setRelations}
          />
        </div>
      </div>
  );
}

export default App;