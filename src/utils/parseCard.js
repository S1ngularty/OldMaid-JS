function parseCardIcon(cardSuit) {
  let result;
  switch (cardSuit) {
    case "diamond":
      return (result = "\u2666");
      break;
    case "spade":
      return (result = "\u2660");
      break;
    case "club":
      return (result = "\u2663");
      break;
    case "heart":
      return (result = "\u2665");
      break;
  }
  return result;
}

export { parseCardIcon };
