export function getUniqId(data: any) {
  if (Array.isArray(data)) {
    if (data.length > 0) {
      let max: number = data[0].id;
  
      for (const item of data) {
        if (item.id > max) {
          max = item.id;
        }
      }
      
      return max + 1;
    }

    return 1;
  }

  return -1;
};
