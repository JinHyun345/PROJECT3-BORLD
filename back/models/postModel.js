import db from './db.js';

export const getAllPosts = async () => {
  const [rows] = await db.query('SELECT id, title, created_at FROM posts ORDER BY created_at DESC');
  return rows;
};

export const getPostById = async (id) => {
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
};

export const createPost = async (userId, title, content, hashtags) => {
  const [result] = await db.query(
    'INSERT INTO posts (user_id, title, content, hashtags) VALUES (?, ?, ?, ?)',
    [userId, title, content, hashtags]
  );
  return result.insertId;
};
