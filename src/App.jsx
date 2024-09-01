import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { useState, createContext } from "react";
export const AppContext = createContext();

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  
  const enrollCourse = (course) => {
    setEnrolledCourses([...enrolledCourses, course])
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.courseNumber !== courseNumber))
  }

  return (
    <div>
      <AppContext.Provider value={{enrolledCourses, enrollCourse, dropCourse}}>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </AppContext.Provider>
    </div>
  );
}
