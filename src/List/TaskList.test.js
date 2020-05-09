import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList tests', () => {
    test('Render TaskList component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});