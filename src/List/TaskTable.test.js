import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskTable from './TaskTable';
import '@testing-library/jest-dom/extend-expect';
import Task from '../models/task.model';

describe('TaskTable tests', () => {
    it('Render TaskTable component', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <TaskTable tasks={[]} loadTasks={ () => {} }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Task is being shown on the table', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <TaskTable tasks={[new Task(1, 'Test', false )]} loadTasks={ () => false } />
                </tbody>
            </table>
        );

        expect(getByTestId('taskName')).toHaveTextContent('Test');
    });

    it('Task finalized with correct css style', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <TaskTable tasks={[new Task(1, 'Test', true )]} loadTasks={ () => false } />
                </tbody>
            </table>
        );

        expect(getByTestId('taskName')).toHaveStyle('text-decoration: line-through');
    });
});