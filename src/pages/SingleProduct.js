import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-componrnt";
import BreadCrumb from "./components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icon/tb";
import { AiOutlineHeart } from "react-icon/ai";
import { Link, useLocation } from "react-router-dom";
import watch from "../images/watch.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
const SingleProduct = () => {
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAdded]=useState(false)
    const location = useLocation();
    const navigate=useNavigate();
    console.log(location);
    const getProductId = location.pathname.split("/")[2]
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product.singleproduct)
    const cartState=useSelector(state => state.auth.cartProducts )
    console.log(productState);
    useEffect(() => {
        dispatch(getAProduct(getProductId))
        dispatch(getUserCart())
    },[]) 

    useEffect(() => {
        for (let index = 0; index < cartState.length; index++) {
            if(getProductId === cartState[index]?.productId?._id){
                setAlreadyAdded(true)
            }
        }
    },[])
    const uploadCart = () => {
        if(color === null) {
            toast.error("Please Choose Color")
            return false
        } else {
            dispatch(addProdToCart({productId:productState?._id,quantity,color,price:productState?.price}))
            navigate('/cart')
        }
    }
    const props = {
        width: 594,
        height: 600,
        zoomWidth: 600,

        img: productState?.images[0]?.url ? productState?.images[0]?.url : "htpp"
    };

    const [orderedProduct, setorderedProduct] = useState(true); 
    const copyToClipboard = (text) => {
        console.log("text", text);
        var textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.exeeCommand("copy");
        textField.remove();
    };
        const closeModal = () => {};
    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title="Product Name" />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {productState?.images.map((item, index) => {
                            return<div>
                            <img
                                src={item?.url}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        })}


                    </div>
                </div> 
                <div className="col-6">
                    <div className="main-product-details">
                        <div className="border-bottom">
                            <h3 className="title">
                                {productState?.title}
                            </h3>
                        </div>
                        <div className="border-bottom py-3">
                            <p className="price">${productState?.price}</p>
                            <div className="d-flex align-items-center gap-10">
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={productState?.totalratings}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                                <p className="mb-0 t-review">( 2 Reviews )</p>
                            </div>
                            <a className="review-btn" href="#review">
                                Write a Review
                            </a>
                        </div>
                        <div className="py-3">
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Type :</h3>
                                <p className="product-data">Watch</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Brand :</h3>
                                <p className="product-data">{productState?.brand}</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Category :</h3>
                                <p className="product-data">{productState?.category}</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Tag :</h3>
                                <p className="product-data">{productState?.tags}</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Availablity :</h3>
                                <p className="product-data">In stock</p>
                            </div>
                            
                            {
                                alreadyAdded === false && <>
                                <div className="d flex gap-10 flex-column mt-2 mb-3">
                                <h3 className="product-heading">Color :</h3>
                                <Color setColor={setColor} colorData={productState?.color}/>
                                </div>
                                </>
                            }
                            <div className="d flex gap-10 flex-column mt-2 mb-3">
                                {
                                    alreadyAdded === false && <>
                                        <h3 className="product-heading">Quantity :</h3>
                                <div className="">
                                    <input
                                        type="number"
                                        name=""
                                        min={1}
                                        max={10}
                                        className="form-control"
                                        style={{ width: "70px "}}
                                        id=""
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                    />
                                </div>
                                    </>
                                }
                                <div className={ alreadyAdded?"ms-0": "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                                    <button
                                        className="button border-0"
                                        type="button"
                                        onClick={()=>{alreadyAdded? navigate('/cart'):uploadCart()}}
                                    >
                                        {alreadyAdded?"Go To Cart" : "Add to Cart"}
                                    </button>
                                    {/*button className="button signup">Buy It Now</button*/}
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-15">
                                <div>
                                    <a href="">
                                        <TbGitCompare className="fs-5 me-2" /> Add to Compare
                                    </a>
                                </div>           
                                <div>
                                    <a href="">
                                        <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex gap-10 flex-column my-3">
                                <h3 className="product-heading">Shipping & Return :</h3>
                                <p className="product-data">
                                    Free shipping and returns available on all orders! <br /> We
                                    ship all US domestic orders within
                                    <b>5-10 business days!</b>
                                </p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-3">
                                <h3 className="product-heading">Product Link:</h3>
                                <a
                                    href="javascript:void(0);"
                                    onClick={() => {
                                        copyToClipboard(
                                            window.location.href
                                        );
                                    }}
                                    >
                                        Copy Product Link
                                </a>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        </Container>
    </>
    )
}