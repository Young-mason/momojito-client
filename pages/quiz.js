import { useState, useEffect } from "react";
import PageUtils from "../components/PageUtils";
import quizdata from "../public/quizdb";
import styled from "styled-components";
import { useRouter } from "next/router";
import ProgressBar from "../components/ProgressBar";
import Head from "next/head";
import KakaoShareButton from "../components/KakaoShareButton";
import Comments from "../components/Comments";
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
  height: 50px;
  text-align: center;
  /* padding-left: 25px; */
  border: 1px solid #c2bdbd;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  cursor: pointer;

  &:active {
    border-color: #36cc3c;
    background-color: #edfbd5;
  }
`;

function quiz() {
  const [count, setCount] = useState(0);
  const [totalScore, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [quiz, setQuiz] = useState([...quizdata])
  const percentage = (count / quiz.length) * 100;
  let q = quiz[count];

  return (
    <PageUtils page="quiz">
      <Head>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Head>
      <QuizDiv>
        <QuizHeader>✏️ 칵테일 능력평가</QuizHeader>
        {!isFinished ? (
          <>
            <StatusBar>
              <div className="count">
                {count}/{quizdata.length}
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
                  {q.answers.map((answer, idx) => {
                    return (
                      <Answer
                        key={idx}
                        count={count}
                        setCount={setCount}
                        answer={answer}
                        score={q.score}
                        totalScore={totalScore}
                        setScore={setScore}
                        setIsFinished={setIsFinished}
                      ></Answer>
                    );
                  })}
                </AnswerList>
              </div>
            </QuizBody>
          </>
        ) : (
          <Result
            totalScore={totalScore}
            setIsFinished={setIsFinished}
            setCount={setCount}
            setScore={setScore}
            setQuiz={setQuiz}
          ></Result>
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
  setIsFinished,
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
          setIsFinished(true);
        }
      }}
    >
      {text}
    </AnswerBtn>
  );
}

const ResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 600px; */
  align-items: center;
`;

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
    /* margin-bottom: 20px; */
    line-height: 30px;
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

function Result({ totalScore, setIsFinished, setCount, setScore, setQuiz }) {
  const [commentOn, setCommentOn] = useState(false);
  const resultData = [
    {
      id: "1",
      imgsrc: "result1.jpg",
      text: "삐빅! 당신은 술알못입니다.\n더 공부하시구 도전하세요! 😝",
    },
    {
      id: "3",
      imgsrc: "result3.gif",
      text: "삐빅! 당신은 술잘알입니다!\n주변에 마음껏 자랑해주세요 😎",
    },
  ];

  let result;

  if (totalScore < 50) {
    result = resultData[0];
  } else if (totalScore >= 50) {
    result = resultData[1];
  }

  let text= result.text;

  const shuffleArray = array => {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  return (
    <ResultWrap>
      <ResultBox>
        <h2 className="score-text">Score</h2>
        <div className="score">{totalScore}</div>
        <img className="result-img" src={result.imgsrc} alt="no images" />
        <div className="result-text">{text.split('\n').map((line) => {
    return <div>{line}</div>
  })}</div>
      </ResultBox>
      <ButtonDiv>
        <button
          className="btn"
          selected=""
          onClick={() => /*(document.location.href = "/quiz")*/ {
            setIsFinished(false);
            setCount(0);
            setScore(0);
            setQuiz(shuffleArray(quizdata));
          }}
        >
          다시 도전하기
        </button>
        {/* <button className="btn" selected="">
          칵테일 추천받기
        </button> */}
        <button
          onClick={() => {
            setCommentOn(!commentOn);
          }}
          className="btn"
          selected=""
        >
          코멘트 남기기
        </button>
      </ButtonDiv>
      <KakaoLink>
        <p>카카오톡으로 공유하기</p>
        <KakaoShareButton
          title="나의 술알못 테스트 결과는?"
          desc={result.text}
          imgurl="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1aa7d3e6-f7d3-41a7-b228-85427d9ad3f3%2FUntitled.png?table=block&id=1bd379e5-5411-4c91-81bc-8f9c6d2a8828&spaceId=14cff50a-9d15-48cd-a262-2724a8ab38ba&width=3060&userId=505f5c27-9d71-4cf4-8174-1ef8968c448d&cache=v2"
          content="칵테일 퀴즈"
          contentUrl="quiz"
        ></KakaoShareButton>
      </KakaoLink>
      {commentOn ? <Comments page="quiz" /> : ""}
    </ResultWrap>
  );
}

export default quiz;
