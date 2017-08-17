import React from 'react';

function SortIcon({ column, sortBy }) {
  if (sortBy.column === column && sortBy.direction === 'desc') {
    return <i className="fa fa-sort-desc fa-lg" aria-hidden="true" />;
  } else if (sortBy.column === column && sortBy.direction === 'asc') {
    return <i className="fa fa-sort-asc fa-lg" aria-hidden="true" />;
  }

  return null;
}

SortIcon.propTypes = {
  column: React.PropTypes.string,
  sortBy: React.PropTypes.object,
};

export default SortIcon;
