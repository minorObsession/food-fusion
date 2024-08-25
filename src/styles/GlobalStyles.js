import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  /* Indigo */
  --color-brand-50: #fff9db;
  --color-brand-100: #fff3bf;
  --color-brand-200: #ffec99;
  --color-brand-300: #ffe066;
  --color-brand-500: #fcc419;
  --color-brand-600: #fab005;
  --color-brand-700: #f59f00;
  --color-brand-800: #f08c00;
  --color-brand-900: #e67700;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f1f3f5;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #ced4da;
  --color-grey-500: #adb5bd;
  --color-grey-600: #4b5563;
  --color-grey-700: #495057;
  --color-grey-800: #343a40;
  --color-grey-900: #212529;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-grey-200);


  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  
  letter-spacing: 1.1px;
  border-radius: 20px;
  /* border: solid 2px var(--color-grey-600); */
  height: 3rem;
  background-color: var(--color-brand-200);
    font-weight: 700;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;


  &:hover,
  &:visited {
    font-weight: 900;
    letter-spacing: 1.2px;

    box-shadow: 0 0 10px var(--color-grey-500); 
    outline: 2px solid var(--color-brand-500);

    background-color: var(--color-brand-300);
    color: var(--color-grey-800);
  }


}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-500);
  color: var(--color-grey-100);  
}

input:focus,
button:focus,
select:focus {
  outline: 2px solid var(--color-brand-300);
  outline-offset: 1px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

}

/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 15px; /* Width of the vertical scrollbar */
  height: 12px; /* Height of the horizontal scrollbar */
}

::-webkit-scrollbar-track {
  background: var(--color-grey-200); /* Background of the scrollbar track */
  border-radius: 10px; /* Rounded corners for the scrollbar track */
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-brand-500); /* Scrollbar thumb color */
  border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  border: 3px solid var(--color-grey-200); /* Padding around the thumb to create some spacing */
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-brand-700); /* Scrollbar thumb color on hover */
  border: 3px solid var(--color-grey-300); /* Border color on hover */
}

::-webkit-scrollbar-corner {
  background: var(--color-grey-100); /* Color of the corner where horizontal and vertical scrollbars meet */
}

`;

export default GlobalStyles;
