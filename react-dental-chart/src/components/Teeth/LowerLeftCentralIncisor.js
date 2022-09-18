export const LowerLeftCentralIncisor = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower left central incisor
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}