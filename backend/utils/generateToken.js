// generateToken.js
const jwt = require('jsonwebtoken')

const generateTokenAdmin = (res, adminId) => {
    const token = jwt.sign( { adminId: adminId}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });

    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}
const generateTokenTrainer = (res, trainerId) => {
    const token = jwt.sign( { trainerId: trainerId}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });

    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}


const generateTokenClient = (res, clientId) => {
    const token = jwt.sign( { clientId: clientId}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });

    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

module.exports = {
    generateTokenAdmin,
    generateTokenTrainer,
    generateTokenClient
};
