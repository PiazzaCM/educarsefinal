import { Typepost } from "../models/typePost.model.js"
import { Typeprice } from "../models/typePrice.js"
import { Typeuser } from "../models/typesUsers.model.js"
import { sequelize } from "./connection.js"

export async function startDb () {
    try {
      await sequelize.sync({force: false})
 
      await Typeuser.findCreateFind({ where: { name: 'Profesional' } })
      await Typeuser.findCreateFind({ where: { name: 'Estudiante' } })
      await Typepost.findCreateFind({ where: { name: 'Curso' } })
      await Typepost.findCreateFind({ where: { name: 'Profesor' } })
      await Typeprice.findCreateFind({ where: { name: 'Hora' } })
      await Typeprice.findCreateFind({ where: { name: 'Dia' } })
      await Typeprice.findCreateFind({ where: { name: 'Semana' } })
      await Typeprice.findCreateFind({ where: { name: 'Mes' } })
      await Typeprice.findCreateFind({ where: { name: 'Curso' } })
    } catch (error) {
      console.log(error)
    }
  }
  