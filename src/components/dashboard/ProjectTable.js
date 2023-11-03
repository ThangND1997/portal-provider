import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { HOST_PRIMARY, TOAST_KEY } from "../../utils/Constant";
import axios from "axios";
import Button from '@mui/material/Button';

const ProjectTables = (load) => {
  console.log(load);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    load.projectTables.data.modalFunc(true);
    setReloadUsers(false);
    axios({
      url: `${HOST_PRIMARY}/betiu-services/users`,
      method: "GET",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY5ODAyODg4MCwiZXhwIjoxNzM0MDI4ODgwfQ.I4C7uDJpx64jucTuRBOaIRVVTrsiGPgiIt6FUJKYr44",
      },
    })
      .then(res => {
        setUsers(res.data)
        load.projectTables.data.modalFunc(false);
      })
      .catch((er) => {
        console.log(er);
        load.projectTables.data.modalFunc(false);
      })
  }, [reloadUsers])

  const activeUserFunc = (id) => {
    axios({
      url: `${HOST_PRIMARY}/betiu-services/users/${id}/approve`,
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY5ODAyODg4MCwiZXhwIjoxNzM0MDI4ODgwfQ.I4C7uDJpx64jucTuRBOaIRVVTrsiGPgiIt6FUJKYr44",
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
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzdkMTFmMy1iODNiLTQzZDYtOWJkMS04NWY2Njc3ZTNiZmQiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY5ODAyODg4MCwiZXhwIjoxNzM0MDI4ODgwfQ.I4C7uDJpx64jucTuRBOaIRVVTrsiGPgiIt6FUJKYr44",
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

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Quản lý nhân sự</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Danh sách thành viên
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Thông tin</th>
                <th>Số điện thoại</th>

                <th>Địa chỉ</th>

                <th>Chức vụ</th>

                <th>Trạng thái</th>

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
                  <td>{userInfo.role}</td>
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
                    {userInfo.status === "active" && userInfo.role !== "admin" ? (
                      <Button variant="contained" color="error" onClick={() => archiveUserFunc(userInfo.id)}>Archive</Button>
                    ) : userInfo.status === "pending" || userInfo.status === "archived" ? (
                      <Button variant="contained" color="success" onClick={() => activeUserFunc(userInfo.id)}>Active</Button>
                    ) : <span></span>}
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
