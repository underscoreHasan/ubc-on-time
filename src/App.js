import './App.scss';
import logo from './assets/images/UBCOnTime Logo.png';
import cloudIcon from './assets/images/cloud.svg';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';

function App() {
  const [journeys, setJourneys] = useState([]);

  return (
    <div className='main'>
      <HeaderImage />
      <UploadButton onResponse={(data) => setJourneys(data)} />
      <Schedule journeys={journeys} />
      <Information />
    </div>
  );
}

function HeaderImage() {
  return (
    <img className="headerImage" src={logo} alt="UBCOnTime Logo" width="1387" height="220" />
  );
}

function UploadButton({ onResponse }) {
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
  );
}

function Schedule({ journeys }) {
  const timetable = [[], [], [], [], [], [], []];

  function bucketJourneys(journeys) {
    journeys.map((j) => (
      timetable[dayToIndex(j.day)].push(j)
    ));

    return timetable;
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
    <div className="timeTable">
      {bucketJourneys(journeys).map((d, index) => (
        <div className={"day"}>
          {d.map((j) => (
            <div className={j.day}>
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
  );
}

function Information() {
  return (
    <div className='information'>
      <h2>Find your Timetable on the SSC, then click 'Download your schedule' and upload it here.</h2>
      <p>Our app makes sure that don't have to sprint between your UBC classes.</p>
    </div>
  );
}

export default App;
