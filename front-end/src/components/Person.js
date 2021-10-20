
function Person({ id, username, email }) {
	return (
		<li className='lmj-plant-item'>
			<span>{id}</span>
			{username}
			<span>{email}</span>
		</li>
	)
}

export default Person
