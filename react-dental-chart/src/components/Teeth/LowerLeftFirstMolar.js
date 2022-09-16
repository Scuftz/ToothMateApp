export const LowerLeftFirstMolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower left first molar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}