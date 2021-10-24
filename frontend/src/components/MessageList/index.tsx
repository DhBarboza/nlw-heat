import styles from "./styles.module.scss";
import LogoImg from "../../assets/logo.svg";

function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Estou muito ansioso por este evento, com certeza vai ser o melhor do
            ano.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/DhBarboza.png"
                alt="Douglas Henrique"
              />
            </div>
            <span>Douglas Henrique</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Estou muito ansioso por este evento, com certeza vai ser o melhor do
            ano.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/DhBarboza.png"
                alt="Douglas Henrique"
              />
            </div>
            <span>Douglas Henrique</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export { MessageList };
