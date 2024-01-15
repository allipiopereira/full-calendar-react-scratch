import { Calendar } from "./components/Calendar";

function App() {
  return (
    <>
      <div className="px-64 py-8">
        <Calendar.Root
          events={[
            {
              title: "Reunião com João",
              date: "2024-01-08",
            },
            {
              title: "Reunião com Gabriel",
              date: "2024-01-10",
            },
            {
              title: "Reunião com Maria",
              date: "2024-01-10",
            },
          ]}
        >
          <Calendar.Toolbar>
            <Calendar.ToggleNavigation />
          </Calendar.Toolbar>
        </Calendar.Root>
      </div>
    </>
  );
}

export default App;
