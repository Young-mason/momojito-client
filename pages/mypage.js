import { useState, useContext } from "react";
import PageUtils from "../components/PageUtils";
import { ThemeContext } from "styled-components";
import ButtonList from "../components/ButtonList";
import CardGrid from "../components/CardGrid";
import ChangeInfo from "../components/ChangeInfo";
import { useRouter } from "next/router";
import axios from "axios";
export default function MyPage() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  const [buttonSelected, setButtonSelected] = useState(0);
  const signOutHandler = (e) => {
    router.push("/?logout=true", "/");
  };
  return (
    <PageUtils>
      <ButtonList
        buttonList={["회원정보 수정", "My 칵테일"]}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      ></ButtonList>
      {buttonSelected === 0 ? (
        <ChangeInfo></ChangeInfo>
      ) : buttonSelected === 1 ? (
        <CardGrid indexList={user.myCocktailList} type="mypage"></CardGrid>
      ) : (
        <div></div>
      )}
      <button onClick={signOutHandler}>로그아웃</button>
    </PageUtils>
  );
}
