export const markdownToLinkConverter = (htmlContent) => {
  let derText = htmlContent;
  //check for links [text](url)
  const elements = derText.match(/\[.*?\)/g);
  if (elements != null && elements.length > 0) {
    for (const el of elements) {
      const txt = el.match(/\[(.*?)\]/)[1]; //get only the txt
      const url = el.match(/\((.*?)\)/)[1]; //get only the link
      derText = derText.replace(
        el,
        '<a href="' + url + '" target="_blank">' + txt + '</a>'
      );
    }
  }
  console.log(derText);
  return derText;
};
