import {useState, useEffect, useRef} from 'react'
import uniqid from "uniqid";

import Card from './Card'
import Map from './Map'
import FilterBar from './FilterBar'

function VaccineAppointments(props) {
  const [dataArray, setDataArray] = useState([])
  const [vaccLocData, setVaccLocData] = useState([])
  const dataDict = useRef({})
  let locData = {};
  useEffect(() => {
    // Update the document title using the browser API
    setupVaccData("anyDoses", "any", "any");

  }, []);

  function filterCards(id) {
    setDataArray([dataDict.current[id]])
  }

  function filterFromSelections(apptType, vaccType, pharm) {
    setupVaccData(apptType, vaccType, pharm)
  }

  function resetMap() {
    setupVaccData("anyDoses", "any", "any");
  }

  function setupVaccData(apptType, vaccType, pharm) {
    let dataArrayTemp = []
    let vaccLocDataTemp = []
    let dataDictTemp = {}
    for (let i = 0; i < props.data.features.length; i++) {
      let apptAvail = props.data.features[i].properties.appointments_available;


      if (apptAvail === true) {
        let apptAvail2ndDose = props.data.features[i].properties.appointments_available_2nd_dose_only;
        let availDoses = props.data.features[i].properties.appointments_available_all_doses;
        let dataModified = props.data.features[i].properties.appointments_last_modified;
        let city = props.data.features[i].properties.city;
        let provName = props.data.features[i].properties.name;
        let zipCode = props.data.features[i].properties.postal_code;
        let corpName = props.data.features[i].properties.provider_brand_name;
        let state = props.data.features[i].properties.state;
        let timeZone = props.data.features[i].properties.time_zone;
        let address = props.data.features[i].properties.address;
        let url = props.data.features[i].properties.url;
        let appointments = props.data.features[i].properties.appointments;
        let x = props.data.features[i].geometry.coordinates[0]
        let y = props.data.features[i].geometry.coordinates[1]
        let id = props.data.features[i].properties.id

        let currVaccineType = Object.keys(props.data.features[i].properties.appointment_vaccine_types)[0]

        if (apptType === "2ndDoseOnly") {
          if (apptAvail2ndDose === false) {
            continue
          }
        }

        if (vaccType !== "any" && currVaccineType !== vaccType) {
          continue
        }

        if (pharm !== "any" && corpName.toLowerCase() !== pharm) {
          continue
        }

        dataArrayTemp.push([apptAvail, apptAvail2ndDose, availDoses, dataModified, city, provName, zipCode, corpName, state, timeZone, address, url, appointments])
        locData= {'description': state, "geometry": [y, x], "name": corpName, "id": id, "address": address, "city":city, "url": url }
        vaccLocDataTemp.push(locData)
        dataDictTemp[id] = [apptAvail, apptAvail2ndDose, availDoses, dataModified, city, provName, zipCode, corpName, state, timeZone, address, url, appointments]
      }
    }

    // Handle FEMA mass vaccination sites
    if (apptType === "anyDoses" && vaccType === "any" && pharm === "any") {
      let allEnergyArr = ["Not immediately-- register in the link below", "Not immediately-- register in the link below", "", "", "Madison", "FEMA", "53713", "FEMA Mass Vaccination Site", "WI", "", "1919 Alliant Energy Center Way", "https://vaccinate.wi.gov/en-US/", []]
      dataArrayTemp.push(allEnergyArr)
      let allEnergyCenterId = uniqid()

      let wisCenterArr = ["Not immediately-- register in the link below", "Note immediately -- register in the link below", "", "", "Milwaukee", "FEMA", "53203", "FEMA Mass Vaccination Site", "WI", "", "400 W Wisconsin Ave", "https://vaccinate.wi.gov/en-US/", []]
      dataArrayTemp.push(wisCenterArr)
      let wisCenterId = uniqid()

      locData = {'description': "WI", "geometry": [43.0471, -89.3789], "name": "FEMA Mass Vaccination Site", "id": allEnergyCenterId, "address": "1919 Alliant Energy Center Way", "city":"Madison", "url": "https://vaccinate.wi.gov/en-US/" }
      vaccLocDataTemp.push(locData)
      locData = {'description': "WI", "geometry": [43.0389, -87.9065], "name": "FEMA Mass Vaccination Site", "id": wisCenterId, "address": "400 W Wisconsin Ave", "city":"Milwaukee", "url": "https://vaccinate.wi.gov/en-US/" }
      vaccLocDataTemp.push(locData)

      dataDictTemp[allEnergyCenterId] = allEnergyArr
      dataDictTemp[wisCenterId] = wisCenterArr
    }

    setDataArray(dataArrayTemp)
    setVaccLocData(vaccLocDataTemp)
    dataDict.current = dataDictTemp
  } 

  const Cards = dataArray.map((data) => 
     <Card key={uniqid()} vaccData={data}/>
  );

  return (
    <div className="App">
      <Map vaccLocData = {vaccLocData} filterCards={filterCards}/>
      <FilterBar filterFromSelections={filterFromSelections} resetMap={resetMap}/>
      {Cards}
    </div>
  );
}

export default VaccineAppointments;
