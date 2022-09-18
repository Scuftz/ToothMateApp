export const LowerLeftSecondPremolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower left second premolar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}