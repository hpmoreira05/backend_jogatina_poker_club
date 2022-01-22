const Posts = require('../models/postsModel');

const createMatch = async ({match}) => {
  if (!match) {
    return { err: { code: 400, message: { message: 'Invalid entries. Try again.' } } };
  }
  const matches = await Posts.createMatch({ match });
  return matches;
};

const createSemester = async ({semester}) => {
  if (!semester) {
    return { err: { code: 400, message: { message: 'Invalid entries. Try again.' } } };
  }
  const semesters = await Posts.createSemester({ semester });
  return semesters;
};

const createUserResult = async ({ match, name, total, buyin, semester }) => {
  if (!name || !match || !total || !buyin) {
    return { err: { code: 400, message: { message: 'Invalid entries. Try again.' } } };
  }
  const result = await Posts.createUserResult({ match, name, total, buyin, semester });
  return result;
};

const getMatch = async ({match}) => {
  const matches = await Posts.getMatch({match});
  return matches;
};

const getAllMatches = async () => {
  const matches = await Posts.getAllMatches();
  return matches;
};

const getAllSemesters = async () => {
  const semesters = await Posts.getAllSemesters();
  return semesters;
};

const getAllResults = async ({semester}) => {
  const results = await Posts.getAllResults({semester});
  return results;
};

const getResultsByPlayer = async ({name, semester}) => {
  const results = await Posts.getResultsByPlayer({name, semester});
  if (!results) {
    return { err: { code: 404, message: { message: 'Results not found' } } };
  }
  return results;
};

// const editPost = async ({ id, title, description }) => {
//   if (!title || !description) {
//     return { err: { code: 400, message: { message: 'Invalid entries. Try again.' } } };
//   }
//   const editedPost = await Posts.editPost({ id, title, description });
//   return editedPost;
// };

const deleteMatch = async ({match}) => {
  const data = await Posts.deleteMatch({match});
  return data;
};

module.exports = {getAllResults, getAllMatches ,createUserResult, createMatch, deleteMatch, getResultsByPlayer, getMatch, createSemester, getAllSemesters };