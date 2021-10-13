import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Heading1 = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.xxl};
  letter-spacing: -0.04em;
  color: ${(props) => props.theme.colors.bistre};
`;

export const Heading2 = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.xl};
  letter-spacing: -0.03em;
  color: ${(props) => props.theme.colors.bistre};
`;

export const Heading3 = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${(props) => props.theme.colors.bistre};
`;

export const Subheading = styled.h4`
  margin: 0;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.theme.colors.bistre};
`;

export const Body1 = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.theme.colors.bistre};
`;

export const Body2 = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.bistre};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.grey300};
  margin: 0;
`;

const LinkStyles = css`
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
`;

export const Button = styled.button<{ $color?: string; $focusColor?: string }>`
  padding: 0 15px;
  border: 1px solid ${(props) => props.$color ?? props.theme.colors.blueCrayola};
  border-radius: 35px;
  background: none;
  line-height: 35px;
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.$color ?? props.theme.colors.blueCrayola};
  text-align: center;
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
