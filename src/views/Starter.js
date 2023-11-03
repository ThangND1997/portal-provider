import { Col, Row } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios"
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { HOST_PRIMARY } from "../utils/Constant";

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

const Starter = (load) => {
  console.log(load);
  const [summary, setSummary] = useState({})
  const [chartTransaction, setChartTransaction] = useState([])
useEffect(() => {
    axios.get(`${HOST_PRIMARY}/betiu-services/products-warehouse/report`, {
      headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY5ODAyODg4MCwiZXhwIjoxNzM0MDI4ODgwfQ.I4C7uDJpx64jucTuRBOaIRVVTrsiGPgiIt6FUJKYr44"}
    })
    .then(res => {
      setSummary(res.data.summary)
      setChartTransaction(res.data.charts)
    })
    .catch(err => console.log(err))
}, [])

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Tổng doanh thu hôm nay"
            earning={summary.totalPriceCharge}
            unit="vnd"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Tổng sản lượng hôm nay"
            earning={summary.totalNumberOfProducts}
            unit="sp"
            icon="bi bi-wallet"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col xxl="12">
          <SalesChart
            data={chartTransaction}
          />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="7" xxl="8" md="12">
          <ProjectTables projectTables={load}/>
        </Col>
        <Col md="12" lg="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
