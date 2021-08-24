import React, { useState } from "react";

import JobItem from "./JobItem";
import classes from "./JobList.module.css";

function JobList(props) {
  const [nullify, setNullify] = useState(false);

  if (nullify) {
    setNullify(true);
  }
  console.log(props.jobs);

  return (
    //in the API there is no different working type like full time, part time. for this cause i have to choose badge to full time.
    <>
    { props.jobs &&
      <ul className={classes.list}>
        { props.jobs.map((job) => (
          <JobItem
            id={job.Guid}
            key={job.Guid}
            title={job.Title}
            badge={job.badge}
            location={job.Location}
            description= {job.Description}
            date={job.Published}
            subtitle={job.Company}
            search={props.search}
          />
        ))}
      </ul>}
    </>
  );
}

export default JobList;
