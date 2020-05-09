import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import TaskAdd from './TaskAdd';

describe('TaskAdd tests', () => {
    test('Render TaskAdd component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskAdd />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});