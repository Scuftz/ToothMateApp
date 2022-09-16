export const UpperRightFirstPremolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on upper right first premolar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}