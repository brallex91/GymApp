export function generateRandomId() {
  const randomString = Math.random().toString(36).substr(2, 10);
  const timestamp = new Date().getTime().toString(36);
  return randomString + timestamp;
}
