import mongoose from 'mongoose'

const GuardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      enum: ['security-guard', 'supervisor', 'manager'],
      default: 'security-guard',
    },
    status: {
      type: String,
      enum: ['active', 'on-leave', 'suspended', 'terminated'],
      default: 'active',
    },
    joinDate: {
      type: Date,
      required: true,
    },
    specialization: [String], // ['patrol', 'cctv', 'access-control']
    certifications: [{
      name: String,
      expiryDate: Date,
      issueDate: Date,
    }],
    schedules: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
    }],
    contractAssignments: [{
      contractId: mongoose.Schema.Types.ObjectId,
      assignedDate: Date,
      status: String,
    }],
    incidents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident',
    }],
    contactPerson: {
      name: String,
      phone: String,
      relationship: String,
    },
    documents: [{
      name: String,
      url: String,
      type: String, // 'id', 'certificate', 'photo'
    }],
  },
  { timestamps: true }
)

export default mongoose.model('Guard', GuardSchema)
