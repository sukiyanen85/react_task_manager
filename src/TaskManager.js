import React from 'react';
import './TaskManager.css';
import { useRoutes } from 'hookrouter';
import TaskList from './List/TaskList';
import TaskAdd from './Add/TaskAdd';
import TaskEdit from './Edit/TaskEdit';

const routes = {
  '/': () => <TaskList />,
  '/add': () => <TaskAdd />,
  '/edit/:id': ({id}) => <TaskEdit id={id} />
}

function TaskManager() {
  return useRoutes(routes);  
}

export default TaskManager;
