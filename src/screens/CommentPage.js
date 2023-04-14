import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './CommentPage.css'
import CommentModal from '../Components/CommentModal';

const CommentPage = () => {
    const[showModal,setShowModal]=useState(false);

    const onClickCommentModal=()=>{
        setShowModal(true)
    }
    
  return (
    <>
    <div className=''>
    <Button className='commentSection' onClick={onClickCommentModal}>CommentModal</Button>
    {showModal && <CommentModal showModal={showModal} setShowModal={setShowModal}/>}
    </div>
    </>
  )
}

export default CommentPage