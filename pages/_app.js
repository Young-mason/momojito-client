import { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import axios from "axios";
import { useRouter } from "next/router";
import "swiper/swiper-bundle.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({
    isLogin: false,
    pastquery: 0,
    userInfo: {},
    accessToken: "",
    myCocktailList: [],
  });
  const [ratingList, setRatingList] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get("https://server.momo-jito.com/auth/accesstoken", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if (
            res.data.data.userInfo.profile ===
            "https://avatars1.githubusercontent.com/u/47313528?s=88&v=4"
          ) {
            res.data.data.userInfo.profile = null;
          }
          setUser({
            ...user,
            userInfo: res.data.data.userInfo,
            myCocktailList: res.data.data.cocktailList,
            accessToken: res.data.data.accessToken,
            isLogin: true,
          });

          localStorage.setItem("accessToken", res.data.data.accessToken);
        });
    }
  }, []);
  useEffect(() => {
    if (ratingList.length === 0) {
      axios
        .get("https://server.momo-jito.com/mainpage/getTopTen")
        .then((res) => {
          const data = res.data.data;
          setRatingList(data);
        });
    }
  });

  return (
    <>
      <Reset />
      <ThemeProvider
        theme={{
          main: "limegreen",
          sub: "rgba(238, 250, 214, 1)",
          grey: "grey",
          userContext: {
            user: user,
            setUser: setUser,
          },
          ratingContext: {
            ratingList,
            setRatingList,
          },
        }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
