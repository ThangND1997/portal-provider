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
  Input
} from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { HOST_PRIMARY, TOAST_KEY } from "../../utils/Constant";
import Counter from "../../components/dashboard/Counter";
import * as _ from "lodash"
import SimpleBadge from "../../components/dashboard/Bage";


const ReleaseProducts = (load) => {
  console.log(load);
  const [numberOfProducts, setNumberOfProducts] = useState(1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    load.forms.modalFunc(true);
    load.forms.popupsFunc({
      isShow: true,
    })
    const data = {
      numberOfProducts
    }
    await axios({
      url: `${HOST_PRIMARY}/betiu-services/products-warehouse/${load.forms.info.id}/release`,
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRlMGU3Ni0zYjhiLTQxZmEtYTI0OC04MWM4NDFmNmZiY2IiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAxMDc4ODQxLCJleHAiOjE3MzcwNzg4NDF9.KgBOUbtzEuAs4CBfLm0n3XFWcmbg_bLni6WSNjgD5a8",
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

    const addCartFunc = () => {
      const data = JSON.parse(localStorage.getItem("releaseProducts")) || [];
      const numberExisting = _.findIndex(data, (item, index) => {
        return item.id === `${load.forms.info.id}`;
      });
      numberExisting !== -1 ? data[`${numberExisting}`].numberOfProducts = data[`${numberExisting}`].numberOfProducts + numberOfProducts : data.push({id: load.forms.info.id, title: load.forms.info.title, image: load.forms.info.image,numberOfProducts: numberOfProducts});
      localStorage.setItem("releaseProducts", JSON.stringify(data));
      const latestData = JSON.parse(localStorage.getItem("releaseProducts")) || [];
      let totalCount = 0;
      for (const item of latestData) {
        totalCount += item.numberOfProducts;
      }
      load.forms.popupsFunc({
        isShow: false,
      })
      load.forms.toastFunc({
        isOpen: true,
        key: TOAST_KEY.SUCCESS,
        customMessage: {
          value: "Sản phẩm đã được thêm vào danh sách chờ!"
        }})
      load.forms.childDataFunc({cartCount: totalCount})
    }

  return (
    <Row style={{ minWidth: "20%" }}>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bag-dash-fill me-2"> </i>
            Bảng thông tin
          </CardTitle>
          <CardBody style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Counter card={setNumberOfProducts}/>
            <Form onSubmit={handleSubmit}>
              <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
                <Button className="mt-2" color="danger" style={{ marginRight: 16 }} onClick={() => load.forms.popupsFunc({isShow: false})}>Đóng</Button>
                <Button className="mt-2" onClick={addCartFunc} color="success" style={{ marginRight: 16 }} >Thêm</Button>
                <Button className="mt-2" type="submit" color="primary">Thanh Toán</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ReleaseProducts;
