export function Emoji({ setShowEmoji }: { setShowEmoji: (show: boolean) => void }) {
  let li = document.querySelectorAll(".emoji")
  length = li.length
  for (let i = 1; i <= length; i++) {
    li[i]?.addEventListener("mouseover", (e: any) => {
      console.log(e.value)
    })
  }
  return (
    <div className="flex cursor-pointer">
      <div className="ml-[25px]">
        <h4 onClick={() => setShowEmoji(false)} className="border rounded-full fixed ml-[105px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </h4>
      </div>
      <ul className="mr-[10px] grid grid-rows-2 grid-flow-col">
        <li className="emoji">😀</li>
        <li className="emoji">😃</li>
        <li className="emoji">😄</li>
        <li className="emoji">😁</li>
        <li className="emoji">😆</li>
        <li className="emoji">😅</li>
        <li className="emoji">🤣</li>
      </ul>
    </div>
  );
}
