function form_submit()
{
  const inputIdText = document.querySelector('#adminId')
  const inputPwText = document.querySelector('#adminPw')

  if(inputIdText.value === '' || inputPwText.value === '')
  {
    return alert("아이디 또는 비밀번호를 입력하시기 바랍니다.")
  }
  
  axios.post('/admin/login', {
    id: inputIdText.value,
    pw: inputPwText.value
  })
    .then(function (response) {
      if(response.data === 'fail')
      {
        return alert('아이디 또는 비밀번호를 확인하시기 바랍니다.')
      }

      location.href = '/admin'
    })
    .catch(function (error) {
      console.error(error)
    }) 
}

function move_page(url)
{
  return location.href = url
}