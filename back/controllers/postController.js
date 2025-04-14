import { getAllPosts, getPostById, createPost } from '../models/postModel.js';

export const fetchAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: '게시글을 불러오지 못했습니다.' });
  }
};

export const fetchPostById = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: '게시글이 없습니다.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: '게시글을 불러오지 못했습니다.' });
  }
};
export const createNewPost = async (req, res) => {
  try {
    const { title, content, hashtags } = req.body;
    const userId = req.user?.id; // 인증 미들웨어 통해 유저 정보 가져옴
    if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });

    const postId = await createPost(userId, title, content, hashtags);
    res.status(201).json({ id: postId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 작성 실패' });
  }
};

