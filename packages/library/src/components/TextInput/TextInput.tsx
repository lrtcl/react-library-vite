import { CharacterCounter, CharacterCounterProps } from "@components/CharacterCounter/CharacterCounter";
import { GenericInputProps } from "@components/GenericInputProps";
import classnames from "classnames";
import React, { useEffect, useId, useState } from "react";
import styles from './TextInput.module.css';

export interface TextInputStaticProps extends GenericInputProps {
  /**
   * The type of `<input />`.
   */
  type?: "text" | "email" | "password" | "tel" | "url" | "search",
  /**
   * On touch devices, tells the browser which keyboard to display.
   */
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url" | "search" | "none",
  /**
   * WARNING: bad practice, avoid using! If `true`, the label will be visually hidden.<br />
   * For accessibility reasons, the label will still be announced by screen readers, thanks to the `title` attribute.
   */
  hideLabel?: boolean,
  /**
   * The absolute maximum length of the input value. If this prop is set, the user won't be able to type after reaching maxLength.
   */
  maxLength?: number,
}

type TextInputCounterProps =
  | {
    /**
     * if `true`, and if `counterLimit` has been defined, displays the character counter.
     */
    showCounter: true;
    /**
     * The maximum length of the value as required for validation.
     * This prop is required for the character counter and will allow typing after reaching counterLimit.
     */
    counterLimit: CharacterCounterProps["counterLimit"];
    /**
     * Gives an indication of the caracter limit to screen reader users. For example: "You can enter up to 20 characters"
     */
    counterHelperText: CharacterCounterProps["counterHelperText"];
    /**
     * Text for the character counter when value length is under `counterLimit`.
     */
    counterTextUnderLimit: CharacterCounterProps["counterTextUnderLimit"];
    /**
     * Text for the character counter when value length is over `counterLimit`.
     */
    counterTextOverLimit: CharacterCounterProps["counterTextOverLimit"];
  }
  | {
    showCounter?: never | false;
    counterLimit?: never;
    counterHelperText?: never
    counterTextUnderLimit?: never;
    counterTextOverLimit?: never;
  };

export type TextInputProps = TextInputStaticProps & TextInputCounterProps;

// Generate a unique id if none has been explicitely set, by using react's useId
interface GenerateUniqueId {
  (id?: string): string;
}
const generateUniqueId: GenerateUniqueId = (id) => {
  if (id === undefined) {
    id = `${useId()}input`;
  }
  return id;
}

// Generate the ids string for aria-describedby, based on the component props
interface GenerateAriaDescribedBy {
  (
    id: string,
    helperText: TextInputProps["helperText"],
    errorMessage: TextInputProps["errorMessage"],
    invalid: TextInputProps["invalid"],
    counterLimit: TextInputProps["counterLimit"],
    showCounter: TextInputProps["showCounter"]
  ): string | undefined
}
const generateAriaDescribedBy: GenerateAriaDescribedBy = (id, helperText, errorMessage, invalid, counterLimit, showCounter) => {
  let ariaDescribedByIds: string[] = [];
  let ariaDescribedBy: string | undefined;

  if (invalid && Boolean(errorMessage)) {
    ariaDescribedByIds.push(`${id}-error`);
  }
  if (!invalid && Boolean(helperText)) {
    ariaDescribedByIds.push(`${id}-helper`);
  }
  if (counterLimit && Boolean(showCounter)) {
    ariaDescribedByIds.push(`${id}-counter-helper`);
  }
  if (ariaDescribedByIds.length > 0) {
    ariaDescribedBy = ariaDescribedByIds.join(" ");
  }
  return ariaDescribedBy;
}

// TextInput component
export const TextInput: React.FC<TextInputProps> = React.forwardRef(({
  id,
  name,
  type = "text",
  inputMode,
  label,
  hideLabel,
  helperText,
  counterLimit,
  counterHelperText,
  counterTextUnderLimit = "characters remaining",
  counterTextOverLimit = "characters over limit",
  showCounter = false,
  errorMessage,
  required = false,
  requiredText = "*",
  invalid = false,
  autoComplete,
  value: valueFromProps,
  onChange: onChangeFromProps,
  defaultValue,
  className,
  ...rest
}: TextInputProps, ref) => {
  const uniqueId: string = generateUniqueId(id);

  // A component can be considered controlled when its value prop is
  // not undefined.
  const isControlled = typeof valueFromProps != "undefined";
  // When a component is not controlled, it can have a defaultValue.
  const hasDefaultValue = typeof defaultValue != "undefined";

  // If a defaultValue is specified, we will use it as our initial
  // state.  Otherwise, we will simply use an empty string.
  const [internalValue, setInternalValue] = useState(
    hasDefaultValue ? defaultValue : ""
  );

  // Internally, we need to deal with some value. Depending on whether
  // the component is controlled or not, that value comes from its
  // props or from its internal state.
  const value = isControlled ? valueFromProps : internalValue;

  const [delayedInternalValue, setDelayedInternalValue] = useState(
    hasDefaultValue ? defaultValue : ""
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // When the user types, we will call props.onChange if it exists.
    // We do this even if there is no props.value (and the component
    // is uncontrolled.)
    if (onChangeFromProps) {
      onChangeFromProps(event);
    }

    // If the component is uncontrolled, we need to update our
    // internal value here.
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
  };

  // For screen readers, update the value after a delay when user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedInternalValue(internalValue)
    }, 1000)

    return () => clearTimeout(timer)
  }, [internalValue])

  const classNames = classnames("mylib--form-item mylib--textinput", className)

  return (
    <div className={classNames}>
      {/* Input label */}
      {!hideLabel && (
        <label className={`mylib--textinput__label ${styles.label}`} htmlFor={uniqueId}>
          {label}{required && <span className="mylib--textinput__required-text">{Boolean(requiredText) ? requiredText : "*"}</span>}
        </label>
      )}

      {/* Helper text */}
      {Boolean(helperText) && invalid === false && (
        <div id={`${uniqueId}-helper`} className="mylib--textinput__message mylib--textinput__helper">
          {helperText}
        </div>
      )}

      {/* Input */}
      <input
        value={value}
        onChange={onChange}
        {...rest}
        className="mylib--textinput__input"
        id={uniqueId}
        name={name}
        type={type}
        inputMode={inputMode}
        aria-label={hideLabel ? label : undefined}
        title={hideLabel ? label : undefined}
        aria-describedby={generateAriaDescribedBy(uniqueId, helperText, errorMessage, invalid, counterLimit, showCounter)}
        required={required}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        autoComplete={autoComplete}
        ref={ref}
      />

      {/* Error text */}
      {Boolean(errorMessage) && invalid === true && (
        <div id={`${uniqueId}-error`} className="mylib--textinput__message mylib--textinput__error-message">
          {errorMessage}
        </div>
      )}

      {/* Character counter */}
      {showCounter === true && counterHelperText && (
        <>
          <CharacterCounter
            counterHelperTextId={`${uniqueId}-counter-helper`}
            counterHelperText={counterHelperText}
            counterLimit={counterLimit}
            counterTextUnderLimit={counterTextUnderLimit}
            counterTextOverLimit={counterTextOverLimit}
            value={internalValue}
            delayedValue={delayedInternalValue}
          />
        </>
      )}
    </div>
  );
});
