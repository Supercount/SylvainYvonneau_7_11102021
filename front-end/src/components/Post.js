import '../styles/Post.css'
import Moment from 'react-moment';

function Post({ titre, contenu, username, date, inList }) {
	return ( (inList) ?
		<div className='post'>
			<h1>{titre}</h1>
			<p>{contenu}</p>
			<p>Ecrit par : <strong>{username}</strong></p>
            <p><Moment format="HH:mm:ss DD/MM/YYYY">{date}</Moment></p>
		</div> : 
		<div className='post--desc'>
			<h1 className="post--titre">{titre}</h1>
			<p className="post--auteur">Ecrit par : <strong>{username}</strong></p>
			<p>{contenu}</p>
            <p className="post--date"><Moment format="HH:mm:ss DD/MM/YYYY">{date}</Moment></p>
		</div>
	)
}

export default Post
