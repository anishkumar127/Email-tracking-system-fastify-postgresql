
const { MongoClient } = require('mongodb');
const uuid = require('uuid').v4;
const drizzleDb = require('./b');  // Import the drizzle database instance
const users = require('./users');  // Replace with your actual schema module
const reports = require('./report');  // Replace with your actual schema module

const mongoClient = new MongoClient('mongodb+srv://anishkumar127dev:4qj0lB6ql2O8oKGN@cluster0.seamnub.mongodb.net/StatutoryReportingTool?retryWrites=true&w=majority');

// (async function migrateUsers() {
//   try {
//     await mongoClient.connect();
//     const db = mongoClient.db('StatutoryReportingTool');
    
//     const mongoUsers = await db.collection('users').find().toArray();

//     for (const mongoUser of mongoUsers) {
//       // Insert user into PostgreSQL
//       const insertedUser = await drizzleDb.insert(users).values({
//         id: uuid(),
//         email: mongoUser.email,
//         fullName: mongoUser.fullName,
//         adminId: mongoUser.adminId ? uuid() : null,
//         role: mongoUser.role,
//         subRole: mongoUser.subRole,
//         avatar: mongoUser.avatar,
//         coverImage: mongoUser.coverImage,
//         password: mongoUser.password,
//         refreshToken: mongoUser.refreshToken,
//         userLimit: mongoUser.userLimit,
//         isActive: mongoUser.isActive,
//         location: mongoUser.location,
//         isVerified: mongoUser.isVerified,
//         otp: mongoUser.OTP,
//         verifiedDate: mongoUser.verifiedDate,
//         otpExpireTime: mongoUser.otpExpireTime,
//         fingerprintImg: mongoUser.fingerprint_img,
//         fingerprintKey: mongoUser.fingerprint_key,
//       }).returning();

//       // Insert associated reports for this user
//       const mongoReports = await db.collection('reports').find({ user: mongoUser._id }).toArray();

//       for (const mongoReport of mongoReports) {
//         await drizzleDb.insert(reports).values({
//           id: uuid(),
//           userId: insertedUser.id,
//           reportName: mongoReport.ReportName,
//           periodDetails: mongoReport.PeriodDetails,
//           created: mongoReport.Created,
//           reportKeyName: mongoReport.ReportKeyName,
//           isArchive: mongoReport.isArchive,
//           periodOne: mongoReport.periodOne,
//           periodTwo: mongoReport.periodTwo,
//           periodThree: mongoReport.periodThree,
//         });
//       }
//     }

