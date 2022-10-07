export const makeImagePath = (base_url, sizes, image_path, type) => {
  let size = '';
  let image_size = '';
  
  if (type === 'details') {
    size = 'w342';
    image_size = sizes.filter(item => item === size);
  }

  return `${base_url}${image_size}${image_path}`;
};
