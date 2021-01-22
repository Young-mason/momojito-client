import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PageUtils from "../components/PageUtils";
import CardGrid from "../components/CardGrid";
import ButtonList from "../components/ButtonList";
import Carousel from "../components/Carousel";
import CocktailInfo from "../components/CocktailInfo";
import { useRouter } from "next/router";
import Modal from "react-modal";
import db from "../public/cocktaildb";
import styled, { ThemeContext } from "styled-components";
Modal.setAppElement("#__next");

function ReactModalAdapter({ className, ...props }) {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
}

const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    background-color: rgba(255, 255, 255, 0);
    z-index: 10;
    position: fixed;
    inset: 0;
    transform: translateX(+375px);
    transition: all 250ms ease-in-out;
    &.ReactModal__Overlay--after-open {
      transform: translateX(0px);
    }
    &.ReactModal__Overlay--before-close {
      transform: translateX(+375px);
    }
  }

  &__content {
    overflow: auto;
    background-color: white;
    position: absolute;
    top: 75px;
    bottom: 75px;
    right: 0px;
    left: auto;
    width: 375px;
  }
`;

export default function Home() {
  const [buttonSelected, setButtonSelected] = useState(0);
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  const dbIndexList = db.map((el) => el.id);
  const [topTenList, setTopTenList] = useState([]);
  useEffect(() => {
    if (topTenList.length === 0) {
      axios
        .get("https://server.momo-jito.com/mainpage/getTopTen")
        .then((res) => {
          const data = res.data.data.map((el) => {
            return el.id;
          });
          setTopTenList(data);
        });
    }
  }, []);

  return (
    <PageUtils>
      <StyledModal
        closeTimeoutMS={250}
        isOpen={!!router.query.cocktailId}
        onRequestClose={() => router.push("/")}
        contentLabel="Cocktail Modal"
      >
        <CocktailInfo
          id={
            router.query.cocktailId ? router.query.cocktailId : user.pastquery
          }
        ></CocktailInfo>
      </StyledModal>
      <Carousel
        carouselList={[
          {
            url: 'url("/bar1.jpeg");',
            heading: "당신의 칵잘알 퀴즈 점수는?",
            handleClick: (e) => {
              router.push("/quiz");
            },
          },
          {
            url: 'url("/bar2.jpeg");',
            heading: "칵테일 이상형 월드컵 16강",
            handleClick: (e) => {
              router.push("/worldcup");
            },
          },
        ]}
      ></Carousel>
      <ButtonList
        buttonList={["클래식 칵테일", "재료별 칵테일", "인기 TOP 10"]}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      ></ButtonList>
      {buttonSelected === 0 ? (
        <CardGrid indexList={dbIndexList}></CardGrid>
      ) : buttonSelected === 1 ? (
        <Ingredientsfilter db={db}></Ingredientsfilter>
      ) : (
        <CardGrid indexList={topTenList.slice(0, 10)} type="ranking"></CardGrid>
      )}
    </PageUtils>
  );
}

const baseList = ["진", "럼", "보드카", "위스키", "데킬라", "깔루아"];

function Ingredientsfilter({ db }) {
  const [buttonSelected, setButtonSelected] = useState(0);
  return (
    <div>
      <ButtonList
        buttonList={baseList}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      ></ButtonList>
      <CardGrid
        indexList={db
          .map(({ ingredients }, i) => {
            if (ingredients.includes(baseList[buttonSelected])) {
              return i;
            } else {
              return undefined;
            }
          })
          .filter((v) => v !== undefined)}
      ></CardGrid>
    </div>
  );
}
