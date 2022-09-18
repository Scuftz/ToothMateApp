export const LowerLeftLateralIncisor = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower left lateral incisor
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}