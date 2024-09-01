import React, { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetch('/api/courses.json')
    .then((response) => response.json())
    .then((data) => setCourses(data));
  }, [])

  const filteredData = courses.filter((course) => course.trimester.toLowerCase().includes(filter.toLowerCase()) || course.courseName.toLowerCase().includes(filter.toLowerCase()));
  
  const sortedData = filteredData.sort((a, b) => {
    if (sort === "Trimester") {
      return a.trimester - b.trimester * (direction === "desc" ? -1 : 1);
    }
    if (sort === "Course Number") {
      return a.courseNumber.localeCompare(b.courseNumber) * (direction === "desc" ? -1 : 1);
    }
    if (sort === "Courses Name") {
      return a.courseName.localeCompare(b.courseName) * (direction === "desc" ? -1 : 1);;
    }
    if (sort === "Semester Credits") {
      return a.semesterCredits - b.semesterCredits * (direction === "desc" ? -1 : 1);
    }
    if (sort === "Total Clock Hours") {
      return a.totalClockHours - b.totalClockHours * (direction === "desc" ? -1 : 1);
    }
  });

  const currentPage = sortedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = sortedData.length > page * PAGE_SIZE;
  const hasLess = page > 1;
  
  const handleSortingChange = (field) => {
    const sortOrder = sort === field && direction === "asc" ? "desc" : "asc";
    setSort(field);
    setDirection(sortOrder);
  };
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" onChange={(e) => setFilter(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortingChange("Trimester")} style={{ cursor: "pointer" }}>Trimester</th>
            <th onClick={() => handleSortingChange("Course Number")} style={{ cursor: "pointer" }}>Course Number</th>
            <th onClick={() => handleSortingChange("Courses Name")} style={{ cursor: "pointer" }}>Courses Name</th>
            <th onClick={() => handleSortingChange("Semester Credits")} style={{ cursor: "pointer" }}>Semester Credits</th>
            <th onClick={() => handleSortingChange("Total Clock Hours")} style={{ cursor: "pointer" }}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
              <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)} style={{ cursor: "pointer" }}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)} style={{ cursor: "pointer" }}>Next</button>
      </div>
    </div>
  );
}
