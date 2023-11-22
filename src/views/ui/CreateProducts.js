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


const CreateProducts = (load) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceDisplay, setPriceDisplay] = useState(0);
  const [priceOriginal, setPriceOriginal] = useState(0);
  const [picture, setPicture] = useState("");
  const [total, setTotal] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      description,
      priceDisplay,
      priceOriginal,
      picture,
      total,
      categoryId: "6da2b221-19b6-4b11-957c-a6ebf9a4c3e4"
    }
    load.forms.popupsFunc({
      isShow: true,
    })
    await axios({
      url: `${HOST_PRIMARY}/betiu-services/products-warehouse`,
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAwNjM0NTk5LCJleHAiOjE3MzY2MzQ1OTl9.0d4yf1J79SIT-nISpC-ETQWV6Zsuj848c1mSEiGm6YU",
      },
      data
    })
      .then(res => {
        load.forms.modalFunc(false);
        load.forms.setReloadProducts(true)
        load.forms.toastFunc({
          isOpen: true,
          key: TOAST_KEY.SUCCESS,
          customMessage: {
            value: "Thêm sản phẩm thành công!"
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

  const fetchAvatarUrl = async(e) => {
    //call loading
    load.forms.modalFunc(true);
    const formData = new FormData()
    formData.append("image", e.target.files[0])
    await axios({
        url: "https://api.imgur.com/3/image/",
        method: "POST",
        headers: {
            "Authorization": "Client-ID eb9173f09f940b0",
        },
        data: formData
    })
    .then(res => {
        setPicture(res.data.data.link)
        load.forms.modalFunc(false);
    })
    .catch((er) => {
        load.forms.modalFunc(false);
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
            Thêm sản phẩm
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="text">Tên sản phẩm</Label>
                <Input
                  id="nameProduct"
                  placeholder="Nhập tên sản phẩm"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="text">Mô tả</Label>
                <Input
                  id="descriptionProduct"
                  placeholder="Nhập mật khẩu"
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="text">Giá đầu vào (đv: 1000vnđ)</Label>
                <Input
                  id="priceOriginalProduct"
                  placeholder="Nhập giá gốc"
                  type="number"
                  onChange={(e) => {
                    setPriceOriginal(Number(e.target.value))
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="text">Giá bán ra (đv: 1000vnđ)</Label>
                <Input
                  id="priceDisplayProduct"
                  placeholder="Nhập giá hiển thị"
                  type="number"
                  onChange={(e) => {
                    setPriceDisplay(Number(e.target.value))
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Ảnh hiển thị</Label>
                {picture ? <div style={{ position: "relative" }}>
                  <img 
                  src={picture}
                  // className="rounded-circle"
                  alt="avatar"
                  width="140"
                  height="90"
                  style={{ borderRadius: "6px", display: "flex", objectFit: "cover" }}
                />
                <i className="bi bi-x-circle me-2" style={{ position: "absolute", top: -12, left: 140, color: "red", cursor: "pointer", padding: "10px" }} onClick={() => setPicture("")}></i>
                </div>
                : <Input 
                id="avatarProduct" 
                name="file" 
                type="file"
                onChange={(e) => fetchAvatarUrl(e)}
              />}
              </FormGroup>
              <FormGroup>
                <Label for="text">Số lượng</Label>
                <Input
                  id="totalProduct"
                  placeholder="Nhập số lượng sản phẩm"
                  type="number"
                  onChange={(e) => {
                    setTotal(Number(e.target.value))
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

export default CreateProducts;
