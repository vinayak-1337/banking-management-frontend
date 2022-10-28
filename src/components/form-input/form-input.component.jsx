import "./form-input.styles.css";

export default function FormInput({name, info, ...otherProps}) {
	return (
		<div className="input-container">
			{name && <label htmlFor={name}>{name} {info && `(${info})`} : </label>}
      <input name={name} {...otherProps}/>
		</div>
	)
}