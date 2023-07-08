import './App.css';
import logo from './assets/UBCOnTime Logo.png';
import { useState } from 'react';

function App() {
  return (
    <div>
      <HeaderImage />
      <UploadButton />
      <Information />
    </div>
  );
}

function HeaderImage() {
  return (
    <img className="logo" src={logo} alt="UBCOnTime Logo" width="1387" height="220" />
  )
}

function UploadButton() {
  const [journeys, setJourneys] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];

    console.log(file.name);

    const content = await file.text();
    
    const response = await fetch("http://localhost:9000/process", {method: "POST", body:content});

    setJourneys(JSON.parse(await response.text()).data);
  };

  return (
    <>
    <input
      type="file"
      onChange={handleSubmit}
    />
    <div>
      {journeys.map((journey) => (
        <div>
          <text>
            {journey.class1} to {journey.class2}
            <br />
            {journey.day}
            <br />
            Term: {journey.term}
            <br />
            Walk Time: {journey.time}
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
    <div>
      <h2>Find your Timetable on the SSC, then click 'Download your schedule' and upload it here.</h2>
      <p>Our app makes sure that don't have to sprint between your UBC classes.</p>
    </div>
  )
}

export default App;
