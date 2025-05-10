const Post = require('../models/KnowledgePost');
const path = require('path');

exports.createPost = async (req, res) => {
  try {
    const { name, email, experience } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new Post({ name, email, experience, imagePath });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const search = req.query.search || '';
    const posts = await Post.find({
      experience: { $regex: search, $options: 'i' },
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};
