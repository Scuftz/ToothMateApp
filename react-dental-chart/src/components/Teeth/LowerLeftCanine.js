export const LowerLeftCanine = () => {
    const back = () =>{
        return  window.history.back()
      }
    return(
        <div>
            Clicked on lower left canine
            <button onClick={back}>Back to Dental Chart</button>
        </div> 
    )
}