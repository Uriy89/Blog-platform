import format from 'date-fns/format';

export const formatDate = (updatedAt) => {
  let date = null;
  if (updatedAt) {
    const x = new Date(updatedAt);
    date = format(x, 'MMMMMM dd, yyyy');
  }
  return date;
};
