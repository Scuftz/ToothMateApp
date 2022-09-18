export const LowerRightFirstMolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>Clicked on lower right first molar
        <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}