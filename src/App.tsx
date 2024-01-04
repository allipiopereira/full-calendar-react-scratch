import { Calendar } from "./components/Calendar";

function App() {
  return (
    <>
      <div className="px-8 py-8">
        <Calendar.Root>
          <Calendar.Toolbar>
            <div>Toolbar</div>
          </Calendar.Toolbar>
        </Calendar.Root>
      </div>
    </>
  );
}

export default App;
