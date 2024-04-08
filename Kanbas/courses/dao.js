import model from "./model.js";
export const createNewCourse = (course) => {
  const newCourse = model.create(course);
  return newCourse;
};
export const findAllCourses = () => model.find({});
export const findCourseById = (courseId) => model.find({ _id: courseId });
export const updateCourse = (courseId, updatedCourse) =>
  model.updateOne({ _id: courseId }, { $set: updatedCourse });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
