// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { getResults, deleteResult } from './api';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await getResults();
      if (data.success) {
        setResults(data.results);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (studentName) => {
    const response = await deleteResult(studentName);
    if (response.success) {
      setResults(results.filter(result => result.student_name !== studentName));
    } else {
      alert(response.message || 'Failed to delete result');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Telugu</th>
            <th>Hindi</th>
            <th>English</th>
            <th>Maths</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.student_name}</td>
              <td>{result.telugu}</td>
              <td>{result.hindi}</td>
              <td>{result.english}</td>
              <td>{result.maths}</td>
              <td>{result.attendance}</td>
              <td>
                <button onClick={() => handleDelete(result.student_name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

