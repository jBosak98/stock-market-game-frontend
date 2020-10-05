const mapData = ([key, value]: any[]): string[][] => {
  switch (key) {
    case "bookValuePerShareAnnual":
      return [["BV/S annual", value]];
    case "bookValuePerShareQuarterly":
      return [["BV/S quarterly", value]];
    case "bookValueShareGrowth5Y":
      return [["BV/S growth 5 year", value]];
    case "totalDebtOverTotalEquityQuarterly":
      return [["total debt over total equity quarterly", value]];
    case "country":
      return [["Country", value]];
    case "exchange":
      return [["Exchange", value]];
    case "currency":
      return [["Currency", value]];
    case "finnhubIndustry":
      return [["Industry", value]];
    case "ipo":
      return [["IPO", value]];
    case "phone":
      return [["Phone", value]];
    case "ticker":
      return [["Ticker", value]];
    case "name":
      return [["Name", value]];
    case "shareOutstanding":
      return [["Share outstanding", value]];
    case "fiftyTwoWeekLow":
      return [["1 Year Low", value]];
    case "fiftyTwoWeekHigh":
      return [["1 Year High", value]];
    case "marketCapitalization":
      return [["Market Cap", value]];
    case "peNormalizedAnnual":
      return [["P/E Annual", value]];
    case "epsGrowth3Y":
      return [["E/P growth 3Y", value]];
    case "dividendPerShareAnnual":
      return [["Dividend per share Annual", value]];
    case "beta":
      return [["Beta", value]];
    case "sharePrice":
      return [["price per share", `${value}$`]];
    case "availableToInvest":
      return [["Available to invest", `${value}$`]];
    case "totalCost":
      return [["Total cost", `${value.toFixed(2)}$`]];
    default:
      return [];
  }
};

export default mapData;
