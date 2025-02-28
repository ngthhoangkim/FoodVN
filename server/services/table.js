import db from "../models";

// Create table
export const createTableService = ({
  tableNumber,
  maxQuantity,
  status,
  hallName,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      //tìm sảnh
      const hall = await db.Hall.findOne({ where: { name: hallName } });
      if (!hall) {
        return resolve({
          err: 1,
          msg: "Sảnh không tồn tại!",
        });
      }

      const [table, created] = await db.Table.findOrCreate({
        where: { tableNumber: tableNumber },
        defaults: {
          tableNumber: tableNumber,
          maxQuantity: maxQuantity,
          status: status,
          hallID: hall.id,
        },
      });

      if (created) {
        resolve({
          err: 0,
          msg: "Thêm bàn thành công!",
          data: table,
        });
      } else {
        resolve({
          err: 1,
          msg: "Bàn đã tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// get all table
export const getAllTableService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const tables = await db.Table.findAll();
      resolve({
        err: 0,
        msg: "Lấy danh sách bàn thành công!",
        data: tables,
        count: tables.length,
      });
    } catch (error) {
      reject(error);
    }
  });
// get one table
export const getOneTableService = (tableID) =>
  new Promise(async (resolve, reject) => {
    try {
      const table = await db.Table.findOne({
        where: { id: tableID },
        attributes: ["id", "tableNumber", "maxQuantity", "status"],
      });
      if (!table) {
        resolve({
          err: 1,
          msg: "Bàn không tồn tại!",
        });
      }
      resolve({
        err: 0,
        msg: "Lấy thông tin bàn thành công!",
        data: table,
      });
    } catch (error) {
      reject(error);
    }
  });
// update table
export const updateTableService = (
  tableID,
  { tableNumber, maxQuantity, status }
) =>
  new Promise(async (resolve, reject) => {
    try {
      const table = await db.Table.findOne({
        where: { id: tableID },
      });
      if (!table) {
        resolve({
          err: 1,
          msg: "Bàn không tồn tại!",
        });
      }
      await table.update({
        tableNumber: tableNumber,
        maxQuantity: maxQuantity,
        status: status,
      });
      resolve({
        err: 0,
        msg: "Cập nhật thông tin bàn thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });
// delete table
export const deleteTableService = (tableID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Table.destroy({ where: { id: tableID } });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Xóa bàn thành công!" : "Bàn không tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });
//create hall
export const createHallService = ({ name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [hall, created] = await db.Hall.findOrCreate({
        where: { name: name },
        defaults: {
          name: name,
        },
      });

      if (created) {
        resolve({
          err: 0,
          msg: "Thêm sảnh thành công!",
          data: hall,
        });
      } else {
        resolve({
          err: 1,
          msg: "Sảnh đã tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// get all hall
export const getAllHallService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const halls = await db.Hall.findAll();
      resolve({
        err: 0,
        msg: "Lấy danh sách sảnh thành công!",
        data: halls,
      });
    } catch (error) {
      reject(error);
    }
  });
//delete hall
export const deleteHallService = (hallID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Hall.destroy({ where: { id: hallID } });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Xóa sảnh thành công!" : "Sảnh không tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });
//update hall
export const updateHallService = (hallID, { name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const hall = await db.Hall.findOne({
        where: { id: hallID },
        attributes: ["id", "name"],
      });

      if (!hall) {
        return resolve({
          err: 1,
          msg: "Sảnh không tồn tại!",
        });
      }

      await hall.update({ name });

      const updatedHall = await db.Hall.findOne({
        where: { id: hallID },
        attributes: ["id", "name"],
      });

      resolve({
        err: 0,
        msg: "Cập nhật thông tin sảnh thành công!",
        data: updatedHall,
      });
    } catch (error) {
      reject(error);
    }
  });
