export const LowerRightCanine = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower right canine
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}