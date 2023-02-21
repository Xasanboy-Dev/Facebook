import { setFalse } from "../Ts_files/publics";

export function Emoji() {
  function clicked(str: string) {
    alert(str);
  }
  return (
    <div className="cursor-pointer">
      <ul className="flex text-center">
        <h4 onClick={setFalse} className="border rounded-full fixed ml-[105px]">
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
        <li onClick={() => clicked("😀")}>&#128512;</li>
        <li onClick={() => clicked("😄")}>&#128516;</li>
        <li onClick={() => clicked(`&#128525;`)}>&#128525;</li>
      </ul>
      &#128151;&#128512; &#128516; &#128525; &#128151;
    </div>
  );
}
