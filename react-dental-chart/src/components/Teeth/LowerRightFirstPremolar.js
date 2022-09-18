export const LowerRightFirstPremolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower right first premolar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}