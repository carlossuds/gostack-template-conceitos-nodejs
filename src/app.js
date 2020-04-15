const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, title, techs } = request.body;

  repositories.push({ id: uuid(), url, title, techs, likes: 0 });

  return response.json(repositories[repositories.length - 1]);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  if (request.body.likes) return response.status(400).json({ likes: 0 });

  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) return response.status(400).json({ error: "Erro" });

  repositories[repoIndex].title = title;
  repositories[repoIndex].url = url;
  repositories[repoIndex].techs = techs;

  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) return response.status(400).json({ error: "Erro" });

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) return response.status(400).json({ error: "Erro" });

  repositories[repoIndex].likes += 1;

  return response.json({ likes: repositories[repoIndex].likes });
});

module.exports = app;
