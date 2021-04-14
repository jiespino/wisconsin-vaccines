import {useState, useEffect, useRef} from 'react'

import './App.css';
import VaccineAppointments from './components/VaccineAppointments'
import Loading from './components/Loading'

function App() {

  const [data, setData] = useState('')
  let loading = useRef(true);
 
  useEffect(() => {
    // Update the document title using the browser API
    fetchWIPharmacyData();

  }, []);


  async function fetchWIPharmacyData() {
    loading.current = false;
    const response = await fetch('https://www.vaccinespotter.org/api/v0/states/WI.json')
    const vaccData = await response.json()
    setData(vaccData)

  }

  return (
    <div className="App">
      <h1 id='pageTitle'>Wisconsin Covid Vaccines</h1>
      {loading.current === true ? <Loading/>:<VaccineAppointments data={data}/>}
    </div>
  );
}

export default App;
