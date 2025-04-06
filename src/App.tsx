import React from "react";
import Table from "./components/Table";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App: React.FC = () => {
  return (
    <div>
      <Table />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
