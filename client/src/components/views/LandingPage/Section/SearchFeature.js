import React, { useState } from "react";
import { Input, Button } from "antd";

const { Search } = Input;
const { TextArea } = Input;
function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState("");
  const [Ingredient, setIngredient] = useState([]);
  const [IngredientList, setIngredientList] = useState("");

  const onIngredientListChange = (e) => {
    setIngredientList(e.currentTarget.value);
  };

  const searchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Search
        placeholder="Input your Ingredient"
        onChange={searchHandler}
        style={{ width: 1140 }}
        value={SearchTerm}
      />
      <br />
      <br />
      <TextArea
        placeholder="재료를 입력해주세요. 각각의 재료는 /로 구분해주세요. ex) 돼지고기/김치/마늘"
        onChange={onIngredientListChange}
        value={IngredientList}
      />
      <br />
      <br />
      <Button type="primary" size="small" onClick={onSubmit}>
        검색
      </Button>
    </div>
  );
}

export default SearchFeature;
