export const calculatePagination = (currentPage, itemsPerPage, data) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
    return currentItems;
  };

  export const calculatePageIndices = (currentPage, itemsPerPage) => {
    const firstIndex = (currentPage - 1) * itemsPerPage + 1;
    const lastIndex = firstIndex + itemsPerPage - 1;
  
    return { firstIndex, lastIndex };
  };