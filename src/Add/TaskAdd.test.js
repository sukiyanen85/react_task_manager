import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskAdd from './TaskAdd';
import '@testing-library/jest-dom/extend-expect';

describe('TaskAdd tests', () => {
    it('Render TaskAdd component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskAdd />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Adding new Task', () => {
        const { getByTestId } = render(<TaskAdd />);
        fireEvent.change(getByTestId('task'), { target: { value: 'This is a task'}});
        fireEvent.click(getByTestId('btn-submit'));
        expect(getByTestId('modal')).toHaveTextContent('Task added successfully');
    });
});

