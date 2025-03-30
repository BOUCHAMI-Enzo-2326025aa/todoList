import React, { useState } from 'react';
import './task.css';
function Task({ task, onToggleDone }) {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <>
            <tr key={task.id} className="task" onClick={() => setShowDescription(!showDescription)}>
                <td id="title">{task.title}</td>
                <td id="date">{task.date_echeance}</td>
                <td>
                    {task.categories && task.categories.length > 0
                        ? task.categories.join(", ")
                        : ""}
                </td>
                <td className="checkbox" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => onToggleDone(task.id)}
                    />
                    {task.done ? " ✅ Terminée" : " ⏳ En cours"}
                </td>
            </tr>
            {showDescription && (
                <tr>
                    <td colSpan="2">{task.description}</td>
                </tr>
            )}
        </>
    );
}


Task.propTypes = {
};

Task.defaultProps = {};

export default Task;
