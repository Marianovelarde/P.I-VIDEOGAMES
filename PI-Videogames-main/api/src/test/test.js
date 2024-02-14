const request = require('supertest');
const app = require('../app');

describe('Endpoints de Videojuegos', () => {
  it('Obtener detalles de un videojuego por ID', async () => {
    const res = await request(app).get('/videogames/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nombre');
  });
});

describe('Endpoints de Géneros', () => {
  it('Obtener todos los géneros', async () => {
    const res = await request(app).get('/genres');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('length');
  });
});

describe('Endpoints de Plataformas', () => {
  it('Obtener todas las plataformas', async () => {
    const res = await request(app).get('/plataforms');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('length');
  });
});

const { Videogame } = require('../db');

describe('Videogame model', () => {

  beforeEach(async () => {
    await Videogame.sync({ force: true });
  });

  it('deberías crear un videojuego con campos obligatorios', async () => {
    const videogame = await Videogame.create({
      nombre: 'Test Game',
      descripcion: 'Test description',
      plataformas: ['PC', 'PS4']
    });

    expect(videogame.id).toBeDefined();
    expect(videogame.nombre).toBe('Test Game');
    expect(videogame.descripcion).toBe('Test description');
    expect(videogame.plataformas).toEqual(['PC', 'PS4']);
  });

  it('debería fallar si faltan campos obligatorios', async () => {
    await expect(Videogame.create({})).rejects.toThrow();
  });

  it('debe tener valores predeterminados para los campos no obligatorios', async () => {
    const videogame = await Videogame.create({
      nombre: 'Test Game',
      descripcion: 'Test description',
      plataformas: ['PC', 'PS4']
    });

    expect(videogame.imagen).toBeNull();
    expect(videogame.fecha_de_lanzamiento).toBeNull();
    expect(videogame.rating).toBeNull();
  });

});