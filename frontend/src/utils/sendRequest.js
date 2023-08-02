const domain = process.env.REACT_APP_SERVER_URL

export const sendPostRequest = async(uri, data)=>{
    const response = await fetch(`${domain}${uri}`,{ method:'POST',credentials:'include', headers:{"Content-type":'application/json'}, body: JSON.stringify(data)})
    const res = await response.json()
    return res;
}
export const sendPutRequest = async(uri, data)=>{
    const response = await fetch(`${domain}${uri}`,{ method:'PUT',credentials:'include', headers:{"Content-type":'application/json'}, body: JSON.stringify(data)})
    const res = await response.json()
    return res;
}
export const sendDeleteRequest = async(uri)=>{
    const response = await fetch(`${domain}${uri}`,{ method:'DELETE',credentials:'include', headers:{"Content-type":'application/json'}})
    const res = await response.json()
    return res;
}

export const sendGETRequest = async(uri)=>{
    const response  = await fetch(`${domain}${uri}`,{method:"GET",credentials:'include',headers:{"Content-type":'application/json'}})
    const res = await response.json()
    return res;
}