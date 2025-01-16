import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },
        genderPreference: {
            type: String,
            required: true,
            enum: ["male", "female", "both"],
        },
        bio: { type: String, default: "" },
        image: { type: String, default: "" },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        matches: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        facebookId: {
            type: String,
            sparse: true,
            unique: true
        },
    },
    { timestamps: true }
);

//密碼加密存資料庫
userSchema.pre("save", async function (next) {  
    if (this.isModified("password")) {
	    this.password = await bcrypt.hash(this.password, 10);
    }
	next();
});

//比對密碼
userSchema.methods.matchPassword = async function (enteredPassword) {  
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;