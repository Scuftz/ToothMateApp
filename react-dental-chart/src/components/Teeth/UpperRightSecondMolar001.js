export const UpperRightSecondMolar001 = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on upper right second molar 001
            <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}