const Filter = ({ value, method }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={method}></input>
    </div>
  );
};

export default Filter;
