const { MongoClient } = require('mongodb');
const uuid = require('uuid').v4;
const drizzleDb = require('./b'); // Import the drizzle database instance
const users = require('./users'); // Replace with your actual schema module
const reports = require('./report'); // Replace with your actual schema module
const { eq } = require('drizzle-orm');
const mongoClient = new MongoClient(
    'mongodb+srv://anishkumar127dev:4qj0lB6ql2O8oKGN@cluster0.seamnub.mongodb.net/StatutoryReportingTool?retryWrites=true&w=majority'
);

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
// drizzleDb.end();  // Close PostgreSQL connection pool when done
//   }
// })();
// (async function migrateUsers() {
//     try {
//       await mongoClient.connect();
//       const db = mongoClient.db('StatutoryReportingTool');

//       const mongoUsers = await db.collection('users').find().toArray();

//       // Create a map to track existing users and their new ids
//       const userMap = new Map();

//       for (const mongoUser of mongoUsers) {
//         // Insert user into PostgreSQL and store their id in the userMap
//         const insertedUser = await drizzleDb.insert(users).values({
//           id: uuid(),
//           email: mongoUser.email,
//           fullName: mongoUser.fullName,
//           adminId: mongoUser.adminId ? uuid() : null,  // Temporarily set to null, will update later
//           role: mongoUser.role,
//           subRole: mongoUser.subRole,
//           avatar: mongoUser.avatar,
//           coverImage: mongoUser.coverImage,
//           password: mongoUser.password,
//           refreshToken: mongoUser.refreshToken,
//           userLimit: mongoUser.userLimit,
//           isActive: mongoUser.isActive,
//           location: mongoUser.location,
//           isVerified: mongoUser.isVerified,
//           otp: mongoUser.OTP,
//           verifiedDate: mongoUser.verifiedDate,
//           otpExpireTime: mongoUser.otpExpireTime,
//           fingerprintImg: mongoUser.fingerprint_img,
//           fingerprintKey: mongoUser.fingerprint_key,
//         }).returning();

//         // Store the new user ID in the map
//         userMap.set(mongoUser._id.toString(), insertedUser.id);

//         // Insert associated reports for this user
//         const mongoReports = await db.collection('reports').find({ user: mongoUser._id }).toArray();

//         for (const mongoReport of mongoReports) {
//           await drizzleDb.insert(reports).values({
//             id: uuid(),
//             userId: insertedUser.id,
//             reportName: mongoReport.ReportName,
//             periodDetails: mongoReport.PeriodDetails,
//             created: mongoReport.Created,
//             reportKeyName: mongoReport.ReportKeyName,
//             isArchive: mongoReport.isArchive,
//             periodOne: mongoReport.periodOne,
//             periodTwo: mongoReport.periodTwo,
//             periodThree: mongoReport.periodThree,
//           });
//         }
//       }

//       // Now that all users are inserted, we can update adminId fields
//       for (const mongoUser of mongoUsers) {
//         const adminId = mongoUser.adminId ? userMap.get(mongoUser.adminId.toString()) : null;
//         if (adminId) {
//           await drizzleDb.update(users).set({ adminId }).where(eq(users.id, userMap.get(mongoUser._id.toString())));
//         }
//       }

//       console.log('Migration complete');
//     } catch (error) {
//       console.error('Migration failed:', error);
//     } finally {
//       mongoClient.close();
//   drizzleDb.end();  // Close PostgreSQL connection pool when done
//     }
//   })();(async function migrateUsers() {
//     try {
//       await mongoClient.connect();
//       const db = mongoClient.db('StatutoryReportingTool');

//       const mongoUsers = await db.collection('users').find().toArray();

//       // Create a map to track existing users and their new ids
//       const userMap = new Map();

//       for (const mongoUser of mongoUsers) {
//         // Insert user into PostgreSQL and store their id in the userMap
//         const insertedUser = await drizzleDb.insert(users).values({
//           id: uuid(),
//           email: mongoUser.email,
//           fullName: mongoUser.fullName,
//           adminId: mongoUser.adminId ? uuid() : null,  // Temporarily set to null, will update later
//           role: mongoUser.role,
//           subRole: mongoUser.subRole,
//           avatar: mongoUser.avatar,
//           coverImage: mongoUser.coverImage,
//           password: mongoUser.password,
//           refreshToken: mongoUser.refreshToken,
//           userLimit: mongoUser.userLimit,
//           isActive: mongoUser.isActive,
//           location: mongoUser.location,
//           isVerified: mongoUser.isVerified,
//           otp: mongoUser.OTP,
//           verifiedDate: mongoUser.verifiedDate,
//           otpExpireTime: mongoUser.otpExpireTime,
//           fingerprintImg: mongoUser.fingerprint_img,
//           fingerprintKey: mongoUser.fingerprint_key,
//         }).returning();

