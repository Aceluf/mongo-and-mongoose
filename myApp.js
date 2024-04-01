require('dotenv').config();
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})


let Person;
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

Person = mongoose.model('Person', personSchema)



const createAndSavePerson = (done) => {
  let personToCreate = new Person({
    name: "Raja Soumola",
    age: 24,
    favoriteFoods: ["Atassi"]
  })

  personToCreate.save(function(err, data){
    if(err){
      console.log(err)
      return
    }

    if (data) {
      console.log(data)
      done(null , data);
    }
  })
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then((persons) => {
    console.log(persons)
    done(null , persons);
  }).catch((err) => {
    console.log(err)
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, results){
    console.log(results)
    done(null , results);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}).then((result) => {
    console.log(result)
    done(null, result);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId).then((person) => {
    console.log(person)
    done(null , person);
  }).catch((err) => {
    console.log(err)
  })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  let person
  Person.findOne({_id: personId}, function(err, doc) {
    if (err) {
      console.log(err)
      return
    }
    console.log(doc)
    doc.favoriteFoods.push(foodToAdd)
    doc.markModified('favoriteFoods')
    doc.save(function() {
      done(null , doc)
    })
  })
  
  

  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, { age: ageToSet}, {new: true}, function(err, doc) {
    if(err) return
    done(null, doc);
  })

  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, doc) {
    done(null, doc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {

    done(null, data);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age').exec(function(err, data) {
    done(err, data)
  })

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
