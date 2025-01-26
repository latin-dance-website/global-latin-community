import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 100;
        src: url('/assets/fonts/montserrat/montserrat-latin-100-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 100;
        src: url('/assets/fonts/montserrat/montserrat-latin-100-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 200;
        src: url('/assets/fonts/montserrat/montserrat-latin-200-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 200;
        src: url('/assets/fonts/montserrat/montserrat-latin-200-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 300;
        src: url('/assets/fonts/montserrat/montserrat-latin-300-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 300;
        src: url('/assets/fonts/montserrat/montserrat-latin-300-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400;
        src: url('/assets/fonts/montserrat/montserrat-latin-400-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 400;
        src: url('/assets/fonts/montserrat/montserrat-latin-400-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        src: url('/assets/fonts/montserrat/montserrat-latin-500-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 500;
        src: url('/assets/fonts/montserrat/montserrat-latin-500-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        src: url('/assets/fonts/montserrat/montserrat-latin-600-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 600;
        src: url('/assets/fonts/montserrat/montserrat-latin-600-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        src: url('/assets/fonts/montserrat/montserrat-latin-700-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 700;
        src: url('/assets/fonts/montserrat/montserrat-latin-700-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 800;
        src: url('/assets/fonts/montserrat/montserrat-latin-800-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 800;
        src: url('/assets/fonts/montserrat/montserrat-latin-800-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 900;
        src: url('/assets/fonts/montserrat/montserrat-latin-900-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'Montserrat';
        font-style: italic;
        font-weight: 900;
        src: url('/assets/fonts/montserrat/montserrat-latin-900-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 100;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-100-italic.ttf') format('truetype');
        // font-display: swap;

    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 100;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-100-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 200;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-200-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 200;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-200-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 300;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-300-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 300;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-300-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 400;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-400-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 400;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-400-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 500;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-500-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 500;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-500-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 600;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-600-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 600;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-600-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 700;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-700-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 700;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-700-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 800;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-800-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 800;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-800-normal.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: italic;
        font-weight: 900;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-900-italic.ttf') format('truetype');
        font-display: swap;
    }
    @font-face {
        font-family: 'montserratAlt';
        font-style: normal;
        font-weight: 900;
        src: url('/assets/fonts/montserrat-alternates/montserrat-alternates-latin-900-normal.ttf') format('truetype');
        font-display: swap;
    }
      `}
  />
);

export default Fonts;
