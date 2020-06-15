import session from 'express-session'

export default session({
  secret: 'r3tr0c4',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },

  name: 'RETRSESS'
});
