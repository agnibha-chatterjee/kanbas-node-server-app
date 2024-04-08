import {
  deleteModule,
  createNewModule,
  updateModule,
  findAllModules,
} from "./dao.js";

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
  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await deleteModule(mid);
    res.sendStatus(200);
  });
  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
      lessons: sampleLessons,
    };
    const createdModule = await createNewModule(newModule);
    res.send(createdModule);
  });
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await findAllModules(cid);
    res.send(modules);
  });

  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await updateModule(mid, req.body);
    res.sendStatus(204);
  });
}
export default ModuleRoutes;
