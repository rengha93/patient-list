import "./styles.css";
import PatientList from "./components/patientlist/patientlist";
import Leftnav from './components/leftnav/Leftnav';

export default function App() {
  return (
    <div className="App">
      <div style={{margin: '32px', borderRadius: '10px', border: `1px solid #ccc`, height: '100%', display: 'flex'}}>
        <Leftnav />
        <PatientList />
      </div>
    </div>
  );
}
