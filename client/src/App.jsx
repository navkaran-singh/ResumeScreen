import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Docs from "./pages/Docs";
import Cover from "./pages/Cover";
import Compare from "./pages/Compare";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/upload" element={<Upload />}></Route>
      <Route path="/results" element={<Results />}></Route>
      <Route path="/docs" element={<Docs />}></Route>
      <Route path="/cover" element={<Cover />}></Route>
      <Route path="/compare" element={<Compare />}></Route>
    </Routes>
  );
};

export default App;
