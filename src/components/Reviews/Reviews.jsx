import { getReviews } from 'api/fetchFunction';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Reviews.module.css';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Error } from 'components/Error/Error';

const override = {
  display: 'block',
  position: 'absolute',
  left: '50%',
  top: '5%',
  transform: 'translate(-200%, -50%)',
};

export const Reviews = () => {
  const { id } = useParams();
  const [review, setReview] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async id => {
      try {
        const reviews = await getReviews(id);
        setReview(reviews);
      } catch (error) {
        setErrorMessage(error.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(id);
  }, [id]);

  return (
    <div className={styles.reviewSection}>
      <h2 className={styles.title}>Reviews</h2>
      {isLoading && (
        <PacmanLoader
          color="#f7c23b"
          loading={isLoading}
          size={75}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
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
    </div>
  );
};