//     console.log('Migration complete');
//   } catch (error) {
//     console.error('Migration failed:', error);
//   } finally {
//     mongoClient.close();
//     // drizzleDb.end();  // Close PostgreSQL connection pool when done
//   }
// })();
(async function migrateUsers() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db('StatutoryReportingTool');
      
      const mongoUsers = await db.collection('users').find().toArray();
  
      // Create a map to track existing users and their new ids
      const userMap = new Map();
  
      for (const mongoUser of mongoUsers) {
        // Insert user into PostgreSQL and store their id in the userMap
        const insertedUser = await drizzleDb.insert(users).values({
          id: uuid(),
          email: mongoUser.email,
          fullName: mongoUser.fullName,
          adminId: mongoUser.adminId ? uuid() : null,  // Temporarily set to null, will update later
          role: mongoUser.role,
          subRole: mongoUser.subRole,
          avatar: mongoUser.avatar,
          coverImage: mongoUser.coverImage,
          password: mongoUser.password,
          refreshToken: mongoUser.refreshToken,
          userLimit: mongoUser.userLimit,
          isActive: mongoUser.isActive,
          location: mongoUser.location,
          isVerified: mongoUser.isVerified,
          otp: mongoUser.OTP,
          verifiedDate: mongoUser.verifiedDate,
          otpExpireTime: mongoUser.otpExpireTime,
          fingerprintImg: mongoUser.fingerprint_img,
          fingerprintKey: mongoUser.fingerprint_key,
        }).returning();
  
        // Store the new user ID in the map
        userMap.set(mongoUser._id.toString(), insertedUser.id);
  
        // Insert associated reports for this user
        const mongoReports = await db.collection('reports').find({ user: mongoUser._id }).toArray();
  
        for (const mongoReport of mongoReports) {
          await drizzleDb.insert(reports).values({
            id: uuid(),
            userId: insertedUser.id,
            reportName: mongoReport.ReportName,
            periodDetails: mongoReport.PeriodDetails,
            created: mongoReport.Created,
            reportKeyName: mongoReport.ReportKeyName,
            isArchive: mongoReport.isArchive,
            periodOne: mongoReport.periodOne,
            periodTwo: mongoReport.periodTwo,
            periodThree: mongoReport.periodThree,
          });
        }
      }
  
      // Now that all users are inserted, we can update adminId fields
      for (const mongoUser of mongoUsers) {
        const adminId = mongoUser.adminId ? userMap.get(mongoUser.adminId.toString()) : null;
        if (adminId) {
          await drizzleDb.update(users).set({ adminId }).where(eq(users.id, userMap.get(mongoUser._id.toString())));
        }
      }
  
      console.log('Migration complete');
    } catch (error) {
      console.error('Migration failed:', error);
    } finally {
      mongoClient.close();
    //   drizzleDb.end();  // Close PostgreSQL connection pool when done
    }
  })();(async function migrateUsers() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db('StatutoryReportingTool');
      
      const mongoUsers = await db.collection('users').find().toArray();
  
      // Create a map to track existing users and their new ids
      const userMap = new Map();
  
      for (const mongoUser of mongoUsers) {
        // Insert user into PostgreSQL and store their id in the userMap
        const insertedUser = await drizzleDb.insert(users).values({
          id: uuid(),
          email: mongoUser.email,
          fullName: mongoUser.fullName,
          adminId: mongoUser.adminId ? uuid() : null,  // Temporarily set to null, will update later
          role: mongoUser.role,
          subRole: mongoUser.subRole,
          avatar: mongoUser.avatar,
          coverImage: mongoUser.coverImage,
          password: mongoUser.password,
          refreshToken: mongoUser.refreshToken,
          userLimit: mongoUser.userLimit,
          isActive: mongoUser.isActive,
          location: mongoUser.location,
          isVerified: mongoUser.isVerified,
          otp: mongoUser.OTP,
          verifiedDate: mongoUser.verifiedDate,
          otpExpireTime: mongoUser.otpExpireTime,
          fingerprintImg: mongoUser.fingerprint_img,
          fingerprintKey: mongoUser.fingerprint_key,
        }).returning();
  
        // Store the new user ID in the map
        userMap.set(mongoUser._id.toString(), insertedUser.id);
  
        // Insert associated reports for this user
        const mongoReports = await db.collection('reports').find({ user: mongoUser._id }).toArray();
  
        for (const mongoReport of mongoReports) {
          await drizzleDb.insert(reports).values({
            id: uuid(),
            userId: insertedUser.id,
            reportName: mongoReport.ReportName,
            periodDetails: mongoReport.PeriodDetails,
            created: mongoReport.Created,
            reportKeyName: mongoReport.ReportKeyName,
            isArchive: mongoReport.isArchive,
            periodOne: mongoReport.periodOne,
            periodTwo: mongoReport.periodTwo,
            periodThree: mongoReport.periodThree,
          });
        }
      }
  
      // Now that all users are inserted, we can update adminId fields
      for (const mongoUser of mongoUsers) {
        const adminId = mongoUser.adminId ? userMap.get(mongoUser.adminId.toString()) : null;
        if (adminId) {
          await drizzleDb.update(users).set({ adminId }).where(eq(users.id, userMap.get(mongoUser._id.toString())));
        }
      }
  
      console.log('Migration complete');
    } catch (error) {
      console.error('Migration failed:', error);
    } finally {
      mongoClient.close();
    //   drizzleDb.end();  // Close PostgreSQL connection pool when done
    }
  })();