import React from "react";
import styles from './CharacterCounter.module.css';

export interface CharacterCounterProps {
  counterHelperTextId: string
  counterHelperText: string,
  counterLimit: number,
  counterTextUnderLimit: string,
  counterTextOverLimit: string,
  value: string,
  delayedValue: string,
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  counterHelperTextId,
  counterHelperText,
  counterLimit,
  counterTextUnderLimit,
  counterTextOverLimit,
  value,
  delayedValue
}: CharacterCounterProps) => {
  return (
    <>
      <div id={counterHelperTextId} className="visually-hidden">{counterHelperText}</div>
      <div aria-live="polite" aria-atomic="true">
        {/* text displayed on screen, updated after every change. Hidden for screen readers */}
        {(value.length <= counterLimit) && (
          <div className="mylib--textinput__counter" aria-hidden="true">{counterLimit - value.length} {counterTextUnderLimit}</div>
        )}
        {(value.length > counterLimit) && (
          <div className={`mylib--textinput__counter mylib--textinput__counter_error ${styles.error}`} aria-hidden="true">{value.length - counterLimit} {counterTextOverLimit}</div>
        )}
        {/* text for screen readers, updated after a delay when user stops typing */}
        {(delayedValue.length <= counterLimit) && (
          <div className="visually-hidden">{counterLimit - delayedValue.length} {counterTextUnderLimit}</div>
        )}
        {(delayedValue.length > counterLimit) && (
          <div className="visually-hidden">{delayedValue.length - counterLimit} {counterTextOverLimit}</div>
        )}
      </div>
    </>
  )
}
