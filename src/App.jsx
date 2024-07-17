import { Route, Routes } from "react-router-dom";
import FormLayout from "./components/Form/FormAdd";
import { CustomerTable } from './components/Table/Table';
import FormLayoutUpdate from "./components/Form/FormUpdate";
import Hello from "./components/Table/tableTest";
function App() {

  return (
    <>
       <div style={{ padding: 24 }}>
      {/* <h1>ProTable</h1> */}
      
    </div>
    <Routes>
      <Route path="/" element={<CustomerTable />}/>
      <Route path="/add" element={<FormLayout/>}/>
      <Route path="/update/:id" element={<FormLayoutUpdate/>}/>
      <Route path="/test" element={<Hello/>}/>
    </Routes>
    
    </>
  )
}

export default App
