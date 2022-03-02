import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/pages/homepage";
import Showpage from "./components/pages/showpage";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/people/:personId" element={<Showpage />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
