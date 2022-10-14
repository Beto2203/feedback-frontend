import Tag from './Tag.js';
import { useState } from 'react';

function FormTag({ tag, setTagForm }) {

  return (
    <div className="tag">
      <input type="radio" id={tag.toLowerCase()} name="tagInp" value={tag}
             onInput={(e) => setTagForm(e.target.value)} />
      <label htmlFor={tag.toLowerCase()}>{tag}</label>
    </div>
  );
}

function FeedbackForm({ tags, hideForm, feedbacks, setFeedbacks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagForm, setTagForm] = useState('');

  const submitFormHandler = () => {
    setFeedbacks([{title, content: description, likes: 0, tag: tagForm, comments: [], id: feedbacks.length+1}, ...feedbacks]);
    setTitle('');
    setDescription('');
    setTagForm('');
    hideForm();
  };

  const titleHandler = (e) => {
    setTitle(e.target.value)
  };

  const titleClasses = (title.length > 2 || title.length === 0) ? 'card' : 'card invalid';

  return (
    <>
      <div id="feedbackFormBackground" onClick={hideForm}>
      </div>
      <div id="feedbackForm">
        <form>
          <label htmlFor="title">Title*</label>
          <input type="text"
                 name="title"
                 id="title"
                 value={title}
                 className={titleClasses}
                 onInput={titleHandler}
          />

          <label htmlFor="description">Description</label>
          <textarea name="description"
                    id="description"
                    value={description}
                    className="card"
                    onInput={(e) => setDescription(e.target.value)}
                    placeholder="Add a description here">
        </textarea>

          <fieldset id="tagPicker" className="card">
            <legend>Select a Tag*:</legend>
            {
              tags.filter(tag => tag !== 'All')
                .map(tag => <FormTag key={tag} tag={tag} setTagForm={setTagForm} />)
            }
          </fieldset>
          <button type='button' onClick={submitFormHandler} disabled={!title || title.length < 3 || !tagForm} title="Please fill all required fields">
            Submit Feedback
          </button>
        </form>
      </div>
    </>

  )
}

export default FeedbackForm;
