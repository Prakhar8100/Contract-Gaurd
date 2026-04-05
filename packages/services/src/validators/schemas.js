import Joi from 'joi'

// Contract Validation Schemas
export const createContractSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().max(500),
  contractNumber: Joi.string().required(),
  clientName: Joi.string().required().min(2),
  clientEmail: Joi.string().email(),
  clientPhone: Joi.string().pattern(/^[0-9\-\+\s]+$/),
  startDate: Joi.date().required().iso(),
  endDate: Joi.date().required().iso().greater(Joi.ref('startDate')),
  value: Joi.number().required().positive(),
  type: Joi.string().valid('security', 'maintenance', 'consultation', 'other'),
  status: Joi.string().valid('draft', 'active', 'pending', 'completed', 'expired', 'cancelled'),
  guardCount: Joi.number().positive(),
  notes: Joi.string().max(1000),
})

export const updateContractSchema = createContractSchema.fork(
  ['title', 'contractNumber', 'clientName', 'startDate', 'endDate', 'value'],
  (schema) => schema.optional()
)

// Guard Validation Schemas
export const createGuardSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  phone: Joi.string().required().pattern(/^[0-9\-\+\s]+$/),
  employeeId: Joi.string().required().alphanum(),
  position: Joi.string().valid('security-guard', 'supervisor', 'manager'),
  status: Joi.string().valid('active', 'on-leave', 'suspended', 'terminated'),
  joinDate: Joi.date().required().iso(),
  specialization: Joi.array().items(Joi.string()),
})

export const updateGuardSchema = createGuardSchema.fork(
  ['name', 'email', 'phone', 'employeeId', 'joinDate'],
  (schema) => schema.optional()
)

// Schedule Validation Schemas
export const createScheduleSchema = Joi.object({
  guardId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
  contractId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  startDate: Joi.date().required().iso(),
  endDate: Joi.date().required().iso().greater(Joi.ref('startDate')),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/),
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/),
  location: Joi.string(),
  type: Joi.string().valid('patrol', 'fixed-post', 'mobile-patrol'),
  notes: Joi.string().max(500),
})

export const updateScheduleSchema = createScheduleSchema.fork(
  ['guardId', 'startDate', 'endDate'],
  (schema) => schema.optional()
)

// Incident Validation Schemas
export const createIncidentSchema = Joi.object({
  guardId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
  contractId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().max(1000),
  incidentDate: Joi.date().required().iso(),
  location: Joi.string(),
  severity: Joi.string().valid('low', 'medium', 'high', 'critical'),
  category: Joi.string().required(),
})

// Validation Middleware
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
    }
    req.body = value
    next()
  }
}
