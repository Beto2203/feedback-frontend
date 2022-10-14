import FeedbackCard from './FeedbackCard.js';
import { MdWest } from 'react-icons/md';
import { Link } from 'react-router-dom';

function FeedbackBlog({ feedback }) {
  const {title, likes, content, tag, comments } = feedback;

  return (
    <div>
      <div className="backHome">
        <Link to="/">
          {MdWest()} Go back
        </Link>
      </div>

      <FeedbackCard feedback={feedback} showFullCard={true} />
    </div>
  );
}

export default FeedbackBlog;
