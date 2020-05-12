import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './TaskList';
import Task from '../models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TaskList tests', () => {
    const taskName1 = 'First Task';
    const taskName2 = 'Second Task';
    const taskName3 = 'Third Task';

    beforeEach(() => {
        localStorage['tasks'] = JSON.stringify([
            new Task(1, taskName1, false),
            new Task(2, taskName2, false),
            new Task(3, taskName3, false)
        ]);
    });

    afterEach(() => {
        delete localStorage['tasks'];
    });

    it('Render TaskList component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Table is rendering with tasks', () => {
        const { getByTestId } = render(<TaskList />);
        expect(getByTestId('table')).toHaveTextContent(taskName1);
        expect(getByTestId('table')).toHaveTextContent(taskName2);
        expect(getByTestId('table')).toHaveTextContent(taskName3);
    });

    it('Search filter is working', () => {
        const { getByTestId } = render(<TaskList />);
        fireEvent.change(getByTestId('search'), { target: { value: 'First'}});
        expect(getByTestId('table')).toHaveTextContent(taskName1);
        expect(getByTestId('table')).not.toHaveTextContent(taskName2);
        expect(getByTestId('table')).not.toHaveTextContent(taskName3);
    });
});