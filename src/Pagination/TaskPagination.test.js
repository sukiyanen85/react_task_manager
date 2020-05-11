import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import TaskPagination from './TaskPagination';
import '@testing-library/jest-dom/extend-expect';

describe('TaskPagination tests', () => {
    it('Render TaskPagination component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskPagination totalTasks={3} tasksPerPage={3} currentPage={1} changePage={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    
    it('Pagination must show 3 pages', () => {
        const { getByTestId } = render(<TaskPagination totalTasks={15} tasksPerPage={5} currentPage={1} changePage={() => false} />);
        const pagination = getByTestId('pagination');

        expect(pagination).toHaveTextContent('1');
        expect(pagination).toHaveTextContent('2');
        expect(pagination).toHaveTextContent('3');
    }); 
});