import React from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'


export default function Sidebar(props){
  const converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
  });
  const [selectedTab, setSelectedTab] = React.useState("write");
    console.log(props.currentNote.data)
    return(
        <div className="editor-header">
          <ReactMde
            value={props.currentNote.data}
            onChange={props.updateNote}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </div>
    )
}