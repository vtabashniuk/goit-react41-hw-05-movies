import { getCast, getConfiguration } from 'api/fetchFunction';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeImagePath } from 'utils/makeImagePath';
import styles from './Cast.module.css';
import noImagePlaceholder from 'no-image-placeholder.svg';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Error } from 'components/Error/Error';

const override = {
  display: 'block',
  position: 'absolute',
  left: '50%',
  top: '5%',
  transform: 'translate(-200%, -50%)',
};

export const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcData = async id => {
      try {
        const data = await getCast(id);
        const { secure_base_url, poster_sizes } = await getConfiguration();
        const castProfiles = data.map(item => ({
          cast_id: item.cast_id,
          character: item.character,
          name: item.name,
          photo: makeImagePath(
            secure_base_url,
            poster_sizes,
            item.profile_path,
            'cast'
          ),
        }));
        setCast(castProfiles);
      } catch (error) {
        setErrorMessage(error.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    };
    fetcData(id);
  }, [id]);

  return (
    <div className={styles.castSection}>
      <h2 className={styles.title}>Cast</h2>
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
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map(({ cast_id, photo, character, name }) => (
            <li key={cast_id} className={styles.castItem}>
              <div className={styles.castBox}>
                <img
                  className={styles.castImg}
                  src={photo}
                  alt={`${name}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = noImagePlaceholder;
                  }}
                />
                <h4 className={styles.name}>Name: {name}</h4>
                <p className={styles.character}>Character: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no cast published yet.</p>
      )}
    </div>
  );
};
