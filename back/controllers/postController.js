import pool from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';


export const fetchAllPosts = async (req, res) => {
  console.log("이건오나?");
  try {
    // 커넥션 풀에서 연결을 가져옴
    const [rows] = await pool.execute(`
      SELECT posts.id, posts.title, posts.content, posts.created_at, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
    `);
    console.log(rows);
    res.json(rows); // 클라이언트(fetch)가 받는 데이터
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    res.status(500).json({ error: '서버 에러: 게시글을 불러오지 못했습니다.' });
  }
}

export const createNewPost = async (req, res) => {
  const { title, content, user_id, hashtags } = req.body;
  // 필수 입력값 검증
  if (!title || !content || !user_id) {
    return res.status(400).json({ error: '제목, 내용, 사용자 ID는 필수입니다.' });
  }

  // 해시태그 처리 (null 또는 빈 문자열이면 빈 배열로 대체)
  const formattedHashtags = hashtags ? hashtags : '';
  const newUuid = uuidv4();
  try {
    const [result] = await pool.execute(
      'INSERT INTO posts (title, content, user_id, hashtags, uuid) VALUES (?, ?, ?, ?, ?)',
      [title, content, user_id, formattedHashtags, newUuid]
    );

    res.status(201).json({ message: '게시글 작성 완료', postId: result.insertId });
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    res.status(500).json({ error: '서버 에러: 게시글 작성 실패' });
  }
};

