import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  justify-content: ${(props) => (props.all ? "flex-start" : "center")};
`;

export default function ButtonList({
  buttonList,
  buttonSelected,
  setButtonSelected,
  all,
}) {
  return (
    <Container all={all}>
      {buttonList.map((v, i) => (
        <Button
          m={all ? "0.2rem 0.25rem" : "0 0.5rem"}
          key={v}
          selected={all ? true : i === buttonSelected}
          onClick={(e) => {
            setButtonSelected(i);
          }}
        >
          {v}
        </Button>
      ))}
    </Container>
  );
}
