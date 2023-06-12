const jwt = require('jsonwebtoken')
const db = require('../config/db')


const genToken = async (username) => {
    try {
      // Mendapatkan role pengguna dari database berdasarkan username
      const query = 'SELECT role FROM public.users WHERE username = $1';
      const values = [username];
      const result = await db.query(query, values);
  
      if (result.rows.length > 0) {
        const role = result.rows[0].role;

        // Membuat payload dengan role dari database
        const payload = {
          username: username,
          role: role,
        };
  
        // Menghasilkan token JWT dengan payload
        const token = jwt.sign(payload, 'INI_SECRET_KEY', { expiresIn: '1h' });

        return token;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Failed to generate token');
    }
  };
  
  module.exports = {
    genToken,
  };