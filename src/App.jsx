import { Route, Routes } from "react-router-dom";
import FormLayout from "./components/Form/FormAdd";
import { CustomerTable } from './components/Table/Table';
import FormLayoutUpdate from "./components/Form/FormUpdate";
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<CustomerTable />}/>
      <Route path="/add" element={<FormLayout/>}/>
      <Route path="/update/:id" element={<FormLayoutUpdate/>}/>
    </Routes>
    
    </>
  )
}

export default App
