import emailIcon from "../assets/email_icon.png";
import githubIcon from "../assets/github_icon.png";
import telegramIcon from "../assets/telegram_icon.png";
import vkIcon from "../assets/vk_icon.png";
import "../styles/components/Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__contacts">
          <a
            className="footer__contact"
            href="https://t.me/udborets"
          >
            Telegram
            <img
              className="footer__image"
              src={telegramIcon} alt="" />
          </a>
          <a
            className="footer__contact"
            href="https://github.com/udborets/"
          >
            GitHub
            <img
              className="footer__image"
              src={githubIcon} alt="" />
          </a>
          <a
            className="footer__contact"
            href="https://vk.com/udborets"
          >
            VK
            <img
              className="footer__image"
              src={vkIcon} alt="" />
          </a>
          <a
            className="footer__contact"
            href="udborets@gmail.com"
          >
            Email
            <img
              className="footer__image"
              src={emailIcon} alt="" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer