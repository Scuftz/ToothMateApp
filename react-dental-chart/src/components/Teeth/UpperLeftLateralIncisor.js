export const UpperLeftLateralIncisor = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on upper left lateral incisor
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}