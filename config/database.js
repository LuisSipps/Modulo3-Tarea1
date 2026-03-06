import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

export default conectarDB;