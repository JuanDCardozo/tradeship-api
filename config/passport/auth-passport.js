// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '446008825782199', // your App ID
		'clientSecret' 	: 'f35c5dfd3cbf8af6e98d3210e403f179', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID' 		: '531444660709-a73b4nritm0116oqbpf7asup2adu8jrs.apps.googleusercontent.com',
		'clientSecret' 	: 'GqBPIHKdlxMNu3vwd643eNjQ',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	},

	'token': {
            'secret':'IlikeTradeship321',
            'issuer': 'localhost:8200',
            'audience':'localhost:4200'
        }
}
