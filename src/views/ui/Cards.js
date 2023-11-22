import {
  Row,
  Col,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import { useState, useEffect } from "react";
import axios from "axios";
import { HOST_PRIMARY } from "../../utils/Constant";

const Cards = (load) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    load.data.modalFunc(true);
    axios.get(`${HOST_PRIMARY}/betiu-services/products-warehouse`, {
      params: { 
        categoryId: "6da2b221-19b6-4b11-957c-a6ebf9a4c3e4"
      },
      headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAwNjM0NTk5LCJleHAiOjE3MzY2MzQ1OTl9.0d4yf1J79SIT-nISpC-ETQWV6Zsuj848c1mSEiGm6YU"}
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
              id={item.id}
              image={item.picture}
              title={item.name}
              subtitle={item.description}
              priceDisplay={item.priceDisplay}
              total={item.total}
              load={load}
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
