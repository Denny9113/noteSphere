import React from 'react'
import Notes from '../1.components/Notes/Notes'

function Archive() {
  return (
    <>
    <Notes isCreateNoteVisible={false} archive={true}/>
    </>
  )
}

export default Archive