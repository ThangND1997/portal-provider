import { useState, useEffect } from "react";
import axios from "axios"
import SalesChart from "../components/dashboard/SalesChart";
import DateRangePickerPage from "../views/ui/DateRangePicker"
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { HOST_PRIMARY } from "../utils/Constant";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

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
  const [summary, setSummary] = useState({})
  const [chartTransaction, setChartTransaction] = useState([])
  const [data, setDate] = useState([])
  const [dateRange, setDateRange] = useState([])
  const dateRangeFunc = (dateArray) => {
    setDateRange(dateArray);
  }
  const dataToday = [0, 0];
  useEffect(() => {
      if (dateRange.length < 1) {
        return;
      }
      load.data.modalFunc(true);
      axios.get(`${HOST_PRIMARY}/betiu-services/products-warehouse/report`, {
        params: { 
          startDate: dateRange[0],
          endDate: dateRange[1],
        },
        headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY5ODAyODg4MCwiZXhwIjoxNzM0MDI4ODgwfQ.I4C7uDJpx64jucTuRBOaIRVVTrsiGPgiIt6FUJKYr44"}
      },
      )
      .then(res => {
        setSummary(res.data.summary)
        setChartTransaction(res.data.charts)
        setDate(res.data.data)
        load.data.modalFunc(false);
      })
      .catch(err => console.log(err))
  }, [dateRange])

  useEffect(() => {
    dataToday[0] = summary.totalPriceCharge;
    dataToday[1] = data.reduce((n, item) => {
      return n + item.numberOfProducts
    }, 0);
  }, [])

  console.log(dataToday);

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Tổng doanh thu hôm nay"
            earning={summary.totalPriceCharge ? Number(summary.totalPriceCharge + "000").toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "0 VND"}
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Tổng sản phẩm bán được hôm nay"
            earning={data.reduce((n, item) => {
              return n + item.numberOfProducts
            }, 0)}
            unit="sản phẩm"
            icon="bi bi-wallet"
          />
        </Col>
        {/* <Col sm="6" lg="4">
          <DateRangePickerPage />
        </Col> */}
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col lg="7" xxl="8" md="12">
          {/* <DateRangePickerValue /> */}
          <SalesChart
            data={chartTransaction}
            dateRange={dateRangeFunc}
          />
        </Col>
        <Col md="12" lg="5" xxl="4">
          <Feeds 
            data={summary}
          />
        </Col>
      </Row>
      <Row lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Table with Striped
          </CardTitle>
          <CardBody className="">
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Row>
    </div>
  );
};

export default Starter;
