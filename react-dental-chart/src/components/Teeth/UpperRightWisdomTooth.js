export const UpperRightWisdomTooth = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on upper right wisdom tooth
            <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}