import htmlParse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify"; // canvas and js-dom packages are required dependencies for server use

/**
 * Sanitize html string and convert to JSX
 * @param {string} htmlString
 * @returns JSX.Element | [] | string
 */
export const htmlSanitizeParse = (htmlString) => {
  if (!htmlString) return "";

  return htmlParse(DOMPurify.sanitize(htmlString));
};
