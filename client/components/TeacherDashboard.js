import React, { useState } from 'react';
import { addResult } from '../api';

function TeacherDashboard() {
  const [studentName, setStudentName] = useState('');
  const [telugu, setTelugu] = useState('');
  const [hindi, setHindi] = useState('');
  const [english, setEnglish] = useState('');
  const [maths, setMaths] = useState('');
  const [attendance, setAttendance] = useState('');

  const handleSubmit = async () => {
    await addResult({ studentName, telugu, hindi, english, maths, attendance });
    setStudentName('');
    setTelugu('');
    setHindi('');
    setEnglish('');
    setMaths('');
    setAttendance('');
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" />
      <input type="number" value={telugu} onChange={(e) => setTelugu(e.target.value)} placeholder="Telugu Marks" />
      <input type="number" value={hindi} onChange={(e) => setHindi(e.target.value)} placeholder="Hindi Marks" />
      <input type="number" value={english} onChange={(e) => setEnglish(e.target.value)} placeholder="English Marks" />
      <input type="number" value={maths} onChange={(e) => setMaths(e.target.value)} placeholder="Maths Marks" />
      <input type="number" value={attendance} onChange={(e) => setAttendance(e.target.value)} placeholder="Attendance Percentage" />
      <button onClick={handleSubmit}>Add Result</button>
    </div>
  );
}

export default TeacherDashboard;
