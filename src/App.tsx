import NotificationProvider from "@/context/NotificationContext";
import PatientList from "@/components/patients/PatientList";

function App() {
  return (
    <NotificationProvider>
      <PatientList />
    </NotificationProvider>
  );
}

export default App;