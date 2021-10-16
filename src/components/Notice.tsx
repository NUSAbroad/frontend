import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: ${(props) => props.theme.colors.saffron10};
  border: 1px solid ${(props) => props.theme.colors.saffron};
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const StyledEmoji = styled.span`
  margin-right: 20px;
  font-size: ${(props) => props.theme.fontSizes.md};
  line-height: 1.3;
`;

interface Props {
  className?: string;
  emoji?: string;
}

const Notice: React.FC<Props> = function (props) {
  const { className, children, emoji } = props;

  return (
    <Container className={className}>
      <StyledEmoji>{emoji ?? "👉"}</StyledEmoji>
      <div>{children}</div>
    </Container>
  );
};

export default Notice;
