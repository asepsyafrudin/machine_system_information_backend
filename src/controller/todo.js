import {
  createTodoModels,
  deleteTodoByIdModels,
  getTodoByIdModels,
  getTodoByProjectIdModels,
  updateTodoModels,
} from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const dataSave = req.body;
    if (dataSave.length > 0) {
      for (let index = 0; index < dataSave.length; index++) {
        const [checkData] = await getTodoByIdModels(dataSave[index].id);
        if (checkData.length > 0) {
          await updateTodoModels(dataSave[index]);
        } else {
          await createTodoModels(dataSave[index]);
        }

        const [newDataAfterCreate] = await getTodoByProjectIdModels(
          dataSave[0].project_id
        );
        if (newDataAfterCreate.length > 0) {
          for (let index = 0; index < newDataAfterCreate.length; index++) {
            const checkData = dataSave.find(
              (value) => value.id === newDataAfterCreate[index].id
            );
            if (!checkData) {
              await deleteTodoByIdModels(newDataAfterCreate[index].id);
            }
          }
        }
      }
    }

    res.status(200).json({
      msg: "todo berhasil di post",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "todo gagal di create",
      errMsg: error,
    });
  }
};

export const getTodoByProjectId = async (req, res) => {
  try {
    const projectId = req.params.id;
    const [result] = await getTodoByProjectIdModels(projectId);
    res.status(200).json({
      msg: "todo berhasil di get",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "todo gagal di get",
      errMsg: error,
    });
  }
};
