function Course({ course }) {
  const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((c) => (
          <li key={c.id}>
            {c.name} {c.exercises}
          </li>
        ))}
        <li>
          <b>total of</b> {total} <b>exercises</b>
        </li>
      </ul>
    </>
  );
}
export default Course;
