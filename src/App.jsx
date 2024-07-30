import { Route, Routes } from "react-router-dom";
import { CustomerTable } from './components/Table/Table';
// import { CustomerForm } from "./components/Form/FormRefactor";
import TestModal from "./components/Form/testModal";
// import DemoTable from "./components/Form/abcd";
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<CustomerTable />}/>
      <Route path="/add" element={<TestModal/>}/>
      <Route path="/update/:id" element={<TestModal/>}/>
      {/* <Route path="/testing" element={<CustomerForm/>}/>
      <Route path="/testLoading" element={<CustomerForm/>}/> */}
    </Routes>
    
    </>
  )
}

export default App
