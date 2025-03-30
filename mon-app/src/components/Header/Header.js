import React from 'react';
import PropTypes from 'prop-types';
import './Header.module.css';

function Header({tasks = []}){
    console.log(tasks);
    const nbTaches = tasks.length;
    const nbTachesCours = tasks.filter((t) => t.done !== true).length;
    return (
  <div className={"Header"}>
    <h1>To Do List</h1>
    <p>{nbTaches} Taches, dont {nbTachesCours} Taches en cours.</p>
  </div>
);}


export default Header;
