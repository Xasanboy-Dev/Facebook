export function Emoji() {
  function clicked(str: string) {
    alert(str);
  }
  return (
    <div className="cursor-pointer">
      <ul>
        <li onClick={() => clicked("😀")}>&#128512;</li>
        <li onClick={() => clicked("😄")}>&#128516;</li>
        <li onClick={() => clicked(`&#128525;`)}>&#128525;</li>
      </ul>
      &#128151;&#128512; &#128516; &#128525; &#128151;
    </div>
  );
}
