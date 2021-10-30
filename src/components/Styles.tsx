import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

interface TextProps {
  $color?: string;
  $weight?: string;
}

export const Heading1 = styled.h1<TextProps>`
  margin: 0;
  font-weight: ${(props) => props.$weight ?? "700"};
  font-size: ${(props) => props.theme.fontSizes.xxl};
  letter-spacing: -0.04em;
  color: ${(props) => props.$color ?? props.theme.colors.bistre};
  line-height: 1.1;
`;

export const Heading2 = styled.h2<TextProps>`
  margin: 0;
  font-weight: ${(props) => props.$weight ?? "700"};
  font-size: ${(props) => props.theme.fontSizes.xl};
  letter-spacing: -0.03em;
  color: ${(props) => props.$color ?? props.theme.colors.bistre};
`;

export const Heading3 = styled.h3<TextProps>`
  margin: 0;
  font-weight: ${(props) => props.$weight ?? "700"};
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${(props) => props.$color ?? props.theme.colors.bistre};
`;

export const Subheading = styled.h4<TextProps>`
  margin: 0;
  font-weight: ${(props) => props.$weight ?? "600"};
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.$color ?? props.theme.colors.bistre};
`;

export const Body1 = styled.p<TextProps>`
  margin: 0;
  font-weight: ${(props) => props.$weight ?? "400"};
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.$color ?? props.theme.colors.bistre};
`;

export const Body2 = styled.p<TextProps>`
  margin: 0;
  font-weight: ${(props) => props.$weight ?? "400"};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.$color ?? props.theme.colors.bistre};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.grey200};
  margin: 0;
`;

export const LinkStyles = css`
  color: ${(props) => props.theme.colors.blueCrayola};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLink = styled(Link)`
  ${LinkStyles}
`;

export const StyledNavLink = styled(NavLink)`
  ${LinkStyles}
  color: ${(props) => props.theme.colors.grey500};

  &:hover {
    color: ${(props) => props.theme.colors.blueCrayola};
  }
`;

export const Button = styled.button<{ $color?: string; $focusColor?: string }>`
  margin: 0;
  padding: 0 15px;
  border: 1px solid ${(props) => props.$color ?? props.theme.colors.blueCrayola};
  border-radius: 35px;
  background: none;
  line-height: 2rem;
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.$color ?? props.theme.colors.blueCrayola};
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.$color ?? props.theme.colors.blueCrayola};
    color: ${(props) => props.theme.colors.floralWhite};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem
      ${(props) => props.$focusColor ?? props.theme.colors.blueCrayola50};
  }
`;

export const Pill = styled.div`
  padding: 5px 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.colors.bistre};
`;
