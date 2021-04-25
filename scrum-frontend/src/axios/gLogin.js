import axios from 'axios';


const GLogin =(accessToken)=> {

	// console.log(accessToken);
	axios
		.post('http://127.0.0.1:8000/auth/convert-token', {
			token: accessToken,
			backend: 'google-oauth2',
			grant_type: 'convert_token',
			client_id: '2AJ90N2RdZYrg51EWrES7OVvd6KgnaQB5WjyX2jS',
            client_secret: `${process.env.REACT_APP_GOOGLE_AUTH_API_KEY}`,
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
            // props.history.push('/');
		});
};


export default GLogin

