import React from 'react';
import PropTypes from 'prop-types';
import './List.module.css';
import Task from "../Task/Task";

function List({ tasks, onToggleDone }) {
    return (
        <table>
            <tbody>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onToggleDone={onToggleDone} />
            ))}
            </tbody>
        </table>
    );
}

List.propTypes = {};
List.defaultProps = {};
export default List;