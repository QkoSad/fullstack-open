import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setFilter(e.target.value));
  };
  return (
    <>
      filter <input onChange={handleChange} />
    </>
  );
};
export default Filter;
