import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import Skeleton from '@mui/material/Skeleton';
import ReleaseProducts from "../../views/ui/ReleaseProducts";
import { useEffect } from "react";

const Blog = (props) => {
  const modalFunc = props.load.data.modalFunc;
  const toastFunc = props.load.data.toastFunc;
  const popupsFunc = props.load.data.popupsFunc;
  const childDataFunc = props.load.data.childDataFunc;
  const info = {id: props.id, title: props.title, image: props.image};
  const handlePopupItemFunc = () => {
    props.load.data.popupsFunc({
      isShow: true, 
      soakData: <ReleaseProducts forms={{modalFunc, toastFunc, popupsFunc, info, childDataFunc}}/>
    });
  }

  return (
    <Card>
      <div style={{height: "250px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px"}}>
        {props.image ? <CardImg style={{ height: "100%", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} alt="Card image cap" src={props.image} /> : <Skeleton variant="rectangular" height={"100%"} />}
        {/* <CardImg style={{ height: "100%", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} alt="Card image cap" src={props.image} /> */}
      </div>
      <CardBody onClick={handlePopupItemFunc} className="p-4" style={{ borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px", userSelect: "none", cursor: "pointer" }}>
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle style={{ textOverflow: "ellipsis", overflow: "hidden", textWrap: "nowrap" }}>
          <span>{props.subtitle}</span>
        </CardSubtitle>
        <CardText style={{ color: '#e13f8f' }} className="mt-3">Giá: {props.priceDisplay ? Number(props.priceDisplay + "000").toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "0 VND"}</CardText>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button color='info' onClick={handlePopupItemFunc}>Thanh toán ngay</Button>
          <span>sl: {props.total}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Blog;
