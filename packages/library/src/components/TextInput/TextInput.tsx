import React, { useId, useState } from "react";
import { GenericInputProps } from "../GenericInputProps";

export interface TextInputProps extends GenericInputProps {
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
   * The maximum length of the value.
   */
  maxLength?: number,
  /**
   * if `true`, and if `maxLength` has been defined, displays the character counter.
   */
  showCounter?: boolean,
  /**
   * Optional text for the character counter.
   */
  counterText?: string,
  /**
   * Determines if the counter displays the length of the current value, or the remaining characters.
   */
  counterVariant?: "current" | "remaining",
}

interface GenerateUniqueId {
  (id?: string): string;
}
// Generate a generic id if none has been explicitely set, by using react's useId
const generateUniqueId: GenerateUniqueId = (id) => {
  if (id === undefined) {
    id = `${useId()}input`;
  }
  return id;
}

interface GenerateAriaDescribedBy {
  (
    id: string,
    helperText: TextInputProps["helperText"],
    errorMessage: TextInputProps["errorMessage"],
    invalid: TextInputProps["invalid"],
    maxLength: TextInputProps["maxLength"],
    showCounter: TextInputProps["showCounter"]
  ): string | undefined
}
// Generate the ids string for aria-describedby, based on the component props
const generateAriaDescribedBy: GenerateAriaDescribedBy = (id, helperText, errorMessage, invalid, maxLength, showCounter) => {
  let ariaDescribedByIds: string[] = [];
  let ariaDescribedBy: string | undefined;

  if (invalid && Boolean(errorMessage)) {
    ariaDescribedByIds.push(`${id}-error`);
  }
  if (!invalid && Boolean(helperText)) {
    ariaDescribedByIds.push(`${id}-helper`);
  }
  if (maxLength && Boolean(showCounter)) {
    ariaDescribedByIds.push(`${id}-counter`);
  }
  if (ariaDescribedByIds.length > 0) {
    ariaDescribedBy = ariaDescribedByIds.join(" ");
  }
  return ariaDescribedBy;
}
interface GenerateCounterText {
  (
    counterVariant: TextInputProps["counterVariant"],
    maxLength: TextInputProps["maxLength"],
    counterText: TextInputProps["counterText"],
    value: TextInputProps["value"]
  ): string
}
// Calculate the value displayed in the counter
const generateCounter: GenerateCounterText = (counterVariant, maxLength, counterText, value) => {
  let counterValue: number = 0;

  if (maxLength !== undefined && value !== undefined) {
    if (counterVariant === "current") {
      counterValue = value.toString().length;
    } else if (counterVariant === "remaining") {
      counterValue = maxLength - value.toString().length;
    }
  }
  return `${counterValue} / ${maxLength} ${counterText}`;
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
  maxLength,
  counterText = "",
  counterVariant = "current",
  showCounter,
  errorMessage,
  required = false,
  requiredText = "*",
  invalid = false,
  autoComplete,
  value,
  onChange = undefined,
  ...rest
}: TextInputProps, ref) => {
  const uniqueId: string = generateUniqueId(id);
  const [inputValue, setInputValue] = useState(value ?? '');

  // onChange event handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
    setInputValue(event.target.value);
  }

  return (
    <div className="mylib--form-item mylib--textinput">
      {/* Input label */}
      {!hideLabel && (
        <label className="mylib--textinput__label" htmlFor={id}>
          {label}{required && <span className="mylib--textinput__required-text">{Boolean(requiredText) ? requiredText : "*"}</span>}
        </label>
      )}

      {/* Input */}
      <input
        onChange={onChange !== undefined ? onChange : handleChange}
        {...rest}
        className="mylib--textinput__input"
        id={uniqueId}
        name={name}
        type={type}
        inputMode={inputMode}
        title={hideLabel ? label : undefined}
        aria-describedby={generateAriaDescribedBy(uniqueId, helperText, errorMessage, invalid, maxLength, showCounter)}
        maxLength={maxLength}
        required={required}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        autoComplete={autoComplete}
        value={inputValue}
        ref={ref}
      />

      {/* Helper text */}
      {Boolean(helperText) && !invalid && (
        <div id={`${uniqueId}-helper`} className="mylib--textinput__message mylib--textinput__helper">
          {helperText}
        </div>
      )}

      {/* Error text */}
      {Boolean(errorMessage) && invalid && (
        <div id={`${uniqueId}-error`} className="mylib--textinput__message mylib--textinput__error-message">
          {errorMessage}
        </div>
      )}

      {/* Character counter */}
      {Boolean(maxLength) && showCounter && (
        <div id={`${uniqueId}-counter`} className="mylib--textinput__counter">
          {generateCounter(counterVariant, maxLength, counterText, inputValue)}
        </div>
      )}
    </div>
  );
});
