import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes"); // push dozvoljava korisniku da se vrati na prethodu stranicu(ovu stranicu), replace ne
    }
  }, [status,history]);

  function addQuoteHandler(quoteData) {
    sendRequest(quoteData);
  }

  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
}

export default NewQuote;
