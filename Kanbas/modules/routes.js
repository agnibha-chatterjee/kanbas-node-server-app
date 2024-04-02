import db from "../Database/index.js";

const sampleLessons = [
  {
    _id: "L001",
    name: "Sample Lesson 1",
    description: "Lesson 1 Description",
    module: "0",
  },
  {
    _id: "L002",
    name: "Sample Lesson 2",
    description: "Lesson 2 Description",
    module: "0",
  },
  {
    _id: "L003",
    name: "Sample Lesson 3",
    description: "Lesson 3 Description",
    module: "0",
  },
];

function ModuleRoutes(app) {
  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });
  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
      lessons: sampleLessons,
    };
    db.modules.push(newModule);
    res.send(newModule);
  });
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.send(modules);
  });

  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });
}
export default ModuleRoutes;
