import styled from "styled-components";

const Spinner = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  margin: 60px auto;
  border-radius: 50%;
  border-top: 0.4rem solid ${(props) => props.theme.colors.blueCrayola10};
  border-right: 0.4rem solid ${(props) => props.theme.colors.blueCrayola10};
  border-bottom: 0.4rem solid ${(props) => props.theme.colors.blueCrayola10};
  border-left: 0.4rem solid ${(props) => props.theme.colors.blueCrayola};
  transform: translateZ(0);
  animation: spin 1.1s infinite linear;

  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
