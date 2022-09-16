export const UpperRightFirstMolar = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
        Clicked on upper right first molar
         <button onClick={back}>Back to Dental Chart</button> 
        </div> 
    )
}