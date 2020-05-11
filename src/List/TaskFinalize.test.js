import React from 'react';
import ReactDOM from 'react-dom';
import TaskFinalize from './TaskFinalize';
import Task from '../models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TaskFinalize tests', () => {
    const taskName = 'This is a task';
    const task = new Task(1, taskName, false);

    it('Render TaskFinalize component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskFinalize task={task} loadTasks={ () => fn } className="" />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Show Modal', () => {
        const { getByTestId } = render(<TaskFinalize task={task} loadTasks={ () => false } className="" />);
        fireEvent.click(getByTestId('finalize_button'));
        expect(getByTestId('modal')).toHaveTextContent(taskName);
    });

    it('Finalize Task', () => {
        localStorage['tasks'] = JSON.stringify([task]);
        const { getByTestId } = render(<TaskFinalize task={task} loadTasks={ () => false } className="" />);
        fireEvent.click(getByTestId('finalize_button'));
        fireEvent.click(getByTestId('finalizeYes'));
        const tasks = JSON.parse(localStorage['tasks']);
        expect(tasks[0].finalized).toBeTruthy();
    });
});