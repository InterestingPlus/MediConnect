import UnderConstruction from "../../../images/under-construction.gif";

function LaboratoryDoctor() {
  return (
    <>
      <h1>Laboratory</h1>

      <img
        src={UnderConstruction}
        alt="Under Construction"
        className="under-construction"
      />
      <h3>This Page is Under Construction...</h3>
      <p>Work in Progress...</p>
    </>
  );
}

export default LaboratoryDoctor;
