// const fs = require('fs');
// const pgp = require('pg-promise')();

// // PostgreSQL connection configuration
// const db = pgp({
//   host: 'localhost',
//   port: 5432,
//   database: 'anish',
//   user: 'anish',
//   password: 'anish'
// });

// // Read the JSON file
// const data = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// // Transform MongoDB fields to match PostgreSQL
// const transformedData = data.map(user => ({
//   ...user,
//   id: user._id ? user._id.$oid : null, // Convert MongoDB's ObjectId to UUID or string
//   otpExpireTime: new Date(user.otpExpireTime),
//   verifiedDate: user.verifiedDate ? new Date(user.verifiedDate) : null
//   // Add more field transformations as needed
// }));

// // Insert into PostgreSQL
// async function importData() {
//   try {
//     // Use multi-row insert for efficiency
//     const query = pgp.helpers.insert(transformedData, [
//       'id', 'email', 'fullName', 'adminId', 'role', 'subRole', 'avatar',
//       'coverImage', 'password', 'refreshToken', 'userLimit', 'isActive', 'location',
//       'isVerified', 'OTP', 'verifiedDate', 'otpExpireTime', 'fingerprintImg',
//       'fingerprintKey', 'createdAt', 'updatedAt'
//     ], 'users');

//     await db.none(query);
//     console.log('Data imported successfully');
//   } catch (error) {
//     console.error('Error importing data:', error);
//   }
// }

// importData();

const fs = require('fs');
const pgp = require('pg-promise')();

// PostgreSQL connection configuration
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'anish',
  user: 'anish',
  password: 'anish'
});

// Read the JSON file
const data = JSON.parse(fs.readFileSync('users.json', 'utf8'));
// console.log({data})
// Transform MongoDB fields to match PostgreSQL with fallback for missing fields
console.log(data[0]?._id?.$oid)
const transformedData = data.map(user => ({
//   id: user?._id ? user?._id.$oid : null, // Convert MongoDB's ObjectId to UUID or string
  email: user?.email || '', // Provide default values for missing fields
  fullName: user?.fullName || '',
//   adminId: user?.adminId ? user?.adminId.$oid : null,
  role: user?.role || 'user',
  subRole: user?.subRole || 'unit',
  avatar: user?.avatar || '',
  coverImage: user?.coverImage || '',
  password: user?.password || '',
  refreshToken: user?.refreshToken || '',
  userLimit: user?.userLimit || 0,
  isActive: user?.isActive !== undefined ? user?.isActive : true,
  location: user?.Location || '', // 'Location' in your MongoDB data
  isVerified: user?.isVerified !== undefined ? user?.isVerified : false,
  OTP: user?.OTP || '',
//   verifiedDate: user?.verifiedDate ? new Date(user?.verifiedDate) : null,
//   otpExpireTime: new Date(user?.otpExpireTime || Date.now()),
  fingerprintImg: '',
  fingerprintKey:  '',
//   created_at: new Date(user?.createdAt || Date.now()),
//   updated_at: new Date(user?.updatedAt || Date.now())
}));

// Insert into PostgreSQL
async function importData() {
  try {
    // Use multi-row insert for efficiency
    const query = pgp.helpers.insert(transformedData, [
     'email', 'fullName', 'role', 'subRole', 'avatar',
      'coverImage', 'password', 'refreshToken', 'userLimit', 'isActive', 'location',
      'isVerified', 'OTP'
    ], 'users');

    await db.none(query);
    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();