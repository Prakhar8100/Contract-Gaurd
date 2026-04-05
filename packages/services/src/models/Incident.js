import mongoose from 'mongoose'

const IncidentSchema = new mongoose.Schema(
  {
    guardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guard',
      required: true,
    },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    incidentDate: {
      type: Date,
      required: true,
    },
    location: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    category: String, // 'theft', 'assault', 'property-damage', etc
    status: {
      type: String,
      enum: ['reported', 'investigating', 'resolved', 'closed'],
      default: 'reported',
    },
    attachments: [String], // URLs
  },
  { timestamps: true }
)

export default mongoose.model('Incident', IncidentSchema)
