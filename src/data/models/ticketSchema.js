import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const ticketCollection = 'tickets';

const ticketSchema = new Schema({
    code: { type: Schema.Types.String, required: true },
    purchase_datetime: { type: Schema.Types.String, required: true },
    amount: { type: Schema.Types.Number, required: true },
    purchaser: { type: Schema.Types.String, required: true }
})

ticketSchema.plugin(paginate);

export default mongoose.model(ticketCollection, ticketSchema);
