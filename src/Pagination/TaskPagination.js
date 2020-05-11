import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

function TaskPagination(props) {
    const numberOfPages = Math.ceil(props.totalTasks / props.tasksPerPage);

    function showPages(){
        
        const pages = [];
    
        for(let page = 1; page <= numberOfPages; page++)
            pages.push(<Pagination.Item key={page} active={page === props.currentPage} onClick={() => props.changePage(page)} >{page}</Pagination.Item>);
    
        return pages;
    }

    return (
        <>
            <Pagination data-testid="pagination">
                <Pagination.First key="firstPage" onClick={() => props.changePage(1)} disabled={props.currentPage === 1} />
                <Pagination.Prev key="previousPage" onClick={() => props.changePage(props.currentPage - 1)} disabled={ props.currentPage === 1} />

                {showPages()}
                
                <Pagination.Next key="nextPage" onClick={() => props.changePage(props.currentPage + 1)} disabled={props.currentPage === numberOfPages} />
                <Pagination.Last key="lastPage" onClick={() => props.changePage(numberOfPages)} disabled={props.currentPage === numberOfPages} />
            </Pagination>
        </>
    );
}

TaskPagination.propTypes = {
    totalTasks  : PropTypes.number.isRequired,
    tasksPerPage: PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    changePage  : PropTypes.func.isRequired
}
 
export default TaskPagination;