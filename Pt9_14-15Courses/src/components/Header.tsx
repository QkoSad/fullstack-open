interface HeaderProps {
  courseName: string;
}
const Header = ({ courseName }: HeaderProps): JSX.Element => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

export default Header;
