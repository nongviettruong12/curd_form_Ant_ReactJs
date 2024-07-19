import { Route, Routes } from "react-router-dom";
import { CustomerFormAdd } from "./components/Form/FormAdd";
import { CustomerTable } from './components/Table/Table';
import FormLayoutUpdate from "./components/Form/FormUpdate";
function App() {

  return (
    <>
       <div style={{ padding: 24 }}>
      {/* <h1>ProTable</h1> */}
      
    </div>
    <Routes>
      <Route path="/" element={<CustomerTable />}/>
      <Route path="/add" element={<CustomerFormAdd/>}/>
      <Route path="/update/:id" element={<FormLayoutUpdate/>}/>
    </Routes>
    
    </>
  )
}

export default App
