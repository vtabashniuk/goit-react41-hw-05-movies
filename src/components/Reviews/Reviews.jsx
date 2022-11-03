import { getReviews } from 'api/fetchFunction';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Reviews.module.css';

export const Reviews = () => {
  const { id } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchData = async id => {
      const reviews = await getReviews(id);
      setReview(reviews);
    };
    fetchData(id);
  }, [id]);

  return (
    <>
      <h2 className={styles.title}>Reviews</h2>
      {review.length > 0 ? (
        <ul className={styles.reviewList}>
          {review.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <div className={styles.reviewInfo}>
                <h4 className={styles.author}>Author: {author}</h4>
                <p className={styles.reviewText}>{content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no reviews yet.</p>
      )}
    </>
  );
};
