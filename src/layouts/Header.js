import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import user1 from "../assets/images/users/user1.jpg";

const Header = () => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  // const Handletoggle = () => {
  //   setIsOpen(!isOpen);
  // };
  // const showMobilemenu = () => {
  //   document.getElementById("sidebarArea").classList.toggle("showSidebar");
  // };
  return (
    <Navbar color="dark" dark expand="md" style={{ display: "flex", flexWrap: "nowrap", flexDirection: "row" }}>
      <div className="hstack gap-2">
        {/* <Button
          color="dark"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-backspace"> Thoát</i>
          ) : (
            <i class="bi bi-houses"> Danh mục</i>
          )}
        </Button> */}
      </div>

      <div expand="lg" navbar>
        <Nav className="me-auto" navbar style={{ display: "flex", flexWrap: "nowrap", flexDirection: "row" }}>
            <NavItem>
              <Link to="/revenue" className="nav-link" style={{ margin: "0 10px" }}>
                Doanh Thu
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/products" className="nav-link" style={{ margin: "0 10px" }}>
                Sản phẩm
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/management" className="nav-link" style={{ margin: "0 10px" }}>
                Quản lý
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/employee-register" className="nav-link" style={{ margin: "0 10px" }}>
                Đăng ký thành viên
              </Link>
            </NavItem>
          </Nav>
      </div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="dark">
          <img
            src={user1}
            alt="profile"
            className="rounded-circle"
            width="30"
          ></img>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Info</DropdownItem>
          <DropdownItem>My Account</DropdownItem>
          <DropdownItem>Edit Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>My Balance</DropdownItem>
          <DropdownItem>Inbox</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;
