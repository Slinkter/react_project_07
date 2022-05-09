export default function Mensaje(props) {
  const { props_firstName, props_lastName, props_age } = props;
  return (
    <div>
      <h1>{props_firstName} </h1>
      <h1>{props_lastName} </h1>
      <h1>{props_age}  </h1>
    </div>
  );
}
