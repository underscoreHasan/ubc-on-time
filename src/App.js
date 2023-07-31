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
      <UploadButton onResponse={(data) => setJourneys(data)} journeys={journeys} />
      <Information />
    </div>
  );
}

function HeaderImage() {
  return (
    <img className="headerImage" src={logo} alt="UBCOnTime Logo" width="1387" height="220" />
  );
}

function UploadButton({ onResponse, journeys }) {
  const hiddenFileInput = useRef(null);
  const [foundResponse, setFoundResponse] = useState(false);

  const handleClick = e => {
    onResponse(staticResponse);
    setFoundResponse(true);
  };

  return (
    <>
      {(!foundResponse) ?
        <>
          <Button onClick={handleClick} variant="primary" className='uploadButton'>
            <img className="cloudIcon" src={cloudIcon} alt='cloud upload icon' />
          </Button>
        </>
        :
        <Schedule journeys={journeys} />
      }
    </>
  );
}

function Schedule({ journeys }) {
  const t1Week = [[], [], [], [], [], [], []];
  const t2Week = [[], [], [], [], [], [], []];

  bucketJourneys(journeys);

  function bucketJourneys(journeys) {
    journeys.map((j) => {
      if (j.term == 1) {
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
      <div className="timeTable">
        {t1Week.map((day) => (
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
      <div className="timeTable">
        {t2Week.map((day) => (
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

function Information() {
  return (
    <div className='information'>
      <h2>Find your Timetable on the SSC, then click 'Download your schedule' and upload it here.</h2>
      <p>Our app makes sure that don't have to sprint between your UBC classes.</p>
      <p className='disclaimer'>For now, this version of the webapp is 'dumb' (makes no API calls/server requests) and is a demo for Github Pages.</p>
      <p className='disclaimer'>Clicking the upload button will simply serve static data from a preselected .ics file.</p>
    </div>
  );
}

export default App;

const staticResponse = [
  {
    "class1": "MATH 221 104",
    "buil1": "Earth Sciences Building",
    "class2": "CPSC 221 102",
    "buil2": "West Mall Swing Space",
    "day": "Mon",
    "term": 1,
    "time": "3 mins",
    "online": false
  },
  {
    "class1": "CPSC 213 L1B",
    "buil1": "Institute for Computing (ICICS/CS)",
    "class2": "CPSC 213 102",
    "buil2": "Hugh Dempster Pavilion",
    "day": "Tue",
    "term": 1,
    "time": "1 min",
    "online": false
  },
  {
    "class1": "MATH 221 104",
    "buil1": "Earth Sciences Building",
    "class2": "CPSC 221 102",
    "buil2": "West Mall Swing Space",
    "day": "Wed",
    "term": 1,
    "time": "3 mins",
    "online": false
  },
  {
    "class1": "CPSC 213 L1B",
    "buil1": "Institute for Computing (ICICS/CS)",
    "class2": "MATH 221 104",
    "buil2": "Earth Sciences Building",
    "day": "Fri",
    "term": 1,
    "time": "5 mins",
    "online": false
  },
  {
    "class1": "MATH 221 104",
    "buil1": "Earth Sciences Building",
    "class2": "CPSC 221 102",
    "buil2": "West Mall Swing Space",
    "day": "Fri",
    "term": 1,
    "time": "3 mins",
    "online": false
  },
  {
    "class1": "STAT 251 201",
    "buil1": "Centre for Interactive  Research on Sustainability",
    "class2": "STAT 251 L2C",
    "buil2": "Earth Sciences Building",
    "day": "Mon",
    "term": 2,
    "time": "4 mins",
    "online": false
  },
  {
    "class1": "STAT 251 L2C",
    "buil1": "Earth Sciences Building",
    "class2": "ENGL 110 011",
    "buil2": "Buchanan",
    "day": "Mon",
    "term": 2,
    "time": "8 mins",
    "online": false
  },
  {
    "class1": "ENGL 110 011",
    "buil1": "Buchanan",
    "class2": "MATH 200 204",
    "buil2": "Chemistry",
    "day": "Mon",
    "term": 2,
    "time": "4 mins",
    "online": false
  },
  {
    "class1": "STAT 251 201",
    "buil1": "Centre for Interactive  Research on Sustainability",
    "class2": "ENGL 110 011",
    "buil2": "Buchanan",
    "day": "Wed",
    "term": 2,
    "time": "11 mins",
    "online": false
  },
  {
    "class1": "ENGL 110 011",
    "buil1": "Buchanan",
    "class2": "MATH 200 204",
    "buil2": "Chemistry",
    "day": "Wed",
    "term": 2,
    "time": "4 mins",
    "online": false
  },
  {
    "class1": "CPSC 310 2W2",
    "buil1": "",
    "class2": "WRDS 150B W95",
    "buil2": "",
    "day": "Thu",
    "term": 2,
    "time": 0,
    "online": true
  },
  {
    "class1": "STAT 251 201",
    "buil1": "Centre for Interactive  Research on Sustainability",
    "class2": "ENGL 110 LT3",
    "buil2": "Buchanan",
    "day": "Fri",
    "term": 2,
    "time": "11 mins",
    "online": false
  },
  {
    "class1": "ENGL 110 LT3",
    "buil1": "Buchanan",
    "class2": "MATH 200 204",
    "buil2": "Chemistry",
    "day": "Fri",
    "term": 2,
    "time": "4 mins",
    "online": false
  }
]
