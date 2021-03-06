import { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -5px;
`;

const HoverContainer = styled(Container)`
  svg {
    cursor: pointer;
  }
`;

export default function StarList({ rating }) {
  const theme = useContext(ThemeContext);
  const colors = Array.from({ length: 5 }, (v, i) =>
    i < rating ? theme.main : theme.grey
  );
  return (
    <Container>
      {colors.map((v, i) => (
        <svg
          key={i}
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
            fill="#36CC3C"
          />
          <path
            d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
            fill={v}
          />
        </svg>
      ))}
    </Container>
  );
}

export function HoverStarList({ setStarSelected }) {
  const theme = useContext(ThemeContext);
  const [hoverState, setHoverState] = useState(-1);
  const handleMouseOver = (i) => {
    setHoverState(i);
  };
  return (
    <HoverContainer onClick={(e) => setStarSelected(hoverState)}>
      {[0, 1, 2, 3, 4].map((v, i) => (
        <svg
          key={i}
          onMouseOver={(e) => handleMouseOver(i + 1)}
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
            fill="#36CC3C"
          />
          <path
            d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
            fill={i < hoverState ? theme.main : theme.grey}
          />
        </svg>
      ))}
    </HoverContainer>
  );
}
