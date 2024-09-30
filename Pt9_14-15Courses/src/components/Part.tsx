import { CoursePart } from "../types";
const Part = ({ course }: { course: CoursePart }): JSX.Element => {
  switch (course.kind) {
    case "basic":
      return (
        <p>
          {course.name} {course.exerciseCount} {course.description}
        </p>
      );
    case "group":
      return (
        <p>
          Course name {course.name}
          Exercise Count {course.exerciseCount}
          Group prject Count {course.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          Course name {course.name}
          Exercise Count {course.exerciseCount}
          Description
          {course.description}
          Background material
          {course.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          Course name {course.name}
          Exercise Count {course.exerciseCount}
          Description
          {course.description}
          Requirments{" "}
          {course.requirements.map((el, inx) => (
            <li key={inx}>{el}</li>
          ))}
        </p>
      );
    default:
      const exhausetiveCheck: never = course;
      return exhausetiveCheck;
  }
};

export default Part;
