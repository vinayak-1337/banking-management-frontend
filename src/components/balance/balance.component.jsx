import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import BackButton from '../back-button/back-button.component';

export default function Balance() {
	const {currentUser} = useContext(UserContext);
	const {balance} = currentUser;
	return (
		<div className="balance-container">
			<h2>Your current balance is</h2> <br/>
			<h3>₹ {balance} </h3>
			<BackButton/>
		</div>
	)
}