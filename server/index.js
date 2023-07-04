const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Customer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

// Customer Schema and Model
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 75,
  },
  mobileNumber: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  encryptedPassword: {
    type: String,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/register', async (req, res) => {
  const { name, mobileNumber, password } = req.body;
  // Encrypt the password using the mobile number as the secret key
  const encryptedPassword = encryptPassword(password, mobileNumber);

  try {
    // Create a new customer document
    const customer = new Customer({
      name,
      mobileNumber,
      encryptedPassword,
    });

    // Save the customer details to the database
    await customer.save();

    console.log('Customer details saved:', customer);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to save customer details:', error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Encryption function (replace this with your actual encryption logic)
function encryptPassword(password, secretKey) {
  // Placeholder encryption function
  return `${password}-${secretKey}`;
}
