function user_search(seq) 
{
  const searchText = document.querySelector("#search-text").value
  const groupName = document.querySelector("#groupName").value

  return location.href = `/admin/user/group/detail/${groupName}?seq=${seq}&id=${searchText}`
}

function write_user_group(userSeq)
{
  const groupName = document.querySelector("#groupName").value
  axios.post('/admin/user/group/', {
    userSeq,
    groupName
  })
  .then((response) => {
    if (response.data === 'Y')
    {
      alert('등록되었습니다.')
      return location.reload()
    }
  })
  .catch((err) => {
    console.error(err)
  })
}

function delete_user_group(groupSeq)
{
  if (confirm("정말 삭제하시겠습니까?"))
  {
    axios.delete(`/admin/user/group/${groupSeq}`, {
    })
    .then((response) => {
      if (response.data === 'Y')
      {
        alert('삭제되었습니다.')
        return location.reload()
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }
}