const Nedb = require('nedb');

const db = new Nedb({
    filename: './utils/user.db', // DB 파일의 위치 및 이름
    autoload: true
});

module.exports = db;


// // 저장할 파일 예제
// const doc = {
//     _id: 'apple', // 파일의 id
//     a: '123',
//     b: 123,
//     c: {
//         a: 'find me!'
//     }
// };

// // 데이터 저장
// db.insert(doc, function (err, newDoc) {
//     if (err !== null) {
//         console.log(err);
//         return;
//     }
//     console.log(newDoc);
// });

// // 데이터 검색
// db.find({
//     c: {
//         a: 'find me!'
//     }
// }, function (err, doc) {
//     if (err !== null) {
//         console.log(err);
//         return;
//     }
//     console.log(doc);
// });

// db.find({
//     _id: 'apple'
// }, function (err, doc) {
//     if (err !== null) {
//         console.log(err);
//         return;
//     }
//     // 문서 삭제
//     db.remove(doc[0], function (err, numRemoved) {
//         console.log(err);
//         console.log(numRemoved)
//     });
// })