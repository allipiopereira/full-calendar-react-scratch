import { Calendar } from "./components/Calendar";

function App() {
  return (
    <>
      <div className="px-8 py-8">
        <Calendar.Root>
          <Calendar.Toolbar>
            <Calendar.ToggleNavigation />
          </Calendar.Toolbar>
        </Calendar.Root>
      </div>
    </>
  );
}

export default App;
