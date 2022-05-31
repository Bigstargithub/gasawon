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

function move_previous_page(seq,id = '')
{
  if(seq == 0 && id == '') return location.href = '/admin/user';
  else if(seq == 0 && id != '') return location.href = '/admin/user?id='+id

  return location.href = '/admin/user?seq='+seq+'&id='+id
}
function move_next_page(seq, max, id = '')
{
  if(seq > max) return location.href = '/admin/user?seq='+max+'&id='+id
  return location.href = '/admin/user?seq='+seq+'&id='+id
}

function user_search()
{
  const searchText = document.querySelector("#search-text").value
  return location.href = `/admin/user?id=${searchText}`

}