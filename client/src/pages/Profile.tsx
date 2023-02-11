import axios from "axios"

export default function Profile() {
  let token = localStorage.getItem('token')
  let name: any
  if (!token) {
    window.location.href = '/login'
    return
  } else {
    axios.post('http://localhost:8080/data', { token })
      .then(res => {
        if (res.status !== 200) {
          window.location.href = '/login'
          localStorage.removeItem("token")
          return <div>Hello</div>
        } else {
          name = res.data.token.name
        }
      })
    const div: HTMLBodyElement | null = document.querySelector(`.FIRST`)
    const IconImage: HTMLBodyElement | null = document.querySelector(".iconImage")
    hello(IconImage)
    async function hello(str: HTMLBodyElement | null) {
      str!.style.color = 'white'
    }
    div?.addEventListener('mouseover', (ev) => {
      IconImage!.style.color = 'black'
    })
    div?.addEventListener('mouseleave', (ev) => {
      IconImage!.style.color = 'white'
    })
  }
  return (
    <div>
      <div className="img m-2 rounded-xl">
        <ul className="flex items-end mb-4">
          <li className="p-2">
            <div className="flex items-end">
              <div className="FIRST flex justify-content-center items-end rounded-full image border cursor-pointer">
                <div className="hover iconImage">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20  h-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="">
                  <img src="" />
                </div>
              </div>
              <a className="border  p-2 cursor-pointer rounded-full">Name of User</a>
            </div>
          </li>
          <li className="">
            <a>Hello</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
