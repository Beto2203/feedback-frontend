import FeedbackCard from './FeedbackCard.js';
import { MdWest, MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { remove, addComment, removeComment } from '../Services/feedbacks.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Comment({ comment, user, feedbackId, updateComments }) {

  const removeCommentHandler = async () => {
    await removeComment(feedbackId, comment.id)
    updateComments(feedbackId, comment, true);
  };

  return (
    <div className="comment">
      <h3>@{comment.author.username || user.username}</h3>
      { (user.id === comment.author.id || user.id === comment.author) &&
        <div className="removeComment" onClick={removeCommentHandler}>
          {MdDeleteForever()}
        </div>
      }
      <div className="content">
        {comment.comment}
      </div>

    </div>
  );
}

function FeedbackBlog({ feedback, updateLikes, updateComments, user }) {
  const [comment, setComment] = useState('');

  const canDelete = feedback.author.id === user.id;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this blog? This changes are permanent')) {
      await remove(feedback.id);
      navigate(0);
    }
  }

  const submitCommentHandler = async () => {
    try {
      const res = await addComment(feedback.id, comment, false);
      updateComments(feedback.id, res);
      setComment('');
    } catch (err) {

    }
  }

  return (
    <div className="feedbackBlog">
      <div className="backHome">
        <Link to="/">
          {MdWest()} Go back
        </Link>
      </div>

      {
        canDelete &&
        <div className="deleteBlog" onClick={deleteHandler}>
          {MdDeleteForever()}
        </div>
      }

      <div className="blogContent">
        <FeedbackCard feedback={feedback} showFullCard={true} updateLikes={updateLikes} user={user}/>
      </div>

      <div className="commentSection card">
        <h3>{feedback.comments.length} {(feedback.comments.length > 1 || feedback.comments.length === 0) ? 'Comments' : 'Comment' }</h3>
        {
          feedback.comments.map(comment => <Comment key={comment.id}
                                                    comment={comment}
                                                    user={user}
                                                    feedbackId={feedback.id}
                                                    updateComments={updateComments} />)
        }
      </div>

      <form className="commentForm card">
        <input type="text"
               name="commentInp"
               id="commentInp"
               className="card"
               placeholder="Add a comment"
               value={comment}
               onChange={({ target }) => setComment(target.value)} />
        <button type="button"
                onClick={submitCommentHandler}
                disabled={!comment}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FeedbackBlog;
