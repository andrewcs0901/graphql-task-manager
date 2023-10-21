const checkHasUserId = (userId) => {
  if (!userId) {
    throw new Error('You must be logged in to do this');
  }
  return true;
};

export { checkHasUserId };
