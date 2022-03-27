const convertTextToHtml = (text) => {
  const html = text.replace(/\n/g, "<br />");
  return html;
};

export default convertTextToHtml;
