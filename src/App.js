import {useEffect, useState} from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './sass/all.scss';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fecthJobs = async _ => {
    const response = await fetch(url);
    const jobs = await response.json();
    setJobs(jobs);
    setLoading(false);
  }

  useEffect(_ => {
    fecthJobs();
  }, []);

  if (loading) {
    return (
      <div className='Loading'>
        <h2>Loading...</h2>
      </div>
    )
  }

  const {title, dates, duties, company} = jobs[value];

  return (
    <div className="App">
      <div className='Container'>
        <div className='Title'>
          <h2>Experience</h2>
          <div className='UnderLine'></div>
        </div>
        <div className='GridContainer'>
          <div className='Btns'>{
            jobs.map((job, index) => {
              const {id, company} = job;
              return (
                <button key={id} onClick={_ => setValue(index)}
                  className={`Btn ${value === index && 'active'}`}
                >
                  {company}
                </button>
              );
            })
          }</div>
          <div className='Job'>
            <h3 className='JobTitle'>{title}</h3>
            <span className='JobCompany'>{company}</span>
            <span className='Date'>{dates}</span>
            <div className='Duties'>{
              duties.map((dutie, index) => {
                return <p key={index} className='Dutie'>
                  <span className='Icon'>
                    <FaAngleDoubleRight />
                  </span>
                  <span className='Text'>{dutie}</span>
                </p>
              })
            }</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
