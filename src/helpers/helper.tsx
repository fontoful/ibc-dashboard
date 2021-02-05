export const getUrl = (pathToFile: string): string => {
  const bucket = 'island-beer-club.appspot.com'
  const img = pathToFile
  const downloadToken = 1
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    img,
  )}?alt=media&token=${downloadToken}`
}
