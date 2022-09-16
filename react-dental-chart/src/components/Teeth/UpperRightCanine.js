export const UpperRightCanine = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on upper right canine
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}