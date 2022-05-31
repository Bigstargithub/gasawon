function search_video()
{
  const searchWord = document.querySelector('#search-word').value
  if (searchWord === '')
  {
    return alert('검색어를 입력하시기 바랍니다.')
  }

  return location.href = `/admin/video?search=${searchWord}`
}