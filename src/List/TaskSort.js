import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function TaskSort(props) {
    return (<>
        <FontAwesomeIcon icon={faSort} className={!props.orderAsc && !props.orderDesc ? '' : 'hidden'} data-testid="iconSort" />
        <FontAwesomeIcon icon={faSortUp} className={props.orderAsc ? '' : 'hidden'} data-testid="iconSortAsc" />
        <FontAwesomeIcon icon={faSortDown} className={props.orderDesc ? '' : 'hidden'} data-testid="iconSortDesc" />
    </>);
}

TaskSort.propTypes = {
    orderAsc: PropTypes.bool.isRequired,
    orderDesc: PropTypes.bool.isRequired
}

export default TaskSort;