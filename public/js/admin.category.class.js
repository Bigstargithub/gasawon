function search_class(seq)
{
  const searchText = document.querySelector("#search_text").value
  if (searchText === "")
  {
    return alert("검색어를 입력하시기 바랍니다.")
  }

  return location.href = `/admin/category/class/${seq}?title=${searchText}`
}

function category_class_regist(classSeq) {
  const categorySeq = document.querySelector("#seq").value

  axios.post(`/admin/category/class/${categorySeq}`, {
    classSeq
  })
  .then((response) => {
    if(response.data === 'Y')
    {
      alert('등록되었습니다.')
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

function category_class_delete(categoryClassSeq)
{
  if (confirm("정말로 삭제하시겠습니까?"))
  {
    axios.delete(`/admin/category/class/${categoryClassSeq}`, {

    })
    .then((response) => {
      if (response.data === 'Y')
      {
        alert('삭제되었습니다.')
        return location.reload()
      }
      else
      {
        return alert('관리자에게 문의하시기 바랍니다.')
      }
    })
  } 
}

function submit_form()
{
  return document.category_class_form.submit()
}