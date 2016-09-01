'use strict';

const expect = require('chai').expect;
const flattenModule = require('../index');

describe('flattn', () => {
  const fixture = {
    playwright: 'William Shakespeare',
    play: 'Titus Andronicus',
    created: new Date('1623-08-01'),
    acts: [ 'Act I', 'Act II', 'Act III', 'Act IV', 'Act V', ],
    currentVenue: null,
    playwrightAlive: false,
    mainCharacters: [
      { name: 'Titus Andronicus' },
      { name: 'Lavinia Andronicus' },
      { name: 'Marcus Andronicus' },
      { name: 'Tamora' },
      { name: 'Demetrius' }
    ],
    metadata: {
      genre: { primary: 'tragedy', subtypes: [ 'play', 'revenge play' ] },
      setting: 'Roman Empire'
    },
    enact: function() { return 'this_is_a_function' }
  };

  it('flatten with no options', () => {
    const mutated = flattenModule(fixture);

    expect(mutated).to.have.property('playwright', fixture.playwright);
    expect(mutated).to.have.property('play', fixture.play);
    expect(mutated).to.have.property('created', fixture.created);

    expect(mutated).to.not.have.property('acts');
    expect(mutated).to.have.property('acts_0', fixture.acts[0]);
    expect(mutated).to.have.property('acts_1', fixture.acts[1]);
    expect(mutated).to.have.property('acts_2', fixture.acts[2]);
    expect(mutated).to.have.property('acts_3', fixture.acts[3]);
    expect(mutated).to.have.property('acts_4', fixture.acts[4]);

    expect(mutated).to.have.property('currentVenue', fixture.currentVenue);
    expect(mutated).to.have.property('playwrightAlive', fixture.playwrightAlive);

    expect(mutated).to.not.have.property('mainCharacters');
    expect(mutated).to.have.property('mainCharacters_0_name', fixture.mainCharacters[0].name);
    expect(mutated).to.have.property('mainCharacters_1_name', fixture.mainCharacters[1].name);
    expect(mutated).to.have.property('mainCharacters_2_name', fixture.mainCharacters[2].name);
    expect(mutated).to.have.property('mainCharacters_3_name', fixture.mainCharacters[3].name);
    expect(mutated).to.have.property('mainCharacters_4_name', fixture.mainCharacters[4].name);

    expect(mutated).to.not.have.property('metadata');
    expect(mutated).to.have.property('metadata_genre_primary', fixture.metadata.genre.primary);
    expect(mutated).to.have.property('metadata_genre_subtypes_0', fixture.metadata.genre.subtypes[0]);
    expect(mutated).to.have.property('metadata_genre_subtypes_1', fixture.metadata.genre.subtypes[1]);

    expect(mutated).to.have.property('enact');
    expect(mutated.enact()).to.equal('this_is_a_function');
  });

  it('flatten with crushed object', () => {
    const mutated = flattenModule(fixture, { crush: [ 'metadata' ] });

    expect(mutated).to.not.have.property('metadata');
    expect(mutated).to.have.property('genre_primary', fixture.metadata.genre.primary);
    expect(mutated).to.have.property('genre_subtypes_0', fixture.metadata.genre.subtypes[0]);
    expect(mutated).to.have.property('genre_subtypes_1', fixture.metadata.genre.subtypes[1]);
  });

  it('flatten with pruneFunctions', () => {
    const mutated = flattenModule(fixture, { pruneFunctions: true });

    expect(mutated).to.not.have.property('enact');
  });

  it('flatten with stringifyNull', () => {
    const mutated = flattenModule(fixture, { stringifyNull: true });

    expect(mutated).to.have.property('currentVenue', '');
  });

  it('flatten with different separator', () => {
    const mutated = flattenModule(fixture, { separator: '::' });

    expect(mutated).to.have.property('acts::0', fixture.acts[0]);
    expect(mutated).to.have.property('acts::1', fixture.acts[1]);
    expect(mutated).to.have.property('acts::2', fixture.acts[2]);
    expect(mutated).to.have.property('acts::3', fixture.acts[3]);
    expect(mutated).to.have.property('acts::4', fixture.acts[4]);

    expect(mutated).to.have.property('mainCharacters::0::name', fixture.mainCharacters[0].name);
    expect(mutated).to.have.property('mainCharacters::1::name', fixture.mainCharacters[1].name);
    expect(mutated).to.have.property('mainCharacters::2::name', fixture.mainCharacters[2].name);
    expect(mutated).to.have.property('mainCharacters::3::name', fixture.mainCharacters[3].name);
    expect(mutated).to.have.property('mainCharacters::4::name', fixture.mainCharacters[4].name);

    expect(mutated).to.have.property('metadata::genre::primary', fixture.metadata.genre.primary);
    expect(mutated).to.have.property('metadata::genre::subtypes::0', fixture.metadata.genre.subtypes[0]);
    expect(mutated).to.have.property('metadata::genre::subtypes::1', fixture.metadata.genre.subtypes[1]);
  });

});
