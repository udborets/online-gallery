const DropDownItem = ({ text, fn, className }: {
  text: string;
  fn: () => any;
  className: string;
}
) => {
  return (
    <button onClick={() => fn()}
      className={className ? className : "nav-profile__option"}>
      {text}
    </button>
  )
}

export default DropDownItem