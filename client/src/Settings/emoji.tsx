import another from "node-emoji"
export function Emoji({ letter, setShowEmoji, setimegFromOtgerPage }: { letter: string, setShowEmoji: (show: boolean) => void, setimegFromOtgerPage: (letter: string) => void }) {
  let ul = document.querySelector(".ul")
  another.get("man-swimming")
  for (let i = 0; i <= 100; i++) {
    let li: any = document.createElement("li")
    li.classList = 'cursor-pointer text-light border border-light rounded-full text-center'
    let random = another.random()
    li.textContent = random.emoji
    li.addEventListener("click", () => {
      alert("Clicked")
      setimegFromOtgerPage(letter + random.emoji)
    })
    ul?.append(li)
  }

  return (
    <div className="flex justify-space">
      <h4 onClick={() => setShowEmoji(false)} className="bg-red-900 border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-light border rounded-full w-6 h-6"
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
