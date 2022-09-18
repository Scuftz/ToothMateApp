export const LowerLeftWisdomTooth = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on lower left wisdom tooth
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}