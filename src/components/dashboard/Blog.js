import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      <div style={{height: "250px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px"}}>
        <CardImg style={{ height: "100%", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} alt="Card image cap" src={props.image} />
      </div>
      <CardBody className="p-4" style={{ borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>
          <span style={{ textOverflow: "ellipsis", width: "20px" }}>{props.subtitle}</span>
        </CardSubtitle>
        <CardText style={{ color: '#e13f8f' }} className="mt-3">Giá: {props.priceDisplay ? Number(props.priceDisplay + "000").toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "0 VND"}</CardText>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button color='info' onClick={() => alert("Đang trong quá trình sử lý..")}>Order Now</Button>
          <span>sl: {props.total}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Blog;
