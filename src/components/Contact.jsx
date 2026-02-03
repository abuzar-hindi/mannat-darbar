const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <div className="py-12 lg:py-12 px-2 lg:px-12" id="contact">
      <div className="text-center">
        <h5 className="section-title font-secondary text-center text-primary font-normal mb-2">
          Contact Us
        </h5>
        <h1 className="mb-5 text-3xl sm:text-4xl sm:mb-10 font-bold">
          <i className="text-orange-500">Contact</i> For Any <i>Query</i>
        </h1>

        <div className="w-full">
          <div
            className="relative rounded overflow-hidden mb-4"
            style={{ minHeight: "400px" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227994.67311142205!2d81.70666259453125!3d26.762981900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a1bf14809764f%3A0xaf141c8d42e5af2b!2sMannat%20darbaar!5e0!3m2!1sen!2sin!4v1770051880104!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            ></iframe>
          </div>

          <div className="text-center">
            <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56993.22370118797!2d82.0358553237534!3d26.773831892637276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a079396dc457f%3A0x809d9fbc4ce28ae1!2smannat%20darbar!5e0!3m2!1sen!2sin!4v1770099892921!5m2!1sen!2sin">
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
