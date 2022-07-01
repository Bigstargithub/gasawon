function regist_class() {
  const className = document.querySelector("#class_name").value
  const classTeacherName = document.querySelector("#class_teacher").value
  const classOpenDate = document.querySelector("#opn_d").value
  const classOpenTime = document.querySelector("#opn_t").value

  if (className === '')
  {
    return alert("클래스명을 입력하시기 바랍니다.")
  }
  
  if (classTeacherName === '')
  {
    return alert("강사명을 입력하시기 바랍니다.")
  }

  if (classOpenDate === '')
  {
    return alert("오픈일자를 입력하시기 바랍니다.")
  }

  if (classOpenTime === '')
  {
    return alert("오픈일시를 입력하시기 바랍니다.")
  }

  return document.class_form.submit()
}

function delete_class(seq)
{
  if(confirm("정말 삭제하시겠습니까?"))
  {
    axios.delete(`/admin/class/delete/${seq}`, {

    })
    .then((response) => {
      const result = response.data
      if(result === 'Y')
      {
        return location.reload()
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

function search_class(seq)
{
  const searchClass = document.querySelector("#search-word").value

  return location.href = `/admin/class?seq=${seq}&id=${searchClass}`
}