import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskEdit from './TaskEdit';
import Task from '../models/task.model';
import '@testing-library/jest-dom/extend-expect';

describe('TaskEdit tests', () => {

    beforeEach(() => {
        localStorage['tasks'] = JSON.stringify([ new Task(1, 'Testing', false)])
    });

    it('Render TaskEdit component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskEdit id={'1'} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Show Modal when update', () => {
        const { getByTestId } = render(<TaskEdit id={'1'} />);
        fireEvent.change(getByTestId('task'), { target: { value: 'New Task'}});
        fireEvent.click(getByTestId('btn-submit'));
        expect(getByTestId('modal')).toHaveTextContent('Your Task was succesfully updated!');
    });

    it('Update task', () => {
        const { getByTestId } = render(<TaskEdit id={'1'} />);
        fireEvent.change(getByTestId('task'), { target: { value: 'New Task'}});
        fireEvent.click(getByTestId('btn-submit'));
        
        const tasks = JSON.parse(localStorage['tasks']);
        expect(tasks[0].name).toEqual('New Task');
    });
});