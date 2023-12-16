import format from 'date-fns/format';

export const formatDate = (updatedAt) => {
  let date = null;
  if (updatedAt) {
    const x = new Date(updatedAt);
    date = format(x, 'MMMMMM dd, yyyy');
  }
  return date;
};

export const articleData = (data) => {
    const { body, description, title, ...tags } = data;
    const allTags = Object.entries(tags).map((el) => el[1]);
    const tagList = [...new Set(allTags.filter((element) => element.trim() !== ''))];
    return { body, description, title, tagList };
}