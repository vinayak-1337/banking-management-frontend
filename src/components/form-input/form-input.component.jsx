import "./form-input.styles.css";

export default function FormInput({ name, displayName, info, ...otherProps }) {
  return (
    <div className="input-container">
      {name && (
        <label htmlFor={name}>
          {displayName || name} {info && `(${info})`} :{" "}
        </label>
      )}
      <input name={name} {...otherProps} />
    </div>
  );
}
