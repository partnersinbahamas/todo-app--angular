export function getUniqId(data: any) {
  let max: number = data[0].id;
  
  for (const item of data) {
    if (item.id > max) {
      max = item.id;
    }
  }
  
  return max + 1;
};
