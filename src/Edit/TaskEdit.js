import React, { useState, useEffect } from 'react';
import { Jumbotron, Form, Button, Modal } from 'react-bootstrap';
import { A, navigate } from 'hookrouter';
import PropTypes from 'prop-types';

function TaskEdit(props) {
    const [task, setTask] = useState('');
    const [taskIsLoaded, setTaskIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [formValidated, setFormValidated] = useState(false); 

    useEffect(() => {
        function loadTask(){
            const tasks = JSON.parse(localStorage['tasks']);
            const task = tasks.filter(task => {
                return task.id === parseInt(props.id)
            });

            setTask(task[0].name);
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

    function handleTask(event){
        setTask(event.target.value);
    }

    function formSubmited(event) {
        event.preventDefault();
        setFormValidated(true);
    
        if (event.currentTarget.checkValidity() === true) { // If the form is validated
            const tasks = JSON.parse(localStorage['tasks']);
            tasks.map(helperTask => {
                if(helperTask.id === parseInt(props.id)){
                    helperTask.name = task;
                }

                return helperTask;
            });

            localStorage['tasks'] = JSON.stringify(tasks);
            setShowModal(true);
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
        </>
    );
}

TaskEdit.propTypes = {
    id: PropTypes.string.isRequired,
}

export default TaskEdit;