export const orderTextASC = (data, field) => {
  if (!field) throw new Error("field is required");
  data.sort((a, b) => a[field].localeCompare(b[field]));
  return data;
};

export const orderTextDESC = (data, field) => {
  if (!field) throw new Error("field is required");
  data.sort((a, b) => b[field].localeCompare(a[field]));
  return data;
};

export const orderNumberASC = (data, field) => {
  if (!field) throw new Error("field is required");
  data.sort((a, b) => a[field] - b[field]);
  return data;
};

export const orderNumberDESC = (data, field) => {
  if (!field) throw new Error("field is required");
  data.sort((a, b) => b[field] - a[field]);
  return data;
};
