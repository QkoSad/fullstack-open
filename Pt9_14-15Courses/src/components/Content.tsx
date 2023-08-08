import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}
const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <ul>
      {courseParts.map((course, index) => {
        return (
          <li key={index}>
            <Part course={course} />
          </li>
        );
      })}
    </ul>
  );
};

export default Content;