//         // Store the new user ID in the map
//         userMap.set(mongoUser._id.toString(), insertedUser.id);

//         // Insert associated reports for this user
//         const mongoReports = await db.collection('reports').find({ user: mongoUser._id }).toArray();

//         for (const mongoReport of mongoReports) {
//           await drizzleDb.insert(reports).values({
//             id: uuid(),
//             userId: insertedUser.id,
//             reportName: mongoReport.ReportName,
//             periodDetails: mongoReport.PeriodDetails,
//             created: mongoReport.Created,
//             reportKeyName: mongoReport.ReportKeyName,
//             isArchive: mongoReport.isArchive,
//             periodOne: mongoReport.periodOne,
//             periodTwo: mongoReport.periodTwo,
//             periodThree: mongoReport.periodThree,
//           });
//         }
//       }

//       // Now that all users are inserted, we can update adminId fields
//       for (const mongoUser of mongoUsers) {
//         const adminId = mongoUser.adminId ? userMap.get(mongoUser.adminId.toString()) : null;
//         if (adminId) {
//           await drizzleDb.update(users).set({ adminId }).where(eq(users.id, userMap.get(mongoUser._id.toString())));
//         }
//       }

//       console.log('Migration complete');
//     } catch (error) {
//       console.error('Migration failed:', error);
//     } finally {
//       mongoClient.close();
//   drizzleDb.end();  // Close PostgreSQL connection pool when done
//     }
//   })();

// (async function migrateUsers() {
//     try {
//       await mongoClient.connect();
//       const db = mongoClient.db('StatutoryReportingTool');

//       const mongoUsers = await db.collection('users').find().toArray();

//       // Create a map to track existing users and their new ids
//       const userMap = new Map();

//       for (const mongoUser of mongoUsers) {
//         // Check if the email already exists in PostgreSQL
//         const existingUser = await drizzleDb
//           .select()
//           .from(users)
//           .where(eq(users.email, mongoUser.email))
//           .execute();

//         if (existingUser.length === 0) {
//           // Insert user into PostgreSQL and store their id in the userMap
//           const insertedUser = await drizzleDb.insert(users).values({
//             id: uuid(),
//             email: mongoUser.email,
//             fullName: mongoUser.fullName,
//             adminId: mongoUser.adminId ? uuid() : null,  // Temporarily set to null, will update later
//             role: mongoUser.role,
//             subRole: mongoUser.subRole,
//             avatar: mongoUser.avatar,
//             coverImage: mongoUser.coverImage,
//             password: mongoUser.password,
//             refreshToken: mongoUser.refreshToken,
//             userLimit: mongoUser.userLimit,
//             isActive: mongoUser.isActive,
//             location: mongoUser.location,
//             isVerified: mongoUser.isVerified,
//             otp: mongoUser.OTP,
//             verifiedDate: mongoUser.verifiedDate,
//             otpExpireTime: mongoUser.otpExpireTime,
//             fingerprintImg: mongoUser.fingerprint_img,
//             fingerprintKey: mongoUser.fingerprint_key,
//           }).returning();

//           // Store the new user ID in the map
//           userMap.set(mongoUser._id.toString(), insertedUser.id);

//           // Insert associated reports for this user
//           const mongoReports = await db.collection('reports').find({ user: mongoUser._id }).toArray();

//           for (const mongoReport of mongoReports) {
//             await drizzleDb.insert(reports).values({
//               id: uuid(),
//               userId: insertedUser.id,
//               reportName: mongoReport.ReportName,
//               periodDetails: mongoReport.PeriodDetails,
//               created: mongoReport.Created,
//               reportKeyName: mongoReport.ReportKeyName,
//               isArchive: mongoReport.isArchive,
//               periodOne: mongoReport.periodOne,
//               periodTwo: mongoReport.periodTwo,
//               periodThree: mongoReport.periodThree,
//             });
//           }
//         } else {
//           console.log(`User with email ${mongoUser.email} already exists. Skipping...`);
//         }
//       }

//       // Update admin IDs if necessary after all users are inserted
//       for (const mongoUser of mongoUsers) {
//         const adminId = mongoUser.adminId ? userMap.get(mongoUser.adminId.toString()) : null;
//         if (adminId) {
//           await drizzleDb.update(users).set({ adminId }).where(eq(users.id, userMap.get(mongoUser._id.toString())));
//         }
//       }

//       console.log('Migration complete');
//     } catch (error) {
//       console.error('Migration failed:', error);
//     } finally {
//       await mongoClient.close();  // Ensure MongoDB connection is closed properly
//     //   drizzleDb.end();  // Close PostgreSQL connection pool when done
//     }
//   })();

// (async function migrateUsers() {
//     try {
//         await mongoClient.connect();
//         const db = mongoClient.db('StatutoryReportingTool');

//         const mongoUsers = await db.collection('users').find().toArray();

//         // First, create a map for all inserted users
//         const userMap = new Map();

