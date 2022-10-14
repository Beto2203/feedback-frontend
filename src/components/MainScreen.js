import { MdOutlineFreeCancellation } from 'react-icons/md';
import FeedbackCard from './FeedbackCard.js';
import Tag from './Tag.js';
import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import { Link, useNavigate } from 'react-router-dom';

function MainScreen({ feedbacks, tags, selectTag, tagHandler, sortType, selectSortHandler, setFeedbacks, user }) {
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const hideForm = () => {
    setShowForm(false);
    document.body.classList.remove('preventScroll');
  };

  const activateForm = () => {
    if (user) {
      setShowForm(true);
      document.body.classList.add('preventScroll');
    }
    else
      navigate('/login')
  }

  const sortOptions = [
    (a, b) => a.id - b.id,
    (a, b) => b.id - a.id,
    (a, b) => b.comments.length - a.comments.length,
    (a, b) => a.comments.length - b.comments.length
  ];

  feedbacks.sort(sortOptions[sortType]);

  return (
    <div className="mainScreen">
      <section className="menu">
        <div className="card" id="cardTitle">
          Feedback Board
          <div id="cardSubtitle">
            {
              user
                ? `Welcome ${user.name}`
                : <Link to="/login">Sign in</Link>
            }
          </div>

        </div>
        <div className="card tagContainer">
          {
            tags.map(tag => <Tag key={tag} tagName={tag} classes={`tag menuTag ${tag === selectTag && 'selectedTag'}`}
                                 tagHandler={tagHandler} />)
          }
        </div>
      </section>

      <main>
        <header>
          <div className="suggestions">
            {MdOutlineFreeCancellation()} {feedbacks.length} Suggestions
          </div>

          <div>
            <label htmlFor="sort">Sort by : </label>
            <select name="sort" id="sort" onInput={selectSortHandler} defaultValue={sortType}>
              <option value="0">Most Upvotes</option>
              <option value="1">Least Upvotes</option>
              <option value="2">Most Comments</option>
              <option value="3">Least Comments</option>
            </select>
          </div>

          <button type="button" className="addFeedback" onClick={activateForm}>
            + Add Feedback
          </button>
        </header>

        {
          feedbacks.filter(feedback => selectTag === 'All' || feedback.tag === selectTag)
            .map(feedback => <FeedbackCard key={feedback.id} feedback={feedback} />)
        }
      </main>

      {
        showForm && <FeedbackForm tags={tags} hideForm={hideForm} feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
      }
    </div>
  );
}

export default MainScreen;
