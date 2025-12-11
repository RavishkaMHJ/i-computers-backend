import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


// creating a product
export async function createProductAsync (req, res) {

    if (!isAdmin(req)) {
        res.status(403).json({message : "Access denied. Admins only."});
        return;
    }

    try {

        const exisitingProduct = await Product.findOne ({
            productId : req.body.productId
        })

        if (exisitingProduct) {
            res.status(400).json({message : "Product with given productId already exists."})
            return;
        }

        const data =  {}
        data.productId = req.body.productId;

        if(req.body.name == null) {
            res.status(400).json({message : "Product name is required"})
            return;
        }

        data.name = req.body.name;
        data.description = req.body.description || "";
        data.altNames = req.body.altNames || [];

        if(req.body.price == null) {
            res.status(500).json ({message : "Price is required"})
            return;
        }

        data.price = req.body.price;
        data.labeledPrice = req.body.labeledPrice || req.body.price;
        data.category = req.body.category || "others";
        data.images = req.body.images || ["/images/default-profile.png"];
        data.isVisible = req.body.isVisible;
        data.brand = req.body.brand || "Generic";
        data.model = req.body.model || "Standard";

        const newProduct = new Product(data);
        await newProduct.save();
        res.status(201).json({message : "Product created successfully"});
    }
    catch(error) {
        res.status(500).json({message : "Error creating product", error:error});
    }
}


// Getting all products
export async function getProductAsync (req, res) {
    try {

        if(isAdmin(req)) {

            const products = await Product.find();
            res.status(200).json(products);
        }
        else {

            const products = await Product.find({ isVisible: true});
            res.status(200).json(products);
        }

        
    }
    catch (error) {
        res.status(500).json({message : "Error fetching products", error: error})
    }
}


//delete a product
export async function deleteProductAsync (req, res) {

    if(!isAdmin(req)) {
        res.status(403).json({message : "Access denied. Admins only."});
        return;
    }

    try {

        const productId = req.params.productId;
        await Product.deleteOne({productId:productId});
        res.status(200).json({message : "Product deleted successfully"});


    }
    catch (error) {
        res.status(500).json({message : "Error deleting product", error:error});
    }
}


//update a product
export async function updateProductAsync (req, res) {

    if (!isAdmin(req)) {
        res.status(403).json({message : "Access denied. Admins only."});
        return;
    }

    try {

        const productId = req.params.productId;

        const data =  {}

        if(req.body.name == null) {
            res.status(400).json({message : "Product name is required"})
            return;
        }

        data.name = req.body.name;
        data.description = req.body.description || "";
        data.altNames = req.body.altNames || [];

        if(req.body.price == null) {
            res.status(500).json ({message : "Price is required"})
            return;
        }

        data.price = req.body.price;
        data.labeledPrice = req.body.labeledPrice || req.body.price;
        data.category = req.body.category || "others";
        data.images = req.body.images || ["/images/default-profile.png"];
        data.isVisible = req.body.isVisible;
        data.brand = req.body.brand || "Generic";
        data.model = req.body.model || "Standard";

        await Product.updateOne({productId:productId}, data);
        res.status(201).json({message : "Product updated successfully"});
    }
    catch(error) {
        res.status(500).json({message : "Error creating product", error:error});
    }
}

export async function getProductByIdAsync (req, res) {
    try {

        const productId = req.params.productId;
        const product = await Product.findOne({productId:productId})

        if(product == null) {
            res.status(404).json({message : "Product not foud"});
            return;
        }

        if(!product.isVisible){
            if(!isAdmin(req)){
               res.status(404).json({message : "Product not foud"});
               return;
            }
        }
        res.status(200).json(product);
    }
    catch(error) {
        res.status(500).json({message : "Error fetching product", error:error});
    }
}