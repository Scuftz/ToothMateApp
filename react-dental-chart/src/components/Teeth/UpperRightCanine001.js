export const UpperRightCanine001 = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on upper right canine 001
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}