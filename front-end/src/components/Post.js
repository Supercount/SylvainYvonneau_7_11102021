import '../styles/Post.css'
import Moment from 'react-moment';

function Post({ titre, contenu, username, date, inList }) {
	return ( (inList) ?
		<div className='post'>
			<h1>{titre}</h1>
			<p>{contenu}</p>
			<p>Ecrit par : <strong>{username}</strong></p>
            <p>le <Moment format="DD/MM/YYYY">{date}</Moment> à <Moment format="HH:mm:ss">{date}</Moment></p>
		</div> : 
		<div className='post--desc'>
			<h1 className="post--titre">{titre}</h1>
			<p className="post--contenu">{contenu}</p>
			<p className="post--auteur">par : <strong>{username}</strong></p>
            <p className="post--date">le <Moment format="DD/MM/YYYY">{date}</Moment> à <Moment format="HH:mm:ss">{date}</Moment></p>
		</div>
	)
}

export default Post
