import { createContext, useState} from 'react';

export const UserContext = createContext({
	currentUser: {
		id: null,
		name: null,
		username: null,
		balance: null,
	},
	setCurrentUser: () => null,
})

export default function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({});
	const value = { currentUser, setCurrentUser };

	return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}