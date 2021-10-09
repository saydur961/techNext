const formatDate = (dt: Date): string => {
  const getMonth = dt.getMonth()+1;
  const getDay = dt.getDate();
  const getYear = dt.getFullYear();
  return `${getYear}-${getMonth}-${getDay}`;
}

export const getDate = 
( type: 'prev_week'| 'prev_month'| 'prev_year'| 'current' ): string => {
  const dt = new Date();
  if(type === 'prev_week') {
    return formatDate(new Date(dt.setDate(dt.getDate()-7)));
  } else if(type === 'prev_month') {
    return formatDate(new Date(dt.setMonth(dt.getMonth()-1)));
  } else if(type === 'prev_year') {
    return formatDate(new Date(dt.setFullYear(dt.getFullYear()-1)));
  }
  return formatDate(new Date());
}

