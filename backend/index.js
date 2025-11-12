require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [process.env.WEB_ORIGIN]; 

app.use(cors({ 
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                      'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is LIVE!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on ${PORT}`));