//         // Insert admin users first
//         for (const mongoUser of mongoUsers) {
//             // Only insert users with roles that indicate they are admins
//             if (mongoUser.role === 'admin') {
//                 const insertedAdmin = await drizzleDb
//                     .insert(users)
//                     .values({
//                         id: uuid(),
//                         email: mongoUser.email,
//                         fullName: mongoUser.fullName,
//                         // Set other necessary fields...
//                         password: mongoUser.password,
//                         // Don't set adminId here since they are admins
//                     })
//                     .returning();

//                 userMap.set(mongoUser._id.toString(), insertedAdmin.id);
//             }
//         }

//         // Now insert regular users
//         for (const mongoUser of mongoUsers) {
//             if (mongoUser.role !== 'admin') {
//                 const adminId = mongoUser.adminId ? userMap.get(mongoUser.adminId.toString()) : null;

//                 const insertedUser = await drizzleDb
//                     .insert(users)
//                     .values({
//                         id: uuid(),
//                         email: mongoUser.email,
//                         fullName: mongoUser.fullName,
//                         adminId: adminId, // Use the mapped admin ID
//                         password: mongoUser.password,
//                         // Set other necessary fields...
//                     })
//                     .returning();

//                 userMap.set(mongoUser._id.toString(), insertedUser.id);

//                 console.log('id', mongoUser._id);
//                 // Insert associated reports for this user if needed
//                 const mongoReports = await db
//                     .collection('reportgenerations')
//                     .find({ user: mongoUser._id })
//                     .toArray();
//                 console.log({ mongoReports });
//                 for (const mongoReport of mongoReports) {
//                     await drizzleDb.insert(reports).values({
//                         id: uuid(),
//                         userId: insertedUser.id || uuid(),
//                         reportName: mongoReport.ReportName,
//                         periodDetails: mongoReport.PeriodDetails,
//                         created: mongoReport.Created,
//                         reportKeyName: mongoReport.ReportKeyName,
//                         isArchive: mongoReport.isArchive,
//                         periodOne: mongoReport.periodOne,
//                         periodTwo: mongoReport.periodTwo,
//                         periodThree: mongoReport.periodThree,
//                         createdAt: mongoReport.Created,
//                         updatedAt: mongoReport.Updated,

//                         // Set other necessary fields...
//                     });
//                 }
//             }
//         }

//         console.log('Migration complete');
//     } catch (error) {
//         console.error('Migration failed:', error);
//     } finally {
//         await mongoClient.close(); // Ensure MongoDB connection is closed properly
//         //   drizzleDb.end();  // Close PostgreSQL connection pool when done
//     }
// })();

(async function migrateUsers() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db('StatutoryReportingTool');

        const mongoUsers = await db.collection('users').find().toArray();
        const userMap = new Map();

        // First, create admin users
        for (const mongoUser of mongoUsers) {
            if (mongoUser.role === 'admin') {
                const insertedAdmin = await drizzleDb
                    .insert(users)
                    .values({
                        id: uuid(),
                        email: mongoUser.email,
                        fullName: mongoUser.fullName,
                        password: mongoUser.password,
                    })
                    .returning();

                userMap.set(mongoUser._id.toString(), insertedAdmin[0].id); // Ensure we are getting the correct inserted ID
            }
        }

        // Now insert regular users
        for (const mongoUser of mongoUsers) {
            if (mongoUser.role !== 'admin') {
                const adminId = mongoUser.adminId ? userMap.get(mongoUser.adminId.toString()) : null;

                const insertedUser = await drizzleDb
                    .insert(users)
                    .values({
                        id: uuid(),
                        email: mongoUser.email,
                        fullName: mongoUser.fullName,
                        adminId: adminId,
                        password: mongoUser.password,
                    })
                    .returning();

                userMap.set(mongoUser._id.toString(), insertedUser[0].id); // Store the newly inserted user ID

                // Insert associated reports for this user
                const mongoReports = await db
                    .collection('reportgenerations')
                    .find({ user: mongoUser._id })
                    .toArray();
                console.log({ mongoReports });
                for (const mongoReport of mongoReports) {
                    await drizzleDb.insert(reports).values({
                        id: uuid(),
                        userId: insertedUser[0].id, // Use the mapped user ID
                        reportName: mongoReport.ReportName,
                        periodDetails: mongoReport.PeriodDetails,
                        created: mongoReport.Created,
                        reportKeyName: mongoReport.ReportKeyName,
                        isArchive: mongoReport.isArchive,
                        periodOne: mongoReport.periodOne,
                        periodTwo: mongoReport.periodTwo,
                        periodThree: mongoReport.periodThree,
                        createdAt: mongoReport.Created,
                        updatedAt: mongoReport.Updated,
                    });
                }
            }
        }

        console.log('Migration complete');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoClient.close();
        // drizzleDb.end(); // Close PostgreSQL connection pool when done
    }
})();
