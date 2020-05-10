import React, { useState } from 'react';
import Task from '../models/task.model';
import { Jumbotron, Form, Button, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';

function TaskAdd() {
    const [task, setTask] = useState('');
    const [formValidated, setFormValidated] = useState(false); 
    const [showModal, setShowModal] = useState(false); 
    
    function formSubmited(event) {
        event.preventDefault();
        setFormValidated(true);
    
        if (event.currentTarget.checkValidity() === true) { // If the form is validated
            const taskStorage = localStorage['tasks'];
            const tasks = taskStorage ? JSON.parse(taskStorage) : [];
            tasks.push(new Task(new Date().getTime(), task, false));
            localStorage['tasks'] = JSON.stringify(tasks);
            setShowModal(true);
        }
    }

    function handleTask(event){
        setTask(event.target.value);
    }

    function closeModal(){
        navigate('/');
    }

    return (
        <>
            <h3 className="text-center">Task Add Component</h3>

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
                        <Button type="submit" variant="success" data-testid="btn-submit">Add</Button>{' '}
                        <A href="/" className="btn btn-light">Cancel</A>
                    </Form.Group>
                </Form>
            </Jumbotron>

            <Modal show={showModal} onHide={closeModal} data-testid="modal">
                <Modal.Header closeButton>
                  <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Task added successfully!</Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TaskAdd;