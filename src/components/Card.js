import {useState} from 'react'
import uniqid from "uniqid";

import './Card.css'


function Card(props) {
    let appts;
    let apptHeader;
    let hideFooter;
    let source;
    const [hide, setHide] = useState(true)
    function expandApptList() {
        setHide(false)
    }

    // Normal pharmacy case check true/false for displaying if appointments are available
    // In case of FEMA display string stored in props
    let apptAvail = props.vaccData[0]
    let apptAvailText;
    if (typeof apptAvail === "boolean") {
        apptAvailText = true ? "Yes": "No"
    } else {
        apptAvailText = apptAvail
    }


    let apptAvail2ndDose = props.vaccData[1]
    let apptAvail2ndText
    if (typeof apptAvail2ndDose === "boolean") {
        apptAvail2ndText = true ? "Yes": "No"
    } else {
        apptAvail2ndText = apptAvail
    }
    let dataModifiedTime = props.vaccData[3]
    let city = props.vaccData[4]
    let provName = props.vaccData[5]
    let zipCode = props.vaccData[6]
    let corpName = props.vaccData[7]
    let state = props.vaccData[8]
    let address = props.vaccData[10]
    let url = props.vaccData[11]
    let appointments = props.vaccData[12]

    if (appointments.length > 0) {
  
        apptHeader = <p><b>All Appointments</b> (as of {new Date(dataModifiedTime).toLocaleTimeString([], {timeZoneName: "short", weekday: "long", year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}):</p>
        appts = []
        let appt;
        let listName;
        let hiddenApptCount = 0;
        for (let i=0; i < appointments.length; i++) {
            appt = appointments[i]
            if (i > 5) {
                listName = (hide === true) ? "apptTime hideAppt" : "apptTime"
                hiddenApptCount++
            }
            else {
                listName = "apptTime"
                
            }
            appts.push(<li className={listName} key={uniqid()}>{new Date(appt.time).toLocaleTimeString([], {timeZoneName: "short", weekday: "long", year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})} ({appt.type})</li>)
        }

        if (hiddenApptCount > 0 && hide) {
            hideFooter = <a href="#/" onClick={expandApptList} className="centerText"> View {hiddenApptCount} other appointment times</a>
        }

        if (provName !== "FEMA") {
            source = <p className="centerText"><b>Source:</b> vaccinespotter.org</p>
        }
    }
    else {
        if (provName !== "FEMA") {
            appts = <p className="centerText">View appointment times by clicking the reserve link below </p>
            source = <p className="centerText"><b>Source:</b> vaccinespotter.org</p>
        }
    }
      return (
        <div id="cardContainer">
            <div className="centerText">
                <h3 id='title'>{corpName}</h3>
            </div>
            <div id='cardMidContainer'>
                <div className="centerText">
                    <p>{address}</p>
                    <p>{city}, {zipCode} {state}</p>
                </div>
                <div id='cardButtonContainer'>
                   
                </div>
            </div>
            <div>
                <p className="centerText"><b>Appointment Available?</b> {apptAvailText}</p>
                <p className="centerText"><b>Appointment Available 2nd Dose?</b> {apptAvail2ndText}</p>
                {apptHeader}
            </div> 
            {appts}
            {hideFooter}
            <div id='buttonContainer'>
                <a className='button' href={url} target='__blank'>Reserve</a>
            </div>
            {source}


        </div>
      );
    }
    
    export default Card;
    