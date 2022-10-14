import { useState } from 'react';
import MainScreen from './components/MainScreen.js';
import { Routes, Route, useMatch, Navigate } from 'react-router-dom';

import FeedbackBlog from './components/FeedbackBlog.js';
import LoginForm from './components/LoginForm';

let res = [
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
    comments: [1, 2],
    id: 2
  },
  {
    title: 'Idk lol',
    content: 'Clap trap',
    tag: 'UI',
    likes: 0,
    comments: [1, 2, 3, 4, 5],
    id: 3
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState(res);
  const [selectTag, setSelectTag] = useState('All');
  const [sortType, setSortType] = useState('0');

  const selectSortHandler = (e) => {
    setSortType(e.target.value);
  };

  const match = useMatch('feedbackBlog/:id');
  const feedback = match
    ? feedbacks.find(feedback => feedback.id === Number(match.params.id))
    : null;

  const tags = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

  const tagHandler = (e) => {
    setSelectTag(e.target.id);
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
          />}
        />
        <Route path="/feedbackBlog/:id" element={user ? <FeedbackBlog feedback={feedback} /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={!user ? <LoginForm user={user} setUser={setUser} title="Sign in" /> : <Navigate replace to="/" />} />
        <Route path="/signup" element={!user ? <LoginForm user={user} setUser={setUser} title="Sign up" signUp={true} /> : <Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
