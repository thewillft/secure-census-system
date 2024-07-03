/**
 * Schemas are used for validation purposes. Each schema
 * has a validate() method which takes in an object to
 * validate against the given schema.
 */
import submission from './submission'
import LoginRequest from './login-request'
import RegisterRequest from './register-request'

module.exports = { submission, LoginRequest, RegisterRequest };