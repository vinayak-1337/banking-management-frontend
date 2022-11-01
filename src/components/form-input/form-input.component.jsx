import "./form-input.styles.css";

export default function FormInput({ name, displayName, info, ...otherProps }) {
  return (
    <div className="input-container">
      <input name={name} {...otherProps} />
    </div>
  );
}
