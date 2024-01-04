
import './Users.css';



function Users() {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = {
            "pseudo": formData.get('pseudo'),
            "password": formData.get('current-password')
        }
        fetch('https://astro.alexandrepaucdetoc.fr/login',
            {
                method: 'POST',
                headers: 
                    {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(user)
            })
        .then(res => {return res.json()})
        .then(data => {
            console.log(data)
            e.target.reset()
        })
        .catch(error => console.error('Erreur lors de la requête :', error));
    }


    return (
        <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} >
            <label htmlFor='pseudo' hidden />
                <input type='text' name='pseudo' placeholder='Pseudo'/>
            <label htmlFor='password' hidden />
                <input type='current-password' name='current-password' placeholder='Password'/>
            <button >Se connecter</button>
        </form>
        </>

    )
}

export default Users;