import './App.css';
import Header from './Homepage/Header';
import Main from './Homepage/Main';
import TravelCatalog from './components/TravelCatalog';
import Form from './components/Form';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ExpenseTracker from './Homepage/ExpenseTracker';


function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/plan-trip" element={<TravelCatalog />} />
        <Route path="/signin" element={<Form />} />
        <Route path="/contact" element={<Main  />} />
        <Route path="/expenses" element={<ExpenseTracker  />} />
      </Routes>
     </div>
     </Router>
  ); 
}

export default App;
