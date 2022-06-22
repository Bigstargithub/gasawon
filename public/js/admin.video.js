function search_video()
{
  const searchWord = document.querySelector('#search-word').value
  if (searchWord === '')
  {
    return alert('검색어를 입력하시기 바랍니다.')
  }

  return location.href = `/admin/video?search=${searchWord}`
}

// 영상 등록 함수
function regist_video()
{
  const videoName = document.querySelector("#video_name").value
  const videoTeacher = document.querySelector("#video_teacher").value
  const videoThumb = document.querySelector("#video_thumb").value
  const vimeoKey = document.queryCommandValue("#vimeo_key").value

  // 영상명이 없다면?
  if (videoName === '')
  {
    return alert("영상명을 입력하시기 바랍니다.")
  }
  
  // 강사명이 없다면?
  if (videoTeacher === '')
  {
    return alert("강사명을 입력하시기 바랍니다.")
  }

  // 썸네일이 없다면?
  if (videoThumb === '')
  {
    return alert("썸네일을 등록하시기 바랍니다.")
  }

  if (vimeoKey === '')
  {
    return alert("비메오 키를 입력하시기 바랍니다.")
  }

  return document.video_regist.submit()
}

// 영상 등록 함수
function modify_video()
{
  const videoName = document.querySelector("#video_name").value
  const videoTeacher = document.querySelector("#video_teacher").value
  const vimeoKey = document.queryCommandValue("#vimeo_key").value

  // 영상명이 없다면?
  if (videoName === '')
  {
    return alert("영상명을 입력하시기 바랍니다.")
  }
  
  // 강사명이 없다면?
  if (videoTeacher === '')
  {
    return alert("강사명을 입력하시기 바랍니다.")
  }

  if (vimeoKey === '')
  {
    return alert("비메오 키를 입력하시기 바랍니다.")
  }

  return document.video_regist.submit()
}