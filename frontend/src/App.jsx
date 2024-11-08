import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NotesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div id="app">
      <NotesProvider>
        <NotesPage />
        <ToastContainer />
      </NotesProvider>
    </div>
  );
};

export default App;
