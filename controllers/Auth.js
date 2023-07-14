const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const {sendEmail} = require('../modules/sendgrid');
const {generateVerificationToken} = require("../helpers/utils");
const validator = require('validator');

exports.postSignup = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.create({email, password});
    const token = generateVerificationToken();
    user.emailVerificationToken = token;
    await user.save();

    const verificationLink = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${token}`;

    const subject = 'Verify Your Email Address 12';
    const html = `<p>Please click the following link to verify your email address:</p>
                  <a href="${verificationLink}">${verificationLink}</a>`;

    console.log('verificationLink', verificationLink)

    await sendEmail(email, subject, html);

    return res.json({message: 'Verification email sent'});
  } catch (error) {

    return res.status(500).json({error});
  }
};

exports.postSignIn = async (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(400).send({message: info.message});
    }

    req.login(user.dataValues, {session: false}, (error) => {
      if (error) {
        return next(error);
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email
      }, process.env.JWT_SECRET, {expiresIn: '1d' });

      return res.status(200).send({
        message: 'Sign-in successful',
        data: {
          user,
          token
        }
      });
    });
  })(req, res, next);
};

exports.verifyEmail = async (req, res, next) => {
  if (req.user.emailVerified) {
    res.status(400).json({error: 'The email address has been verified.'});
  }

  const validationErrors = [];
  if (req.params.token && (!validator.isHexadecimal(req.params.token))) validationErrors.push({msg: 'Invalid Token.  Please retry.'});
  if (validationErrors.length) {
    res.status(400).json({error: validationErrors});
  }

  if (req.params.token === req.user.emailVerificationToken) {
    User
      .findOne({email: req.user.email})
      .then((user) => {
        if (!user) {
          res.status(400).json({error: 'There was an error in loading your profile.'});
        }
        user.emailVerificationToken = '';
        user.emailVerified = 1;
        user.save();
        res.status(200).json({message: 'Thank you for verifying your email address.'});
      })
      .catch((error) => {
        res.status(400).json({error: 'There was an error when updating your profile.  Please try again later.'});
      });
  } else {
    res.status(400).json({error: 'The verification link was invalid, or is for a different account.'});
  }
}
