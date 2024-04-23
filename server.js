import express from 'express';
const app = express();
import axios from 'axios';
const port = 3000;
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`server running at ${port}`);
})

app.post('/contact', async (req,res) => {
    console.log(req.body, "request body");
    const {id,first_name} = req.body;
    const response = await axios({
        method: 'post',
        url: 'https://hooks.slack.com/services/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',
        headers: {"Content-type": "application/json"},
        data: 
        {
            "text": "Someone Wants to Contact You",
            "blocks": [
              {
                "type": "header",
                "text": {
                "type": "plain_text",
                  "text": "New Contact Request",
                  "emoji": true
                }
              },
              {
                "type": "section",
                "fields": [
                  {
                    "type": "mrkdwn",
                    "text": `*Contacted by:*\n<https://admin.shopify.com/store/shiv-dev-checkout/customers/${id}|${first_name}>`
                  }
                ]
              }
            ]
          }  
      });
      res.statusCode = 200;
      res.send("Message sent successfully");
})