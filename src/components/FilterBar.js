
import React from 'react';
import {useState, useEffect} from 'react'
import './FilterBar.css'

function FilterBar(props) {
  const [apptType, setApptType] = useState("anyDoses")
  const [vaccType, setVaccType] = useState("any")
  const [pharm, setPharm] = useState("any")



  useEffect(() => {

    props.filterFromSelections(apptType, vaccType, pharm)


  }, [apptType, vaccType, pharm]);

  function handleChange(event) {
    let name = event.target.name

    if (name === "appointmentType") {
        setApptType(event.target.value)
    } 
    else if (name ==="vaccineType"){
        setVaccType(event.target.value)

    } else {
        setPharm(event.target.value)
    }
  }

  return (
      <div>
          <div id="resetButtonContainer">
            <button id="resetButton" onClick={props.resetMap}>Reset Map</button>
          </div>
        <div className="filterbarContainer">
        <div>
            <label>Appointment type
                <select value={apptType} name="appointmentType" onChange={handleChange}>
                    <option value="anyDoses">Any doses</option>
                    <option value="2ndDoseOnly">2nd dose only</option>
                    </select>
            </label>
        </div>
        <div>
            <label>Vaccine type
                <select value={vaccType} name="vaccineType" onChange={handleChange}>
                    <option value="any">Any</option>
                    <option value="moderna">Moderna</option>
                    <option value="pfizer">Pfizer</option>
                    <option value="johnson_johnson">Johnson & Johnson</option>
                    </select>
            </label>
            </div>
            <div>
            <label>Location
                <select value={pharm} name="pharmacy" onChange={handleChange}>
                    <option value="any">Any</option>
                    <option value="walgreens">Walgreens</option>
                    <option value="costco">Costco</option>
                    <option value="cvs">CVS</option>
                    <option value="healthmart">Health Mart</option>
                    <option value="hy-vee">Hy-vee</option>
                    <option value="kroger">Kroger</option>
                    <option value="metromarket">Metro Market</option>
                    <option value="picknsave">Pick'n Save</option>
                    <option value="samsclub">Sam's Club</option>
                    <option value="walmart">Walmart</option>
                    <option value="community (walgreens)">Community (Walgreens)</option>
                    </select>
            </label>
        </div>
        </div>
    </div>
  );
}
export default FilterBar;