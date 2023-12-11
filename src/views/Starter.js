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
  const [type, setType] = useState("revenue");
  const dateRangeFunc = (dateArray) => {
    setDateRange(dateArray);
  }
  const reportTypeFunc = (e) => {
    setType(e);
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
          type,
        },
        headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRlMGU3Ni0zYjhiLTQxZmEtYTI0OC04MWM4NDFmNmZiY2IiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAxMDc4ODQxLCJleHAiOjE3MzcwNzg4NDF9.KgBOUbtzEuAs4CBfLm0n3XFWcmbg_bLni6WSNjgD5a8"}
      },
      )
      .then(res => {
        setSummary(res.data.summary)
        setChartTransaction(res.data.charts)
        setDate(res.data.data)
        load.data.modalFunc(false);
      })
      .catch(err => {
        load.data.modalFunc(false);
        console.log(err)})
  }, [dateRange])
  useEffect(() => {
    if (dateRange.length < 1) {
      return;
    }
    load.data.modalFunc(true);
    axios.get(`${HOST_PRIMARY}/betiu-services/products-warehouse/report`, {
      params: { 
        startDate: dateRange[0],
        endDate: dateRange[1],
        type,
      },
      headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRlMGU3Ni0zYjhiLTQxZmEtYTI0OC04MWM4NDFmNmZiY2IiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAxMDc4ODQxLCJleHAiOjE3MzcwNzg4NDF9.KgBOUbtzEuAs4CBfLm0n3XFWcmbg_bLni6WSNjgD5a8"}
    },
    )
    .then(res => {
      setSummary(res.data.summary)
      setChartTransaction(res.data.charts)
      setDate(res.data.data)
      load.data.modalFunc(false);
    })
    .catch(err => {
      load.data.modalFunc(false);
      console.log(err)})
}, [type])

  useEffect(() => {
    dataToday[0] = summary.totalPriceCharge;
    dataToday[1] = data.reduce((n, item) => {
      return n + item.numberOfProducts
    }, 0);
  }, [])


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
            reportType={reportTypeFunc}
            currentType={type}
          />
        </Col>
        <Col md="12" lg="5" xxl="4">
          <Feeds 
            data={summary}
            currentType={type}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
