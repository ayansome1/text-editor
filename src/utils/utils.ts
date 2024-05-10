export const markdownToLinkConverter = (htmlContent: string) => {
  let text = htmlContent;
  const elements = text.match(/\[.*?\)/g);
  if (elements !== null && elements.length > 0) {
    for (const el of elements) {
      const txt = el.match(/\[(.*?)\]/)?.[1]; //get only the txt
      const url = el.match(/\((.*?)\)/)?.[1]; //get only the link
      text = text.replace(
        el,
        '<a href="' + url + '" target="_blank">' + txt + '</a>'
      );
    }
  }

  const allLinkElements = text.match(/<a[^>]*>([^<]+)<\/a>/g);
  return { text, allLinkElements: allLinkElements || [] };
};
