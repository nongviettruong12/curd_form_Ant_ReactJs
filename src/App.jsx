import { Route, Routes } from "react-router-dom";
import { CustomerTable } from './components/Table/Table';
import { CustomerForm } from "./components/Form/FormRefactor";
import TestModal from "./components/Form/testModal";
function App() {

  return (
    <>
       <div style={{ padding: 24 }}>
      
    </div>
    <Routes>
      <Route path="/" element={<CustomerTable />}/>
      <Route path="/add" element={<CustomerForm/>}/>
      <Route path="/update/:id" element={<TestModal/>}/>
      <Route path="/testing" element={<TestModal/>}/>
    </Routes>
    
    </>
  )
}

export default App
