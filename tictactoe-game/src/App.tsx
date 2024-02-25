import "./App.css";
import GamePage from "./components/GamePage";
import Home from "./components/Home";

function App() {
  return (
    <div className="px-[6vw] py-10 flex items-center justify-center bg-dark-navy min-h-screen min-w-screen">
      <GamePage />
    </div>
  );
}

export default App;
