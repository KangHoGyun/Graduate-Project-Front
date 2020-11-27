const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const async = require("async");
//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  //먼저 User Collection에 해당 유저의 정보를 가져오기
  User.findOne(
    { _id: req.user._id }, //auth 미들웨어 덕분
    (err, userInfo) => {
      //가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
      let duplicate = false;
      userInfo.cart.forEach((item) => {
        if (item.id === req.body.productId) {
          duplicate = true;
        }
      });

      if (duplicate) {
        //상품이 이미 있을 때
        User.findOneAndUpdate(
          { _id: req.user._id, "cart.id": req.body.productId },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true }, //update 된 정보를 받기 위해선 이 옵션이 필요하다.
          (err, userInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).send(userInfo.cart);
          }
        );
      } else {
        //상품이 이미 있지않을 때
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                id: req.body.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).send(userInfo.cart);
          }
        );
      }
    }
  );
});

router.post("/successBuy", auth, (req, res) => {
  //1. User collection 안에 History 필드 안에 간단한 정보 넣어주기
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });
  //2. payment collection 안에 자세한 결제 정보들 넣어주기
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  //history 정보 저장
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      //payment 에다가 transcationData 정보 저장
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. product collection 안에 있는 sold 필드 정보 업데이트 시켜주기.

        //상품 당 몇 개의 quantity를 샀는지
        let product = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res
              .status(200)
              .json({ success: true, cart: user.cart, cartDetail: [] });
          }
        );
      });
    }
  );
});

module.exports = router;