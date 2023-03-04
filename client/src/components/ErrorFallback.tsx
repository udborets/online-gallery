import "../styles/components/ErrorFallback.scss";

const ErrorFallback = () => {
  return (
    <div className="fallback">
      <div className="fallback__container">
        <div className="fallback__oops">
          Oops!
        </div>
        <div className="fallback__message">
          Something went wrong!
          <br />
          Reload the page, and if it doesn't work, please, contact me:
          <br />
          <a className="fallback__link" href="https://t.me/udborets">https://t.me/udborets</a>
          <br />
          <a className="fallback__link" href="https://vk.com/udborets">https://vk.com/udborets</a>
          <br />
          <a className="fallback__link" href="mailto:udborets@gmail.com">udborets@gmail.com</a>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback