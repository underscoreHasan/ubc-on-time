import './App.css';
import logo from './assets/UBCOnTime Logo.png';

console.log(logo)

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
    <img class="logo" src={logo} alt="UBCOnTime Logo" width="1387" height="220" />
  )
}

function UploadButton() {
  return (
    <button>cloud icon</button>
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
