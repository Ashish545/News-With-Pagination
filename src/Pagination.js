import "./App.css";
import { useGlobalContext } from "./Context";

function Pagination(){
  const {page,nbPages,getPrevpPage,getNextPage} = useGlobalContext();
  return(
    < >
    <div className="pagination-btn">
          <button onClick={()=>getPrevpPage()}>PREV</button>

          <p>{page+1} of {nbPages}</p>
          
          <button onClick={()=>getNextPage()}>NEXT</button>
    </div>
    </>
  )
}

export default Pagination;