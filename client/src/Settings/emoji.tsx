import another from "node-emoji"
export function Emoji({ setShowEmoji, setimegFromOtgerPage }: { setShowEmoji: (show: boolean) => void, setimegFromOtgerPage: (letter: string) => void }) {
  let ul = document.querySelector(".ul")
  another.get("man-swimming")
  let textarea = document.querySelector(".textarea")
  for (let i = 0; i <= 100; i++) {
    let li: any = document.createElement("li")
    li.classList = 'cursor-pointer text-light border border-light rounded-full text-center'
    let random = another.random()
    li.textContent = random.emoji
    li.addEventListener("click", () => {
      let letter = textarea?.textContent
      setimegFromOtgerPage(letter + random.emoji)
    })
    ul?.append(li)
  }

  return (
    <div className="flex justify-space">
      <h4 onClick={() => setShowEmoji(false)} className=" border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-light fixed border rounded-full w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </h4>
      <ul className="mr-[10px] grid grid-cols-6 bg-dark gap-4 w-[850px] h-[250px] overflow-x-scroll  ul">
      </ul>
    </div>
  );
}
