export const UpperLeftWisdomTooth = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on upper left widsom tooth
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}