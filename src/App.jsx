import { Route, Routes } from "react-router-dom";
import { CustomerTable } from './components/Table/Table';
import { CustomerForm } from "./components/Form/FormRefactor";
function App() {

  return (
    <>
       <div style={{ padding: 24 }}>
      
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
