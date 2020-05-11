import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function TaskFinalize(props) {
    const [showModal, setShowModal] = useState(false);

    function handleFinalizeTask(event){
        event.preventDefault();
        const tasksStorage = localStorage['tasks'];
        let tasks = tasksStorage ? JSON.parse(tasksStorage) : [];
        
        tasks = tasks.map(task => {
            if(task.id === props.task.id){
                task.finalized = true;
            }

            return task;
        });

        localStorage['tasks'] = JSON.stringify(tasks);
        setShowModal(false);
        props.loadTasks(true);
    }

    return (
        <>
            <span className={props.className}>
                <Button className="btn btn-primary btn-sm" onClick={ () => setShowModal(true)} data-testid="finalize_button">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                </Button>
            </span>

            <Modal show={showModal} onHide={ () => setShowModal(false)} data-testid="modal">
                <Modal.Header closeButton>
                <Modal.Title>Finalize Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to finalize task #{props.task.id}?<br/>
                    <strong>{props.task.name}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleFinalizeTask} data-testid="finalizeYes">
                        Yes
                    </Button>
                    <Button variant="light" onClick={ () => setShowModal(false)}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

TaskFinalize.propTypes = {
    task: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
}

export default TaskFinalize;