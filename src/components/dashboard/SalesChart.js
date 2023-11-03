import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = (props) => {
  const chartoptions = {
    series: props.data,
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "0AM to 1AM", "1AM to 2AM", "2AM to 3AM", "3AM to 4AM", "4AM to 5AM", "5AM to 6AM",
          "6AM to 7AM", "7AM to 8AM", "8AM to 9AM", "9AM to 10AM", "10AM to 11AM", "11AM to 12PM",
          "12PM to 1PM", "1PM to 2PM", "2PM to 3PM", "3PM to 4PM", "4PM to 5PM", "5PM to 6PM",
          "6PM to 7PM", "7PM to 8PM", "8PM to 9PM", "9PM to 10PM", "10PM to 11PM", "11PM to 12AM"
      ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
