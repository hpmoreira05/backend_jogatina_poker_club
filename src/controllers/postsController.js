const Posts = require('../services/postsService');

const errorMessage = 'Something went wrong. Try again later';

const createMatch = async (req, res) => {
  try {
    const { match } = req.body;
    const data = await Posts.createMatch({ match });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const createSemester = async (req, res) => {
  try {
    const { semester } = req.body;
    const data = await Posts.createSemester({ semester });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const createUserResult = async (req, res) => {
  try {
    const { match, name, total, buyin, semester } = req.body;
    const data = await Posts.createUserResult({ match, name, total, buyin, semester });
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const getMatch = async (req, res) => {
  try {
    const {match} = req.params;
    const data = await Posts.getMatch({match});
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const getAllResults = async (req, res) => {
  try {
    const {semester} = req.params;
    const data = await Posts.getAllResults({semester});
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const getResultsByPlayer = async (req, res) => {
  try {
    const { name, semester } = req.params;
    const data = await Posts.getResultsByPlayer({name, semester});
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

const getAllMatches = async (req, res) => {
  try {
    const data = await Posts.getAllMatches();
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

const getAllSemesters = async (req, res) => {
  try {
    const data = await Posts.getAllSemesters();
    if (data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Try again later' });
  }
};

// const editPost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     const data = await Posts.editPost({ id, title, description });
//     if (data.err) {
//       return res.status(data.err.code).json(data.err.message); 
//     }
//      return res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: errorMessage });
//   }
// };

const deleteMatch = async (req, res) => {
  try {
    const { match } = req.body;
    const data = await Posts.deleteMatch({match});
    if (data && data.err) {
      return res.status(data.err.code).json(data.err.message); 
    }
     return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessage });
  }
};

module.exports = {getAllResults, getAllMatches ,createUserResult, createMatch, deleteMatch, getResultsByPlayer, getMatch, createSemester, getAllSemesters };