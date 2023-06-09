import { Request, Response } from "express";
import User from "../../models/user.model";
import { Op } from "sequelize";
import hashPassword from "../../helpers/hash-password";

export default {
    getAllUsers : async function (req: Request, res: Response){
        try {
            const users = await User.findAll({
                where: {
                    Status: {
                        $ne: "Deleted"
                    }
                },
                attributes: {
                    exclude: ["Password"]
                }
            });
            res.status(200).json(users);
        } catch (error:any) {
            res.status(500).json({error: error.message});
        }
    
    },

    registerUser :  async function (req: Request, res: Response){
        try {
            const user = await User.findOne({
                where: {
                  [Op.or]: [
                    { Email: req.body.Email },
                    { Name: req.body.Name }
                  ]
                }
              });

            if (user) {
                return res.status(400).json({error: "User already exists"});
            }

            const hashedPassword = hashPassword(req.body.Password);

            const newUser = await User.create({...req.body, Password: hashedPassword});
            return res.status(200).json(newUser);
        } catch (error:any) {
            return res.status(500).json({error: error.message});
        }
    } ,

    loginUser : async function (req: Request, res: Response){
        try {
            const user = await User.findOne({
                where: {
                    Name: req.body.Name
                }
            });
            if (!user) {
                return res.status(400).json({error: "User not found"});
            }
            if (user.Password !== hashPassword(req.body.Password)) {
                return res.status(400).json({error: "Wrong password"});
            }

            req.session.id = user.id;
            await User.update({Last_Login_DateTime_UTC: new Date()}, {where: {id: user.id}});

            return res.status(200).json(user);
        } catch (error:any) {
            return res.status(500).json({error: error.message});
        }
    },

    logoutUser : async function (req: Request, res: Response){
        try {
            req.session.destroy((error) => {
                if (error) {
                    return res.status(500).json({error: error.message});
                }
                return res.status(200).json({message: "User logged out"});
            });
        } catch (error:any) {
            return res.status(500).json({error: error.message});
        }
    },

    softDeleteUser : async function (req: Request, res: Response){
        try {
            const { id } = req.body;
            const user = await User.findOne({where: {id: id}});
            if (!user) {
                return res.status(400).json({error: "User not found"});
            }
            await User.update({Status: "Deleted"}, {where: {id: id}});
            return res.status(200).json({message: "User deleted"});
        } catch (error:any) {
            return res.status(500).json({error: error.message});
        }
    },

    softDeleteMultipleUsers : async function (req: Request, res: Response){
        try {
            const { ids } = req.body;
            await User.update({Status: "Deleted"}, {where: {id: ids}});
            return res.status(200).json({message: "Users deleted"});
        } catch (error:any) {
            return res.status(500).json({error: error.message});
        }
    },

    // upload image
    
}