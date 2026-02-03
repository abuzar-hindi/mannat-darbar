import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../contexts/ShopContext";
import QRCode from "qrcode";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const { cartItems, getCartAmount, deliveryFee, products } =
    useContext(ShopContext);
  const isCartEmpty = Object.keys(cartItems).length === 0;
  const orderType = localStorage.getItem("orderType") || "Home Delivery";
  const [showQR, setShowQR] = useState(false);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const [qrDataUrl, setQrDataUrl] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const UPI_ID = "hs3495550@okhdfcbank";
  const MERCHANT_NAME = "Sheikh Hamza";
  const generateOrderId = () =>
    "MD-" + Math.floor(100000 + Math.random() * 900000);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: "",
        };
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem("formData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const sendWhatsAppOrder = (orderId, paymentStatus) => {
    let message = `🍽️ *New Order*\n\n`;

    message += `*Order ID:* ${orderId}\n`;
    message += `*Order Type:* ${orderType}\n`;
    message += `Payment: ${paymentStatus}\n\n`;

    message += `*Name:* ${formData.firstName} ${formData.lastName}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*Address:* ${formData.street}, ${formData.city}, ${formData.state}\n\n`;

    message += `🛒 *Items:*\n`;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const typeLabel in cartItems[productId]) {
        const qty = cartItems[productId][typeLabel];
        const typeObj = product.types?.find((t) => t.label === typeLabel);

        if (qty > 0 && typeObj) {
          message += `• ${product.name} (${typeLabel}) x${qty} – ₹${
            typeObj.price * qty
          }\n`;
        }
      }
    }

    message += `\n💰 *Total: ₹${getCartAmount() + deliveryFee}*`;

    const phoneNumber = "917704886832"; // Merchant's WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderId = generateOrderId();
    setCurrentOrderId(orderId);

    const totalAmount = getCartAmount() + deliveryFee;

    // UPI methods
    if (method === "gpay" || method === "phonepe") {
      if (isMobile) {
        // 📱 Mobile → direct UPI intent
        window.location.href = getUpiLink(totalAmount, orderId);

        setTimeout(() => {
          sendWhatsAppOrder(orderId, "UPI Paid");
        }, 1200);
      } else {
        // 💻 Desktop → generate dynamic QR
        await generateQrForPayment(totalAmount, orderId);
      }
      return;
    }

    // COD
    sendWhatsAppOrder(orderId, "Cash on Delivery");
  };

  const generateQrForPayment = async (amount, orderId) => {
    const upiUrl = getUpiLink(amount, orderId);

    try {
      const qr = await QRCode.toDataURL(upiUrl);
      setQrDataUrl(qr); // 👈 dynamic QR image
      setShowQR(true); // 👈 open popup
    } catch (err) {
      console.error("QR generation failed", err);
    }
  };

  const getUpiLink = (amount, orderId) =>
    `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
      MERCHANT_NAME,
    )}&am=${amount}&cu=INR&tn=Order%20${orderId}`;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between  gao-4 sm:pt-14 pt-5 min-h-[80vh] border-t"
    >
      {/* ------------------------ Left Side ------------------------  */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="flex text-xl my-3 sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          type="email"
          placeholder="Email Address:"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="Number"
            placeholder="Zipcode"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          type="Number"
          placeholder="Phone"
          required
        />
      </div>

      {/* ------------------------ Right Side ------------------------  */}

      <div className="sm:ml-6 mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        {/* ------------------------ Payment Method Selection ------------------------  */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* -----------------------Button for GPay  ----------------------- */}

          <div className="flex flex-col gap-4 lg:flex-row items-center justify-center">
            <div
              onClick={() => setMethod("gpay")}
              className={`flex items-center gap-5 py-2 px-4 border cursor-pointer ${
                method === "gpay" ? "border-green-600" : ""
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border ${
                  method === "gpay" ? "bg-green-600" : ""
                }`}
              ></span>

              <img className="h-8" src={assets.google_pay} alt="GPay" />
            </div>

            {/* -----------------------Button for Phonepe ----------------------- */}

            <div
              onClick={() => setMethod("phonepe")}
              className={`flex items-center gap-5 py-2 px-4 border cursor-pointer ${
                method === "phonepe" ? "border-green-600" : ""
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border ${
                  method === "phonepe" ? "bg-green-600" : ""
                }`}
              ></span>

              <img className="h-8" src={assets.PhonePe} alt="PhonePe" />
            </div>

            {/* -----------------------Button for COD----------------------- */}

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-5 py-3.5 px-4 border cursor-pointer ${
                method === "cod" ? "border-green-600" : ""
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border ${
                  method === "cod" ? "bg-green-600" : ""
                }`}
              ></span>

              <p className="text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          {showQR && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">
                  Pay using {method === "gpay" ? "GPay" : "PhonePe"}
                </h2>

                <img
                  src={method === "gpay" ? assets.qr_code : assets.qr_code}
                  alt="QR"
                  className="mx-auto mb-4"
                />

                <p className="text-sm text-gray-600 mb-4">
                  Scan & complete payment, then click below
                </p>

                {showQR && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 text-center">
                      <h2 className="text-lg font-semibold mb-2">Scan & Pay</h2>

                      <p className="text-sm mb-3">
                        Order ID: <b>{currentOrderId}</b>
                      </p>

                      {qrDataUrl && (
                        <img
                          src={qrDataUrl}
                          alt="UPI QR"
                          className="mx-auto mb-4"
                        />
                      )}

                      <p className="text-sm text-gray-600 mb-4">
                        Amount & Order ID will auto-fill
                      </p>

                      <button
                        onClick={() => {
                          setShowQR(false);
                          sendWhatsAppOrder(currentOrderId, "UPI Paid (QR)");
                        }}
                        className="bg-orange-400 w-full text-white px-6 py-2 rounded"
                      >
                        I’VE PAID
                      </button>
                      <button
                        onClick={() => setShowQR(false)}
                        className="relative right-0 border mt-2 w-full px-6 py-2 rounded hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="text-end w-full mt-8">
            <button
              onSubmit={onSubmitHandler}
              disabled={isCartEmpty}
              type="submit"
              className={`bg-black text-white px-16 py-2 text-sm ${isCartEmpty ? "bg-slate-300 border cursor-not-allowed" : ""}`}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
