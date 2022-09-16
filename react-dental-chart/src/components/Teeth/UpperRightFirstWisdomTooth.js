export const UpperRightFirstWisdomTooth = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on upper right first wisdom tooth
            <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}