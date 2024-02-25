import React,{ Component } from 'react'
import styles from './about.module.css'
import imgPc from '../../assets/templo.jpg'
 
class About extends Component {
  render() {

    const imgAbout = imgPc
    return (
      <div className={styles.about}>
        <h1>Acerca de mí</h1>
        <h2>Mi nombre es Mariano, soy de Argentina, Santiago del Estero.</h2>
        <img src={imgAbout} alt="templo" />
        <h3>
          Desde que tengo recuerdo fui un apasionado por la tecnología y la música.
          Esta pasión me llevó a la curiosidad por aprender y conocer más profundamente sobre estos temas.
          Así fue que comencé a aprender ambas cosas simultáneamente, resolviendo problemas comunes de hardware, software y un poco de artefactos electrónicos. Por otro lado, fui desarrollando inteligencia auditiva debido a que no tenía acceso a un instrumento.
          En la escuela, pude aprender lo básico de HTML y CSS, fue donde tuve mi primer encuentro con el desarrollo web. Al mismo tiempo, tuve acceso a mi primer instrumento. Luego de la escuela, me dediqué a estudiar profesionalmente la música. Debido a la pandemia, tuve que cambiar de carrera, por lo cual opté por mi otra pasión: el desarrollo web.
          Actualmente tengo cursos de programación realizados, formo parte del bootcamp de Soy Henry, por otro lado estoy cursando la tecnicatura de programación en un instituto provincial y soy casi profesor de música.
          Soy una persona a la que le gusta aprender, analizar y resolver problemas. Me gusta mucho viajar y me entusiasma la oportunidad de trabajar en el mundo IT. Actualmente trabajo en la administración pública.
        </h3>
      </div>
    );
  }
}

export default About;