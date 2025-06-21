// localStorage.clear('member')
const membership_id = document.getElementById('membership-id')
const attendance_mark = document.getElementById('attendance_mark')
const gym_name = document.getElementById('gym_name')
const member_name = document.getElementById('member-name')
const member_expiry = document.getElementById('member-expiry')
const member_days = document.getElementById('member-days')
const member_remaining = document.getElementById('member-remaining')
const member_img = document.getElementById('member-image')
const alert = document.getElementById('status')
fetch('/memberApi').then((r) => r.json()).then((data) => {
    localStorage.setItem('member', JSON.stringify(data))
})
const member = JSON.parse(localStorage.getItem('member'))

attendance_mark.addEventListener('click', () => {
    console.log(member)
    let temp = member?.find((d) => {
        return d.id === `${gym_name.innerText}${membership_id.value}`
    })
    if (temp) {
        console.log(temp)
        let  remain =  getTotalDays(temp.expiry)
        member_name.textContent = "Name:" + temp.name
        member_expiry.textContent = "Expiry Date:" + temp.expiry
        member_days.textContent = "Total Days:" + temp.total_days
        member_remaining.textContent = "Remaining Days:" + remain
        member_img.src = temp.image
    } else {
        alert.style.color = "red"
        alert.textContent = `The id ${gym_name.textContent + membership_id.value} doesn't exist`
    }
})

function getTotalDays( endDate) {
  const start = new Date();
  const end = new Date(endDate);

  const diffTime = Math.abs(end - start);
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(totalDays)
  return totalDays;
}