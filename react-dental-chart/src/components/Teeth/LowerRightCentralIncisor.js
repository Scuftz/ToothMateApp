export const LowerRightCentralIncisor = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on lower right central incisor
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}