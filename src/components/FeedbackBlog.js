import FeedbackCard from './FeedbackCard.js';
import { MdWest } from 'react-icons/md';
import { Link } from 'react-router-dom';

function FeedbackBlog({ feedback, updateLikes }) {
  return (
    <div>
      <div className="backHome">
        <Link to="/">
          {MdWest()} Go back
        </Link>
      </div>

      <FeedbackCard feedback={feedback} showFullCard={true} updateLikes={updateLikes} />
    </div>
  );
}

export default FeedbackBlog;
