import mongoose from 'mongoose'

const ScheduleSchema = new mongoose.Schema(
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startTime: String, // HH:MM format
    endTime: String,   // HH:MM format
    location: String,
    type: {
      type: String,
      enum: ['patrol', 'fixed-post', 'mobile-patrol'],
      default: 'patrol',
    },
    status: {
      type: String,
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    notes: String,
  },
  { timestamps: true }
)

export default mongoose.model('Schedule', ScheduleSchema)
