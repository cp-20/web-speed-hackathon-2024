import type { ComponentProps, FC } from 'react';
import styled from 'styled-components';

const IconBase = styled.svg`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentColor;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.5rem;
`;

export const ArrowBack: FC<ComponentProps<'svg'>> = (props) => (
  <IconBase aria-hidden="true" data-testid="ArrowBackIcon" focusable="false" viewBox="0 0 24 24" {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
  </IconBase>
);

export const Close: FC<ComponentProps<'svg'>> = (props) => (
  <IconBase aria-hidden="true" data-testid="CoseIcon" focusable="false" viewBox="0 0 24 24" {...props}>
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </IconBase>
);

export const Favorite: FC<ComponentProps<'svg'>> = (props) => (
  <IconBase aria-hidden="true" data-testid="FavoriteIcon" focusable="false" viewBox="0 0 24 24" {...props}>
    <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path>
  </IconBase>
);

export const FavoriteBorder: FC<ComponentProps<'svg'>> = (props) => (
  <IconBase aria-hidden="true" data-testid="FavoriteBorderIcon" focusable="false" viewBox="0 0 24 24" {...props}>
    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"></path>
  </IconBase>
);

export const NavigateNext: FC<ComponentProps<'svg'>> = (props) => (
  <IconBase aria-hidden="true" data-testid="NavigateNextIcon" focusable="false" viewBox="0 0 24 24" {...props}>
    <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
  </IconBase>
);

export const Search: FC<ComponentProps<'svg'>> = (props) => (
  <IconBase aria-hidden="true" data-testid="SearchIcon" focusable="false" viewBox="0 0 24 24" {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
  </IconBase>
);
