import React from 'react'

const HTMLParser = ({ notesText, isNoteExpanded }) => {
  let template
  if (notesText.length > 120 && !isNoteExpanded) {
    template = (
      <div>
        {`${notesText.substr(0, 120)}...`.split('\n').map(str => (
          <div key={notesText.id} dangerouslySetInnerHTML={{ __html: str }} />
        ))}
      </div>
    )
  } else {
    template = (
      notesText.split('\n').map(str => (
        <div key={notesText.id} dangerouslySetInnerHTML={{ __html: str }} />
      )))
  }
  return template
}

export default HTMLParser
