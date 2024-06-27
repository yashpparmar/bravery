import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Loading from "./components/Loading/Loading";
import "./styles/main.scss";

const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
