import React, { useState, useEffect } from 'react';
import { Jumbotron, Form, Button, Modal } from 'react-bootstrap';
import { A, navigate } from 'hookrouter';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Task from '../models/task.model';

function TaskEdit(props) {
    const [task, setTask] = useState('');
    const [taskIsLoaded, setTaskIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [showErrorModal, setShowErrorModal] = useState(false); 
    const [formValidated, setFormValidated] = useState(false); 

    const API_URL = 'http://localhost:3001/tasks/'

    useEffect(() => {
        async function loadTask(){
            try {
                let {data } = await Axios.get(API_URL + props.id);
                setTask(data.name);
            } catch(error){
                setShowErrorModal(true);
            }
        }
    
        if(! taskIsLoaded){
            loadTask();
            setTaskIsLoaded(true);
        }
    }, [taskIsLoaded, props]);

    function closeModal(){
        setShowModal(false);
        navigate('/');
    }
    
    function closeErrorModal(){
        setShowErrorModal(false);
    }

    function handleTask(event){
        setTask(event.target.value);
    }

    function formSubmited(event) {
        event.preventDefault();
        setFormValidated(true);
    
        if (event.currentTarget.checkValidity() === true) { // If the form is validated
            Axios.put(API_URL + props.id, new Task(props.id, task, false))
            .then(function (response) {
                setShowModal(true);
            })
            .catch(function (error) {
                setShowErrorModal(true);
            });
        }
    }

    return (
        <>
            <h3 className="text-center">Edit Task</h3>

            <Jumbotron>
                <Form onSubmit={formSubmited} noValidate validated={formValidated}>
                    <Form.Group>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" minLength="5" maxLength="15" required value={task} onChange={handleTask} data-testid="task" />
                        <Form.Control.Feedback type="invalid">
                            This field must contain between 5 and 15 characters
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button type="submit" variant="success" data-testid="btn-submit">Update</Button>{' '}
                        <A href="/" className="btn btn-light">Cancel</A>
                    </Form.Group>
                </Form>
            </Jumbotron>

            <Modal show={showModal} onHide={closeModal} data-testid="modal">
                <Modal.Header closeButton>
                  <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your Task was succesfully updated!</Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={closeErrorModal} data-testid="modal">
                <Modal.Header closeButton>
                  <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>An error occurred! Please try again.</Modal.Body>
                <Modal.Footer>
                  <Button variant="warning" onClick={closeErrorModal}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

TaskEdit.propTypes = {
    id: PropTypes.string.isRequired,
}

export default TaskEdit;