
import "./App.css";
import { useGlobalContext } from "./Context";


function Stories(){
    
  const {hits,nbPages,isLoading,removePost} = useGlobalContext();
   console.log("from hits",hits)
    
      if(isLoading){
    return <h1 style={{textAlign:"center"}}>Loading.....</h1>
  }
  

  return(
    < >

   <div className="stories-div">

  

    {
      hits.map((items)=>


        {
          const {title,author,objectID,url,num_comments} =items
          
          
           return (
            <>
               <div className="card"  key={objectID}>
                <h2>{title}</h2>
                <p>
                  By <span> {author} </span> | <span> {num_comments} </span> Comments
                </p>
                <card className="card-button">
                  <a href={url} target="_blank">
                    Read More
                  </a>
                  <a href="#" onClick={()=>removePost(objectID)}>Remove</a>
                </card>
               </div>

           </>
                  )
           
          
        }

      )
    }
     </div>
  
    </>
  )
}

export default Stories;