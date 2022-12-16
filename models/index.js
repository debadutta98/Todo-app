import mongoose from 'mongoose';
const todoListSchema = new mongoose.Schema({
    name: String,
    isCompleted: Boolean
}, {
    strict: true
})
export const TodoModal = mongoose.models['TodoModal'] || mongoose.model('TodoModal', todoListSchema);