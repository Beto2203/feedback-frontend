import { useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';

function FeedbackCard({ feedback }) {
  const { title, likes, content, tag } = feedback;


  const likeHandler = (e) => {
    e.stopPropagation();
    console.log('LIKEEE');
  };

  const clickFeedback = () => {
    console.log('FEEED');
  };

  return (
    <div className="feedbackCard card" onClick={clickFeedback}>
      <div className="likes" onClick={likeHandler}>
        <i>{MdArrowUpward()}</i>
        {likes}
      </div>

      <div className="cardContent">
        <h4>{title}</h4>
        <p>{content}</p>
        <div>{tag}</div>
      </div>

      <div className="comments">
        comments
      </div>
    </div>
  );
}

function Tag() {

  return (
    <div className="tag">

    </div>
  );
}

function MainScreen() {
  const [sortType, setSortType] = useState('0');

  const sortOptions = [
    (a, b) => a.id - b.id,
    (a, b) => b.id - a.id,
    (a, b) => b.comments.length - a.comments.length,
    (a, b) => a.comments.length - b.comments.length
  ];
  const selectSortHandler = (e) => {
    setSortType(e.target.value);
  };

  const feedbacks = [
    {
      title: 'Add tags for solutions',
      content: 'Easier to search for solutions based on a specific stack fasdfasasfsdfsafdsdassdf  sdfsdf sdf asfdsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddf asdf sfd asdf  asfasfasfsfdasfasfsfsd f  sdfasf dsfa sdfaasfd sadf safasfasfdsafdasdfas.',
      tag: 'Feature',
      likes: 47,
      comments: [],
      id: 1
    },
    {
      title: 'Enable dark mode',
      content: 'Easier to search for  based on a specific stackf dsfa sdfaasfd sadf .',
      tag: 'UI',
      likes: 22,
      comments: [1,2],
      id: 2
    }
  ];
  feedbacks.sort(sortOptions[sortType]);

  return (
    <div className="mainScreen">
      <section className="menu">
        <div className="card" id="title">
          Feedback Board
        </div>
        <div className="card">
          All UI, UX
        </div>
      </section>

      <main>
        <header>
          <div>
            {feedbacks.length} Suggestions
          </div>

          <div>
            <label htmlFor="sort">Sort by : </label>
            <select name="sort" id="sort" onInput={selectSortHandler} defaultValue="0">
              <option value="0">Most Upvotes</option>
              <option value="1">Least Upvotes</option>
              <option value="2">Most Comments</option>
              <option value="3">Least Comments</option>
            </select>

          </div>

          <button type="button" className="addFeedback">
            + Add Feedback
          </button>
        </header>
        {feedbacks.map(feedback => <FeedbackCard key={feedback.id} feedback={feedback} />)}
        <section className="feedback">
        </section>
      </main>
    </div>
  );
}

export default MainScreen;
