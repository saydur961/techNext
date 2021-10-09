export const fetchApi = async (url: string, 
  meth: 'GET'|'POST'|'PATCH'|'DELETE', 
  data: any={}) => {
  const fetchCall = await fetch(url, {
    method: meth,
    headers: {
      'Content-Type': 'application/json'
    },
    ...( ['POST','PATCH'].includes(meth) && { body: data } )
  });
  return fetchCall;
}