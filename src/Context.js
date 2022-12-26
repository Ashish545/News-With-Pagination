import { useReducer,useEffect } from "react";
import { createContext ,useContext} from "react";


let Api  = `https://hn.algolia.com/api/v1/search?`;

const initialState = {
    isLoading: true,
    query:"HTML",
    nbPages:0,
    page:0,
    hits: []
}

const AppContext = createContext();

const AppProvider  =({children})=>{

    const reducer=(state,action)=>{

        switch(action.type){

            case "setLoading" : return {
                ...state,
                isLoading: true,
            }
            case "getStories": return {

                ... state, 
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,

            }
            case "removePost": return{
                ...state,
                hits:state.hits.filter((curr)=>curr.objectID !== action.payload
                )
            }
            case "searchPost": return{
                ...state,
                query:action.payload
            }
            case "nextPage":
                
                let pageNumInc = state.page+1;

                if(pageNumInc>=state.nbPages){
                    pageNumInc = 0;    // because we already dec by -1 initially
                }
            

                return{
                ...state,
                page:pageNumInc

            }
            case "prevPage":
                let pageNum = state.page-1;
                if(pageNum<=0){
                    pageNum = 0;    // because we already incresing by +1 initially
                }
             
                
            return{
                ...state,
                page:pageNum,

            }
        }
        
    }
    
    const [state,dispatch] =useReducer(reducer,initialState)
    
    
    async function fetchApi(url){
       dispatch(
         {
            type:"setLoading"
         }
       )
       try{
           const res = await fetch(url);
           const data = await res.json();
           // isLoading = false;
           console.log(data)
           dispatch({type:"getStories",   // just like setState
           payload:{
                    hits:data.hits,
                    nbPages:data.nbPages,

                }    
            })
            
            
        }catch(err){
            console.log(err)
    }
    
    
    
}
// To remove The Post
    
          function removePost(Id){
            dispatch({type:"removePost",payload:Id})
          }

// To Search The Post


            function searchPost(e){
                dispatch({type:"searchPost",payload:e})
            }


// Pagination

       function getPrevpPage(){
        dispatch({type:"prevPage"})
       }
       function getNextPage(){
        dispatch({type:"nextPage"})
       }

    useEffect(()=>{
     
        fetchApi(`${Api}query=${state.query}&page=${state.page}`)

    },[state.query,state.page])



    return (<AppContext.Provider value={{...state,removePost,searchPost,getPrevpPage,getNextPage}}>
        {children}
        </AppContext.Provider>)
}

// Custom Hooks creation

const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalContext}