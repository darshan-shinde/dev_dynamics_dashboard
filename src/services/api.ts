
export const fetchData = async (): Promise<any> => {
  const response = await fetch('/sample-data.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};