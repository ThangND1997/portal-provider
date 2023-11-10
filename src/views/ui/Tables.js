import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import AddProducts from "./AddProducts";

const Tables = (load) => {
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <ProjectTables projectTables={load}/>
      </Col>
      {/* <Col>
        <AddProducts addProducts={load}/>
      </Col> */}
    </Row>
  );
};

export default Tables;
