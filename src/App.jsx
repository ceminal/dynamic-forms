import FormFields from "./components/FormFields";
import "./App.css";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <h1 className="text-2xl mb-6 text-center text-white">Dynamic Forms</h1>
      <div className="flex justify-center items-center">
        <FormFields />
      </div>
    </Fragment>
  );
}

export default App;
