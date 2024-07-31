import { Route, Routes } from "react-router-dom";
import { CustomerTable } from "./components/Table/Table";
import TestModal from "./components/Form/testModal";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomerTable />} />
        <Route path="/add" element={<TestModal />} />
        <Route path="/update/:id" element={<TestModal />} />
      </Routes>
    </>
  );
}

export default App;
