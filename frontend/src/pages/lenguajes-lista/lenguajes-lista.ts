import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Lenguajes } from '../../models/lenguajes';


@IonicPage()
@Component({
  selector: 'page-lenguajes-lista',
  templateUrl: 'lenguajes-lista.html',
})
export class LenguajesListaPage {


  lenguajes: Lenguajes[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //this.lenguajes = ['Java', 'C++', 'Javascript', 'Python', 'C#', 'Ruby', 'Lua', 'Pascal', 'Go', 'Kotlin', 'Scala'];

    this.lenguajes = [
      {
        cod_lenguaje: 1,
        nombre: 'Go',
        descripcion: 'Go es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C. Ha sido desarrollado por Google, y sus diseñadores iniciales son Robert Griesemer, Rob Pike y Ken Thompson. Actualmente está disponible en formato binario para los sistemas operativos Windows, GNU/Linux, FreeBSD y Mac OS X, pudiendo también ser instalado en estos y en otros sistemas con el código fuente.2​3​ Go es un lenguaje de programación compilado, concurrente, imperativo, estructurado, orientado a objetos —de una manera bastante especial— y con recolector de basura que de momento está soportado en diferentes tipos de sistemas UNIX, incluidos Linux, FreeBSD y Mac OS X. También está disponible en Plan 9, puesto que parte del compilador está basado en un trabajo previo sobre el sistema operativo Inferno. Las arquitecturas soportadas son i386, amd64 y ARM.'
      },
      {
        cod_lenguaje: 2,
        nombre: 'Kotlin',
        descripcion: 'Kotlin es un lenguaje de programación fuertemente tipado desarrollado por JetBrains (los creadores de IntelliJ IDEA). Ha sido fuertemente influenciado por lenguajes como Groovy, Scala o C#. Permite generar código para la JVM (máquina virtual de Java 6) Javascript y en las últimas versiones también ejecutables nativos.'
      },
      {
        cod_lenguaje: 3,
        nombre: 'Scala',
        descripcion: 'Scala es un lenguaje de programación multi-paradigma diseñado para expresar patrones comunes de programación en forma concisa, elegante y con tipos seguros. Integra sutilmente características de lenguajes funcionales y orientados a objetos. La implementación actual corre en la máquina virtual de Java y es compatible con las aplicaciones Java existentes.'
      },
      {
        cod_lenguaje: 4,
        nombre: 'Ruby',
        descripcion: 'Ruby es un lenguaje de programación interpretado, reflexivo y orientado a objetos, creado por el programador japonés Yukihiro "Matz" Matsumoto, quien comenzó a trabajar en Ruby en 1993, y lo presentó públicamente en 1995'
      },

    ]

  }

  atras() {

    this.navCtrl.setRoot('HomePage');

  }

  goToDetalle(lenguaje: Lenguajes) {
    this.navCtrl.push('LenguajesDetallePage', {
      lenguaje: lenguaje
    })
  }


}
