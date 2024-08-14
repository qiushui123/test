export const addAPI = (newData:any) => {
  console.log(newData)
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: "2" })
    }, 1000)
  })
}

export const deleteAPI = () => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true
      })
    }, 1000)
  })
}