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
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    console.log(e.target.files[0].name);
    setFile(e.target.files[0])
  }

  return (
    <input
      type="file"
      onChange={handleSubmit}
    />
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
