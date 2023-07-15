import BackgroundAnimation from "./components/BackgroundAnimation";
import EntryPage from "./components/pages/EntryPage";
import UrlListPage from "./components/pages/UrlListPage";

function App() {
  return (
    <div>
      <div className="container">
        <div className="card">
          <EntryPage />
          <UrlListPage />
        </div>
      </div>
      <BackgroundAnimation />
    </div>
  );
}

export default App;
