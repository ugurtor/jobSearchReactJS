import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";
import JobList from "../components/jobs/JobList";
import SearchPage from "../components/search/Search";
import useFetch from "../hooks/useFetch";

import classes from "./MainPage.module.css";


function MainPage() {
  /*const [loadedJobs, setLoadedJobs] = useState([
    {
      title: "deneme",
      subtitle: "subtitle",
      badge: "Full Time",
      category: "kategori",
      location: "nowhere",
      job: "16-4-2021",
      id: "1",
    },
    {
      title: "deneme2",
      subtitle: "subtitle2",
      badge: "Full Time",
      category: "kategori",
      location: "nowhere2",
      job: "16-4-2021",
      id: "2",
    },
  ]);*/

  const [params, setParams] = useState({});
  // const [limit, setLimit] = useState(10);
  const { jobs, loading, error } = useFetch(params);

  const history = useHistory();

  useEffect(() => {     
    if(history.action === "REPLACE"){
      const param = "search";
      const value = history.location.state.substring(1);    
    
      setParams(prevParams =>{
        return{...prevParams, [param]: value}//get previous params into set new params(search)
        });
    }
   }, [history])

  function onQueryChange(e) {
    //const name = e.target.name;
    const value = e.target.value;
    if (value.trim().length > 4) {
      //prevent unnecessary api calls
      setParams((prevParams) => {
        return { ...prevParams, value };
      });
    }
  }

  /*let jobListContent = <JobList jobs={jobs} />;
  console.log(loading)
  if(loading){
    jobListContent = <p>Loading...</p>
  }
  if (error) {
    jobListContent = <p>Error...</p>
  }*/
  console.log(jobs);

  return (
    <div>
      <SearchPage onQueryChange={onQueryChange} history={history} params={params} />
      {loading && (
        <Button variant="primary" disabled className={classes.button}>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Request is being processed and results will be available shortly.
        </Button>
      )}
      {error && <h1>Error</h1>}
      <JobList jobs={jobs} search={params.search}/>
    </div>
  );
}

export default MainPage;
