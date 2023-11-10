import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { HOST_PRIMARY } from "../../utils/Constant";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Cards = (load) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    load.data.modalFunc(true);
    axios.get(`${HOST_PRIMARY}/betiu-services/products-warehouse`, {
      params: { 
        categoryId: "6da2b221-19b6-4b11-957c-a6ebf9a4c3e4"
      },
      headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY5ODAyODg4MCwiZXhwIjoxNzM0MDI4ODgwfQ.I4C7uDJpx64jucTuRBOaIRVVTrsiGPgiIt6FUJKYr44"}
    },
    )
    .then(res => {
      setData(res.data)
      load.data.modalFunc(false);
    })
    .catch(err => console.log(err))
  }, [])

  console.log(data);
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <h5 className="mb-3">Danh sách sản phẩm</h5>
      <Row>
        {data.map((item, index) => (
          <Col sm="6" lg="4" xl="3" key={index}>
            <Blog
              image={item.picture}
              title={item.name}
              subtitle={item.description}
              priceDisplay={item.priceDisplay}
              total={item.total}
            />
          </Col>
        ))}
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Cards;
