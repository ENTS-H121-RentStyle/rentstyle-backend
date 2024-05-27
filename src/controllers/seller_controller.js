import { SellerService } from "../services/seller_service.js";

const service = new SellerService();

const addSeller = async(req, res) => {
    try{
        const response = await service.create(req.body);
        res.json({
            status: 200,
            message: "Add Seller Sucessfully!",
            data: response,
            
        });
    } catch(error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    };
};

const editSeller = async(req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);
        res.json({
            status: 200,
            message: "Edit Seller Succesfully!",
            data: response
        });
    }catch(error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    };
};

const dropSeller = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.json({
            status: 200,
            message: "Delete Seller Succesfully!",
            data: response
        });
    } catch(error) {
        res.status(500).send({
            sucess: false,
            message: error.message
        });
    };
};

export default {
    addSeller,
    editSeller,
    dropSeller
}