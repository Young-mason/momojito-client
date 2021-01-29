import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";
import Logout from "./Logout";
import Modal from "react-modal";
const Container = styled.div`
  flex: none;
  border-bottom: 1px solid rgba(219, 219, 219);
  padding: 0.5rem;
  @media (min-width: 1024px) {
    padding: 1.5rem;
    box-sizing: border-box;
    height: 75px;
  }
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: baseline;
  justify-content: center;
  h1 {
    margin: 0;
    margin-left: 0.25rem;
    color: ${(props) => props.theme.main};
    font-size: 1.5rem;
  }
`;

const ButtonPart = styled.div`
  display: flex;
  visibility: ${(props) => (props.isLogin ? "hidden" : "visible")};
`;

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
    background-color: rgba(255, 255, 255, 0.75);
    position: fixed;
    z-index: 10;
    inset: 0;
  }

  &__content {
    overflow: auto;
    background-color: white;
    position: absolute;
    inset: 40%;
  }
`;

export default function Header() {
  const { user, setUser } = useContext(ThemeContext).userContext;
  const router = useRouter();

  return (
    <Container>
      <StyledModal isOpen={!!router.query.logout}>
        <Logout></Logout>
      </StyledModal>
      <>
        <LogoPart></LogoPart>
        <ButtonPart isLogin={user.isLogin}>
          <Button onClick={(e) => router.push("/signin")} selected>
            Log in
          </Button>
        </ButtonPart>
      </>
    </Container>
  );
}

function LogoPart() {
  const router = useRouter();
  return (
    <Logo
      onClick={(e) => {
        router.push("/");
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.797 3.43941C22.0223 3.22207 22.0632 2.9326 21.9039 2.68399C21.7445 2.43539 21.419 2.28091 21.0543 2.28091H17.5306C17.5391 1.78417 17.2171 1.30786 16.6745 1.02385L16.9528 0.486773C17.0477 0.303596 16.9288 0.0967561 16.6871 0.0247683C16.4456 -0.047172 16.1727 0.0429197 16.0778 0.226144L15.7953 0.771256C14.9239 0.691333 14.0554 1.06253 13.7196 1.71009L13.4254 2.28086H0.945686C0.58105 2.28086 0.255522 2.43534 0.0961426 2.68395C-0.0632369 2.93255 -0.0223107 3.22202 0.202939 3.43937L10.5299 13.4042V18.9829C10.5299 20.2537 9.16636 21.2875 7.49027 21.2875H5.9861C5.72651 21.2875 5.51605 21.447 5.51605 21.6439C5.51605 21.8407 5.72651 22.0002 5.9861 22.0002H16.0139C16.2735 22.0002 16.484 21.8407 16.484 21.6439C16.484 21.447 16.2735 21.2875 16.0139 21.2875H14.5097C12.8336 21.2875 11.4701 20.2537 11.4701 18.9829V13.4043L21.797 3.43941ZM13.3357 6.795C13.8247 6.795 14.044 6.86618 14.3216 6.95631C14.6376 7.0589 14.9957 7.17513 15.6776 7.17513C16.2784 7.17513 16.6278 7.08489 16.9185 6.99324L11 12.7042L5.08109 6.99366C5.37121 7.08518 5.72005 7.17513 6.31921 7.17513C7.00022 7.17513 7.3579 7.05886 7.67347 6.95622C7.95042 6.86613 8.16922 6.795 8.65713 6.795C9.14517 6.795 9.36397 6.86613 9.64098 6.95622C9.95661 7.05886 10.3143 7.17513 10.9954 7.17513C11.6769 7.17513 12.0348 7.05886 12.3507 6.95627C12.628 6.86618 12.8471 6.795 13.3357 6.795ZM14.5949 1.97024C14.8034 1.56806 15.405 1.36963 15.9358 1.52748C16.348 1.65031 16.602 1.95856 16.5902 2.28086H14.4348L14.5949 1.97024ZM0.945686 2.99366L21.0559 2.99276C21.0575 2.99385 21.0596 2.99708 21.0578 2.99908L17.86 6.08472C17.2803 6.1013 16.9538 6.20683 16.6635 6.30106C16.3859 6.39115 16.1666 6.46238 15.6775 6.46238C15.1884 6.46238 14.9692 6.3912 14.6916 6.30106C14.5047 6.24038 14.3024 6.17509 14.0277 6.13171L14.983 4.28806C15.078 4.10488 14.959 3.89804 14.7174 3.82606C14.4758 3.75416 14.2029 3.84426 14.1081 4.02743L13.039 6.09051C12.5438 6.11855 12.2467 6.21453 11.9803 6.30106C11.703 6.39115 11.484 6.46233 10.9954 6.46233C10.5073 6.46233 10.2885 6.3912 10.0115 6.30111C9.69589 6.19847 9.33821 6.0822 8.65713 6.0822C7.97606 6.0822 7.61844 6.19847 7.30288 6.30111C7.02592 6.3912 6.80713 6.46233 6.31921 6.46233C5.83104 6.46233 5.61225 6.3912 5.33511 6.30106C5.04499 6.20679 4.71865 6.10116 4.13898 6.08467L0.940358 2.9987C0.940484 2.99708 0.94249 2.99385 0.945686 2.99366ZM11.9449 21.2876H10.0552C10.4389 21.0417 10.7608 20.7421 11.0001 20.4038C11.2392 20.7421 11.5611 21.0417 11.9449 21.2876Z"
          fill="#31C460"
        />
        <path
          d="M12.1383 7.82881L10.5625 10.8699C10.4675 11.0531 10.5865 11.2599 10.8281 11.3319C10.8845 11.3487 10.9427 11.3566 10.9998 11.3566C11.1875 11.3566 11.3647 11.2709 11.4374 11.1305L13.0132 8.08939C13.1082 7.90621 12.9892 7.69937 12.7476 7.62738C12.506 7.55554 12.2332 7.64558 12.1383 7.82881Z"
          fill="#31C460"
        />
      </svg>
      <h1>Momojito</h1>
    </Logo>
  );
}
