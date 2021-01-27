import { useState } from "react";
import PageUtils from "../components/PageUtils";
import quizdata from "../public/quizdb";
import styled from "styled-components";
import { useRouter } from "next/router";
import ProgressBar from "../components/ProgressBar";
import Head from "next/head";
import KakaoShareButton from "../components/KakaoShareButton";

const QuizHeader = styled.div`
  margin-top: 70px;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  // color: grey;
`;

const StatusBar = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bar {
    max-width: 600;
    margin-top: 10px;
  }
`;

const QuizDiv = styled.div``;

const QuizBody = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .quiz-content {
    width: 80%;
  }

  .question {
    max-width: 600px;
    position: relative;
    background-color: white;
    line-height: 30px;
    text-align: center;

    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    border: 1px solid #c2bdbd;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    margin: 30px 15px 15px 15px;
    font-size: 14px;
  }

  .quiz-img {
    width: 150px;
    height: 150px;
    margin-bottom: 15px;
  }
`;
const AnswerList = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerBtn = styled.button`
  margin-top: 5px;
  max-width: 600px;
  width: 100%;
  height: 30px;
  text-align: left;
  padding-left: 25px;
  border: 1px solid #c2bdbd;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  cursor: pointer;

  // &:hover {
  //   border-color: #36cc3c;
  //   background-color: #edfbd5;
  // }
  &:active {
    border-color: #36cc3c;
    background-color: #edfbd5;
  }
`;

function quiz() {
  const [count, setCount] = useState(0);
  const [totalScore, setScore] = useState(0);
  const [resultOn, setResultOn] = useState(false);
  const percentage = (count / quizdata.length) * 100;

  let q = quizdata[count];
  return (
    <PageUtils page="quiz">
      <Head>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Head>
      <QuizDiv>
        <QuizHeader>✏️ 칵테일 능력평가</QuizHeader>
        {!resultOn ? (
          <>
            <StatusBar>
              <div className="count">
                {q.id}/{quizdata.length}
              </div>

              <ProgressBar percentage={percentage}></ProgressBar>
            </StatusBar>
            <QuizBody>
              <div className="quiz-content question">
                <p>{q.question}</p>
                <img
                  className="quiz-img"
                  src={`/cocktails/${q.imgsrc}`}
                  alt="no-img"
                />
              </div>
              <div className="quiz-content">
                <AnswerList>
                  {q.answers.map((answer) => {
                    return (
                      <Answer
                        count={count}
                        setCount={setCount}
                        answer={answer}
                        score={q.score}
                        totalScore={totalScore}
                        setScore={setScore}
                        setResultOn={setResultOn}
                      ></Answer>
                    );
                  })}
                </AnswerList>
              </div>
            </QuizBody>
          </>
        ) : (
          <Result totalScore={totalScore}></Result>
        )}
      </QuizDiv>
    </PageUtils>
  );
}

function Answer({
  answer,
  count,
  setCount,
  score,
  totalScore,
  setScore,
  setResultOn,
}) {
  const { text, isAnswer } = answer;
  return (
    <AnswerBtn
      onClick={(e) => {
        e.target.blur();
        if (isAnswer === true) {
          setScore(totalScore + score);
        }
        count++;
        if (quizdata[count]) {
          setCount(count);
        } else {
          setResultOn(true);
        }
      }}
    >
      {text}
    </AnswerBtn>
  );
}

const ResultBox = styled.div`
  margin: auto;
  margin-top: 30px;
  width: 350px;
  height: 350px;
  // background-color: #edfbd5;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  .score-text {
    margin-top: 20px;
    font-size: 20px;
  }

  .score {
    margin-top: 10px;
    font-size: 24px;
    color: red;
  }

  .result-img {
    margin-top: 20px;
    border-radius: 3px;
    width: 120px;
    height: 120px;
  }

  .result-text {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .btn {
    height: 50px;
    width: 240px;
    margin-top: 10px;
    cursor: pointer;
    background-color: white;

    &:hover {
      background-color: limegreen;
      color: white;
    }
    &:active {
      background-color: green;
      color: white;
    }
  }
`;

const KakaoLink = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  p {
    align-self: center;
    font-size: 14px;
    margin-right: 10px;
  }
`;

function Result({ totalScore }) {
  const router = useRouter();
  const resultData = [
    {
      id: "1",
      imgsrc: "result1.jpg",
      text: "삐빅 술알못입니다",
    },
    {
      id: "3",
      imgsrc: "result3.gif",
      text: "삐빅 술잘알입니다",
    },
  ];

  let result;

  if (totalScore < 50) {
    result = resultData[0];
  } else if (totalScore >= 50) {
    result = resultData[1];
  }

  return (
    <>
      <ResultBox>
        <h2 className="score-text">Score</h2>
        <div className="score">{totalScore}</div>
        <img className="result-img" src={result.imgsrc} alt="no images" />
        <div className="result-text">{result.text}</div>
      </ResultBox>
      <ButtonDiv>
        <button
          className="btn"
          selected=""
          onClick={
            () => (document.location.href = "/quiz") /*router.push("/quiz")*/
          }
        >
          다시 도전하기
        </button>
        <button className="btn" selected="">
          칵테일 추천받기
        </button>
      </ButtonDiv>
      <KakaoLink>
        <p>카카오톡으로 공유하기</p>
        <KakaoShareButton
          title="나의 술알못 테스트 결과는?"
          desc={result.text}
          imgurl="http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg"
        ></KakaoShareButton>
      </KakaoLink>
    </>
  );
}

export default quiz;
