import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
//import NotFound from "./pages/NotFound";

const NotFound = React.lazy(() => import("./pages/NotFound")); // import se radi tek kad se zaista koristi ova komponenta, sluzi za code splitting,
//da se ceo kod ne skida  od jednom

function App() {
  return (
    <Layout>
      <Suspense fallback={<p>Loading....</p>}>  {/* ako hocemo da prikazemo sadrzaj koji se lazy load-uje, on se mozda ne skine od jednom i ne moze da se prikaze, pa suspense sluzi da prikaze nesto drugo */}
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            {" "}
            {/* zvezda match-uje svaki url, koristi se ako se ne prepozna ni jedan url da vratimo not found page */}
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
