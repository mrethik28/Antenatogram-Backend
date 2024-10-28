import { findAndUpdateEntry } from "../../../database/pregnancy/sub/measurementMethods.js";

async function update(req, res, next) {
  const records = req.body.content;
//   for(let i=0; i<records.length; i++) {
//     update = findAndUpdateEntry(records[i]);
//     if(update instanceof Error) return next(update);
// };
  update = findAndUpdateEntry([{"measurement_id": "abs", "value" : 22 }]);
  if(update === true ) res.send({"message": "successfully updated records"});
}
async function add(req, res, next) {
  const records = req.body.content;
  records.map((entry) => {
    addEntry(entry);
  });
}
async function remove(req, res, next) {
  const records = req.body.content;
  records.map((entry) => {
    deleteEntry(entry);
  });
}

export const measurementServices = { update };
