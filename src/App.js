import React from 'react'
import {nanoid} from 'nanoid'
import Split from 'react-split'
import Editor from './components/Editor'
import Sidebar from './components/Sidebar'

export default function App(){
    const [note, setNote] = React.useState(() => JSON.parse(localStorage.getItem('note')) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState((note[0] && note[0].id) || '')

    React.useEffect(() => {
        localStorage.setItem('note',JSON.stringify(note))
    },[note])

    function createNewNote(){
        const newData = {
            id: nanoid(),
            data: '#Start your new note'
        }
        setNote(prevState=> [newData,...prevState])
        setCurrentNoteId(newData.id)
    }

    function findCurrentNote(){
        return note.find(item =>{
            return item.id === currentNoteId
        }) || note[0]
    }

    function updateNote(text){
        setNote(oldNotes => {
            const newArray = []
            for(var i =0; i<oldNotes.length;i++){
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId){
                    newArray.unshift({...oldNote, data: text})
                }
                else{
                    newArray.push(oldNote)
                }
            }
            return(newArray)
        })
    }
    
    function deleteNote(event, noteId){
        event.stopPropagation()
        setNote(oldNotes => oldNotes.filter(notes => notes.id !== noteId))
    }

    return(

        note.length>0?
        <Split
            sizes= {[30,70]}
            direction= 'horizontal'
            className= 'split'
        >
            <Sidebar
                data={note}
                createNewNote={createNewNote}
                setCurrentNoteId={setCurrentNoteId}
                currentNote={currentNoteId}
                deleteNote={deleteNote}
            />
            {
                currentNoteId && note.length>0 &&
                <Editor
                    currentNote={findCurrentNote()}
                    updateNote={updateNote}
                />
            }
        </Split>
        :
        <div className='start-page'>
            <h3>You have no notes.</h3>
            <button onClick={createNewNote}>Create new note</button>
        </div>
    )
}