import classNames from 'classnames';
import styles from './Helloworld.module.css';

let cx = classNames.bind(styles);

export interface IHelloWorld {
  text: string;
  color?: string;
  variant?: string;
};

export const Helloworld = ({ text, color, variant }: IHelloWorld) => {
  let className = cx(
    styles.text,
    {
      [styles.textAccent]: color === "accent",
      [styles.textStrong]: variant === "strong",
    }
  );
  return <div className={className}>{text}</div>;
};
