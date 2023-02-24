export const getSuccessStyles = (status: boolean) => {
  if (status) {
    return 'inline-block text-white rounded-2xl px-3 py-1 text-sm bg-green-600'
  }
  return 'inline-block text-white rounded-2xl px-3 py-1 text-sm bg-red-500'
} 

export const extractIdFromSlug = (slug:string)=> {
  const index = slug.lastIndexOf('-p-');
  return slug.slice(index + 3);
}