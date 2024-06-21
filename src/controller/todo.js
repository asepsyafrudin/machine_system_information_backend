import { log } from "../config/logConfig.js";
import {
  countGetTodoListByUserIdModels,
  countTotalDataTodoList,
  createTodoModels,
  deleteTodoByIdModels,
  getTodoByIdModels,
  getTodoByProjectIdModels,
  getTodoListByUserIdModels,
  updateTodoModels,
  getAssignmentSummaryModels,
  countGetAssignmentSummaryModels,
} from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const dataSave = req.body;

    if (dataSave.length > 0) {
      for (let index = 0; index < dataSave.length; index++) {
        const checkData = (await getTodoByIdModels(dataSave[index].id))
          .recordset;

        if (checkData.length > 0) {
          (await updateTodoModels(dataSave[index])).recordset;
        } else {
          (await createTodoModels(dataSave[index])).recordset;
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
    const totalData = (await countTotalDataTodoList(projectId)).recordset;
    const totalPageData = Math.ceil(totalData.length / dataPerPage);
    const result = (
      await getTodoByProjectIdModels(projectId, dataPerPage, offset)
    ).recordset;
    res.status(200).json({
      msg: "todo berhasil di get",
      data: result,
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
    });
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "todo gagal di get",
      errMsg: error,
    });
  }
};

const getMonthvalue = (month) => {
  let returnValue = month + 1;
  if (returnValue.toString().length === 1) {
    return `0${returnValue}`;
  } else {
    return returnValue;
  }
};

export const getTodoListByUserId = async (req, res) => {
  try {
    const { userId, page, filterType } = req.body;
    // const dataPerPage = 10;
    const totalData = (await countGetTodoListByUserIdModels(userId)).recordset;
    // const totalPageData = Math.ceil(totalData.length / dataPerPage);

    // if (filterType) {
    //   let filterData = [];
    //   if (filterType === "day") {
    //     let filterDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       new Date().getMonth()
    //     )}-${new Date().getDate()}`;

    //     const filterByDay = totalData.filter(
    //       (item) => item.due_date === filterDate
    //     );

    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterByDay.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterByDay[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterByDay.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterByDay,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "week2") {
    //     let thisDay = new Date();

    //     let firstDate = thisDay.setDate(thisDay.getDate() - thisDay.getDay());

    //     let lastDate = new Date().setDate(new Date(firstDate).getDate() + 7);

    //     const onThisWeek = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);
    //       return (
    //         dueDate >= new Date(firstDate) && dueDate <= new Date(lastDate)
    //       );
    //     });

    //     const filterOnThisWeek = onThisWeek;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterOnThisWeek.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterOnThisWeek[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterOnThisWeek.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterOnThisWeek,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "month2") {
    //     let thisDay = new Date();
    //     let firstMonth = thisDay.getMonth() + 1 - thisDay.getMonth();
    //     let lastMonth = thisDay.getMonth() + 1 - thisDay.getMonth() + 1;
    //     let firstDay = thisDay.getDate() + 1 - thisDay.getDate();

    //     let firstDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       firstMonth
    //     )}-${firstDay}`;

    //     let lastDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       lastMonth
    //     )}-${1}`;
    //     const onThisMonth = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);
    //       return (
    //         dueDate >= new Date(firstDate) && dueDate <= new Date(lastDate)
    //       );
    //     });

    //     const filterOnThisMonth = onThisMonth;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterOnThisMonth.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterOnThisMonth[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterOnThisMonth.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterOnThisMonth,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "week") {
    //     let thisDay = new Date();
    //     let firstDate = thisDay.setDate(
    //       thisDay.getDate() - thisDay.getDay() + 7
    //     );
    //     let lastDate = thisDay.setDate(
    //       thisDay.getDate() - thisDay.getDay() + 7
    //     );
    //     const onThisWeek = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);

    //       return (
    //         dueDate >= new Date(firstDate) && dueDate <= new Date(lastDate)
    //       );
    //     });

    //     const filterByWeek = onThisWeek;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterByWeek.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterByWeek[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterByWeek.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterByWeek,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "month") {
    //     let thisDay = new Date();
    //     let firstMonth = thisDay.getMonth() + 1 + thisDay.getMonth() - 1;
    //     let lastMonth = thisDay.getMonth() + 1 + thisDay.getMonth();
    //     let firstDay = thisDay.getDate() + 1 - thisDay.getDate();

    //     let firstDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       firstMonth
    //     )}-${firstDay}`;
    //     let lastDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       lastMonth
    //     )}-${1}`;

    //     const onThisMonth = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);
    //       return dueDate >= new Date(firstDate) && dueDate < new Date(lastDate);
    //     });

    //     const filterOnThisMonth = onThisMonth;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterOnThisMonth.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterOnThisMonth[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterOnThisMonth.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterOnThisMonth,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   }
    // } else {
    // const offset = (page - 1) * dataPerPage;
    // const result = (
    //   await getTodoListByUserIdModels(userId, dataPerPage, offset)
    // ).recordset;
    res.status(200).json({
      msg: "get data success",
      data: totalData,
      // dataPerPage: dataPerPage,
      // numberStart: (page - 1) * dataPerPage + 1,
      // totalPageData: totalPageData,
    });
    // }
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "assignment gagal di get",
      errMsg: error,
    });
  }
};

