import React from "react";

//import Card from "../ui/Card";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import classes from "./JobItem.module.css";
import pin from "../../assets/pin-48.png";
import { useHistory } from "react-router-dom";

function JobItem(props) {
  const apply = window.localStorage.getItem(props.id);
  const history = useHistory();
  const routeChange = () => {
    let path = `Description`;
    history.push({
      pathname: path,
      search: props.search,
      state: {
        id: props.id,
        title: props.title,
        company_name: props.company_name,
        location: props.location,
        date: props.date,
        description: props.description,
      },
    });
  };
  
  return (
    <li className={classes.item}>
      <Card className={classes.card} onClick={routeChange}>
        <Card.Body>
          <div className={classes.card__upper}>
            <div>
              <Card.Title>
                {props.title} -{" "}
                {apply && <Button variant="outline-success">Applied</Button>}
              </Card.Title>
              <Card.Subtitle className={classes.card__subtitle}>
                {props.subtitle}
              </Card.Subtitle>
            </div>
            <div className={classes.card__badge}>
              <Badge pill variant="primary">
                Full Time
              </Badge>
            </div>
          </div>
          <div className={classes.card__location}>
            <img src={pin} alt="Pin point" />
            <span>{props.location}</span>
          </div>
          <Card.Subtitle className="mt-3">{props.date}</Card.Subtitle>
        </Card.Body>
      </Card>
    </li>
  );
}

export default JobItem;
