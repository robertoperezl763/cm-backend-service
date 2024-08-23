// //export const getIsPrivate= (fieldLabel: string): string => `${fieldLabel} is Private.`
// import { BaseEntity } from "typeorm";
// import { Item } from "../models/Items";
// import { Collection } from "../models/Collections";
// import auth from "../plugins/auth";

// export function isMyCollection( entity: string ): string {
//     const authItem = await entityObject.findOne({})
    
//     return 'test'
// }

// export function isMyItem(req): boolean {
//     const authcheck = await Item.findOne({
//         where: {
//             id: req.body.id,
//             collection: {
//                 user: { id: req.user.id}
//             }
//         }

        

//     });

//     if(!authCheck) {return 
// } 

// //const belongsToMe = await 


// const authCheck = await Item.findOne({

    
//     where: {
//       id: req.body.item.id,
//       collection: {
//         user: { id: req.user.id }
//       }
//     }//,
// //          relations: ['Collection']
//   });

//   if (!) tauthCheckhrow new Error(getNotYours("Item"));