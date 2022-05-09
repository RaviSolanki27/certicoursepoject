import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import 'react-toastify/dist/ReactToastify.css';
import Router from "./routes/Router";

function App() {
  return (
    <div className="App" style={{height:'100vh'}}>
      <Router />
    </div>
  );
}

export default App;
