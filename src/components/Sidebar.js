import React from 'react'

export default function Sidebar(props){
    
    const noteElements = props.data.map(items => {
        return(
            <div className={`eachNote ${items.id == props.currentNote? "selected-note": ""}`}
                onClick={()=>props.setCurrentNoteId(items.id)} key={props.data.id}>
                <p>{items.data.split("\n")[0]}</p>
                <i class="fa-solid fa-trash-can" onClick={(event)=>props.deleteNote(event, items.id)}></i>
            </div>
        )
    })
    return(
        <div className='sidebar'>
            <div className='addNewButton'>
                <button className='addNew' onClick={props.createNewNote}>Add new</button>
            </div>
            {noteElements}
        </div>  
    )
}