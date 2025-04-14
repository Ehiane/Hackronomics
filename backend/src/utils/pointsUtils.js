import Points from "../models/Points.js";

export const createPointsForUser = async (userID) => {
  if (!userID) throw new Error("Missing userID");

  const existingPoints = await Points.findOne({ userID });
  if (existingPoints) return existingPoints;

  const newPoints = await Points.create({ userID, points: 0 });
  console.log(`Created new points entry for userID: ${userID}`);
  return newPoints;
};
