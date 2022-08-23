'use strict';

const { Band, Musician } = require('../models');

const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      { firstName: 'Adam', lastName: 'Appleby' },
      { firstName: 'Anton', lastName: 'Martinovic' },
      { firstName: 'Wilson', lastName: 'Holt' }
    ]
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet' },
      { firstName: 'Georgette', lastName: 'Kubo' }
    ]
  },
  {
    name: 'Loved Autumn',
    musicians: [
      { firstName: 'Aurora', lastName: 'Hase' }
    ]
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' }
    ]
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' }
    ]
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      /*
      Iterate over each band in the bandMusicians array.
      For each object, destructure the name of the band and the musicians array.
      Query for a reference to the Band instance with a matching name (remember to import a reference to the Band model into your seeder file).
      Iterate over each object in the musicians array and use the createMusician method to create a new Musicians record for each object.
      */
    for (let bandIdx = 0; bandIdx < bandMusicians.length; bandIdx++) {
      const { name, musicians } = bandMusicians[bandIdx];
      const band = await Band.findOne({ where: { name } });

      for (let musicianIdx = 0; musicianIdx < musicians.length; musicianIdx++) {
        const musician = musicians[musicianIdx];
        await band.createMusician({firstName: musician.firstName, lastName:musician.lastName});
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    /*
    Iterate over each band in the bandMusicians array.
    Destructure the musicians array from each object.
    Iterate over each object of this array and use the destroy method to delete the corresponding record from the Musicians table.
    */
    for (let bandIdx = 0; bandIdx < bandMusicians.length; bandIdx++) {
      const { bandName, musicians } = bandMusicians[bandIdx];
      const band = await Band.findOne({ where: { name: bandName } });

      for (let musicianIdx = 0; musicianIdx < musicians.length; musicianIdx++) {
        const musician = musicians[musicianIdx];
        await Musician.destroy({ where: { ...mucisian, bandId: band.id } });
      }
    }
  }
};
