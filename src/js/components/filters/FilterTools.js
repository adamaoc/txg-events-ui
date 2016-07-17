import React from 'react';
import Select from 'react-select';

const FilterTools = ({ cityFilter, handleFilterSwitch, handleViewSwitch, calView }) => {
  let calClass = '';
  let listClass = '';
  calView ? calClass = 'active' : listClass = 'active';
  return (
    <div className="txg-events__tools">
      <div className="event-tool__selector">
        <button className={listClass} onClick={handleViewSwitch.bind(null, 'list')}>
          <svg width="25" height="25" viewBox="0 0 32 32"><path d="M0 0h8v8h-8zM12 2h20v4h-20zM0 12h8v8h-8zM12 14h20v4h-20zM0 24h8v8h-8zM12 26h20v4h-20z"></path></svg>
        </button>
        <span>|</span>
        <button className={calClass} onClick={handleViewSwitch.bind(null, 'calendar')}>
          <svg width="25" height="25" viewBox="0 0 32 32"><path d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"></path></svg>
        </button>
      </div>
      <div className="event-tool__filter">
        <label>Filter By:</label>
        <Select
          name="city-filter"
          placeholder="Select a City"
          options={cityFilter}
          onChange={handleFilterSwitch} />
      </div>
    </div>
  );
};

export default FilterTools;
