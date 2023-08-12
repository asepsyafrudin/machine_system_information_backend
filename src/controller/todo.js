import {
  countTotalDataTodoList,
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

export const deleteTodoListById = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTodoByIdModels(id);
    res.status(200).json({
      msg: "delete data berhasil",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "todo gagal di delete",
      errMsg: error,
    });
  }
};

export const getTodoByProjectId = async (req, res) => {
  try {
    const projectId = req.params.id;
    const page = req.params.page;
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    const [totalData] = await countTotalDataTodoList(projectId);
    const totalPageData = Math.ceil(totalData.length / dataPerPage);
    const [result] = await getTodoByProjectIdModels(
      projectId,
      dataPerPage,
      offset
    );
    res.status(200).json({
      msg: "todo berhasil di get",
      data: result,
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "todo gagal di get",
      errMsg: error,
    });
  }
};
