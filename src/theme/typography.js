import styled from "styled-components/native";

export const Text = styled.Text`
  ${(props) => defaultTextStyles(props.theme)}
  ${(props) => variants[props.variant](props.theme)}
`;

const defaultTextStyles = (theme) => ` 
  font-family: ${theme.fonts.body}; 
  font-weight: ${theme.fontWeights.regular}; 
  color: ${theme.colors.primary}; 
  flex-wrap: wrap; 
  margin-top: ${theme.space[0]}; 
  margin-bottom: ${theme.space[0]}; 
`;

const body = (theme) => ` 
    font-size: ${theme.fontSizes.body}; 
`;

const hint = (theme) => ` 
    font-size: ${theme.fontSizes.body}; 
`;

const error = (theme) => ` 
    color: ${theme.colors.error}; 
`;

const caption = (theme) => ` 
    font-size: ${theme.fontSizes.caption}; 
    font-weight: ${theme.fontWeights.bold}; 
`;

const label = (theme) => ` 
    font-family: ${theme.fonts.heading}; 
    font-size: ${theme.fontSizes.body}; 
    font-weight: ${theme.fontWeights.medium}; 
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

Text.defaultProps = {
  variant: "body",
};
