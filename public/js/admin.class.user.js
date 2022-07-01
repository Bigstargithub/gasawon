function search_class_user(pageNum)
{
  const searchWord = document.querySelector("#search-text").value
  const classSeq = document.querySelector("#seq").value

  return location.href = `/admin/class/user/${classSeq}?seq=${pageNum}&id=${searchWord}`
}

function regist_class_user(seq, guseq)
{
  axios.post(`/admin/class/user`, {
    seq,
    guseq
  })
  .then((response) => {
    if(response.data === 'Y')
    {
      alert('등록되었습니다.')
      return location.reload()
    }
  })
  .catch((err) => {
    console.error(err)
  })
}

function delete_class_user(seq, guseq)
{
  if(confirm('정말 삭제하시겠습니까?'))
  {
    axios.post(`/admin/class/user/delete`, {
      seq,
      guseq
    })
    .then((response) => {
      if(response.data === 'Y')
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

function apply_all_user(classSeq)
{
  if (confirm("전체 회원 등록하시겠습니까?"))
  {
    axios.post('/admin/class/user/all', {
      classSeq
    })
    .then((response) => {
      if (response.data === 'Y')
      {
        alert("전체회원 등록되었습니다.")
        return location.reload()
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }
  
}