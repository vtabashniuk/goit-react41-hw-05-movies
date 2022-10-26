export const makeImagePath = (base_url, sizes, image_path, type) => {
  let size = '';
  let image_size = '';

  switch (type) {
    case 'details':
      size = 'w342';
      break;
    case 'cast':
      size = 'w185';
      break;
    default:
  }

  image_size = sizes.filter(item => item === size);

  return `${base_url}${image_size}${image_path}`;
};
