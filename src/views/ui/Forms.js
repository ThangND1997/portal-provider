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
  console.log(load);
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
              value: "Đăng kí thành công!"
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
        setAvatar(res.data.data.link)
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
                {avatar ? <div style={{ position: "relative" }}>
                  <img 
                  src={avatar}
                  // className="rounded-circle"
                  alt="avatar"
                  width="140"
                  height="90"
                  style={{ borderRadius: "6px", display: "flex", objectFit: "cover" }}
                />
                <i className="bi bi-x-circle me-2" style={{ position: "absolute", top: -12, left: 140, color: "red", cursor: "pointer", padding: "10px" }} onClick={() => setAvatar("")}></i>
                </div>
                : <Input 
                id="avatarProduct" 
                name="file" 
                type="file"
                invalid={valid.avatarUrl ? false : true}
                onChange={(e) => fetchAvatarUrl(e)}
              />}
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

export default Forms;
