import { fetchRequest, IP } from "./fetch.js";

/*
type QuestionStatistics struct {
  Title         string
  IsAdditional  bool
  ScoresCount   uint32
  AverageScore  float32
  CheckVariants []CheckQuestionStatistics
}
 */

// const data = {
//     mainPageStat: [{title: "title1", isAdditional: false, scoresCount: 10, averageScore: 5.3},{title: "title2", isAdditional: true, checkVariants: [{title: "chackQue1", count: 5},{title: "chackQue2", count: 7},{title: "chackQue3", count: 10}]},{title: "title3", isAdditional: false, scoresCount: 10, averageScore: 5.3}],
//     filmPageStat: [{title: "title1", isAdditional: false, scoresCount: 10, averageScore: 5.3},{title: "title2", isAdditional: true, checkVariants: [{title: "chackQue1", count: 5},{title: "chackQue2", count: 7},{title: "chackQue3", count: 10}]},{title: "title3", isAdditional: false, scoresCount: 10, averageScore: 5.3}],
//     actorPageStat: [{title: "title1", isAdditional: false, scoresCount: 10, averageScore: 5.3},{title: "title2", isAdditional: true, checkVariants: [{title: "chackQue1", count: 5},{title: "chackQue2", count: 7},{title: "chackQue3", count: 10}]},{title: "title3", isAdditional: false, scoresCount: 10, averageScore: 5.3}],
//     profilePageStat: [{title: "title1", isAdditional: false, scoresCount: 10, averageScore: 5.3},{title: "title2", isAdditional: true, checkVariants: [{title: "chackQue1", count: 5},{title: "chackQue2", count: 7},{title: "chackQue3", count: 10}]},{title: "title3", isAdditional: false, scoresCount: 10, averageScore: 5.3}]
// };

export async function getStatistics() {
    try {
        let data = {mainPageStat: [], filmPageStat: [], actorPageStat: [], profilePageStat: []};
        let mainPageStat = await fetchRequest(`${IP}/csat/get&p=filmsAll`, "GET");
        let filmPageStat = await fetchRequest(`${IP}/csat/get&p=filmData`, "GET");
        let actorPageStat = await fetchRequest(`${IP}/csat/get&p=actorData`, "GET");
        let profilePageStat = await fetchRequest(`${IP}/csat/get&p=profileData`, "GET");

        data.append(mainPageStat.json());
        data.append(filmPageStat.json());
        data.append(actorPageStat.json());
        data.append(profilePageStat.json());

        if (!data || typeof data !== "object") {
            throw new Error("Ошибка: полученные данные не являются объектом");
        }


        return new Promise(function (resolve) {
            resolve(data);
        });
    } catch (error) {
        console.error("Произошла ошибка:", error.message);
    }
}
