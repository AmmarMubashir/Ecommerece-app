const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../Model/productModel");

const stripe = require("stripe")(
  "sk_test_51OH8eDIw4HO84asG9q1PD2NnZSU4rAREhZdBo9Z7bFhpr1cFqA0aYAtJjjKzAUVaT9N8PH7dQqzHumnPpix8f3N200kvkwALPV"
);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  // const product = await Product.findById(req.params.productId);
  try {
    // console.log(req);
    const order = await Product.findById(req.body.id);

    // console.log(order);

    // console.log(process.env.STRIPE_SECRETKEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/order/confirm`,
      cancel_url: `http://localhost:3000/`,
      client_reference_id: req.params.orderId,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 200,
            product_data: {
              name: "AL Syed Ecommerce Store",
            },
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      url: session.url,
      session,
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    success: true,
    session,
  });
});

// exports.processPayment = catchAsyncError(async (req, res, next) => {
//   const product = await Product.findById(req.params.productId);
//   // console.log(req.Product);

//   const session = await stripe.checkout.sessions.create({
//     mode: "payment",
//     payment_method_types: ["card"],
//     success_url: `${req.protocol}://${req.get("host")}/`,
//     cancel_url: `${req.protocol}://${req.get("host")}/product/${product._id}`,
//     customer_email: req.user.email,
//     client_reference_id: req.user.id,
//     // line_items: [
//     //   {
//     //     name: `${product.name} Product`,
//     //     description: product.description,
//     //     images: [
//     //       `https://cdn.homeshopping.pk/product_images/n/181/White__69806_zoom.png`,
//     //     ],
//     //     amount: product.price * 100,
//     //     currency: "usd",
//     //     quantity: 1,
//     //   },
//     // ],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: `${product.name} Product`,
//             description: product.description,
//             images: [
//               "https://cdn.homeshopping.pk/product_images/n/181/White__69806_zoom.png",
//             ],
//           },
//           unit_amount: product.price * 100, // Convert price to cents
//         },
//         quantity: 1,
//       },
//     ],
//   });

//   res.status(200).json({
//     success: true,
//     session,
//   });
// });
