import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskManager from './TaskManager';

describe('Task Manager tests', () => {
    test('renders task manager component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskManager />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
