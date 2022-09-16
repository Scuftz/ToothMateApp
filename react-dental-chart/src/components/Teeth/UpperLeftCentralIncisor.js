export const UpperLeftCentralIncisor = () => {
   const back = () =>{
      return  window.history.back()
    }
    return(
        <div>
            Clicked on upper left central incisor
            <button onClick={back}>Back to Dental Chart</button>
        </div> 
        
    )
}