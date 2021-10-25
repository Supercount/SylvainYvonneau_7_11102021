import '../styles/Person.css'

function Person({ username, email, isAdmin }) {

	return ( 
		(isAdmin === 'null') ? 
		<div className='user'>
			<p>Nom : <span className="user--name">{username}</span></p>
			<p className="email">Email : {email}</p>
		</div>
		: 
		(isAdmin === 0) ?
		<div className="user--desc">
			<h1 className="username">{username}</h1>
			<p className="email">Adresse mail : {email}</p>
			<p className="username">Administrateur : Non</p>
		</div> : 
		<div className="user--desc">
			<h1 className="username">{username}</h1>
			<p className="email">Adresse mail : {email}</p>
			<p className="username">Administrateur : Oui</p>
		</div> 
	)
}

export default Person
