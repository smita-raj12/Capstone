const timeEntryList = [
    {
      _id: "5b21ca3eeb7f6fbccd471815",
      date: "07/01/2021",
      workOrder: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "W111111",
        desc: "xxxxxxx",
      },
      hours: 6,
    },
    {
      _id: "5b21ca3eeb7f6fbccd471815",
      date: "08/01/2021",
      workOrder: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "W222222",
        desc: "yyyyyyy",
      },
      hours: 10,
    },
  ];
  
  export function getTimeEntryList() {
    return timeEntryList;
  }
  
  export function getTimeEntry(id) {
    return timeEntryList.find((m) => m._id === id);
  }
  
  //export function saveTimeEntry(timeEntry) {
    // let movieInDb = movies.find(m => m._id === movie._id) || {};
    // movieInDb.name = movie.name;
    // movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
    // movieInDb.numberInStock = movie.numberInStock;
    // movieInDb.dailyRentalRate = movie.dailyRentalRate;
    // if (!movieInDb._id) {
    //   movieInDb._id = Date.now();
    //   movies.push(movieInDb);
    // }
    //
    // return movieInDb;
  //}
  
export function deleteTimeEntry(id) {
    let timeEntyrInDb = timeEntryList.find(m => m._id === id);
    timeEntryList.splice(timeEntryList.indexOf(timeEntyrInDb), 1);
    return timeEntyrInDb;
}