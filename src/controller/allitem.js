import { getAllCapabilityForRecent } from "../models/capability.js";
import { getAllDocumentForGeneralModels } from "../models/document.js";
import { getAllVideoModels } from "../models/video.js";
import dotenv from "dotenv";

dotenv.config();
export const getAllItem = async (req, res) => {
  try {
    const [document] = await getAllDocumentForGeneralModels();
    const [video] = await getAllVideoModels();
    const [capability] = await getAllCapabilityForRecent();
    let totalData = [];
    if (document.length > 0) {
      for (let index = 0; index < document.length; index++) {
        totalData.push({
          title: document[index].title,
          description: document[index].description,
          create_date: document[index].create_date,
          file_type: document[index].file_type,
          username: document[index].username,
          link_detail: `${process.env.IP_ADDRESS_LOCALHOST}/document/${document[index].id}`,
        });
      }
    }

    if (video.length > 0) {
      for (let index = 0; index < video.length; index++) {
        totalData.push({
          title: video[index].video_name,
          description: video[index].description,
          create_date: video[index].create_date,
          file_type: "video",
          username: video[index].username,
          link_detail: `${process.env.IP_ADDRESS_LOCALHOST}/video/${video[index].id}`,
        });
      }
    }

    if (capability.length > 0) {
      for (let index = 0; index < capability.length; index++) {
        totalData.push({
          title: `Capability For ${capability[index].part_name}`,
          description: capability[index].description,
          create_date: capability[index].create_date,
          file_type: "capability",
          username: capability[index].username,
          link_detail: `${process.env.IP_ADDRESS_LOCALHOST}/capabilityForm/${capability[index].id}`,
        });
      }
    }

    const page = req.params.page;
    const dataPerPage = 10;
    const totalPageData = Math.ceil(totalData.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < totalData.length;
      index++
    ) {
      listData.push(totalData[index]);
    }

    const sortArrayByDate = (a, b) => {
      return new Date(b.create_date) - new Date(a.create_date);
    };

    let sortData = listData.sort(sortArrayByDate);

    res.status(200).json({
      msg: "get data berhasil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: sortData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data gagal",
      errMsg: error,
    });
  }
};
