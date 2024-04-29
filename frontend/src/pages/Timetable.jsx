import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import "../css/timetable.css"; 

const Timetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [name, setName] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(5);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [associations, setAssociations] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
    fetchClassrooms();
    fetchClasses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/instructors');
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/classrooms');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleAssociation = () => {
    const course = courses.find((c) => c.id === parseInt(selectedCourse));
    const instructor = instructors.find((i) => i.id === parseInt(selectedInstructor));

    if (course && instructor) {
      setAssociations((prevAssociations) => [
        ...prevAssociations,
        { course: course, instructor: instructor}
      ]);
      setSelectedCourse('');
      setSelectedInstructor('');
    }
  };

  const handleRemoveAssociation = (indexToRemove) => {
    setAssociations((prevAssociations) =>
      prevAssociations.filter((_, index) => index !== indexToRemove)
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    const formData = {
      name: name,
      numberOfDays: parseInt(numberOfDays),
      classes: selectedClass,
      classrooms: selectedClassroom,
      associations: associations,
    };
  
    const generatedTimetable = generateTimetable(formData);
  
    setTimetable(generatedTimetable);
  };

  // const handleSaveTimetable = async () => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/api/save_timetable/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ timetable }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to save timetable data');
  //     }

  //     console.log('Timetable data saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving timetable data:', error.message);
  //   }
  // };
  
  const printTimetable = () => {
    // Open a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Start building the printable HTML content
    let printableContent = `
      <html>
        <head>
          <title>Printable Timetable</title>
          <style>
            /* Add your CSS styles here */
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Printable Timetable</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                ${[...Array(8)].map((_, periodIndex) => (
                  `<th key=${periodIndex}>Period ${periodIndex + 1}</th>`
                )).join('')}
              </tr>
            </thead>
            <tbody>
              ${[...Array(5)].map((_, dayIndex) => (
                `<tr>
                  <td>Day ${dayIndex + 1}</td>
                  ${[...Array(8)].map((_, periodIndex) => (
                    `<td>${timetable[dayIndex][periodIndex] ? `
                      <div>
                        <p>Course: ${timetable[dayIndex][periodIndex].course.course_name}</p>
                        <p>Instructor: ${timetable[dayIndex][periodIndex].instructor.name}</p>
                      </div>` : 'No class scheduled'}
                    </td>`
                  )).join('')}
                </tr>`
              )).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    // Write the printable content to the print window and call print
    printWindow.document.write(printableContent);
    printWindow.document.close();
    printWindow.print();
  };
  
  

  const generateTimetable = (formData) => {

    const { numberOfDays, classes, associations, classrooms } = formData;
  

    const POPULATION_SIZE = 50;
    const MAX_GENERATIONS = 100;
    const MUTATION_RATE = 0.1;
  
    function generatePopulation() {
      const population = [];
      
      while (population.length < POPULATION_SIZE) {
        const timetable = [];
        let isUnique = true;
    
        for (let day = 0; day < numberOfDays; day++) {
          const daySchedule = generateUniqueDaySchedule(population);
          timetable.push(daySchedule);
        }
    
        for (const existingTimetable of population) {
          if (isTimetableEqual(existingTimetable, timetable)) {
            isUnique = false;
            break;
          }
        }
    
        if (isUnique) {
          population.push(timetable);
        }
      }
    
      return population;
    }
    
    function generateUniqueDaySchedule(population) {
      let daySchedule;
      let isUnique = false;
    
      while (!isUnique) {
        daySchedule = [];
        for (let period = 0; period < 8; period++) {
          const randomClass = classes[Math.floor(Math.random() * classes.length)];
          const randomAssociation = associations[Math.floor(Math.random() * associations.length)];
          const randomCourse = randomAssociation.course;
          const randomInstructor = randomAssociation.instructor;
          const randomClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
          daySchedule.push({ class: randomClass, course: randomCourse, instructor: randomInstructor, classroom: randomClassroom });
        }
    
        isUnique = true;
        for (const existingTimetable of population) {
          if (isDayScheduleEqual(existingTimetable, daySchedule)) {
            isUnique = false;
            break;
          }
        }
      }
    
      return daySchedule;
    }
    
    function isTimetableEqual(timetable1, timetable2) {
      for (let i = 0; i < timetable1.length; i++) {
        if (!isDayScheduleEqual(timetable1[i], timetable2[i])) {
          return false;
        }
      }
      return true;
    }
    
    function isDayScheduleEqual(daySchedule1, daySchedule2) {
      if (daySchedule1.length !== daySchedule2.length) {
        return false;
      }
    
      for (let i = 0; i < daySchedule1.length; i++) {
        if (!isObjectEqual(daySchedule1[i], daySchedule2[i])) {
          return false;
        }
      }
    
      return true;
    }
    
    function isObjectEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
    
      if (keys1.length !== keys2.length) {
        return false;
      }
    
      for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    
      return true;
    }
    
  
  
    function evaluateFitness(timetable) {
      return 1;
    }

    function selection(population, fitnessScores) {
      const selectedPopulation = [];
      for (let i = 0; i < POPULATION_SIZE; i++) {
        const index1 = Math.floor(Math.random() * POPULATION_SIZE);
        const index2 = Math.floor(Math.random() * POPULATION_SIZE);
        selectedPopulation.push(fitnessScores[index1] > fitnessScores[index2] ? population[index1] : population[index2]);
      }
      return selectedPopulation;
    }
  
  
    function crossover(parent1, parent2) {
    
      const crossoverPoint = Math.floor(Math.random() * parent1.length);
      const offspring = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
      return offspring;
    }
  
   
    function mutate(individual) {
  
      const index1 = Math.floor(Math.random() * individual.length);
      const index2 = Math.floor(Math.random() * individual.length);
      const temp = individual[index1];
      individual[index1] = individual[index2];
      individual[index2] = temp;
      return individual;
    }
  
  
    let population = generatePopulation();
    let generation = 0;
  
    while (generation < MAX_GENERATIONS) {
    
      const fitnessScores = population.map(timetable => evaluateFitness(timetable));
  
  
      const selectedPopulation = selection(population, fitnessScores);
  
    
      const newPopulation = [];
      while (newPopulation.length < POPULATION_SIZE) {
        const parent1 = selectedPopulation[Math.floor(Math.random() * selectedPopulation.length)];
        const parent2 = selectedPopulation[Math.floor(Math.random() * selectedPopulation.length)];
        const offspring = crossover(parent1, parent2);
        const mutatedOffspring = Math.random() < MUTATION_RATE ? mutate(offspring) : offspring;
        newPopulation.push(mutatedOffspring);
      }
  
      population = newPopulation;
      generation++;
    }
  
 
    const bestTimetable = population.reduce((best, current) => {
      const currentFitness = evaluateFitness(current);
      const bestFitness = evaluateFitness(best);
      return currentFitness > bestFitness ? current : best;
    }, population[0]);
  
    console.log(bestTimetable); 
    return bestTimetable;
  };
  

  return (
    <div className="timetable-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Timetable</h1>
          </div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="numberOfDays">Number of Days:</label>
        <input
          type="number"
          id="numberOfDays"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(e.target.value)}
        />
        <br />
        <label htmlFor="classroom">Select Classroom:</label>
        <select id="classroom" value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
          <option value="">Select a classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.room_number}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="class">Select Class:</label>
        <select id="class" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select a class</option>
          {classes.map((classData) => (
            <option key={classData.id} value={classData.id}>
              {classData.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="course">Select Course:</label>
        <select id="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="instructor">Select Instructor:</label>
        <select id="instructor" value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}>
          <option value="">Select an instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
            </option>
          ))}
        </select>
        <br />
        <button onClick={handleAssociation}>Associate</button>
        <div className="associations">
          <h2>Associations</h2>
          <ul>
            {associations.map((association, index) => (
              <li key={index}>
                {association.course.course_name} - {association.instructor.name}
                <button onClick={() => handleRemoveAssociation(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className='Timetable'>

      <h2>Timetable</h2>
{timetable && (
  <div className="timetable-grid">
    <table>
      <thead>
        <tr>
          <th></th>
          {[...Array(8)].map((_, periodIndex) => (
            <th key={periodIndex}>{`Period ${periodIndex + 1}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, dayIndex) => (
          <tr key={dayIndex}>
            <td>{`Day ${dayIndex + 1}`}</td>
            {[...Array(8)].map((_, periodIndex) => (
              <td key={periodIndex}>
                {timetable[dayIndex][periodIndex] && (
                  <div>
                    <p>{`Course: ${timetable[dayIndex][periodIndex].course.course_name}`}</p>
                    <p>{`Instructor: ${timetable[dayIndex][periodIndex].instructor.name}`}</p>
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    
    <div className="print-button-container">
  <button className="print-button" onClick={printTimetable}>Print Timetable</button>
</div>
    {/* <button onClick={handleSaveTimetable}>Save Timetable</button> */}
  </div>
)}

    </div>
    </div>
  );
};

export default Timetable;
