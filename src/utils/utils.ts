export const markdownToLinkConverter = (htmlContent) => {
  let text = htmlContent;
  const links = [];
  //check for links [text](url)
  const elements = text.match(/\[.*?\)/g);
  if (elements != null && elements.length > 0) {
    for (const el of elements) {
      const txt = el.match(/\[(.*?)\]/)[1]; //get only the txt
      const url = el.match(/\((.*?)\)/)[1]; //get only the link
      links.push({
        url,
        txt,
      });
      text = text.replace(
        el,
        '<a href="' + url + '" target="_blank">' + txt + '</a>'
      );
    }
  }
  console.log(text);
  return { text, links };
};
