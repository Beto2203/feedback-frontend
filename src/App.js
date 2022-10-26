import { useState, useEffect } from 'react';
import MainScreen from './components/MainScreen.js';
import { Routes, Route, useMatch, Navigate } from 'react-router-dom';

import FeedbackBlog from './components/FeedbackBlog.js';
import LoginForm from './components/LoginForm';
import { getAll, setToken } from './Services/feedbacks';

function App() {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectTag, setSelectTag] = useState('All');
  const [sortType, setSortType] = useState('0');

  const selectSortHandler = (e) => {
    setSortType(e.target.value);
  };

  const tags = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

  const tagHandler = (e) => {
    setSelectTag(e.target.id);
  };

  const checkSavedCredentials = () => {
    const loggedUserJSON = window.localStorage.getItem('userFeedbackBlogCredentials');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }
  useEffect(checkSavedCredentials, []);

  const fetchFeedbacks = async () => {
    const res = await getAll();
    setFeedbacks(res);
  };
  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const match = useMatch('feedbackBlog/:id');
  const feedback = match
    ? feedbacks.find(feedback => feedback.id === match.params.id)
    : null;

  const updateLikes = (id) => {
    const feedback = feedbacks.find(f => f.id === id);

    const alreadyLiked = feedback.likes.find(id => id === user.id);
    if (alreadyLiked) {
      feedback.likes = feedback.likes.filter(id => id !== user.id);
    }
    else {
      feedback.likes = feedback.likes.concat(user.id);
    }

    const newFeedbacks = feedbacks.map(f => (f.id === id) ? feedback : f);
    setFeedbacks(newFeedbacks);

    return alreadyLiked;
  };

  const updateComments = (id, comment, removeComment) => {
    if (removeComment) {
      const feedback = feedbacks.find(f => f.id === id);

      feedback.comments = feedback.comments.filter(c => c.id !== comment.id);
      const newFeedbacks = feedbacks.map(f => (f.id === id) ? feedback : f);
      setFeedbacks(newFeedbacks);
    } else {
      const feedback = feedbacks.find(f => f.id === id);

      feedback.comments = feedback.comments.concat(comment);
      const newFeedbacks = feedbacks.map(f => (f.id === id) ? feedback : f);
      setFeedbacks(newFeedbacks);
      console.log(feedback.comments);
    }

  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <MainScreen feedbacks={feedbacks}
                      tags={tags}
                      tagHandler={tagHandler}
                      selectTag={selectTag}
                      selectSortHandler={selectSortHandler}
                      sortType={sortType}
                      setFeedbacks={setFeedbacks}
                      user={user}
                      updateLikes={updateLikes}
          />}
        />
        <Route path="/feedbackBlog/:id" element={user ? <FeedbackBlog
          feedback={feedback}
          updateLikes={updateLikes}
          updateComments={updateComments}
          user={user} /> : <Navigate replace to="/login" />}
        />

        <Route path="/login" element={!user ? <LoginForm user={user} setUser={setUser} title="Sign in" /> : <Navigate replace to="/" />} />

        <Route path="/signup" element={!user ? <LoginForm user={user} setUser={setUser} title="Sign up" signUp={true} /> : <Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
