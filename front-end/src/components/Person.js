
function Person({ id, username, email }) {
	return (
		<li className='user'>
			<span>{id}</span>
			{username}
			<span>{email}</span>
		</li>
	)
}

export default Person