export const getAssignmentSummary = async (req, res) => {
  try {
    const { userId, page, filterType } = req.body;

    const dataPerPage = 10;
    const totalData = (await countGetAssignmentSummaryModels(userId)).recordset;
    // const totalPageData = Math.ceil(totalData.length / dataPerPage);

    // if (filterType) {
    //   let filterData = [];
    //   if (filterType === "day") {
    //     let filterDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       new Date().getMonth()
    //     )}-${new Date().getDate()}`;

    //     const filterByDay = totalData.filter(
    //       (item) => item.due_date === filterDate
    //     );

    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterByDay.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterByDay[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterByDay.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterByDay,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "week2") {
    //     let thisDay = new Date();

    //     let firstDate = thisDay.setDate(thisDay.getDate() - thisDay.getDay());

    //     let lastDate = new Date().setDate(new Date(firstDate).getDate() + 7);

    //     const onThisWeek = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);
    //       return (
    //         dueDate >= new Date(firstDate) && dueDate <= new Date(lastDate)
    //       );
    //     });

    //     const filterOnThisWeek = onThisWeek;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterOnThisWeek.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterOnThisWeek[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterOnThisWeek.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterOnThisWeek,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "month2") {
    //     let thisDay = new Date();
    //     let firstMonth = thisDay.getMonth() + 1 - thisDay.getMonth();
    //     let lastMonth = thisDay.getMonth() + 1 - thisDay.getMonth() + 1;
    //     let firstDay = thisDay.getDate() + 1 - thisDay.getDate();

    //     let firstDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       firstMonth
    //     )}-${firstDay}`;

    //     let lastDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       lastMonth
    //     )}-${1}`;
    //     const onThisMonth = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);
    //       return (
    //         dueDate >= new Date(firstDate) && dueDate <= new Date(lastDate)
    //       );
    //     });

    //     const filterOnThisMonth = onThisMonth;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterOnThisMonth.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterOnThisMonth[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterOnThisMonth.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterOnThisMonth,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "week") {
    //     let thisDay = new Date();
    //     let firstDate = thisDay.setDate(
    //       thisDay.getDate() - thisDay.getDay() + 7
    //     );
    //     let lastDate = thisDay.setDate(
    //       thisDay.getDate() - thisDay.getDay() + 7
    //     );
    //     const onThisWeek = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);

    //       return (
    //         dueDate >= new Date(firstDate) && dueDate <= new Date(lastDate)
    //       );
    //     });

    //     const filterByWeek = onThisWeek;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterByWeek.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterByWeek[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterByWeek.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterByWeek,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   } else if (filterType === "month") {
    //     let thisDay = new Date();
    //     let firstMonth = thisDay.getMonth() + 1 + thisDay.getMonth() - 1;
    //     let lastMonth = thisDay.getMonth() + 1 + thisDay.getMonth();
    //     let firstDay = thisDay.getDate() + 1 - thisDay.getDate();

    //     let firstDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       firstMonth
    //     )}-${firstDay}`;
    //     let lastDate = `${new Date().getFullYear()}-${getMonthvalue(
    //       lastMonth
    //     )}-${1}`;

    //     const onThisMonth = totalData.filter((item) => {
    //       const dueDate = new Date(item.due_date);
    //       return dueDate >= new Date(firstDate) && dueDate < new Date(lastDate);
    //     });

    //     const filterOnThisMonth = onThisMonth;
    //     // for (
    //     //   let index = (page - 1) * dataPerPage;
    //     //   index < page * dataPerPage && index < filterOnThisMonth.length;
    //     //   index++
    //     // ) {
    //     //   filterData.push(filterOnThisMonth[index]);
    //     // }
    //     const totalPageData = Math.ceil(filterOnThisMonth.length / dataPerPage);
    //     const numberStart = (page - 1) * dataPerPage + 1;
    //     res.status(200).json({
    //       msg: "get data success",
    //       data: filterOnThisMonth,
    //       dataPerPage: dataPerPage,
    //       numberStart: numberStart,
    //       totalPageData: totalPageData,
    //     });
    //   }
    // } else {
    // const offset = (page - 1) * dataPerPage;
    // const result = (await getAssignmentSummaryModels(  userId,
    //   dataPerPage,
    //   offset)).recordset
    res.status(200).json({
      msg: "get data success",
      data: totalData,
      // dataPerPage: dataPerPage,
      // numberStart: (page - 1) * dataPerPage + 1,
      // totalPageData: totalPageData,
    });
    // }
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "assignment gagal di get",
      errMsg: error,
    });
  }
};

export const updateTodoList = async (req, res) => {
  try {
    await updateTodoModels(req.body);
    res.status(200).json({
      msg: "update data success",
      data: req.body,
    });
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "todo gagal di update",
      errMsg: error,
    });
  }
};
