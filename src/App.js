import './App.scss';
import logo from './assets/images/UBCOnTime Logo.png';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className='main'>
      <HeaderImage />
      <UploadButton />
      <Information />
    </div>
  );
}

function HeaderImage() {
  return (
    <img className="headerImage" src={logo} alt="UBCOnTime Logo" width="1387" height="220" />
  )
}

function UploadButton() {
  const [journeys, setJourneys] = useState([]);
  const hiddenFileInput = useRef(null);

  const handleClick = e => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];

    console.log(file.name);

    const content = await file.text();

    const response = await fetch("http://localhost:9000/process", { method: "POST", body: content });

    setJourneys(JSON.parse(await response.text()).data);
  };

  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>

      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleSubmit}
        ref={hiddenFileInput}
      />

      <div>
        {journeys.map((j) => (
          <div>
            <text>
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
            </text>
          </div>
        ))}
      </div>
    </>
  )
}

function Information() {
  return (
    <div className='information'>
      <h2>Find your Timetable on the SSC, then click 'Download your schedule' and upload it here.</h2>
      <p>Our app makes sure that don't have to sprint between your UBC classes.</p>
    </div>
  )
}

export default App;
