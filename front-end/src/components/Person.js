
function Person({ username, email, isAdmin }) {

	return ( (isAdmin === 0) ?
		<li className='user'>
			{username}
			<p>{email}</p>
			<p>Admin : Non</p>
		</li> : 
		<li className='user'>
			{username}
			<p>{email}</p>
			<p>Admin : Oui</p>
		</li> 
	)
}

export default Person
