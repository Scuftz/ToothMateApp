export const LowerRightWisdomTooth = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
            Clicked on lower right wisdom tooth
            <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}