export const generatePagination = (qty:number,pageSize:number) => {
  const pages = Math.ceil(qty / pageSize)
  const pagesArray = Array.from({length: pages}, (_, index) => index + 1)
  return pagesArray.length>1?pagesArray:[]
}

export const paginationHandler = (page: number, currentRouter:any, fc:()=>void) => {
  let indexOfPageParam = currentRouter.asPath.indexOf('page=')
  let newQuery = indexOfPageParam>0 ? currentRouter.asPath.slice(0, indexOfPageParam):currentRouter.asPath
  fc()
  if (Object.keys(currentRouter.query).length) {
    if (!currentRouter.query.hasOwnProperty('page')) {
      currentRouter.push(`${newQuery}&page=${page}`)
      return
    }
    currentRouter.push(`${newQuery}page=${page}`)
    return 
  }
  currentRouter.push(`${newQuery}?page=${page}`)
}