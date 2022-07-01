function move_previous_page(seq,id = '')
{

  if(seq == 0 && id == '') return location.href = window.location.pathname;
  else if(seq == 0 && id != '') return location.href = `${window.location.pathname}?id=${id}`
  
  return location.href = `${window.location.pathname}?seq=${seq}&id=${id}`
}
function move_next_page(seq, max, id='')
{
  if(seq > max) return location.href = `${window.location.pathname}?seq=${max}&id=${id}`
  return location.href = `${window.location.pathname}?seq=${seq}&id=${id}`
}