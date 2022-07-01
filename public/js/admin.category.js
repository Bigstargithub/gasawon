function delete_category(seq)
{
  if(confirm("정말 삭제하시겠습니까?"))
  {
    axios.delete(`/admin/category/delete/${seq}`, {

    })
    .then((response) => {
      const result = response.data
      if(result === 'Y')
      {
        return location.reload()
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }
}

function regist_category() 
{
  const categoryName = document.querySelector('#name').value
  if(categoryName === '')
  {
    return alert('카테고리 이름을 입력하시기 바랍니다.')
  }
  
  document.regist_form.submit()
}

function category_search(seq)
{ 
  const searchCate = document.querySelector("#search-text").value
  return location.href = `/admin/category?seq=${seq}&id=${searchCate}`
}