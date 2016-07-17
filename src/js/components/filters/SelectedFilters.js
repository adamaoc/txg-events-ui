import React from 'react';

const SelectedFilters = ({ curFilter, removeFilter }) => {
  return (
    <div className="event-tools__selected-filter">
      {curFilter
        ? <div>
            <label>Selected Filter: </label>
            <span className="txg-events__tools-filter">
              {curFilter.value}
              <span className="cur-filter__remover" onClick={removeFilter}> (x)</span>
            </span>
          </div>
        : null
      }
    </div>
  );
};

export default SelectedFilters;
