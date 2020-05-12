import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskPagination from '../Pagination/TaskPagination'; 
import TaskTable from './TaskTable'; 
import TaskSort from './TaskSort'; 

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const [orderAsc, setOrderAsc] = useState(false);
    const [orderDesc, setOrderDesc] = useState(false);

    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        function getTasks(){
            const tasksStorage = localStorage['tasks'];
            let taskList = tasksStorage ? JSON.parse(tasksStorage) : [];

            // Filter tasks
            if(search.length){
                taskList = taskList.filter(task => {
                    return task.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                });
            }

            // Order tasks
            if(orderAsc){
                taskList.sort((task1, task2) => (task1.name.toLowerCase() > task2.name.toLowerCase() ? 1 : -1 ));
            } else if(orderDesc){
                taskList.sort((task1, task2) => (task1.name.toLowerCase() < task2.name.toLowerCase() ? 1 : -1 ));
            }

            setTotalTasks(taskList.length);
            setTasks(taskList.splice((currentPage -1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE));
        }

        if(loadTasks){
            getTasks();
            setLoadTasks(false);
        }
    }, [loadTasks, currentPage, orderAsc, orderDesc, search]);

    function handleOrder(event){
        event.preventDefault();

        if(! orderAsc && ! orderDesc){
            setOrderAsc(true);
        }
        else if(orderAsc){
            setOrderDesc(true);
            setOrderAsc(false);
        } else {
            setOrderDesc(false);
            setOrderAsc(false);
        }

        setLoadTasks(true);
    }

    function handleSearch(event){
        setSearch(event.target.value);
        setLoadTasks(true);
    }

    function changePage(page){
        setCurrentPage(page);
        setLoadTasks(true);
    }

    return (
        <div className="text-center">
            <h3 className="text-center">Tasks</h3>

            <Table striped bordered hover responsive data-testid="table">
                <thead>
                    <tr>
                        <th>
                            <a href="/" onClick={handleOrder}>
                                Task <TaskSort orderAsc={orderAsc} orderDesc={orderDesc} />
                            </a>
                        </th>
                        <th>
                            <A href="/add" className="btn btn-success" data-testid="addTask">
                                <FontAwesomeIcon icon={faPlus} />&nbsp;
                                New Task
                            </A>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control type="text" value={search} data-testid="search" onChange={handleSearch} placeholder="Search" />
                        </td>
                        <td></td>
                    </tr>
                    
                    <TaskTable tasks={tasks} loadTasks={setLoadTasks} />
                </tbody>
            </Table>

            <TaskPagination totalTasks={totalTasks} tasksPerPage={ITEMS_PER_PAGE} currentPage={currentPage} changePage={changePage} data-testid="pagination" />
        </div>
    );
}

export default TaskList;