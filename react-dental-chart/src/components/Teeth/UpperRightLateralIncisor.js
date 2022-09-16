export const UpperRightLateralIncisor = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on upper right lateral incisor
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}