import { useEffect, useReducer, useRef } from "react";
import axios from "axios";

//const BASE_URL =  "https://cors-anywhere.herokuapp.com/https://stackoverflow.com/jobs/feed";

function reducer(state, action) {
  if (action.type === "REQUEST") {
    return { loading: true, jobs: [] }; //whenever we call request, page is going to show loading state
  } else if (action.type === "FETCH_DATA") {
    console.log(action.payload.jobs);
    return { ...state, loading: false, jobs: action.payload.jobs.slice(0,10) };
  } else if (action.type === "AWAIT") {
    return { loading: true };
  } else if (action.type === "ERROR") {
    console.log(action.payload.error);
    return { ...state, loading: false, error: action.payload.error, jobs: [] };
  } else return state;
}

function useFetch(params) { 

  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: false }); //initially loading param set to false. we don't want to load jobs at the first time.
  const isInitialMount = useRef(true); //this workaround needed for initially mounting. i didn't want to work on init, but i want to use useEffect for every key stroke i make.

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      function wait(ms) {
        return new Promise((resolve) => {
          dispatch({
            type:"AWAIT"
          })
          setTimeout(resolve, ms);
        });
      }
      async function fetchToken() {
        const cancelToken = axios.CancelToken.source();
        console.log(params);
        await axios
          .post(`http://localhost:8080/search?query=${params.value}`, {
            cancelToken: cancelToken.token,
          })
          .then(await wait(2500))
          .then((response) => {
            console.log(response.data);
            return axios.get(`http://localhost:8080/result/${response.data}`, {
              cancelToken: cancelToken.token,
            });
          })
          .then((response) => {
            
            dispatch({
              type: "FETCH_DATA",
              payload: { jobs: response.data },
            });
          })
          .catch((ex) => {
            if (axios.isCancel(ex)) return; //if this error coming from axios return immediately
            dispatch({ type: "ERROR", payload: { error: ex.response } });
          });

        return () => {
          cancelToken.cancel();
        };
      }

      /*  async function fetchData() {
        const cancelToken = axios.CancelToken.source();

        dispatch({ type: "REQUEST" }); //for the loading page and also this loading section should not to block any typing.
        console.log(token);
        await axios
          .get(BASE_URL_RESULT + "/" + token, {
            cancelToken: cancelToken.token,
            //q & l parameters include
          })
          .then((response) => {
            console.log(response.data);
            //const data = JSON.parse(convert.xml2json(response.data.channel,{compact:true, spaces:2}))
            //console.log(data)
            dispatch({
              type: "FETCH_DATA",
              payload: { jobs: response.data.item },
            });
          })
          .catch((ex) => {
            if (axios.isCancel(ex)) return; //if this error coming from axios return immediately
            dispatch({ type: "ERROR", payload: { error: ex } });
          });

        return () => {
          cancelToken.cancel();
        };
      }*/
      fetchToken();
    } //whenever we change the params, we re-run the API. and fill the params sync..
  }, [params]);

  //in this useEffect function we had one parameter. when the params parameter changes useEffect trigger again and again..

  return state;
}

export default useFetch;
