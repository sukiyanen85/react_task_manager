import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskPagination from '../Pagination/TaskPagination'; 
import TaskTable from './TaskTable'; 

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);

    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        function getTasks(){
            const tasksStorage = localStorage['tasks'];
            let taskList = tasksStorage ? JSON.parse(tasksStorage) : [];
            setTotalTasks(taskList.length);
            setTasks(taskList.splice((currentPage -1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE));
        }

        if(loadTasks){
            getTasks();
            setLoadTasks(false);
        }
    }, [loadTasks, currentPage]);

    function handleSearch(event){
        setSearch(event.target.value);
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
                        <th>Tarefa</th>
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

            <TaskPagination totalTasks={totalTasks} tasksPerPage={ITEMS_PER_PAGE} currentPage={currentPage} changePage={changePage} />
        </div>
    );
}

export default TaskList;