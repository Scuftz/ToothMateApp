export const UpperRightCentralIncisor = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on upper right central incisor
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}