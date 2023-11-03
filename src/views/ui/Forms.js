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


const Forms = (load) => {
  const validDefault = {email: true, password: true, avatarUrl: true, name: true, phoneNumber: true}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [valid, setValid] = useState(validDefault);

  const handleSubmit = async (event) => {
    const ds = {email: true, password: true, avatarUrl: true, name: true, phoneNumber: true}
    event.preventDefault();
    let isValidate = false;
    if (!email) {
      ds.email = false;
      isValidate = true;
    }
    if (!password) {
      ds.password = false;
      isValidate = true;
    }
    if (!avatar) {
      ds.avatarUrl = false;
      isValidate = true;
    }
    if (!name) {
      ds.name = false;
      isValidate = true;
    }
    if (!phoneNumber) {
      ds.phoneNumber = false;
      isValidate = true;
    }
    // validate input
    if (isValidate) {
      setValid(ds)
    } else {
      const data = {
        name,
        email,
        password,
        avatarUrl: avatar,
        phone: phoneNumber
      }
      await axios({
        url: `${HOST_PRIMARY}/betiu-services/users/register`,
        method: "POST",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY5ODAyODg4MCwiZXhwIjoxNzM0MDI4ODgwfQ.I4C7uDJpx64jucTuRBOaIRVVTrsiGPgiIt6FUJKYr44",
        },
        data
      })
        .then(res => {
          console.log(res);
          load.data.modalFunc(false);
          load.data.toastFunc({
            isOpen: true,
            key: TOAST_KEY.SUCCESS,
            customMessage: {
              value: "Đăng kí thành công!"
            }
          });
        })
        .catch((er) => {
          load.data.modalFunc(false);
          load.data.toastFunc({
            isOpen: true,
            key: TOAST_KEY.ERROR,
            customMessage: {
              value: er.response.data.message
            }
          });
        })
    }
  }

  const fetchAvatarUrl = async(e) => {
    //call loading
    load.data.modalFunc(true);
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
        setAvatar(res.data.data.link)
        load.data.modalFunc(false);
    })
    .catch((er) => {
        console.log(er);
        load.data.modalFunc(false);
    })
  }
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Đăng kí thành viên
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Nhâp địa chỉ email"
                  type="email"
                  invalid={valid.email ? false : true}
                  onClick={(e) => setValid(validDefault)}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Mật khẩu</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  type="password"
                  invalid={valid.password ? false : true}
                  onClick={(e) => setValid(validDefault)}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Tên hiển thị</Label>
                <Input
                  id="examplePassword"
                  placeholder="Nhập tên hiển thị"
                  type="text"
                  invalid={valid.password ? false : true}
                  onClick={(e) => setValid(validDefault)}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Số điện thoại</Label>
                <Input
                  id="examplePassword"
                  placeholder="Nhập số điện thoại"
                  type="phone"
                  invalid={valid.password ? false : true}
                  onClick={(e) => setValid(validDefault)}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Avatar</Label>
                <Input 
                  id="exampleFile" 
                  name="file" 
                  type="file"
                  invalid={valid.avatarUrl ? false : true}
                  onChange={(e) => fetchAvatarUrl(e)}
                />
              </FormGroup>
              
              <Button className="mt-2" type="submit" color="primary">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
