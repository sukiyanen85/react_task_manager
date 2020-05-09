import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskEdit from './TaskEdit';

describe('TaskEdit tests', () => {
    test('Render TaskEdit component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskEdit />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});