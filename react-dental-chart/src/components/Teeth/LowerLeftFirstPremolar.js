export const LowerLeftFirstPremolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower left first premolar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    
    )
}