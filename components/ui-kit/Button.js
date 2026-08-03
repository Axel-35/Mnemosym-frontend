import Link from 'next/link';
import styles from "./Button.module.css";

function Button({children, href, color="gold", onClick, ...props}) {
    
  let style = {
    gold: styles.btnPrimary,
    blue: styles.btnSecondary 
  }

  if (href) {
    return <Link className={style[color]} href={href}>{children}</Link> 
  } else {
    return <button className={style[color]} onClick={onClick} type="button" {...props}>{children}</button> 
  }
}

export default Button;