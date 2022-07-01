function submit_login()
{
  const loginIdValue = document.querySelector("#loginId").value
  const loginPwValue = document.querySelector("#loginPw").value

  if (loginIdValue === "" || loginPwValue === "")
  {
    return alert("아이디 또는 비밀번호를 입력하시기 바랍니다.")
  }
  else
  {
    axios.post("/login", {
      Id: loginIdValue,
      Pw: loginPwValue
    })
    .then((response) => {
      if(response.data === "Y")
      {
        location.href = "/"
      }
      else
      {
        alert("아이디 또는 비밀번호가 다릅니다.")
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }
}