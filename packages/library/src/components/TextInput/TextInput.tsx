import React, { useId } from "react";
import { GenericInputProps } from "../GenericInputProps";

export interface TextInputProps extends GenericInputProps {
  /**
   * The type of the `<input />`.
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
  required,
  requiredText = "*",
  invalid,
  autoComplete,
  ...rest
}: TextInputProps, ref) => {
  // We make sure the default `id` is unique by using uuidv4
  if (!Boolean(id)) {
    id = `${useId()}input`;
  }

  // Generate the ids string for aria-describedby, based on the component props
  const generateAriaDescribedBy = () => {
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

  // Calculate the value displayed in the counter
  const generateCounterValue = () => {
    let counterValue = 0;
    if (maxLength !== undefined && rest.value !== undefined) {
      if (counterVariant === "current") {
        counterValue = rest.value.toString().length;
      } else if (counterVariant === "remaining") {
        counterValue = maxLength - rest.value.toString().length;
      }
    }
    return counterValue;
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
        id={id}
        name={name}
        className="mylib--textinput__input"
        type={type}
        inputMode={inputMode}
        title={hideLabel ? label : undefined}
        aria-describedby={generateAriaDescribedBy()}
        maxLength={maxLength}
        required={required}
        aria-required={required}
        aria-invalid={invalid}
        autoComplete={autoComplete}
        ref={ref}
        {...rest}
      />

      {/* Helper text */}
      {Boolean(helperText) && !invalid && (
        <div id={`${id}-helper`} className="mylib--textinput__message mylib--textinput__helper">
          {helperText}
        </div>
      )}

      {/* Error text */}
      {Boolean(errorMessage) && invalid && (
        <div id={`${id}-error`} className="mylib--textinput__message mylib--textinput__error-message">
          {errorMessage}
        </div>
      )}

      {/* Character counter */}
      {Boolean(maxLength) && showCounter && (
        <div id={`${id}-counter`} className="mylib--textinput__counter">
          {`${generateCounterValue()} / ${maxLength} ${counterText}`}
        </div>
      )}
    </div>
  );
});
