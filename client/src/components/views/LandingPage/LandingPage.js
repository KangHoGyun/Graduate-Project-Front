import React, { useState } from "react";
import { Input, Button } from "antd";
import Axios from "axios";
//import TabsCollage from "./Section/TabsCollage"
import { RocketOutlined } from "@ant-design/icons";
import { Col, Card, Row, Carousel } from "antd";
//import { ingreMeat, ingreVegi, ingreFish } from "./Section/Datas";
const { Meta } = Card;

const { TextArea } = Input;
function LandingPage() {
  const [IngredientList, setIngredientList] = useState("");
  const [Url, setUrl] = useState([]);
  const [Food, setFood] = useState([]);
  const onIngredientListChange = (e) => {
    setIngredientList(e.currentTarget.value);
  };

    const onSubmit = (e) => {
      e.preventDefault();
      var tmp = IngredientList.split(" ");
      let urlList = [];
      Axios.get(//주소는 서버에게 물어봐야 함.
        `http://64758ff78c43.ngrok.io/newuser/recommend2/16?ingred=${IngredientList}` //?앞에 숫자들이 가져올 URL 개수
      ).then((response) => {
        if (response.data.meta.success) {
          setUrl(response.data.urlInfo);
          urlList = response.data.url;
          submitURL(urlList);
        } else {
          console.log("failed");
        }
      })
    };

  const submitURL = (urlArray) => {
    Axios.post("/api/ingredient/ingredients/url", urlArray).then((response) => {
      if (response.data.success) {
        setFood(response.data.value);
      } else {
        console.log("cant't find meta tag");
      }
    });
  };

  const renderCards = Food.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          cover={
            <a href = {product.url}>
            <Carousel autoplay>
            <img 
              style={{ width: "100%", maxHeight: "150px" }}
              src={product.images}>
            </img>
            </Carousel>
            </a>
          }
        >
          <Meta title={product.title}/>
        </Card>
      </Col>
     
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Cook <RocketOutlined />
        </h2>
      </div>
      
      
      <TextArea
        placeholder="재료를 입력해주세요. 각각의 재료는 띄어쓰기로 구분해주세요. ex) 돼지고기 김치 마늘"
        onChange={onIngredientListChange}
        style={{ width: 1140 }}
        value={IngredientList}
      />
      <br />
      <br />
      <Button type="primary" size="small" onClick={onSubmit}>
        검색
      </Button>
      <br />
      <br />
      <Row gutter={(16, 16)}>{renderCards}</Row>
      <br />
      <br />
    </div>
  );
}


export default LandingPage;
