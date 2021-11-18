import { useQuery } from "urql";
import { Quote } from "../lib/types";

const companyQuery = `
query getCompanies($ticker: String!) {
  getCompany(ticker:$ticker){
    id
    country
    name
    ticker
    currency
    exchange
    ipo
    phone
    shareOutstanding
    finnhubIndustry
    weburl
    logo
    businessSummary
    financials {
      bookValuePerShareAnnual
      bookValuePerShareQuarterly
      bookValueShareGrowth5Y
      totalDebtOverTotalEquityQuarterly
      fiftyTwoWeekLow
      marketCapitalization
      peNormalizedAnnual
      epsGrowth3Y
      dividendPerShareAnnual
      beta
    }
    quote {
      companyId
      openDayPrice
      highDayPrice
      lowDayPrice
      currentPrice
      previousClosePrice
      dailyChange
    }
  }
}
`;
type GetCompany = {
  id: number;
  country: string;
  name: string;
  ticker: string;
  currency: string;
  exchange: string;
  ipo: string;
  phone: string;
  shareOutstanding: number;
  finnhubIndustry: string;
  financials: Financials;
  quote: Quote;
  weburl: string;
  logo: string;
  businessSummary: string;
}
type CompanyResult = {
  getCompany?: GetCompany;
};

type Financials = {
  bookValuePerShareAnnual: number;
  bookValuePerShareQuarterly: number;
  bookValueShareGrowth5Y: number;
  totalDebtOverTotalEquityQuarterly: number;
};

const useCompany = (ticker: string | null) => {
  const [result] = useQuery<CompanyResult>({
    query: companyQuery,
    variables: { ticker },
    pause: !ticker,
  });
  const { data, error, fetching } = result;
  return { data, error, fetching };
};

export default useCompany;
