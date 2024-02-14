const { expect } = require('chai');
const sequelize = require('../db');
const Videogame = require('../db')(sequelize);

describe('Videogame model', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  it('should create a new Videogame instance', async () => {
    const newVideogame = await Videogame.create({
      nombre: 'Super Mario Bros',
      descripcion: 'A classic video game',
      plataformas: ['NES', 'SNES'],
      imagen: 'super_mario.png',
      fecha_de_lanzamiento: '1985-09-13',
      rating: 5,
    });

    expect(newVideogame.id).toBeDefined();
    expect(newVideogame.nombre).toBe('Super Mario Bros');
    expect(newVideogame.descripcion).toBe('A classic video game');
    expect(newVideogame.plataformas).toEqual(['NES', 'SNES']);
    expect(newVideogame.imagen).toBe('super_mario.png');
    expect(newVideogame.fecha_de_lanzamiento).toBe('1985-09-13');
    expect(newVideogame.rating).toBe(5);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});