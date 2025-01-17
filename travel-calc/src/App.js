import logo from './logo.svg';
import './App.css';
import Header from './Homepage/Header';
import Main from './Homepage/Main';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Main/>
      </main>
    </div>
  ); 
}

export default App;
