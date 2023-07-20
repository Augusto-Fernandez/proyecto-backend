import mongoose from "mongoose";

class MongooseAdapter {
    async init(uri) {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async close() {
        await mongoose.connection.close();
    }

    async drop() {
        await this.connection.db.dropDatabase();
    }
}

export default MongooseAdapter;
