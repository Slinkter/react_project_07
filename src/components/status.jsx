export default function Status(props) {
  const { statusCode } = props;

  return (
    <div className="statusCodeContainer">
    
      {statusCode === 0 ? "" : ""} 
      {statusCode === 1 ? "saving ... 🙂" : ""}
      {statusCode === 2 ? "document saved 😎" : ""}
    </div>
  );
}
