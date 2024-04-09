import prisma from '../utils/prisma.js'
const createLocationDb = async(name,category, about, highlights, price, )=> await prisma.location.create({
      data:{
          name,
          category,
          about,
          highlights,
          price
      }
  })

  const createTouristDb = async(firstname, lastname, email, hashedPassword)=> await prisma.user.create({
    data:{
      firstname,
      lastname,
      email,
      password: hashedPassword

    }
  })

  const createBookingDb = async (userId, locationId, printName, bookingfor, price, locationName, visitingDate, referenceNo) => {
    try {
      return await prisma.bookings.create({
        data: {
          user: { connect: { id: userId } },
          location: { connect: { id: locationId } },
          printName,
          bookingfor,
          price,
          locationName,
          visitingDate,
          referenceNo
        }
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  const getUserBookings = async (theUserId) => {
    try {
      const userBookings = await prisma.bookings.findMany({
        where: {
          userId: theUserId,
        },
      });
      return userBookings
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
};

const getBookingsByLocationIdDb = async(locationId)=>{
    try{
      const result = await prisma.bookings.findMany({
        where:{
          locationId: locationId
        }
      })
      return result
    }  catch(err){
      console.error("Error fetching user bookings:", err)
    }

}


const staffDb = async (firstname, lastname, username,email, password, role, locationId) => {
  try {
    return await prisma.staff.create({
      data: {
        location: { connect: { id: locationId } },
        firstname,
        lastname,
        username,
        email,
        password,
        role,
      }
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

const createReviewsDb = async (content, userId, locationId) => {
  try {
    const newReview = await prisma.reviews.create({
      data: {
        location: { connect: { id: locationId } },
        user: { connect: { id: userId } },
        content
      }
    });
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error; 
  }
};

const getLocationReviews = async(locationId)=>{

  try{
    const result = await prisma.reviews.findMany({
      where:{
        locationId: locationId
      },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true
          }
        }
      } 
    })
    return result
  } catch(err){
    console.error("Error getting reviews:", err);
    throw err; 
  }


}
  
  
export  { createLocationDb, createTouristDb, createBookingDb, getUserBookings, staffDb, getBookingsByLocationIdDb, createReviewsDb, getLocationReviews}


  