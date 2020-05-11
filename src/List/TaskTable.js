import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { A } from 'hookrouter';
import TaskFinalize from './TaskFinalize';
import TaskDelete from '../Delete/TaskDelete';

function TaskTable(props) {
    return (
        props.tasks.map(task => 
            <tr key={task.id} data-testid="task">
                <td width="75%" data-testid="taskName" style={{ textDecoration: task.finalized ? 'line-through' : 'none' }}>
                    {task.name}
                </td>
                <td className="text-right">
                    <TaskFinalize task={task} loadTasks={props.loadTasks} className={ task.finalized ? 'hidden' : ''} />&nbsp;

                    <A href={"/edit/" + task.id} className={ task.finalized ? 'hidden' : 'btn btn-warning btn-sm'}>
                        <FontAwesomeIcon icon={faEdit} />
                    </A>&nbsp;

                    <TaskDelete task={task} loadTasks={props.loadTasks} />
                </td>
            </tr>
        )
    );
}

TaskTable.propTypes = {
    tasks: PropTypes.array.isRequired,
    loadTasks: PropTypes.func.isRequired
}

export default TaskTable;