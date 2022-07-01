function share_url()
{
  const dummy = document.createElement("input")
  const text = location.href
  
  document.body.appendChild(dummy)
  dummy.value = text
  dummy.select()
  document.execCommand("copy")
  document.body.removeChild(dummy)

  return alert("링크가 복사되었습니다.")
}

function logout()
{
  axios.post('/logout', {

  })
  .then((response) => {
    if (response.data === 'Y')
    {
      return location.href = "/"
    }
  })
  .catch((err) => {
    console.error(err)
  })
}