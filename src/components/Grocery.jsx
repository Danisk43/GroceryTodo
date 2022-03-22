import React, { useState } from 'react'
import GroceryInput from './GroceryInput'
import GroceryList from './GroceryList'
import LoadingBar from 'react-top-loading-bar'
import Loader from "./Loader"

const Grocery = () => {
    const [str,setStr]=useState("")
    const [load,setLoad]=useState(false)
    const [progress, setProgress] = useState(0)
    const [print,setPrint]=useState([])
    const [page,setPage]=useState(1)
    const [total,setTotal]=useState(1);
    
    const postData=async (payload)=>{
        console.log(payload)
        try {
            setProgress(30)
           let res1= await fetch(`http://localhost:3004/todo`,{
               method: 'POST',
               body: JSON.stringify(payload),
               headers: {"Content-Type":'application/json'},
           })
           let res2=await res1.json
           getData()
           setProgress(100)
           
       } catch (error) {
           console.log(error)
       }
    }

    const getData=async()=>{
       
        let data=await fetch(`http://localhost:3004/todo?_page=${page}&_limit=3`);
        data=await data.json()
        setPrint(data)
        setLoad(false)
    }

    const handleClick=()=>{
        setLoad(true)
        const payload={
            title: str,
            status:false
        }
        postData(payload)
    }
    const handleChange=(e)=>{
        setStr(e.target.value)
    }

    const delData=async(id)=>{
        setProgress(30)
        try {
            let deletedData=await fetch(`http://localhost:3004/todo/${id}`,{method:"DELETE"});
            setProgress(100)
            getData()
            console.log(id)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    React.useEffect(()=>{
       getData()
    },[print])

    const HandlePrev=()=>{
        // setPage((prevPage)=>prevPage-1)
        setPage(page-1)
        console.log(page)
    
    }

    const HandleNext=()=>{
        // setPage((prevPage)=>prevPage+1)
        setPage(page+1)

        console.log(page)
    


    }
    React.useEffect(async()=>{
        let data1=await fetch(`http://localhost:3004/todo`);
        data1=await data1.json()
        setTotal(data1.length)
        console.log(total)
    },[])


  return (
      <>
       <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <div>Grocery</div>
    <GroceryInput handleChange={handleChange} handleClick={handleClick} str={str}/>
    {
    load ? <Loader/> : <GroceryList print={print} setPrint={setPrint} delData={delData} HandlePrev={HandlePrev} HandleNext={HandleNext} page={page} total={total}/>
}
    </>
  )
}

export default Grocery