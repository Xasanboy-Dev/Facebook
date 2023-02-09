export default function Profile() {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/login'
    return <div></div>
  }
  return (
    <div>
      <div className="img">
      </div>
    </div>
  )
}
