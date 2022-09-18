export const LowerRightSecondMolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on lower right second molar
         <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}