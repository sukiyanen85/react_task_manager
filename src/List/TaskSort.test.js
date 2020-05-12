import React from 'react';
import ReactDOM from 'react-dom';
import TaskSort from './TaskSort';
import Task from '../models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TaskSort tests', () => {
    it('Render TaskSort component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskSort orderAsc={true} orderDesc={false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    }); 

    it('TaskSort Default Icon', () => {
        const { getByTestId } = render(<TaskSort orderAsc={false} orderDesc={false} />);
        expect(getByTestId('iconSort')).not.toHaveClass('hidden');
        expect(getByTestId('iconSortAsc')).toHaveClass('hidden');
        expect(getByTestId('iconSortDesc')).toHaveClass('hidden');
    });

    it('TaskSort Asc Icon', () => {
        const { getByTestId } = render(<TaskSort orderAsc={true} orderDesc={false} />);
        expect(getByTestId('iconSort')).toHaveClass('hidden');
        expect(getByTestId('iconSortAsc')).not.toHaveClass('hidden');
        expect(getByTestId('iconSortDesc')).toHaveClass('hidden');
    });

    it('TaskSort Desc Icon', () => {
        const { getByTestId } = render(<TaskSort orderAsc={false} orderDesc={true} />);
        expect(getByTestId('iconSort')).toHaveClass('hidden');
        expect(getByTestId('iconSortAsc')).toHaveClass('hidden');
        expect(getByTestId('iconSortDesc')).not.toHaveClass('hidden');
    });
});