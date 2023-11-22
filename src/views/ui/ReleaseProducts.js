import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { HOST_PRIMARY, TOAST_KEY } from "../../utils/Constant";


const ReleaseProducts = (load) => {
  console.log(load);
  const [numberOfProducts, setNumberOfProducts] = useState(1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    load.forms.popupsFunc({
      isShow: true,
    })
    const data = {
      numberOfProducts
    }
    await axios({
      url: `${HOST_PRIMARY}/betiu-services/products-warehouse/${load.forms.id}/release`,
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAwNjM0NTk5LCJleHAiOjE3MzY2MzQ1OTl9.0d4yf1J79SIT-nISpC-ETQWV6Zsuj848c1mSEiGm6YU",
      },
      data
    })
      .then(res => {
        load.forms.modalFunc(false);
        load.forms.toastFunc({
          isOpen: true,
          key: TOAST_KEY.SUCCESS,
          customMessage: {
            value: "Giao dịch được chấp nhận!"
          }
        });
        load.forms.popupsFunc({
          isShow: false,
        })
      })
      .catch((er) => {
        load.forms.modalFunc(false);
        load.forms.toastFunc({
          isOpen: true,
          key: TOAST_KEY.ERROR,
          customMessage: {
            value: er.response.data.message
          }
        });
        load.forms.popupsFunc({
          isShow: false,
        })
      })
    }

  return (
    <Row style={{ minWidth: "60%" }}>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bag-dash-fill me-2"> </i>
            Bảng thông tin
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="text">Nhập số lượng: </Label>
                <Input
                  id="priceOriginalProduct"
                  placeholder="1"
                  type="number"
                  onChange={(e) => {
                    setNumberOfProducts(Number(e.target.value))
                  }}
                />
              </FormGroup>
              
              <div style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}>
                <Button className="mt-2" color="danger" style={{ marginRight: 16 }} onClick={() => load.forms.popupsFunc({isShow: false})}>Close</Button>
                <Button className="mt-2" type="submit" color="primary">Submit</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ReleaseProducts;
