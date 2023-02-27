const ModalTemplate = (props: any) => {
  return (
    <div className='modal'>
      <div className='modal__darkness'>
        <div className="modal__window">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default ModalTemplate