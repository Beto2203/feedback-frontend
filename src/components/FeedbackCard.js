import { MdArrowUpward, MdComment } from 'react-icons/md';
import Tag from './Tag.js';
import { Link } from 'react-router-dom';

function FeedbackCard({ feedback, showFullCard }) {
  const { title, likes, content, tag, comments, id } = feedback;

  const likeHandler = (e) => {
    e.preventDefault();
    console.log('LIKEEE');
  };

  const cardBody = <>
    <div className="likes" onClick={likeHandler}>
      <i>{MdArrowUpward()}</i>
      {likes}
    </div>
    <div className="cardContent">
      <h4>{title}</h4>
      <p className={showFullCard ? '' : 'feedbackCardText'}>{content}</p>
      <Tag tagName={tag} classes={"tag"} />
    </div>

    <div className="comments">
      {MdComment()} {comments.length}
    </div>
  </>

  const link = <Link to={`/feedbackBlog/${id}`} className={"feedbackCard card"}>
    {cardBody}
  </Link>;

  const div = <div className={"feedbackCard card"}>
    {cardBody}
  </div>;

  return (
    <div>
      {
        showFullCard
          ? div
          : link
      }
    </div>
  );
}

export default FeedbackCard;
