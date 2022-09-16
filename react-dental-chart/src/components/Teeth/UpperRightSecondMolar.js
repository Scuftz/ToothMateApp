export const UpperRightSecondMolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on upper right second molar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}