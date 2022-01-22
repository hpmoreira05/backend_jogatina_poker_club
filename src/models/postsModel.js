const connection = require('../connection');

const createMatch = async ({match}) => {
  const db = await connection();
  const createdMatch = await db.collection('matches').insertOne({match})
  return { message: 'Match created succesfully', createdMatch };
}

const createSemester = async ({semester}) => {
  const db = await connection();
  const createdSemester = await db.collection('semester').insertOne({semester})
  return { message: 'Semester created succesfully', createdSemester };
}

const createUserResult = async ({ match, name, total, buyin, semester }) => {
  const db = await connection();
  const userResult = await db.collection('results')
    .insertOne({ 
      match,
      name,
      createdAt: new Date().toLocaleString(),
      total,
      buyin,
      semester
    });
  return { message: 'Post created succesfully', userResult };
};

const getMatch = async ({match}) => {
  const db = await connection();
  const results = await db.collection('results').find({match}).toArray();
  return results;
};

const getAllMatches = async () => {
  const db = await connection();
  const matches = await db.collection('matches').find().toArray();
  return matches;
};

const getAllSemesters = async () => {
  const db = await connection();
  const semesters = await db.collection('semester').find().toArray();
  return semesters;
};

const getAllResults = async({semester}) => {
  const db = await connection();
  const results = await db.collection('results').find({semester}).toArray();
  return results;
}

const getResultsByPlayer = async ({name, semester}) => {
  const db = await connection();
  const results = await db.collection('results').find({ name, semester }).toArray();
  return results;
};


// const editPost = async ({ id, title, description }) => {
//   const db = await connection();
//   await db.collection('posts')
//     .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { 
//       title,
//       description,
//       updatedAt: new Date().toLocaleString('en-US'),
//     } });
//   return { message: 'Post updated successfully' };
// };

const deleteMatch = async ({match}) => {
  const db = await connection();
  await db.collection('results').deleteMany({ match });
  await db.collection('matches').deleteOne({match})
  return { message: 'Match deleted successfully' };
};

module.exports = {getAllResults, getAllMatches, createMatch, createUserResult, getMatch, getResultsByPlayer, deleteMatch, createSemester, getAllSemesters};