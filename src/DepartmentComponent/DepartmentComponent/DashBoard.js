import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUsers, FaUserClock, FaTimesCircle } from "react-icons/fa";

const DashBoardCard = ({ type, count, lastWeek, lastMonth }) => {
  const getColor = () => {
    switch (type) {
      case "Accepted":
        return "primary";
      case "Pending":
        return "warning";
      case "Reject":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "Accepted":
        return <FaUsers className="me-2" />;
      case "Pending":
        return <FaUserClock className="me-2" />;
      case "Reject":
        return <FaTimesCircle className="me-2" />;
      default:
        return null;
    }
  };

  const cardStyle = {
    transform: "scale(1)",
    transition: "transform 0.3s ease-in-out"
  };

  const hoverStyle = {
    transform: "scale(1.1)"
  };

  return (
    <div
      className="card-scale-wrapper"
      style={{ display: "block" }}
      onMouseEnter={(e) => {
        e.currentTarget.firstChild.style.transform = hoverStyle.transform;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.firstChild.style.transform = cardStyle.transform;
      }}
    >
      <Card className="text-center shadow-sm" style={cardStyle}>
        <Card.Body>
          <div className={`text-${getColor()} d-flex justify-content-center align-items-center mb-2`}>
            {getIcon()}
            <strong>{type}</strong>
          </div>
          <h2>{count}</h2>
          <div className="text-muted">last week {lastWeek}</div>
          <div className="text-muted">last month {lastMonth}</div>
        </Card.Body>
      </Card>
    </div>
  );
};

const DashBoard = () => {
  const data = [
    { type: "Accepted", count: 26, lastWeek: 5, lastMonth: 10 },
    { type: "Pending", count: 26, lastWeek: 5, lastMonth: 10 },
    { type: "Reject", count: 26, lastWeek: 5, lastMonth: 10 }
  ];

  return (
    <div className="container vh-100 vb-100 mt-4">
      <Row className="g-4">
        {data.map((item, idx) => (
          <Col md={4} key={idx}>
            <DashBoardCard {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashBoard;
