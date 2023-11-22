import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { HOST_PRIMARY, TOAST_KEY } from "../../utils/Constant";
import axios from "axios";
import Button from '@mui/material/Button';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import CreateProducts from "../ui/CreateProducts"

const AddProducts = (load) => {
  const modalFunc = load.addProducts.data.modalFunc;
  const toastFunc = load.addProducts.data.toastFunc;
  const popupsFunc = load.addProducts.data.popupsFunc;
  const [reloadProducts, setReloadProducts] = useState(false);

  const editProductFunc = (id) => {
    console.log(id);
  }

  const delProductFunc = (id) => {
    load.addProducts.data.modalFunc(true);
    axios({
      url: `${HOST_PRIMARY}/betiu-services/products-warehouse/${id}`,
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAwNjM0NTk5LCJleHAiOjE3MzY2MzQ1OTl9.0d4yf1J79SIT-nISpC-ETQWV6Zsuj848c1mSEiGm6YU",
      },
    })
      .then(res => {
        setReloadProducts(true);
        load.addProducts.data.modalFunc(false);
        load.addProducts.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.SUCCESS,
        });
      })
      .catch((er) => {
        load.addProducts.data.modalFunc(false);
        load.addProducts.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.ERROR,
          customMessage: {
            value: er.response.data.message
          }
        });
      })
  }

  const addProductFunc = () => {
    load.addProducts.data.popupsFunc({
      isShow: true, 
      soakData: <CreateProducts forms={{modalFunc, toastFunc, popupsFunc, setReloadProducts}}/>
    });
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    setReloadProducts(false);
    axios.get(`${HOST_PRIMARY}/betiu-services/products-warehouse`, {
      params: { 
        categoryId: "6da2b221-19b6-4b11-957c-a6ebf9a4c3e4"
      },
      headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAwNjM0NTk5LCJleHAiOjE3MzY2MzQ1OTl9.0d4yf1J79SIT-nISpC-ETQWV6Zsuj848c1mSEiGm6YU"}
    },
    )
    .then(res => {
      setData(res.data)
    })
    .catch(err => console.log(err))
  }, [reloadProducts])

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            Quản lý sản phẩm
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Danh sách sản phẩm
          </CardSubtitle>
          <Button style={{ marginTop: 6, marginBottom: 16 }} variant="contained" color="inherit" onClick={() => addProductFunc()}>
            <PostAddOutlinedIcon />
            <span style={{ marginLeft: "10px" }}>Thêm Sản Phẩm</span>
          </Button>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Danh mục</th>

                <th>Tên sản phẩm</th>

                <th>Mô tả</th>

                <th>Giá ban đầu</th>

                <th>Giá bán</th>

                <th>Hiển thị</th>

                <th></th>

              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>{item.category.name}</td>
                  <td>{item.name}</td>
                  <td style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "200px", textWrap: "nowrap" }}>
                    <span title={item.description}>{item.description}</span>
                  </td>
                  <td>{item.priceOriginal ? Number(item.priceOriginal + "000").toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "0 VND"}</td>
                  <td>{item.priceDisplay ? Number(item.priceDisplay + "000").toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "0 VND"}</td>
                  <td>
                    <img
                        src={item.picture}
                        // className="rounded-circle"
                        alt="avatar"
                        width="90"
                        height="50"
                        style={{ borderRadius: "6px", objectFit: "cover" }}
                      />
                  </td>
                  <td>
                      <Button variant="contained" color="success" onClick={() => editProductFunc(item.id)}>EDIT</Button>
                  </td>
                  <td>
                      <Button variant="contained" color="error" onClick={() => delProductFunc(item.id)}>DEL</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProducts;
