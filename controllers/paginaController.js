import { Testimonial } from '../models/testimoniales.js'
import { Viaje } from '../models/Viaje.js'

const paginaIncio = async (req, res) => {
  //consultar 3 viajes del modelo viaje
  const promiseDB = []
  promiseDB.push(Viaje.findAll({ limit: 3 }))
  promiseDB.push(Testimonial.findAll({ limit: 3 }))
  try {
    const resultado = await Promise.all(promiseDB)
    //request lo que enviamos //response lo que express nos envia
    res.render('inicio', {
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1],
    })
  } catch (error) {
    console.log(error)
  }
}
const paginaNosotros = (req, res) => {
  //request lo que enviamos //response lo que express nos envia
  res.render('nosotros', {
    pagina: 'Nosotros',
  })
}
const paginaViajes = async (req, res) => {
  //Consultar base de datos
  const viajes = await Viaje.findAll()
  console.log(viajes)
  //request lo que enviamos //response lo que express nos envia
  res.render('viajes', {
    pagina: 'Proximos Viajes',
    viajes,
  })
}
const paginaTestimoniales = async (req, res) => {
  //request lo que enviamos //response lo que express nos envia
  try {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      testimoniales,
    })
  } catch (error) {
    console.log(error)
  }
}
//muestra u viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params
  try {
    const viaje = await Viaje.findOne({ where: { slug } })
    res.render('viaje', {
      pagina: 'Informacion viaje',
      viaje,
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  paginaIncio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
}
