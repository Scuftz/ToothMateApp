export const UpperRightSecondPremolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on upper right second premolar
        <button onClick={back}>Back to Dental Chart</button>   
        </div> 
    )
}