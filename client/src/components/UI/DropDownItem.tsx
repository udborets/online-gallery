import { IDropDownItemProps } from '../../models/IDropDownItemProps';

const DropDownItem = ({ text, fn, className }: IDropDownItemProps) => {
  return (
    <button onClick={() => fn()}
      className={className ? className : "nav-profile__option"}>
      {text}
    </button>
  )
}

export default DropDownItem