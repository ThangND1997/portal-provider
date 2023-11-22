import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
];

const Feeds = (props) => {
  console.log(props);
  if (Object.keys(props.data).length < 1) {
    return (<></>);
  }
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Doanh thu theo ngày</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Tổng doanh thu: {Number(props.data.totalPriceCharge + "000").toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {props.data.detailPriceCharge.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <img
                src={feed.picture}
                // className="rounded-circle"
                alt="avatar"
                width="48"
                height="38"
                style={{objectFit: "cover", borderRadius: "6px", marginRight: 16}}
              />

              <span>{feed.title}</span>
              
              <small className="ms-auto text-muted text-small">
                {Number(feed.fee + "000").toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
