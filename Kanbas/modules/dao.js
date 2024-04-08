import model from "./model.js";
export const createNewModule = (module) => {
  const newModule = model.create(module);
  return newModule;
};
export const findAllModules = (courseId) => model.find({ course: courseId });
export const updateModule = (moduleId, updatedModule) =>
  model.updateOne({ _id: moduleId }, { $set: updatedModule });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
