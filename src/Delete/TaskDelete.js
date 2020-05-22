import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

function TaskDelete(props) {
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const API_URL = 'http://localhost:3001/tasks/';

    function closeModal(){
        setShowModal(false);
    }

    function closeErrorModal(){
        setShowErrorModal(false);
    }

    async function handleDeleteTask(e){
        e.preventDefault();
        try {
           await Axios.delete(API_URL + props.task.id)
           props.loadTasks(true);
           setShowModal(false);
        } catch (error) {
            setShowErrorModal(true);
        }        
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

            <Modal show={showErrorModal} onHide={closeErrorModal} data-testid="modal">
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Unfortunately it wasn't possible to delete this task, please try again.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={ () => setShowErrorModal(false)}>
                        Close
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