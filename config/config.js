process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// expire in jwt
process.env.LIMIT_TOKEN = '48h'

// secret
process.env.SECRET = process.env.SECRET || 'secret'