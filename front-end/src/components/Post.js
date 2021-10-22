
function Post({ titre, contenu, username, date }) {
	return (
		<li className='post'>
			<h1>{titre}</h1>
			{contenu}
			<strong>{username}</strong>
            <p>{date}</p>
		</li>
	)
}

export default Post