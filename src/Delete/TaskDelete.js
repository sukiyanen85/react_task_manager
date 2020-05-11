import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function TaskDelete(props) {
    const [showModal, setShowModal] = useState(false);

    function closeModal(){
        setShowModal(false);
    }

    function handleDeleteTask(e){
        e.preventDefault();
        const tasks = JSON.parse(localStorage['tasks']);
        const newTasks = tasks.filter(task => task.id !== props.task.id);

        localStorage['tasks'] = JSON.stringify(newTasks);
        setShowModal(false);
        props.loadTasks(true); 
    }

    return (
        <>
            <Button className="btn btn-danger btn-sm" onClick={ () => setShowModal(true)} data-testid="delete_button">
                <FontAwesomeIcon icon={faTimes} />
            </Button>
   
            <Modal show={showModal} onHide={closeModal} data-testid="modal">
                <Modal.Header closeButton>
                  <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete task #{props.task.id}?<br/>
                    <strong>{props.task.name}</strong> 
                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteTask} data-testid="deleteYes">
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

TaskDelete.propTypes = {
    task: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired
}

export default TaskDelete;