import './App.scss';
import logo from './assets/images/UBCOnTime Logo.png';
import cloudIcon from './assets/images/cloud.svg';
import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function App() {
  const [journeys, setJourneys] = useState([]);
  const [foundResponse, setFoundResponse] = useState(false);

  return (
    <div className='main'>
      <HeaderImage foundResponse={foundResponse} />
      <Interface
        onResponse={(data) => {
          setJourneys(data);
          setFoundResponse(true);
        }}
        journeys={journeys}
        foundResponse={foundResponse} />
      <Information foundResponse={foundResponse} />
    </div>
  );
}

function HeaderImage({ foundResponse }) {
  if (!foundResponse) {
    return (
      <img className="headerImage" src={logo} alt="UBCOnTime Logo" width="1387" height="220" />
    );
  }
}

function Interface({ onResponse, journeys, foundResponse }) {
  const hiddenFileInput = useRef(null);

  const handleClick = e => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    const content = await file.text();
    const response = await fetch("http://localhost:9000/process", { method: "POST", body: content });

    onResponse(JSON.parse(await response.text()).data);
  };

  return (
    <>
      {(!foundResponse) ?
        <>
          <Button onClick={handleClick} variant="primary" className='uploadButton'>
            <img className="cloudIcon" src={cloudIcon} alt='cloud upload icon' />
          </Button>

          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleSubmit}
            ref={hiddenFileInput}
          />
        </>
        : <Schedule journeys={journeys} />
      }
    </>
  );
}

function Schedule({ journeys }) {
  const t1Week = [[], [], [], [], [], [], []];
  const t2Week = [[], [], [], [], [], [], []];
  const [term1Active, setActiveTerm] = useState(true);
  const [debug, setDebug] = useState();

  bucketJourneys(journeys)

  const toggleWeek = () => { (term1Active === true) ? setActiveTerm(false) : setActiveTerm(true) }

  function bucketJourneys(journeys) {
    journeys.map((j) => {
      if (j.term === 1) {
        t1Week[dayToIndex(j.day)].push(j);
      } else {
        t2Week[dayToIndex(j.day)].push(j);
      }
    })
  }

  function dayToIndex(d) {
    switch (d) {
      case "Sun": return 0;
      case "Mon": return 1;
      case "Tue": return 2;
      case "Wed": return 3;
      case "Thu": return 4;
      case "Fri": return 5;
      case "Sat": return 6;
      default: break;
    }
  }

  return (
    <>
      <Button onClick={toggleWeek} variant="primary">
        Switch to Term {(term1Active === true) ? "2" : "1"}
      </Button>
      <div className="timeTable">
        {((term1Active === true) ? t1Week : t2Week).map((day) => (
          <div className="day">
            {day.map((j) => (
              <div className="journeyCard">
                {j.class1} to {j.class2}
                <br />
                {j.buil1} to {j.buil2}
                <br />
                {j.day}
                <br />
                Term: {j.term}
                <br />
                Walk Time: {j.time}
                <br />
                <br />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Information({ foundResponse }) {
  if (!foundResponse) {
    return (
      <div className='information'>
        <h2>Find your Timetable on the SSC, then click 'Download your schedule' and upload it here.</h2>
        <p>Our app makes sure that don't have to sprint between your UBC classes.</p>
      </div>
    );
  }
}

export default App;
