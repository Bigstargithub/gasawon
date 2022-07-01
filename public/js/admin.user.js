function update_user()
{
  const seq = document.querySelector('#user_seq').value
  const name = document.querySelector('#guname').value
  const mobile = document.querySelector('#gumobile').value
  const email = document.querySelector('#guemail').value

  axios.post('/admin/user/detail/'+seq, {
    seq,
    name,
    mobile,
    email
  })
  .then((response) => {
    if(response.data === 'Y')
    {
      alert('저장되었습니다.')
      return location.reload()
    }
    else
    {
      return alert('관리자에게 문의하시기 바랍니다.')
    }
  })
  .catch((error) => {
    console.error(error)
  })
}

function user_search()
{
  const searchText = document.querySelector("#search-text").value
  return location.href = `/admin/user?id=${searchText}`
}

function reset_password(seq)
{
  axios.post(`/admin/user/reset/${seq}`, {

  })
  .then((response) => {
    if (response.data === 'Y')
    {
      alert("초기화되었습니다.")
      return location.reload()
    }
  })
  .catch((err) => {
    console.error(err)
  })
}
