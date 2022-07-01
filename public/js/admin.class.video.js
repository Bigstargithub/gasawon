function search_video(seq)
{
  const searchText = document.querySelector("#search_text").value
  if (searchText === "")
  {
    return alert("검색어를 입력하시기 바랍니다.")
  }

  return location.href = `/admin/class/video/${seq}?title=${searchText}`
}

function class_video_regist(videoSeq)
{
  const classSeq = document.querySelector("#seq").value

  axios.post(`/admin/class/video/${classSeq}`, {
    videoSeq
  })
  .then((response) => {
    if (response.data === 'Y')
    {
      alert('등록되었습니다.')
      return location.reload()
    }
    else
    {
      alert("관리자에게 문의하시기 바랍니다.")
    }
  })
  .catch((err) => {
    console.error(err)
  })
}

function class_video_delete(seq)
{
  if (confirm("정말 삭제하시겠습니까?"))
  {
    axios.delete(`/admin/class/video/${seq}`, {
    
    })
    .then((response) => {
      if (response.data === 'Y')
      {
        alert('삭제되었습니다.')
        return location.reload()
      }
      else
      {
        alert("관리자에게 문의하시기 바랍니다.")
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }
}

function sumbit_order_form()
{
  return document.class_video_form.submit();
}