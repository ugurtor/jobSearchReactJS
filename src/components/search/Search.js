import React from "react";

import classes from "./Search.module.css";
function SearchPage({ params,onQueryChange }) {
  return (
    <div className={classes.search}>
      <div>
        <input
          type="text"
          onChange={onQueryChange}
          name="query"
          value={params.search}
          placeholder="Search All Jobs"
        />
      </div>
      {/* <div>
        <input
          type="text"
          onChange={onQueryChange}
          name="l"
          placeholder="Location"
        />
      </div> */}
    </div>
  );
}

export default SearchPage;
