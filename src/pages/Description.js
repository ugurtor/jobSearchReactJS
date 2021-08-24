import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import useLocalStorage from "../hooks/useLocalStorage";
import ReactMarkdown from "markdown-to-jsx";

import pin from "../assets/pin-48.png";

function DescriptionPage() {
  const location = useLocation();
  const history = useHistory();

  const [id, setBool] = useLocalStorage(location.state.id, false);

  const apply = window.localStorage.getItem(location.state.id);

  useEffect(() => {
    //if the main page scroll bar has a movement, detail page somehow begins with the main page scroll bar position. to avoid this situation, we add this code block.
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        //when we backward, the query string too.
        history.replace(history.location.search, location.search);
      }
    };
  }, [history]);

  return (
    <Container className="justify-content-md-center">
      <Card className="justify-content-md-center" style={{ width: "50rem" }}>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title>{location.state.title}</Card.Title>
              <Card.Subtitle className="text-muted mb-2">
                {location.state.company_name}
              </Card.Subtitle>
            </div>
            <div className="d-sm-none d-md-block">
              {apply && <Button variant="outline-success">Applied</Button>}
            </div>
          </div>
          <Card.Text>
            <div
              className="mt-2"
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img src={pin} alt="Small pin" />
              <span style={{ fontSize: 16, color: "black" }}>
                {location.state.candidate_required_location}
              </span>
            </div>
            <Card.Subtitle className="text-muted mt-2">
              {(location.state.date)}
            </Card.Subtitle>
            <div>
              <Badge
                pill
                variant="primary"
              >
                Full Time
              </Badge>
            </div>
            <div className="mt-4">
              <ReactMarkdown>{location.state.description}</ReactMarkdown>
            </div>
          </Card.Text>
          <div className="mt-4 justify-content-md-center">
            <Button
              size="lg"
              block
              variant="success"
              onClick={() => setBool(true)}
            >
              Apply
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DescriptionPage;
