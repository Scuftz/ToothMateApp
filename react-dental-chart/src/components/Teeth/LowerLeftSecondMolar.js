export const LowerLeftSecondMolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on lower left second molar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}