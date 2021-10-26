import '../styles/Post.css'

function Post({ titre, contenu, username, date, inList }) {
	return ( (inList) ?
		<div className='post'>
			<h1>{titre}</h1>
			<p>{contenu}</p>
			<p>Ecrit par : <strong>{username}</strong></p>
            <p>{date}</p>
		</div> : 
		<div className='post--desc'>
			<h1 className="post--titre">{titre}</h1>
			<p className="post--auteur">Ecrit par : <strong>{username}</strong></p>
			<p>{contenu}</p>
            <p>{date}</p>
		</div>
	)
}

export default Post
