import mongoose from 'mongoose'

const ContractSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    contractNumber: {
      type: String,
      required: true,
      unique: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: String,
    clientPhone: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'pending', 'completed', 'expired', 'cancelled'],
      default: 'draft',
    },
    type: {
      type: String,
      enum: ['security', 'maintenance', 'consultation', 'other'],
      default: 'security',
    },
    guardCount: {
      type: Number,
      default: 1,
    },
    documents: [{
      name: String,
      url: String,
      uploadedAt: Date,
    }],
    notes: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    eSignature: {
      signed: Boolean,
      signedBy: String,
      signedAt: Date,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Contract', ContractSchema)
