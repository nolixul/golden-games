import { useParams } from 'react-router';
import { useState } from 'react';
import useComments from '../hooks/useComments';
import useSelectedReview from '../hooks/useSelectedReview';
import { patchReviewVotes } from '../utils/api';

import PostComment from './PostComment';
import Box from '../components/Box';

const Review = () => {
  const [reviewVotes, setReviewVotes] = useState(0);
  const { review_id } = useParams();

  const { selectedReview, isLoading, hasError, error } =
    useSelectedReview(review_id);

  const { comments } = useComments(review_id);

  const updateVotes = () => {
    setReviewVotes((currVotes) => currVotes + 1);
    patchReviewVotes(review_id);
  };

  if (hasError) return <p>This review doesn't exist!</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='Review'>
      <Box>
        <section className='fullReview'>
          {' '}
          <p>{selectedReview.owner}</p>
          <p>{selectedReview.created_at}</p>
          <img
            src={selectedReview.review_img_url}
            alt='game being reviewed'
            style={{ height: '100px' }}
          ></img>
          <h1>{selectedReview.title}</h1>
          <p>{selectedReview.review_body}</p>
          <p>{selectedReview.designer}</p>
          <p>{selectedReview.category}</p>
          <p>Votes: {selectedReview.votes + reviewVotes}</p>
          <button onClick={updateVotes}>⬆️</button>
        </section>
      </Box>
      <section>
        <ul className='commentsList'>
          <Box>
            <PostComment />
          </Box>
          {comments.map((comment) => {
            return (
              <Box>
                <li>
                  <p>{comment.body}</p>
                  <p>{comment.author}</p>
                  <p>{comment.created_at}</p>
                  <p>Votes: {comment.votes}</p>
                </li>
              </Box>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Review;
