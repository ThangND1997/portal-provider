import { ReactComponent as LogoDark } from "../assets/images/logos/swimming.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link style={{ textDecoration: 'none' }} to="/">
      <LogoDark />
      <span style={{color: "#b45309"}}>Tiu System</span>
    </Link>
  );
};

export default Logo;
