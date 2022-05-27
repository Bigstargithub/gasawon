function regist_file(file) {
  const path = file.value

  const fileLength = path.length
  const fileDot = path.lastIndexOf(".")
  const fileType = path.substring(fileDot+1, fileLength).toLowerCase()
  
  if(fileType !== 'csv')
  {
    return alert('csv 파일만 등록하시기 바랍니다.')
  }

  axios.post('/admin/user/regist', {
    file
  })
  .then((res) => {
    
  })
  .catch((err) => {
    console.error(err)
  })
}