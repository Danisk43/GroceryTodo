import React from 'react'

const GroceryList = ({print,setPrint,delData,HandlePrev,HandleNext,page,total}) => {
    console.log(print)


  return (
    <>
    <div>GroceryList</div>
    {
        print.map((e)=><div key={e.id}><li >{e.title}<button onClick={()=>(delData(e.id))}>DELETE</button></li></div>)
    }
    

    <button disabled={page===1} onClick={HandlePrev}>PREVIOUS</button>
    
    <button disabled={page>=Math.ceil(total/3)}onClick={HandleNext}>NEXT</button>

    </>
  )
}

export default GroceryList