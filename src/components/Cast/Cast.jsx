import { getCast, getConfiguration } from 'api/fetchFunction';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeImagePath } from 'utils/makeImagePath';
import styles from './Cast.module.css';
import noImagePlaceholder from 'no-image-placeholder.svg';

export const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetcData = async id => {
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
    };
    fetcData(id);
  }, [id]);

  return (
    <>
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.map(({ cast_id, photo, character, name }) => (
          <li key={cast_id} className={styles.castItem}>
            <div className={styles.castBox}>
              <img
                src={photo}
                alt={`${name}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = noImagePlaceholder;
                }}
              />
              <h4>Name: {name}</h4>
              <p>Character: {character}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
