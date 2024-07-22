import { Route, Routes } from "react-router-dom";
// import { CustomerFormAdd } from "./components/Form/FormAdd";
import { CustomerTable } from './components/Table/Table';
// import FormLayoutUpdate from "./components/Form/FormUpdate";
import { CustomerForm } from "./components/Form/FormRefactor";
function App() {

  return (
    <>
       <div style={{ padding: 24 }}>
      {/* <h1>ProTable</h1> */}
      
    </div>
    <Routes>
      <Route path="/" element={<CustomerTable />}/>
      <Route path="/add" element={<CustomerForm/>}/>
      <Route path="/update/:id" element={<CustomerForm/>}/>
    </Routes>
    
    </>
  )
}

export default App
