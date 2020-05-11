import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskPagination from './TaskPagination';
import '@testing-library/jest-dom/extend-expect';

describe('TaskPagination tests', () => {
    it('Render TaskPagination component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskPagination />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

/*     it('Adding new TaskPagination', () => {
        const { getByTestId } = render(<TaskAdd />);
        fireEvent.change(getByTestId('task'), { target: { value: 'This is a task'}});
        fireEvent.click(getByTestId('btn-submit'));
        expect(getByTestId('modal')).toHaveTextContent('Task added successfully');
    }); */
});