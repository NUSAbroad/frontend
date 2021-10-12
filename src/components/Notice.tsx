import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: ${(props) => props.theme.colors.saffron10};
  border: 1px solid ${(props) => props.theme.colors.saffron};
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const StyledEmoji = styled.span`
  margin-right: 20px;
  line-height: 1.3;
`;

interface Props {
  emoji?: string;
}

const Notice: React.FC<Props> = function (props) {
  const { children, emoji } = props;

  return (
    <Container>
      <StyledEmoji>{emoji ?? "👉"}</StyledEmoji>
      {children}
    </Container>
  );
};

export default Notice;
