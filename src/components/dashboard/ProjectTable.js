import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { HOST_PRIMARY, TOAST_KEY } from "../../utils/Constant";
import axios from "axios";
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Forms from "../../views/ui/Forms";


const ProjectTables = (load) => {
  const modalFunc = load.projectTables.data.modalFunc;
  const toastFunc = load.projectTables.data.toastFunc;
  const popupsFunc = load.projectTables.data.popupsFunc;
  const [reloadUsers, setReloadUsers] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    load.projectTables.data.modalFunc(true);
    setReloadUsers(false);
    axios({
      url: `${HOST_PRIMARY}/betiu-services/users`,
      method: "GET",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRlMGU3Ni0zYjhiLTQxZmEtYTI0OC04MWM4NDFmNmZiY2IiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAxMDc4ODQxLCJleHAiOjE3MzcwNzg4NDF9.KgBOUbtzEuAs4CBfLm0n3XFWcmbg_bLni6WSNjgD5a8",
      },
    })
      .then(res => {
        setUsers(res.data)
        load.projectTables.data.modalFunc(false);
      })
      .catch((er) => {
        load.projectTables.data.modalFunc(false);
      })
  }, [reloadUsers])

  const activeUserFunc = (id) => {
    axios({
      url: `${HOST_PRIMARY}/betiu-services/users/${id}/approve`,
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRlMGU3Ni0zYjhiLTQxZmEtYTI0OC04MWM4NDFmNmZiY2IiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAxMDc4ODQxLCJleHAiOjE3MzcwNzg4NDF9.KgBOUbtzEuAs4CBfLm0n3XFWcmbg_bLni6WSNjgD5a8",
      },
    })
      .then(res => {
        load.projectTables.data.modalFunc(false);
        load.projectTables.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.SUCCESS,
        });
        setReloadUsers(true)
      })
      .catch((er) => {
        load.projectTables.data.modalFunc(false);
        load.projectTables.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.ERROR,
          customMessage: {
            value: er.response.data.message
          }
        });
      })
  }

  const archiveUserFunc = (id) => {
    axios({
      url: `${HOST_PRIMARY}/betiu-services/users/${id}/reject`,
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRlMGU3Ni0zYjhiLTQxZmEtYTI0OC04MWM4NDFmNmZiY2IiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAxMDc4ODQxLCJleHAiOjE3MzcwNzg4NDF9.KgBOUbtzEuAs4CBfLm0n3XFWcmbg_bLni6WSNjgD5a8",
      },
    })
      .then(res => {
        load.projectTables.data.modalFunc(false);
        load.projectTables.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.SUCCESS,
        });
        setReloadUsers(true)
      })
      .catch((er) => {
        load.projectTables.data.modalFunc(false);
        load.projectTables.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.ERROR,
          customMessage: {
            value: er.response.data.message
          }
        });
      })
  }

  const addProductFunc = () => {
    load.projectTables.data.popupsFunc({
      isShow: true, 
      soakData: <Forms forms={{modalFunc, toastFunc, popupsFunc, setReloadUsers}}/>
    });
  }

  const editUserFunc = (id) => {
    console.log(id);
  }

  const delUserFunc = (id) => {
    load.projectTables.data.modalFunc(true);
    axios({
      url: `${HOST_PRIMARY}/betiu-services/users/${id}`,
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRlMGU3Ni0zYjhiLTQxZmEtYTI0OC04MWM4NDFmNmZiY2IiLCJyb2xlSWQiOiJtYW5hZ2VyIiwiaWF0IjoxNzAxMDc4ODQxLCJleHAiOjE3MzcwNzg4NDF9.KgBOUbtzEuAs4CBfLm0n3XFWcmbg_bLni6WSNjgD5a8",
      },
    })
      .then(res => {
        setReloadUsers(true);
        load.projectTables.data.modalFunc(false);
        load.projectTables.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.SUCCESS,
        });
      })
      .catch((er) => {
        load.projectTables.data.modalFunc(false);
        load.projectTables.data.toastFunc({
          isOpen: true,
          key: TOAST_KEY.ERROR,
          customMessage: {
            value: er.response.data.message
          }
        });
      })
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Quản lý nhân sự</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Danh sách thành viên
          </CardSubtitle>
          <Button style={{ marginTop: 6, marginBottom: 16 }} variant="contained" color="inherit" onClick={() => addProductFunc()}>
            <GroupAddIcon />
            <span style={{ marginLeft: "10px" }}>Thêm Thành Viên</span>
          </Button>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Thông tin</th>
                <th>Số điện thoại</th>

                <th>Địa chỉ</th>

                <th>Chức vụ</th>

                <th>Trạng thái</th>

                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((userInfo, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={userInfo.avatarUrl}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{userInfo.name}</h6>
                        <span className="text-muted">{userInfo.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{userInfo.phone}</td>
                  <td>{userInfo.address}</td>
                  <td>{userInfo.role === "manager" ? (
                      <span className="p-2 d-inline-block ms-3" style={{ color: "#04c29e" }}>{userInfo.role}</span>
                  ) : (
                    <span className="p-2 d-inline-block ms-3">{userInfo.role}</span>
                  )}</td>
                  <td>
                    {userInfo.status === "active" ? (
                      <span className="p-2 d-inline-block ms-3" style={{ color: "#15803d" }}>active</span>
                    ) : userInfo.status === "pending" ?(
                      <span className="p-2 d-inline-block ms-3" style={{color: "#fbbf24"}}>pending</span>
                    ) : (
                      <span className="p-2 d-inline-block ms-3" style={{color: "#ef4444"}}>archived</span>
                    )}
                  </td>
                  <td>
                    {userInfo.status === "active" && userInfo.role !== "manager" ? (
                      <Button variant="contained" color="error" onClick={() => archiveUserFunc(userInfo.id)}>Archive</Button>
                    ) : userInfo.status === "pending" || userInfo.status === "archived" ? (
                      <Button variant="contained" color="info" onClick={() => activeUserFunc(userInfo.id)}>Active</Button>
                    ) : <span></span>}
                  </td>
                  <td>
                    {userInfo.role !== "manager" ? <Button variant="contained" color="success" onClick={() => editUserFunc(userInfo.id)}>EDIT</Button> : <></>}
                  </td>
                  <td>
                    {userInfo.role !== "manager" ? <Button variant="contained" color="error" onClick={() => delUserFunc(userInfo.id)}>DEL</Button> : <></>}
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

export default ProjectTables;
