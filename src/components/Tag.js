function Tag({ tagName, classes, tagHandler }) {

  return (
    <div className={classes} id={tagName} onClick={tagHandler}>
      {tagName}
    </div>
  );
}

export default Tag;
