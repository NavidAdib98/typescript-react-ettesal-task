export function getData(url: string): Promise<any> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`api error with status ${response.status}`);
    }
    return response.json();
  });
}
