const Person = ({ name, title, phone }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{title}</h2>
      <h3>{phone}</h3>
    </div>
  );
};

export default Person;
