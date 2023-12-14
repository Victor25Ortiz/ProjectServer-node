import logger from './logger'

const notFound = (req, res, next) => {
    const error = new Error('Not Found - ${req.originalurl}')
    res.status(404)
    next(error)
}

export const errorHandler = (error, req, res, next) => {
    const statuscode = res.statuscode == 200 ? 500 : res.statuscode
    logger.error({
        message: error.message,
        stack: error.stack,
    })
    res.status(statuscode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV == 'production' ? '💩' : error.stack,
    })
}

export default notFound