
const errorHandler = (res,error) => {
      console.log(error)
      if(error.name === 'CONFLICT') {
      return res.status(409).send({
        success: false,
        message: error.message,
      })
    } else if(error.name === 'BAD_REQUEST') {
      return res.status(404).send({
        success: false,
        message: error.message,
      })
    } else if(error.name === 'UNAUTHORIZED') {
      return res.status(401).send({
        success: false,
        message: error.message,
      })
    } else if(error.name === 'NOT_FOUND') {
      return res.status(404).send({
        success: false,
        message: error.message,
      })
    } else {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      })
    }
  }

  module.exports=errorHandler