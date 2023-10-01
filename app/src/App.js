import Singup from "./components/Singup"
import Login from "./components/Login"
import Todo from "./components/Todo";
import {Routes, Route} from "react-router-dom"



const App = () => {
  return ( 
    <div>
      <Routes>
        <Route path="/"  element={<Singup />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/todo"  element={<Todo />} />
     </Routes>
      
    </div>
   );
}
 
export default App;