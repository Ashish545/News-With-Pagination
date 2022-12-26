import { useGlobalContext } from "./Context";
import "./App.css";
import Pagination from "./Pagination";
import Search from "./Search";
import Stories from "./Stories";



function App(){
  // let data = useGlobalContext()
  return(
    <>
    
      <h1>
        {/* hello React {data} */}
      </h1>
      <Search/>
      <Pagination/>
      <Stories/>
    </>
  )
}

export default App;