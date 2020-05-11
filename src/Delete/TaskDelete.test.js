import React from 'react';
import ReactDOM from 'react-dom';
import Task from '../models/task.model';
import TaskDelete from '../Delete/TaskDelete';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('TaskDelete tests', () => {
    const taskName = 'This is a task';
    const task = new Task(1, taskName, false);

    it('Render TaskDelete component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskDelete task={task} loadTasks={ () => false } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Show Modal', () => {
        const { getByTestId } = render(<TaskDelete task={task} loadTasks={ () => false } />);
        fireEvent.click(getByTestId('delete_button'));
        expect(getByTestId('modal')).toHaveTextContent(taskName);
    });

    it('Delete Task', () => {
        localStorage['tasks'] = JSON.stringify([task]);
        const { getByTestId } = render(<TaskDelete task={task} loadTasks={ () => false } />);
        fireEvent.click(getByTestId('delete_button'));
        fireEvent.click(getByTestId('deleteYes'));
        const tasks = JSON.parse(localStorage['tasks']);
        expect(tasks.length).toBe(0); 
    })
});