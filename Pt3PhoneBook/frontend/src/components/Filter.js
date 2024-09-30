function Filter({ filter, setFilter}) {
  function onFilter(e) {
    setFilter(e.target.value);
  }

  return (
    <div>
      filter shown with <input value={filter} onChange={onFilter} />
    </div>
  );
}
export default Filter;
