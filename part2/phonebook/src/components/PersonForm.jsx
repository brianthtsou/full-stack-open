const PersonForm = ({
  onSubmitMethod,
  nameVal,
  nameOnChangeHandler,
  numVal,
  numOnChangeHandler,
}) => {
  return (
    <form onSubmit={onSubmitMethod}>
      <div>
        name: <input value={nameVal} onChange={nameOnChangeHandler} />
      </div>
      <div>
        number: <input value={numVal} onChange={numOnChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
